import React, { useState } from 'react';
import { ArrowLeft, Plus, Trash2, Save, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './ProposalBuilder.css';

const ProposalBuilder = () => {
    const navigate = useNavigate();

    // State for the proposal
    const [client, setClient] = useState('Nubank');
    const [items, setItems] = useState([
        { id: 1, desc: 'Gestão de Social Media (Mensal)', price: 4500 }
    ]);
    const [discount, setDiscount] = useState(0);
    const [isSendModalOpen, setIsSendModalOpen] = useState(false);

    // Mock Data
    const combos = [
        { name: 'Combo Startup', items: [{ desc: 'Identidade Visual Completa', price: 2500 }, { desc: 'Landing Page One Page', price: 1800 }] },
        { name: 'Fee Mensal Padrão', items: [{ desc: 'Gestão de Social Media (12 posts)', price: 3000 }, { desc: 'Relatório de Performance', price: 500 }] }
    ];

    const addItem = () => {
        setItems([...items, { id: Date.now(), desc: 'Novo Item (Editar)', price: 0 }]);
    };

    const removeItem = (id) => {
        setItems(items.filter(i => i.id !== id));
    };

    const applyCombo = (combo) => {
        // Replace or append? Let's append for now, or clear and set.
        // Let's Append to be safe, giving unique IDs
        const newItems = combo.items.map(i => ({ ...i, id: Date.now() + Math.random() }));
        setItems([...items, ...newItems]);
    };

    const updateItem = (id, field, value) => {
        setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));
    };

    // Calculations
    const subtotal = items.reduce((acc, i) => acc + Number(i.price), 0);
    const total = subtotal - discount;

    return (
        <div className="page-container fade-in" style={{ height: '100vh', overflow: 'hidden' }}>
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <button onClick={() => navigate('/quotes')} className="text-gray-400 hover:text-white">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-2xl font-light text-white">NOVA PROPOSTA</h1>
            </div>

            <div className="builder-container">

                {/* LEFT - INPUTS */}
                <div className="builder-inputs">

                    {/* Client & Info */}
                    <div className="input-section">
                        <div className="section-title">Dados do Projeto</div>
                        <div className="form-group mb-4">
                            <label className="input-label">Cliente</label>
                            <select
                                className="input-line bg-transparent"
                                value={client}
                                onChange={(e) => setClient(e.target.value)}
                            >
                                <option value="Nubank">Nubank</option>
                                <option value="Farm Rio">Farm Rio</option>
                                <option value="Spotify">Spotify</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="input-label">Validade</label>
                            <input type="text" className="input-line" defaultValue="15 dias (Padrão)" />
                        </div>
                    </div>

                    {/* Items & Combos */}
                    <div className="input-section">
                        <div className="flex justify-between items-center mb-4">
                            <div className="section-title mb-0">Itens do Escopo</div>
                            <button className="text-xs text-lime-400 font-bold uppercase" onClick={addItem}>+ Adicionar</button>
                        </div>

                        {/* Combos */}
                        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                            {combos.map((combo, idx) => (
                                <button key={idx} className="combo-card whitespace-nowrap" onClick={() => applyCombo(combo)}>
                                    <span className="text-xs font-bold">{combo.name}</span>
                                </button>
                            ))}
                        </div>

                        {/* List */}
                        <div className="flex flex-col gap-3">
                            {items.map(item => (
                                <div key={item.id} className="flex gap-2 items-center">
                                    <input
                                        type="text"
                                        className="input-line text-sm"
                                        value={item.desc}
                                        onChange={(e) => updateItem(item.id, 'desc', e.target.value)}
                                    />
                                    <input
                                        type="number"
                                        className="input-line text-sm w-24 text-right"
                                        value={item.price}
                                        onChange={(e) => updateItem(item.id, 'price', e.target.value)}
                                    />
                                    <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-400">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Financials */}
                    <div className="input-section">
                        <div className="section-title">Financeiro</div>
                        <div className="financial-row">
                            <span className="text-sm text-gray-400">Subtotal</span>
                            <span className="text-sm text-white">R$ {subtotal.toFixed(2)}</span>
                        </div>
                        <div className="financial-row">
                            <span className="text-sm text-gray-400">Desconto (R$)</span>
                            <input
                                type="number"
                                className="financial-input"
                                value={discount}
                                onChange={(e) => setDiscount(Number(e.target.value))}
                            />
                        </div>
                        <div className="financial-row border-t border-white/20 pt-4 mt-2">
                            <span className="text-lg font-bold text-white">TOTAL</span>
                            <span className="text-lg font-bold text-lime-400">R$ {total.toFixed(2)}</span>
                        </div>
                    </div>

                </div>

                {/* RIGHT - PREVIEW */}
                <div className="builder-preview">

                    {/* A4 Paper */}
                    <div className="a4-paper">
                        <div>
                            <div className="pdf-header">
                                <div className="pdf-title">PROPOSTA COMERCIAL</div>
                                <div className="pdf-meta">
                                    <div>DATA: 26/01/2026</div>
                                    <div>VALIDADE: 15 DIAS</div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <div className="text-xs text-gray-500 uppercase mb-1">Para:</div>
                                <div className="font-bold text-lg">{client}</div>
                            </div>

                            <table className="pdf-table">
                                <thead>
                                    <tr>
                                        <th>Descrição</th>
                                        <th style={{ textAlign: 'right' }}>Valor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.desc}</td>
                                            <td style={{ textAlign: 'right' }}>R$ {Number(item.price).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="pdf-total-block">
                            <div className="pdf-total-row">
                                <span>Subtotal:</span>
                                <span>R$ {subtotal.toFixed(2)}</span>
                            </div>
                            <div className="pdf-total-row">
                                <span>Descontos:</span>
                                <span>- R$ {discount.toFixed(2)}</span>
                            </div>
                            <div className="pdf-total-row" style={{ marginTop: '16px' }}>
                                <span style={{ fontWeight: 800 }}>TOTAL:</span>
                                <span className="pdf-final-total">R$ {total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Floating Actions */}
                    <div className="builder-actions">
                        <button className="btn-cancel bg-black/50 backdrop-blur">
                            <Save size={18} /> SALVAR RASCUNHO
                        </button>
                        <button className="btn-new-quote" onClick={() => setIsSendModalOpen(true)}>
                            <Send size={18} /> ENVIAR PROPOSTA
                        </button>
                    </div>

                </div>

            </div>

            {/* SEND MODAL */}
            {isSendModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center fade-in">
                    <div className="bg-[#111] border border-white/10 rounded-xl p-8 w-[500px] shadow-2xl">
                        <h2 className="text-xl font-light text-white mb-6 flex items-center gap-2">
                            <Send size={20} className="text-lime-400" /> Enviar Proposta
                        </h2>

                        <div className="flex flex-col gap-4 mb-6">
                            <div>
                                <label className="text-xs text-gray-500 uppercase mb-1 block">Destinatário</label>
                                <input type="email" className="w-full bg-white/5 border border-white/10 rounded p-3 text-sm text-white" value="financeiro@nubank.com.br" readOnly />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 uppercase mb-1 block">Assunto</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded p-3 text-sm text-white" defaultValue={`Proposta Comercial - ${items[0]?.desc || 'Projeto'}`} />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 uppercase mb-1 block">Mensagem</label>
                                <textarea className="w-full bg-white/5 border border-white/10 rounded p-3 text-sm text-white h-32" defaultValue={`Olá,\n\nSegue conforme conversamos a proposta comercial para o projeto.\n\nAguardamos seu retorno!\n\nAtt,\nEquipe Click Design`} />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button className="px-4 py-2 text-sm text-gray-400 hover:text-white" onClick={() => setIsSendModalOpen(false)}>Cancelar</button>
                            <button className="px-6 py-2 bg-lime-400 text-black font-bold rounded hover:bg-lime-300 transition-colors" onClick={() => {
                                alert('Proposta enviada com sucesso! Link de rastreamento gerado.');
                                navigate('/quotes');
                            }}>
                                ENVIAR AGORA
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ProposalBuilder;
