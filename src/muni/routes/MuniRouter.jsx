import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { ResourcesPage } from '../pages/ResourcesPage'
import { NavBar } from '../../ui/NavBar'
import { DashboardPage } from '../pages/DashboardPage'
import { StockInPage } from '../pages/StockInPage'
import { StockOutPage } from '../pages/StockOutPage'


export const MuniRouter = () => {
  return (

    <Routes>
      <Route path="/" element={<NavBar/>}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/stockIn" element={<StockInPage/>} />
          <Route path="/stockOut" element={<StockOutPage/>} />

          <Route path="/*" element={<Navigate to="/dashboard" />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
      </Route>
    </Routes>
  )
}
