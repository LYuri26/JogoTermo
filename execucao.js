// script.js
import { palavraDoDia, palavrasPermitidas, tentativaAtual } from './palavras.js';

let tentativas = tentativaAtual; // Usar uma nova variável para controlar as tentativas

// Função para criar a estrutura das tentativas
function setupGame() {
    for (let i = 1; i <= 6; i++) {
        const row = document.getElementById(`attempt-${i}`);
        for (let j = 0; j < 5; j++) {
            const input = document.createElement("input");
            input.type = "text";
            input.classList.add("letter-box");
            input.style.position = "relative"; // Define a posição relativa para o cursor intermitente
            input.maxLength = 1;
            input.oninput = (event) => autoTab(input, row, j, event); // Passar o evento
            row.appendChild(input);
        }
        disableRowInputs(row); // Desativar todas as entradas na linha inicialmente
    }
    enableFirstRowInputs(); // Habilitar todos os campos da primeira tentativa
}

// Função para habilitar todos os campos da primeira linha
function enableFirstRowInputs() {
    const row = document.getElementById(`attempt-1`);
    Array.from(row.children).forEach(input => {
        input.disabled = false; // Habilita todos os inputs da primeira linha
    });
    row.children[0].focus(); // Foca no primeiro campo habilitado
}

// Função para habilitar o campo da tentativa atual
function enableInputForCurrentAttempt() {
    const row = document.getElementById(`attempt-${tentativas}`);
    Array.from(row.children).forEach(input => {
        input.disabled = false; // Habilita todos os inputs da tentativa atual
    });
    row.children[0].focus(); // Foca no primeiro campo habilitado
}

// Função para alternar entre caixas automaticamente e substituir letras
function autoTab(input, row, index, event) {
    // Substitui a letra se já houver uma
    if (event.inputType === "insertText" && input.value.length === 1) {
        // Se o campo já tiver uma letra, substitui
        row.children[index].value = input.value.toUpperCase();

        // Foca na próxima caixa se não for a última
        if (index < 4) {
            row.children[index + 1].focus();
        }
    }
}

// Função para enviar a tentativa
async function submitGuess() {
    const row = document.getElementById(`attempt-${tentativas}`);
    const guess = Array.from(row.children).map(input => input.value.toUpperCase()).join("");

    if (guess.length < 5) {
        document.getElementById("feedback").textContent = "Complete todas as letras da palavra.";
        return;
    }

    // Verifica a validade da palavra localmente primeiro
    if (!palavraValida(guess)) {
        document.getElementById("feedback").textContent = "Palavra inválida. Tente uma palavra válida.";
        enableInputForCurrentAttempt(); // Permite edição na tentativa atual
        return; // Retorna sem bloquear os inputs
    }

    mostrarTentativa(guess, row);
    tentativas++;

    if (guess === palavraDoDia) {
        document.getElementById("feedback").textContent = "Parabéns! Você acertou a palavra.";
        disableInputs();
    } else if (tentativas > 6) {
        document.getElementById("feedback").textContent = `Você esgotou as tentativas. A palavra era: ${palavraDoDia}`;
        mostrarLetrasFaltantes(row); // Mostrar letras da palavra
        disableInputs(); // Bloqueia todas as entradas após esgotar tentativas
    } else {
        blockInvalidInputs(row); // Bloqueia campos inválidos após uma tentativa válida
        enableInputForCurrentAttempt(); // Habilitar o campo da próxima tentativa
    }
}

// Função para mostrar o feedback visual da tentativa
function mostrarTentativa(guess, row) {
    for (let i = 0; i < 5; i++) {
        const box = row.children[i];
        if (guess[i] === palavraDoDia[i]) {
            box.classList.add("correct");
        } else if (palavraDoDia.includes(guess[i])) {
            box.classList.add("present");
        } else {
            box.classList.add("absent");
        }
    }
}

// Mostra as letras da palavra correta após esgotar as tentativas
function mostrarLetrasFaltantes(row) {
    for (let i = 0; i < 5; i++) {
        const box = row.children[i];
        box.value = palavraDoDia[i]; // Mostra a letra correta
    }
}

// Desativa os campos de entrada após a vitória ou a última tentativa
function disableInputs() {
    for (let i = 1; i <= 6; i++) {
        const row = document.getElementById(`attempt-${i}`);
        Array.from(row.children).forEach(input => input.disabled = true);
    }
}

// Função para desativar todas as entradas em uma linha
function disableRowInputs(row) {
    Array.from(row.children).forEach(input => input.disabled = true);
}

// Função para bloquear campos inválidos
function blockInvalidInputs(row) {
    Array.from(row.children).forEach((input, index) => {
        if (input.value.length > 0 && index < 5) {
            input.disabled = true; // Bloqueia campos que foram preenchidos
        }
    });
}

// Função para verificar se uma palavra está na lista permitida
function palavraValida(palavra) {
    return palavrasPermitidas.includes(palavra.toLowerCase());
}

// Adiciona a função submitGuess ao objeto window
window.submitGuess = submitGuess;

// Inicializa o jogo
setupGame();
