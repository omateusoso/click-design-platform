import React, { useState } from 'react';
import { Plus, Folder, MessageCircle, Edit2, Infinity, Circle } from 'lucide-react';
import './Clients.css';
import ClientModal from './ClientModal';

const Clients = () => {
    const [selectedClient, setSelectedClient] = useState(null);
    const [filter, setFilter] = useState('Todos');

    // 🇧🇷 & 🌎 High Fidelity Client Data
    const clients = [
        {
            id: 1, name: 'Nubank', segment: 'Fintech / Banco Digital', initial: 'Nu', logo: 'https://logo.clearbit.com/nubank.com.br', type: 'retainer', status: 'Ativo',
            legalName: 'Nu Pagamentos S.A.', cnpj: '18.236.120/0001-58', email: 'financeiro@nubank.com.br', phone: '',
            brandVoice: ['Jovem', 'Disruptivo', 'Humano'], colors: ['#820AD1', '#FFFFFF'], assetsLink: 'drive.google.com/nu-brand-2026',
            contacts: { daily: 'Camila (Social Media)', approver: 'Cristina (Head de Brand)' },
            obs: 'Proibido usar imagens de banco de imagem com pessoas de terno. O tone de voz nunca pode ser corporativo ou frio.'
        },
        {
            id: 2, name: 'Farm Rio', segment: 'Moda / Varejo', initial: 'Fa', logo: 'https://logo.clearbit.com/farmrio.com.br', type: 'job', status: 'Ativo',
            legalName: 'Farm Rio Moda Ltda', cnpj: '00.000.000/0001-00', email: 'fin@farmrio.com.br', phone: '',
            brandVoice: ['Colorido', 'Tropical', 'Estampado'], colors: ['#E84E1B', '#F2C94C'], assetsLink: 'dropbox.com/farm-prints-hi-res',
            contacts: { daily: 'Lucas (Mkt)', approver: 'Kátia (Diretora Criativa)' },
            obs: 'As estampas não podem ter a opacidade reduzida. O recorte das modelos precisa ser perfeito (cabelo).'
        },
        {
            id: 3, name: 'Havaianas', segment: 'Calçados / Lifestyle', initial: 'Ha', logo: 'https://logo.clearbit.com/havaianas.com.br', type: 'retainer', status: 'Ativo',
            legalName: 'Alpargatas S.A.', cnpj: '00.000.000/01-00', email: 'pagamentos@alpargatas.com', phone: '',
            brandVoice: ['Brasileiro', 'Divertido', 'Universal'], colors: ['#E3000F', '#FFD700'], assetsLink: 'assets.alpargatas.com/havaianas',
            contacts: { daily: 'Mariana (Trade Mkt)', approver: 'Roberto (Gerente Global)' },
            obs: "Em materiais internacionais, reforçar o 'Original from Brazil'. Não distorcer a textura de arroz do solado."
        },
        {
            id: 4, name: 'Dengo Choc.', segment: 'Alimentação Premium', initial: 'De', logo: 'https://logo.clearbit.com/dengo.com', type: 'job', status: 'Ativo',
            legalName: 'Dengo Chocolates S.A.', cnpj: '', email: 'fin@dengo.com', phone: '',
            brandVoice: ['Sustentável', 'Sofisticado', 'Afetivo'], colors: ['#4A2C2A', '#D4AF37'], assetsLink: 'drive.google.com/dengo-pack',
            contacts: { daily: 'Sofia (Produto)', approver: 'Estevan (CEO)' },
            obs: "Foco total na fotografia do ingrediente. Usar tipografia serifada para títulos. Evitar visual 'industrial'."
        },
        {
            id: 5, name: 'TAG Livros', segment: 'Clube de Assinatura', initial: 'TG', logo: 'https://logo.clearbit.com/taglivros.com', type: 'retainer', status: 'Ativo',
            legalName: 'TAG Comércio de Livros Ltda', cnpj: '', email: 'financeiro@taglivros.com.br', phone: '',
            brandVoice: ['Intelectual', 'Curioso', 'Comunitário'], colors: ['#1D3557', '#F1FAEE'], assetsLink: 'drive.google.com/tag-curadoria',
            contacts: { daily: 'Pedro (Community Mgr)', approver: 'Rafaela (Edição)' },
            obs: "Cuidado com o spoiler nos materiais visuais dos livros do mês. A experiência de unboxing é o foco."
        },
        {
            id: 6, name: 'Spotify', segment: 'Tech / Streaming', initial: 'Sp', logo: 'https://logo.clearbit.com/spotify.com', type: 'retainer', status: 'Ativo',
            legalName: 'Spotify Brasil', cnpj: '', email: 'invoice@spotify.com', phone: '',
            brandVoice: ['Bold', 'Dinâmico', 'Disruptivo'], colors: ['#1DB954', '#191414'], assetsLink: 'spotify.design/assets',
            contacts: { daily: 'John (Growth)', approver: 'Sarah (Lead Designer)' },
            obs: "Usar sempre o Duotone oficial nas fotos de artistas. O círculo do logo não pode ser preenchido, apenas vazado ou sólido."
        },
        {
            id: 7, name: 'Red Bull', segment: 'Bebidas / Esportes', initial: 'RB', logo: 'https://logo.clearbit.com/redbull.com', type: 'job', status: 'Ativo',
            legalName: 'Red Bull do Brasil', cnpj: '', email: 'finance@redbull.com.br', phone: '',
            brandVoice: ['Energético', 'Extremo', 'Cartum'], colors: ['#DB0A40', '#FFCC00'], assetsLink: 'redbullcontentpool.com',
            contacts: { daily: 'Mike (Events)', approver: 'Dietrich (Brand Guardian)' },
            obs: "O touro nunca pode estar 'olhando para trás'. Ilustrações devem seguir estritamente o traço 'Weldon'."
        },
        {
            id: 8, name: 'Airbnb', segment: 'Viagem / Hospitalidade', initial: 'Ab', logo: 'https://logo.clearbit.com/airbnb.com', type: 'retainer', status: 'Inativo', // Lead
            legalName: 'Airbnb Plataforma', cnpj: '', email: 'host@airbnb.com', phone: '',
            brandVoice: ['Acolhedor', 'Inclusivo', 'Clean'], colors: ['#FF5A5F', '#00A699'], assetsLink: 'airbnb.design/kits',
            contacts: { daily: '-', approver: 'Brian (VP Design)' },
            obs: "Foco em fotografia real de casas, evitar grandes angulares que distorcem o ambiente. Tipografia sempre Cereal (proprietária)."
        },
        {
            id: 9, name: 'Aesop', segment: 'Cosméticos / Luxo', initial: 'Ae', logo: 'https://logo.clearbit.com/aesop.com', type: 'job', status: 'Ativo',
            legalName: 'Aesop Brasil', cnpj: '', email: 'retail@aesop.com', phone: '',
            brandVoice: ['Minimalista', 'Literário', 'Silencioso'], colors: ['#FFFEF2', '#000000'], assetsLink: 'aesop.com/brand-library',
            contacts: { daily: 'Claire (Retail Design)', approver: 'Thomas (Architect)' },
            obs: "Nunca usar cores saturadas. Grid rígido. Texto justificado ou alinhado à esquerda com perfeição. O espaço em branco é luxo."
        },
        {
            id: 10, name: 'Tesla', segment: 'Automotivo / Tech', initial: 'Te', logo: 'https://logo.clearbit.com/tesla.com', type: 'retainer', status: 'Ativo',
            legalName: 'Tesla Motors', cnpj: '', email: 'finance@tesla.com', phone: '',
            brandVoice: ['Futurista', 'Minimal', 'Sério'], colors: ['#E82127', '#F2F2F2'], assetsLink: 'tesla.com/presskit',
            contacts: { daily: 'Elon (Bot)', approver: 'Javier (Product Lead)' },
            obs: "Zero ruído visual. O produto é o herói. Interfaces devem parecer ficção científica. Evitar termos como 'carro', usar 'veículo' ou 'máquina'."
        }
    ];

    const handleClientClick = (client) => {
        setSelectedClient(client);
    };

    const handleCloseModal = () => {
        setSelectedClient(null);
    };

    return (
        <div className="page-container fade-in">
            {/* Header */}
            <div className="page-header">
                <div className="header-title">
                    <h1>CLIENTES</h1>
                </div>

                <div className="header-actions">
                    <div className="filter-pills">
                        {['Todos', 'Ativos', 'Leads', 'Inativos'].map(f => (
                            <button
                                key={f}
                                className={`filter-pill ${filter === f ? 'active' : ''}`}
                                onClick={() => setFilter(f)}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    <button className="btn-new-client" onClick={() => setSelectedClient({})}>
                        <Plus size={18} /> NOVO CLIENTE
                    </button>
                </div>
            </div>

            {/* List View */}
            <div className="clients-list">
                {clients.map(client => (
                    <div key={client.id} className="client-row-card" onClick={() => handleClientClick(client)}>

                        {/* Identity */}
                        <div className="client-identity">
                            <div className="client-avatar" style={{ borderColor: client.colors ? client.colors[0] : 'var(--glass-border)', overflow: 'hidden' }}>
                                {client.logo ? (
                                    <img src={client.logo} alt={client.name} style={{ width: '100%', height: '100%', objectFit: 'contain', background: 'white' }} />
                                ) : (
                                    client.initial
                                )}
                            </div>
                            <div className="client-info">
                                <span className="client-name">{client.name}</span>
                            </div>
                        </div>

                        {/* Segment */}
                        <div className="client-segment">
                            {client.segment}
                        </div>

                        {/* Status Type */}
                        <div className="client-status-icon">
                            {client.type === 'retainer' ? (
                                <div className="status-indicator" title="Mensalista">
                                    <Infinity size={18} color="var(--primary-neon)" />
                                </div>
                            ) : (
                                <div className="status-indicator" title="Pontual">
                                    <Circle size={14} fill="white" color="none" />
                                </div>
                            )}
                            <span>{client.type === 'retainer' ? 'Mensalista' : 'Job Pontual'}</span>
                        </div>

                        {/* Quick Actions */}
                        <div className="client-actions">
                            <button className="action-icon-btn" title="Assets">
                                <Folder size={18} />
                            </button>
                            <button className="action-icon-btn" title="WhatsApp">
                                <MessageCircle size={18} />
                            </button>
                            <button className="action-icon-btn" title="Editar">
                                <Edit2 size={18} />
                            </button>
                        </div>

                    </div>
                ))}
            </div>

            {/* Master Modal */}
            <ClientModal isOpen={!!selectedClient} onClose={handleCloseModal} client={selectedClient} />
        </div>
    );
};

export default Clients;
