let resultadosAtuais = [];
let indiceAtual = -1;

function pesquisar() {
    const termo = document.getElementById("busca").value.toLowerCase().trim();
    
    if (termo === '') {
        alert("Por favor, digite um termo para pesquisar.");
        return;
    }

    document.querySelectorAll('.highlight').forEach(el => {
        el.classList.remove('highlight');
    });

    const elementos = document.body.querySelectorAll("p, h1, h2, h3, h4, h5, h6, li, td");
    
    resultadosAtuais = [];
    indiceAtual = -1;

    elementos.forEach(el => {
        const estilo = window.getComputedStyle(el);
        if (estilo.display !== 'none' && estilo.visibility !== 'hidden') {
            if (el.textContent.toLowerCase().includes(termo)) {
                resultadosAtuais.push(el);
            }
        }
    });

    if (resultadosAtuais.length === 0) {
        alert("Texto não encontrado na página.");
        return;
    }

    proximoResultado();
}

function proximoResultado() {
    if (resultadosAtuais.length === 0) return;
    

    if (indiceAtual >= 0) {
        resultadosAtuais[indiceAtual].classList.remove('highlight');
    }
    

    indiceAtual = (indiceAtual + 1) % resultadosAtuais.length;
    

    resultadosAtuais[indiceAtual].classList.add('highlight');
    resultadosAtuais[indiceAtual].scrollIntoView({ 
        behavior: "smooth", 
        block: "center" 
    });
    

    console.log(`Resultado ${indiceAtual + 1} de ${resultadosAtuais.length}`);
}

function abrirMenu() {
    document.getElementById('menuLateral').style.left = '0';
}

function fecharMenu() {
    document.getElementById('menuLateral').style.left = '-250px';
}

// Fechar menu ao clicar fora dele
document.addEventListener('click', function(event) {
    const menuLateral = document.getElementById('menuLateral');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (!menuLateral.contains(event.target) && event.target !== menuToggle) {
        fecharMenu();
    }
});

// Fechar menu ao pressionar a tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        fecharMenu();
    }
});