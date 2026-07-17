import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, Sparkles, Maximize2, Minimize2, ZoomIn, Info, Check, 
  Truck, ShieldCheck, RefreshCw, Layers, Eye 
} from 'lucide-react';
import { 
  CanvasSize, CanvasOrientation, FrameMaterial, EdgeWrap, CanvasFinish, 
  CuratedArtwork, CartItem 
} from '../types';
import { SIZES, FRAMES, EDGE_WRAPS, FINISHES, CURATED_ARTWORKS, ASSETS } from '../constants';

interface ConfiguratorProps {
  onAddToCart: (item: Omit<CartItem, 'id' | 'quantity' | 'totalPrice'>) => void;
  initialArtwork?: CuratedArtwork | null;
}

export default function Configurator({ onAddToCart, initialArtwork }: ConfiguratorProps) {
  // State for canvas configuration
  const [selectedSize, setSelectedSize] = useState<CanvasSize>('32x48');
  const [selectedOrientation, setSelectedOrientation] = useState<CanvasOrientation>('landscape');
  const [selectedFrame, setSelectedFrame] = useState<FrameMaterial>('walnut');
  const [selectedEdge, setSelectedEdge] = useState<EdgeWrap>('gallery');
  const [selectedFinish, setSelectedFinish] = useState<CanvasFinish>('matte');
  
  // Custom Artwork State
  const [activeArtwork, setActiveArtwork] = useState<CuratedArtwork | { title: string; artist: string; url: string; isCustom: boolean }>({
    ...CURATED_ARTWORKS[0],
    isCustom: false
  });
  const [customImageFile, setCustomImageFile] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Sync artwork chosen from exhibition gallery
  useEffect(() => {
    if (initialArtwork) {
      setActiveArtwork({ ...initialArtwork, isCustom: false });
      setCustomImageFile(null);
    }
  }, [initialArtwork]);

  
  // Zoom Viewer / Texture State
  const [showTextureLoupe, setShowTextureLoupe] = useState(false);
  const [loupePosition, setLoupePosition] = useState({ x: 50, y: 50 });
  const previewRef = useRef<HTMLDivElement>(null);

  // Success Toast state
  const [showToast, setShowToast] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper selectors
  const sizeOption = SIZES.find(s => s.id === selectedSize)!;
  const frameOption = FRAMES.find(f => f.id === selectedFrame)!;
  const edgeOption = EDGE_WRAPS.find(e => e.id === selectedEdge)!;
  const finishOption = FINISHES.find(f => f.id === selectedFinish)!;

  // Pricing Engine
  const basePrice = sizeOption.basePrice;
  const framePrice = frameOption.price;
  const totalPrice = basePrice + framePrice;

  // File Upload Handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      setCustomImageFile(objectUrl);
      setActiveArtwork({
        title: file.name.split('.')[0].substring(0, 24).toUpperCase() + " (UPLOADING)",
        artist: "User Original Portfolio",
        url: objectUrl,
        isCustom: true
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const objectUrl = URL.createObjectURL(file);
      setCustomImageFile(objectUrl);
      setActiveArtwork({
        title: file.name.split('.')[0].substring(0, 24).toUpperCase(),
        artist: "User Original Portfolio",
        url: objectUrl,
        isCustom: true
      });
    }
  };

  // Loupe Mouse Handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!previewRef.current) return;
    const rect = previewRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLoupePosition({ x, y });
  };

  // Add to cart trigger
  const handleAdd = () => {
    onAddToCart({
      artwork: {
        title: activeArtwork.title,
        artist: activeArtwork.artist,
        url: activeArtwork.url,
        isCustom: 'isCustom' in activeArtwork ? activeArtwork.isCustom : false
      },
      size: selectedSize,
      orientation: selectedOrientation,
      frame: selectedFrame,
      edgeWrap: selectedEdge,
      finish: selectedFinish
    });
    
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  return (
    <section 
      id="configurator" 
      className="relative min-h-screen bg-[#0E0E0E] text-white py-24 border-b border-white/[0.02]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Editorial Title */}
        <div className="mb-16 border-b border-white/[0.04] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] tracking-[0.4em] font-mono text-[#c2a67a] block uppercase">Bespoke Production</span>
            <h2 className="font-sans text-3xl md:text-4xl font-black tracking-tight uppercase">THE LIVE PREVIEW STUDIO</h2>
          </div>
          <p className="font-sans text-xs text-neutral-400 max-w-sm font-normal uppercase tracking-wider leading-relaxed">
            Configure raw wood profiles, gallery dimensions, and dynamic wraps in real-time. Witness your print rendered as a three-dimensional museum artifact.
          </p>
        </div>

        {/* Live Toast alert */}
        <AnimatePresence>
          {showToast && (
            <motion.div 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-[110] bg-[#c2a67a] text-black font-sans text-xs tracking-[0.15em] uppercase font-bold px-8 py-4 shadow-2xl flex items-center space-x-3"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>Spec added to your Gallery collection</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left / Center Column: Live Canvas Preview Stage */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            
            {/* Main Stage Wrapper */}
            <div className="bg-[#121212] border border-white/[0.03] p-8 md:p-12 flex flex-col items-center justify-center relative group min-h-[480px]">
              
              {/* Orientation Tag */}
              <div className="absolute top-6 left-6 flex items-center space-x-2 font-mono text-[9px] tracking-widest text-neutral-500 uppercase">
                <span>Viewport System</span>
                <span>•</span>
                <span className="text-neutral-300">{selectedOrientation}</span>
              </div>

              {/* Live Canvas Frame Simulation */}
              <div 
                ref={previewRef}
                onMouseMove={handleMouseMove}
                className="relative transition-all duration-500 ease-out flex items-center justify-center cursor-crosshair"
                style={{
                  width: selectedOrientation === 'landscape' ? '100%' : '72%',
                  maxWidth: selectedOrientation === 'landscape' ? '540px' : '380px',
                  aspectRatio: selectedOrientation === 'landscape' ? '3/2' : '2/3',
                }}
              >
                {/* Simulated Real Depth Float Gap (3D border mockup) */}
                <div 
                  className={`absolute inset-0 transition-all duration-300 ${
                    selectedFrame !== 'none' 
                      ? 'border-[16px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.95),inset_0_2px_8px_rgba(0,0,0,0.8)]' 
                      : 'border-0 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85)]'
                  }`}
                  style={{
                    borderColor: selectedFrame !== 'none' ? frameOption.color : 'transparent',
                    boxShadow: selectedFrame !== 'none' 
                      ? '0 30px 60px -15px rgba(0,0,0,0.9), inset 0 2px 10px rgba(0,0,0,0.8)' 
                      : '0 25px 50px -12px rgba(0,0,0,0.85)'
                  }}
                >
                  {/* Outer edge wrap mirroring simulation when unframed */}
                  <div className="w-full h-full relative overflow-hidden bg-[#181818]">
                    
                    {/* The Printed Artwork Image */}
                    <img 
                      src={activeArtwork.url} 
                      alt="Configured fine art canvas print" 
                      className={`w-full h-full object-cover transition-opacity duration-300 ${
                        selectedFinish === 'lustre' ? 'brightness-105' : 'brightness-100'
                      }`}
                      referrerPolicy="no-referrer"
                    />

                    {/* Edge shadow wrap mask simulation */}
                    {selectedEdge === 'charcoal' && (
                      <div className="absolute inset-0 border-[6px] border-neutral-950 pointer-events-none opacity-80" />
                    )}
                    {selectedEdge === 'white' && (
                      <div className="absolute inset-0 border-[6px] border-neutral-100 pointer-events-none opacity-70" />
                    )}

                    {/* Semi-reflective lighting gloss layer based on finish selection */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none transition-opacity duration-500"
                      style={{ opacity: finishOption.reflectionOpacity }}
                    />

                    {/* Canvas subtle linear weave weave-grid pattern overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:3px_3px] mix-blend-overlay pointer-events-none opacity-60" />

                    {/* Loupe Texture View Glass */}
                    {showTextureLoupe && (
                      <div 
                        className="absolute w-44 h-44 rounded-full border-2 border-white/40 shadow-2xl pointer-events-none overflow-hidden z-30 bg-[#121212]"
                        style={{
                          left: `${loupePosition.x}%`,
                          top: `${loupePosition.y}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        {/* Macro fiber background weave texture */}
                        <img 
                          src={ASSETS.canvasTextureMacro} 
                          alt="Linen weave detail"
                          className="absolute inset-0 w-full h-full object-cover opacity-85 mix-blend-multiply scale-150"
                          referrerPolicy="no-referrer"
                        />
                        {/* Close-up image replication */}
                        <img 
                          src={activeArtwork.url} 
                          alt="Zoom detail"
                          className="absolute inset-0 w-full h-full object-cover scale-[2.5]"
                          style={{
                            transformOrigin: `${loupePosition.x}% ${loupePosition.y}%`,
                            transform: 'scale(2.5)',
                            mixBlendMode: 'color-burn'
                          }}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Loupe Overlay Toggle Indicator */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-4 z-40">
                <button
                  onClick={() => setShowTextureLoupe(!showTextureLoupe)}
                  className={`px-4 py-2 text-[10px] font-mono tracking-widest uppercase flex items-center space-x-2 border transition-all duration-300 cursor-pointer ${
                    showTextureLoupe 
                      ? 'bg-white text-black border-white' 
                      : 'bg-black/80 text-neutral-300 border-white/[0.08] hover:border-white/20'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{showTextureLoupe ? 'Disable Fiber Zoom' : 'View Canvas Fiber Weave'}</span>
                </button>
              </div>
            </div>

            {/* Scale & Size Comparison Helper (Interactive sofa graph) */}
            <div className="bg-[#121212] border border-white/[0.03] p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
                <span className="text-[10px] font-mono tracking-widest text-[#c2a67a] uppercase flex items-center space-x-2">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>SCALE REFERENCE MODEL</span>
                </span>
                <span className="font-sans text-xs text-neutral-400">Comparing: {sizeOption.dimensions} over 84″ Sofa</span>
              </div>

              {/* Visual Grid Room Blueprint */}
              <div className="relative h-44 bg-[#0A0A0A]/60 rounded border border-white/[0.02] flex items-end justify-center pb-6 overflow-hidden">
                <div className="absolute top-4 left-4 font-mono text-[9px] text-neutral-600 tracking-widest uppercase">Elevation Blueprint</div>
                
                {/* Wall Guide */}
                <div className="absolute bottom-6 w-[80%] border-t border-dashed border-neutral-800" />

                {/* Simulated Canvas hanging */}
                <motion.div 
                  layout
                  className="absolute bottom-22 bg-neutral-900 border border-neutral-700 flex items-center justify-center shadow-md overflow-hidden"
                  style={{
                    width: selectedSize === '24x36' ? '48px' : selectedSize === '32x48' ? '64px' : '82px',
                    aspectRatio: selectedOrientation === 'landscape' ? '3/2' : '2/3',
                    // Adjust margin bottom to look mounted correctly above sofa
                    marginBottom: selectedOrientation === 'landscape' ? '0px' : '-12px'
                  }}
                  animate={{
                    width: selectedSize === '24x36' ? '54px' : selectedSize === '32x48' ? '72px' : '96px',
                  }}
                  transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                >
                  <img src={activeArtwork.url} className="w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" />
                  {selectedFrame !== 'none' && (
                    <div className="absolute inset-0 border-2 pointer-events-none" style={{ borderColor: frameOption.color }} />
                  )}
                </motion.div>

                {/* Sofa Outline (Line art) */}
                <div className="w-48 h-12 border border-neutral-700 rounded-sm relative bg-[#121212]/90 flex items-center justify-center">
                  <div className="absolute -top-3 left-4 right-4 h-3 border-t border-l border-r border-neutral-700 rounded-t-sm" />
                  <div className="absolute -left-1 w-2 h-10 border border-neutral-700 rounded-sm" />
                  <div className="absolute -right-1 w-2 h-10 border border-neutral-700 rounded-sm" />
                  <span className="text-[8px] font-mono text-neutral-600 tracking-widest">Minimalist Lounge Sofa</span>
                </div>

                {/* Human Scale stick outline (Aesthetic) */}
                <div className="absolute left-10 bottom-6 flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full border border-neutral-700" />
                  <div className="w-0.5 h-10 bg-neutral-700" />
                  <div className="flex space-x-2 -mt-2">
                    <div className="w-0.5 h-6 bg-neutral-700 transform rotate-12" />
                    <div className="w-0.5 h-6 bg-neutral-700 transform -rotate-12" />
                  </div>
                  <span className="text-[8px] font-mono text-neutral-600 mt-1 uppercase">1.8M HUMAN</span>
                </div>
              </div>

              {/* Physical Spec Metrics */}
              <div className="grid grid-cols-3 gap-4 text-left">
                <div className="bg-neutral-900/50 p-4 border border-white/[0.02]">
                  <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase block mb-1">Canvas Weight</span>
                  <span className="text-xs font-sans font-medium text-neutral-200">{sizeOption.weight}</span>
                </div>
                <div className="bg-neutral-900/50 p-4 border border-white/[0.02]">
                  <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase block mb-1">Raw Stretcher</span>
                  <span className="text-xs font-sans font-medium text-neutral-200">1.5″ Deep Profile</span>
                </div>
                <div className="bg-neutral-900/50 p-4 border border-white/[0.02]">
                  <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase block mb-1">Wood Integrity</span>
                  <span className="text-xs font-sans font-medium text-neutral-200">Tension Keyed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Configurator Control Panel */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* 1. ARTWORK SOURCE */}
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#c2a67a] uppercase block border-b border-white/[0.04] pb-2">01. Choose Medium Artwork</span>
              
              {/* Dropzone Upload */}
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border border-dashed p-6 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center space-y-3 ${
                  isDragging 
                    ? 'border-[#c2a67a] bg-white/[0.02]' 
                    : 'border-white/[0.08] hover:border-white/20 hover:bg-white/[0.01]'
                }`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden" 
                />
                <Upload className="w-5 h-5 text-neutral-400 stroke-[1.5]" />
                <div className="space-y-1">
                  <p className="font-sans text-xs text-neutral-300 font-medium tracking-wide">Drag & Drop Your Image File Here</p>
                  <p className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">Or Click To Browse (RAW, JPG, TIFF, PNG)</p>
                </div>
              </div>

              {/* Selected file confirmation */}
              {customImageFile && (
                <div className="flex items-center justify-between bg-neutral-900/40 p-3 border border-white/[0.03] text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-sans text-neutral-400 tracking-wide truncate max-w-[200px]">Uploaded Portfolio File</span>
                  </div>
                  <button 
                    onClick={() => {
                      setCustomImageFile(null);
                      setActiveArtwork({ ...CURATED_ARTWORKS[0], isCustom: false });
                    }}
                    className="text-[10px] font-mono tracking-widest text-neutral-500 hover:text-[#c2a67a] uppercase"
                  >
                    Reset to Curated
                  </button>
                </div>
              )}

              {/* Or Choose Curated Artwork list */}
              <div className="space-y-2">
                <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase block">OR SELECT LUXURY GALLERY SPECIMEN</span>
                <div className="grid grid-cols-2 gap-3">
                  {CURATED_ARTWORKS.map((art) => (
                    <button
                      key={art.id}
                      onClick={() => {
                        setCustomImageFile(null);
                        setActiveArtwork({ ...art, isCustom: false });
                      }}
                      className={`p-3 text-left border transition-all duration-300 flex flex-col justify-between h-20 relative cursor-pointer ${
                        activeArtwork.title === art.title && !customImageFile
                          ? 'border-[#c2a67a] bg-[#141414]' 
                          : 'border-white/[0.04] hover:border-white/[0.1] hover:bg-white/[0.01]'
                      }`}
                    >
                      <span className="font-sans text-[10px] tracking-wide text-white block uppercase line-clamp-1">{art.title}</span>
                      <span className="font-mono text-[8px] text-neutral-500 tracking-wider block">BY {art.artist}</span>
                      {activeArtwork.title === art.title && !customImageFile && (
                        <span className="absolute bottom-2 right-2 w-3 h-3 bg-[#c2a67a] rounded-full flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-black stroke-[3]" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. LAYOUT ORIENTATION */}
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#c2a67a] uppercase block border-b border-white/[0.04] pb-2">02. Select Orientation</span>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'landscape', label: 'Landscape Aspect (3:2)' },
                  { id: 'portrait', label: 'Portrait Aspect (2:3)' }
                ].map((orient) => (
                  <button
                    key={orient.id}
                    onClick={() => setSelectedOrientation(orient.id as CanvasOrientation)}
                    className={`py-3.5 px-4 text-xs font-sans tracking-[0.1em] uppercase transition-all duration-300 border cursor-pointer ${
                      selectedOrientation === orient.id 
                        ? 'bg-white text-black border-white font-bold' 
                        : 'border-white/[0.04] hover:border-white/[0.1] text-neutral-300 hover:text-white'
                    }`}
                  >
                    {orient.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. SIZE DIMENSIONS */}
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#c2a67a] uppercase block border-b border-white/[0.04] pb-2">03. Fine Art Dimensions</span>
              <div className="space-y-2.5">
                {SIZES.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size.id)}
                    className={`w-full p-4 border transition-all duration-300 flex items-center justify-between text-left cursor-pointer ${
                      selectedSize === size.id 
                        ? 'border-[#c2a67a] bg-[#141414]' 
                        : 'border-white/[0.04] hover:border-white/[0.1] hover:bg-white/[0.01]'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="font-sans text-xs tracking-wider text-white uppercase font-bold">{size.label}</div>
                      <div className="font-mono text-[10px] text-neutral-400">Physical bounds: {size.dimensions}</div>
                    </div>
                    <div className="flex items-center space-x-3 font-mono text-xs">
                      <span className="text-neutral-500">Base Price:</span>
                      <span className="text-white font-bold">${size.basePrice}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. SOLID WOOD FRAME SHADOWBOX */}
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#c2a67a] uppercase block border-b border-white/[0.04] pb-2">04. Custom Shadowbox Framing</span>
              <div className="grid grid-cols-1 gap-2.5">
                {FRAMES.map((frame) => (
                  <button
                    key={frame.id}
                    onClick={() => setSelectedFrame(frame.id)}
                    className={`p-4 border transition-all duration-300 flex items-start gap-4 text-left cursor-pointer ${
                      selectedFrame === frame.id 
                        ? 'border-[#c2a67a] bg-[#141414]' 
                        : 'border-white/[0.04] hover:border-white/[0.1] hover:bg-white/[0.01]'
                    }`}
                  >
                    {/* Simulated circle color sample */}
                    <span 
                      className="w-5 h-5 rounded-full border border-white/20 flex-shrink-0 mt-0.5" 
                      style={{ 
                        backgroundColor: frame.color,
                        backgroundImage: frame.id === 'none' ? 'linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000 75%), linear-gradient(-45deg, transparent 75%, #000 75%)' : 'none',
                        backgroundSize: '8px 8px'
                      }} 
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-sans text-xs tracking-wider font-bold text-white uppercase">{frame.name}</span>
                        <span className="font-mono text-xs text-[#c2a67a]">{frame.price > 0 ? `+$${frame.price}` : 'Complimentary'}</span>
                      </div>
                      <p className="font-sans text-[10px] text-neutral-400 leading-relaxed font-normal">{frame.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. EDGE WRAP DESIGN */}
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#c2a67a] uppercase block border-b border-white/[0.04] pb-2">05. Canvas Edge System</span>
              <div className="grid grid-cols-1 gap-2.5">
                {EDGE_WRAPS.map((edge) => (
                  <button
                    key={edge.id}
                    disabled={selectedFrame !== 'none'}
                    onClick={() => setSelectedEdge(edge.id)}
                    className={`p-3.5 border text-left transition-all duration-300 cursor-pointer ${
                      selectedFrame !== 'none'
                        ? 'opacity-40 cursor-not-allowed border-white/[0.02]'
                        : selectedEdge === edge.id 
                          ? 'border-[#c2a67a] bg-[#141414]' 
                          : 'border-white/[0.04] hover:border-white/[0.1] hover:bg-white/[0.01]'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="font-sans text-xs tracking-wider text-white uppercase font-bold">{edge.name}</span>
                      {selectedFrame !== 'none' && (
                        <span className="font-mono text-[8px] text-neutral-600 uppercase tracking-widest">Unavailable with framing</span>
                      )}
                    </div>
                    <p className="font-sans text-[10px] text-neutral-400 leading-relaxed font-normal">{edge.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 6. CANVAS PROTECTIVE FINISH */}
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#c2a67a] uppercase block border-b border-white/[0.04] pb-2">06. Museum Protective Finishes</span>
              <div className="grid grid-cols-1 gap-2.5">
                {FINISHES.map((finish) => (
                  <button
                    key={finish.id}
                    onClick={() => setSelectedFinish(finish.id)}
                    className={`p-3.5 border text-left transition-all duration-300 cursor-pointer ${
                      selectedFinish === finish.id 
                        ? 'border-[#c2a67a] bg-[#141414]' 
                        : 'border-white/[0.04] hover:border-white/[0.1] hover:bg-white/[0.01]'
                    }`}
                  >
                    <span className="font-sans text-xs tracking-wider text-white uppercase font-bold block mb-0.5">{finish.name}</span>
                    <p className="font-sans text-[10px] text-neutral-400 leading-relaxed font-normal">{finish.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* STICKY ACCUMULATED CHECKOUT TOTAL PANEL */}
            <div className="bg-[#121212] border border-[#c2a67a]/30 p-6 space-y-4 mt-8">
              <div className="flex justify-between items-end">
                <div>
                  <span className="font-mono text-[9px] tracking-widest text-neutral-500 uppercase block">Accumulated Total</span>
                  <span className="font-sans text-2xl font-black text-white">${totalPrice}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-neutral-400 font-sans uppercase block">Delivery Estimate</span>
                  <span className="text-xs text-[#c2a67a] font-mono font-medium block">Secured in 4-6 Business Days</span>
                </div>
              </div>

              <button
                onClick={handleAdd}
                className="w-full bg-[#c2a67a] hover:bg-[#d4b98e] text-black py-4 px-6 text-xs font-sans tracking-[0.2em] font-bold uppercase transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Add Custom Spec to Collection</span>
              </button>

              <div className="flex justify-center items-center space-x-6 pt-2 text-[10px] text-neutral-400 font-mono">
                <span className="flex items-center space-x-1.5">
                  <Truck className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Crated Delivery</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
                  <span>200-Year Proof</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
