import FornecedorDAO from "../Persistencia/fornecedorDAO.js";

export default class Fornecedor {
    // Atributos privados usando a sintaxe #
    #codigo;
    #nome;
    #endereco;
    #contato;
    #cpf;
    #produtos = [];

    // Construtor da classe
    constructor(codigo=0, nome="",endereco="",contato="",cpf="",
        produtos=[]){
        this.#codigo=codigo;
        this.#nome=nome;
        this.#endereco=endereco;
        this.#contato=contato;
        this.#cpf=cpf;
        this.#produtos=produtos;
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

    get produtos() {
        return this.#produtos;
    }
    
    adicionarProduto(produto) {
        if (produto) {
            this.#produtos.push(produto);
        } else {
            throw new Error("Produto inválido.");
        }
    }
    
    removerProduto(produtoId) {
        this.#produtos = this.#produtos.filter(produto => produto.codigo !== produtoId);
    }
    
    listarProdutos() {
        return this.#produtos;
    }
    

    // Método toJSON para conversão em JSON
    toJSON() {
        return {
            codigo: this.#codigo,
            nome: this.#nome,
            endereco: this.#endereco,
            contato: this.#contato,
            cpf: this.#cpf,
            produtos: this.#produtos.map(produto => produto.toJSON())
        };
    }

    async gravar(){
        const fornDAO = new FornecedorDAO();
        await fornDAO.gravar(this);
    }

    async alterar(){
        const prodDAO = new FornecedorDAO();
        await prodDAO.alterar(this);
    }

    async excluir(){
        const fornDAO = new FornecedorDAO();
        await fornDAO.excluir(this);
    }

    async consultar(termo){
        const fornDAO = new FornecedorDAO();
        return await fornDAO.consultar(termo);
    }
}