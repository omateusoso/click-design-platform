import React, { useState, useEffect } from 'react';
import { X, Cloud, Hash } from 'lucide-react';
import './ClientModal.css';

const ClientModal = ({ isOpen, onClose, client }) => {
    const [activeTab, setActiveTab] = useState('corporate');
    const [formData, setFormData] = useState({
        name: '',
        legalName: '',
        cnpj: '',
        email: '',
        phone: '',
        assetsLink: '',
        brandTags: [],
        colors: ['#000000', '#89F336', '#FFFFFF'],
        contactDaily: '',
        contactApprover: '',
        obs: ''
    });

    // Load client data when modal opens or client changes
    useEffect(() => {
        if (client) {
            setFormData({
                name: client.name || '',
                legalName: client.legalName || '',
                cnpj: client.cnpj || '',
                email: client.email || '',
                phone: client.phone || '',
                assetsLink: client.assetsLink || '',
                brandTags: client.brandVoice || [],
                colors: client.colors || ['#000000', '#89F336', '#FFFFFF'],
                contactDaily: client.contacts?.daily || '',
                contactApprover: client.contacts?.approver || '',
                obs: client.obs || ''
            });
        } else {
            // Reset for new client
            setFormData({
                name: '',
                legalName: '',
                cnpj: '',
                email: '',
                phone: '',
                assetsLink: '',
                brandTags: ['Minimalista'],
                colors: ['#000000', '#89F336', '#FFFFFF'],
                contactDaily: '',
                contactApprover: '',
                obs: ''
            });
        }
    }, [client, isOpen]);

    if (!isOpen) return null;

    const toggleTag = (tag) => {
        const currentTags = formData.brandTags;
        if (currentTags.includes(tag)) {
            setFormData({ ...formData, brandTags: currentTags.filter(t => t !== tag) });
        } else {
            setFormData({ ...formData, brandTags: [...currentTags, tag] });
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={e => e.stopPropagation()}>

                {/* Header / Tabs */}
                <div className="modal-header">
                    <div className="modal-tabs">
                        <button
                            className={`tab-btn ${activeTab === 'corporate' ? 'active' : ''}`}
                            onClick={() => setActiveTab('corporate')}
                        >
                            DADOS VITAIS
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'design' ? 'active' : ''}`}
                            onClick={() => setActiveTab('design')}
                        >
                            DESIGN INTELLIGENCE
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'deciders' ? 'active' : ''}`}
                            onClick={() => setActiveTab('deciders')}
                        >
                            DECISORES
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="modal-body">

                    {/* Tab 1: Corporate */}
                    {activeTab === 'corporate' && (
                        <div className="form-grid fade-in">
                            <div className="form-group col-span-2">
                                <label className="input-label">Nome Fantasia</label>
                                <input
                                    type="text"
                                    className="input-line"
                                    placeholder="Ex: Click Design"
                                    value={formData.name}
                                    readOnly
                                />
                            </div>

                            <div className="form-group">
                                <label className="input-label">Razão Social</label>
                                <input type="text" className="input-line" placeholder="Razão Social Ltda" value={formData.legalName} readOnly />
                            </div>

                            <div className="form-group">
                                <label className="input-label">CNPJ</label>
                                <input type="text" className="input-line" placeholder="00.000.000/0001-00" value={formData.cnpj} readOnly />
                            </div>

                            <div className="form-group">
                                <label className="input-label">E-mail Financeiro</label>
                                <input type="email" className="input-line" placeholder="financeiro@empresa.com" value={formData.email} readOnly />
                            </div>

                            <div className="form-group">
                                <label className="input-label">WhatsApp Principal</label>
                                <input type="text" className="input-line" placeholder="(11) 99999-9999" value={formData.phone} readOnly />
                            </div>
                        </div>
                    )}

                    {/* Tab 2: Design Intel */}
                    {activeTab === 'design' && (
                        <div className="form-grid fade-in">
                            <div className="form-group col-span-2">
                                <label className="input-label">Link da Pasta de Assets (Drive/Dropbox)</label>
                                <div style={{ position: 'relative' }}>
                                    <Cloud size={16} style={{ position: 'absolute', left: 0, top: '12px', color: 'var(--text-muted)' }} />
                                    <input
                                        type="text"
                                        className="input-line"
                                        style={{ paddingLeft: '24px', color: 'var(--primary-neon)' }}
                                        placeholder="https://drive.google.com/..."
                                        value={formData.assetsLink}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="form-group col-span-2">
                                <label className="input-label mb-2">Brand Voice Tags</label>
                                <div className="brand-tags">
                                    {['Minimalista', 'Colorido', 'Sério', 'Jovem', 'Institucional', 'Luxo', 'Varejo', 'Disruptivo', 'Humano', 'Tropical', 'Brasileiro', 'Divertido', 'Sustentável', 'Afetivo', 'Intelectual', 'Bold', 'Futurista'].map(tag => (
                                        <button
                                            key={tag}
                                            className={`brand-tag-select ${formData.brandTags.includes(tag) ? 'selected' : ''}`}
                                        // onClick={() => toggleTag(tag)} // Read-only for now
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group col-span-2">
                                <label className="input-label mb-2">Cores Principais</label>
                                <div className="color-circles">
                                    {formData.colors.map((color, idx) => (
                                        <div key={idx} className="color-circle-input" style={{ borderColor: color }}>
                                            <input type="color" value={color} readOnly />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tab 3: Decisores */}
                    {activeTab === 'deciders' && (
                        <div className="form-grid fade-in">
                            <div className="form-group">
                                <label className="input-label">Contato Diário</label>
                                <input type="text" className="input-line" placeholder="Ex: Gerente de Mkt" value={formData.contactDaily} readOnly />
                            </div>

                            <div className="form-group">
                                <label className="input-label">Aprovador Final</label>
                                <input type="text" className="input-line" placeholder="Ex: CEO / Dono" value={formData.contactApprover} readOnly />
                            </div>

                            <div className="form-group col-span-2">
                                <label className="input-label" style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>OBS. CRÍTICA (ATENÇÃO)</label>
                                <textarea
                                    className="input-line"
                                    rows="3"
                                    placeholder="Ex: Não gosta de cor laranja. Sempre pede alteração na sexta."
                                    style={{ resize: 'none', borderBottom: '1px solid var(--primary-neon)', color: 'var(--text-main)' }}
                                    value={formData.obs}
                                    readOnly
                                ></textarea>
                            </div>
                        </div>
                    )}

                </div>

                {/* Footer */}
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={onClose}>FECHAR</button>
                    {/* <button className="btn-save">SALVAR CADASTRO</button> */}
                </div>

            </div>
        </div>
    );
};

export default ClientModal;
