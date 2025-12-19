import React from 'react';
import { Star } from 'lucide-react';

export default function Table({ data, favorites, onToggleFavorite, onTeamClick }) {
  return (
    <table className="ge-table">
      <thead>
        <tr>
          <th>POS</th>
          <th>EQUIPE</th>
          <th>P</th>
          <th>J</th>
          <th>V</th>
          <th>SG</th>
          <th>FAV</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          const isFav = favorites.includes(item.team.id);
          return (
            <tr key={item.team.id} style={{background: isFav ? '#fff9e6' : 'transparent'}}>
              <td>
                <span className="pos" style={{color: index < 4 ? '#4285f4' : index >= data.length - 4 ? '#db4437' : '#333'}}>
                  {item.position}
                </span>
              </td>
              
              {/* Clicar aqui carrega os detalhes */}
              <td 
                onClick={() => onTeamClick(item.team.id)} 
                style={{cursor: 'pointer'}}
                title="Clique para ver detalhes"
              >
                <div className="team-info" style={{display:'flex', alignItems:'center', gap:'10px'}}>
                  <img src={item.team.crest} className="team-logo" alt="" />
                  <span style={{fontWeight: '700'}}>{item.team.shortName || item.team.name}</span>
                </div>
              </td>

              <td className="pts" style={{fontWeight:800}}>{item.points}</td>
              <td>{item.playedGames}</td>
              <td>{item.won}</td>
              <td>{item.goalDifference}</td>
              <td>
                <Star 
                  size={16} 
                  style={{cursor: 'pointer'}} 
                  fill={isFav ? "gold" : "none"} 
                  color={isFav ? "gold" : "#ccc"} 
                  onClick={(e) => {
                    e.stopPropagation(); // Impede que clicar na estrela abra os detalhes
                    onToggleFavorite(item.team.id);
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}