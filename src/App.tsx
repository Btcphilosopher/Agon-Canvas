import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Configurator from './components/Configurator';
import Materials from './components/Materials';
import Process from './components/Process';
import Gallery from './components/Gallery';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import { CartItem, CuratedArtwork } from './types';
import { SIZES, FRAMES } from './constants';

export default function App() {
  const [activeView, setActiveView] = useState<'shopping' | 'checkout'>('shopping');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState<CuratedArtwork | null>(null);

  // Monitor scroll positioning to update active navigation segment
  useEffect(() => {
    if (activeView === 'checkout') return;

    const handleScroll = () => {
      const sections = ['hero-section', 'configurator', 'materials', 'process', 'gallery'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            // Map element ID back to short section name used in Nav
            const navId = sectionId === 'hero-section' ? 'hero' : sectionId;
            setActiveSection(navId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeView]);

  // Add Spec design to Gallery Cart
  const handleAddToCart = (item: Omit<CartItem, 'id' | 'quantity' | 'totalPrice'>) => {
    const sizeOpt = SIZES.find(s => s.id === item.size)!;
    const frameOpt = FRAMES.find(f => f.id === item.frame)!;
    const computedPrice = sizeOpt.basePrice + frameOpt.price;

    const newCartItem: CartItem = {
      ...item,
      id: 'gallery-spec-' + Math.random().toString(36).substring(2, 9),
      quantity: 1,
      totalPrice: computedPrice
    };

    setCart(prev => [...prev, newCartItem]);
  };

  // Remove Spec design
  const handleRemoveCartItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Switch segments with smooth interpolation
  const handleViewSection = (sectionId: string) => {
    setActiveView('shopping');
    setActiveSection(sectionId);

    setTimeout(() => {
      const elementId = sectionId === 'hero' ? 'hero-section' : sectionId;
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 80);
  };

  // Setup Gallery piece load
  const handleSelectArtworkFromGallery = (artwork: CuratedArtwork) => {
    setSelectedArtwork(artwork);
    handleViewSection('configurator');
  };

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white font-sans selection:bg-[#c2a67a] selection:text-black">
      
      {/* Luxury Navigation */}
      <Navigation 
        cart={cart}
        onRemoveCartItem={handleRemoveCartItem}
        onViewCheckout={() => setActiveView('checkout')}
        onViewConfigurator={() => handleViewSection('configurator')}
        onViewSection={handleViewSection}
        activeSection={activeSection}
      />

      {/* Main Content Areas */}
      {activeView === 'checkout' ? (
        <Checkout 
          cart={cart}
          onClearCart={handleClearCart}
          onBackToShopping={() => {
            setActiveView('shopping');
            setTimeout(() => {
              const element = document.getElementById('configurator');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 80);
          }}
        />
      ) : (
        <main>
          {/* Hero segment */}
          <div id="hero-section">
            <Hero 
              onBuildCanvas={() => handleViewSection('configurator')}
              onExploreMaterials={() => handleViewSection('materials')}
            />
          </div>

          {/* Interactive Live customizer studio */}
          <Configurator 
            onAddToCart={handleAddToCart}
            initialArtwork={selectedArtwork}
          />

          {/* Why We Are Different & Materials Macro shots */}
          <Materials />

          {/* Core Manufacturing sequence */}
          <Process />

          {/* Curated Gallery masonry grid */}
          <Gallery onSelectArtwork={handleSelectArtworkFromGallery} />

          {/* Elegant Minimal Footer */}
          <Footer />
        </main>
      )}

    </div>
  );
}
