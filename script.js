const canvas = document.getElementById('JogoCanvas');
const ctx = canvas.getContext('2d');

let gravidade = -2; // puxado pra baixo
let velocidade = 3; // quanto o inimigo anda
let velocidadeobstaculo = 1; // muda nada
let gameOver = false;

let pontuacao = 0; // Variável para a pontuação

document.addEventListener('keypress', (evento) => {
    if (evento.code == "Space") {
        if (gameOver) {
            reiniciarJogo(); // Chama a função para reiniciar o jogo
        } else {
            personagem.velocidade_y = 15; // quantidade que ele pula
            personagem.pulando = true;
        }
        personagem.velocidade_x = 0;
        personagem.andando = true;
    }
});

let personagem = {
    x: 100,
    y: canvas.height - 50,
    largura: 50,
    altura: 50,
    velocidade_y: 0,
    velocidade_x: 0,
    pulando: false,
    andando: false
};

let Obstaculo = {
    x: 550,
    y: canvas.height - 100,
    largura: 50,
    altura: 100
};

// Novo objeto que fica no topo
let objetoSuperior = {
    x: canvas.width, // Começa na borda direita
    y: 50, // Fica no topo
    largura: 120,
    altura: 50
};

// Novo objeto que fica no meio
let objetoMeio = {
    x: canvas.width / 2 -70,
    y: canvas.height / 2 - 10, // Fica no meio verticalmente
    largura: 90,
    altura: 70
};

function desenharPersonagem() {
    ctx.fillStyle = 'red';
    ctx.fillRect(
        personagem.x,
        personagem.y,
        personagem.largura,
        personagem.altura
    );
}

function atualizarPersonagem() {
    if (personagem.pulando) {
        personagem.y -= personagem.velocidade_y;
        personagem.velocidade_y -= gravidade;
        if (personagem.y >= canvas.height - 50) {
            personagem.velocidade_y = 0;
            personagem.y = canvas.height - 50;
            personagem.pulando = false;
        }
    }
    if (personagem.andando) {
        personagem.x -= personagem.velocidade_x;
        personagem.velocidade_y -= velocidade;
    }
}

function desenharObstaculo() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(
        Obstaculo.x,
        Obstaculo.y,
        Obstaculo.largura,
        Obstaculo.altura
    );
}

function desenharObjetoSuperior() {
    ctx.fillStyle = "blue"; // Definindo cor para o novo objeto
    ctx.fillRect(
        objetoSuperior.x,
        objetoSuperior.y,
        objetoSuperior.largura,
        objetoSuperior.altura
    );
}

// Função para desenhar o novo objeto no meio
function desenharObjetoMeio() {
    ctx.fillStyle = "green"; // Definindo cor para o novo objeto
    ctx.fillRect(
        objetoMeio.x,
        objetoMeio.y,
        objetoMeio.largura,
        objetoMeio.altura
    );
}

function atualizarObstaculo() {
    Obstaculo.x -= velocidade;

    if (Obstaculo.x <= -50) {
        Obstaculo.x = canvas.width;
    }
}

function atualizarObjetoSuperior() {
    objetoSuperior.x -= velocidade; // Move o objeto da direita para a esquerda

    if (objetoSuperior.x <= -50) {
        objetoSuperior.x = canvas.width; // Reseta para a borda direita
    }
}

// Função para atualizar o objeto no meio
function atualizarObjetoMeio() {
    objetoMeio.x -= velocidade; // Move o objeto da direita para a esquerda

    if (objetoMeio.x <= -50) {
        objetoMeio.x = canvas.width; // Reseta para a borda direita
    }
}

function verificaColisao() {
    // Verifica colisão com o obstáculo
    if (
        Obstaculo.x < personagem.x + personagem.largura &&
        Obstaculo.largura + Obstaculo.x > personagem.x &&
        personagem.y < Obstaculo.y + Obstaculo.altura &&
        personagem.y + personagem.altura > Obstaculo.y
    ) {
        console.log('colidiu com obstáculo');
        Obstaculo.velocidade_x = 0;
        personagem.x = Obstaculo.x - 30;
        personagem.velocidade_y = -10;
        ctx.fillStyle = "black";
        ctx.font = '50px Arial';
        ctx.fillText('GAME OVER', 50, 100);
        gameOver = true;
    }

    // Verifica colisão com o objeto superior
    if (
        objetoSuperior.x < personagem.x + personagem.largura &&
        objetoSuperior.largura + objetoSuperior.x > personagem.x &&
        personagem.y < objetoSuperior.y + objetoSuperior.altura &&
        personagem.y + personagem.altura > objetoSuperior.y
    ) {
        console.log('colidiu com objeto superior');
        gameOver = true;
        ctx.fillStyle = "black";
        ctx.font = '50px Arial';
        ctx.fillText('GAME OVER', 50, 100);
    }

    // Verifica colisão com o objeto no meio
    if (
        objetoMeio.x < personagem.x + personagem.largura &&
        objetoMeio.largura + objetoMeio.x > personagem.x &&
        personagem.y < objetoMeio.y + objetoMeio.altura &&
        personagem.y + personagem.altura > objetoMeio.y
    ) {
        console.log('colidiu com objeto do meio');
        gameOver = true;
        ctx.fillStyle = "black";
        ctx.font = '50px Arial';
        ctx.fillText('GAME OVER', 50, 100);
    }
}

// Função para aumentar a pontuação a cada 1 segundo
setInterval(() => {
    if (!gameOver) {
        pontuacao += 1; // Aumenta 1 ponto a cada 50ms
    }
}, 50);

// Função para desenhar a pontuação na tela
function desenharPontuacao() {
    ctx.fillStyle = "black";
    ctx.font = '20px Arial';
    ctx.fillText('Pontos: ' + pontuacao, 10, 30);
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    // Resetando variáveis
    pontuacao = 0;
    personagem.x = 100;
    personagem.y = canvas.height - 50;
    personagem.velocidade_y = 0;
    personagem.velocidade_x = 0;
    Obstaculo.x = 550;
    Obstaculo.y = canvas.height - 100;
    objetoSuperior.x = canvas.width; // Reseta o objeto superior para a direita
    objetoMeio.x = canvas.width; // Reseta o objeto no meio para a direita
    gameOver = false;

    // Reiniciando o loop
    loop();
}

function loop() {
    if (gameOver == false) {
        ctx.clearRect(0, 0, 800, 400);
        desenharPersonagem();
        atualizarPersonagem();
        desenharObstaculo();
        atualizarObstaculo();
        desenharObjetoSuperior();
        atualizarObjetoSuperior();
        desenharObjetoMeio(); // Desenha o novo objeto no meio
        atualizarObjetoMeio(); // Atualiza o movimento do objeto no meio
        verificaColisao();
        desenharPontuacao(); // Chama a função para desenhar a pontuação
        requestAnimationFrame(loop);
    }
}

loop();
