let livros = JSON.parse(localStorage.getItem('livros')) || [];

function salvarLivros() {
    localStorage.setItem('livros', JSON.stringify(livros));
}

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

function removerLivro(indice) {
    livros.splice(indice, 1);
    salvarLivros();
    exibirLivros();
}

if (document.getElementById('livros')) {
    exibirLivros();
}


// Função para auto preencher os campos do formulário
document.getElementById('autoPreencher')?.addEventListener('click', function() {
    document.getElementById('titulo').value = 'O Cortiço';
    document.getElementById('autor').value = 'Aluísio Azevedo';
    document.getElementById('genero').value = 'Romance Naturalista';
    document.getElementById('ano').value = '1890';
    document.getElementById('codigoLivro').value = '123456'; // Código fictício
    document.getElementById('urlCapa').value = 'https://cdn.kobo.com/book-images/841c0a68-000b-4f9e-85d4-860c4eab03af/1200/1200/False/o-cortico-33.jpg';
    document.getElementById('editora').value = 'Livraria Garnier';
    document.getElementById('idioma').value = 'Português';
    document.getElementById('paginas').value = '250'; // Número fictício
    document.getElementById('descricao').value = 'O Cortiço é um romance naturalista do brasileiro Aluísio Azevedo publicado em 1890 que denuncia a exploração e as péssimas condições de vida dos moradores das estalagens ou dos cortiços cariocas do final do século XIX e posto a denunciar o capitalismo selvagem.';
});
