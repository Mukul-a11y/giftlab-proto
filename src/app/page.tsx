import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import products from '@/data/products.json';

export default function Home() {
  return (
    <div className="bg-white">
      {/* Minimal Hero Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Premium Gift Solutions
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Find the perfect gift for every occasion
          </p>
          <Link 
            href="#products" 
            className="px-6 py-3 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Simple Features */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-purple-700">Premium Packaging</h3>
              <p className="text-gray-600">Elegant packaging for all occasions</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-purple-700">Fast Delivery</h3>
              <p className="text-gray-600">Express shipping available</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-purple-700">Personalization</h3>
              <p className="text-gray-600">Custom messages available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Our Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
