'use client';
import { Suspense } from 'react';
import MainLayout from '../components/MainLayout';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div>loading</div>}>
      <MainLayout>{children}</MainLayout>
    </Suspense>
  );
}
