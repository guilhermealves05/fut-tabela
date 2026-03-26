import React from 'react';
import { Star } from 'lucide-react';

export default function Table({ data, favorites, onToggleFavorite, onTeamClick }) {
  
  
  const getZoneColor = (pos) => {
    if (pos <= 4) return '#22c55e';
    if (pos <= 6) return '#3b82f6'; 
    if (pos >= 7 && pos <= 12) return '#f59e0b'; 
    if (data.length >= 20 && pos >= 17) return '#ef4444'; 
    if (data.length === 18 && pos >= 16) return '#ef4444'; 
    return 'transparent'; 
  };

return (
    <div className="table-container">
      <table className="ge-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>Pos</th>
            <th style={{ textAlign: 'left' }}>Equipe</th>
            <th style={{ textAlign: 'center' }}>Pts</th>
            <th style={{ textAlign: 'center' }}>J</th>
            <th style={{ textAlign: 'center' }}>V</th>
            <th style={{ textAlign: 'center' }}>E</th>
            <th style={{ textAlign: 'center' }}>D</th>
            <th style={{ textAlign: 'center' }}>GM</th>
            <th style={{ textAlign: 'center' }}>GS</th>
            <th style={{ textAlign: 'center' }}>SG</th>
            <th style={{ textAlign: 'center' }}>Fav</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            const pos = item.position;
            const corZona = getZoneColor(pos);

            return (
              <tr key={item.team.id}>
                <td style={{ 
                  fontWeight: 'bold', 
                  borderLeft: `4px solid ${corZona}`, 
                  textAlign: 'center'
                }}>
                  {pos}
                </td>
                
                <td style={{ textAlign: 'left', cursor: 'pointer' }} onClick={() => onTeamClick(item.team.id)}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={item.team.crest} alt={item.team.shortName} width="24" height="24" />
                    <span style={{ fontWeight: '600' }}>{item.team.shortName}</span>
                  </div>
                </td>
                
                <td style={{ fontWeight: 'bold', textAlign: 'center' }}>{item.points}</td>
                <td style={{ textAlign: 'center' }}>{item.playedGames}</td>
                <td style={{ textAlign: 'center' }}>{item.won}</td>
                <td style={{ textAlign: 'center' }}>{item.draw}</td>
                <td style={{ textAlign: 'center' }}>{item.lost}</td>
                <td style={{ textAlign: 'center' }}>{item.goalsFor}</td>
                <td style={{ textAlign: 'center' }}>{item.goalsAgainst}</td>
                <td style={{ textAlign: 'center' }}>{item.goalDifference}</td>
                
                <td style={{ textAlign: 'center' }}>
                  <button 
                    onClick={() => onToggleFavorite(item.team.id)} 
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <Star 
                      size={20} 
                      color={favorites.includes(item.team.id) ? '#fbbf24' : '#ccc'} 
                      fill={favorites.includes(item.team.id) ? '#fbbf24' : 'none'}
                    />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="tabela-legenda">
      </div>
    </div>
  );
}