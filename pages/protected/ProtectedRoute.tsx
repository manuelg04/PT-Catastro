/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { message } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Login from '../auth/login';
import Register from '../auth/register';
import { useAuth } from './AuthContext';

type ProtectedRouteProps = {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children } : ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isErrorShown, setIsErrorShown] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    if (typeof window !== 'undefined' && !isAuthenticated && !isErrorShown) {
      const currentRoute = router.asPath;
      if (currentRoute !== '/auth/login') {
        setIsErrorShown(true);
        router.push('/auth/login');
        message.error('Debe iniciar sesión');
        logout();
      }
    }
  }, [isAuthenticated, isErrorShown, router]);

  return (
    <>

      {[isAuthenticated ? children : <Login />]}
    </>
  );
};

export const a = '';
