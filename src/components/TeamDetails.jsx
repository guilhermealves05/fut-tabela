import React from 'react';
import { User, MapPin, Shield, Users } from 'lucide-react';

export default function TeamDetails({ team, loading }) {
  if (loading) return <div className="box">Carregando detalhes...</div>;
  
  if (!team) return (
    <div className="box">
      <h4><User size={18}/> INFO DO TIME</h4>
      <p style={{fontSize:'12px', color:'#666'}}>
        Clique em um time na tabela para ver o elenco e técnico aqui!
      </p>
    </div>
  );

  return (
    <div className="box">
      <div style={{textAlign: 'center', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '15px'}}>
        <img src={team.crest} style={{width: '70px', height: '70px', objectFit: 'contain'}} alt="" />
        <h3 style={{margin: '10px 0 5px 0'}}>{team.name}</h3>
        
        <div style={{fontSize: '11px', color: '#666', display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap'}}>
          <span style={{display:'flex', alignItems:'center', gap:'4px'}}>
            <Shield size={12}/> {team.tla || team.shortName}
          </span>
          <span style={{display:'flex', alignItems:'center', gap:'4px'}}>
            <MapPin size={12}/> {team.venue || 'Estádio não informado'}
          </span>
          <span style={{display:'flex', alignItems:'center', gap:'4px'}}>
            <Users size={12}/> {team.founded ? `Fundado em ${team.founded}` : '-'}
          </span>
        </div>
      </div>

      <h5 style={{margin: '0 0 10px 0', color: 'var(--ge-green)', display: 'flex', alignItems: 'center', gap: '5px'}}>
        <User size={14}/> ELENCO ATUAL
      </h5>
      
      <div style={{maxHeight: '350px', overflowY: 'auto', fontSize: '12px', paddingRight: '5px'}}>
        {team.coach && (
          <div style={{
            padding: '8px', 
            background: '#f0fdf4', 
            border: '1px solid #dcfce7',
            borderRadius: '4px',
            marginBottom: '10px',
            fontWeight: 'bold', 
            color: '#166534'
          }}>
             Técnico: {team.coach.name}
          </div>
        )}

        {team.squad && team.squad.length > 0 ? (
          team.squad.map(p => (
            <div key={p.id} style={{display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f5f5f5'}}>
              <span style={{fontWeight: '600'}}>{p.name}</span>
              <span style={{color: '#999', fontSize: '10px', textTransform: 'uppercase'}}>{p.position}</span>
            </div>
          ))
        ) : (
          <p style={{color: '#999', fontStyle: 'italic'}}>
            A lista de jogadores não está disponível na API para este time no momento.
          </p>
        )}
      </div>
    </div>
  );
}