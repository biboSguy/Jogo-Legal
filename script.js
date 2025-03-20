const canvas = document.getElementById('JogoCanvas')
const ctx = canvas.getContext('2d')
let gravidade = 0.5
let velocidade = 1
let velocidadeobstaculo = 1
let = gameOver = false 

document.addEventListener('keypress', (evento) => {
    if (evento.code == "Space"){
        personagem.velocidade_y = 20
        personagem.pulando = true
    }
    if (evento.code == "Space"){
        personagem.velocidade_x = 0
        personagem.andando = true
    }
})

let personagem = {
    x: 100,
    y: canvas.height - 50,
    largura: 50,
    altura: 50,
    velocidade_y: 0,
    velocidade_x: 0
}

let Obstaculo = {
    x:550,
    y:canvas.height - 100,
    largura:50,
    altura:100
}

function desenharPersonagem(){
    ctx.fillStyle = 'red'
    ctx.fillRect(
        personagem.x, 
        personagem.y, 
        personagem.largura, 
        personagem.altura
    )
}

function atualizarPersonagem(){
    if (personagem.pulando){
    personagem.y -= personagem.velocidade_y
    personagem.velocidade_y -= gravidade
    if (personagem.y >= canvas.height -50){
        personagem.velocidade_y = 0
        personagem.y = canvas.height - 50
    }
    }
    if (personagem.andando){
    personagem.x -= personagem.velocidade_x
    personagem.velocidade_y -= velocidade
    }
}

function desenharObstaculo(){
    ctx.fillStyle = "black"
    ctx.fillRect(
    Obstaculo.x, 
    Obstaculo.y,
    Obstaculo.largura,
    Obstaculo.altura
    )
}

function atualizarObstaculo(){
    Obstaculo.x -= velocidade 
    if (Obstaculo.x <= -50)
        Obstaculo.x = canvas.width
    velocidadeobstaculo = 10
}

function verificaColisao(){
    if (
        Obstaculo.x < personagem.x + personagem.largura &&
        Obstaculo.largura + Obstaculo.x > personagem.x &&
        personagem.y < Obstaculo.y + Obstaculo.altura &&
        personagem.y + personagem.altura > Obstaculo.y
    ){
            console.log('colidiu')
            Obstaculo.velocidade_x = 0
            personagem.x = Obstaculo.x - 30
            personagem.velocidade_y = -10
            ctx.fillStyle = "black"
            ctx.font = '50px Arial'
            ctx.fillText('GAME OVER', 50,100)
            gemeOver=true
        }
    
}

function loop(){
    if(gameOver == false){
        ctx.clearRect(0,0,800,400)
        desenharPersonagem()
        atualizarPersonagem()
        desenharObstaculo()
        atualizarObstaculo()
        verificaColisao()
        requestAnimationFrame(loop)
    }
}

loop()
