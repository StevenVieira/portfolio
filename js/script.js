// =========================
// BOTÃO VER PROJETOS
// =========================

const botaoProjetos = document.querySelector("#inicio button");

botaoProjetos.addEventListener("click", function () {

    document.querySelector("#projetos").scrollIntoView({
        behavior: "smooth"
    });

});


// =========================
// EFEITO DE DIGITAÇÃO
// =========================

const texto = document.querySelector("#texto-digitando");

const palavras = [
    "Desenvolvedor em formação",
    "Programador JavaScript",
    "Desenvolvedor Full Stack",
    "Futuro Software Engineer"
];

let palavraAtual = 0;
let caractereAtual = 0;
let apagando = false;


function escreverTexto() {

    const palavra = palavras[palavraAtual];

    if (!apagando) {

        texto.textContent = palavra.substring(
            0,
            caractereAtual + 1
        );

        caractereAtual++;

        if (caractereAtual === palavra.length) {

            apagando = true;

            setTimeout(escreverTexto, 2000);

            return;
        }

    } else {

        texto.textContent = palavra.substring(
            0,
            caractereAtual - 1
        );

        caractereAtual--;

        if (caractereAtual === 0) {

            apagando = false;

            palavraAtual++;

            if (palavraAtual === palavras.length) {
                palavraAtual = 0;
            }

        }

    }

    const velocidade = apagando ? 50 : 100;

    setTimeout(escreverTexto, velocidade);
}


escreverTexto();


// =========================
// TEMA CLARO / ESCURO
// =========================

const botaoTema = document.querySelector("#tema-btn");

botaoTema.addEventListener("click", function () {

    document.body.classList.toggle("tema-claro");

    if (document.body.classList.contains("tema-claro")) {

        botaoTema.textContent = "🌙";

    } else {

        botaoTema.textContent = "☀️";

    }

});


// =========================
// MENU MOBILE
// =========================

const botaoMenu = document.querySelector("#menu-btn");

const menu = document.querySelector("#menu");

const linksMenu = document.querySelectorAll("#menu a");


botaoMenu.addEventListener("click", function () {

    menu.classList.toggle("menu-aberto");

});


linksMenu.forEach(function (link) {

    link.addEventListener("click", function () {

        menu.classList.remove("menu-aberto");

    });

});


// =========================
// PROJETOS
// =========================

const projetos = [

    {
        id: 1,

        nome: "Sistema de Cadastro",

        descricao: "Sistema de cadastro com registro, login e autenticação de usuários.",

        tecnologia: "javascript",

        tecnologias: ["HTML", "CSS", "JavaScript", "Node.js"],

        imagem: "assets/img/cadastro.jpg",

        projeto: "#",

        github: "#"
    },

    {
        id: 2,

        nome: "Tabuada",

        descricao: "Aplicação simples para gerar tabuadas utilizando JavaScript.",

        tecnologia: "javascript",

        tecnologias: ["HTML", "CSS", "JavaScript"],

        imagem: "assets/img/tabuada.jpg",

        projeto: "#",

        github: "#"
    },

    {
        id: 3,

        nome: "Calculadora Python",

        descricao: "Calculadora desenvolvida para praticar lógica de programação com Python.",

        tecnologia: "python",

        tecnologias: ["Python"],

        imagem: "assets/img/calculadora.jpg",

        projeto: "#",

        github: "#"
    },

    {
        id: 4,

        nome: "Sistema em C#",

        descricao: "Projeto desenvolvido para praticar conceitos de programação utilizando C#.",

        tecnologia: "csharp",

        tecnologias: ["C#"],

        imagem: "assets/img/csharp.jpg",

        projeto: "#",

        github: "#"
    }

];


// =========================
// MOSTRAR PROJETOS
// =========================

const listaProjetos = document.querySelector("#lista-projetos");


function mostrarProjetos(lista) {

    listaProjetos.innerHTML = "";

    lista.forEach(function (projeto) {

        const card = document.createElement("article");

        card.classList.add("projeto");

        const tecnologiasHTML = projeto.tecnologias
            .map(function (tecnologia) {

                return `
                    <span class="tecnologia">
                        ${tecnologia}
                    </span>
                `;

            })
            .join("");


        card.innerHTML = `

            <img
                src="${projeto.imagem}"
                alt="Imagem do projeto ${projeto.nome}"
                class="projeto-imagem"
            >

            <div class="projeto-conteudo">

                <h3>
                    ${projeto.nome}
                </h3>

                <p>
                    ${projeto.descricao}
                </p>

                <div class="tecnologias">
                    ${tecnologiasHTML}
                </div>

                <div class="projeto-botoes">

                    <button
                        class="abrir-modal"
                        data-id="${projeto.id}"
                    >
                        Ver projeto
                    </button>

                    <a
                        href="${projeto.github}"
                        target="_blank"
                    >
                        <button class="botao-github">
                            GitHub
                        </button>
                    </a>

                </div>

            </div>

        `;

        listaProjetos.appendChild(card);

    });

}


// Mostrar todos os projetos ao carregar
mostrarProjetos(projetos);


// =========================
// FILTROS
// =========================

const botoesFiltro = document.querySelectorAll(".filtro");


botoesFiltro.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const filtro = botao.dataset.filtro;


        // Remove o destaque de todos os botões
        botoesFiltro.forEach(function (botao) {

            botao.classList.remove("ativo");

        });


        // Destaca o botão clicado
        botao.classList.add("ativo");


        // Se for "Todos", mostra todos
        if (filtro === "todos") {

            mostrarProjetos(projetos);

            return;
        }


        // Filtra os projetos
        const projetosFiltrados = projetos.filter(function (projeto) {

            return projeto.tecnologia === filtro;

        });


        // Mostra os projetos filtrados
        mostrarProjetos(projetosFiltrados);

    });

});

// =========================
// MODAL DOS PROJETOS
// =========================

const modal = document.querySelector("#modal-projeto");

const fecharModal = document.querySelector("#fechar-modal");

const modalImagem = document.querySelector("#modal-imagem");

const modalTitulo = document.querySelector("#modal-titulo");

const modalDescricao = document.querySelector("#modal-descricao");

const modalTecnologias = document.querySelector("#modal-tecnologias");

const modalProjeto = document.querySelector("#modal-link-projeto");

const modalGithub = document.querySelector("#modal-github");

function abrirModal(projeto) {

    modalImagem.src = projeto.imagem;

    modalImagem.alt = `Imagem do projeto ${projeto.nome}`;

    modalTitulo.textContent = projeto.nome;

    modalDescricao.textContent = projeto.descricao;

    modalProjeto.href = projeto.projeto;

    modalGithub.href = projeto.github;


    modalTecnologias.innerHTML = "";


    projeto.tecnologias.forEach(function (tecnologia) {

        const tag = document.createElement("span");

        tag.classList.add("tecnologia");

        tag.textContent = tecnologia;

        modalTecnologias.appendChild(tag);

    });


    modal.classList.add("modal-aberto");

}

function configurarBotoesModal() {

    const botoesModal = document.querySelectorAll(".abrir-modal");


    botoesModal.forEach(function (botao) {

        botao.addEventListener("click", function () {

            const id = Number(botao.dataset.id);


            const projeto = projetos.find(function (projeto) {

                return projeto.id === id;

            });


            abrirModal(projeto);

        });

    });

}

// =========================
// TESTE / ABRIR MODAL
// =========================

document.addEventListener("click", function (evento) {

    if (evento.target.classList.contains("abrir-modal")) {

        const id = Number(evento.target.dataset.id);

        const projeto = projetos.find(function (projeto) {
            return projeto.id === id;
        });

        if (!projeto) {
            console.error("Projeto não encontrado:", id);
            return;
        }

        abrirModal(projeto);
    }

});

// =========================
// FECHAR MODAL
// =========================

function fecharModalProjeto() {

    modal.classList.remove("modal-aberto");

}


// Fechar pelo X
fecharModal.addEventListener("click", function () {

    fecharModalProjeto();

});


// Fechar pressionando ESC
document.addEventListener("keydown", function (evento) {

    if (evento.key === "Escape") {

        fecharModalProjeto();

    }

});


// Fechar clicando fora do conteúdo
modal.addEventListener("click", function (evento) {

    if (evento.target === modal) {

        fecharModalProjeto();

    }

});

const elementosAnimados = document.querySelectorAll("section, .projeto, .habilidade");

elementosAnimados.forEach(function (elemento) {
    elemento.classList.add("animar");
});

const observador = new IntersectionObserver(
    function (elementos) {
        elementos.forEach(function (elemento) {
            if (elemento.isIntersecting) {
                elemento.target.classList.add("visivel");
            }
        });
    },

    {
        threshold: 0.15
    }
);

elementosAnimados.forEach(function (elemento) {
    observador.observe(elemento);
});

function observarAnimacao(elemento) {

    elemento.classList.add("animar");

    observador.observe(elemento);

}

// =========================
// ANIMAÇÃO DAS HABILIDADES
// =========================

const barrasProgresso = document.querySelectorAll(".progresso");


const observadorHabilidades = new IntersectionObserver(

    function (elementos) {

        elementos.forEach(function (elemento) {

            if (elemento.isIntersecting) {

                const nivel = elemento.target.dataset.nivel;

                elemento.target.style.width = `${nivel}%`;

                observadorHabilidades.unobserve(
                    elemento.target
                );

            }

        });

    },

    {
        threshold: 0.5
    }

);


barrasProgresso.forEach(function (barra) {

    observadorHabilidades.observe(barra);

});

// =========================
// FORMULÁRIO DE CONTATO
// =========================

const formulario = document.querySelector("#formulario-contato");

const campoNome = document.querySelector("#nome");

const campoEmail = document.querySelector("#email");

const campoMensagem = document.querySelector("#mensagem");

const erroNome = document.querySelector("#erro-nome");

const erroEmail = document.querySelector("#erro-email");

const erroMensagem = document.querySelector("#erro-mensagem");

const mensagemSucesso = document.querySelector("#mensagem-sucesso");

function emailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

formulario.addEventListener("submit", function (evento) {

    evento.preventDefault();


    // Limpar mensagens anteriores

    erroNome.textContent = "";

    erroEmail.textContent = "";

    erroMensagem.textContent = "";

    mensagemSucesso.textContent = "";


    let formularioValido = true;


    // =========================
    // VALIDAR NOME
    // =========================

    if (campoNome.value.trim() === "") {

        erroNome.textContent =
            "Digite seu nome.";

        formularioValido = false;

    }


    // =========================
    // VALIDAR EMAIL
    // =========================

    if (campoEmail.value.trim() === "") {

        erroEmail.textContent =
            "Digite seu e-mail.";

        formularioValido = false;

    }

    else if (!emailValido(campoEmail.value)) {

        erroEmail.textContent =
            "Digite um e-mail válido.";

        formularioValido = false;

    }


    // =========================
    // VALIDAR MENSAGEM
    // =========================

    if (campoMensagem.value.trim() === "") {

        erroMensagem.textContent =
            "Digite uma mensagem.";

        formularioValido = false;

    }

    else if (campoMensagem.value.trim().length < 10) {

        erroMensagem.textContent =
            "A mensagem deve ter pelo menos 10 caracteres.";

        formularioValido = false;

    }


    // =========================
    // FORMULÁRIO VÁLIDO
    // =========================

    if (formularioValido) {

        mensagemSucesso.textContent =
            "Mensagem validada com sucesso!";

        formulario.reset();

    }

});