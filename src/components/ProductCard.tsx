'use client';

import Image from 'next/image';
import { useCart } from '@/context/CartContext';

type ProductProps = {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    inStock: boolean;
  }
};

export default function ProductCard({ product }: ProductProps) {
  const { addToCart } = useCart();
  
  return (
    <div className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-md overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={product.image || '/images/placeholder.jpg'}
          alt={product.name}
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-gray-800 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-purple-700 font-medium">${product.price.toFixed(2)}</span>
          
          <button 
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              product.inStock 
                ? 'bg-purple-600 text-white hover:bg-purple-700' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}
