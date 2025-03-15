'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
      alert('Order placed successfully! This is a prototype, so no actual order was created.');
      router.push('/');
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="bg-gray-100 min-h-screen py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-lg mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven&apos;t added any items to your cart yet.</p>
            <Link 
              href="/" 
              className="inline-block px-6 py-3 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {items.map(item => (
                      <li key={item.id} className="py-6 flex">
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <Image
                            src={item.image || '/images/placeholder.jpg'}
                            alt={item.name}
                            fill
                            className="object-cover object-center"
                            sizes="96px"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{item.name}</h3>
                              <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                          </div>
                          
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="flex items-center space-x-3">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="text-gray-500 hover:text-gray-700 p-1"
                                aria-label="Decrease quantity"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                              </button>
                              
                              <span className="text-gray-700">{item.quantity}</span>
                              
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="text-gray-500 hover:text-gray-700 p-1"
                                aria-label="Increase quantity"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="font-medium text-red-600 hover:text-red-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <Link
                href="/"
                className="flex items-center text-purple-600 hover:text-purple-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                Continue Shopping
              </Link>
              
              <button
                onClick={() => clearCart()}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Clear Cart
              </button>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="border-t border-gray-200 py-6">
                <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                  <p>Subtotal</p>
                  <p>${getTotalPrice().toFixed(2)}</p>
                </div>
                
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <p>Shipping</p>
                  <p>Free</p>
                </div>
                
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total</p>
                  <p>${getTotalPrice().toFixed(2)}</p>
                </div>
                
                <div className="mt-6">
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full bg-purple-600 text-white rounded-md py-3 px-4 font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-75"
                  >
                    {isCheckingOut ? 'Processing...' : 'Checkout'}
                  </button>
                </div>
                
                <div className="mt-6 text-center text-sm text-gray-500">
                  <p>or</p>
                  <Link href="/" className="font-medium text-purple-600 hover:text-purple-500">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
