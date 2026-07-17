import React, { useState } from 'react';
import { ShoppingBag, Menu, X, ArrowRight, ShieldCheck, Trash2 } from 'lucide-react';
import { CartItem } from '../types';
import { FRAMES, SIZES } from '../constants';

interface NavigationProps {
  cart: CartItem[];
  onRemoveCartItem: (id: string) => void;
  onViewCheckout: () => void;
  onViewConfigurator: () => void;
  onViewSection: (sectionId: string) => void;
  activeSection: string;
}

export default function Navigation({
  cart,
  onRemoveCartItem,
  onViewCheckout,
  onViewConfigurator,
  onViewSection,
  activeSection
}: NavigationProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  const handleLinkClick = (sectionId: string) => {
    onViewSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav id="navbar" className="fixed top-0 left-0 w-full z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/[0.04] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <button 
            onClick={() => handleLinkClick('hero')}
            className="flex flex-col items-start cursor-pointer group text-left"
          >
            <span className="font-sans text-lg font-bold tracking-[0.25em] text-white transition-colors group-hover:text-[#c2a67a]">
              AGON
            </span>
            <span className="font-mono text-[9px] tracking-[0.4em] text-neutral-500 transition-colors group-hover:text-neutral-300">
              CANVAS
            </span>
          </button>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-10">
            {[
              { id: 'hero', label: 'HOME' },
              { id: 'configurator', label: 'SHOP / BUILD' },
              { id: 'materials', label: 'WHY WE\'RE DIFFERENT' },
              { id: 'process', label: 'CRAFTSMANSHIP' },
              { id: 'gallery', label: 'GALLERY' }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-xs tracking-[0.2em] font-sans font-medium hover:text-[#c2a67a] transition-all duration-300 relative py-2 cursor-pointer ${
                  activeSection === link.id ? 'text-white' : 'text-neutral-400'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#c2a67a] rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-6">
            <button
              id="cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Open shopping cart"
            >
              <ShoppingBag className="w-[18px] h-[18px] stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-[#c2a67a] text-black font-sans font-bold text-[9px] flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 stroke-[1.5]" />
              ) : (
                <Menu className="w-5 h-5 stroke-[1.5]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0D0D0D] border-b border-white/[0.04] px-6 py-8 space-y-6">
            {[
              { id: 'hero', label: 'HOME' },
              { id: 'configurator', label: 'SHOP / BUILD' },
              { id: 'materials', label: 'WHY WE\'RE DIFFERENT' },
              { id: 'process', label: 'CRAFTSMANSHIP' },
              { id: 'gallery', label: 'GALLERY' }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`block w-full text-left text-xs tracking-[0.2em] font-sans font-medium ${
                  activeSection === link.id ? 'text-white' : 'text-neutral-400'
                } py-2`}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Luxury Cart Drawer (Overlay) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <div 
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
          />

          {/* Drawer Container */}
          <div className="relative w-full max-w-lg bg-[#0F0F0F] border-l border-white/[0.05] shadow-2xl h-full flex flex-col justify-between z-10">
            
            {/* Drawer Header */}
            <div className="p-8 border-b border-white/[0.04] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-xs tracking-[0.3em] font-sans text-neutral-400 uppercase">Your Gallery Order</span>
                <span className="bg-neutral-800 text-neutral-300 font-mono text-[10px] px-2 py-0.5 rounded">
                  {cartCount} {cartCount === 1 ? 'item' : 'items'}
                </span>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 text-neutral-500 hover:text-white hover:bg-neutral-900 rounded transition-colors"
              >
                <X className="w-4 h-4 stroke-[1.5]" />
              </button>
            </div>

            {/* Cart Items Area */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <ShoppingBag className="w-10 h-10 text-neutral-700 stroke-[1]" />
                  <p className="font-sans text-xs text-neutral-400 tracking-[0.1em] uppercase">No collection items added</p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      onViewConfigurator();
                    }}
                    className="mt-2 text-xs text-[#c2a67a] hover:underline cursor-pointer tracking-[0.1em] uppercase"
                  >
                    Configure Custom Print &rarr;
                  </button>
                </div>
              ) : (
                cart.map((item) => {
                  const sizeOpt = SIZES.find(s => s.id === item.size);
                  const frameOpt = FRAMES.find(f => f.id === item.frame);
                  
                  return (
                    <div key={item.id} className="flex gap-5 pb-6 border-b border-white/[0.03] last:border-0 last:pb-0">
                      {/* Thumbnail container with live simulated borders */}
                      <div className="relative w-24 h-24 bg-neutral-900 border border-white/[0.04] flex-shrink-0 flex items-center justify-center overflow-hidden">
                        <img 
                          src={item.artwork.url} 
                          alt={item.artwork.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        {item.frame !== 'none' && (
                          <div className="absolute inset-0 border-[3px] pointer-events-none" style={{ borderColor: frameOpt?.color }} />
                        )}
                      </div>

                      {/* Item details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-sans text-xs tracking-wider text-white font-medium uppercase line-clamp-1">{item.artwork.title}</h4>
                            <span className="font-mono text-xs text-white">${item.totalPrice}</span>
                          </div>
                          <p className="font-mono text-[10px] text-neutral-400 mt-1 uppercase">By {item.artwork.artist}</p>
                          
                          {/* Specs summary */}
                          <div className="mt-2 space-y-0.5">
                            <div className="text-[10px] text-neutral-400 font-sans">
                              Size: <span className="text-neutral-200">{sizeOpt?.label} ({sizeOpt?.dimensions})</span>
                            </div>
                            <div className="text-[10px] text-neutral-400 font-sans">
                              Frame: <span className="text-neutral-200">{frameOpt?.name}</span>
                            </div>
                            <div className="text-[10px] text-neutral-400 font-sans">
                              Finish: <span className="text-neutral-200 capitalize">{item.finish}</span>
                            </div>
                          </div>
                        </div>

                        {/* Quantity controls & Delete */}
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-[10px] text-neutral-500 font-sans uppercase">Qty: {item.quantity}</span>
                          <button
                            onClick={() => onRemoveCartItem(item.id)}
                            className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5 stroke-[1.5]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Order Summary */}
            {cart.length > 0 && (
              <div className="p-8 border-t border-white/[0.04] bg-[#0C0C0C] space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-neutral-400 font-sans tracking-widest uppercase">Subtotal</span>
                    <span className="font-mono text-sm text-white">${cartSubtotal}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-neutral-500 font-sans tracking-widest uppercase">Museum crating & white glove delivery</span>
                    <span className="text-[#c2a67a] font-mono tracking-widest uppercase">Complimentary</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      onViewCheckout();
                    }}
                    className="w-full bg-white hover:bg-neutral-200 text-black py-4 px-6 text-xs font-sans tracking-[0.2em] font-bold uppercase transition-all duration-300 flex items-center justify-center space-x-2 group cursor-pointer"
                  >
                    <span>Proceed to Secured Checkout</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>

                <div className="flex items-center justify-center space-x-2 text-[10px] text-neutral-500 font-sans">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-600" />
                  <span>Museum Insured Packaging Included</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
