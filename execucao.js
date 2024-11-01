import { palavraDoDia, tentativaAtual } from './palavras.js';

let tentativas = tentativaAtual;

function setupGame() {
    for (let i = 1; i <= 6; i++) {
        const row = document.getElementById(`attempt-${i}`);
        for (let j = 0; j < 5; j++) {
            const input = document.createElement("input");
            input.type = "text";
            input.classList.add("letter-box");
            input.style.position = "relative";
            input.maxLength = 1;
            input.autocomplete = "off";

            input.oninput = (event) => {
                const value = input.value.toUpperCase();

                // Regex para aceitar letras de A-Z, acentuadas e caracteres especiais
                if (!/^[A-ZÀ-ÖØ-ÿ]$/.test(value)) {  // Adicionando acentos e caracteres especiais
                    input.value = "";
                    return;
                }

                input.value = value;
                autoTab(input, row, j, event);
            };

            input.onfocus = () => scrollToInput(input);
            input.onkeydown = (event) => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    submitGuess();
                }
            };

            input.onclick = () => {
                input.value = '';
                input.focus();
            };

            row.appendChild(input);
        }
        disableRowInputs(row);
    }
    enableFirstRowInputs();
}

function scrollToInput(input) {
    input.scrollIntoView({ behavior: "smooth", block: "center" });
}

function enableFirstRowInputs() {
    const row = document.getElementById(`attempt-1`);
    Array.from(row.children).forEach(input => {
        input.disabled = false;
    });
    row.children[0].focus();
}

function enableInputForCurrentAttempt() {
    const row = document.getElementById(`attempt-${tentativas}`);
    Array.from(row.children).forEach(input => {
        input.disabled = false;
    });
    row.children[0].focus();
}

function autoTab(input, row, index, event) {
    if (event.inputType === "insertText" && input.value.length === 1) {
        if (index < 4) {
            row.children[index + 1].focus();
        }
    }
}

function validateGuess(guess) {
    // Expressão regular para detectar quatro ou mais vogais consecutivas
    const regexQuatroVogais = /[AEIOUÀ-ÖØ-ÿ]{4,}/;  // Inclui acentos

    // Verifica se há quatro ou mais vogais consecutivas
    if (regexQuatroVogais.test(guess)) {
        showFeedback("Sequências de quatro ou mais vogais consecutivas são proibidas.");
        return false;
    }

    // Expressão regular para detectar sequências de três ou mais consoantes consecutivas
    const regexConsoantes = /[^AEIOUÀ-ÖØ-ÿ]{3,}/;  // Inclui acentos
    if (regexConsoantes.test(guess)) {
        showFeedback("Sequências de três ou mais consoantes consecutivas são proibidas.");
        return false;
    }

    // Verifica se há uma sequência alfabética de três ou mais letras consecutivas
    let count = 1; // Contador para letras consecutivas
    for (let i = 1; i < guess.length; i++) {
        if (guess.charCodeAt(i) - guess.charCodeAt(i - 1) === 1) {
            count++; // Incrementa o contador se for uma sequência
            if (count >= 3) {
                showFeedback("Sequências alfabéticas consecutivas de três ou mais letras são proibidas.");
                return false;
            }
        } else {
            count = 1; // Reseta o contador se não for sequência
        }
    }

    // Verifica se há três ou mais consoantes idênticas consecutivas
    for (let i = 2; i < guess.length; i++) {
        if (guess[i] === guess[i - 1] && guess[i] === guess[i - 2] && !/[AEIOUÀ-ÖØ-ÿ]/.test(guess[i])) {
            showFeedback("Sequências de três ou mais consoantes iguais consecutivas são proibidas.");
            return false;
        }
    }

    return true;
}



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

    if (!validateGuess(guess)) {
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

function showFeedback(message) {
    const feedback = document.getElementById("feedback");
    feedback.textContent = message;
    feedback.classList.add("show");
    feedback.scrollIntoView({ behavior: "smooth", block: "center" });
}

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

function mostrarLetrasFaltantes(row) {
    for (let i = 0; i < 5; i++) {
        const box = row.children[i];
        box.value = palavraDoDia[i];
    }
}

function disableInputs() {
    for (let i = 1; i <= 6; i++) {
        const row = document.getElementById(`attempt-${i}`);
        Array.from(row.children).forEach(input => input.disabled = true);
    }
}

function disableRowInputs(row) {
    Array.from(row.children).forEach(input => input.disabled = true);
}

function blockInvalidInputs(row) {
    Array.from(row.children).forEach((input, index) => {
        if (input.value.length > 0 && index < 5) {
            input.disabled = true;
        }
    });
}

function palavraValida(palavra) {
    return palavra.length === 5;
}

window.submitGuess = submitGuess;
setupGame();
