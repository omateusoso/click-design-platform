import React, { useState } from 'react';
import { Play, Check, Clock, AlertCircle } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
    // Mock State for Focus Queue
    const [tasks, setTasks] = useState([
        { id: 1, client: 'Nike Global', title: 'Campanha Air Max - Desdobramentos', type: 'Social Media', status: 'todo' },
        { id: 2, client: 'Starbucks', title: 'Ajuste final do Banner App', type: 'App Design', status: 'active' }, // One active by default
        { id: 3, client: 'Spotify', title: 'lp_lollapalooza_v3.fig', type: 'Landing Page', status: 'todo' },
        { id: 4, client: 'Localiza', title: 'E-mail Marketing Fim de Ano', type: 'CRM', status: 'completed' },
    ]);

    const toggleTaskStatus = (id) => {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                // Toggle between todo and active
                if (task.status === 'active') return { ...task, status: 'completed' }; // Simple flow for demo
                if (task.status === 'todo') return { ...task, status: 'active' };
            }
            // If starting a new task, pause others (single focus mode)
            if (task.id !== id && task.status === 'active') {
                return { ...task, status: 'todo' };
            }
            return task;
        }));
    };

    return (
        <div className="dashboard-grid fade-in">

            {/* Header: Personal Status */}
            <div className="dashboard-header">
                <div className="greeting-text">
                    Bom dia, <span className="greeting-highlight">Mateus</span>. Você tem <span style={{ color: 'var(--primary-neon)' }}>3 entregas</span> críticas hoje.
                </div>

                <div className="focus-timer-badge">
                    <Clock size={16} />
                    <span>01:45:22 FOCUS</span>
                </div>
            </div>

            {/* COL 1: Focus Queue (50%) */}
            <div className="col-focus-queue">
                <h3 className="widget-title-cockpit">Queue de Hoje</h3>

                <div className="queue-list">
                    {tasks.map(task => (
                        <div
                            key={task.id}
                            className={`queue-card ${task.status === 'active' ? 'active-focus' : ''} ${task.status === 'completed' ? 'completed' : ''}`}
                            onClick={() => toggleTaskStatus(task.id)}
                        >
                            <div className="task-info">
                                <span className="task-client">{task.client}</span>
                                <span className="task-title">{task.title}</span>
                            </div>

                            <div className="task-meta">
                                <span className="task-tag">{task.type}</span>
                                <button className="start-btn">
                                    {task.status === 'completed' ? <Check size={16} /> : <Play size={14} fill={task.status === 'active' ? "currentColor" : "none"} />}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* COL 2: Revision Loop (25%) */}
            <div className="col-revision-loop">
                <h3 className="widget-title-cockpit">Ajustes Pendentes</h3>

                <div className="revision-card">
                    <div className="rev-project">Logo Click Design</div>
                    <div className="rev-comment">"Cliente pediu para testar um tom de verde mais fechado no fundo."</div>
                </div>

                <div className="revision-card">
                    <div className="rev-project">Post Institucional</div>
                    <div className="rev-comment">"Aumentar o logo e trocar a foto do banco de imagens."</div>
                </div>
            </div>

            {/* COL 3: Context & Stats (25%) */}
            <div className="col-context">
                <div className="stats-group">
                    <h3 className="widget-title-cockpit" style={{ marginBottom: '0' }}>Performance Mês</h3>

                    <div className="stat-item">
                        <span className="stat-value">42</span>
                        <span className="stat-label">Arts Shipped</span>
                    </div>

                    <div className="stat-item">
                        <span className="stat-value" style={{ color: 'var(--primary-neon)' }}>95%</span>
                        <span className="stat-label">Approval Rate</span>
                    </div>
                </div>

                <div className="pipeline-group">
                    <h3 className="widget-title-cockpit">Entrando na Fila</h3>
                    <div className="briefing-list">
                        <div className="briefing-item">
                            <strong>Novo Cliente: RAKSA</strong> (Branding Completo)
                        </div>
                        <div className="briefing-item">
                            <strong>Campanha Black Friday</strong> (15 peças)
                        </div>
                        <div className="briefing-item">
                            <strong>Site Institucional</strong> (Wireframes)
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
