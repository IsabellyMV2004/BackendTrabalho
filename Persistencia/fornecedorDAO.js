import Fornecedor from "../Modelo/fornecedor.js";
import conectar from "./Conexao.js";

export default class FornecedorDAO{

    constructor(){
        this.init();
    }

    async init(){
        try{
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS fornecedor(
                    forn_codigo INT NOT NULL AUTO_INCREMENT,
                    forn_nome VARCHAR(200) NOT NULL,
                    forn_endereco VARCHAR(200) NOT NULL,
                    forn_contato VARCHAR(200) NOT NULL,
                    forn_cpf VARCHAR(200) NOT NULL,
                    CONSTRAINT pk_fornecedor PRIMARY KEY(forn_codigo)
                );
            `;
            await conexao.execute(sql);
            await conexao.release();

        }
        catch(erro){
            console.log("Erro ao iniciar a tabela fornecedor!");
        }
    }

    async incluir(fornecedor){
        if (fornecedor instanceof Fornecedor){
            const conexao = await conectar();
            const sql = `INSERT INTO fornecedor(forn_nome,forn_endereco,forn_contato,forn_cpf)
            values(?,?,?,?)
        `;
        let parametros = [
            fornecedor.nome,
            fornecedor.endereco,
            fornecedor.contato,
            fornecedor.cpf
        ]; 
            const resultado = await conexao.execute(sql,parametros);
            fornecedor.forn_codigo = resultado[0].insertId;
            await conexao.release();
        }
    }
    
    async alterar(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `UPDATE fornecedor SET forn_nome=?,forn_endereco=?,forn_contato=?,forn_cpf=?
                WHERE forn_codigo = ?
            `;
            let parametros = [
                fornecedor.nome,
                fornecedor.endereco,
                fornecedor.contato,
                fornecedor.cpf,
                fornecedor.codigo
            ]; //dados do fornecedor
            await conexao.execute(sql, parametros);
            await conexao.release(); //libera a conexão
        }
    }

    async excluir(fornecedor){
        if (fornecedor instanceof Fornecedor){
            const conexao = await conectar();
            const sql = "DELETE FROM fornecedor WHERE forn_codigo = ?";
            const parametros = [fornecedor.forn_codigo];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async consultar(termo) {
        //resuperar as linhas da tabela fornecedor e transformá-las de volta em fornecedors
        const conexao = await conectar();
        let sql = "";
        let parametros = [];
        if (isNaN(parseInt(termo))) {
            sql = `SELECT * FROM fornecedor 
                   WHERE forn_nome LIKE ?`;
            parametros = ['%' + termo + '%'];
        }
        else {
            sql = `SELECT * FROM fornecedor p
                   WHERE forn_codigo = ?`
            parametros = [termo];
        }
        const [linhas, campos] = await conexao.execute(sql, parametros);
        let listaFornecedores = [];
        for (const linha of linhas) {
            const fornecedor = new Fornecedor(
                linha['forn_codigo'],
                linha['forn_nome'],
                linha['forn_endereco'],
                linha['forn_contato'],
                linha['forn_cpf']
            );
            listaFornecedores.push(fornecedor);
        }
        await conexao.release();
        return listaFornecedores;
    }

}