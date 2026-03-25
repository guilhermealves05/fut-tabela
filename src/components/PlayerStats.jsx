import React, { useState } from 'react';
import { Goal, Handshake } from 'lucide-react'; 

const mockScorers = [
  { id: 1, name: 'Pedro', team: 'Flamengo', crest: 'https://crests.football-data.org/764.png', goals: 15 },
  { id: 2, name: 'Endrick', team: 'Palmeiras', crest: 'https://crests.football-data.org/1783.png', goals: 11 },
  { id: 3, name: 'Hulk', team: 'Atlético-MG', crest: 'https://crests.football-data.org/1766.png', goals: 10 },
  { id: 4, name: 'Cano', team: 'Fluminense', crest: 'https://crests.football-data.org/1765.png', goals: 9 },
  { id: 5, name: 'Vegetti', team: 'Vasco', crest: 'https://crests.football-data.org/1780.png', goals: 9 },
];

const mockAssists = [
  { id: 101, name: 'Arrascaeta', team: 'Flamengo', crest: 'https://crests.football-data.org/764.png', assists: 9 },
  { id: 102, name: 'Raphael Veiga', team: 'Palmeiras', crest: 'https://crests.football-data.org/1783.png', assists: 8 },
  { id: 103, name: 'Ganso', team: 'Fluminense', crest: 'https://crests.football-data.org/1765.png', assists: 7 },
  { id: 104, name: 'Alan Patrick', team: 'Internacional', crest: 'https://crests.football-data.org/1770.png', assists: 6 },
  { id: 105, name: 'Lucas Moura', team: 'São Paulo', crest: 'https://crests.football-data.org/1771.png', assists: 5 },
];

export default function PlayerStats() {
 
  const [activeTab, setActiveTab] = useState('scorers');

  return (
    <div className="fut-card" style={{ marginTop: '20px' }}>
      
      <div style={{ display: 'flex', borderBottom: '2px solid #eee', marginBottom: '15px' }}>
        <button
          onClick={() => setActiveTab('scorers')}
          style={{
            flex: 1, padding: '10px', background: 'none', border: 'none', cursor: 'pointer',
            fontWeight: 'bold', color: activeTab === 'scorers' ? 'var(--ge-green, #06aa48)' : '#999',
            borderBottom: activeTab === 'scorers' ? '3px solid var(--ge-green, #06aa48)' : 'none',
            marginBottom: '-2px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            transition: 'all 0.2s'
          }}
        >
          <Goal size={18} /> Artilheiros
        </button>
        
        <button
          onClick={() => setActiveTab('assists')}
          style={{
            flex: 1, padding: '10px', background: 'none', border: 'none', cursor: 'pointer',
            fontWeight: 'bold', color: activeTab === 'assists' ? 'var(--ge-green, #06aa48)' : '#999',
            borderBottom: activeTab === 'assists' ? '3px solid var(--ge-green, #06aa48)' : 'none',
            marginBottom: '-2px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            transition: 'all 0.2s'
          }}
        >
          <Handshake size={18} /> Assistências
        </button>
      </div>

      <div className="stats-list">
        {(activeTab === 'scorers' ? mockScorers : mockAssists).map((player, index) => (
          <div key={player.id} style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f5f5f5' }}>
            
            <span style={{ width: '30px', fontWeight: 'bold', color: index < 3 ? '#333' : '#aaa', fontSize: '14px' }}>
              {index + 1}º
            </span>
            
            <img src={player.crest} alt={player.team} style={{ width: '28px', height: '28px', marginRight: '12px', objectFit: 'contain' }} />
            
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '600', fontSize: '14px', color: '#333' }}>{player.name}</div>
              <div style={{ fontSize: '12px', color: '#888' }}>{player.team}</div>
            </div>
            
            <div style={{ fontWeight: '900', fontSize: '18px', color: 'var(--ge-green, #06aa48)', backgroundColor: '#f0fdf4', padding: '4px 10px', borderRadius: '6px' }}>
              {activeTab === 'scorers' ? player.goals : player.assists}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}