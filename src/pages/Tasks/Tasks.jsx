import React, { useState } from 'react';
import { Plus, Filter, LayoutGrid, List, Calendar, Flame, AlertTriangle } from 'lucide-react';
import TaskModal from './TaskModal';
import NewTaskModal from './NewTaskModal';
import './Tasks.css';

// --- MOCK DATA ---
const mockTasks = [
    {
        id: 'T-101',
        title: 'Campanha de Verão: Key Visual',
        client: 'Nubank',
        type: 'Social Media',
        status: 'wip', // briefing, wip, review, approval, done
        deadline: 'late', // today, tomorrow, late
        rush: true,
        refactionCount: 1,
        version: 'v1',
        cover: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&auto=format&fit=crop&q=60',
        assignee: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop' // Felix
    },
    {
        id: 'T-102',
        title: 'Lançamento App v5.0',
        client: 'Spotify',
        type: 'Landing Page',
        status: 'approval',
        deadline: 'today',
        rush: false,
        refactionCount: 3, // HELL BADGE TRIGGER
        version: 'v4',
        cover: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=60',
        assignee: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop' // Ana
    },
    {
        id: 'T-103',
        title: 'Posts Carrossel Educativo',
        client: 'Farm',
        type: 'Instagram',
        status: 'briefing',
        deadline: 'tomorrow',
        rush: false,
        refactionCount: 0,
        version: '',
        cover: null, // No cover, show logo placeholder logic
        assignee: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop' // Jean (was John)
    },
    {
        id: 'T-104',
        title: 'Rebrand Presentation',
        client: 'Kamino',
        type: 'Branding',
        status: 'review',
        deadline: 'today',
        rush: true,
        refactionCount: 0,
        version: 'v2',
        cover: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&auto=format&fit=crop&q=60',
        assignee: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop' // Bia (was Sarah)
    }
];

const columns = [
    { id: 'briefing', label: 'Briefing / Backlog', color: '#666' },
    { id: 'wip', label: 'Em Criação (WIP)', color: '#89F336' }, // Neon
    { id: 'review', label: 'Revisão Interna', color: '#820AD1' }, // Purple
    { id: 'approval', label: 'Aprovação Cliente', color: '#FFAA00' }, // Orange
    { id: 'done', label: 'Finalizado', color: '#FFF' }
];

const Tasks = () => {
    const [viewMode, setViewMode] = useState('kanban'); // kanban, list, calendar
    const [selectedTask, setSelectedTask] = useState(null);
    const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

    return (
        <div className="page-container">
            {/* Header */}
            <div className="tasks-header-area">
                <div>
                    <h1 className="page-title mb-2">DEMANDAS</h1>
                    <div className="view-switcher">
                        <button
                            className={`view-btn ${viewMode === 'kanban' ? 'active' : ''}`}
                            onClick={() => setViewMode('kanban')}
                        >
                            <LayoutGrid size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                            KANBAN
                        </button>
                        <button
                            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => setViewMode('list')}
                        >
                            <List size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                            LISTA
                        </button>
                        <button
                            className={`view-btn ${viewMode === 'calendar' ? 'active' : ''}`}
                            onClick={() => setViewMode('calendar')}
                        >
                            <Calendar size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                            CALENDÁRIO
                        </button>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div className="filters-bar" style={{ marginTop: 0 }}>
                        <button className="filter-btn active">Meu Trabalho</button>
                        <button className="filter-btn">Toda a Agência</button>
                        <button className="filter-btn"><Filter size={14} /> Filtros</button>
                    </div>
                    <button
                        className="btn-new-quote"
                        onClick={() => setIsNewTaskModalOpen(true)}
                    >
                        <Plus size={18} /> NOVA DEMANDA
                    </button>
                </div>
            </div>

            {/* Kanban View */}
            {viewMode === 'kanban' && (
                <div className="kanban-board">
                    {columns.map(col => (
                        <div key={col.id} className={`kanban-column ${col.id}`}>
                            <div className="column-header">
                                <span className="column-title" style={{ color: col.color === '#89F336' ? 'var(--primary-neon)' : '' }}>
                                    {col.label}
                                </span>
                                <span className="column-count">
                                    {mockTasks.filter(t => t.status === col.id).length}
                                </span>
                            </div>

                            <div className="column-body">
                                {mockTasks
                                    .filter(t => t.status === col.id)
                                    .map(task => (
                                        <div
                                            key={task.id}
                                            className={`task-card ${task.rush ? 'rush' : ''}`}
                                            onClick={() => setSelectedTask(task)}
                                        >
                                            {/* Refaction Badge */}
                                            {task.refactionCount >= 2 && (
                                                <div className="refaction-badge" title="Retorno de Aprovação Excessivo">
                                                    <Flame size={14} color="white" fill="white" />
                                                </div>
                                            )}

                                            <div className="task-cover" style={{ backgroundImage: task.cover ? `url(${task.cover})` : 'none', backgroundColor: '#222' }}>
                                                <div className="task-cover-content">
                                                    <span className="client-pill">{task.client}</span>
                                                </div>
                                                <span className="task-type">{task.type}</span>
                                            </div>

                                            <div className="task-body">
                                                <h3 className="task-title">{task.title}</h3>

                                                <div className="task-footer">
                                                    <div className="task-meta">
                                                        <img
                                                            src={task.assignee}
                                                            alt="user"
                                                            style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid #333' }}
                                                        />
                                                        {task.version && (
                                                            <span style={{ fontSize: '10px', background: '#333', padding: '2px 6px', borderRadius: '4px', color: '#999' }}>
                                                                {task.version.toUpperCase()}
                                                            </span>
                                                        )}
                                                    </div>

                                                    <span className={`task-deadline ${task.deadline}`}>
                                                        {task.deadline === 'late' && <span style={{ marginRight: '4px' }}>⚠️</span>}
                                                        {task.deadline === 'today' ? 'HOJE' : task.deadline === 'late' ? 'ATRASADO' : 'AMANHÃ'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* List View Placeholder */}
            {viewMode === 'list' && (
                <div style={{ padding: '0 40px', color: 'var(--text-secondary)' }}>
                    <p>Visualização em Lista em desenvolvimento...</p>
                </div>
            )}

            {/* Modal */}
            {selectedTask && (
                <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />
            )}

            {/* NEW TASK MODAL */}
            {isNewTaskModalOpen && (
                <NewTaskModal onClose={() => setIsNewTaskModalOpen(false)} />
            )}
        </div>
    );
};

export default Tasks;
