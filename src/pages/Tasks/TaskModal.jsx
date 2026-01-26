import React, { useState } from 'react';
import { X, Play, Pause, Paperclip, MessageSquare, Clock, AlertTriangle, Flame } from 'lucide-react';
import './Tasks.css';

const TaskModal = ({ task, onClose }) => {
    const [activeTab, setActiveTab] = useState('briefing');
    const [isTracking, setIsTracking] = useState(false);
    const [chatMode, setChatMode] = useState('internal'); // internal | client

    if (!task) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="super-modal" onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div className="modal-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        <div>
                            <span style={{ color: 'var(--primary-neon)', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>
                                {task.client}
                            </span>
                            <h2 style={{ fontSize: '20px', fontWeight: '500', color: 'white' }}>{task.title}</h2>
                        </div>

                        {/* Time Tracker */}
                        <div className="time-tracker">
                            <button
                                className={`play-track-btn ${isTracking ? 'active' : ''}`}
                                onClick={() => setIsTracking(!isTracking)}
                            >
                                {isTracking ? <Pause size={14} /> : <Play size={14} />}
                            </button>
                            <span style={{ fontFamily: 'monospace', fontSize: '18px', color: isTracking ? 'var(--primary-neon)' : 'var(--text-muted)' }}>
                                {isTracking ? '01:24:10' : '00:00:00'}
                            </span>
                        </div>
                    </div>

                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                        <X size={24} />
                    </button>
                </div>

                {/* Grid Layout */}
                <div className="modal-grid">

                    {/* LEFT: Context */}
                    <div className="col-context">
                        <div style={{ padding: '24px', borderBottom: '1px solid var(--glass-border)' }}>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                                <button
                                    className={`filter-btn ${activeTab === 'briefing' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('briefing')}
                                >
                                    Briefing
                                </button>
                                <button
                                    className={`filter-btn ${activeTab === 'assets' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('assets')}
                                >
                                    Assets
                                </button>
                            </div>

                            {activeTab === 'briefing' ? (
                                <div style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
                                    <h4 style={{ color: 'white', marginBottom: '8px' }}>Objetivo</h4>
                                    <p className="mb-4">Criar 3 opções de posts para o lançamento da coleção de verão.</p>

                                    <h4 style={{ color: 'white', marginBottom: '8px' }}>Checklist</h4>
                                    <ul style={{ listStyle: 'none' }}>
                                        <li style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                            <input type="checkbox" defaultChecked /> Formato 1080x1080
                                        </li>
                                        <li style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                            <input type="checkbox" /> Usar nova paleta
                                        </li>
                                        <li style={{ display: 'flex', gap: '8px' }}>
                                            <input type="checkbox" /> Logo centralizado
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <div>
                                    <div className="asset-link">
                                        <Paperclip size={14} /> Manual da Marca.pdf
                                    </div>
                                    <div className="asset-link mt-2">
                                        <Paperclip size={14} /> Fotos_Produto.zip
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* CENTER: Light Table */}
                    <div className="col-light-table">

                        {/* Timeline */}
                        <div className="timeline-item">
                            <div className="timeline-marker">
                                <div className="marker-dot"></div>
                                <div className="marker-line"></div>
                            </div>
                            <div className="version-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                    <span style={{ fontWeight: '700', color: 'white' }}>V1 - Conceito Inicial</span>
                                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Ontem, 14:30</span>
                                </div>
                                <div style={{ height: '180px', background: '#222', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src="https://images.unsplash.com/photo-1626785774573-4b7993143a42?w=800&auto=format&fit=crop&q=60"
                                        style={{ height: '100%', objectFit: 'contain' }} alt="v1" />
                                </div>
                                <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(255,100,100,0.1)', borderLeft: '2px solid #ff4444', borderRadius: '4px' }}>
                                    <p style={{ fontSize: '13px', color: '#ffaaaa' }}>
                                        <strong>Feedback (CD):</strong> Aumentar o contraste do título.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Dropzone */}
                        <div style={{
                            border: '2px dashed var(--glass-border)',
                            borderRadius: '12px',
                            padding: '40px',
                            textAlign: 'center',
                            color: 'var(--text-muted)',
                            cursor: 'pointer'
                        }}>
                            <p style={{ color: 'var(--primary-neon)', fontWeight: '700', marginBottom: '8px' }}>+ NOVA VERSÃO</p>
                            <p style={{ fontSize: '12px' }}>Arraste seus arquivos aqui para criar a V2</p>
                        </div>

                    </div>

                    {/* RIGHT: Chat */}
                    <div className="col-chat">
                        <div style={{ padding: '16px', borderBottom: '1px solid var(--glass-border)' }}>
                            <div className="view-switcher" style={{ width: '100%' }}>
                                <button
                                    className={`view-btn ${chatMode === 'internal' ? 'active' : ''}`}
                                    onClick={() => setChatMode('internal')}
                                    style={{ flex: 1, textAlign: 'center' }}
                                >
                                    INTERNO
                                </button>
                                <button
                                    className={`view-btn ${chatMode === 'client' ? 'active' : ''}`}
                                    onClick={() => setChatMode('client')}
                                    style={{ flex: 1, textAlign: 'center' }}
                                >
                                    CLIENTE
                                </button>
                            </div>
                        </div>

                        <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
                            {chatMode === 'internal' ? (
                                <>
                                    <div style={{ marginBottom: '16px' }}>
                                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Pedro (Art Director) • 14:00</div>
                                        <div style={{ background: '#222', padding: '10px', borderRadius: '8px', fontSize: '13px', color: '#ddd' }}>
                                            Vamos focar na tipografia bold. O cliente quer impacto.
                                        </div>
                                    </div>
                                    <div style={{ marginBottom: '16px', textAlign: 'right' }}>
                                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Você • 14:05</div>
                                        <div style={{ background: 'rgba(137, 243, 54, 0.1)', border: '1px solid var(--primary-neon)', padding: '10px', borderRadius: '8px', fontSize: '13px', color: 'var(--primary-neon)', display: 'inline-block', textAlign: 'left' }}>
                                            Certo, vou ajustar na V2.
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div style={{ textAlign: 'center', marginTop: '40px', color: 'var(--text-muted)' }}>
                                    <MessageSquare size={32} style={{ marginBottom: '16px', opacity: 0.5 }} />
                                    <p>Nenhuma mensagem do cliente ainda.</p>
                                </div>
                            )}
                        </div>

                        <div style={{ padding: '16px', borderTop: '1px solid var(--glass-border)' }}>
                            <input
                                type="text"
                                placeholder={`Mensagem para ${chatMode === 'internal' ? 'equipe' : 'cliente'}...`}
                                style={{
                                    width: '100%',
                                    background: '#111',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '8px',
                                    padding: '12px',
                                    color: 'white',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TaskModal;
