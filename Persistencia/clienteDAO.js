import Cliente from "../Modelo/cliente.js";
import conectar from "./Conexao.js";

export default class ClienteDAO{

    constructor(){
        this.init();
    }

    async init(){
        try{
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS cliente(
                    cli_codigo INT NOT NULL AUTO_INCREMENT,
                    cli_nome VARCHAR(200) NOT NULL,
                    cli_endereco VARCHAR(200) NOT NULL,
                    cli_telefone VARCHAR(200) NOT NULL,
                    cli_email VARCHAR(200) NOT NULL,
                    CONSTRAINT pk_cliente PRIMARY KEY(cli_codigo)
                );
            `;
            await conexao.execute(sql);
            await conexao.release();

        }
        catch(erro){
            console.log("Erro ao iniciar a tabela cliente!");
        }
    }

    async incluir(cliente){
        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = `INSERT INTO cliente(cli_nome,cli_endereco,cli_telefone,cli_email)
            values(?,?,?,?)
        `;
        let parametros = [
            cliente.nome,
            cliente.endereco,
            cliente.telefone,
            cliente.email
        ]; 
            const resultado = await conexao.execute(sql,parametros);
            cliente.cli_codigo = resultado[0].insertId;
            await conexao.release();
        }
    }
    
    async alterar(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = `UPDATE cliente SET cli_nome=?,cli_endereco=?,cli_telefone=?,cli_email=?
                WHERE cli_codigo = ?
            `;
            let parametros = [
                cliente.nome,
                cliente.endereco,
                cliente.telefone,
                cliente.email,
                cliente.codigo
            ]; //dados do cliente
            await conexao.execute(sql, parametros);
            await conexao.release(); //libera a conexão
        }
    }

    async excluir(cliente){
        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = "DELETE FROM cliente WHERE cli_codigo = ?";
            const parametros = [cliente.cli_codigo];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async consultar(termo) {
        //resuperar as linhas da tabela cliente e transformá-las de volta em clientes
        const conexao = await conectar();
        let sql = "";
        let parametros = [];
        if (isNaN(parseInt(termo))) {
            sql = `SELECT * FROM cliente 
                   WHERE cli_nome LIKE ?`;
            parametros = ['%' + termo + '%'];
        }
        else {
            sql = `SELECT * FROM cliente p
                   WHERE cli_codigo = ?`
            parametros = [termo];
        }
        const [linhas, campos] = await conexao.execute(sql, parametros);
        let listaClientes = [];
        for (const linha of linhas) {
            const cliente = new Cliente(
                linha['cli_codigo'],
                linha['cli_nome'],
                linha['cli_endereco'],
                linha['cli_telefone'],
                linha['cli_email']
            );
            listaClientes.push(cliente);
        }
        await conexao.release();
        return listaClientes;
    }

}