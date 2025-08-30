import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router';
import { RouteTracker } from './RouteTracker';
import { useAuthStore } from '../hooks/useAuthStore';
import { LoadingCheckAuth } from '../ui/LoadingCheckAuth';
import { AuthRouter } from '../auth/routes/AuthRoutes';
import { MuniRouter } from '../muni/routes/MuniRouter';

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();
  

  useEffect(() => {
    checkAuthToken();
  }, []);



  if (status === 'checking') return <LoadingCheckAuth />;

  return (
    <>
      <RouteTracker />
      <Routes>
        {
          status === 'authenticated'
            ? <Route path="/*" element={<MuniRouter/>} />
            : (
              <>
                <Route path="/auth/*" element={<AuthRouter />} />
                <Route path="/*" element={<Navigate to="/auth/login" />} />
              </>
            )
        }
      </Routes>
    </>
  );
};
