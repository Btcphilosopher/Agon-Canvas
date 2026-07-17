import { SizeOption, FrameOption, EdgeWrapOption, FinishOption, CuratedArtwork } from './types';

export const ASSETS = {
  heroCanvas: '/src/assets/images/hero_luxury_canvas_1784283026928.jpg',
  canvasTextureMacro: '/src/assets/images/canvas_texture_macro_1784283043256.jpg',
  frameJointMacro: '/src/assets/images/frame_joint_macro_1784283058394.jpg',
};

export const SIZES: SizeOption[] = [
  {
    id: '24x36',
    label: 'Studio Medium',
    dimensions: '24″ × 36″',
    basePrice: 380,
    priceMultiplier: 1.0,
    weight: '7.2 lbs'
  },
  {
    id: '32x48',
    label: 'Exhibition Large',
    dimensions: '32″ × 48″',
    basePrice: 590,
    priceMultiplier: 1.35,
    weight: '11.8 lbs'
  },
  {
    id: '40x60',
    label: 'Collector Gallery',
    dimensions: '40″ × 60″',
    basePrice: 840,
    priceMultiplier: 1.75,
    weight: '16.4 lbs'
  }
];

export const FRAMES: FrameOption[] = [
  {
    id: 'none',
    name: 'Unframed / Gallery Wrap',
    color: 'transparent',
    price: 0,
    description: 'Canvas wrap-around with continuous mirroring. Minimal and industrial.',
    textureClass: ''
  },
  {
    id: 'walnut',
    name: 'Solid Walnut (Shadowbox)',
    color: '#3d2b1f',
    price: 180,
    description: 'A deep-grain premium FSC-certified American Walnut wood frame with a 5mm architectural gap.',
    textureClass: 'border-amber-950 bg-stone-900 bg-[radial-gradient(#5a3d28,transparent)]'
  },
  {
    id: 'oak',
    name: 'Natural White Oak',
    color: '#c2a67a',
    price: 160,
    description: 'Sustainably sourced Rift Sawn Oak with subtle, elegant linear grain, sealed with matte organic oil.',
    textureClass: 'border-amber-100 bg-stone-800 bg-[radial-gradient(#967f56,transparent)]'
  },
  {
    id: 'matte-black',
    name: 'Matte Charcoal Ash',
    color: '#1a1a1a',
    price: 140,
    description: 'Blackened ash wood with a low-sheen satin lacquer finish. Clean, stark, architectural.',
    textureClass: 'border-neutral-900 bg-neutral-950'
  },
  {
    id: 'brushed-aluminum',
    name: 'Brushed Aluminium',
    color: '#8c8c8c',
    price: 210,
    description: 'Precisely machined 6061 aerospace alloy, showcasing beautiful micro-grain linear brushing.',
    textureClass: 'border-neutral-400 bg-zinc-300'
  },
  {
    id: 'warm-titanium',
    name: 'Warm Titanium',
    color: '#6e6a64',
    price: 245,
    description: 'Sandblasted grade 5 titanium alloy with an anodized warm gray luxury sheen.',
    textureClass: 'border-stone-500 bg-stone-400'
  }
];

export const EDGE_WRAPS: EdgeWrapOption[] = [
  {
    id: 'gallery',
    name: 'Continuous Image Wrap',
    description: 'The outermost 2 inches of the artwork are seamlessly mirrored around the edge.'
  },
  {
    id: 'charcoal',
    name: 'Solid Obsidian Wrap',
    description: 'Edges are coated in a bespoke deep-charcoal matte pigment for architectural contrast.'
  },
  {
    id: 'white',
    name: 'Solid Alabaster Wrap',
    description: 'Edges remain clean, architectural white, blending into pale museum-style gallery walls.'
  }
];

export const FINISHES: FinishOption[] = [
  {
    id: 'matte',
    name: 'Archival Fine-Art Matte',
    description: 'Zero glare, highly textured heavy-cotton texture, maximizing deep velvety blacks.',
    reflectionOpacity: 0.02
  },
  {
    id: 'satin',
    name: 'Bespoke Satin Semi-Gloss',
    description: 'Subtle high-end luxury sheen that catches directional light, highlighting fine gradients.',
    reflectionOpacity: 0.12
  },
  {
    id: 'lustre',
    name: 'Exhibition Pearl Lustre',
    description: 'A brilliant finish containing fine crystalline particles that deliver incredible dynamic range.',
    reflectionOpacity: 0.22
  }
];

export const CURATED_ARTWORKS: CuratedArtwork[] = [
  {
    id: 'artwork-1',
    title: 'MIST OVER OBSIDIAN PEAKS',
    artist: 'Evelyn Vandeveld',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200',
    year: '2025',
    style: 'Atmospheric Monochrome'
  },
  {
    id: 'artwork-2',
    title: 'BRUTAL MONOLITH VII',
    artist: 'Tadao Kurosawa',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
    year: '2024',
    style: 'Architectural Abstraction'
  },
  {
    id: 'artwork-3',
    title: 'SILENT HORIZONS',
    artist: 'Soren Lindqvist',
    url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=1200',
    year: '2026',
    style: 'Generative Color Field'
  },
  {
    id: 'artwork-4',
    title: 'ORGANIC RIPPLES NO. 4',
    artist: 'Aiko Tanaka',
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=1200',
    year: '2025',
    style: 'Tactile Charcoal Sketch'
  }
];
