class Veiculos{
    constructor(tipo, marca, cor, velocidade, passageiros){
        this.tipo = tipo;
        this.marca = marca;
        this.cor = cor;
        this.velocidade = velocidade;
        this.passageiros = passageiros;
    }
    acelerar(){
        this.velocidade+=10
        console.log('vrum vrum')
    }
    frear(){
        this.velocidade-=40
        console.log('desvrum')
    }
    apresentar(){
        console.log(`O(A) ${this.tipo} de marca ${this.marca} esta a ${this.velocidade} km/h`)
    }
}
let veiculo1 = new Veiculos('Carro','Audio','Verde',86,3)
let veiculo2 = new Veiculos('Moto','BWM','Branca',172,1)
veiculo1.apresentar()
veiculo2.apresentar()
veiculo1.acelerar()
veiculo1.apresentar()
veiculo2.frear()
veiculo2.apresentar()
/*
console.log(veiculo2)
let veiculo3 = new Veiculos('Avião','Boeing','Azul',736,184)
console.log(veiculo3)
let veiculo4 = new Veiculos('Barco','Toyota','Preto',50,8)
console.log(veiculo4)
let veiculo5 = new Veiculos('Onibus','Mercedes','Amarelo',63,56)
console.log(veiculo5)
*/