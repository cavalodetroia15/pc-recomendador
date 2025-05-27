let configuracoes = [
  {
    nome: "PC Econômico",
    preco: 4700,
    categorias: ["custo-benefício"],
    pecas: [
      "Ryzen 5 5600",
      "Placa-mãe B450",
      "16GB DDR4 3200MHz",
      "RX 6600",
      "SSD 1TB NVMe",
      "Fonte 550W 80 Plus Bronze",
      "Gabinete simples com boa ventilação"
    ]
  },
  {
    nome: "PC Intermediário Gamer",
    preco: 5800,
    categorias: ["jogos", "custo-benefício"],
    pecas: [
      "Core i5 12400F",
      "Placa-mãe B660",
      "16GB DDR4 3200MHz",
      "RTX 3060",
      "SSD 1TB NVMe",
      "Fonte 650W 80 Plus Bronze",
      "Gabinete gamer com airflow e LED"
    ]
  },
  {
    nome: "PC para Edição e Games",
    preco: 6900,
    categorias: ["edição", "jogos"],
    pecas: [
      "Core i5 12400F",
      "Placa-mãe B660",
      "32GB DDR4 3200MHz",
      "RTX 3060",
      "SSD 1TB NVMe",
      "Fonte 750W 80 Plus Bronze",
      "Gabinete médio com design minimalista"
    ]
  },
  {
    nome: "PC Intermediário Avançado",
    preco: 7500,
    categorias: ["jogos", "edição"],
    pecas: [
      "Ryzen 7 5700X",
      "Placa-mãe B550",
      "32GB DDR4 3600MHz",
      "RTX 4060 Ti",
      "SSD 1TB NVMe",
      "Fonte 750W 80 Plus Gold",
      "Gabinete premium com vidro temperado"
    ]
  }
];

let campoOrcamento;
let chkJogos, chkEdicao, chkCusto;
let btnEnviar;
let configSelecionada = null;

function setup() {
  createCanvas(800, 600);
  background(240);

  textSize(18);
  text("Montador de PC Gamer", 20, 30);

  createSpan("Seu orçamento (R$): ").position(20, 60);
  campoOrcamento = createInput().position(180, 60);

  chkJogos = createCheckbox("Foco em Jogos", false).position(20, 100);
  chkEdicao = createCheckbox("Foco em Edição", false).position(20, 130);
  chkCusto = createCheckbox("Custo-benefício", false).position(20, 160);

  btnEnviar = createButton("Ver Recomendação").position(20, 200);
  btnEnviar.mousePressed(verRecomendacao);
}

function verRecomendacao() {
  let orcamento = int(campoOrcamento.value());
  let focoJogos = chkJogos.checked();
  let focoEdicao = chkEdicao.checked();
  let focoCusto = chkCusto.checked();

  configSelecionada = null;

  for (let config of configuracoes) {
    if (config.preco <= orcamento) {
      if (
        (focoJogos && config.categorias.includes("jogos")) ||
        (focoEdicao && config.categorias.includes("edição")) ||
        (focoCusto && config.categorias.includes("custo-benefício"))
      ) {
        configSelecionada = config;
        break;
      }
    }
  }

  redraw();
}

function draw() {
  background(240);
  textSize(18);
  text("Montador de PC Gamer", 20, 30);

  if (configSelecionada) {
    fill(0);
    text("Configuração recomendada:", 400, 70);
    text(configSelecionada.nome + " (R$" + configSelecionada.preco + ")", 400, 100);

    text("Peças:", 400, 130);
    for (let i = 0; i < configSelecionada.pecas.length; i++) {
      text("- " + configSelecionada.pecas[i], 420, 160 + i * 25);
    }
  } else {
    fill(150);
    text("Preencha os dados e clique em 'Ver Recomendação'", 400, 100);
  }

  noLoop(); // Evita redesenhar constantemente
}
