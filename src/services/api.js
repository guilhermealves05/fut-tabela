import axios from 'axios';

const api = axios.create({
  baseURL: '/api', 
  headers: { 'X-Auth-Token': '12af3d3785f64e8981e530f7169109b4' } 
});

const CACHE_TIME = 10 * 60 * 1000; 

const fetchWithCache = async (endpoint, cacheKey) => {
  const cachedData = localStorage.getItem(cacheKey);
  
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    
    if (Date.now() - timestamp < CACHE_TIME) {
      console.log(`⚽ CACHE (Sem gastar limite da API): ${cacheKey}`);
      return { data };
    }
  }

  const response = await api.get(endpoint);
  
  localStorage.setItem(cacheKey, JSON.stringify({
    data: response.data,
    timestamp: Date.now()
  }));
  
  console.log(`🌐 API ORIGINAL (Gastou 1 requisição): ${cacheKey}`);
  return response;
};


export const getStandings = async (code = 'BSA') => {
  try {
    const response = await fetchWithCache(`/competitions/${code}/standings`, `standings_${code}`);
    return response.data.standings[0].table;
  } catch (error) {
    console.error("Erro API Tabela:", error);
    return [];
  }
};

export const getMatches = async (code = 'BSA') => {
  try {
    const response = await fetchWithCache(`/competitions/${code}/matches?status=SCHEDULED&limit=40`, `matches_${code}`);
    return response.data.matches;
  } catch (error) {
    console.error("Erro API Jogos:", error);
    return [];
  }
};

export const getTeamDetails = async (teamId) => {
  try {
    const response = await fetchWithCache(`/teams/${teamId}`, `team_${teamId}`);
    return response.data;
  } catch (error) {
    console.error("Erro API Time:", error);
    return null;
  }
};

export const getScorers = async (code = 'BSA') => {
  try {
    const response = await fetchWithCache(`/competitions/${code}/scorers?limit=10`, `scorers_${code}`);
    return response.data.scorers;
  } catch (error) {
    console.error("Erro API Artilheiros:", error);
    return [];
  }
};