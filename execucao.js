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
            input.style.position = "relative";
            input.maxLength = 1;
            input.autocomplete = "off";  // Evitar autocompletar em celulares

            // Ajustes para foco e rolagem automática em celulares
            input.onfocus = () => scrollToInput(input);  // Rola a página para o campo atual
            input.oninput = (event) => autoTab(input, row, j, event);

            input.onkeydown = (event) => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    submitGuess();
                }
            };

            row.appendChild(input);
        }
        disableRowInputs(row);
    }
    enableFirstRowInputs();
}

// Função para rolar a tela até o campo atual em celulares
function scrollToInput(input) {
    input.scrollIntoView({ behavior: "smooth", block: "center" });
}

// Função para habilitar todos os campos da primeira linha
function enableFirstRowInputs() {
    const row = document.getElementById(`attempt-1`);
    Array.from(row.children).forEach(input => {
        input.disabled = false;
    });
    row.children[0].focus();
}

// Função para habilitar o campo da tentativa atual
function enableInputForCurrentAttempt() {
    const row = document.getElementById(`attempt-${tentativas}`);
    Array.from(row.children).forEach(input => {
        input.disabled = false;
    });
    row.children[0].focus();
}

// Função para alternar entre caixas automaticamente e substituir letras
function autoTab(input, row, index, event) {
    if (event.inputType === "insertText" && input.value.length === 1) {
        row.children[index].value = input.value.toUpperCase();
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
        showFeedback("Complete todas as letras da palavra.");
        return;
    }

    if (!palavraValida(guess)) {
        showFeedback("Palavra inválida. Tente uma palavra válida.");
        enableInputForCurrentAttempt();
        return;
    }

    mostrarTentativa(guess, row);
    tentativas++;

    if (guess === palavraDoDia) {
        showFeedback("Parabéns! Você acertou a palavra.");
        disableInputs();
    } else if (tentativas > 6) {
        showFeedback(`Você esgotou as tentativas. A palavra era: ${palavraDoDia}`);
        mostrarLetrasFaltantes(row);
        disableInputs();
    } else {
        blockInvalidInputs(row);
        enableInputForCurrentAttempt();
    }
}

// Função para mostrar o feedback e rolar para ele
function showFeedback(message) {
    const feedback = document.getElementById("feedback");
    feedback.textContent = message;
    feedback.classList.add("show");
    feedback.scrollIntoView({ behavior: "smooth", block: "center" });
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
        box.value = palavraDoDia[i];
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
            input.disabled = true;
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
