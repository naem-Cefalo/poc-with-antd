'use client';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    let auth: unknown;
    if (typeof window !== 'undefined') {
      auth = localStorage.getItem('auth');
    }
    useEffect(() => {
      if (!auth) {
        redirect('/login');
      }
    }, []);

    return <Component {...props} />;
  };
}
