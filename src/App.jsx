import React, { useState, useEffect } from 'react';
import { useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SolarCalculator } from './components/SolarCalculator';
import { SolarPackages } from './components/SolarPackages';
import { DailyRateSheet } from './components/DailyRateSheet';
import { ProjectsGallery } from './components/ProjectsGallery';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Testimonials } from './components/Testimonials';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminPortal } from './components/AdminPortal';
import { QuoteDrawer } from './components/QuoteDrawer';
import { OfficialQuoteModal } from './components/OfficialQuoteModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileBottomBar } from './components/MobileBottomBar';
import { Toast } from './components/Toast';

export function App() {
  const { officialQuoteData, setOfficialQuoteData } = useStore();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isRateSheetOpen, setIsRateSheetOpen] = useState(false);
  const [isQuoteDrawerOpen, setIsQuoteDrawerOpen] = useState(false);

  // Discreet URL Hash #admin detection
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.hash === '#admin') {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative selection:bg-amber-400 selection:text-slate-950 font-sans">
      {/* Toast Notification */}
      <Toast />

      {/* Main Navbar */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenQuoteDrawer={() => setIsQuoteDrawerOpen(true)}
        onOpenRateSheet={() => setIsRateSheetOpen(true)}
      />

      {/* Main Landing Page Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenRateSheet={() => setIsRateSheetOpen(true)} />

        {/* Product Catalog with WhatsApp Order */}
        <ProductCatalog onSelectProduct={(product) => setSelectedProduct(product)} />

        {/* Turnkey Solar Packages */}
        <SolarPackages onSelectPackage={(pkg) => setSelectedProduct(pkg)} />

        {/* Interactive Solar Estimator Calculator */}
        <SolarCalculator />

        {/* Completed Installations Showcase */}
        <ProjectsGallery />

        {/* 4 Trust Pillars */}
        <WhyChooseUs />

        {/* Testimonials & FAQs */}
        <Testimonials />

        {/* Contact & Map Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenRateSheet={() => setIsRateSheetOpen(true)}
      />

      {/* Sticky Floating WhatsApp Widget */}
      <FloatingWhatsApp />

      {/* Sticky Mobile Action Navigation */}
      <MobileBottomBar onOpenQuoteDrawer={() => setIsQuoteDrawerOpen(true)} />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Admin Management Portal */}
      {isAdminOpen && (
        <AdminPortal onClose={handleCloseAdmin} />
      )}

      {/* Daily Solar Rate Sheet Modal */}
      {isRateSheetOpen && (
        <DailyRateSheet onClose={() => setIsRateSheetOpen(false)} />
      )}

      {/* Multi-Item Quote Drawer */}
      <QuoteDrawer
        isOpen={isQuoteDrawerOpen}
        onClose={() => setIsQuoteDrawerOpen(false)}
      />

      {/* Official Turnkey Printable Proposal / Quote Modal */}
      {officialQuoteData && (
        <OfficialQuoteModal
          quoteData={officialQuoteData}
          onClose={() => setOfficialQuoteData(null)}
        />
      )}
    </div>
  );
}

export default App;
