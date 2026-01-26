import React from 'react';
import { X, Mail, Phone, Linkedin, Clock, CheckCircle, AlertTriangle, Briefcase, Settings } from 'lucide-react';
import './Team.css';

const TeamMemberPanel = ({ member, onClose }) => {
    if (!member) return null;

    return (
        <div className="side-panel-overlay" onClick={onClose}>
            <div className="side-panel" onClick={e => e.stopPropagation()}>

                <div style={{ position: 'absolute', top: '24px', right: '24px', cursor: 'pointer', color: '#666' }} onClick={onClose}>
                    <X size={24} />
                </div>

                {/* HEADER */}
                <div className="panel-header">
                    <img src={member.avatar} className="panel-avatar" alt="av" />
                    <div>
                        <h2 style={{ color: 'white', fontSize: '24px', fontWeight: '500' }}>{member.name}</h2>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>{member.role} • Nvl. {member.level || 'Pleno'}</div>

                        <div className="contact-row">
                            <button className="contact-btn" title="Email"><Mail size={16} /></button>
                            <button className="contact-btn" title="WhatsApp"><Phone size={16} /></button>
                            <button className="contact-btn" title="LinkedIn"><Linkedin size={16} /></button>
                        </div>
                    </div>
                </div>

                {/* CURRENT MISSION */}
                <h3 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    EM ANDAMENTO AGORA
                </h3>

                {member.status === 'online' || member.status === 'busy' ? (
                    <div className="current-mission-card">
                        <div className="playing-indicator">
                            <div className="bars-anim">
                                <div className="bar"></div>
                                <div className="bar"></div>
                                <div className="bar"></div>
                            </div>
                            PLAYING
                        </div>
                        <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>{member.currentTask?.client || 'Cliente Padrão'}</div>
                        <h4 style={{ color: 'white', fontSize: '16px', marginBottom: '12px' }}>{member.currentTask?.title || 'Trabalhando em Tarefa Privada'}</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--primary-neon)' }}>
                            <Clock size={14} />
                            Tempo decorrido: 01:42h
                        </div>
                    </div>
                ) : (
                    <div style={{ padding: '24px', border: '1px dashed #333', borderRadius: '12px', textAlign: 'center', color: '#555', marginBottom: '32px' }}>
                        Colaborador offline ou ausente.
                    </div>
                )}

                {/* STATS GRID */}
                <h3 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    METRICS (LAST 30 DAYS)
                </h3>
                <div className="stats-grid">
                    <div className="stat-box">
                        <CheckCircle size={20} color="#89F336" style={{ margin: '0 auto' }} />
                        <div className="stat-val">94%</div>
                        <div className="stat-label">On-Time Delivery</div>
                    </div>
                    <div className="stat-box">
                        <AlertTriangle size={20} color="#FF4444" style={{ margin: '0 auto' }} />
                        <div className="stat-val">12%</div>
                        <div className="stat-label">Refaction Rate</div>
                    </div>
                    <div className="stat-box">
                        <Briefcase size={20} color="white" style={{ margin: '0 auto' }} />
                        <div className="stat-val">28</div>
                        <div className="stat-label">Cards Entregues</div>
                    </div>
                    <div className="stat-box">
                        <div style={{ fontSize: '20px' }}>⚡️</div>
                        <div className="stat-val">Top 1%</div>
                        <div className="stat-label">Productivity</div>
                    </div>
                </div>

                {/* SKILLS RADAR */}
                <h3 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    SKILLS RADAR
                </h3>
                <div className="skills-radar-box">
                    <div className="radar-poly"></div>
                    <div style={{ position: 'absolute', color: '#666', fontSize: '10px', top: '10px' }}>Técnica</div>
                    <div style={{ position: 'absolute', color: '#666', fontSize: '10px', bottom: '10px' }}>Criatividade</div>
                    <div style={{ position: 'absolute', color: '#666', fontSize: '10px', left: '10px' }}>Velocidade</div>
                    <div style={{ position: 'absolute', color: '#666', fontSize: '10px', right: '10px' }}>Comunicação</div>
                </div>

                {/* ADMIN SECTION */}
                <div className="admin-section">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#555', marginBottom: '16px', fontSize: '12px' }}>
                        <Settings size={14} /> ADMIN CONTROLS
                    </div>

                    <div className="admin-row">
                        <span style={{ color: '#ccc', fontSize: '14px' }}>Nível de Acesso</span>
                        <select className="role-select" defaultValue="designer">
                            <option value="manager">Manager</option>
                            <option value="designer">Designer (Creator)</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div className="admin-row">
                        <span style={{ color: '#ccc', fontSize: '14px' }}>Valor Hora (Interno)</span>
                        <div style={{ background: '#111', padding: '8px 12px', borderRadius: '8px', border: '1px solid #333', color: '#666' }}>
                            R$ 120,00 /h
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TeamMemberPanel;
