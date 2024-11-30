import ClienteDAO from "../Persistencia/clienteDAO.js";

export default class Cliente {
    // Atributos privados usando a sintaxe #
    #codigo;
    #descricao;

    // Construtor da classe
    constructor(codigo, descricao) {
        this.#codigo = codigo;       // Atribuindo valor ao atributo privado
        this.#descricao = descricao;  // Atribuindo valor ao atributo privado
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
    get descricao() {
        return this.#descricao;
    }

    // Método set para o atributo descricao
    set descricao(value) {
        this.#descricao = value;
    }

    // Método toJSON para conversão em JSON
    toJSON() {
        return {
            codigo: this.#codigo,
            descricao: this.#descricao
        };
    }

    async gravar(){
        const catDAO = new ClienteDAO();
        await catDAO.gravar(this);
    }

    async editar(){
        const catDAO = new ClienteDAO();
        await catDAO.editar(this);
    }

    async excluir(){
        const catDAO = new ClienteDAO();
        await catDAO.excluir(this);
    }

    async consultar(termo){
        const catDAO = new ClienteDAO();
        return await catDAO.consultar(termo);
    }
}