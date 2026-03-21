import React from 'react';
import { TrendingUp, ShieldCheck } from 'lucide-react';

export default function StatsSummary({ data }) {
  if (!data || data.length === 0) return null;

  const bestAttack = data.reduce((prev, current) => (prev.goalsFor > current.goalsFor) ? prev : current);
  const bestDefense = data.reduce((prev, current) => (prev.goalsAgainst < current.goalsAgainst) ? prev : current);

  return (
    <div className="stats-panel">
      <div className="stat-box" style={{ borderLeft: '4px solid #4285f4' }}>
        <div className="stat-icon"><TrendingUp size={24} color="#4285f4" /></div>
        <div className="stat-info">
          <h4>Melhor Ataque</h4>
          <p>{bestAttack.team.shortName}</p>
          <small style={{ color: '#666', fontWeight: 'bold' }}>{bestAttack.goalsFor} gols marcados</small>
        </div>
      </div>
      <div className="stat-box" style={{ borderLeft: '4px solid #00b894' }}>
        <div className="stat-icon"><ShieldCheck size={24} color="#00b894" /></div>
        <div className="stat-info">
          <h4>Melhor Defesa</h4>
          <p>{bestDefense.team.shortName}</p>
          <small style={{ color: '#666', fontWeight: 'bold' }}>{bestDefense.goalsAgainst} gols sofridos</small>
        </div>
      </div>
    </div>
  );
}