import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import Clients from './pages/Clients/Clients';
import Products from './pages/Products/Products';
import Quotes from './pages/Quotes/Quotes';
import ProposalBuilder from './pages/Quotes/ProposalBuilder';
import Team from './pages/Team/Team';
import Tasks from './pages/Tasks/Tasks';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="clients" element={<Clients />} />
          <Route path="products" element={<Products />} />
          <Route path="quotes" element={<Quotes />} />
          <Route path="quotes/new" element={<ProposalBuilder />} />
          <Route path="team" element={<Team />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
