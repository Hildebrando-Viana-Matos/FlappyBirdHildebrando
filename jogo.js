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
            mudarParaTela(Telas.GAME_OVER);
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

// Mensagem Game Over
const mensagemGameOver = {
    sX: 134,
    sY: 153,
    w: 226,
    h: 200,
    // Centralizando a mensagem
    x: (canvas.width / 2) - 226 / 2,
    y: 50,
    desenhar() {
        contexto.drawImage(
            sprites,
            mensagemGameOver.sX, mensagemGameOver.sY,
            mensagemGameOver.w, mensagemGameOver.h,
            mensagemGameOver.x, mensagemGameOver.y,
            mensagemGameOver.w, mensagemGameOver.h
        );
    } 
}

function criarCanos() {
    const canos = {
        largura: 52,
        altura: 400,
        chao: {
            spriteX: 0,
            spriteY: 169,
        },
        ceu: {
            spriteX: 52,
            spriteY: 169,
        },
        espaco: 80,
        desenhar() {
            canos.pares.forEach(function(par) {
                // Aparecer de forma dinamica os canos
                const yRandom = par.y;
                const espacamentoEntreCanos = 90;

                const canoCeuX = par.x;
                // Topo e baixo
                const canoCeuY = yRandom;
                // Cano Céu
                contexto.drawImage(
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canoCeuX, canoCeuY,
                    canos.largura, canos.altura
                )

                const canoChaoX = par.x;
                const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;

                // Cano Chão
                contexto.drawImage(
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura
                )

                par.canoCeu = {
                    x: canoCeuX,
                    y: canos.altura + canoCeuY
                }
                par.canoChao = {
                    x: canoChaoX,
                    y: canoChaoY
                }
            })
        },
        temColisaoComFlappyBird(par) {
            const cabecaDoFlappy = globais.flappyBird.y;
            const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;
            // Ocorreu a colisão entre o flappybird e o cano
            if((globais.flappyBird.x + globais.flappyBird.largura) >= par.x) {
                // O flappy bird bateu a cabeça no cano
                if(cabecaDoFlappy <= par.canoCeu.y) {
                    return true;
                }

                // O flappy bird bateu a pé no cano
                if(peDoFlappy >= par.canoChao.y) {
                    return true;
                }
            }

            return false;
        },
        pares: [],
        atualizar() {
            const passou100Frames = frames % 100 === 0;
            if(passou100Frames) {
                canos.pares.push({
                    x: canvas.width,// Começar no começo da tela
                    y: -150 * (Math.random() + 1),
                });
            }

            canos.pares.forEach(function(par) {
                par.x = par.x - 2;

                if(canos.temColisaoComFlappyBird(par)) {
                    som_HIT.play();
                    mudarParaTela(Telas.GAME_OVER);
                }

                // Removendo o cano que já passou
                if(par.x + canos.largura <= 0) {
                    canos.pares.shift();
                }
            })
        }
    }
    return canos;
}

function criarPlacar() {
    const placar = {
        pontuacao: 0,
        desenhar() {
            contexto.font = "35px 'VT323'";
            contexto.textAlign = "right"
            contexto.fillStyle = "white"
            contexto.fillText(`${placar.pontuacao}`, canvas.width - 10, 35);
        },
        atualizar() {
            const intervaloDeFrames = 100;
            const passouIntervalo = frames % intervaloDeFrames === 0;

            if(passouIntervalo) {
                placar.pontuacao = placar.pontuacao + 1
            }
        }
    }

    return placar;
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
            globais.canos = criarCanos();
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
    inicializa() {
        globais.placar = criarPlacar();
    },
    desenhar() {
        // Renderizando o plano de fundo
        planoDeFundo.desenhar();
        // Renderizando canos
        globais.canos.desenhar();
        // Renderizando o chão
        globais.chao.desenhar();
        // Renderizando o flappyBird
        globais.flappyBird.desenhar();
        // Desenhar o placar
        globais.placar.desenhar();
    },
    // Todas as animações que vão acontecer quando pular
    click() {
        globais.flappyBird.pula();
    },
    atualizar() {
        globais.canos.atualizar();
        globais.chao.atualizar();
        globais.flappyBird.atualizar();
        globais.placar.atualizar();
    }
};

Telas.GAME_OVER = {
    desenhar() {
        mensagemGameOver.desenhar();
    },
    atualizar() {

    },
    click() {
        mudarParaTela(Telas.INICIO)
    }
}

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