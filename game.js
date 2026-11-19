const ERAS = [
  {
    nome: "Lover",
    tempo: 12,
    opcoes: [
      "Body brilhante rosa e azul Versace + botas Louboutin",
      "Body laranja e roxo + blazer preto com listras brilhantes ('The Man')",
      "Body azul e dourado + jaqueta brilhante prateada",
      "Body rosa choque + botas de cano alto brilhantes",
    ],
    correta: 1,
  },
  {
    nome: "Fearless",
    tempo: 10,
    opcoes: [
      "Vestido prateado curto com franjas em camadas (versão original 2023)",
      "Vestido dourado curto com franjas Roberto Cavalli + botas",
      "Vestido curto de franjas pretas e prateadas estilo 'tiger stripes'",
      "Vestido curto de franjas douradas com degradê preto na barra",
    ],
    correta: 2,
  },
  {
    nome: "Red",
    tempo: 10,
    opcoes: [
      "Macacão vermelho e preto brilhante assimétrico ('I Knew You Were Trouble')",
      "Sobretudo vermelho brilhante de lantejoulas ('All Too Well 10 Minute Version')",
      "Camiseta branca com frase + chapéu preto + mocassim",
      "Camiseta branca 'Who's Taylor Swift Anyway? Ew.' + shorts preto",
    ],
    correta: 3,
  },
  {
    nome: "Speak Now",
    tempo: 11,
    opcoes: [
      "Vestido de baile roxo volumoso e brilhante",
      "Vestido de baile champagne/dourado com camadas de tule ('Enchanted')",
      "Vestido de baile rosa claro estilo princesa com brilho",
      "Vestido de baile azul claro cintilante com saia volumosa",
    ],
    correta: 1,
  },
  {
    nome: "Reputation",
    tempo: 9,
    opcoes: [
      "Macacão preto assimétrico com cobras douradas (novo figurino de 2024)",
      "Macacão preto assimétrico com cobras vermelhas",
      "Body preto de mangas compridas com capuz e detalhes brilhantes ('Ready For It')",
    ],
    correta: 2,
  },
  {
    nome: "Folklore & Evermore",
    tempo: 11,
    opcoes: [
      "Vestido amarelo mostarda fluido + capa de veludo verde escuro ('Willow')",
      "Vestido lilás/roxo fluido de chiffon com mangas soltas",
      "Vestido fluido estilo boho/cottagecore (verde ou creme)",
      "Vestido rosa claro esvoaçante com detalhes bordados",
    ],
    correta: 3,
  },
  {
    nome: "1989",
    tempo: 9,
    opcoes: [
      "Conjunto brilhante rosa de top e saia patinadora + botas combinando",
      "Conjunto brilhante azul de top e saia patinadora + botas combinando",
      "Conjunto brilhante verde de top e saia patinadora + botas combinando",
      "Conjunto brilhante amarelo de top e saia patinadora + botas combinando",
    ],
    correta: 1,
  },
  {
    nome: "The Tortured Poets Department (TTPD)",
    tempo: 9,
    opcoes: [
      "Conjunto branco de duas peças (top e hot pants) + casaco militar branco ('I Can Do It With a Broken Heart')",
      "Conjunto dourado brilhante de duas peças + jaqueta com franjas douradas",
      "Vestido branco drapeado com letras manuscritas + gargantilha",
      "Vestido preto dramático de veludo com luvas longas pretas ('Who's Afraid of Little Old Me?')",
    ],
    correta: 3,
  },
  {
    nome: "Midnights",
    tempo: 8,
    opcoes: [
      "Camiseta oversized rosa + casaco de pele sintética lilás + body azul claro",
      "Camiseta oversized brilhante + casaco de pele sintética + body azul",
      "Camiseta oversized prateada + casaco de pele sintética azul escuro + body preto recortado",
      "Camiseta oversized azul marinho + casaco de pele sintética branco + body com franjas de cristais",
    ],
    correta: 2,
  },
];

let indiceAtual = 0;
let pontuacao = 0;
let intervaloTimer = null;
let inicioRodada = 0;

// Elementos do DOM
const telaInicial = document.getElementById("tela-inicial");
const telaJogo = document.getElementById("tela-jogo");
const telaFinal = document.getElementById("tela-final");

const contadorAto = document.getElementById("contador-ato");
const timerBox = document.getElementById("timer-box");
const tempoRestanteEl = document.getElementById("tempo-restante");
const nomeEraEl = document.getElementById("nome-era");
const listaOpcoesEl = document.getElementById("lista-opcoes");
const feedbackEl = document.getElementById("feedback");

const pontuacaoFinalEl = document.getElementById("pontuacao-final");
const mensagemFinalEl = document.getElementById("mensagem-final");

document.getElementById("btn-iniciar").addEventListener("click", iniciarJogo);
document.getElementById("btn-reiniciar").addEventListener("click", iniciarJogo);

function iniciarJogo() {
  indiceAtual = 0;
  pontuacao = 0;
  telaInicial.classList.add("oculto");
  telaFinal.classList.add("oculto");
  telaJogo.classList.remove("oculto");
  carregarEra();
}

function carregarEra() {
  const era = ERAS[indiceAtual];
  contadorAto.textContent = `ATO ${indiceAtual + 1}/${ERAS.length}`;
  nomeEraEl.textContent = `ERA ${era.nome.toUpperCase()}`;
  feedbackEl.className = "feedback oculto";
  feedbackEl.innerHTML = "";
  listaOpcoesEl.innerHTML = "";
  timerBox.classList.remove("urgente");

  era.opcoes.forEach((textoOpcao, idx) => {
    const botao = document.createElement("button");
    botao.className = "btn-opcao";
    botao.textContent = `[${idx + 1}] ${textoOpcao}`;
    botao.addEventListener("click", () => verificarResposta(idx + 1));
    listaOpcoesEl.appendChild(botao);
  });

  iniciarCronometro(era.tempo);
}

function iniciarCronometro(tempoLimite) {
  clearInterval(intervaloTimer);
  inicioRodada = Date.now();
  tempoRestanteEl.textContent = tempoLimite.toFixed(1);

  intervaloTimer = setInterval(() => {
    const decorrido = (Date.now() - inicioRodada) / 1000;
    const restante = Math.max(0, tempoLimite - decorrido);
    tempoRestanteEl.textContent = restante.toFixed(1);

    if (restante <= 3) {
      timerBox.classList.add("urgente");
    }

    if (restante <= 0) {
      clearInterval(intervaloTimer);
      finalizarRodada(null, tempoLimite);
    }
  }, 100);
}

function verificarResposta(escolhaUsuario) {
  clearInterval(intervaloTimer);
  const tempoGasto = Number(((Date.now() - inicioRodada) / 1000).toFixed(2));
  finalizarRodada(escolhaUsuario, tempoGasto);
}

function finalizarRodada(escolhaUsuario, tempoGasto) {
  const era = ERAS[indiceAtual];
  const botoes = listaOpcoesEl.querySelectorAll("button");
  botoes.forEach((btn) => (btn.disabled = true));

  feedbackEl.classList.remove("oculto");

  if (escolhaUsuario === null || tempoGasto > era.tempo) {
    feedbackEl.classList.add("erro");
    feedbackEl.innerHTML = `❌ ATRASOU! O elevador subiu antes da hora! (Limite: ${era.tempo}s)<br>A plateia percebeu o atraso no palco!`;
  } else if (escolhaUsuario === era.correta) {
    pontuacao++;
    feedbackEl.classList.add("acerto");
    feedbackEl.innerHTML = `⏱️ Você levou ${tempoGasto}s!<br>✅ PERFEITO! A Taylor subiu no palco impecável para ${era.nome}!`;
  } else {
    const corretoTexto = era.opcoes[era.correta - 1];
    feedbackEl.classList.add("erro");
    feedbackEl.innerHTML = `⏱️ Você levou ${tempoGasto}s!<br>❌ FIGURINO ERRADO! Essa roupa é de outra era!<br>👉 O certo seria: <strong>${corretoTexto}</strong>`;
  }

  setTimeout(() => {
    indiceAtual++;
    if (indiceAtual < ERAS.length) {
      carregarEra();
    } else {
      mostrarResultadoFinal();
    }
  }, 2600);
}

function mostrarResultadoFinal() {
  telaJogo.classList.add("oculto");
  telaFinal.classList.remove("oculto");

  const total = ERAS.length;
  pontuacaoFinalEl.textContent = `Sua pontuação final: ${pontuacao} de ${total} trocas perfeitas.`;

  if (pontuacao === total) {
    mensagemFinalEl.textContent = "🏆 INCRÍVEL! Você é oficialmente o estilista chefe da Taylor Swift!";
  } else if (pontuacao >= 6) {
    mensagemFinalEl.textContent = "👏 MUITO BOM! O show foi um sucesso, mesmo com alguns sustos nos bastidores.";
  } else {
    mensagemFinalEl.textContent = "😅 QUASE LÁ! A Taylor teve que improvisar no palco hoje. Tente novamente!";
  }
}