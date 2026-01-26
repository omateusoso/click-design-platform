import React, { useState, useEffect } from 'react';
import { X, Check, Upload, Wand2, Info } from 'lucide-react';
import './BriefingModal.css';
import './Products.css'; // Inheriting some standard input styles if needed

// Mock Clients for the dropdown
const CLIENTS = [
    { id: 1, name: 'Nubank', colors: ['#820AD1', '#FFFFFF'] },
    { id: 2, name: 'Farm Rio', colors: ['#E84E1B', '#F2C94C'] },
    { id: 6, name: 'Spotify', colors: ['#1DB954', '#191414'] },
    // ... others
];

const BriefingModal = ({ isOpen, onClose, product }) => {
    const [selectedClient, setSelectedClient] = useState('');
    const [useBrandGuide, setUseBrandGuide] = useState(true);

    // Form States
    const [socialFormat, setSocialFormat] = useState('square');
    const [lpSections, setLpSections] = useState([]);
    const [logoArchetype, setLogoArchetype] = useState('Moderno');

    if (!isOpen || !product) return null;

    const handleClientChange = (e) => {
        const clientName = e.target.value;
        setSelectedClient(clientName);
        // Smart Suggestion Logic: default to true for known clients
        if (clientName) setUseBrandGuide(true);
    };

    const toggleSection = (section) => {
        if (lpSections.includes(section)) {
            setLpSections(lpSections.filter(s => s !== section));
        } else {
            setLpSections([...lpSections, section]);
        }
    };

    // --- Dynamic Forms Renderers ---

    const renderSocialForm = () => (
        <div className="fade-in">
            <h4 className="form-section-title">Formato</h4>
            <div className="format-grid mb-6">
                <div
                    className={`format-option ${socialFormat === 'square' ? 'selected' : ''}`}
                    onClick={() => setSocialFormat('square')}
                >
                    <div className="icon-box" style={{ height: '32px' }}></div>
                    <span className="text-xs">Quadrado</span>
                </div>
                <div
                    className={`format-option ${socialFormat === 'portrait' ? 'selected' : ''}`}
                    onClick={() => setSocialFormat('portrait')}
                >
                    <div className="icon-box" style={{ height: '40px' }}></div>
                    <span className="text-xs">Portrait</span>
                </div>
                <div
                    className={`format-option ${socialFormat === 'story' ? 'selected' : ''}`}
                    onClick={() => setSocialFormat('story')}
                >
                    <div className="icon-box" style={{ height: '50px' }}></div>
                    <span className="text-xs">Story</span>
                </div>
            </div>

            <h4 className="form-section-title">Conteúdo</h4>
            <div className="form-group mb-4">
                <label className="input-label">A Tese (Objetivo)</label>
                <input type="text" className="input-line" placeholder="Ex: Engajamento com pergunta polêmica" />
            </div>

            <div className="form-group mb-4">
                <label className="input-label">Headline (Capa)</label>
                <input type="text" className="input-line" placeholder="Título principal da arte..." />
            </div>

            <div className="form-group">
                <label className="input-label">Corpo do Texto / Legenda</label>
                <textarea className="input-line" rows="4" placeholder="Cole aqui o texto ou roteiro..."></textarea>
            </div>
        </div>
    );

    const renderLPForm = () => (
        <div className="fade-in">
            <h4 className="form-section-title">Estrutura (Checklist)</h4>
            <div className="checklist-container mb-6">
                {['Hero Section', 'Prova Social', 'Benefícios', 'FAQ', 'Formulário', 'Footer'].map(sec => (
                    <div
                        key={sec}
                        className={`checklist-item ${lpSections.includes(sec) ? 'checked' : ''}`}
                        onClick={() => toggleSection(sec)}
                    >
                        <div className="checklist-checkbox">
                            <Check size={12} strokeWidth={4} />
                        </div>
                        <span className="checklist-label">{sec}</span>
                    </div>
                ))}
            </div>

            <h4 className="form-section-title">Conteúdo Obrigatório</h4>
            <div className="form-group">
                <label className="input-label">Doc de Texto Final</label>
                <div className="p-4 border border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:border-white transition-colors cursor-pointer">
                    <Upload size={24} className="mb-2" />
                    <span className="text-sm">Arraste seu DOC ou PDF aqui</span>
                </div>
            </div>
        </div>
    );

    const renderBrandingForm = () => (
        <div className="fade-in">
            <h4 className="form-section-title">Personalidade</h4>
            <div className="form-group mb-6">
                <label className="input-label">Arquétipo Principal</label>
                <select className="input-line bg-transparent">
                    <option>O Criador</option>
                    <option>O Sábio</option>
                    <option>O Rebelde</option>
                    <option>O Amante</option>
                </select>
            </div>

            <h4 className="form-section-title">Restrições (O &quot;NÃO&quot;)</h4>
            <div className="form-group">
                <textarea className="input-line" rows="3" placeholder="O que você DETESTA em logos?"></textarea>
            </div>
        </div>
    );

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="briefing-modal-container" onClick={e => e.stopPropagation()}>

                {/* Left Panel: Context */}
                <div className="briefing-left-panel">
                    <div>
                        <img src={product.image} alt={product.title} className="modal-product-image" style={{ objectFit: 'cover' }} />
                        <div className="mt-6">
                            <h2 className="modal-product-title">{product.title}</h2>
                            <span className="text-sm text-lime-400 font-bold tracking-widest uppercase">{product.category}</span>
                        </div>
                    </div>

                    <div className="specs-list">
                        <div className="spec-item">
                            <span>Estimativa (SLA)</span>
                            <span className="spec-value">{product.sla}</span>
                        </div>
                        <div className="spec-item">
                            <span>Formato Final</span>
                            <span className="spec-value">PNG / FIG</span>
                        </div>
                        <div className="spec-item">
                            <span>Revisões</span>
                            <span className="spec-value">Até 3 rodadas</span>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Engine */}
                <div className="briefing-right-panel">
                    <div className="briefing-header">
                        <div className="step-indicator">Nova Demanda • Passo 1 de 2</div>
                        <button onClick={onClose} className="text-gray-500 hover:text-white"><X size={20} /></button>
                    </div>

                    <div className="briefing-form-scroll">

                        {/* 1. Client Select */}
                        <div className="form-group mb-8">
                            <label className="input-label">Vincular Cliente</label>
                            <select
                                className="input-line bg-transparent"
                                value={selectedClient}
                                onChange={handleClientChange}
                            >
                                <option value="">Selecione...</option>
                                {CLIENTS.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                            </select>
                        </div>

                        {/* Smart Suggestion */}
                        {selectedClient && (
                            <div className="smart-suggestion-box fade-in">
                                <div className="flex items-center gap-3">
                                    <Wand2 size={18} className="text-lime-400" />
                                    <div className="suggestion-text">
                                        Seguir Guia da Marca de <strong>{selectedClient}</strong>?
                                    </div>
                                </div>
                                {/* Simple Toggle Switch Mockup */}
                                <div
                                    className={`w-10 h-5 rounded-full flex items-center p-1 cursor-pointer transition-colors ${useBrandGuide ? 'bg-lime-400' : 'bg-gray-600'}`}
                                    onClick={() => setUseBrandGuide(!useBrandGuide)}
                                >
                                    <div className={`w-3 h-3 bg-black rounded-full shadow-md transform transition-transform ${useBrandGuide ? 'translate-x-5' : ''}`}></div>
                                </div>
                            </div>
                        )}

                        {/* Dynamic Product Form */}
                        {product.type === 'social' && renderSocialForm()}
                        {product.type === 'lp' && renderLPForm()}
                        {product.type === 'branding' && renderBrandingForm()}
                        {product.type === 'print' && <div className="text-gray-500 text-sm">Formulário de impressos genérico...</div>}

                    </div>

                    <div className="briefing-footer">
                        <button className="btn-cancel" onClick={onClose}>CANCELAR</button>
                        <button className="btn-save">ENVIAR PARA FILA</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BriefingModal;
