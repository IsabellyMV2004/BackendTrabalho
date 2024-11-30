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
                    forn_telefone VARCHAR(200) NOT NULL,
                    forn_email VARCHAR(200) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    CONSTRAINT pk_fornecedor PRIMARY KEY(forn_codigo)
                );
            `;
            await conexao.execute(sql);
            await conexao.release();

            conexao = await conectar();
            sql = `
                CREATE TABLE fornecedor_produto (
                    for_codigo INT NOT NULL,
                    prod_codigo INT NOT NULL,
                    PRIMARY KEY (for_codigo, prod_codigo),
                    FOREIGN KEY (for_codigo) REFERENCES fornecedores(for_codigo)
                        ON DELETE CASCADE ON UPDATE CASCADE,
                    FOREIGN KEY (prod_codigo) REFERENCES produtos(prod_codigo)
                        ON DELETE CASCADE ON UPDATE CASCADE
                );
            `;
            await conexao.execute(sql);
            await conexao.release();

        }
        catch(erro){
            console.log("Erro ao iniciar a tabela fornecedor!");
        }
    }
/*
    async gravar(fornecedor){
        if (fornecedor instanceof Fornecedor){
            const conexao = await conectar();
            const sql = `INSERT INTO fornecedor(forn_nome,forn_endereco,forn_telefone,forn_email)
            values(?,?,?,?,?,?)
        `;
        let parametros = [
            fornecedor.nome,
            fornecedor.endereco,
            fornecedor.telefone,
            fornecedor.email
        ]; 
            const resultado = await conexao.execute(sql,parametros);
            fornecedor.forn_codigo = resultado[0].insertId;
            await conexao.release();
        }
    }
    
    async alterar(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `UPDATE fornecedor SET forn_nome=?,forn_endereco=?,forn_telefone=?,forn_email=?
                WHERE forn_codigo = ?
            `;
            let parametros = [
                fornecedor.nome,
                fornecedor.endereco,
                fornecedor.telefone,
                fornecedor.email,
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
        let listaFornecedors = [];
        for (const linha of linhas) {
            const fornecedor = new Fornecedor(
                linha['forn_codigo'],
                linha['forn_nome'],
                linha['forn_endereco'],
                linha['forn_telefone'],
                linha['forn_email']
            );
            listaFornecedors.push(fornecedor);
        }
        await conexao.release();
        return listaFornecedors;
    }
*/


async gravar(fornecedor) {
    if (fornecedor instanceof Fornecedor) {
        const conexao = await conectar();

        // Insere o fornecedor
        const sqlFornecedor = `
            INSERT INTO fornecedor (forn_nome, forn_endereco, forn_telefone, forn_email)
            VALUES (?, ?, ?, ?)
        `;
        const parametrosFornecedor = [
            fornecedor.nome,
            fornecedor.endereco,
            fornecedor.telefone,
            fornecedor.email
        ];
        const [resultadoFornecedor] = await conexao.execute(sqlFornecedor, parametrosFornecedor);
        fornecedor.codigo = resultadoFornecedor.insertId; // Atualiza o código do fornecedor

        // Insere os produtos relacionados
        const sqlProdutos = `
            INSERT INTO fornecedor_produto (for_codigo, prod_codigo)
            VALUES (?, ?)
        `;
        for (const produto of fornecedor.produtos) {
            await conexao.execute(sqlProdutos, [fornecedor.codigo, produto.codigo]);
        }

        await conexao.release();
    }
}


async alterar(fornecedor) {
    if (fornecedor instanceof Fornecedor) {
        const conexao = await conectar();

        // Atualiza o fornecedor
        const sqlFornecedor = `
            UPDATE fornecedor
            SET forn_nome = ?, forn_endereco = ?, forn_telefone = ?, forn_email = ?
            WHERE forn_codigo = ?
        `;
        const parametrosFornecedor = [
            fornecedor.nome,
            fornecedor.endereco,
            fornecedor.telefone,
            fornecedor.email,
            fornecedor.codigo
        ];
        await conexao.execute(sqlFornecedor, parametrosFornecedor);

        // Remove os produtos antigos
        const sqlDeleteProdutos = `
            DELETE FROM fornecedor_produto WHERE for_codigo = ?
        `;
        await conexao.execute(sqlDeleteProdutos, [fornecedor.codigo]);

        // Insere os novos produtos
        const sqlProdutos = `
            INSERT INTO fornecedor_produto (for_codigo, prod_codigo)
            VALUES (?, ?)
        `;
        for (const produto of fornecedor.produtos) {
            await conexao.execute(sqlProdutos, [fornecedor.codigo, produto.codigo]);
        }

        await conexao.release();
    }
}


async consultar(termo) {
    const conexao = await conectar();
    let sqlFornecedor = "";
    let parametros = [];

    // Verifica se é busca por código ou nome
    if (!isNaN(parseInt(termo))) {
        sqlFornecedor = `SELECT * FROM fornecedor WHERE forn_codigo = ?`;
        parametros = [parseInt(termo)];
    } else {
        sqlFornecedor = `SELECT * FROM fornecedor WHERE forn_nome LIKE ?`;
        parametros = [`%${termo}%`];
    }

    const [linhasFornecedor] = await conexao.execute(sqlFornecedor, parametros);

    // Busca os produtos relacionados
    const sqlProdutos = `
        SELECT p.* FROM fornecedor_produto fp
        JOIN produto p ON fp.prod_codigo = p.prod_codigo
        WHERE fp.for_codigo = ?
    `;

    const listaFornecedores = [];
    for (const linha of linhasFornecedor) {
        const [linhasProdutos] = await conexao.execute(sqlProdutos, [linha.forn_codigo]);

        const fornecedor = new Fornecedor(
            linha.forn_codigo,
            linha.forn_nome,
            linha.forn_endereco,
            linha.forn_telefone,
            linha.forn_email,
            linhasProdutos // Lista de produtos
        );
        listaFornecedores.push(fornecedor);
    }

    await conexao.release();
    return listaFornecedores;
}

async excluir(fornecedor) {
    if (fornecedor instanceof Fornecedor) {
        try {
            const conexao = await conectar();
            const sql = "DELETE FROM fornecedor WHERE forn_codigo = ?";
            const parametros = [fornecedor.codigo]; // Usa o código do fornecedor para exclusão
            await conexao.execute(sql, parametros);
            await conexao.release(); // Libera a conexão
        } catch (erro) {
            console.error("Erro ao excluir o fornecedor:", erro.message);
            throw erro;
        }
    } else {
        throw new Error("Objeto passado não é uma instância de Fornecedor.");
    }
}
}