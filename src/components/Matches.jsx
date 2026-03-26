import React, { useState, useEffect } from 'react';
import { getMatches } from '../services/api';
import { CalendarClock, ChevronDown, ChevronUp } from 'lucide-react';

export default function Matches({ league }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    let ignore = false;

    const fetchMatches = async () => {
      
      try {
        const res = await getMatches(league);
        if (!ignore) setGames(res || []);
      } catch {
        if (!ignore) setGames([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchMatches();

    return () => { ignore = true; };
  }, [league]);

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    const week = d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.','').toUpperCase();
    const date = d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    const time = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    return `${week} ${date} • ${time}`;
  };

  const gamesByRound = games.reduce((acc, game) => {
    const round = game.matchday || 'Jogos Adiados/Extras';
    if (!acc[round]) acc[round] = [];
    acc[round].push(game);
    return acc;
  }, {});

  const roundKeys = Object.keys(gamesByRound).sort((a,b) => a - b);

  return (
    <div className="box" style={{padding: '0', overflow: 'hidden'}}>
      <div style={{background: '#f9f9f9', padding: '10px', textAlign: 'center', fontWeight: '800', fontSize: '11px', color: '#666', textTransform: 'uppercase', borderBottom: '1px solid #eee'}}>
        {showAll ? `PRÓXIMAS RODADAS • ${league}` : `PRÓXIMOS JOGOS • ${league}`}
      </div>

      {loading ? (
        <div style={{padding: '20px', textAlign: 'center', color: '#999'}}>Carregando...</div>
      ) : games.length === 0 ? (
        <div style={{padding: '20px', textAlign: 'center', color: '#999', fontSize: '12px'}}>
          <CalendarClock size={24} style={{marginBottom: '5px'}}/><br/>
          Sem jogos agendados.
        </div>
      ) : (
        <div style={{maxHeight: showAll ? '500px' : 'auto', overflowY: showAll ? 'auto' : 'visible'}}>
          
          {!showAll && games.slice(0, 3).map((g) => (
            <GameRow key={g.id} game={g} formatDate={formatDate} />
          ))}

          {showAll && roundKeys.map(round => (
            <div key={round}>
              <div style={{background: '#eef', padding: '5px 10px', fontSize: '10px', fontWeight: 'bold', color: '#4285f4', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd'}}>
                RODADA {round}
              </div>
              {gamesByRound[round].map(g => (
                <GameRow key={g.id} game={g} formatDate={formatDate} />
              ))}
            </div>
          ))}
          
        </div>
      )}

      {games.length > 3 && (
        <div 
          onClick={() => setShowAll(!showAll)}
          style={{
            padding: '10px', textAlign: 'center', cursor: 'pointer', 
            background: '#fff', borderTop: '1px solid #eee', 
            fontSize: '12px', fontWeight: '700', color: 'var(--ge-green)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px'
          }}
        >
          {showAll ? (
            <><ChevronUp size={16}/> Recolher</>
          ) : (
            <><ChevronDown size={16}/> Ver próximas rodadas ({games.length})</>
          )}
        </div>
      )}
    </div>
  );
}

function GameRow({ game, formatDate }) {
  return (
    <div className="game-row" style={{padding: '12px 15px', borderBottom: '1px solid #f5f5f5'}}>
      <div className="match-team">
        <img src={game.homeTeam.crest} className="match-logo" alt={game.homeTeam.shortName} />
        {game.homeTeam.tla || game.homeTeam.shortName?.substring(0,3).toUpperCase()}
      </div>
      
      <div style={{textAlign:'center', color:'#999', fontSize:'10px'}}>
        {formatDate(game.utcDate)}<br/>
        <b style={{fontSize:'16px', color:'#333'}}>X</b>
      </div>
      
      <div className="match-team">
        <img src={game.awayTeam.crest} className="match-logo" alt={game.awayTeam.shortName} />
        {game.awayTeam.tla || game.awayTeam.shortName?.substring(0,3).toUpperCase()}
      </div>
    </div>
  );
}