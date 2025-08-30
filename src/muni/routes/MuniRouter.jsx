import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router'
import { NavBar } from '../../ui/NavBar'
import { MovementsPage, DashboardPage, ResourcesPage } from '../pages'
import { ResourcePage } from '../pages/ResourcePage'
import { ProfilePage } from '../pages/ProfilePage'
import { useEffect } from 'react'
import { WorkersPage } from '../pages/WorkersPage'
import { WorkerPage } from '../pages/WorkerPage'


export const MuniRouter = () => {

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const lastPath = localStorage.getItem('lastPath') || '/resources';
    if (location.pathname === '/' || location.pathname.startsWith('/auth')) {
      navigate(lastPath, { replace: true });
    }
  }, []);
  return (

    <Routes>
      <Route path="/" element={<NavBar/>}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/resources" element={<ResourcesPage />} />s
          <Route path="/movements" element={<MovementsPage/>} />
          <Route path="/resources/:id" element={<ResourcePage/>} />
          <Route path="/workers" element={<WorkersPage/>} />
          <Route path="/workers/:id" element={<WorkerPage/>} />



          <Route path="/*" element={<Navigate to="/resources" />} />
          <Route path="/" element={<Navigate to="/resources" />} />
      </Route>
    </Routes>
  )
}
