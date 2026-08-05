"use client";

import React from "react";
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { Product } from "./ProductCatalog";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-950 border-l border-zinc-800 text-white flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[var(--crimson)]" />
              <h2 className="text-lg font-bold uppercase tracking-wider">Your Shopping Cart</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 text-zinc-600 mx-auto" />
                <p className="text-zinc-400 text-sm font-medium">Your cart is empty</p>
                <button
                  onClick={onClose}
                  className="bg-zinc-900 border border-zinc-700 text-xs font-bold text-white px-4 py-2 rounded-full uppercase tracking-wider hover:bg-zinc-800"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3 flex gap-3 items-center"
                >
                  <div className="w-16 h-16 rounded-lg bg-zinc-800 flex items-center justify-center font-bold text-xs text-zinc-500 shrink-0 uppercase tracking-tighter">
                    {product.category.substring(0, 3)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{product.name}</h4>
                    <p className="text-xs text-[var(--gold)] font-mono font-bold mt-0.5">
                      ${product.price.toFixed(2)}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-zinc-700 rounded-md bg-zinc-900 overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(product.id, -1)}
                          className="px-2 py-0.5 text-xs text-zinc-400 hover:text-white hover:bg-zinc-800"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-mono text-white">{quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, 1)}
                          className="px-2 py-0.5 text-xs text-zinc-400 hover:text-white hover:bg-zinc-800"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(product.id)}
                        className="text-zinc-500 hover:text-red-400 p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-zinc-800 bg-zinc-900/50 space-y-4">
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Age Verification Fee</span>
                  <span className="text-emerald-400">FREE</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Estimated Shipping</span>
                  <span>$3.99</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-zinc-800">
                  <span>Total</span>
                  <span className="text-[var(--gold)]">${(subtotal + 3.99).toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full bg-[var(--crimson)] hover:bg-[var(--crimson-dark)] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-lg shadow-[var(--crimson)]/30 transition-all active:scale-95"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-500 uppercase font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 256-Bit Encrypted Age-Verified Checkout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
