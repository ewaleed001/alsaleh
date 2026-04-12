import React from 'react';

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Simple passthrough layout - specific sub-layouts handle their own chrome
  return <>{children}</>;
}
