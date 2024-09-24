let livros = JSON.parse(localStorage.getItem('livros')) || [];

// Função para salvar livros no armazenamento local
function salvarLivros() {
    localStorage.setItem('livros', JSON.stringify(livros));
}

// Exibir livros na página de listagem
function exibirLivros() {
    const listaLivros = document.getElementById('livros');
    if (listaLivros) {
        listaLivros.innerHTML = '';

        livros.forEach((livro, indice) => {
            const li = document.createElement('li');
            li.className = 'livro-item';
            li.innerHTML = `
                <strong>${livro.titulo}</strong> por ${livro.autor} (${livro.ano})<br>
                <img src="${livro.urlCapa}" alt="Capa do Livro" style="width:100px;"><br>
                <em>Gênero: ${livro.genero}</em><br>
                <small>${livro.descricao}</small>
                <button onclick="removerLivro(${indice})">Remover</button>
            `;
            listaLivros.appendChild(li);
        });
    }
}

// Adicionar um novo livro
document.getElementById('formularioLivro')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const novoLivro = {
        titulo: document.getElementById('titulo').value,
        autor: document.getElementById('autor').value,
        genero: document.getElementById('genero').value,
        ano: document.getElementById('ano').value,
        codigoLivro: document.getElementById('codigoLivro').value,
        urlCapa: document.getElementById('urlCapa').value,
        editora: document.getElementById('editora').value,
        idioma: document.getElementById('idioma').value,
        paginas: document.getElementById('paginas').value,
        descricao: document.getElementById('descricao').value
    };

    livros.push(novoLivro);
    salvarLivros();
    exibirLivros();
    this.reset();
});

// Remover um livro
function removerLivro(indice) {
    livros.splice(indice, 1);
    salvarLivros();
    exibirLivros();
}

// Exibir livros na página de listagem ao carregar
if (document.getElementById('livros')) {
    exibirLivros();
}
