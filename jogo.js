let frames = 0;
const som_HIT = new Audio();
som_HIT.src = "./efeitos/hit.wav";

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenhar() {
        // Cor para o plano de fundo
        contexto.fillStyle = '#70c5ce';

        //O a cor vai preencher
        contexto.fillRect(0, 0, canvas.width, canvas.height);
        // Tudo do ponto 0, 0 vai preencher a cor

        // Pega o sprite e pega onde ele está localizado e como posicionalo, com qual altura e largura
        contexto.drawImage(
            sprites, //image
            planoDeFundo.spriteX, planoDeFundo.spriteY, //sx, sy
            planoDeFundo.largura, planoDeFundo.altura, // sWidth, sHeight - Tamanho no recorte na sprite
            planoDeFundo.x, planoDeFundo.y, // dx, dy - Onde vai ficar localizado
            planoDeFundo.largura, planoDeFundo.altura // dWidth, dHeight
        );

        contexto.drawImage(
            sprites, //image
            planoDeFundo.spriteX, planoDeFundo.spriteY, //sx, sy
            planoDeFundo.largura, planoDeFundo.altura, // sWidth, sHeight - Tamanho no recorte na sprite
            // Repetindo o Background
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y, // dx, dy - Onde vai ficar localizado
            planoDeFundo.largura, planoDeFundo.altura // dWidth, dHeight
        );
    },
};

function criarChao() {
    // Chão
    const chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        // Subtraindo a altura do canvas pela altura do sprite
        y: canvas.height - 112,
        atualizar() {
            const movimentoDoChao = 1;
            const repeteEm = chao.largura / 2;
            // Animação para atualizar o chao
            const movimentacao = chao.x - movimentoDoChao;
            // Faz  o chão repetir
            chao.x = movimentacao % repeteEm;
        },
        desenhar() {
            // Pega o sprite e pega onde ele está localizado e como posicionalo, com qual altura e largura
            contexto.drawImage(
                sprites, //image
                chao.spriteX, chao.spriteY, //sx, sy
                chao.largura, chao.altura, // sWidth, sHeight - Tamanho no recorte na sprite
                chao.x, chao.y, // dx, dy - Onde vai ficar localizado
                chao.largura, chao.altura // dWidth, dHeight
            );

            //Repetindo o mesmo chão
            contexto.drawImage(
                sprites, //image
                chao.spriteX, chao.spriteY, //sx, sy
                chao.largura, chao.altura, // sWidth, sHeight - Tamanho no recorte na sprite
                (chao.x + chao.largura), chao.y, // dx, dy - Onde vai ficar localizado
                chao.largura, chao.altura // dWidth, dHeight
            );
        },
    };
    return chao;
}

function fazColisao(flappyBird, chao) {
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;
  
    if(flappyBirdY >= chaoY) {
      return true;
    }
  
    return false;
  }
  
  function criarFlappyBird() {
    const flappyBird = {
      spriteX: 0,
      spriteY: 0,
      largura: 33,
      altura: 24,
      x: 10,
      y: 50,
      pulo: 4.6,
      pula() {
        flappyBird.velocidade =  - flappyBird.pulo;
      },
      gravidade: 0.25,
      velocidade: 0,
      atualizar() {
        if(fazColisao(flappyBird, globais.chao)) {
          som_HIT.play();
          // Fez a colisão
  
          setTimeout(() => {
            mudarParaTela(Telas.INICIO);
          }, 500);
          return;
        }
  
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
      },
      movimentos: [
          { spriteX: 0, spriteY: 0 }, // Asa pra cima
          { spriteX: 0, spriteY: 26 }, // Asa pro meio
          { spriteX: 0, spriteY: 52 } // Asa pra baixo
      ],
      frameAtual: 0,
      atualizarFrameAtual() {
        const intervaloDeFrames = 10;
        const passouIntervalo = frames % intervaloDeFrames === 0;
        if(passouIntervalo) {
            const baseDoIncremento = 1;
            const incremento = baseDoIncremento + flappyBird.frameAtual;
            const baseRepeticao = flappyBird.movimentos.length;
            flappyBird.frameAtual = incremento % baseRepeticao;
        }
      },
      desenhar() {
        flappyBird.atualizarFrameAtual();
        const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];
        contexto.drawImage(
          sprites,
          spriteX, spriteY, // Sprite X, Sprite Y
          flappyBird.largura, flappyBird.altura, // Tamanho do recorte na sprite
          flappyBird.x, flappyBird.y,
          flappyBird.largura, flappyBird.altura,
        );
      }
    }
    return flappyBird;  
  }
  

// Mensagem Inicial
const mensagemGetReady = {
    sX: 134,
    sY: 0,
    w: 174,
    h: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    desenhar() {
        contexto.drawImage(
            sprites,
            mensagemGetReady.sX, mensagemGetReady.sY,
            mensagemGetReady.w, mensagemGetReady.h,
            mensagemGetReady.x, mensagemGetReady.y,
            mensagemGetReady.w, mensagemGetReady.h
        );
    } 
}

// Telas
const globais = {

}
let telaAtiva = {};
function mudarParaTela(novaTela) {
    telaAtiva = novaTela;

    if(telaAtiva.inicializa) {
        telaAtiva.inicializa();
    }
}

const Telas = {
    INICIO: {
        inicializa() {
            globais.flappyBird = criarFlappyBird();
            globais.chao = criarChao();
        },
        desenhar() {
            // Renderizando o plano de fundo
            planoDeFundo.desenhar();
            // Renderizando o chão
            globais.chao.desenhar();
            // Renderizando o flappyBird
            globais.flappyBird.desenhar();
            // Mensagem Inicial
            mensagemGetReady.desenhar();
        },
        click() {
            mudarParaTela(Telas.JOGO)
        },
        atualizar() {
            globais.chao.atualizar();
        }
    }
};

Telas.JOGO = {
    desenhar() {
        // Renderizando o plano de fundo
        planoDeFundo.desenhar();
        // Renderizando o chão
        globais.chao.desenhar();
        // Renderizando o flappyBird
        globais.flappyBird.desenhar();
    },
    // Todas as animações que vão acontecer quando pular
    click() {
        globais.flappyBird.pula();
    },
    atualizar() {
        globais.flappyBird.atualizar();
    }
};

function loop() {
    // Esse loop vai ser execultado e cada execução vai redenrizar algo na tela

    telaAtiva.desenhar();
    telaAtiva.atualizar();

    // Cada looping vai atualizar o frame
    frames = frames + 1;

    // Ajuda a desenhar na tela de forma infinita na tela de forma inteligente
    requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
    if(telaAtiva.click) {
        telaAtiva.click();
    }
})

mudarParaTela(Telas.INICIO);
loop();