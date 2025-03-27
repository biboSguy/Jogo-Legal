class veiculos{
    constructor(marca, cor, velocidade, passageiros){
        this.marca = marca;
        this.cor = cor;
        this.velocidade = velocidade;
        this.passageiros = passageiros;
    }
}
class carro extends veiculos{
    constructor(marca, cor, velocidade, passageiros, pneu, placa, motor){
        super(marca, cor, velocidade, passageiros)
        this.pneu = pneu;
        this.placa = placa;
        this.motor = motor;
    }
    acelerar(){
        this.velocidade +=10
        console.log('carro acelera')
    }
}
class barco extends veiculos{
    constructor(marca, cor, velocidade, passageiros, ancora, helice){
        super(marca, cor, velocidade, passageiros)
        this.ancora = ancora;
        this.helice = helice;
    } 
    acelerar(){
        this.velocidade +=1
        console.log('barco acelera')
    }
}
class aviao extends veiculos{
    constructor(marca, cor, velocidade, passageiros, asa, copiloto){
        super(marca, cor, velocidade, passageiros)
        this.asa = asa;
        this.copiloto = copiloto;
    }
    acelerar(){
        this.velocidade +=30
        console.log('aviao acelera')
    }
}
let veiculo1 = new carro('Fiat','verde',80,3,'pneu','11aa22bb','motor')
console.log(veiculo1)
let veiculo2 = new barco('Toyota','azul',50,5,'arcora','helice')
console.log(veiculo2)
let veiculo3 = new aviao('Boeing','amarelo',250,'asa',2)
console.log(veiculo3)