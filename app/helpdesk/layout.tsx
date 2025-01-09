'use client';

import { TopBar } from '@/components/top-bar';

export default function HelpdeskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <TopBar currentPath="Help Center" />
      <main>{children}</main>
    </div>
  );
}