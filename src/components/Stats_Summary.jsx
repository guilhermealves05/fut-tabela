import React from 'react';
import { TrendingUp, ShieldCheck } from 'lucide-react';

export default function StatsSummary({ data }) {
  if (!data || data.length === 0) return null;

  // Lógica para encontrar os melhores
  const bestAttack = data.reduce((prev, current) => (prev.goalsFor > current.goalsFor) ? prev : current);
  const bestDefense = data.reduce((prev, current) => (prev.goalsAgainst < current.goalsAgainst) ? prev : current);

  return (
    <div className="stats-panel">
      <div className="stat-box">
        <div className="stat-icon"><TrendingUp size={24} /></div>
        <div className="stat-info">
          <h4>Melhor Ataque</h4>
          <p>{bestAttack.team.shortName} ({bestAttack.goalsFor} gols)</p>
        </div>
      </div>
      <div className="stat-box">
        <div className="stat-icon"><ShieldCheck size={24} /></div>
        <div className="stat-info">
          <h4>Melhor Defesa</h4>
          <p>{bestDefense.team.shortName} ({bestDefense.goalsAgainst} gols)</p>
        </div>
      </div>
    </div>
  );
}