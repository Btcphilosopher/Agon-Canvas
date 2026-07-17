import React from 'react';
import { motion } from 'motion/react';
import { Award, Layers, ShieldCheck, Heart, Sparkles, Box } from 'lucide-react';
import { ASSETS } from '../constants';

export default function Materials() {
  const materialsList = [
    {
      icon: <Layers className="w-5 h-5 text-[#c2a67a]" />,
      title: "PREMIUM BELGIAN FLAX",
      description: "0.45mm thick, acid-free pure cotton-linen canvas weave. Absorbs pigments at a molecular level for deep blacks and zero-fade permanence."
    },
    {
      icon: <Award className="w-5 h-5 text-[#c2a67a]" />,
      title: "MITERED HARDWOOD JOINTS",
      description: "FSC American Walnut and White Oak profile frames with hand-chiseled mortise and miter joints that remain perfectly level forever."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#c2a67a]" />,
      title: "200+ YEAR CHROMATIC PROOF",
      description: "Original UltraChrome HDR ink with a massive 12-channel micro-piezo firing system, ensuring true color accuracy and archival-level longevity."
    },
    {
      icon: <Box className="w-5 h-5 text-[#c2a67a]" />,
      title: "WHITE-GLOVE MUSEUM CRATING",
      description: "Every order is wrapped in custom-milled Tyvek protective shielding and shipped inside heavy-duty, reinforced plywood crates."
    }
  ];

  return (
    <section id="materials" className="bg-[#0A0A0A] text-white py-28 relative overflow-hidden border-b border-white/[0.02]">
      {/* Background radial soft light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,#121212,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Editorial Brand Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24 pb-12 border-b border-white/[0.04]">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] tracking-[0.4em] font-mono text-[#c2a67a] uppercase block">Quiet Luxury Craft</span>
            <h2 className="font-sans text-3xl md:text-5xl font-black tracking-tight leading-none uppercase">
              ENGINEERED<br/>WITHOUT<br/>COMPROMISE
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6">
            <p className="font-sans text-sm text-neutral-400 font-normal leading-relaxed tracking-wide">
              We do not produce quick-print novelty merchandise. AGON Canvas operates at the rigorous intersect of precision German optical engineering and timeless Italian custom wood framing. Our materials are curated for collectors who demand absolute visual perfection and generational permanence.
            </p>
            <div className="flex flex-wrap items-center gap-6 font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
              <span>• GERMAN PIEZO HEADS</span>
              <span>• SUSTAINABLE FSC FORESTRY</span>
              <span>• COMPLIMENTARY COATING</span>
            </div>
          </div>
        </div>

        {/* 2-Column Luxury Presentation Grid with Large Cinematics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Macro Canvas Fiber focus */}
          <div className="space-y-8">
            <div className="relative aspect-[4/3] overflow-hidden border border-white/[0.05] group bg-neutral-900 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
              <img 
                src={ASSETS.canvasTextureMacro} 
                alt="Extreme close-up macro lens photography of woven Belgian canvas linen texture with premium pigment dots"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 left-6 z-20 text-left">
                <span className="font-mono text-[9px] tracking-widest text-[#c2a67a] block uppercase mb-1">SPECIMEN X-44</span>
                <h3 className="font-sans text-sm font-bold tracking-wider uppercase text-white">BELGIAN COTTON FLAX WEAVE</h3>
                <p className="font-sans text-[11px] text-neutral-400 mt-1 max-w-sm">450gsm heavyweight linen weave showing perfect interlocking grid structure.</p>
              </div>
            </div>

            <div className="space-y-3 text-left">
              <span className="font-mono text-[9px] tracking-widest text-neutral-500 uppercase block">Inking System</span>
              <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                Using ultra-fine sub-picoliter aqueous pigment particles, we burn continuous color transitions into the fibers without closing the natural breathing pores of the premium canvas structure.
              </p>
            </div>
          </div>

          {/* Right Column: Hand-Mitered Wood Corner Joint focus */}
          <div className="space-y-8 lg:mt-12">
            <div className="relative aspect-[4/3] overflow-hidden border border-white/[0.05] group bg-neutral-900 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
              <img 
                src={ASSETS.frameJointMacro} 
                alt="Seamless 45-degree hand-chiseling and walnut wood frame joinery closeup details"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 left-6 z-20 text-left">
                <span className="font-mono text-[9px] tracking-widest text-[#c2a67a] block uppercase mb-1">SPECIMEN W-02</span>
                <h3 className="font-sans text-sm font-bold tracking-wider uppercase text-white">SEAMLESS WALNUT JOINERY</h3>
                <p className="font-sans text-[11px] text-neutral-400 mt-1 max-w-sm">45-degree mitered corners with integrated tension key systems to adjust tautness.</p>
              </div>
            </div>

            <div className="space-y-3 text-left">
              <span className="font-mono text-[9px] tracking-widest text-neutral-500 uppercase block">Stretcher Integrity</span>
              <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                Each wood frame is carved from slow-grown FSC-certified North American Walnut, kiln-dried to less than 8% moisture content to prevent warps, contractions, or sags under fluctuating room environments.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Column Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-24 mt-24 border-t border-white/[0.04] text-left">
          {materialsList.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="space-y-4"
            >
              <div className="w-10 h-10 rounded-full bg-white/[0.02] border border-white/[0.06] flex items-center justify-center">
                {item.icon}
              </div>
              <h4 className="font-sans text-xs font-bold tracking-[0.15em] text-white uppercase">{item.title}</h4>
              <p className="font-sans text-[11px] text-neutral-400 leading-relaxed font-normal">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
