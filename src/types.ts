export type CanvasSize = '24x36' | '32x48' | '40x60';

export interface SizeOption {
  id: CanvasSize;
  label: string;
  dimensions: string;
  priceMultiplier: number;
  basePrice: number;
  weight: string;
}

export type CanvasOrientation = 'landscape' | 'portrait';

export type FrameMaterial = 'none' | 'walnut' | 'oak' | 'matte-black' | 'brushed-aluminum' | 'warm-titanium';

export interface FrameOption {
  id: FrameMaterial;
  name: string;
  color: string;
  price: number;
  description: string;
  textureClass: string;
}

export type EdgeWrap = 'gallery' | 'charcoal' | 'white';

export interface EdgeWrapOption {
  id: EdgeWrap;
  name: string;
  description: string;
}

export type CanvasFinish = 'matte' | 'satin' | 'lustre';

export interface FinishOption {
  id: CanvasFinish;
  name: string;
  description: string;
  reflectionOpacity: number;
}

export interface CuratedArtwork {
  id: string;
  title: string;
  artist: string;
  url: string;
  year: string;
  style: string;
}

export interface CartItem {
  id: string;
  artwork: {
    title: string;
    artist: string;
    url: string;
    isCustom: boolean;
  };
  size: CanvasSize;
  orientation: CanvasOrientation;
  frame: FrameMaterial;
  edgeWrap: EdgeWrap;
  finish: CanvasFinish;
  quantity: number;
  totalPrice: number;
}

export interface OrderDetails {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  paymentMethod: 'card' | 'applepay' | 'wire';
}
