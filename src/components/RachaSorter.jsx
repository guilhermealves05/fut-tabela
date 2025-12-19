import React, { useState } from 'react';
import { UserPlus, Shuffle, RotateCcw } from 'lucide-react';

export default function RachaSorter() {
  const [name, setName] = useState('');
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState({ a: [], b: [] });

  const add = (e) => {
    e.preventDefault();
    if(name.trim()) { setPlayers([...players, name.trim()]); setName(''); }
  };

  const sort = () => {
    const list = [...players].sort(() => Math.random() - 0.5);
    const half = Math.ceil(list.length / 2);
    setTeams({ a: list.slice(0, half), b: list.slice(half) });
  };

  return (
    <div>
      <h3 style={{borderBottom: '2px solid var(--ge-green)', paddingBottom: '10px'}}>SIMULADOR RACHA</h3>
      <form onSubmit={add} className="racha-setup">
        <input className="input-ge" placeholder="Nome do jogador..." value={name} onChange={e => setName(e.target.value)} />
        <button type="submit" className="btn-ge"><UserPlus size={18}/></button>
      </form>
      <div className="player-list">
        {players.map((p, i) => <span key={i} className="player-tag">{p}</span>)}
      </div>
      {players.length >= 2 && (
        <div style={{display:'flex', gap:'10px'}}>
          <button onClick={sort} className="btn-ge" style={{flex:1}}><Shuffle size={18}/> SORTEAR</button>
          <button onClick={() => {setPlayers([]); setTeams({a:[], b:[]})}} className="btn-ge" style={{background:'#999'}}><RotateCcw size={18}/></button>
        </div>
      )}
      {teams.a.length > 0 && (
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', marginTop:'20px'}}>
          <div className="box" style={{borderTop:'4px solid #4285f4'}}><strong>TIME A</strong><hr/>{teams.a.map((p,i)=><div key={i} style={{padding:'5px 0'}}>{p}</div>)}</div>
          <div className="box" style={{borderTop:'4px solid #db4437'}}><strong>TIME B</strong><hr/>{teams.b.map((p,i)=><div key={i} style={{padding:'5px 0'}}>{p}</div>)}</div>
        </div>
      )}
    </div>
  );
}