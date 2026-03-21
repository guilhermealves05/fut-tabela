import axios from 'axios';

// Mantemos o seu baseURL para o Proxy do Vite funcionar e não dar erro de CORS!
const api = axios.create({
  baseURL: '/api', 
  headers: { 'X-Auth-Token': '12af3d3785f64e8981e530f7169109b4' } 
});

// Tempo de validade do cache: 10 minutos (em milissegundos)
const CACHE_TIME = 10 * 60 * 1000; 

// Função que faz a mágica: tenta pegar do cache, se não tiver, chama a API
const fetchWithCache = async (endpoint, cacheKey) => {
  const cachedData = localStorage.getItem(cacheKey);
  
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    
    // Verifica se os dados salvos ainda estão na validade (menos de 10 min)
    if (Date.now() - timestamp < CACHE_TIME) {
      console.log(`⚽ CACHE (Sem gastar limite da API): ${cacheKey}`);
      return { data }; // Retorna em um formato igual ao do Axios
    }
  }

  // Se não tem cache ou já venceu, busca na API de verdade
  const response = await api.get(endpoint);
  
  // Salva a resposta no LocalStorage com a hora atual
  localStorage.setItem(cacheKey, JSON.stringify({
    data: response.data,
    timestamp: Date.now()
  }));
  
  console.log(`🌐 API ORIGINAL (Gastou 1 requisição): ${cacheKey}`);
  return response;
};

// --- SUAS FUNÇÕES COM O CACHE APLICADO ---

// Busca Tabela
export const getStandings = async (code = 'BSA') => {
  try {
    const response = await fetchWithCache(`/competitions/${code}/standings`, `standings_${code}`);
    return response.data.standings[0].table;
  } catch (error) {
    console.error("Erro API Tabela:", error);
    return [];
  }
};

// Busca Jogos do Campeonato (Lateral Direita)
export const getMatches = async (code = 'BSA') => {
  try {
    const response = await fetchWithCache(`/competitions/${code}/matches?status=SCHEDULED&limit=40`, `matches_${code}`);
    return response.data.matches;
  } catch (error) {
    console.error("Erro API Jogos:", error);
    return [];
  }
};

// Busca Detalhes do Time (Elenco e Técnico)
export const getTeamDetails = async (teamId) => {
  try {
    const response = await fetchWithCache(`/teams/${teamId}`, `team_${teamId}`);
    return response.data;
  } catch (error) {
    console.error("Erro API Time:", error);
    return null;
  }
};