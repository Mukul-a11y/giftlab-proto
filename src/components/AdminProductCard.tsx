'use client';

import Image from 'next/image';
import Link from 'next/link';

type AdminProductCardProps = {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    inStock: boolean;
  };
  onDelete: (id: number) => void;
};

export default function AdminProductCard({ product, onDelete }: AdminProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4 flex">
      <div className="relative h-24 w-24 flex-shrink-0">
        <Image
          src={product.image || '/images/placeholder.jpg'}
          alt={product.name}
          className="object-cover rounded"
          fill
          sizes="96px"
        />
      </div>
      
      <div className="ml-4 flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-gray-800">{product.name}</h3>
            <p className="text-sm text-gray-500 line-clamp-1">{product.description}</p>
          </div>
          <div className="flex space-x-2">
            <Link 
              href={`/admin/edit/${product.id}`}
              className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </Link>
            <button 
              onClick={() => onDelete(product.id)}
              className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div>
            <span className="inline-block px-2 py-1 text-xs text-purple-600 bg-purple-100 rounded-full mr-2">
              {product.category}
            </span>
            <span className={`inline-block px-2 py-1 text-xs rounded-full ${
              product.inStock 
                ? 'text-green-600 bg-green-100' 
                : 'text-red-600 bg-red-100'
            }`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
          <span className="font-bold text-gray-800">${product.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
