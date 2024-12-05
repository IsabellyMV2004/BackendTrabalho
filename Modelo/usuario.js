import UsuarioDAO from "../Persistencia/usuarioDAO.js";
import Privilegio from "./privilegio.js";


export default class Usuario {
    // Atributos privados usando a sintaxe #
    #codigo;
    #nome;
    #email;
    #senha;
    #telefone;
    #endereco;
    #privilegio;


    // Construtor da classe
    constructor(codigo = 0, nome = "", email = "", senha = "", telefone = "", endereco = "", privilegio = {}) {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#email = email;
        this.#senha = senha;
        this.#telefone = telefone;
        this.#endereco = endereco;
        this.#privilegio = privilegio instanceof Privilegio ? privilegio : new Privilegio(0, ""); // instancia padrão
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

    get privilegio(){
        return this.#privilegio;
    }

    set privilegio(novoPrivilegio){
        if (novoPrivilegio instanceof Privilegio){
            this.#privilegio = novoPrivilegio;
        }
    }

    // Método toJSON para conversão em JSON
    toJSON() {
        return {
            "codigo": this.#codigo,
            "nome": this.#nome,
            "email": this.#email,
            "senha": this.#senha,
            "telefone": this.#telefone,
            "endereco": this.#endereco,
            "privilegios": this.#privilegio.toJSON()
        };
    }
    

    async incluir(){
        //instanciar a camada de persistencia do produto
        const usuDAO = new UsuarioDAO();
        await usuDAO.incluir(this); //this referência a si mesmo
    }

    async consultar(termo){
        const usuDAO = new UsuarioDAO();
        return await usuDAO.consultar(termo);
    }

    async excluir(){
        const usuDAO = new UsuarioDAO();
        await usuDAO.excluir(this);
    }

    async alterar(){
        const usuDAO = new UsuarioDAO();
        await usuDAO.alterar(this);
    }
}