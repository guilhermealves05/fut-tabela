import axios from 'axios';

const api = axios.create({
  baseURL: '/api', 
  headers: { 'X-Auth-Token': '12af3d3785f64e8981e530f7169109b4' } 
});

// Busca Tabela
export const getStandings = async (code = 'BSA') => {
  try {
    const response = await api.get(`/competitions/${code}/standings`);
    return response.data.standings[0].table;
  } catch (error) {
    console.error("Erro API Tabela:", error);
    return [];
  }
};

// Busca Jogos do Campeonato (Lateral Direita)
export const getMatches = async (code = 'BSA') => {
  try {
    const response = await api.get(`/competitions/${code}/matches?status=SCHEDULED&limit=40`);
    return response.data.matches;
  } catch (error) {
    console.error("Erro API Jogos:", error);
    return [];
  }
};

// Busca Detalhes do Time (Elenco e Técnico)
export const getTeamDetails = async (teamId) => {
  try {
    const response = await api.get(`/teams/${teamId}`);
    return response.data;
  } catch (error) {
    console.error("Erro API Time:", error);
    return null;
  }
};