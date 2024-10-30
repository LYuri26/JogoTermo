// Lista de palavras selecionadas
const palavrasSelecionadas = [
  "alert",
  "cache",
  "chart",
  "drive",
  "flash",
  "focus",
  "input",
  "laser",
  "model",
  "reset",
  "smart",
  "state",
  "track",
  "value",
  "virus",
  "dados",
  "teste",
  "bytes",
  "código",
  "login",
  "cloud",
  "senha",
  "rede",
  "tecla",
  "ponto",
  "sinal",
  "driver",
  "debug",
  "atual",
  "array",
  "block",
  "email",
  "query",
  "patch",
  "print",
  "link",
  "trace",
  "cable",
  "alert",
  "label",
  "robot",
  "scope",
  "image",
  "order",
  "table",
  "mouse",
  "senai",
  "enter",
  "lenon",
  "linux",
  "gamer",  // Para se referir a jogadores
  "haste",  // Referência a postagens em redes sociais
  "drama",  // Comum em discussões sobre cultura pop
  "salto",  // Pode se referir a "salto" em tecnologia
  "tenda",  // Referência a eventos, como festas ou festivais
  "passe",  // Referência a passagens em jogos ou eventos
  "lazer",  // Atividades de entretenimento
  "frase",  // Referência a citações ou memes
  "festa",  // Eventos sociais comuns
  "flash",  // Pode referir-se a tecnologias rápidas ou ao "flash" de câmera
  "risos",  // Referência ao humor e memes
  "sorte",  // Popular em jogos e sorteios
  "banda",  // Referência a grupos musicais
  "trio",   // Referência a grupos ou equipes
  // Novas palavras
  "click",  // Interação digital
  "foto",   // Referência a fotos em redes sociais
  "meme",   // Cultura da internet
  "swipe",  // Ação comum em aplicativos móveis
  "pinky",  // Referência a uma cor ou estilo
  "cyber",  // Relacionado a tecnologia e segurança
  "hypee",  // Referência a entusiasmo
  "viral",  // Conteúdo que se espalha rapidamente
  "score",  // Referência a pontuações em jogos
  "drift",  // Estilo de dirigir ou jogar
  "desta",  // Palavra comum em contexto de eventos ou coisas em destaque
  "tropo",  // Referência a clichês em histórias
  "emoji",  // Ícones usados em mensagens
  "quase",  // Referência a algo que está próximo de acontecer
  "track",  // Música ou trilha sonora
  "level",  // Níveis em jogos ou progressão
  "piano",  // Referência a música
  "pombo",
];

// Função para sortear uma palavra da lista de palavras selecionadas
function sortearPalavra() {
  const randomIndex = Math.floor(Math.random() * palavrasSelecionadas.length);
  return palavrasSelecionadas[randomIndex].toUpperCase();
}

// Função para verificar se a palavra do dia deve ser atualizada
function getPalavraDoDia() {
  const agora = new Date();
  const horarioAtual = agora.getHours() * 60 + agora.getMinutes(); // Minutos desde a meia-noite
  const horarioAtualizacao = [480, 810, 1080]; // Horários de atualização em minutos: 08:00, 13:30, 18:00

  // Obtém a data da última atualização
  const ultimaAtualizacao = localStorage.getItem("ultimaAtualizacao");

  // Se não existe uma palavra armazenada ou a data é diferente da atual
  if (!ultimaAtualizacao) {
    // Primeira execução, sorteia uma palavra e armazena
    const palavraDoDia = sortearPalavra();
    localStorage.setItem("palavraDoDia", palavraDoDia);
    localStorage.setItem("ultimaAtualizacao", agora.toISOString());
    return palavraDoDia;
  } else {
    const ultimaData = new Date(ultimaAtualizacao);
    // Se a data é diferente da atual
    if (
      agora.getDate() !== ultimaData.getDate() ||
      agora.getMonth() !== ultimaData.getMonth() ||
      agora.getFullYear() !== ultimaData.getFullYear()
    ) {
      // Limpa o localStorage para permitir novas tentativas
      localStorage.clear();
      const palavraDoDia = sortearPalavra();
      localStorage.setItem("palavraDoDia", palavraDoDia);
      localStorage.setItem("ultimaAtualizacao", agora.toISOString());
      return palavraDoDia;
    }
  }

  // Verifica se a palavra deve ser atualizada baseado no horário
  const palavraDoDia = localStorage.getItem("palavraDoDia");
  if (
    horarioAtualizacao.includes(horarioAtual) &&
    agora.getTime() - ultimaData.getTime() >= 0
  ) {
    // Se estamos no horário de atualização, mas a palavra já está fixa
    return palavraDoDia;
  }

  // Retorna a palavra do dia armazenada
  return palavraDoDia;
}

// Palavra do dia, sorteada
const palavraDoDia = getPalavraDoDia();

// Inicializa a variável tentativaAtual
let tentativaAtual = 1;

// Função para validar a palavra digitada pelo usuário
function validarPalavra(usuarioPalavra) {
  // Verifica se a palavra tem 5 letras
  if (usuarioPalavra.length === 5) {
    return true; // Palavra válida
  } else {
    return false; // Palavra inválida
  }
}

// Exporta a palavra do dia, a lista de palavras e a tentativa atual
export {
  palavraDoDia,
  palavrasSelecionadas,
  tentativaAtual,
  validarPalavra,
};
