const canvas = document.getElementById('JogoCanvas');
const ctx = canvas.getContext('2d');

let gravidade = -2; // puxado pra baixo
let velocidade = 3; // quanto o inimigo anda
let velocidadeobstaculo = 1; // muda nada
let gameOver = false;

let pontuacao = 0; 

document.addEventListener('keypress', (evento) => {
    if (evento.code == "Space") {
        if (gameOver) {
            reiniciarJogo(); 
        } else {
            personagem.velocidade_y = 15;
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
    andando: false,
    imagem: new Image()
};
personagem.imagem.src='./static/personagem.webp' 

let Obstaculo = {
    x: 550,
    y: canvas.height - 100,
    largura: 50,
    altura: 100
};


let objetoSuperior = {
    x: canvas.width, 
    y: 50, 
    largura: 120,
    altura: 50
};


let objetoMeio = {
    x: canvas.width / 2 -70,
    y: canvas.height / 2 - 10,
    largura: 90,
    altura: 70
};

function desenharPersonagem() {
    ctx.drawImage(
        personagem.imagem,
        personagem.x,
        personagem.y,
        personagem.largura,
        personagem.altura)
    
/*    ctx.fillStyle = 'red';
    ctx.fillRect(
        personagem.x,
        personagem.y,
        personagem.largura,
        personagem.altura)
        */
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
    ctx.fillStyle = "blue"; 
    ctx.fillRect(
        objetoSuperior.x,
        objetoSuperior.y,
        objetoSuperior.largura,
        objetoSuperior.altura
    );
}

function desenharObjetoMeio() {
    ctx.fillStyle = "green";
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
    objetoSuperior.x -= velocidade;

    if (objetoSuperior.x <= -50) {
        objetoSuperior.x = canvas.width; 
    }
}

function atualizarObjetoMeio() {
    objetoMeio.x -= velocidade; 

    if (objetoMeio.x <= -50) {
        objetoMeio.x = canvas.width;
    }
}

function verificaColisao() {
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

setInterval(() => {
    if (!gameOver) {
        pontuacao += 1; 
    }
}, 50);

function desenharPontuacao() {
    ctx.fillStyle = "black";
    ctx.font = '20px Arial';
    ctx.fillText('Pontos: ' + pontuacao, 10, 30);
}

function reiniciarJogo() {

    pontuacao = 0;
    personagem.x = 100;
    personagem.y = canvas.height - 50;
    personagem.velocidade_y = 0;
    personagem.velocidade_x = 0;
    Obstaculo.x = 550;
    Obstaculo.y = canvas.height - 100;
    objetoSuperior.x = canvas.width;
    objetoMeio.x = canvas.width;
    gameOver = false;

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
        desenharObjetoMeio(); 
        atualizarObjetoMeio();
        verificaColisao();
        desenharPontuacao(); 
        requestAnimationFrame(loop);
    }
}

loop();
