import { useLocation } from 'react-router';
import { useEffect } from 'react';

export const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/auth')) return; // no guardamos rutas del login
    localStorage.setItem('lastPath', location.pathname);
  }, [location]);

  return null;
};
