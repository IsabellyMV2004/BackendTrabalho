import ClienteDAO from "../Persistencia/clienteDAO.js";

export default class Cliente {
    // Atributos privados usando a sintaxe #
    #codigo;
    #nome;
    #endereco;
    #telefone;
    #email;

    // Construtor da classe
    constructor(codigo=0, nome="",endereco="",telefone="",email=""){
            this.#codigo=codigo;
            this.#nome=nome;
            this.#endereco=endereco;
            this.#telefone=telefone;
            this.#email=email;
}

    // Método get para o atributo codigo
    get codigo() {
        return this.#codigo;
    }

    // Método set para o atributo codigo
    set codigo(value) {
        this.#codigo = value;
    }

    // Método get para o atributo nome
    get nome() {
        return this.#nome;
    }

    // Método set para o atributo nome
    set nome(value) {
        this.#nome = value;
    }

    get endereco() {
        return this.#endereco;
    }

    // Método set para o atributo endereco
    set endereco(value) {
        this.#endereco = value;
    }

    get telefone() {
        return this.#telefone;
    }

    // Método set para o atributo telefone
    set telefone(value) {
        this.#telefone = value;
    }

    get email() {
        return this.#email;
    }

    // Método set para o atributo email
    set email(value) {
        this.#email = value;
    }

    // Método toJSON para conversão em JSON
    toJSON() {
        return {
            "codigo": this.#codigo,
            "nome": this.#nome,
            "endereco": this.#endereco,
            "telefone": this.#telefone,
            "email": this.#email
        };
    }

    async incluir(){
        const cliDAO = new ClienteDAO();
        await cliDAO.incluir(this); 
    }

    async consultar(termo){
        const cliDAO = new ClienteDAO();
        return await cliDAO.consultar(termo);
    }

    async excluir(){
        const cliDAO = new ClienteDAO();
        await cliDAO.excluir(this);
    }

    async alterar(){
        const cliDAO = new ClienteDAO();
        await cliDAO.alterar(this);
    }
}