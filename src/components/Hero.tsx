import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Layers } from 'lucide-react';
import { ASSETS } from '../constants';

interface HeroProps {
  onBuildCanvas: () => void;
  onExploreMaterials: () => void;
}

export default function Hero({ onBuildCanvas, onExploreMaterials }: HeroProps) {
  return (
    <section 
      id="hero-section" 
      className="relative min-h-screen bg-[#0A0A0A] flex flex-col justify-center overflow-hidden pt-24"
    >
      {/* Background architectural fine grain overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#161616,transparent_70%)] opacity-80 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Column: Big Architecture Typography */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-8 text-left">
          
          {/* Subtle upper title */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center space-x-2.5 text-[10px] tracking-[0.4em] text-[#c2a67a] font-mono font-medium"
          >
            <Sparkles className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>MUSEUM-GRADE ARCHIVAL GICLÉE</span>
          </motion.div>

          {/* Huge Architectural Header */}
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-white font-sans text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight leading-[0.95] uppercase"
          >
            PRINTED
            <span className="block text-neutral-400">TO LAST</span>
            <span className="block text-[#c2a67a]">GENERATIONS</span>
          </motion.h1>

          {/* Luxury context subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-sm text-neutral-400 font-normal leading-relaxed max-w-md tracking-wide"
          >
            Museum-grade Belgian linen stretched over air-dried American basswood. Engineered by hand with continuous color pigment technology rated to endure over two centuries.
          </motion.p>

          {/* Action CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
          >
            {/* Primary CTA button */}
            <button
              onClick={onBuildCanvas}
              className="bg-white hover:bg-neutral-200 text-black py-4 px-8 text-xs font-sans tracking-[0.2em] font-bold uppercase transition-all duration-300 flex items-center justify-center space-x-2 group cursor-pointer"
            >
              <span>Build Custom Print</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Secondary CTA button */}
            <button
              onClick={onExploreMaterials}
              className="border border-white/[0.12] hover:border-white/40 hover:bg-white/[0.02] text-white py-4 px-8 text-xs font-sans tracking-[0.2em] font-medium uppercase transition-all duration-300 flex items-center justify-center cursor-pointer"
            >
              Explore Our Difference
            </button>
          </motion.div>

          {/* Tech Spec Badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-2 gap-4 pt-8 border-t border-white/[0.04] max-w-sm"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">Color Guarantee</span>
              <span className="text-xs font-sans text-neutral-300 font-medium block">200-Year Lightfastness</span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">Structural Integrity</span>
              <span className="text-xs font-sans text-neutral-300 font-medium block">Tension-Keyed Timber</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Giant Canvas on concrete wall */}
        <div className="lg:col-span-7 flex justify-center items-center h-full">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-[16/11] rounded-none overflow-hidden group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border border-white/[0.03]"
          >
            {/* Overlay reflection effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] via-transparent to-white/[0.03] z-20 pointer-events-none" />
            
            {/* Main high fidelity generated architectural interior */}
            <img 
              src={ASSETS.heroCanvas} 
              alt="Premium 1.5-inch thick canvas print mounted inside luxury architectural walnut home" 
              className="w-full h-full object-cover transition-transform duration-10000 ease-out group-hover:scale-[1.03]"
              referrerPolicy="no-referrer"
            />

            {/* Simulated frame hover badge */}
            <div className="absolute bottom-6 right-6 z-30 bg-[#0F0F0F]/80 backdrop-blur-md border border-white/[0.08] p-4 text-left pointer-events-none">
              <span className="text-[9px] font-mono tracking-[0.2em] text-[#c2a67a] block mb-1">SPECIFICATION</span>
              <span className="text-xs font-sans font-medium text-white block uppercase">The Gallery Monolith (40″ × 60″)</span>
              <span className="text-[10px] font-sans text-neutral-400 block">Solid Walnut Float Stretcher</span>
            </div>

            {/* Beautiful shadow layer */}
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none z-30" />
          </motion.div>
        </div>
      </div>

      {/* Luxury Brand Marquee / Stat Ribbon */}
      <div className="border-t border-b border-white/[0.03] bg-[#0A0A0A] py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { metric: '0.45mm', desc: 'Belgian Linen Weave' },
            { metric: '100%', desc: 'Acid-Free Archival Raw Core' },
            { metric: '12-Color', desc: 'UltraChrome Molecular Inks' },
            { metric: 'Lifetime', desc: 'Anti-Sag Timber Warranty' },
          ].map((stat, idx) => (
            <div key={idx} className="text-center md:text-left space-y-1">
              <span className="font-sans text-lg lg:text-xl text-white font-extrabold tracking-wide block uppercase">{stat.metric}</span>
              <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block">{stat.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
