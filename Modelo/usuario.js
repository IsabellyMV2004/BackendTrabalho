import UsuarioDAO from "../Persistencia/usuarioDAO.js";

export default class Categoria {
    // Atributos privados usando a sintaxe #
    #codigo;
    #nome;
    #email;
    #senha;
    #telefone;
    #endereco;
    #nivel;


    // Construtor da classe
    constructor(codigo, nome, email, senha, telefone, endereco, nivel) {
        this.#codigo = codigo; 
        this.#nome = nome; 
        this.#email = email;
        this.#senha = senha; 
        this.#telefone = telefone;
        this.#endereco = endereco;
        this.#nivel = nivel;
    }

    // Método get para o atributo codigo
    get codigo() {
        return this.#codigo;
    }

    // Método set para o atributo codigo
    set codigo(value) {
        this.#codigo = value;
    }

    // Método get para o atributo descricao
    get nome() {
        return this.#nome;
    }

    // Método set para o atributo descricao
    set nome(value) {
        this.#nome = value;
    }

    get email() {
        return this.#email;
    }

    // Método set para o atributo descricao
    set email(value) {
        this.#email = value;
    }

    get senha() {
        return this.#senha;
    }

    // Método set para o atributo descricao
    set senha(value) {
        this.#senha = value;
    }

    get telefone() {
        return this.#telefone;
    }

    // Método set para o atributo descricao
    set telefone(value) {
        this.#telefone = value;
    }

    get endereco() {
        return this.#endereco;
    }

    // Método set para o atributo descricao
    set endereco(value) {
        this.#endereco = value;
    }

    get nivel() {
        return this.#nivel;
    }

    // Método set para o atributo descricao
    set nivel(value) {
        this.#nivel = value;
    }

    // Método toJSON para conversão em JSON
    toJSON() {
        return {
            codigo: this.#codigo,
            nome: this.#nome,
            email: this.#email,
            senha: this.#senha,
            telefone: this.#telefone,
            endereco: this.#endereco,
            nivel: this.#nivel
        };
    }

    async gravar(){
        const usoDAO = new UsuarioDAO();
        await usoDAO.gravar(this);
    }

    async alterar(){
        const prodDAO = new UsuarioDAO();
        await prodDAO.alterar(this);
    }

    async excluir(){
        const usoDAO = new UsuarioDAO();
        await usoDAO.excluir(this);
    }

    async consultar(termo){
        const usoDAO = new UsuarioDAO();
        return await usoDAO.consultar(termo);
    }
}