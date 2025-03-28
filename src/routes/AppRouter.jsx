import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { MuniApp } from '../MuniApp'
import { AuthRouter } from '../auth/routes/AuthRoutes'
import { useCheckAuth } from '../hooks/useCheckAuth'
import { MuniRouter } from '../muni/routes/MuniRouter'
import { LoadingCheckAuth } from '../ui/LoadingCheckAuth'

export const AppRouter = () => {

    const status = useCheckAuth();


    if (status === "checking") {
      return <LoadingCheckAuth />;
    }

  return (
    
    <Routes>
    {
      (status === 'authenticated')
      //Si esta authenticado entra directamente a la pagina principal
      ? <Route path="/*" element={<MuniRouter />} />
      
      //Si no esta auth solo puede ver las direcciones de auth
      : <Route path="/auth/*" element={<AuthRouter />} />
    }

    {/* //*cualquier cosa que se busque lo envia directo a auth/login */}
    <Route path="/*" element={ <Navigate to='/auth/login' />} />

    </Routes>

  )
}
