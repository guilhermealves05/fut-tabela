import React, { useState } from 'react';
import { UserPlus, Shuffle, RotateCcw, AlertCircle } from 'lucide-react';

export default function RachaSorter() {
  const [name, setName] = useState('');
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState({ a: [], b: [] });
  const [error, setError] = useState(''); // Estado para mensagem de erro (Exigência N2)

  const add = (e) => {
    e.preventDefault();
    setError(''); // Limpa o erro anterior
    const newName = name.trim();

    if (!newName) {
      setError('Por favor, digite o nome do jogador.');
      return;
    }
    
    // Validação para evitar nomes duplicados
    if (players.map(p => p.toLowerCase()).includes(newName.toLowerCase())) {
      setError('Este jogador já foi adicionado!');
      return;
    }

    setPlayers([...players, newName]);
    setName('');
  };

  const sort = () => {
    if (players.length < 2) {
      setError('Adicione pelo menos 2 jogadores para poder sortear!');
      return;
    }
    setError('');
    
    // Algoritmo de sorteio aleatório
    const list = [...players].sort(() => Math.random() - 0.5);
    const half = Math.ceil(list.length / 2);
    setTeams({ a: list.slice(0, half), b: list.slice(half) });
  };

  const clearAll = () => {
    setPlayers([]);
    setTeams({ a: [], b: [] });
    setError('');
  };

  return (
    <div style={{ padding: '10px' }}>
      <h3 style={{ borderBottom: '2px solid var(--ge-green)', paddingBottom: '10px', marginTop: 0 }}>
        SIMULADOR DE RACHA
      </h3>

      {/* Layout Web: Grid dividindo a tela em duas colunas (Esquerda: Setup, Direita: Sorteio) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '20px' }}>
        
        {/* COLUNA ESQUERDA: Adicionar Jogadores */}
        <div>
          <form onSubmit={add} className="racha-setup" style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <input 
              className="input-ge" 
              placeholder="Digite o nome do jogador..." 
              value={name} 
              onChange={e => setName(e.target.value)} 
              style={{ flex: 1, padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <button type="submit" className="btn-ge" style={{ padding: '0 20px' }}>
              <UserPlus size={20} />
            </button>
          </form>

          {/* Feedback Visual de Erro */}
          {error && (
            <div style={{ color: '#db4437', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '15px', fontWeight: 'bold' }}>
              <AlertCircle size={16} /> {error}
            </div>
          )}

          {/* Lista de Jogadores Adicionados */}
          <div className="player-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', minHeight: '50px', padding: '10px', background: '#f9f9f9', borderRadius: '4px', border: '1px dashed #ccc' }}>
            {players.length === 0 && <span style={{ color: '#999', fontSize: '13px', fontStyle: 'italic' }}>Nenhum jogador adicionado ainda...</span>}
            {players.map((p, i) => (
              <span key={i} className="player-tag" style={{ background: 'var(--ge-green)', color: 'white', padding: '5px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold' }}>
                {p}
              </span>
            ))}
          </div>

          {/* Botões de Ação */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <button onClick={sort} className="btn-ge" style={{ flex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontSize: '15px' }}>
              <Shuffle size={18} /> SORTEAR TIMES
            </button>
            <button onClick={clearAll} className="btn-ge" style={{ flex: 1, background: '#666', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
              <RotateCcw size={18} /> LIMPAR
            </button>
          </div>
        </div>

        {/* COLUNA DIREITA: Resultado do Sorteio */}
        <div>
          {teams.a.length === 0 ? (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #ccc', borderRadius: '4px', color: '#999' }}>
              <p>Os times sorteados aparecerão aqui.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              {/* Time A */}
              <div className="box" style={{ borderTop: '4px solid #4285f4', padding: '15px', margin: 0, boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#4285f4', textAlign: 'center' }}>TIME A</h4>
                <hr style={{ border: 'none', borderTop: '1px solid #eee', marginBottom: '10px' }}/>
                {teams.a.map((p, i) => (
                  <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #f9f9f9', fontSize: '14px', fontWeight: '600' }}>{p}</div>
                ))}
              </div>

              {/* Time B */}
              <div className="box" style={{ borderTop: '4px solid #db4437', padding: '15px', margin: 0, boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#db4437', textAlign: 'center' }}>TIME B</h4>
                <hr style={{ border: 'none', borderTop: '1px solid #eee', marginBottom: '10px' }}/>
                {teams.b.map((p, i) => (
                  <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #f9f9f9', fontSize: '14px', fontWeight: '600' }}>{p}</div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}