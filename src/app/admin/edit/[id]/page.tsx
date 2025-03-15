'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import productsData from '@/data/products.json';

interface PageProps {
  params: {
    id: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
}

export default function EditProductPage({ params }: PageProps) {
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
  const productId = parseInt(params.id);

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
  }, [isAuthenticated, isAdmin, router, isLoaded, productId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !description || !price || !category) {
      alert('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real app, this would call an API
    // For the prototype, we'll just simulate updating a product
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
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-8">The product you are looking for does not exist.</p>
          <Link 
            href="/admin"
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
          >
            Return to Admin Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex items-center mb-8">
        <Link
          href="/admin"
          className="mr-4 text-purple-600 hover:text-purple-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </Link>
        <h1 className="text-3xl font-bold">Edit Product</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price ($) *
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0.01"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category *
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
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                Stock Status
              </label>
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="stock"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="stock" className="ml-2 block text-sm text-gray-700">
                  In Stock
                </label>
              </div>
            </div>

            <div className="col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description *
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

            <div className="col-span-2">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  id="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  placeholder="/images/placeholder.jpg"
                />
                <button
                  type="button"
                  onClick={() => setImage('/images/placeholder.jpg')}
                  className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Reset
                </button>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                For the prototype, this just sets a URL. In a real app, you would upload an image.
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Link
              href="/admin"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mr-3"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-75"
            >
              {isSubmitting ? 'Updating...' : 'Update Product'}
            </button>
          </div>
        </form>
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
              This is a prototype. Updating products is simulated and changes are not persisted between sessions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
