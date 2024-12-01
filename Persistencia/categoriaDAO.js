import Categoria from "../Modelo/categoria.js";
import conectar from "./Conexao.js";

export default class CategoriaDAO {
    constructor() {
        this.init();
    }

    async init() {
        let conexao;
        try {
            conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS categoria(
                    codigo INT NOT NULL AUTO_INCREMENT,
                    descricao VARCHAR(50) NOT NULL,
                    CONSTRAINT pk_categoria PRIMARY KEY(codigo)
                );
            `;
            await conexao.execute(sql);
        } catch (erro) {
            console.log("Erro ao iniciar a tabela categoria!");
        } finally {
            if (conexao) await conexao.release();
        }
    }

    async gravar(categoria) {
        if (categoria instanceof Categoria) {
            let conexao;
            try {
                conexao = await conectar();
                const sql = "INSERT INTO categoria(descricao) VALUES (?)";
                const parametros = [categoria.descricao];
                const resultado = await conexao.execute(sql, parametros);
                categoria.codigo = resultado[0].insertId;
            } catch (erro) {
                console.log("Erro ao gravar categoria: " + erro.message);
            } finally {
                if (conexao) await conexao.release();
            }
        }
    }

    async editar(categoria) {
        if (categoria instanceof Categoria) {
            let conexao;
            try {
                conexao = await conectar();
                const sql = "UPDATE categoria SET descricao = ? WHERE codigo = ?";
                const parametros = [categoria.descricao, categoria.codigo];
                await conexao.execute(sql, parametros);
            } catch (erro) {
                console.log("Erro ao editar categoria: " + erro.message);
            } finally {
                if (conexao) await conexao.release();
            }
        }
    }

    async excluir(categoria) {
        if (categoria instanceof Categoria) {
            let conexao;
            try {
                conexao = await conectar();
                const sql = "DELETE FROM categoria WHERE codigo = ?";
                const parametros = [categoria.codigo];
                await conexao.execute(sql, parametros);
            } catch (erro) {
                console.log("Erro ao excluir categoria: " + erro.message);
            } finally {
                if (conexao) await conexao.release();
            }
        }
    }

    async consultar(termo) {
        let conexao;
        let listaCategorias = [];
        try {
            conexao = await conectar();
            let sql = "";
            let parametros = [];
            if (isNaN(parseInt(termo))) {
                sql = "SELECT * FROM categoria WHERE descricao LIKE ?";
                parametros = ['%' + termo + '%'];
            } else {
                sql = "SELECT * FROM categoria WHERE codigo = ?";
                parametros = [termo];
            }
            const [linhas] = await conexao.execute(sql, parametros);
            for (const linha of linhas) {
                const categoria = new Categoria(linha['codigo'], linha['descricao']);
                listaCategorias.push(categoria);
            }
        } catch (erro) {
            console.log("Erro ao consultar categoria: " + erro.message);
        } finally {
            if (conexao) await conexao.release();
        }
        return listaCategorias;
    }
}
