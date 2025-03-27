class Pessoa{
    constructor(nome, sobrenome, idade, cpf){
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.idade = idade;
        this.cpf = cpf;
    }
}
let pessoa1 = new Pessoa('Dean','Kamen',73,'11122233344')
//console.log(pessoa1)
let pessoa2 = new Pessoa('Woodie','Flowers', 76,'00055500044')
//console.log(pessoa2)

class Aluno extends Pessoa{
    constructor(nome, sobrenome, idade, cpf, turma){
        super(nome, sobrenome, idade, cpf)
        this.turma = turma
    }
}
let aluno = new Aluno('matheus', 'jose', 15,'cpf', '3C')
console.log(aluno)