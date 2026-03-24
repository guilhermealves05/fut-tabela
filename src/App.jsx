import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Trophy, Search } from 'lucide-react';
import { getStandings, getTeamDetails } from './services/api';

import Matches from './components/Matches';
import RachaSorter from './components/RachaSorter'; 
import Table from './components/Table';
import StatsSummary from './components/Stats_Summary';
import TeamComparator from './components/TeamComparator';
import TeamDetails from './components/TeamDetails';

import './App.css';

const mock = [
  { position: 1, team: { id: 764, name: 'Flamengo', shortName: 'Flamengo', crest: 'https://crests.football-data.org/764.png' }, points: 79, playedGames: 38, won: 23, draw: 10, lost: 5, goalsFor: 70, goalsAgainst: 19, goalDifference: 51 },
  { position: 2, team: { id: 1783, name: 'Palmeiras', shortName: 'Palmeiras', crest: 'https://crests.football-data.org/1783.png' }, points: 76, playedGames: 38, won: 23, draw: 7, lost: 8, goalsFor: 65, goalsAgainst: 32, goalDifference: 33 },
];

function Layout({ children, league, setLeague }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="app-container">
      <header className="fut-header">
        <div className="content-wrapper header-content">
          <div className="ge-logo">
            <Trophy size={28} color="white" /> FutTabela
          </div>
          
          <div className="header-center">
            {currentPath === '/' && (
               <div className="seletor-campeonato">
                 <label htmlFor="liga-select" className="seletor-label">
                   Selecione o Campeonato:
                 </label>
                 <select 
                   id="liga-select"
                   className="seletor-input" 
                   value={league} 
                   onChange={(e) => setLeague(e.target.value)}
                 >
                   <option value="BSA">Brasileirão Série A</option>
                   <option value="PL">Premier League (ING)</option>
                   <option value="PD">La Liga (ESP)</option>
                   <option value="SA">Série A (ITA)</option>
                   <option value="BL1">Bundesliga (ALE)</option>
                   <option value="FL1">Ligue 1 (FRA)</option>
                 </select>
               </div>
            )}

            <nav className="nav-menu">
              <Link to="/" className={`nav-link ${currentPath === '/' ? 'active' : ''}`}>CLASSIFICAÇÃO</Link>
              <Link to="/racha" className={`nav-link ${currentPath === '/racha' ? 'active' : ''}`}>SIMULADOR RACHA</Link>
            </nav>
          </div>

          <div className="header-right">
             <div className="student-names">
               ALVES • MONTEIRO • COSMO
             </div>
          </div>
        </div>
      </header>

      <main className="content-wrapper main-content-area">
        {children}
      </main>
    </div>
  );
}

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false); 
  const [favs, setFavs] = useState(() => JSON.parse(localStorage.getItem('futs')) || []);
  const [league, setLeague] = useState('BSA'); 
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [loadingTeam, setLoadingTeam] = useState(false);
  const [busca, setBusca] = useState(''); 
  
  // NOVO ESTADO: Controle da notificação Toast
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => {
    const fetchLeagueData = async () => {
      setLoading(true);
      setApiError(false);
      setBusca('');
      
      try {
        const res = await getStandings(league);
        if (res.length > 0) {
          setData(res);
        } else {
          setData(league === 'BSA' ? mock : []);
          if (league !== 'BSA') setApiError(true);
        }
      } catch (error) {
        console.error('Erro ao buscar dados da liga:', error);
        setData(league === 'BSA' ? mock : []);
        setApiError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchLeagueData();
  }, [league]);

  // NOVA LÓGICA DO FAVORITO COM TOAST
  const toggleFavorite = (id) => {
    const isAdding = !favs.includes(id);
    const n = isAdding ? [...favs, id] : favs.filter(f => f !== id);
    setFavs(n); 
    localStorage.setItem('futs', JSON.stringify(n));

    // Descobre o nome do time para mostrar no aviso
    const teamName = data.find(item => item.team.id === id)?.team.shortName || 'Equipa';
    
    // Mostra o Toast
    setToast({ 
      show: true, 
      message: isAdding ? `${teamName} adicionado aos favoritos! ⭐` : `${teamName} removido dos favoritos.` 
    });

    // Esconde o Toast depois de 3 segundos
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 3000);
  };

  const handleTeamClick = async (teamId) => {
    setLoadingTeam(true);
    const basicInfo = data.find(item => item.team.id === teamId)?.team;
    if (basicInfo) setSelectedTeam(basicInfo);

    const details = await getTeamDetails(teamId);
    if (details) setSelectedTeam(details);
    setLoadingTeam(false);
  };

  const timesFiltrados = data.filter((item) => {
    const nome = item.team.name ? item.team.name.toLowerCase() : '';
    const nomeCurto = item.team.shortName ? item.team.shortName.toLowerCase() : '';
    const termoBusca = busca.toLowerCase();
    
    return nome.includes(termoBusca) || nomeCurto.includes(termoBusca);
  });

  return (
    <BrowserRouter>
      <Layout league={league} setLeague={setLeague}>
        <Routes>
          <Route path="/" element={
            <div className="main-grid">
              <section className="left-col">
                <div className="fut-card">
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom:'2px solid var(--ge-green)', paddingBottom:'10px'}}>
                    <h3 style={{margin: 0, textTransform:'uppercase'}}>
                      Classificação • {league}
                    </h3>
                  </div>
                  
                  {apiError && (
                    <div style={{background: '#fee', color: '#c00', padding: '10px', borderRadius: '4px', marginBottom: '15px', fontSize: '13px', textAlign: 'center', fontWeight: 'bold'}}>
                      Limite da API atingido ou sem ligação. A exibir dados locais.
                    </div>
                  )}

                  {loading ? (
                    /* NOVO SPINNER DE CARREGAMENTO */
                    <div className="spinner-container">
                      <div className="loading-spinner"></div>
                      <p>A carregar dados do campeonato...</p>
                    </div>
                  ) : (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', background: '#f9f9f9', padding: '10px 15px', borderRadius: '8px', border: '1px solid #e6e6e6', marginBottom: '15px', transition: 'box-shadow 0.2s' }}>
                        <Search size={18} color="#999" style={{ marginRight: '10px' }} />
                        <input 
                          type="text" 
                          placeholder="Pesquisar Equipe" 
                          value={busca}
                          onChange={(e) => setBusca(e.target.value)}
                          style={{ border: 'none', background: 'transparent', outline: 'none', padding: '5px', width: '100%', fontSize: '14px', fontFamily: 'inherit', color: '#333' }}
                        />
                      </div>

                      <Table 
                        data={timesFiltrados} 
                        favorites={favs} 
                        onToggleFavorite={toggleFavorite}
                        onTeamClick={handleTeamClick} 
                      />
                      
                      {timesFiltrados.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '30px', color: '#999', fontSize: '14px' }}>
                          Nenhuma equipe encontrada com o nome "{busca}".
                        </div>
                      )}
                    </>
                  )}
                </div>

                <TeamComparator teams={data} />
              </section>

              <aside className="right-col">
                <StatsSummary data={data} />
                <Matches league={league} />
                <TeamDetails team={selectedTeam} loading={loadingTeam} />
              </aside>
            </div>
          } />

          <Route path="/racha" element={
            <div className="fut-card">
               <RachaSorter />
            </div>
          } />
        </Routes>
      </Layout>

      {/* NOVO TOAST DE NOTIFICAÇÃO FLUTUANTE */}
      {toast.show && (
        <div className="toast-notification">
          {toast.message}
        </div>
      )}
    </BrowserRouter>
  );
}