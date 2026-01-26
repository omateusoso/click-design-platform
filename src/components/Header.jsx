import React from 'react';
import { Bell } from 'lucide-react';
import './Header.css';

const Header = ({ title = "Visão Geral" }) => {
    return (
        <header className="app-header">
            <h1 className="page-title">{title}</h1>

            <div className="header-actions">
                <button className="notification-btn" aria-label="Notificações">
                    <Bell size={20} strokeWidth={1.5} />
                    <span className="notification-dot"></span>
                </button>

                <div className="user-avatar">
                    <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                        alt="User Profile"
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;
