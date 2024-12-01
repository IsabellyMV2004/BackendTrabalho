import FornecedorDAO from "../Persistencia/fornecedorDAO.js";

export default class Fornecedor {
    // Atributos privados usando a sintaxe #
    #codigo;
    #nome;
    #endereco;
    #contato;
    #cpf;

    // Construtor da classe
    constructor(codigo=0, nome="",endereco="",contato="",cpf=""){
        this.#codigo=codigo;
        this.#nome=nome;
        this.#endereco=endereco;
        this.#contato=contato;
        this.#cpf=cpf;
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

    get contato() {
        return this.#contato;
    }

    // Método set para o atributo contato
    set contato(value) {
        this.#contato = value;
    }

    get cpf() {
        return this.#cpf;
    }

    // Método set para o atributo cpf
    set cpf(value) {
        this.#cpf = value;
    }
    

    // Método toJSON para conversão em JSON
    toJSON() {
        return {
            "codigo": this.#codigo,
            "nome": this.#nome,
            "endereco": this.#endereco,
            "contato": this.#contato,
            "cpf": this.#cpf
        };
    }

    async incluir(){
        const fornDAO = new FornecedorDAO();
        await fornDAO.incluir(this); 
    }

    async consultar(termo){
        const fornDAO = new FornecedorDAO();
        return await fornDAO.consultar(termo);
    }

    async excluir(){
        const fornDAO = new FornecedorDAO();
        await fornDAO.excluir(this);
    }

    async alterar(){
        const fornDAO = new FornecedorDAO();
        await fornDAO.alterar(this);
    }
}