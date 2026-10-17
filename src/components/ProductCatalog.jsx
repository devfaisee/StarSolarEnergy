import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/initialData';
import { 
  Sun, 
  Zap, 
  BatteryCharging, 
  PackageCheck, 
  Wrench, 
  LayoutGrid, 
  Search, 
  Filter, 
  MessageCircle, 
  Eye, 
  Plus, 
  Check, 
  Star, 
  Sparkles,
  Info,
  SlidersHorizontal,
  X
} from 'lucide-react';

export const ProductCatalog = ({ onSelectProduct }) => {
  const { products, settings, addToCart, getProductWhatsAppLink } = useStore();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);

  // Extract unique brands dynamically
  const uniqueBrands = useMemo(() => {
    const brands = new Set();
    products.forEach((p) => {
      if (p.brand) brands.add(p.brand);
    });
    return Array.from(brands).sort();
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
          return false;
        }
        // Brand filter
        if (selectedBrand !== 'all' && product.brand !== selectedBrand) {
          return false;
        }
        // Stock filter
        if (onlyInStock && !product.inStock) {
          return false;
        }
        // Search query
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchesName = product.name?.toLowerCase().includes(q);
          const matchesBrand = product.brand?.toLowerCase().includes(q);
          const matchesDesc = product.description?.toLowerCase().includes(q);
          const matchesSpecs = product.specs && Object.values(product.specs).some(val => 
            String(val).toLowerCase().includes(q)
          );
          if (!matchesName && !matchesBrand && !matchesDesc && !matchesSpecs) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        // Default: featured first, then by id
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
  }, [products, selectedCategory, selectedBrand, onlyInStock, searchQuery, sortBy]);

  // Icon mapper helper
  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Sun': return <Sun className="w-4 h-4" />;
      case 'Zap': return <Zap className="w-4 h-4" />;
      case 'BatteryCharging': return <BatteryCharging className="w-4 h-4" />;
      case 'PackageCheck': return <PackageCheck className="w-4 h-4" />;
      case 'Wrench': return <Wrench className="w-4 h-4" />;
      default: return <LayoutGrid className="w-4 h-4" />;
    }
  };

  return (
    <section id="products" className="py-16 sm:py-24 bg-slate-50 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Sun className="w-3.5 h-3.5 text-emerald-600" />
            <span>Direct Wholesale & Retail Inventory</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Explore Solar Panels, Inverters & Batteries
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            All equipment is 100% genuine with official serial numbers, factory test certificates, and warranty. Click <span className="font-semibold text-emerald-700">"WhatsApp Buy / Inquire"</span> for live stock verification & instant discount.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-10 space-y-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sm:justify-center">
            {CATEGORIES.map((cat) => {
              const count = cat.id === 'all' 
                ? products.length 
                : products.filter(p => p.category === cat.id).length;
              const isActive = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {getCategoryIcon(cat.icon)}
                  <span>{cat.name}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[11px] ${
                      isActive ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search, Brand & Sort Options */}
          <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            
            {/* Search Box */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by panel wattage, inverter model, brand (Longi, Deye, etc.)..."
                className="w-full pl-10 pr-9 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Dropdown Filters */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Brand Filter */}
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="all">All Brands</option>
                {uniqueBrands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>

              {/* In Stock toggle */}
              <label className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 cursor-pointer select-none bg-white hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>In Stock Only</span>
              </label>
            </div>

          </div>
        </div>

        {/* Results Counter / Clear */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-500 px-1">
          <span>
            Showing <strong className="text-slate-900 font-semibold">{filteredProducts.length}</strong> items in inventory
          </span>
          {(searchQuery || selectedBrand !== 'all' || selectedCategory !== 'all' || onlyInStock) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedBrand('all');
                setSelectedCategory('all');
                setOnlyInStock(false);
              }}
              className="text-emerald-700 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              Reset all filters
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="mt-12 bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900">
              No matching solar products found
            </h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search query, selecting another category, or clearing the brand filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedBrand('all');
                setSelectedCategory('all');
                setOnlyInStock(false);
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const whatsappUrl = getProductWhatsAppLink(product);
              const discountPercent = product.originalPrice > product.price 
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500/40 shadow-sm hover:shadow-xl hover:shadow-emerald-950/5 transition-all duration-300 flex flex-col overflow-hidden group"
                >
                  {/* Image Container with Badges */}
                  <div className="relative aspect-[16/11] bg-slate-100 overflow-hidden cursor-pointer" onClick={() => onSelectProduct(product)}>
                    <img
                      src={product.image || 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Badge top-left */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                      {product.badge && (
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-400 text-slate-950 shadow-md">
                          {product.badge}
                        </span>
                      )}
                      {discountPercent > 0 && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-rose-600 text-white shadow-sm">
                          Save {discountPercent}%
                        </span>
                      )}
                    </div>

                    {/* Stock pill top-right */}
                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold shadow-sm ${
                          product.inStock
                            ? 'bg-emerald-600/95 text-white'
                            : 'bg-slate-700/95 text-slate-200'
                        }`}
                      >
                        {product.inStock ? '● In Stock' : 'Pre-Order'}
                      </span>
                    </div>

                    {/* Quick view hover icon button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-slate-900 text-xs font-bold shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Eye className="w-3.5 h-3.5 text-emerald-600" />
                        Quick View Specs
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Brand & Category line */}
                      <div className="flex items-center justify-between text-xs text-slate-500 font-medium pb-2 border-b border-slate-100">
                        <span className="font-semibold text-emerald-700 uppercase tracking-wider text-[11px]">
                          {product.brand}
                        </span>
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span className="font-bold text-slate-800 text-xs">{product.rating || '5.0'}</span>
                          <span className="text-[11px] text-slate-400">({product.reviewsCount || 12})</span>
                        </div>
                      </div>

                      {/* Product Title */}
                      <h3
                        onClick={() => onSelectProduct(product)}
                        className="font-heading font-bold text-base sm:text-lg text-slate-900 mt-2.5 hover:text-emerald-700 transition-colors cursor-pointer line-clamp-2 leading-snug"
                        title={product.name}
                      >
                        {product.name}
                      </h3>

                      {/* Short Description */}
                      <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Key Technical Specs preview pills */}
                      {product.specs && Object.keys(product.specs).length > 0 && (
                        <div className="mt-3.5 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px]">
                          {Object.entries(product.specs).slice(0, 4).map(([key, value]) => (
                            <div key={key} className="bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                              <span className="text-slate-400 block text-[9px] uppercase tracking-wider leading-tight">{key}</span>
                              <span className="font-semibold text-slate-800 truncate block">{value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Price & Action Section */}
                    <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
                      {/* Price Display */}
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-xs text-slate-400 block leading-none">Wholesale Rate</span>
                          <div className="flex items-baseline gap-2 mt-0.5">
                            <span className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900">
                              {settings.currencySymbol} {product.price.toLocaleString()}
                            </span>
                            {product.unit && (
                              <span className="text-xs font-medium text-slate-500">
                                /{product.unit}
                              </span>
                            )}
                          </div>
                        </div>

                        {product.originalPrice > product.price && (
                          <span className="text-xs text-slate-400 line-through">
                            {settings.currencySymbol} {product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* Direct 1-Click WhatsApp Button - HIGH PROMINENCE */}
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 shadow-md shadow-emerald-600/20 transition-all cursor-pointer group/btn"
                      >
                        <MessageCircle className="w-4 h-4 fill-white group-hover/btn:scale-110 transition-transform" />
                        <span>Order / Inquire on WhatsApp</span>
                      </a>

                      {/* Secondary Buttons: View Details & Add to Quote */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => onSelectProduct(product)}
                          className="py-2 px-3 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Info className="w-3.5 h-3.5 text-slate-500" />
                          <span>Full Specs</span>
                        </button>

                        <button
                          onClick={() => addToCart(product)}
                          className="py-2 px-3 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Add to Quote</span>
                        </button>
                      </div>

                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
