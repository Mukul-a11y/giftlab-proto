'use client';

import { useEffect, useState } from 'react';

export default function Footer() {
  // Use state to store the year and only update it client-side
  const [year, setYear] = useState<number | null>(null);
  
  // Set the year after component mounts (client-side only)
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-gray-100 py-6">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <p>© {year || '2025'} GiftLabs. All rights reserved.</p>
        <p className="text-sm mt-2">Prototype for demonstration purposes only.</p>
      </div>
    </footer>
  );
}
