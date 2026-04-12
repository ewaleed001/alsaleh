'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export default function MainContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <main className={isAdmin ? '' : 'mt-20'}>
      {children}
    </main>
  );
}
