import React, { useState } from 'react';
import { Plus, Search, Users } from 'lucide-react';
import TeamMemberPanel from './TeamMemberPanel';
import './Team.css';

// --- MOCK RPG DATA ---
const teamMembers = [
    {
        id: 1,
        name: 'Bia Silva',
        role: 'Designer Pleno',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
        status: 'online', // online, busy, away, offline
        load: 45, // 0-100
        skills: ['Ps', 'Ai', 'Figma'],
        currentTask: { client: 'Farm', title: 'Coleção Inverno: Stories' }
    },
    {
        id: 2,
        name: 'Felix Santos',
        role: 'Motion Designer',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
        status: 'busy',
        load: 92, // OVERLOAD
        skills: ['Ae', 'Pr', 'C4D'],
        currentTask: { client: 'Spotify', title: 'App Launch Animation' }
    },
    {
        id: 3,
        name: 'Jean Pierre',
        role: 'Art Director',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
        status: 'online',
        load: 60,
        skills: ['Direção', 'Branding'],
        currentTask: { client: 'Kamino', title: 'Rebrand Review' }
    },
    {
        id: 4,
        name: 'Carol Dias',
        role: 'Copywriter',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
        status: 'away',
        load: 20,
        skills: ['Copy', 'SEO', 'Notion'],
        currentTask: null
    },
    {
        id: 5,
        name: 'Thiago Dev',
        role: 'Full Stack',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
        status: 'offline',
        load: 0,
        skills: ['React', 'Node', 'SQL'],
        currentTask: null
    },
    {
        id: 6,
        name: 'Ana UX',
        role: 'Product Designer',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop',
        status: 'busy',
        load: 75,
        skills: ['Figma', 'Maze', 'Research'],
        currentTask: { client: 'Nubank', title: 'User Testing Flow' }
    }
];

const Team = () => {
    const [filter, setFilter] = useState('Todos');
    const [selectedMember, setSelectedMember] = useState(null);
    const [showOnlyOnline, setShowOnlyOnline] = useState(false);

    // Filtering Logic
    const filteredMembers = teamMembers.filter(m => {
        if (showOnlyOnline && (m.status === 'offline')) return false;
        // Mock Category Filter logic (simplified)
        if (filter === 'Designers' && !m.role.includes('Designer') && !m.role.includes('Art')) return false;
        if (filter === 'Dev' && !m.role.includes('Stack')) return false;
        return true;
    });

    const getLoadColor = (load) => {
        if (load > 90) return 'danger';
        if (load > 50) return 'warn';
        return 'safe';
    };

    return (
        <div className="page-container">
            {/* Header */}
            <div className="team-header">
                <div>
                    <h1 className="page-title mb-2">THE SQUAD</h1>
                    <p className="text-secondary">Hall of Fame da Agência</p>

                    <div className="team-filters">
                        {['Todos', 'Designers', 'Copywriters', 'Dev'].map(f => (
                            <button
                                key={f}
                                className={`t-filter-btn ${filter === f ? 'active' : ''}`}
                                onClick={() => setFilter(f)}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '16px' }}>
                    <button className="btn-new-quote">
                        <Users size={18} /> CONVIDAR MEMBRO
                    </button>

                    <div
                        className="availability-toggle"
                        onClick={() => setShowOnlyOnline(!showOnlyOnline)}
                    >
                        <span>Mostrar apenas Online</span>
                        <div className={`toggle-switch ${showOnlyOnline ? 'on' : ''}`}>
                            <div className="toggle-knob"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="team-grid">
                {filteredMembers.map(member => (
                    <div
                        key={member.id}
                        className="player-card"
                        onClick={() => setSelectedMember(member)}
                    >

                        <div className="player-avatar-container">
                            <img src={member.avatar} className="player-avatar" alt="av" />
                            <div className={`status-ring ${member.status}`}></div>
                        </div>

                        <h3 className="player-name">{member.name}</h3>
                        <div className="player-role">{member.role}</div>

                        <div className="load-bar-container">
                            <div className="load-info">
                                <span>Load</span>
                                <span style={{ color: member.load > 90 ? '#FF4444' : '#fff' }}>{member.load}%</span>
                            </div>
                            <div className="load-track">
                                <div
                                    className={`load-fill ${getLoadColor(member.load)}`}
                                    style={{ width: `${member.load}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="skill-tags">
                            {member.skills.map(skill => (
                                <span key={skill} className="skill-pill">{skill}</span>
                            ))}
                        </div>

                    </div>
                ))}
            </div>

            {/* Slide-over Panel */}
            {selectedMember && (
                <TeamMemberPanel member={selectedMember} onClose={() => setSelectedMember(null)} />
            )}

        </div>
    );
};

export default Team;
