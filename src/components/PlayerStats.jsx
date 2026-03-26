import React, { useState, useEffect } from 'react';
import { Goal, Handshake } from 'lucide-react'; 
import { getScorers } from '../services/api';

export default function PlayerStats({ league }) {
  const [activeTab, setActiveTab] = useState('scorers');
  const [scorers, setScorers] = useState([]);
  const [assists, setAssists] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    let ignore = false; 

    const fetchStats = async () => {
      
      const res = await getScorers(league);
      
      if (!ignore) {
        if (res && res.length > 0) {
          const formattedData = res.map(item => ({
            id: item.player.id,
            name: item.player.name,
            team: item.team?.name || 'Desconhecido',
            crest: item.team?.crest || '',
            goals: item.goals || 0,
            assists: item.assists || 0
          }));

          const topScorers = [...formattedData].sort((a, b) => b.goals - a.goals).slice(0, 5);
          const topAssists = [...formattedData].sort((a, b) => b.assists - a.assists).slice(0, 5);

          setScorers(topScorers);
          setAssists(topAssists);
        } else {
          setScorers([]);
          setAssists([]);
        }
        setLoading(false);
      }
    };

    fetchStats();

    return () => { ignore = true; };
  }, [league]);

  const dataToDisplay = activeTab === 'scorers' ? scorers : assists;

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
        {loading ? (
           <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>Carregando...</div>
        ) : dataToDisplay.length === 0 ? (
           <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>Sem dados no momento.</div>
        ) : (
          dataToDisplay.map((player, index) => (
            <div key={player.id} style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f5f5f5' }}>
              
              <span style={{ width: '30px', fontWeight: 'bold', color: index < 3 ? '#333' : '#aaa', fontSize: '14px' }}>
                {index + 1}º
              </span>
              
              {player.crest ? (
                <img src={player.crest} alt={player.team} style={{ width: '28px', height: '28px', marginRight: '12px', objectFit: 'contain' }} />
              ) : (
                <div style={{ width: '28px', height: '28px', marginRight: '12px', backgroundColor: '#eee', borderRadius: '50%' }}></div>
              )}
              
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', fontSize: '14px', color: '#333' }}>{player.name}</div>
                <div style={{ fontSize: '12px', color: '#888' }}>{player.team}</div>
              </div>
              
              <div style={{ fontWeight: '900', fontSize: '18px', color: 'var(--ge-green, #06aa48)', backgroundColor: '#f0fdf4', padding: '4px 10px', borderRadius: '6px' }}>
                {activeTab === 'scorers' ? player.goals : player.assists}
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}