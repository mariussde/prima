'use client';

import { useState } from 'react';
import { TopBar } from '@/components/top-bar';
import { Sidebar } from '@/components/sidebar';

export default function CustomersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentPath, setCurrentPath] = useState('Customers');

  return (
    <div className="min-h-screen">
      <TopBar currentPath={currentPath} />
      <div className="flex">
        <Sidebar onNavigate={setCurrentPath} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}