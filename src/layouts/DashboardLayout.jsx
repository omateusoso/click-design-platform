import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import './DashboardLayout.css';

const DashboardLayout = () => {
    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="content-wrapper">
                <Header />
                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
