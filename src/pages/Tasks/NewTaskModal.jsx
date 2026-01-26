import React, { useState } from 'react';
import { X, Folder, Upload, Globe, Instagram, PenTool, Type, Layout, Zap, Calendar as CalendarIcon, Clock, ChevronDown } from 'lucide-react';
import './NewTaskModal.css';

// --- MOCK DATABASE ---
const clientsDB = [
    {
        id: 1,
        name: 'Nubank',
        colors: ['#820AD1', '#FFFFFF', '#000000'],
        alert: '⚠️ Obs. Crítica: Proibido uso da cor laranja em qualquer material.'
    },
    {
        id: 2,
        name: 'Spotify',
        colors: ['#1DB954', '#191414', '#FFFFFF'],
        alert: null
    },
    {
        id: 3,
        name: 'Farm',
        colors: ['#FFA500', '#FF4500', '#008000'],
        alert: null
    }
];

const teamDB = [
    { id: 1, name: 'Bia (Designer)', avatar: 'Bia', workload: 2 },
    { id: 2, name: 'Felix (Motion)', avatar: 'Felix', workload: 5 }, // Overloaded
    { id: 3, name: 'Jean (Art Dir)', avatar: 'Jean', workload: 1 }
];

const NewTaskModal = ({ onClose }) => {
    // Form State
    const [selectedClient, setSelectedClient] = useState(null);
    const [taskType, setTaskType] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedFormats, setSelectedFormats] = useState([]);
    const [priority, setPriority] = useState('normal');
    const [assignee, setAssignee] = useState(null);

    // UX State
    const [isClientDropdownOpen, setIsClientDropdownOpen] = useState(false);

    // Derived State
    const isValid = selectedClient && title && taskType && assignee;

    const toggleFormat = (fmt) => {
        if (selectedFormats.includes(fmt)) {
            setSelectedFormats(selectedFormats.filter(f => f !== fmt));
        } else {
            setSelectedFormats([...selectedFormats, fmt]);
        }
    };

    return (
        <div className="new-task-overlay" onClick={onClose}>
            <div className="new-task-modal" onClick={e => e.stopPropagation()}>

                {/* Context Alert Banner */}
                {selectedClient?.alert && (
                    <div className="context-alert-banner">
                        {selectedClient.alert}
                    </div>
                )}

                <div className="nt-body">

                    {/* LEFT COLUMN: SCOPE */}
                    <div className="nt-col-scope">
                        <div className="nt-section-title"><Folder size={12} /> Contexto & Briefing</div>

                        {/* Client Selector */}
                        <div className="nt-input-group">
                            <label className="nt-input-label">CLIENTE</label>

                            <div
                                className="client-select-box"
                                onClick={() => setIsClientDropdownOpen(!isClientDropdownOpen)}
                            >
                                {selectedClient ? (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span style={{ fontWeight: '700', color: 'white' }}>{selectedClient.name}</span>
                                        <div className="brand-dots">
                                            {selectedClient.colors.map(c => (
                                                <div key={c} className="brand-dot" style={{ background: c }}></div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <span style={{ color: '#555' }}>Selecione o Cliente...</span>
                                )}
                                <ChevronDown size={16} color="#555" />
                            </div>

                            {/* Dropdown Logic */}
                            {isClientDropdownOpen && (
                                <div style={{
                                    background: '#111',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '12px',
                                    marginTop: '8px',
                                    overflow: 'hidden',
                                    position: 'absolute',
                                    width: '300px',
                                    zIndex: 10
                                }}>
                                    {clientsDB.map(client => (
                                        <div
                                            key={client.id}
                                            onClick={() => {
                                                setSelectedClient(client);
                                                setIsClientDropdownOpen(false);
                                            }}
                                            style={{ padding: '12px', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#ccc' }}
                                        >
                                            {client.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Task Type */}
                        <div className="nt-input-group">
                            <label className="nt-input-label">O QUE VAMOS CRIAR?</label>
                            <div className="type-grid">
                                {[
                                    { id: 'social', label: 'Social Media', icon: Instagram },
                                    { id: 'web', label: 'Web / App', icon: Globe },
                                    { id: 'print', label: 'Impresso', icon: Layout },
                                    { id: 'brand', label: 'Branding', icon: PenTool },
                                    { id: 'other', label: 'Genérico', icon: Type },
                                ].map(type => (
                                    <div
                                        key={type.id}
                                        className={`type-option ${taskType === type.id ? 'selected' : ''}`}
                                        onClick={() => setTaskType(type.id)}
                                    >
                                        <type.icon size={20} />
                                        <span style={{ fontSize: '11px' }}>{type.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Briefing Inputs */}
                        <div className="nt-input-group">
                            <input
                                type="text"
                                className="nt-input-lg"
                                placeholder="Título da Demanda"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                            <textarea
                                className="nt-textarea"
                                placeholder="Descreva o objetivo, público-alvo e textos..."
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </div>

                        {/* Conditional Formats */}
                        {taskType === 'social' && (
                            <div className="nt-input-group">
                                <label className="nt-input-label">FORMATOS NECESSÁRIOS</label>
                                <div className="format-tags">
                                    {['Feed Quadrado (1:1)', 'Portrait (4:5)', 'Story (9:16)', 'Capa Reel', 'Carrossel'].map(fmt => (
                                        <div
                                            key={fmt}
                                            className={`format-tag ${selectedFormats.includes(fmt) ? 'active' : ''}`}
                                            onClick={() => toggleFormat(fmt)}
                                        >
                                            {fmt}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Upload */}
                        <div className="upload-zone">
                            <Upload size={24} style={{ marginBottom: '12px' }} />
                            <div>Arraste referências, rascunhos ou briefing em PDF</div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: LOGISTICS */}
                    <div className="nt-col-logistics">

                        {/* Deadline */}
                        <div>
                            <div className="nt-section-title"><Clock size={12} /> Prazos</div>
                            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: 'white', fontSize: '14px' }}>
                                    <span>Início: Hoje</span>
                                    <span>Entrega: <span style={{ color: 'var(--primary-neon)' }}>Amanhã</span></span>
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <CalendarIcon size={16} color="#666" />
                                    <div style={{ height: '4px', flex: 1, background: '#333', marginTop: '8px', borderRadius: '2px' }}>
                                        <div style={{ width: '30%', height: '100%', background: 'var(--primary-neon)' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Priority */}
                        <div>
                            <div className="nt-section-title"><Zap size={12} /> Prioridade</div>
                            <div
                                className={`priority-option ${priority === 'normal' ? 'selected' : ''}`}
                                onClick={() => setPriority('normal')}
                            >
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#666' }}></div>
                                <span style={{ fontSize: '13px', color: '#ccc' }}>Normal</span>
                            </div>
                            <div
                                className={`priority-option ${priority === 'high' ? 'selected' : ''}`}
                                onClick={() => setPriority('high')}
                            >
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'white' }}></div>
                                <span style={{ fontSize: '13px', color: 'white', fontWeight: '700' }}>Alta Prioridade</span>
                            </div>
                            <div
                                className={`priority-option rush ${priority === 'rush' ? 'selected' : ''}`}
                                onClick={() => setPriority('rush')}
                            >
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FFFF00', boxShadow: '0 0 10px #FFFF00' }}></div>
                                <span style={{ fontSize: '13px', color: '#FFFF00', fontWeight: '700' }}>RUSH MODE</span>
                                <Zap size={14} className="rush-icon" />
                            </div>
                        </div>

                        {/* Assignee */}
                        <div>
                            <div className="nt-section-title">Responsável</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                {teamDB.map(member => (
                                    <div
                                        key={member.id}
                                        className="assignee-row"
                                        style={{ background: assignee === member.id ? 'rgba(255,255,255,0.1)' : '' }}
                                        onClick={() => setAssignee(member.id)}
                                    >
                                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.avatar}`} style={{ width: '32px', height: '32px', borderRadius: '50%' }} alt="av" />
                                        <div>
                                            <div style={{ color: 'white', fontSize: '13px' }}>{member.name}</div>
                                            <div className={`workload-indicator ${member.workload > 3 ? 'heavy' : ''}`}>
                                                Carga: {member.workload} tarefas hoje {member.workload > 3 && '🔥'}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Footer */}
                <div className="nt-footer">
                    <button style={{ background: 'transparent', border: 'none', color: '#666', cursor: 'pointer' }}>
                        Salvar Rascunho
                    </button>

                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
                            CANCELAR
                        </button>
                        <button className="btn-create" disabled={!isValid}>
                            CRIAR DEMANDA
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default NewTaskModal;
