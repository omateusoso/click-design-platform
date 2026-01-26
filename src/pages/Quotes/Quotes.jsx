import React from 'react';
import { Plus } from 'lucide-react';
import './Quotes.css';

import { useNavigate } from 'react-router-dom';

const Quotes = () => {
    const navigate = useNavigate();
    // Mock Data for "The Board"
    const quotes = [
        {
            id: 'CLK-2026-084',
            client: { name: 'Nubank', avatar: 'Nu' },
            scope: 'Pack Social Media + Reels Cover (Mensal)',
            value: 'R$ 12.500,00',
            expiry: 'Expira em 3 dias',
            owner: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
            status: 'VIEWED',
            isUrgent: false
        },
        {
            id: 'CLK-2026-083',
            client: { name: 'Farm Rio', avatar: 'Fa' },
            scope: 'Campanha Verão 26 - Identidade + Landing Page',
            value: 'R$ 45.000,00',
            expiry: 'Expira HOJE',
            owner: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
            status: 'SENT',
            isUrgent: true
        },
        {
            id: 'CLK-2026-082',
            client: { name: 'Dengo Choco', avatar: 'De' },
            scope: 'Embalagem Edição Páscoa',
            value: 'R$ 8.200,00',
            expiry: 'Expira em 10 dias',
            owner: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
            status: 'DRAFT',
            isUrgent: false
        },
        {
            id: 'CLK-2026-080',
            client: { name: 'Spotify', avatar: 'Sp' },
            scope: 'Assets para App - Q1',
            value: 'R$ 120.000,00',
            expiry: '-',
            owner: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
            status: 'APPROVED',
            isUrgent: false
        },
        {
            id: 'CLK-2026-079',
            client: { name: 'Tesla', avatar: 'Te' },
            scope: 'Brochura Digital Cybertruck Brasil',
            value: 'R$ 15.000,00',
            expiry: 'Expirado',
            owner: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
            status: 'DECLINED',
            isUrgent: false
        }
    ];

    const getStatusClass = (status) => {
        switch (status) {
            case 'DRAFT': return 'status-pill draft';
            case 'SENT': return 'status-pill sent';
            case 'VIEWED': return 'status-pill viewed';
            case 'APPROVED': return 'status-pill approved';
            case 'DECLINED': return 'status-pill declined';
            default: return 'status-pill';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'DRAFT': return 'RASCUNHO';
            case 'SENT': return 'ENVIADO';
            case 'VIEWED': return 'VISUALIZADO';
            case 'APPROVED': return 'APROVADO';
            case 'DECLINED': return 'DECLINADO';
            default: return status;
        }
    };

    return (
        <div className="page-container fade-in">
            {/* Header */}
            <div className="page-header">
                <div className="header-title">
                    <h1>ORÇAMENTOS</h1>
                </div>

                <button className="btn-new-quote" onClick={() => navigate('/quotes/new')}>
                    <Plus size={18} /> NOVO ORÇAMENTO
                </button>
            </div>

            {/* The Board - Quotes List */}
            <div className="quotes-list">
                {quotes.map(quote => (
                    <div key={quote.id} className="quote-strip">
                        {/* ID */}
                        <div className="col-id">#{quote.id.split('-')[2]}</div>

                        {/* Client */}
                        <div className="col-client">
                            <div className="client-avatar-mini">{quote.client.avatar}</div>
                            <span className="client-name">{quote.client.name}</span>
                        </div>

                        {/* Scope */}
                        <div className="col-scope" title={quote.scope}>{quote.scope}</div>

                        {/* Value */}
                        <div className="col-value">{quote.value}</div>

                        {/* Expiry */}
                        <div className={`col-expiry ${quote.isUrgent ? 'urgent' : ''}`}>
                            {quote.expiry}
                        </div>

                        {/* Owner */}
                        <div className="col-owner">
                            <img src={quote.owner} alt="Owner" className="owner-avatar" />
                        </div>

                        {/* Status */}
                        <div className="col-status">
                            <span className={getStatusClass(quote.status)}>
                                {getStatusLabel(quote.status)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Sticky Metrics Deck */}
            <div className="metrics-deck">
                <div className="metric-item">
                    <span className="metric-label">Taxa de Conversão</span>
                    <span className="metric-value highlight">
                        <span className="conversion-circle"></span> 68%
                    </span>
                </div>

                <div className="metric-item">
                    <span className="metric-label">Pipeline Aberto</span>
                    <span className="metric-value">R$ 65.700,00</span>
                </div>

                <div className="metric-item">
                    <span className="metric-label">Fechado (Mês)</span>
                    <span className="metric-value">R$ 120.000,00</span>
                </div>

                <div className="metric-item">
                    <span className="metric-label">Perdidos</span>
                    <span className="metric-value" style={{ color: 'var(--text-muted)' }}>3</span>
                </div>
            </div>

        </div>
    );
};

export default Quotes;
