import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTeamDetails } from '../services/api';
import { ArrowLeft, User, Shield, MapPin, Globe, Calendar, Link as LinkIcon, Trophy } from 'lucide-react';

const translatePosition = (pos) => {
  const positions = {
    'Goalkeeper': 'Goleiro',
    'Defence': 'Defesa',
    'Centre-Back': 'Zagueiro',
    'Left-Back': 'Lateral Esquerdo',
    'Right-Back': 'Lateral Direito',
    'Midfield': 'Meio-campo',
    'Defensive Midfield': 'Volante',
    'Central Midfield': 'Meia Central',
    'Attacking Midfield': 'Meia Ofensivo',
    'Offence': 'Ataque',
    'Centre-Forward': 'Centroavante',
    'Left Winger': 'Ponta Esquerda',
    'Right Winger': 'Ponta Direita'
  };
  return positions[pos] || pos || 'Desconhecido';
};

const translateNationality = (nat) => {
  const nationalities = {
    'Brazil': 'Brasil',
    'Argentina': 'Argentina',
    'Uruguay': 'Uruguai',
    'Colombia': 'Colômbia',
    'Paraguay': 'Paraguai',
    'Ecuador': 'Equador',
    'Chile': 'Chile',
    'Peru': 'Peru',
    'Venezuela': 'Venezuela',
    'Bolivia': 'Bolívia',
    'Spain': 'Espanha',
    'Portugal': 'Portugal',
    'England': 'Inglaterra',
    'France': 'França',
    'Italy': 'Itália',
    'Germany': 'Alemanha',
    'Netherlands': 'Holanda',
    'Belgium': 'Bélgica'
  };
  return nationalities[nat] || nat;
};

export default function TeamDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      setLoading(true);
      const data = await getTeamDetails(id);
      setTeam(data);
      setLoading(false);
    };
    fetchTeam();
  }, [id]);

  if (loading) {
    return (
      <div className="spinner-container" style={{ marginTop: '100px' }}>
        <div className="loading-spinner"></div>
        <p>A carregar base de dados do clube...</p>
      </div>
    );
  }

  if (!team) return <div style={{ padding: '50px', textAlign: 'center', color: '#666' }}>Time não encontrado.</div>;

  const groupedSquad = team.squad?.reduce((acc, player) => {
    let pos = player.position || 'Outros';
    let group = 'Outros';
    
    if (pos.includes('Goalkeeper')) group = 'Goleiros';
    else if (pos.includes('Back') || pos === 'Defence') group = 'Defensores';
    else if (pos.includes('Midfield')) group = 'Meio-campistas';
    else if (pos.includes('Winger') || pos.includes('Forward') || pos === 'Offence') group = 'Atacantes';
    
    if (!acc[group]) acc[group] = [];
    acc[group].push(player);
    return acc;
  }, { 'Goleiros': [], 'Defensores': [], 'Meio-campistas': [], 'Atacantes': [], 'Outros': [] });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '10px 0 40px 0' }}>
      <button 
        onClick={() => navigate('/')}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'var(--ge-green)', fontWeight: 'bold', cursor: 'pointer', marginBottom: '20px', padding: 0 }}
      >
        <ArrowLeft size={20} /> Voltar para a Classificação
      </button>

      <div className="fut-card" style={{ display: 'flex', alignItems: 'center', gap: '30px', padding: '30px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ background: '#fff', padding: '15px', borderRadius: '50%', boxShadow: '0 4px 10px rgba(0,0,0,0.08)' }}>
          <img src={team.crest} alt={team.name} style={{ width: '120px', height: '120px', objectFit: 'contain' }} />
        </div>
        
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '36px', fontWeight: '900' }}>{team.name}</h1>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', color: '#555', fontSize: '14px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={18} color="var(--ge-green)" /> <strong>Estádio:</strong> {team.venue || 'Não informado'}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Calendar size={18} color="var(--ge-green)" /> <strong>Fundação:</strong> {team.founded || 'Não informada'}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Shield size={18} color="var(--ge-green)" /> <strong>Cores:</strong> {team.clubColors || 'Não informadas'}</span>
            
            {team.website && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <LinkIcon size={18} color="var(--ge-green)" /> 
                <a href={team.website} target="_blank" rel="noreferrer" style={{ color: '#4285f4', textDecoration: 'none', fontWeight: 'bold' }}>Site Oficial</a>
              </span>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start' }}>
        
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="fut-card" style={{ padding: '20px' }}>
            <h3 style={{ margin: '0 0 15px 0', borderBottom: '2px solid #eee', paddingBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px', color: '#333' }}>
              <User size={20} color="var(--ge-green)" /> Comando Técnico
            </h3>
            <div>
              {team.coach ? (
                <>
                  <div style={{ fontWeight: '900', fontSize: '20px', color: '#111', marginBottom: '5px' }}>{team.coach.name}</div>
                  <div style={{ color: '#666', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                     <Globe size={14}/> {translateNationality(team.coach.nationality)}
                  </div>
                </>
              ) : (
                 <div style={{ color: '#999', fontStyle: 'italic' }}>Informação do técnico não disponível</div>
              )}
            </div>
          </div>

          {team.runningCompetitions && team.runningCompetitions.length > 0 && (
            <div className="fut-card" style={{ padding: '20px' }}>
              <h3 style={{ margin: '0 0 15px 0', borderBottom: '2px solid #eee', paddingBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px', color: '#333' }}>
                <Trophy size={20} color="var(--ge-green)" /> Competições Atuais
              </h3>
              <ul style={{ paddingLeft: '20px', margin: 0, color: '#444', fontSize: '14px', lineHeight: '1.8', fontWeight: '600' }}>
                {team.runningCompetitions.map(comp => (
                  <li key={comp.id}>{comp.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="fut-card" style={{ flex: '3 1 600px', padding: '30px' }}>
          <h2 style={{ margin: '0 0 25px 0', borderBottom: '3px solid var(--ge-green)', paddingBottom: '10px', display: 'inline-block', fontSize: '24px' }}>Elenco Atual</h2>
          
          {!team.squad || team.squad.length === 0 ? (
            <div style={{ color: '#999', padding: '30px', textAlign: 'center', background: '#f9f9f9', borderRadius: '8px' }}>Elenco não disponibilizado pela API.</div>
          ) : (
            Object.entries(groupedSquad).map(([groupName, players]) => {
              if (players.length === 0) return null;
              
              return (
                <div key={groupName} style={{ marginBottom: '35px' }}>
                  <h3 style={{ background: '#f0fdf4', color: 'var(--ge-green)', padding: '10px 15px', borderRadius: '6px', fontSize: '16px', textTransform: 'uppercase', marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{groupName}</span>
                    <span style={{ fontSize: '12px', background: 'var(--ge-green)', color: 'white', padding: '2px 8px', borderRadius: '12px' }}>{players.length}</span>
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '15px' }}>
                    {players.map((player) => (
                      <div key={player.id} style={{ background: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #e5e7eb', transition: 'all 0.2s', cursor: 'default' }} onMouseOver={e => {e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.borderColor='#var(--ge-green)'; e.currentTarget.style.boxShadow='0 4px 10px rgba(0,0,0,0.05)'}} onMouseOut={e => {e.currentTarget.style.transform='none'; e.currentTarget.style.borderColor='#e5e7eb'; e.currentTarget.style.boxShadow='none'}}>
                        <div style={{ fontWeight: '800', color: '#111', fontSize: '15px', marginBottom: '10px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {player.name}
                        </div>
                        <div style={{ fontSize: '13px', color: '#666', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--ge-green)' }}></div> 
                            <strong>{translatePosition(player.position)}</strong>
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Globe size={14} color="#999" /> {translateNationality(player.nationality)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
        
      </div>
    </div>
  );
}