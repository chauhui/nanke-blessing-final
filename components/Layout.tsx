// components/Layout.tsx
'use client';

import NavBar from './NavBar';
import Footer from './Footer';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export default function Layout({ children, title }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      {/* 移除預設的 mt-32 和 py-8，讓各頁面自行控制上方留白 */}
      <main className="flex-grow container mx-auto px-4">
        {title && <h1 className="text-3xl font-bold mb-8">{title}</h1>}
        {children}
      </main>
      <Footer />
    </div>
  );
}
