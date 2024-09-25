let livros = JSON.parse(localStorage.getItem('livros')) || [];
let indiceAtual = null; // indice pra usaer no vetor

//banco local
function salvarLivros() {
    localStorage.setItem('livros', JSON.stringify(livros));
}

// exibir
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
                <small>${livro.descricao}</small><br>
                <button onclick="removerLivro(${indice})">Remover</button>
                <button onclick="editarLivro(${indice})">Editar</button>
            `;
            listaLivros.appendChild(li);
        });
    }
}

// abrir modal pra poder editar o campo especifico do livro[i] atual
function abrirModalEditar(livro, indice) {
    document.getElementById('modalEditar').style.display = 'flex';
    document.getElementById('editTitulo').value = livro.titulo;
    document.getElementById('editAutor').value = livro.autor;
    document.getElementById('editGenero').value = livro.genero;
    document.getElementById('editAno').value = livro.ano;
    document.getElementById('editCodigoLivro').value = livro.codigoLivro;
    document.getElementById('editUrlCapa').value = livro.urlCapa;
    document.getElementById('editEditora').value = livro.editora;
    document.getElementById('editIdioma').value = livro.idioma;
    document.getElementById('editPaginas').value = livro.paginas;
    document.getElementById('editDescricao').value = livro.descricao;
    indiceAtual = indice;
}

// fechar modal
document.getElementById('fecharModal')?.addEventListener('click', function() {
    document.getElementById('modalEditar').style.display = 'none';
});

// salvar modal
document.getElementById('salvarEdicao')?.addEventListener('click', function() {
    const livroEditado = {
        titulo: document.getElementById('editTitulo').value,
        autor: document.getElementById('editAutor').value,
        genero: document.getElementById('editGenero').value,
        ano: document.getElementById('editAno').value,
        codigoLivro: document.getElementById('editCodigoLivro').value,
        urlCapa: document.getElementById('editUrlCapa').value,
        editora: document.getElementById('editEditora').value,
        idioma: document.getElementById('editIdioma').value,
        paginas: document.getElementById('editPaginas').value,
        descricao: document.getElementById('editDescricao').value
    };

    livros[indiceAtual] = livroEditado;
    salvarLivros();
    exibirLivros();
    document.getElementById('modalEditar').style.display = 'none';
});

// novo livro
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

// apafgzr livro
function removerLivro(indice) {
    livros.splice(indice, 1);
    salvarLivros();
    exibirLivros();
}

// editar qeu chama a funcao de abrir o modal
function editarLivro(indice) {
    const livro = livros[indice];
    abrirModalEditar(livro, indice);
}

// auto preencher
document.getElementById('autoPreencher')?.addEventListener('click', function() {
    document.getElementById('titulo').value = 'O Cortiço';
    document.getElementById('autor').value = 'Aluísio Azevedo';
    document.getElementById('genero').value = 'Romance Naturalista';
    document.getElementById('ano').value = '1890';
    document.getElementById('codigoLivro').value = '123456';
    document.getElementById('urlCapa').value = 'https://cdn.kobo.com/book-images/841c0a68-000b-4f9e-85d4-860c4eab03af/1200/1200/False/o-cortico-33.jpg';
    document.getElementById('editora').value = 'Livraria Garnier';
    document.getElementById('idioma').value = 'Português';
    document.getElementById('paginas').value = '250';
    document.getElementById('descricao').value = 'O Cortiço é um romance naturalista do brasileiro Aluísio Azevedo publicado em 1890 que denuncia a exploração e as péssimas condições de vida dos moradores das estalagens ou dos cortiços cariocas do final do século XIX e posto a denunciar o capitalismo selvagem.';
});

// update pra nao sumir ao dar f5 na pagina
if (document.getElementById('livros')) {
    exibirLivros();
}
