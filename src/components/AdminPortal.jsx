import React, { useState, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/initialData';
import { 
  X, 
  Lock, 
  Unlock, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  Upload, 
  Download, 
  RotateCcw, 
  Check, 
  Settings, 
  Package, 
  Database, 
  Eye, 
  Search, 
  Sparkles,
  Image as ImageIcon,
  KeyRound,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

export const AdminPortal = ({ onClose }) => {
  const { 
    products, 
    settings, 
    isAdminLoggedIn, 
    loginAdmin, 
    logoutAdmin, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateSettings, 
    resetToDefaults, 
    exportData, 
    importData, 
    showToast 
  } = useStore();

  const [pinInput, setPinInput] = useState('');
  const [activeTab, setActiveTab] = useState('products'); // 'products', 'settings', 'backup'
  
  // Product search in admin
  const [adminSearch, setAdminSearch] = useState('');
  
  // Product Edit / Create Modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: 'solar-panels',
    brand: '',
    price: '',
    originalPrice: '',
    unit: 'per panel',
    inStock: true,
    badge: '',
    image: '',
    description: '',
    specs: [{ key: 'Power Output', value: '585W' }, { key: 'Warranty', value: '25 Years' }],
    featured: false
  });

  // Settings form state
  const [settingsForm, setSettingsForm] = useState({ ...settings });

  // File upload input ref
  const fileInputRef = useRef(null);
  const backupInputRef = useRef(null);

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    loginAdmin(pinInput);
  };

  // Open Form for Adding
  const handleOpenAddForm = () => {
    setEditingProductId(null);
    setFormData({
      name: '',
      category: 'solar-panels',
      brand: 'Longi / Jinko / Deye',
      price: '',
      originalPrice: '',
      unit: 'per panel',
      inStock: true,
      badge: 'New Arrival',
      image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
      description: 'Tier-1 solar product with high conversion efficiency and standard manufacturer warranty.',
      specs: [
        { key: 'Capacity/Power', value: '585 Watts' },
        { key: 'Technology', value: 'N-Type TOPCon' },
        { key: 'Warranty', value: '25 Years Linear Output' }
      ],
      featured: true
    });
    setIsFormOpen(true);
  };

  // Open Form for Editing
  const handleOpenEditForm = (product) => {
    setEditingProductId(product.id);
    const specsArray = product.specs
      ? Object.entries(product.specs).map(([key, value]) => ({ key, value }))
      : [];
    setFormData({
      name: product.name,
      category: product.category,
      brand: product.brand,
      price: product.price,
      originalPrice: product.originalPrice || product.price,
      unit: product.unit || 'unit',
      inStock: product.inStock,
      badge: product.badge || '',
      image: product.image,
      description: product.description,
      specs: specsArray.length > 0 ? specsArray : [{ key: 'Warranty', value: '5 Years' }],
      featured: product.featured || false
    });
    setIsFormOpen(true);
  };

  // Dynamic Specs Add/Remove/Change
  const handleSpecChange = (index, field, value) => {
    const updated = [...formData.specs];
    updated[index][field] = value;
    setFormData({ ...formData, specs: updated });
  };

  const handleAddSpecRow = () => {
    setFormData({
      ...formData,
      specs: [...formData.specs, { key: '', value: '' }]
    });
  };

  const handleRemoveSpecRow = (index) => {
    const updated = formData.specs.filter((_, i) => i !== index);
    setFormData({ ...formData, specs: updated });
  };

  // Handle Local Image Upload (converts to base64 data URI)
  const handleImageFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        showToast('⚠️ Image file is over 3MB. Please choose a smaller photo.', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setFormData((prev) => ({
          ...prev,
          image: uploadEvent.target.result
        }));
        showToast('📸 Image uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  // Save Product (Create or Update)
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('⚠️ Please enter a product name', 'error');
      return;
    }
    if (!formData.price || isNaN(formData.price)) {
      showToast('⚠️ Please enter a valid price', 'error');
      return;
    }

    // Convert specs array back to key-value object
    const specsObj = {};
    formData.specs.forEach((item) => {
      if (item.key.trim() && item.value.trim()) {
        specsObj[item.key.trim()] = item.value.trim();
      }
    });

    const payload = {
      name: formData.name.trim(),
      category: formData.category,
      brand: formData.brand.trim() || 'StarSolar',
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice) || Number(formData.price),
      unit: formData.unit.trim(),
      inStock: formData.inStock,
      badge: formData.badge.trim(),
      image: formData.image || 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
      description: formData.description.trim(),
      specs: specsObj,
      featured: formData.featured
    };

    if (editingProductId) {
      updateProduct(editingProductId, payload);
    } else {
      addProduct(payload);
    }

    setIsFormOpen(false);
  };

  // Save Settings
  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateSettings(settingsForm);
  };

  // Handle JSON Backup Import
  const handleBackupFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        importData(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  // Filtered products list in admin
  const adminFilteredProducts = products.filter((p) => {
    if (!adminSearch.trim()) return true;
    const q = adminSearch.toLowerCase();
    return (
      p.name?.toLowerCase().includes(q) ||
      p.brand?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-white rounded-3xl max-w-5xl w-full shadow-2xl overflow-hidden border border-slate-200 z-10 flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="p-4 sm:px-6 bg-slate-900 text-white flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-base sm:text-lg flex items-center gap-2">
                <span>{settings.shopName} — Management Dashboard</span>
                {isAdminLoggedIn && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Active Session
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-400">
                Post new solar stock, update prices, change WhatsApp number & contact details
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminLoggedIn && (
              <button
                onClick={logoutAdmin}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Lock
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* If Not Logged In, Show PIN screen */}
        {!isAdminLoggedIn ? (
          <div className="p-8 sm:p-16 text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto shadow-sm">
              <KeyRound className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-xl text-slate-900">
                Owner Access Verification
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Enter your StarSolar manager PIN to add products, modify prices, and edit store settings.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter PIN (Default: 1234)"
                  autoFocus
                  className="w-full text-center tracking-widest text-lg font-bold py-3 px-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
                />
                <span className="text-[11px] text-slate-400 block mt-1.5">
                  Default PIN is: <strong className="text-slate-700">1234</strong> (can be changed in settings)
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                Unlock Management Portal
              </button>
            </form>
          </div>
        ) : (
          /* Admin Authenticated Content */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Tabs Navigation */}
            <div className="bg-slate-100/80 px-4 sm:px-6 pt-3 border-b border-slate-200 flex items-center gap-2 overflow-x-auto shrink-0">
              <button
                onClick={() => setActiveTab('products')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'products'
                    ? 'bg-white text-emerald-700 border-emerald-600 shadow-sm'
                    : 'text-slate-600 border-transparent hover:text-slate-900'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Product Inventory ({products.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'settings'
                    ? 'bg-white text-emerald-700 border-emerald-600 shadow-sm'
                    : 'text-slate-600 border-transparent hover:text-slate-900'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>WhatsApp & Store Settings</span>
              </button>

              <button
                onClick={() => setActiveTab('backup')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'backup'
                    ? 'bg-white text-emerald-700 border-emerald-600 shadow-sm'
                    : 'text-slate-600 border-transparent hover:text-slate-900'
                }`}
              >
                <Database className="w-4 h-4" />
                <span>Backup & Reset</span>
              </button>
            </div>

            {/* TAB 1: PRODUCT INVENTORY */}
            {activeTab === 'products' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                
                {/* Inventory Top Action Bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={adminSearch}
                      onChange={(e) => setAdminSearch(e.target.value)}
                      placeholder="Search inventory..."
                      className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>

                  <button
                    onClick={handleOpenAddForm}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Post New Solar Product</span>
                  </button>
                </div>

                {/* Products Table */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[10px] tracking-wider font-bold">
                        <tr>
                          <th className="py-3 px-4">Item</th>
                          <th className="py-3 px-3">Category</th>
                          <th className="py-3 px-3">Brand</th>
                          <th className="py-3 px-3 text-right">Selling Price</th>
                          <th className="py-3 px-3 text-center">Status</th>
                          <th className="py-3 px-4 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {adminFilteredProducts.map((p) => (
                          <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                            {/* Product Info with Image */}
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={p.image || 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=120&q=80'}
                                  alt={p.name}
                                  className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                                />
                                <div className="max-w-xs">
                                  <span className="font-semibold text-slate-900 block truncate" title={p.name}>
                                    {p.name}
                                  </span>
                                  {p.badge && (
                                    <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-800">
                                      {p.badge}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>

                            <td className="py-3 px-3 text-slate-600 capitalize">
                              {p.category?.replace('-', ' ')}
                            </td>

                            <td className="py-3 px-3 font-semibold text-emerald-800">
                              {p.brand}
                            </td>

                            <td className="py-3 px-3 text-right font-bold text-slate-900">
                              {settings.currencySymbol} {p.price.toLocaleString()}
                              {p.originalPrice > p.price && (
                                <span className="text-[10px] text-slate-400 block line-through">
                                  {settings.currencySymbol} {p.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </td>

                            <td className="py-3 px-3 text-center">
                              <button
                                onClick={() => updateProduct(p.id, { inStock: !p.inStock })}
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                                  p.inStock
                                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                    : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                                }`}
                                title="Click to toggle stock status"
                              >
                                {p.inStock ? '● In Stock' : '✕ Out'}
                              </button>
                            </td>

                            <td className="py-3 px-4 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => handleOpenEditForm(p)}
                                  className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                                  title="Edit product"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (window.confirm(`Are you sure you want to delete "${p.name}"?`)) {
                                      deleteProduct(p.id);
                                    }
                                  }}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                  title="Delete product"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: STORE SETTINGS */}
            {activeTab === 'settings' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <form onSubmit={handleSaveSettings} className="max-w-2xl mx-auto space-y-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  
                  <div className="pb-3 border-b border-slate-100">
                    <h3 className="font-heading font-bold text-base text-slate-900">
                      Store Branding & Contact Configuration
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Updates here change live links across the entire store immediately.
                    </p>
                  </div>

                  {/* Shop Name */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Business / Shop Name:
                      </label>
                      <input
                        type="text"
                        value={settingsForm.shopName}
                        onChange={(e) => setSettingsForm({ ...settingsForm, shopName: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Tagline:
                      </label>
                      <input
                        type="text"
                        value={settingsForm.tagline}
                        onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>
                  </div>

                  {/* WhatsApp Number - CRITICAL */}
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
                    <label className="text-xs font-extrabold text-emerald-950 block">
                      Father's WhatsApp Number (Country Code + Number, No + or Spaces):
                    </label>
                    <input
                      type="text"
                      value={settingsForm.whatsappNumber}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                      placeholder="e.g. 923001234567"
                      className="w-full px-3 py-2.5 text-sm font-bold text-slate-900 rounded-xl border border-emerald-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <p className="text-[11px] text-emerald-800">
                      💡 All buyer "1-Click WhatsApp" clicks across the website will open a direct chat to this exact phone number!
                    </p>
                  </div>

                  {/* Store Phone & Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Store Calling Phone:
                      </label>
                      <input
                        type="text"
                        value={settingsForm.phone}
                        onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Currency Symbol:
                      </label>
                      <input
                        type="text"
                        value={settingsForm.currencySymbol}
                        onChange={(e) => setSettingsForm({ ...settingsForm, currencySymbol: e.target.value })}
                        placeholder="Rs. or PKR or $"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>
                  </div>

                  {/* Physical Address */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Shop Physical Address / Market Location:
                    </label>
                    <input
                      type="text"
                      value={settingsForm.address}
                      onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>

                  {/* Announcement Banner */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Top Announcement Bar Message:
                    </label>
                    <textarea
                      rows={2}
                      value={settingsForm.announcementText}
                      onChange={(e) => setSettingsForm({ ...settingsForm, announcementText: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>

                  {/* Admin PIN change */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Change Manager PIN:
                    </label>
                    <input
                      type="text"
                      value={settingsForm.adminPin}
                      onChange={(e) => setSettingsForm({ ...settingsForm, adminPin: e.target.value })}
                      className="w-full max-w-xs px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save All Settings</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 3: BACKUP & DATA */}
            {activeTab === 'backup' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <div className="max-w-2xl mx-auto space-y-6">
                  
                  {/* Export */}
                  <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <Download className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-sm text-slate-900">
                          Export Data Backup (.json)
                        </h4>
                        <p className="text-xs text-slate-500">
                          Download a copy of your products, custom prices, and store settings to keep safe on your phone or computer.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={exportData}
                      className="mt-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download JSON Backup</span>
                    </button>
                  </div>

                  {/* Import */}
                  <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-sm text-slate-900">
                          Restore Store from Backup (.json)
                        </h4>
                        <p className="text-xs text-slate-500">
                          Upload a previously saved StarSolarEnergy backup file to restore all products.
                        </p>
                      </div>
                    </div>

                    <input
                      type="file"
                      ref={backupInputRef}
                      accept=".json"
                      onChange={handleBackupFileSelect}
                      className="hidden"
                    />

                    <button
                      onClick={() => backupInputRef.current?.click()}
                      className="mt-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-2 cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Select Backup File</span>
                    </button>
                  </div>

                  {/* Reset */}
                  <div className="p-6 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                        <RotateCcw className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-sm text-rose-950">
                          Reset to Demo Factory Catalog
                        </h4>
                        <p className="text-xs text-rose-700">
                          Restores initial Tier-1 Longi/Jinko panels, Deye/Growatt inverters, and default turnkey packages.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to restore default demo catalog? Any unsaved custom items will be replaced.')) {
                          resetToDefaults();
                        }
                      }}
                      className="mt-2 px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold flex items-center gap-2 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Restore Demo Catalog</span>
                    </button>
                  </div>

                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* PRODUCT ADD / EDIT MODAL (POPUP) */}
      {isFormOpen && (
        <div className="fixed inset-0 z-60 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]">
            
            <div className="p-4 sm:px-6 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <h3 className="font-heading font-bold text-base">
                {editingProductId ? 'Edit Product & Update Price' : 'Post New Solar Product'}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="overflow-y-auto p-4 sm:p-6 space-y-4 text-xs">
              
              {/* Product Title */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Product Name / Title: *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Longi Hi-MO X6 585W N-Type Bifacial"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-xs"
                />
              </div>

              {/* Category & Brand */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">
                    Category:
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-xs"
                  >
                    {CATEGORIES.filter(c => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">
                    Brand Name:
                  </label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="e.g. Longi, Deye, Narada"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-xs"
                  />
                </div>
              </div>

              {/* Pricing & Unit */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-emerald-800 block mb-1">
                    Selling Price ({settings.currencySymbol}): *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="34500"
                    className="w-full px-3 py-2 rounded-xl border border-emerald-300 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-500 block mb-1">
                    Original Price (Optional):
                  </label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    placeholder="38000"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Price Unit:
                  </label>
                  <input
                    type="text"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    placeholder="per panel, unit, etc."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-xs"
                  />
                </div>
              </div>

              {/* Image URL & Local Upload */}
              <div className="space-y-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Product Image:</span>
                  </label>
                  
                  {/* File Upload Trigger */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageFileUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[11px] font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Upload Photo from Device</span>
                  </button>
                </div>

                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="Paste Image URL (or use Upload button above)"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-xs bg-white"
                />

                {formData.image && (
                  <div className="mt-2 flex items-center gap-3">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-16 h-12 object-cover rounded-lg border border-slate-200"
                    />
                    <span className="text-[11px] text-slate-500">Image Preview Ready</span>
                  </div>
                )}
              </div>

              {/* Badge & Stock */}
              <div className="grid grid-cols-2 gap-3 items-center">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">
                    Badge / Tag (e.g. Bestseller, Tier 1, N-Type):
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="Bestseller"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-800">
                    <input
                      type="checkbox"
                      checked={formData.inStock}
                      onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                      className="rounded text-emerald-600 w-4 h-4"
                    />
                    <span>Available In Stock</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-800">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="rounded text-amber-500 w-4 h-4"
                    />
                    <span>Featured Item</span>
                  </label>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Product Overview / Description:
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe efficiency, cell specs, and application..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-xs"
                />
              </div>

              {/* Dynamic Technical Specs builder */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800">
                    Technical Specifications (Key & Value):
                  </label>
                  <button
                    type="button"
                    onClick={handleAddSpecRow}
                    className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Specification Row</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-36 overflow-y-auto">
                  {formData.specs.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item.key}
                        onChange={(e) => handleSpecChange(idx, 'key', e.target.value)}
                        placeholder="e.g. Power Output"
                        className="w-1/2 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs"
                      />
                      <input
                        type="text"
                        value={item.value}
                        onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                        placeholder="e.g. 585 Watts"
                        className="w-1/2 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveSpecRow(idx)}
                        className="p-1.5 text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingProductId ? 'Update Product' : 'Post to Store'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
