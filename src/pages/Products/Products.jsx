import React, { useState } from 'react';
import { Clock, Plus, Play } from 'lucide-react';
import './Products.css';
import BriefingModal from './BriefingModal';

const Products = () => {
    const [filter, setFilter] = useState('TODOS');
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Filter Categories
    const filters = ['TODOS', 'SOCIAL MEDIA', 'BRANDING', 'WEB UI', 'IMPRESSOS'];

    // Products Data (With Unsplash Images)
    const products = [
        {
            id: 1,
            title: 'Carrossel Estratégico',
            category: 'SOCIAL MEDIA',
            sla: '4h',
            image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1000&auto=format&fit=crop', // Phone/Social
            accentColor: '#89F336', // Neon
            type: 'social'
        },
        {
            id: 2,
            title: 'Post Único / Reels Cover',
            category: 'SOCIAL MEDIA',
            sla: '2h',
            image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1000&auto=format&fit=crop', // Abstract Neon
            accentColor: '#FF0055',
            type: 'social'
        },
        {
            id: 3,
            title: 'Landing Page (One Page)',
            category: 'WEB UI',
            sla: '3d',
            image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1000&auto=format&fit=crop', // Dark Macbook
            accentColor: '#00D4FF',
            type: 'lp'
        },
        {
            id: 4,
            title: 'Identidade Visual (Logo)',
            category: 'BRANDING',
            sla: '7d',
            image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop', // Minimize Stationery
            accentColor: '#E84E1B',
            type: 'branding'
        },
        {
            id: 5,
            title: 'Apresentação Institucional',
            category: 'BRANDING',
            sla: '2d',
            image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop', // Office/Presentation
            accentColor: '#FFD700',
            type: 'branding'
        },
        {
            id: 6,
            title: 'Design de E-book/Whitepaper',
            category: 'IMPRESSOS', // Or Editorial
            sla: '3d',
            image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop', // Book
            accentColor: '#FFFFFF',
            type: 'print'
        }
    ];

    const filteredProducts = filter === 'TODOS'
        ? products
        : products.filter(p => p.category === filter);

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
    };

    return (
        <div className="page-container fade-in">
            {/* Header with Filters */}
            <div className="page-header">
                <div className="header-title">
                    <h1>PRODUTOS</h1>
                </div>

                <div className="filter-pills">
                    {filters.map(f => (
                        <button
                            key={f}
                            className={`filter-pill ${filter === f ? 'active' : ''}`}
                            onClick={() => setFilter(f)}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Gallery Grid */}
            <div className="products-grid">
                {filteredProducts.map(product => (
                    <div
                        key={product.id}
                        className="product-card"
                        onClick={() => handleProductSelect(product)}
                    >
                        {/* Image Area (Mockup) */}
                        <div className="product-image-area">
                            <img src={product.image} alt={product.title} className="product-image" />

                            {/* Hover Action */}
                            <div className="card-overlay-action">
                                <button className="btn-start-demand">
                                    <Plus size={14} /> INICIAR DEMANDA
                                </button>
                            </div>
                        </div>

                        {/* Footer Info */}
                        <div className="product-footer">
                            <h3 className="product-title">{product.title}</h3>
                            <div className="product-meta">
                                <div className="sla-badge">
                                    <Clock size={12} />
                                    <span>Estimativa: {product.sla}</span>
                                </div>
                                <span style={{ opacity: 0.5 }}>|</span>
                                <span style={{ color: product.accentColor, fontWeight: 500, fontSize: '10px', letterSpacing: '0.1em' }}>
                                    {product.category}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            <BriefingModal isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} product={selectedProduct} />
        </div>
    );
};

export default Products;
