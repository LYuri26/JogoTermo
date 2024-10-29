// modal.js

// Função para abrir o modal e carregar as regras
export function openModal() {
    const modalContainer = document.getElementById("modalContainer");

    // Carrega o conteúdo do modal
    fetch("./regras.html")
        .then(response => response.text())
        .then(data => {
            // Injetar o conteúdo e também o closeModal
            modalContainer.querySelector('.modal-content').innerHTML = data;

            // Inicializar o botão de fechamento
            modalContainer.querySelector('.close').onclick = closeModal; // Adiciona o evento para o botão de fechar

            // Mostrar o modal usando o Bootstrap
            $(modalContainer).modal('show');
        })
        .catch(error => console.error("Erro ao carregar as regras:", error));
}

// Função para fechar o modal
export function closeModal() {
    $('#modalContainer').modal('hide');
}

// Adiciona o event listener ao botão
document.getElementById("regrasButton").addEventListener("click", openModal);
