import React, { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';
import { getStandings, getTeamDetails } from './services/api';

import Matches from './components/Matches';
import RachaSorter from './components/RachaSorter';
import Table from './components/Table';
import StatsSummary from './components/Stats_Summary';
import TeamComparator from './components/TeamComparator';
import TeamDetails from './components/TeamDetails'; // Novo componente lateral

import './App.css';

// Mock de segurança
const mock = [
  { position: 1, team: { id: 764, name: 'Flamengo', shortName: 'Flamengo', crest: 'https://crests.football-data.org/764.png' }, points: 79, playedGames: 38, won: 23, draw: 10, lost: 5, goalsFor: 70, goalsAgainst: 19, goalDifference: 51 },
  { position: 2, team: { id: 1783, name: 'Palmeiras', shortName: 'Palmeiras', crest: 'https://crests.football-data.org/1783.png' }, points: 76, playedGames: 38, won: 23, draw: 7, lost: 8, goalsFor: 65, goalsAgainst: 32, goalDifference: 33 },
];

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('tabela');
  const [favs, setFavs] = useState(() => JSON.parse(localStorage.getItem('futs')) || []);
  
  const [league, setLeague] = useState('BSA'); 
  
  // Estado para os detalhes do time na lateral
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [loadingTeam, setLoadingTeam] = useState(false);

  useEffect(() => {
    setLoading(true);
    getStandings(league)
      .then(res => setData(res.length > 0 ? res : (league === 'BSA' ? mock : []))) 
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, [league]);

  const toggleFavorite = (id) => {
    const n = favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id];
    setFavs(n); 
    localStorage.setItem('futs', JSON.stringify(n));
  };

  // Função chamada ao clicar na tabela
  const handleTeamClick = async (teamId) => {
    setLoadingTeam(true);
    // 1. Pega info básica imediata da tabela
    const basicInfo = data.find(item => item.team.id === teamId)?.team;
    if (basicInfo) setSelectedTeam(basicInfo);

    // 2. Busca detalhes completos na API
    const details = await getTeamDetails(teamId);
    if (details) setSelectedTeam(details);
    setLoadingTeam(false);
  };

  return (
    <div>
<header className="ge-header">
        <div className="header-wrapper">
          
          {/* ESQUERDA: Logo */}
          <div className="header-left">
            <div className="ge-logo"><Trophy size={28}/>FutTabela</div>
          </div>
          
          {/* CENTRO: Menu (Ficará perfeitamente no meio) */}
          <div className="header-center">
            <select className="league-select" value={league} onChange={(e) => setLeague(e.target.value)}>
              <option value="BSA">Brasileirão Série A</option>
              <option value="PL">Premier League (ING)</option>
              <option value="PD">La Liga (ESP)</option>
              <option value="SA">Série A (ITA)</option>
              <option value="BL1">Bundesliga (ALE)</option>
              <option value="FL1">Ligue 1 (FRA)</option>
            </select>

            <nav className="nav-menu">
              <div className={`nav-link ${tab === 'tabela' ? 'active' : ''}`} onClick={() => setTab('tabela')}>CLASSIFICAÇÃO</div>
              <div className={`nav-link ${tab === 'racha' ? 'active' : ''}`} onClick={() => setTab('racha')}>SIMULADOR RACHA</div>
            </nav>
          </div>
          
          {/* DIREITA: Nomes */}
          <div className="header-right">
            <div className="student-names">ALVES • MONTEIRO • COSMO</div>
          </div>

        </div>
      </header>      <div className="main-container">
        {tab === 'tabela' ? (
          <>
            <section>
              <StatsSummary data={data} />
              
              <div className="box">
                <h3 style={{marginTop:0, borderBottom:'2px solid var(--ge-green)', paddingBottom:'10px', textTransform:'uppercase'}}>
                  Classificação • {league}
                </h3>
                
                {loading ? (
                  <p style={{textAlign: 'center', padding: '20px'}}>Carregando tabela...</p>
                ) : (
                  <Table 
                    data={data} 
                    favorites={favs} 
                    onToggleFavorite={toggleFavorite}
                    onTeamClick={handleTeamClick} 
                  />
                )}
              </div>

              <TeamComparator teams={data} />
            </section>
            
            <aside>
              {/* Passamos a liga selecionada para o Matches */}
              <Matches league={league} />
              
              {/* Novo componente de Detalhes na Lateral */}
              <TeamDetails team={selectedTeam} loading={loadingTeam} />
            </aside>
          </>
        ) : (
          <div style={{gridColumn: 'span 2'}}>
            <div className="box"><RachaSorter /></div>
          </div>
        )}
      </div>
    </div>
  );
}