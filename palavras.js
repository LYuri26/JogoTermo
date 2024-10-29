// Lista de palavras que o usuário pode digitar (5 letras)
const palavrasPermitidas = [
    // Português
    "abaco", "abato", "afeto", "agito", "alaro", "alvo", "andar", "anima", "aroma", "atual",
    "aviso", "banco", "bicho", "bilho", "bloco", "borda", "botas", "braço", "briga", "cacho",
    "calor", "campo", "canal", "canto", "capas", "carro", "carta", "casal", "cesta", "cheio",
    "claro", "comer", "criar", "dicas", "dolar", "dosar", "dúzia", "eleva", "elevo", "emato",
    "falar", "fator", "fazer", "festa", "flame", "forca", "ganho", "garra", "gente", "grito",
    "grupo", "habas", "horas", "ideal", "idioma", "jogar", "jovem", "junho", "lares", "letra",
    "livro", "luvas", "maior", "marca", "media", "menos", "mesmo", "moeda", "morte", "muito",
    "neles", "notas", "nuvem", "oculo", "pacto", "papel", "pasta", "piano", "plano", "ponto",
    "prato", "quase", "raios", "real", "refor", "rocha", "salvo", "senso", "sinal", "sorte",
    "tampa", "tenda", "termo", "tempo", "tinta", "troco", "usar", "valor", "vasos", "vigor",
    "viver", "zebra", "zolar",

    // Inglês
    "apple", "alert", "array", "badge", "blast", "brain", "break", "bring", "broad", "candy",
    "chart", "chase", "check", "class", "clear", "cloud", "crate", "crush", "dance", "dream",
    "drive", "email", "event", "fetch", "frame", "globe", "grain", "green", "heart", "house",
    "laser", "lemon", "light", "music", "ocean", "paint", "point", "power", "pride", "quote",
    "raise", "robot", "scale", "score", "share", "shine", "slice", "smile", "space", "stack",
    "stone", "table", "taste", "think", "train", "truth", "tweet", "value", "video", "watch",
    "world", "yacht", "zebra", "zesty",

    "alert", "cache", "chart", "clear", "drive", "flash", "focus", "input", "model", "reset",
    "smart", "state", "track", "value", "voice", "virus"
];

// Lista de palavras selecionadas para o jogo (5 letras) - apenas palavras relacionadas a TI
const palavrasSelecionadas = [
    "alert", "cache", "chart", "drive", "flash", "focus", "input", "laser", "model", "reset",
    "smart", "state", "track", "value", "virus"
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

    // Limpa o localStorage sempre que a função é chamada
    localStorage.clear();

    // Verifica se já existe uma palavra armazenada
    let palavraDoDia = localStorage.getItem("palavraDoDia");

    // Se não existe ou se é um horário de atualização, sorteia uma nova palavra
    if (!palavraDoDia || horarioAtualizacao.includes(horarioAtual)) {
        palavraDoDia = sortearPalavra();
        localStorage.setItem("palavraDoDia", palavraDoDia);
        localStorage.setItem("ultimaAtualizacao", agora.toISOString());
    }

    return palavraDoDia;
}

// Palavra do dia, sorteada
const palavraDoDia = getPalavraDoDia();

// Inicializa a variável tentativaAtual
let tentativaAtual = 1;

// Exporta a palavra do dia, as listas de palavras e a tentativa atual
export { palavraDoDia, palavrasPermitidas, palavrasSelecionadas, tentativaAtual };
