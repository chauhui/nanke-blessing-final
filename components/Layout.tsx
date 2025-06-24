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
      <main className="flex-grow mt-32 container mx-auto px-4 py-8">
        {title && <h1 className="text-3xl font-bold mb-8">{title}</h1>}
        {children}
      </main>
      <Footer />
    </div>
  );
}