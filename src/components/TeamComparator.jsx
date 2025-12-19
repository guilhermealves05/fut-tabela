import React, { useState } from 'react';
import { GitCompare } from 'lucide-react'; // Trocado Vs por GitCompare

export default function TeamComparator({ teams }) {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');

  const t1Data = teams.find(t => t.team.name === team1);
  const t2Data = teams.find(t => t.team.name === team2);

  return (
    <div className="card" style={{ marginTop: '20px' }}>
      <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <GitCompare size={24} color="var(--primary)" /> Comparador de Performance
      </h3>
      <div className="controls-bar">
        <select className="input-field" onChange={(e) => setTeam1(e.target.value)}>
          <option value="">Selecione o Time 1</option>
          {teams.map(t => <option key={t.team.id} value={t.team.name}>{t.team.name}</option>)}
        </select>
        <select className="input-field" onChange={(e) => setTeam2(e.target.value)}>
          <option value="">Selecione o Time 2</option>
          {teams.map(t => <option key={t.team.id} value={t.team.name}>{t.team.name}</option>)}
        </select>
      </div>

      {t1Data && t2Data && (
        <div className="stats-panel">
          <div className="stat-box" style={{ borderLeft: t1Data.position < t2Data.position ? '5px solid var(--primary)' : 'none' }}>
            <strong>{t1Data.team.shortName}</strong>
            <p>{t1Data.points} pts | {t1Data.won} Vitórias</p>
            <small>Posição: {t1Data.position}º</small>
          </div>
          <div className="stat-box" style={{ borderLeft: t2Data.position < t1Data.position ? '5px solid var(--primary)' : 'none' }}>
            <strong>{t2Data.team.shortName}</strong>
            <p>{t2Data.points} pts | {t2Data.won} Vitórias</p>
            <small>Posição: {t2Data.position}º</small>
          </div>
        </div>
      )}
    </div>
  );
}