'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import productsData from '@/data/products.json';

export default function EditProductForm({ id }: { id: string }) {
  const { isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [productFound, setProductFound] = useState(false);
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [inStock, setInStock] = useState(true);
  const [image, setImage] = useState('/images/placeholder.jpg');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['Boxes', 'Sets', 'Personalized', 'Food', 'Cards'];
  const productId = parseInt(id);

  useEffect(() => {
    // Check authentication and admin status
    if (isLoaded && (!isAuthenticated || !isAdmin)) {
      router.push('/auth/login');
      return;
    }
    
    // Find the product in the data
    const product = productsData.find(p => p.id === productId);
    
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price.toString());
      setCategory(product.category);
      setInStock(product.inStock);
      setImage(product.image);
      setProductFound(true);
    } else if (isLoaded) {
      // If product not found and page is loaded, redirect
      alert('Product not found');
      router.push('/admin');
    }
    
    setIsLoaded(true);
  }, [isAuthenticated, isAdmin, router, isLoaded, productId, id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !description || !price || !category) {
      alert('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real app, this would call an API
    // For the prototype, we&apos;ll just simulate updating a product
    setTimeout(() => {
      const updatedProduct = {
        id: productId,
        name,
        description,
        price: parseFloat(price),
        image,
        category,
        inStock
      };
      
      // In a real app, we would send this to the backend
      console.log('Product updated (prototype):', updatedProduct);
      
      alert('Product updated successfully (prototype only - changes are not persistent)');
      setIsSubmitting(false);
      router.push('/admin');
    }, 1000);
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

  if (!productFound) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-6">The product you are looking for does not exist.</p>
        <Link 
          href="/admin" 
          className="inline-block px-6 py-3 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition-colors"
        >
          Back to Admin
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Edit Product</h1>
          <Link
            href="/admin"
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Products
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($)
                </label>
                <input
                  id="price"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Status
                </label>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      checked={inStock}
                      onChange={() => setInStock(true)}
                      className="form-radio text-purple-600 h-4 w-4"
                    />
                    <span className="ml-2 text-gray-700">In Stock</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      checked={!inStock}
                      onChange={() => setInStock(false)}
                      className="form-radio text-purple-600 h-4 w-4"
                    />
                    <span className="ml-2 text-gray-700">Out of Stock</span>
                  </label>
                </div>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  required
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Image
                </label>
                <p className="text-sm text-gray-500 mb-2">
                  For the prototype, we&apos;re using placeholder images.
                </p>
                <div className="flex items-center space-x-4">
                  {['/images/placeholder.jpg', '/images/placeholder2.jpg', '/images/placeholder3.jpg'].map(img => (
                    <div 
                      key={img}
                      onClick={() => setImage(img)}
                      className={`border-2 rounded-md overflow-hidden ${
                        image === img ? 'border-purple-500' : 'border-gray-200'
                      }`}
                      style={{ width: '80px', height: '80px', cursor: 'pointer' }}
                    >
                      <div 
                        className="w-full h-full bg-gray-100 flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => router.push('/admin')}
                className="mr-4 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
