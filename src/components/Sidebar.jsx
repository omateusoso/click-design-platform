import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Package,
    FileText,
    CheckSquare,
    Briefcase,
    LogOut,
    Moon,
    Sun
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './Sidebar.css';

const Sidebar = () => {
    const { theme, toggleTheme } = useTheme();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: Users, label: 'Clientes', path: '/clients' },
        { icon: Package, label: 'Produtos', path: '/products' },
        { icon: FileText, label: 'Orçamentos', path: '/quotes' },
        { icon: CheckSquare, label: 'Tarefas', path: '/tasks' },
        { icon: Briefcase, label: 'Equipe', path: '/team' },
    ];

    return (
        <aside className="sidebar glass-panel">
            <div className="sidebar-header">
                <div className="logo">
                    Click Design
                </div>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer">
                <div className="theme-toggle-wrapper">
                    <div className="theme-label">
                        {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
                        <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
                    </div>

                    <button
                        onClick={toggleTheme}
                        className="btn-icon"
                        style={{ width: '32px', height: '32px', background: 'var(--bg-card-hover)', border: '1px solid var(--border-color)' }}
                        title="Alternar Tema"
                    >
                        {theme === 'dark' ? <Sun size={16} className="text-lime" /> : <Moon size={16} />}
                    </button>
                </div>

                <button className="nav-item logout-btn">
                    <LogOut size={20} />
                    <span>Sair</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
