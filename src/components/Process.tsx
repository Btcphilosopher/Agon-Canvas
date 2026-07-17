import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sliders, Check, Settings, Sparkles, Box, ShieldCheck } from 'lucide-react';

interface ProcessStep {
  num: string;
  title: string;
  subtitle: string;
  description: string;
  detailSpecs: string[];
}

export default function Process() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps: ProcessStep[] = [
    {
      num: "01",
      title: "PRE-FLIGHT DIAGNOSTICS",
      subtitle: "Fidelity Validation",
      description: "Upon receiving your digital submission, our automated pre-flight system scans the image to map color bounds, verify embedded ICC profiles, and calculate the absolute native DPI limit to guarantee zero-artifact interpolation.",
      detailSpecs: ["DPI & Grain Integrity Scan", "16-bit Color Gamut Extraction", "Custom ICC Profile Calibration"]
    },
    {
      num: "02",
      title: "GICLÉE MICRO-PIGMENTATION",
      subtitle: "Archival Ink Infusion",
      description: "Using our calibrated 12-channel physical inkjet heads, pigments are heated and fired at microscopic densities directly onto the Belgian flax. The process creates molecular bonds, locking the imagery inside the cotton fibers.",
      detailSpecs: ["12-Channel Micro-Piezo Printing", "Sub-Picoliter Droplet Precision", "True Monochromatic Velvet Carbon"]
    },
    {
      num: "03",
      title: "HAND-TENSIONING & MITERING",
      subtitle: "Artisan Wood Mount",
      description: "Our certified master-joiners pull, stretch, and align the canvas around hand-carved basswood bars. Each mitered corner is double-reinforced and embedded with a mechanical tension key to allow adjustments across generations.",
      detailSpecs: ["45° Hand-Mitered Joinery", "Symmetric Tension Pull-System", "Timber Tension Key Integration"]
    },
    {
      num: "04",
      title: "WHITE-GLOVE CRATE SHIPPING",
      subtitle: "Museum Insured Courier",
      description: "Sealed in anti-static glassine museum paper and secured inside dual-wall cellular cushions. The canvas is locked inside a custom-milled wooden plywood crate, fully insured, and hand-delivered directly to your wall.",
      detailSpecs: ["Double-Wall Custom Ply Crates", "Tyvek Hydrophobic Wrapping", "Transit Collision Insurance Included"]
    }
  ];

  return (
    <section id="process" className="bg-[#0E0E0E] text-white py-28 relative border-b border-white/[0.02]">
      {/* Subtle top horizontal separator */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Editorial Header */}
        <div className="max-w-xl space-y-4 mb-20 text-left">
          <span className="text-[10px] tracking-[0.4em] font-mono text-[#c2a67a] uppercase block">THE ARTISAN PATHWAY</span>
          <h2 className="font-sans text-3xl md:text-4xl font-black tracking-tight uppercase leading-none">FOUR STAGES OF MUSEUM EXCELLENCE</h2>
          <p className="font-sans text-xs text-neutral-400 font-normal uppercase tracking-wider leading-relaxed pt-2">
            Every canvas undergoes an uncompromising four-part manufacturing sequence before receiving the verified Agon stamp of authenticity.
          </p>
        </div>

        {/* Dynamic Selection Horizontal Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left/Middle Column: Timeline selector buttons */}
          <div className="lg:col-span-5 space-y-3">
            {steps.map((step, idx) => (
              <button
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`w-full p-6 text-left border transition-all duration-300 flex items-center justify-between cursor-pointer relative ${
                  activeStep === idx 
                    ? 'border-[#c2a67a] bg-[#141414]' 
                    : 'border-white/[0.03] hover:border-white/[0.08] hover:bg-white/[0.01]'
                }`}
              >
                {/* Visual side active status line */}
                {activeStep === idx && (
                  <span className="absolute left-0 top-0 h-full w-[3px] bg-[#c2a67a]" />
                )}

                <div className="flex items-center space-x-6">
                  {/* Step Number */}
                  <span className={`font-mono text-xs font-bold tracking-wider ${
                    activeStep === idx ? 'text-[#c2a67a]' : 'text-neutral-500'
                  }`}>
                    {step.num}
                  </span>
                  
                  {/* Step Titles */}
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-neutral-500 block uppercase mb-0.5">{step.subtitle}</span>
                    <h3 className="font-sans text-xs tracking-wider text-white font-extrabold uppercase">{step.title}</h3>
                  </div>
                </div>

                {/* Bullet active node check */}
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                  activeStep === idx 
                    ? 'border-[#c2a67a] bg-[#c2a67a]/10 text-[#c2a67a]' 
                    : 'border-neutral-800 text-neutral-600'
                }`}>
                  <span className="text-[9px] font-mono font-bold">{idx + 1}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Right Column: Detailed active step card */}
          <div className="lg:col-span-7 bg-[#121212] border border-white/[0.03] p-8 md:p-12 min-h-[380px] flex flex-col justify-between text-left relative overflow-hidden">
            
            {/* Soft decorative visual numbering */}
            <div className="absolute right-8 top-4 font-mono text-[100px] font-bold text-white/[0.01] select-none leading-none pointer-events-none">
              {steps[activeStep].num}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <span className="text-[9px] font-mono tracking-widest text-[#c2a67a] uppercase block">{steps[activeStep].subtitle}</span>
                  <h3 className="font-sans text-lg md:text-xl font-black text-white uppercase tracking-wider">{steps[activeStep].title}</h3>
                </div>

                <p className="font-sans text-xs text-neutral-400 font-normal leading-relaxed tracking-wide uppercase">
                  {steps[activeStep].description}
                </p>

                {/* Fine spec bullets */}
                <div className="pt-6 border-t border-white/[0.04]">
                  <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase block mb-4">SPECIFICATION DETAILS</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {steps[activeStep].detailSpecs.map((spec, sidx) => (
                      <div key={sidx} className="flex items-start space-x-3 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c2a67a] mt-1.5 flex-shrink-0" />
                        <span className="font-sans text-neutral-300 font-medium">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Micro assurance disclaimer */}
            <div className="pt-8 flex items-center space-x-3 text-[10px] text-neutral-500 font-sans mt-8 border-t border-white/[0.02]">
              <ShieldCheck className="w-4 h-4 text-[#c2a67a]" />
              <span>Agon Handfinished Production Standard Certificate Included with Shipment</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
