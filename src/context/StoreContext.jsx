import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_STORE_SETTINGS, INITIAL_PRODUCTS } from '../data/initialData';
import { TRANSLATIONS } from '../data/translations';

const StoreContext = createContext();

const PRODUCTS_STORAGE_KEY = 'star_solar_products_v1';
const SETTINGS_STORAGE_KEY = 'star_solar_settings_v1';
const CART_STORAGE_KEY = 'star_solar_cart_v1';
const ADMIN_AUTH_KEY = 'star_solar_admin_session_v1';
const LANG_STORAGE_KEY = 'star_solar_lang_v1';

export const StoreProvider = ({ children }) => {
  // Language state (en or ur)
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === 'ur' || saved === 'en') return saved;
    } catch (e) {}
    return 'en';
  });

  const setLanguage = (lang) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch (e) {}
  };

  // Translation helper
  const t = (key) => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS['en']?.[key] || key;
  };

  // Products state
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to load products from storage', e);
    }
    return INITIAL_PRODUCTS;
  });

  // Settings state
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_STORE_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to load settings from storage', e);
    }
    return DEFAULT_STORE_SETTINGS;
  });

  // Cart / Quote Request state
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load cart', e);
    }
    return [];
  });

  // Admin authentication state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  });

  // Quick Toast notification state
  const [toast, setToast] = useState(null);

  // Official Printable Quote Modal state
  const [officialQuoteData, setOfficialQuoteData] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  // Sync products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to persist products', e);
    }
  }, [products]);

  // Sync settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to persist settings', e);
    }
  }, [settings]);

  // Sync cart
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to persist cart', e);
    }
  }, [cart]);

  // Product CRUD
  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: newProduct.id || `custom-${Date.now()}`,
      rating: newProduct.rating || 5.0,
      reviewsCount: newProduct.reviewsCount || 1,
      inStock: newProduct.inStock ?? true,
      price: Number(newProduct.price) || 0,
      originalPrice: Number(newProduct.originalPrice) || Number(newProduct.price) || 0,
    };
    setProducts((prev) => [productWithId, ...prev]);
    showToast(`✅ "${productWithId.name}" added to catalog successfully!`);
    return productWithId;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            ...updatedFields,
            price: Number(updatedFields.price !== undefined ? updatedFields.price : item.price),
            originalPrice: Number(updatedFields.originalPrice !== undefined ? updatedFields.originalPrice : item.originalPrice),
          };
        }
        return item;
      })
    );
    showToast('✅ Product updated successfully!');
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    showToast('🗑️ Product deleted from catalog.');
  };

  // Settings update
  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('⚙️ Store settings updated successfully!');
  };

  // Reset to default
  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setSettings(DEFAULT_STORE_SETTINGS);
    localStorage.removeItem(PRODUCTS_STORAGE_KEY);
    localStorage.removeItem(SETTINGS_STORAGE_KEY);
    showToast('🔄 Restored default products and settings!');
  };

  // Export / Backup
  const exportData = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      shop: settings.shopName,
      settings,
      products,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `StarSolarEnergy_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('📥 Store data backup downloaded!');
  };

  // Import / Restore
  const importData = (jsonData) => {
    try {
      const parsed = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
      if (parsed.products && Array.isArray(parsed.products)) {
        setProducts(parsed.products);
      }
      if (parsed.settings && typeof parsed.settings === 'object') {
        setSettings((prev) => ({ ...prev, ...parsed.settings }));
      }
      showToast('🎉 Data restored successfully from backup file!');
      return true;
    } catch (err) {
      showToast('❌ Invalid JSON backup file!', 'error');
      return false;
    }
  };

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    showToast(`🛒 "${product.name}" added to Quote Cart!`);
  };

  const updateCartQty = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
    showToast('Removed item from quote cart.');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Admin Login / Logout
  const loginAdmin = (pin) => {
    if (pin.trim() === (settings.adminPin || '1234')) {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
      showToast('🔓 Admin verified! Welcome to StarSolar Manager.');
      return true;
    } else {
      showToast('❌ Incorrect PIN. Please try again.', 'error');
      return false;
    }
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
    showToast('🔒 Logged out of Admin mode.');
  };

  // WhatsApp Helper function generator
  const formatWhatsAppUrl = (message) => {
    const cleanNumber = (settings.whatsappNumber || '923001234567').replace(/[^0-9]/g, '');
    const encoded = encodeURIComponent(message.trim());
    return `https://wa.me/${cleanNumber}?text=${encoded}`;
  };

  const getProductWhatsAppLink = (product) => {
    const formattedPrice = `${settings.currencySymbol} ${product.price.toLocaleString()}`;
    const isUrdu = language === 'ur';

    const msg = isUrdu
      ? `☀️ *السلام علیکم StarSolarEnergy!* 
میں آپ کی ویب سائٹ سے اس پراڈکٹ کے بارے میں معلومات اور ریٹ لینا چاہتا ہوں:

📦 *پراڈکٹ:* ${product.name}
🏷️ *برانڈ:* ${product.brand}
💰 *لسٹڈ ریٹ:* ${formattedPrice} ${product.unit ? `(${product.unit})` : ''}
${product.badge ? `⭐ *کیٹیگری:* ${product.badge}` : ''}

برائے مہربانی موجودہ اسٹاک، بہترین ہول سیل ڈسکاؤنٹ اور ڈلیوری کی تفصیلات شیئر فرمائیں۔

شکریہ!`
      : `☀️ *Hello StarSolarEnergy!* 
I am interested in buying / getting details for this product:

📦 *Product:* ${product.name}
🏷️ *Brand:* ${product.brand}
💰 *Listed Price:* ${formattedPrice} ${product.unit ? `(${product.unit})` : ''}
${product.badge ? `⭐ *Type:* ${product.badge}` : ''}

Could you please confirm current stock availability, best wholesale discount, and delivery time to my location?

Thank you!`;

    return formatWhatsAppUrl(msg);
  };

  const getGeneralInquiryWhatsAppLink = (topic = 'General Inquiry') => {
    const isUrdu = language === 'ur';
    const msg = isUrdu
      ? `☀️ *السلام علیکم StarSolarEnergy!* 
میں سولر پینلز اور انورٹرز کے بارے میں رہنمائی اور کوٹیشن لینا چاہتا ہوں۔ برائے مہربانی رابطہ فرمائیں۔`
      : `☀️ *Hello StarSolarEnergy Team!* 
I visited your website and would like to inquire about *${topic}*. 
Please connect me with the owner / solar specialist for consultation and quotation.`;
    return formatWhatsAppUrl(msg);
  };

  const getSolarCalculatorWhatsAppLink = (calcDetails) => {
    const isUrdu = language === 'ur';
    const msg = isUrdu
      ? `☀️ *سولر سسٹم کیلکولیشن کوٹیشن*
*ویب سائٹ:* StarSolarEnergy آن لائن کیلکولیٹر

⚡ *تجویز کردہ سسٹم:* ${calcDetails.recommendedKW} kW System
☀️ *سولر پینلز:* ~${calcDetails.panelsCount} Panels (${calcDetails.panelWattage}W each)
⚡ *انورٹر سائز:* ${calcDetails.inverterSize}
🔋 *بیٹری بیک اپ:* ${calcDetails.batteryRecommendation}
💡 *روزانہ پیداوار:* ~${calcDetails.dailyUnits} Units/Day
💵 *ماہانہ بل کی متوقع بچت:* ${settings.currencySymbol} ${calcDetails.monthlySavings?.toLocaleString()}

📝 *لوڈ کی تفصیل:*
- ماہانہ یونٹس/بل: ${calcDetails.inputSummary}
${calcDetails.appliancesSummary ? `- منتخب کردہ سامان: ${calcDetails.appliancesSummary}` : ''}

براہ کرم مکمل انسٹالیشن، اسٹرکچر اور نیٹ میٹرنگ کے ساتھ فائنل کوٹیشن شیئر کریں۔ شکریہ!`
      : `☀️ *SOLAR SYSTEM ESTIMATION INQUIRY*
*From:* StarSolarEnergy Website Calculator

⚡ *System Estimated:* ${calcDetails.recommendedKW} kW System
☀️ *Solar Panels:* ~${calcDetails.panelsCount} Panels (${calcDetails.panelWattage}W each)
⚡ *Recommended Inverter:* ${calcDetails.inverterSize}
🔋 *Recommended Battery:* ${calcDetails.batteryRecommendation}
💡 *Daily Generation:* ~${calcDetails.dailyUnits} Units/Day
💵 *Estimated Monthly Savings:* ${settings.currencySymbol} ${calcDetails.monthlySavings?.toLocaleString()}

📝 *My Load / Bill Details:*
- Monthly Bill/Units: ${calcDetails.inputSummary}
${calcDetails.appliancesSummary ? `- Key Appliances: ${calcDetails.appliancesSummary}` : ''}

Please send me an official turnkey quotation with installation and Net-Metering options!`;
    return formatWhatsAppUrl(msg);
  };

  const getCartQuoteWhatsAppLink = (customerName = '', city = '', note = '') => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemsList = cart
      .map(
        (item, index) =>
          `${index + 1}. *${item.name}* (x${item.quantity}) - ${settings.currencySymbol} ${(item.price * item.quantity).toLocaleString()}`
      )
      .join('\n');

    const msg = `☀️ *NEW QUOTATION REQUEST*
*From StarSolarEnergy Website Quote Cart*
${customerName ? `👤 *Customer Name:* ${customerName}` : ''}
${city ? `📍 *City / Area:* ${city}` : ''}

🛒 *Requested Items:*
${itemsList}

💰 *Estimated Total:* ${settings.currencySymbol} ${total.toLocaleString()}
${note ? `\n📌 *Special Note:* ${note}` : ''}

Please provide final wholesale price quotation, delivery cost, and installation details. Thank you!`;
    return formatWhatsAppUrl(msg);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        settings,
        cart,
        toast,
        language,
        officialQuoteData,
        isAdminLoggedIn,
        setLanguage,
        t,
        setOfficialQuoteData,
        addProduct,
        updateProduct,
        deleteProduct,
        updateSettings,
        resetToDefaults,
        exportData,
        importData,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        loginAdmin,
        logoutAdmin,
        showToast,
        formatWhatsAppUrl,
        getProductWhatsAppLink,
        getGeneralInquiryWhatsAppLink,
        getSolarCalculatorWhatsAppLink,
        getCartQuoteWhatsAppLink,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
