import React from 'react';
import { Star } from 'lucide-react';

export default function Table({ data, favorites, onToggleFavorite, onTeamClick }) {
  
  
  const getZoneColor = (pos) => {
    if (pos <= 4) return '#22c55e'; // Verde: Libertadores / Champions
    if (pos <= 6) return '#3b82f6'; // Azul: Pré-Libertadores / Europa League
    if (pos >= 7 && pos <= 12) return '#f59e0b'; // Laranja: Sul-Americana
    // Se a tabela tiver 20 times, os 4 últimos caem
    if (data.length >= 20 && pos >= 17) return '#ef4444'; // Vermelho: Rebaixamento
    // Se a tabela tiver 18 times (como a Bundesliga), os 3 últimos caem
    if (data.length === 18 && pos >= 16) return '#ef4444'; 
    return 'transparent'; 
  };

  return (
    <div className="table-container">
      <table className="fut-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Pos</th>
            <th style={{ textAlign: 'left' }}>Equipe</th>
            <th>Pts</th>
            <th>J</th>
            <th>V</th>
            <th>E</th>
            <th>D</th>
            <th>GM</th>
            <th>GS</th>
            <th>SG</th>
            <th>Fav</th>
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
                
                <td style={{ fontWeight: 'bold' }}>{item.points}</td>
                <td>{item.playedGames}</td>
                <td>{item.won}</td>
                <td>{item.draw}</td>
                <td>{item.lost}</td>
                <td>{item.goalsFor}</td>
                <td>{item.goalsAgainst}</td>
                <td>{item.goalDifference}</td>
                
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

      {/* NOVO: Legenda Colorida no final da Tabela */}
      <div className="tabela-legenda">
        <div className="legenda-item">
          <span className="cor-caixa" style={{ backgroundColor: '#22c55e' }}></span>
          <span className="legenda-texto">Fase de Grupos (Libertadores/Champions)</span>
        </div>
        <div className="legenda-item">
          <span className="cor-caixa" style={{ backgroundColor: '#3b82f6' }}></span>
          <span className="legenda-texto">Pré-Fase de Grupos</span>
        </div>
        <div className="legenda-item">
          <span className="cor-caixa" style={{ backgroundColor: '#f59e0b' }}></span>
          <span className="legenda-texto">Sul-Americana/Europa League</span>
        </div>
        <div className="legenda-item">
          <span className="cor-caixa" style={{ backgroundColor: '#ef4444' }}></span>
          <span className="legenda-texto">Rebaixamento</span>
        </div>
      </div>

    </div>
  );
}