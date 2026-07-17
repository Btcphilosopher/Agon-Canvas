import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sliders, Eye } from 'lucide-react';
import { CURATED_ARTWORKS } from '../constants';
import { CuratedArtwork } from '../types';

interface GalleryProps {
  onSelectArtwork: (artwork: CuratedArtwork) => void;
}

export default function Gallery({ onSelectArtwork }: GalleryProps) {
  // Extended artwork listings for gallery variety
  const exhibitionArtworks = [
    ...CURATED_ARTWORKS,
    {
      id: 'artwork-5',
      title: 'STARK DESERT RIPPLES V',
      artist: 'Kamal Al-Sabbah',
      url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=1200',
      year: '2025',
      style: 'Monochrome Topography'
    },
    {
      id: 'artwork-6',
      title: 'TENSION IN STONE AND TIMBER',
      artist: 'Saskia van der Wood',
      url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200',
      year: '2026',
      style: 'Brutalist Interior'
    }
  ];

  return (
    <section id="gallery" className="bg-[#0A0A0A] text-white py-28 relative border-b border-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Gallery Intro */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between border-b border-white/[0.04] pb-10 gap-6">
          <div className="space-y-3 text-left">
            <span className="text-[10px] tracking-[0.4em] font-mono text-[#c2a67a] uppercase block">EXHIBITION COLLECTION</span>
            <h2 className="font-sans text-3xl md:text-4xl font-black tracking-tight uppercase leading-none">CURATED FINE ARTWORKS</h2>
          </div>
          <p className="font-sans text-xs text-neutral-400 max-w-sm font-normal uppercase tracking-wider leading-relaxed text-left">
            Select one of our limited-run, licensed masterworks to build your custom stretched canvas print. Or upload your own high-fidelity portfolio.
          </p>
        </div>

        {/* Masonry-inspired grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exhibitionArtworks.map((art, idx) => (
            <motion.div 
              key={art.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: (idx % 3) * 0.1 }}
              className="group relative flex flex-col justify-between bg-[#121212] border border-white/[0.03] overflow-hidden"
            >
              
              {/* Image viewport container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900 border-b border-white/[0.03]">
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center space-x-3 pointer-events-none">
                  <div className="bg-white text-black p-3 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <Sliders className="w-4 h-4" />
                  </div>
                </div>

                <img 
                  src={art.url} 
                  alt={art.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Corner year indicator */}
                <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md px-2 py-0.5 border border-white/[0.05] font-mono text-[8px] text-neutral-400 uppercase tracking-widest">
                  {art.year} ED.
                </div>
              </div>

              {/* Text metadata footer card */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between text-left">
                <div className="space-y-1">
                  <span className="font-mono text-[9px] tracking-widest text-[#c2a67a] uppercase block">{art.style}</span>
                  <h3 className="font-sans text-xs font-bold tracking-wider text-white uppercase line-clamp-1">{art.title}</h3>
                  <span className="font-mono text-[10px] text-neutral-500 block uppercase">Artist: {art.artist}</span>
                </div>

                <div className="pt-4 border-t border-white/[0.03] flex items-center justify-between">
                  <span className="font-mono text-[9px] text-neutral-600 uppercase tracking-widest">Exhibition Masterwork</span>
                  
                  <button
                    onClick={() => {
                      onSelectArtwork(art);
                      const target = document.getElementById('configurator');
                      if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-xs font-sans text-white hover:text-[#c2a67a] font-bold tracking-[0.15em] uppercase transition-colors flex items-center space-x-1 cursor-pointer"
                  >
                    <span>Configure</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Secondary Trust statement block */}
        <div className="mt-20 border border-white/[0.03] bg-[#121212]/30 p-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#c2a67a] uppercase block">ARTIST PARTNERSHIP</span>
            <p className="font-sans text-xs text-neutral-400 font-normal leading-relaxed">
              Every curated piece is licensed in strict collaboration with the artist. We pay 40% of all print revenue directly back to original creators.
            </p>
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#c2a67a] uppercase block">GICLÉE VERIFICATION</span>
            <p className="font-sans text-xs text-neutral-400 font-normal leading-relaxed">
              Shipments include a security-watermarked Certificate of Authenticity signed by both the artisan stretch master and the printing director.
            </p>
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#c2a67a] uppercase block">DPI UPSCALING LAB</span>
            <p className="font-sans text-xs text-neutral-400 font-normal leading-relaxed">
              We employ advanced bicubic interpolation algorithms to safely enlarge medium-resolution custom imagery without introducing block noise.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
