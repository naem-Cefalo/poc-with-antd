'use client';
import { useLayoutEffect } from 'react';
import MainLayout from '../components/MainLayout';
import { redirect } from 'next/navigation';
import isAuth from '../components/Auth';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    const auth = localStorage.getItem('auth');
    if (!auth) {
      return redirect('/login');
    }
  }, []);
  return <MainLayout>{children}</MainLayout>;
}
export default isAuth(DashboardLayout);
