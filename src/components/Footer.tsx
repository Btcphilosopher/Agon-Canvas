import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, Check } from 'lucide-react';

export default function Footer() {
  const [catalogRequested, setCatalogRequested] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmitCatalog = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setCatalogRequested(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#080808] text-white border-t border-white/[0.03] pt-24 pb-16 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Upper footer grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand block */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="flex flex-col items-start">
              <span className="font-sans text-xl font-black tracking-[0.25em] text-white">AGON</span>
              <span className="font-mono text-[9px] tracking-[0.4em] text-neutral-500 uppercase">CANVAS LABORATORY</span>
            </div>
            <p className="font-sans text-xs text-neutral-400 max-w-sm leading-relaxed font-normal uppercase tracking-wider">
              Museum-grade canvas printing engineered to preserve every detail for generations. Built without compromise, for collectors of fine architectural and landscape masterworks.
            </p>
            <div className="flex items-center space-x-2 text-[10px] font-mono text-neutral-500 tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#c2a67a]" />
              <span>ESTABLISHED 2026 • EUROPE / NORTH AMERICA</span>
            </div>
          </div>

          {/* Links column 1 */}
          <div className="grid grid-cols-2 lg:col-span-3 gap-8 text-left">
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-[#c2a67a] uppercase block">DIRECTORY</span>
              <ul className="space-y-2.5 text-xs font-sans">
                <li><a href="#hero" className="text-neutral-400 hover:text-white transition-colors uppercase">The Gallery</a></li>
                <li><a href="#configurator" className="text-neutral-400 hover:text-white transition-colors uppercase">Configurator</a></li>
                <li><a href="#materials" className="text-neutral-400 hover:text-white transition-colors uppercase">Our Canvas</a></li>
                <li><a href="#process" className="text-neutral-400 hover:text-white transition-colors uppercase">Craftsmanship</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-[#c2a67a] uppercase block">MATERIALS INDEX</span>
              <ul className="space-y-2.5 text-xs font-sans text-neutral-400">
                <li className="uppercase">Belgian Flax Linen</li>
                <li className="uppercase">FSC Walnut</li>
                <li className="uppercase">FSC White Oak</li>
                <li className="uppercase">UltraChrome HDR</li>
              </ul>
            </div>
          </div>

          {/* Luxury Newsletter Catalog Request */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <span className="text-[10px] font-mono tracking-widest text-[#c2a67a] uppercase block">THE COLLECTOR REGISTRY</span>
            <p className="font-sans text-xs text-neutral-400 uppercase tracking-wide leading-relaxed">
              Request the annual hardbound Agon Collection Catalog, featuring macro photography and limited-edition fine art lithography.
            </p>

            <AnimatePresence mode="wait">
              {catalogRequested ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 bg-neutral-900 border border-[#c2a67a]/30 flex items-center space-x-3 text-xs"
                >
                  <Check className="w-4 h-4 text-[#c2a67a] stroke-[2.5]" />
                  <span className="font-sans font-medium text-neutral-200 uppercase">Registry Confirmed. Catalog Shipped.</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmitCatalog} className="flex border border-white/[0.08] bg-[#121212] focus-within:border-[#c2a67a] transition-colors">
                  <input 
                    type="email" 
                    required
                    placeholder="ENTER YOUR CORRESPONDENCE EMAIL" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-transparent p-4 text-[10px] font-mono text-white focus:outline-none placeholder-neutral-600 tracking-wider"
                  />
                  <button 
                    type="submit"
                    aria-label="Submit catalog request"
                    className="px-5 bg-white text-black hover:bg-neutral-200 transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 stroke-[1.8]" />
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Lower footer legal details */}
        <div className="border-t border-white/[0.04] pt-12 flex flex-col md:flex-row md:items-center justify-between gap-6 text-[10px] font-mono text-neutral-500 uppercase tracking-widest text-left">
          <div className="space-y-1">
            <p>© 2026 AGON CANVAS INC. ALL RIGHTS RESERVED.</p>
            <p className="text-[8px] text-neutral-600">ENGINEERED FOR GENERATIONAL PERMANENCE IN MUNICH & NEW YORK.</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <span className="hover:text-white transition-colors cursor-pointer">PRE-FLIGHT SECURITY</span>
            <span className="hover:text-white transition-colors cursor-pointer">TERMS OF PATRONAGE</span>
            <span className="hover:text-white transition-colors cursor-pointer">ACCESSIBILITY CERTIFICATE</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
