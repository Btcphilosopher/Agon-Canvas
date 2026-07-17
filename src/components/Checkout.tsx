import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, CreditCard, ShieldCheck, CheckCircle2, Truck, ArrowLeft, Send } from 'lucide-react';
import { CartItem, OrderDetails } from '../types';
import { SIZES, FRAMES } from '../constants';

interface CheckoutProps {
  cart: CartItem[];
  onClearCart: () => void;
  onBackToShopping: () => void;
}

export default function Checkout({ cart, onClearCart, onBackToShopping }: CheckoutProps) {
  const [form, setForm] = useState<OrderDetails>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
    paymentMethod: 'card'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.firstName || !form.lastName || !form.address) {
      alert("Please specify all required fields to register the museum shipment.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate luxury processing delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setOrderId('AGN-' + Math.floor(Math.random() * 900000 + 100000));
    }, 2500);
  };

  const handleOrderCompletion = () => {
    onClearCart();
    onBackToShopping();
  };

  if (isSubmitted) {
    return (
      <section className="bg-[#0A0A0A] text-white min-h-screen py-24 flex items-center justify-center relative px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#111111,transparent_75%)] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl w-full bg-[#121212] border border-white/[0.04] p-8 md:p-12 text-center space-y-8 relative z-10 shadow-2xl"
        >
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-[#c2a67a]/10 border border-[#c2a67a]/40 flex items-center justify-center text-[#c2a67a]">
              <CheckCircle2 className="w-8 h-8 stroke-[1.5]" />
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] tracking-[0.4em] font-mono text-[#c2a67a] uppercase block">TRANSACTION DECLARED SECURE</span>
            <h2 className="font-sans text-2xl md:text-3xl font-black uppercase tracking-tight">ORDER OFFICIALLY SECURED</h2>
            <p className="font-mono text-xs text-neutral-400 uppercase">INVOICE SPECIFICATION: {orderId}</p>
          </div>

          <p className="font-sans text-xs text-neutral-400 max-w-md mx-auto leading-relaxed uppercase">
            Thank you, {form.firstName} {form.lastName}. Your custom stretched linen order has been logged into our pre-flight ingestion system. A secure tracking link and physical miter stamp certification copy will be sent to <span className="text-white font-bold">{form.email}</span>.
          </p>

          <div className="border-t border-b border-white/[0.04] py-6 max-w-sm mx-auto space-y-2 text-xs">
            <div className="flex justify-between font-sans">
              <span className="text-neutral-500 uppercase">Estimated Shipping Delivery</span>
              <span className="text-white font-medium">Secured (4-6 Days)</span>
            </div>
            <div className="flex justify-between font-sans">
              <span className="text-neutral-500 uppercase">Packaging Carrier</span>
              <span className="text-white font-medium">White-Glove Wood Crated</span>
            </div>
          </div>

          <div>
            <button
              onClick={handleOrderCompletion}
              className="bg-white hover:bg-neutral-200 text-black py-4 px-10 text-xs font-sans tracking-[0.2em] font-bold uppercase transition-all duration-300 cursor-pointer"
            >
              Return to Gallery Studio
            </button>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="bg-[#0A0A0A] text-white min-h-screen py-24 relative px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation Breadcrumb */}
        <button
          onClick={onBackToShopping}
          className="flex items-center space-x-2 text-neutral-400 hover:text-white transition-colors mb-12 text-xs font-mono uppercase tracking-widest cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Building Canvas</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Form Details */}
          <div className="lg:col-span-7 space-y-8">
            <div className="border-b border-white/[0.04] pb-6">
              <span className="text-[10px] tracking-[0.4em] font-mono text-[#c2a67a] block uppercase">SECURED STRIPE PORTAL</span>
              <h2 className="font-sans text-2xl md:text-3xl font-black uppercase tracking-tight mt-1">MUSEUM BILLING & SHIPPING</h2>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6 text-left">
              
              {/* Contact Email */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block">Contact Information</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="Collector Email (e.g. collector@domain.com)" 
                  value={form.email}
                  onChange={handleInputChange}
                  className="w-full bg-[#121212] border border-white/[0.06] p-4 text-xs font-sans focus:outline-none focus:border-[#c2a67a] text-white"
                />
              </div>

              {/* Names */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    required
                    placeholder="First Name" 
                    value={form.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-[#121212] border border-white/[0.06] p-4 text-xs font-sans focus:outline-none focus:border-[#c2a67a] text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    required
                    placeholder="Last Name" 
                    value={form.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-[#121212] border border-white/[0.06] p-4 text-xs font-sans focus:outline-none focus:border-[#c2a67a] text-white"
                  />
                </div>
              </div>

              {/* Physical Address */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block">Museum Destination Address</label>
                <input 
                  type="text" 
                  name="address"
                  required
                  placeholder="Suite, Street Address, Apartment" 
                  value={form.address}
                  onChange={handleInputChange}
                  className="w-full bg-[#121212] border border-white/[0.06] p-4 text-xs font-sans focus:outline-none focus:border-[#c2a67a] text-white"
                />
              </div>

              {/* Zip/Postal, City, Country */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block">City</label>
                  <input 
                    type="text" 
                    name="city"
                    required
                    placeholder="e.g. New York" 
                    value={form.city}
                    onChange={handleInputChange}
                    className="w-full bg-[#121212] border border-white/[0.06] p-4 text-xs font-sans focus:outline-none focus:border-[#c2a67a] text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block">Postal Code</label>
                  <input 
                    type="text" 
                    name="postalCode"
                    required
                    placeholder="10001" 
                    value={form.postalCode}
                    onChange={handleInputChange}
                    className="w-full bg-[#121212] border border-white/[0.06] p-4 text-xs font-sans focus:outline-none focus:border-[#c2a67a] text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block">Country</label>
                  <select
                    name="country"
                    value={form.country}
                    onChange={handleInputChange}
                    className="w-full bg-[#121212] border border-white/[0.06] p-4 text-xs font-sans focus:outline-none focus:border-[#c2a67a] text-white"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Germany">Germany</option>
                    <option value="Japan">Japan</option>
                    <option value="France">France</option>
                  </select>
                </div>
              </div>

              {/* Secured Payment Method Selection */}
              <div className="space-y-4 pt-4">
                <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block">Secured Payment Method</label>
                
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: 'card', label: 'Credit Card', icon: <CreditCard className="w-4 h-4" /> },
                    { id: 'applepay', label: 'Apple Pay', icon: <span className="text-[10px] font-bold"> Pay</span> },
                    { id: 'wire', label: 'Bank Transfer', icon: <Send className="w-3.5 h-3.5" /> }
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, paymentMethod: method.id as any }))}
                      className={`p-4 border text-center flex flex-col items-center justify-center space-y-2 transition-all duration-300 cursor-pointer ${
                        form.paymentMethod === method.id 
                          ? 'border-[#c2a67a] bg-[#141414]' 
                          : 'border-white/[0.04] hover:border-white/[0.1]'
                      }`}
                    >
                      {method.icon}
                      <span className="text-[10px] font-sans tracking-wide uppercase">{method.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Card form if credit card is selected */}
              {form.paymentMethod === 'card' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-4 bg-neutral-900/40 p-6 border border-white/[0.04]"
                >
                  <div className="space-y-2">
                    <label className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase block">Card Number</label>
                    <input 
                      type="text" 
                      placeholder="4111 2222 3333 4444" 
                      className="w-full bg-[#121212] border border-white/[0.06] p-3 text-xs font-mono focus:outline-none focus:border-[#c2a67a] text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase block">Expiry Date</label>
                      <input 
                        type="text" 
                        placeholder="MM / YY" 
                        className="w-full bg-[#121212] border border-white/[0.06] p-3 text-xs font-mono focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase block">Security Code (CVC)</label>
                      <input 
                        type="password" 
                        placeholder="•••" 
                        className="w-full bg-[#121212] border border-white/[0.06] p-3 text-xs font-mono focus:outline-none"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Bank Transfer Wire instructions */}
              {form.paymentMethod === 'wire' && (
                <div className="p-4 bg-neutral-900/50 border border-[#c2a67a]/20 text-[11px] font-sans text-neutral-300 space-y-2 uppercase leading-relaxed">
                  <p className="font-bold text-[#c2a67a]">Museum Direct Wire routing instructions:</p>
                  <p>Bank: Union Bank of Switzerland (Zurich HQ)</p>
                  <p>IBAN: CH93 0023 4902 4492 4902 1</p>
                  <p className="text-[10px] text-neutral-500 font-mono">Order will enter pre-flight once wire is validated by transit audit logs.</p>
                </div>
              )}

              {/* Secure Trust check */}
              <div className="flex items-start space-x-3 text-xs text-neutral-400 font-sans pt-4 border-t border-white/[0.04]">
                <ShieldCheck className="w-5 h-5 text-[#c2a67a] flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed font-normal">
                  Your payment is protected by AES-256 level bank-grade encryption protocols and backed by standard marine crating logistics insurance.
                </p>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting || cart.length === 0}
                  className="w-full bg-white hover:bg-neutral-200 text-black py-4.5 text-xs font-sans tracking-[0.25em] font-bold uppercase transition-all duration-300 flex items-center justify-center space-x-3 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'SECURELY COMPILING ORDER...' : `SECURE TRANSACTION • $${cartSubtotal}`}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Beautiful Invoice Order Summary */}
          <div className="lg:col-span-5 bg-[#121212] border border-white/[0.04] p-8 space-y-8 text-left sticky top-28">
            <span className="text-[10px] tracking-[0.4em] font-mono text-[#c2a67a] block uppercase border-b border-white/[0.04] pb-4">ORDER INVOICE BREAKDOWN</span>
            
            <div className="space-y-6">
              {cart.map((item) => {
                const sizeOpt = SIZES.find(s => s.id === item.size);
                const frameOpt = FRAMES.find(f => f.id === item.frame);

                return (
                  <div key={item.id} className="flex gap-4 pb-6 border-b border-white/[0.03] last:border-0 last:pb-0">
                    <div className="w-16 h-16 bg-neutral-900 border border-white/[0.04] relative flex-shrink-0">
                      <img src={item.artwork.url} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      {item.frame !== 'none' && (
                        <div className="absolute inset-0 border-[2px] pointer-events-none" style={{ borderColor: frameOpt?.color }} />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-sans text-xs font-bold uppercase tracking-wider line-clamp-1">{item.artwork.title}</h4>
                        <span className="font-mono text-xs text-white">${item.totalPrice}</span>
                      </div>
                      <p className="font-mono text-[9px] text-neutral-500 uppercase">By {item.artwork.artist}</p>
                      <div className="text-[9px] font-sans text-neutral-400 mt-1 uppercase">
                        {sizeOpt?.label} • {frameOpt?.name} • {item.finish} finish
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Calculations */}
            <div className="space-y-2 pt-6 border-t border-white/[0.04]">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400 uppercase">Collection Subtotal</span>
                <span className="font-mono text-white">${cartSubtotal}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400 uppercase">Crating & Marine Courier</span>
                <span className="text-[#c2a67a] font-mono uppercase">Complimentary</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400 uppercase">Pre-flight Proof Inspection</span>
                <span className="text-[#c2a67a] font-mono uppercase">Included</span>
              </div>
              
              <div className="border-t border-white/[0.04] pt-4 flex justify-between items-end">
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block">Total Due</span>
                  <span className="text-xl font-sans font-black text-white">${cartSubtotal}</span>
                </div>
                <div className="text-[#c2a67a] font-mono text-[9px] tracking-widest uppercase">
                  Zero VAT/Sales Taxes
                </div>
              </div>
            </div>

            {/* Guaranteed Trust checks */}
            <div className="space-y-3 pt-6 border-t border-white/[0.04] text-[10px] text-neutral-500 font-sans">
              <div className="flex items-center space-x-2">
                <Truck className="w-3.5 h-3.5 text-neutral-600" />
                <span>Double-reinforced wooden plywood crate</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-600" />
                <span>Archival molecular print lightfast guarantee</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
