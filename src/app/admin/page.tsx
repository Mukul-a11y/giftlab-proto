'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import AdminProductCard from '@/components/AdminProductCard';
import productsData from '@/data/products.json';

export default function AdminPage() {
  const { isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState(productsData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check authentication and admin status
    if (isLoaded && (!isAuthenticated || !isAdmin)) {
      router.push('/auth/login');
      return;
    }
    setIsLoaded(true);
  }, [isAuthenticated, isAdmin, router, isLoaded]);

  const handleDeleteProduct = (productId: number) => {
    // In a real app, this would call an API
    // For the prototype, we'll just update the local state
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== productId));
      // In a real app, we would save this to the database
      alert('Product deleted successfully (prototype only - changes are not persistent)');
    }
  };

  if (!isLoaded || !isAuthenticated || !isAdmin) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-36 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <Link
            href="/admin/add"
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors flex items-center"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New Product
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Product Management</h2>
          
          {products.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No products found</p>
              <Link
                href="/admin/add"
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
              >
                Add your first product
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {products.map(product => (
                <AdminProductCard
                  key={product.id}
                  product={product}
                  onDelete={handleDeleteProduct}
                />
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                This is a prototype. Changes to products are not persisted between sessions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
