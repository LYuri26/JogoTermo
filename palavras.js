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

// Lista de dicas para cada palavra
const dicas = [
  "Notificação importante", // alert
  "Local de armazenamento temporário", // cache
  "Representação visual de dados", // chart
  "Dispositivo de armazenamento", // drive
  "Efeito luminoso rápido", // flash
  "Ponto de concentração", // focus
  "Local onde você insere dados", // input
  "Tecnologia que utiliza feixes de luz", // laser
  "Modelo ou estrutura de algo", // model
  "Ação de reiniciar um sistema", // reset
  "Capacidade de aprender e se adaptar", // smart
  "Situação ou condição atual", // state
  "Rastreamento de dados ou informações", // track
  "Quantidade numérica", // value
  "Software malicioso que infecta sistemas", // virus
  "Conjunto de informações organizadas", // dados
  "Processo de avaliar ou experimentar", // teste
  "Unidade de informação digital", // bytes
  "Instrução para máquinas ou sistemas", // código
  "Credencial de acesso a sistemas", // login
  "Armazenamento remoto de dados", // cloud
  "Código secreto para acesso", // senha
  "Conexão entre computadores", // rede
  "digitar", // tecla
  "Posição ou lugar específico", // ponto
  "Sinalização de conexão", // sinal
  "Software que controla hardware", // driver
  "Processo de encontrar e corrigir erros", // debug
  "Versão mais recente de algo", // atual
  "Conjunto de elementos relacionados", // array
  "Segmento ou parte de dados", // block
  "Correio digital", // email
  "Pedido de informação a um banco de dados", // query
  "Atualização ou correção de software", // patch
  "Processo de reproduzir documentos", // print
  "Conexão entre páginas da web", // link
  "Acompanhamento de atividades", // trace
  "Cabo que conecta dispositivos", // cable
  "Notificação ou alerta de um evento", // alert
  "Identificador de um objeto ou item", // label
  "Máquina autônoma que executa tarefas", // robot
  "Área de atuação ou abrangência de algo", // scope
  "Representação visual de algo", // image
  "Organização de elementos em sequência", // order
  "Estrutura que organiza dados", // table
  "Dispositivo usado para entrada de dados", // mouse
  "Instituição educacional brasileira", // senai
  "Tecla para enviar ou confirmar", // enter
  "Melhor instrutor do SENAI", // lenon
  "Kernel", // linux
  "Entusiasta de jogos eletrônicos", // gamer
  "Símbolo em redes sociais para categorização", // haste
  "Tensão ou drama em histórias", // drama
  "Avanço ou progresso em tecnologia", // salto
  "Estrutura temporária para eventos", // tenda
  "Entrada para eventos ou jogos", // passe
  "Atividade recreativa ou de entretenimento", // lazer
  "Frase memorável ou popular", // frase
  "Celebração ou evento festivo", // festa
  "Efeito visual em fotografia", // flash
  "Reação de riso ou humor", // risos
  "Sorte ou oportunidade em jogos", // sorte
  "Conjunto musical ou banda", // banda
  "Grupo de três elementos ou pessoas", // trio
  "Ação de clicar em algo digital", // click
  "Registro visual capturado", // foto
  "Cultura de compartilhamento online", // meme
  "Movimento rápido em aplicativos", // swipe
  "Cor ou tom específico", // pinky
  "Área de tecnologia e segurança cibernética", // cyber
  "Sentimento de excitação ou entusiasmo", // hypee
  "Conteúdo que se espalha rapidamente", // viral
  "Pontuação em jogos ou competições", // score
  "Estilo de conduzir veículos ou jogar", // drift
  "Destaque ou destaque especial", // desta
  "Clichê ou tropo comum", // tropo
  "Ícone ou símbolo usado em comunicação", // emoji
  "Algo que está prestes a ocorrer", // quase
  "Faixa musical ou trilha sonora", // track
  "Nível ou estágio em jogos", // level
  "Instrumento musical de teclas", // piano
  "Ave comum em áreas urbanas", // pombo
];


// Função para sortear uma palavra da lista de palavras selecionadas
function sortearPalavra() {
  const randomIndex = Math.floor(Math.random() * palavrasSelecionadas.length);
  return {
    palavra: palavrasSelecionadas[randomIndex].toUpperCase(),
    dica: dicas[randomIndex]
  };
}

// Função para verificar se a palavra do dia deve ser atualizada
function getPalavraDoDia() {
  const agora = new Date();
  const horarioAtual = agora.getHours() * 60 + agora.getMinutes(); // Minutos desde a meia-noite
  const horariosDeAtualizacao = [480, 810, 1080]; // Horários de atualização em minutos: 08:00, 13:30, 18:00

  // Obtém a data e horário da última atualização
  const ultimaAtualizacao = localStorage.getItem("ultimaAtualizacao");

  // Se não existe uma palavra armazenada ou a data é diferente da atual
  if (!ultimaAtualizacao) {
    // Primeira execução, sorteia uma palavra e armazena
    const { palavra, dica } = sortearPalavra();
    localStorage.setItem("palavraDoDia", palavra);
    localStorage.setItem("dicaDoDia", dica);
    localStorage.setItem("ultimaAtualizacao", agora.toISOString());
    exibirDica(dica);
    return palavra;
  } else {
    const ultimaData = new Date(ultimaAtualizacao);

    // Verifica se já passou um dos horários de atualização
    const palavraDoDia = localStorage.getItem("palavraDoDia");
    const dicaDoDia = localStorage.getItem("dicaDoDia");

    for (let horario of horariosDeAtualizacao) {
      if (horarioAtual >= horario && ultimaData.getTime() < agora.setHours(0, horario, 0, 0)) {
        const { palavra, dica } = sortearPalavra();
        localStorage.setItem("palavraDoDia", palavra);
        localStorage.setItem("dicaDoDia", dica);
        localStorage.setItem("ultimaAtualizacao", agora.toISOString());
        exibirDica(dica);
        return palavra;
      }
    }

    exibirDica(dicaDoDia); // Exibe a dica armazenada
    return palavraDoDia;
  }
}

// Função para exibir a dica no HTML
function exibirDica(dica) {
  const dicaElemento = document.getElementById("dica");
  if (dicaElemento) {
    dicaElemento.textContent = `Dica: ${dica}`;
  }
}

// Palavra do dia, sorteada
const palavraDoDia = getPalavraDoDia();

// Inicializa a variável tentativaAtual
let tentativaAtual = 1;

// Função para validar a palavra digitada pelo usuário
function validarPalavra(usuarioPalavra) {
  // Verifica se a palavra tem 5 letras
  return usuarioPalavra.length === 5;
}

// Exporta a palavra do dia, a lista de palavras e a tentativa atual
export {
  palavraDoDia,
  palavrasSelecionadas,
  tentativaAtual,
  validarPalavra
};