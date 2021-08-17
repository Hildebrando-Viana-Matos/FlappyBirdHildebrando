console.log('Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const planoDeFundo = {
    stripeX: 390,
    stripeY: 0,
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

        // Pega o stripe e pega onde ele está localizado e como posicionalo, com qual altura e largura
        contexto.drawImage(
            sprites, //image
            planoDeFundo.stripeX, planoDeFundo.stripeY, //sx, sy
            planoDeFundo.largura, planoDeFundo.altura, // sWidth, sHeight - Tamanho no recorte na sprite
            planoDeFundo.x, planoDeFundo.y, // dx, dy - Onde vai ficar localizado
            planoDeFundo.largura, planoDeFundo.altura // dWidth, dHeight
        );

        contexto.drawImage(
            sprites, //image
            planoDeFundo.stripeX, planoDeFundo.stripeY, //sx, sy
            planoDeFundo.largura, planoDeFundo.altura, // sWidth, sHeight - Tamanho no recorte na sprite
            // Repetindo o Background
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y, // dx, dy - Onde vai ficar localizado
            planoDeFundo.largura, planoDeFundo.altura // dWidth, dHeight
        );
    },
};

// Chão
const chao = {
    stripeX: 0,
    stripeY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    // Subtraindo a altura do canvas pela altura do sprite
    y: canvas.height - 112,
    desenhar() {
        // Pega o stripe e pega onde ele está localizado e como posicionalo, com qual altura e largura
        contexto.drawImage(
            sprites, //image
            chao.stripeX, chao.stripeY, //sx, sy
            chao.largura, chao.altura, // sWidth, sHeight - Tamanho no recorte na sprite
            chao.x, chao.y, // dx, dy - Onde vai ficar localizado
            chao.largura, chao.altura // dWidth, dHeight
        );

        //Repetindo o mesmo chão
        contexto.drawImage(
            sprites, //image
            chao.stripeX, chao.stripeY, //sx, sy
            chao.largura, chao.altura, // sWidth, sHeight - Tamanho no recorte na sprite
            (chao.x + chao.largura), chao.y, // dx, dy - Onde vai ficar localizado
            chao.largura, chao.altura // dWidth, dHeight
        );
    },
};

const flappyBird = {
    stripeX: 0,
    stripeY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    gravidade: 0.25,
    velocidade: 0,
    atualiza() {
        // Cada vez que for chamada a velocidade vai somar com a gravidade
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade
        // Cair o FlappyBird sempre coma velocidade que é aumentada
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },
    desenhar() {
        // Pega o stripe e pega onde ele está localizado e como posicionalo, com qual altura e largura
        contexto.drawImage(
            sprites, //image
            flappyBird.stripeX, flappyBird.stripeY, //sx, sy
            flappyBird.largura, flappyBird.altura, // sWidth, sHeight - Tamanho no recorte na sprite
            flappyBird.x, flappyBird.y, // dx, dy - Onde vai ficar localizado
            flappyBird.largura, flappyBird.altura // dWidth, dHeight
        );
    },
};

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
let telaAtiva = {};
function mudarParaTela(novaTela) {
    telaAtiva = novaTela;
}

const Telas = {
    INICIO: {
        desenhar() {
            // Renderizando o plano de fundo
            planoDeFundo.desenhar();
            // Renderizando o chão
            chao.desenhar();
            // Renderizando o flappyBird
            flappyBird.desenhar();
            // Mensagem Inicial
            mensagemGetReady.desenhar();
        },
        click() {
            mudarParaTela(Telas.JOGO)
        },
        atualiza() {

        }
    }
};

Telas.JOGO = {
    desenhar() {
        // Renderizando o plano de fundo
        planoDeFundo.desenhar();
        // Renderizando o chão
        chao.desenhar();
        // Renderizando o flappyBird
        flappyBird.desenhar();
    },
    atualiza() {
        flappyBird.atualiza();
    }
};

function loop() {
    // Esse loop vai ser execultado e cada execução vai redenrizar algo na tela

    telaAtiva.desenhar();
    telaAtiva.atualiza();

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