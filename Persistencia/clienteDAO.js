//DAO - Data Access Object
/*import Cliente from "../Modelo/cliente.js";

import conectar from "./Conexao.js";
export default class ClienteDAO {
    constructor() {
        this.init();
    }

    async init() {
        try 
        {
            const conexao = await conectar(); 
            const sql = `
            CREATE TABLE IF NOT EXISTS cliente(
                cli_codigo INT NOT NULL AUTO_INCREMENT,
                cli_nome VARCHAR(200) NOT NULL,
                cli_endereco VARCHAR(200) NOT NULL,
                cli_telefone VARCHAR(12) NOT NULL DEFAULT 0,
                cli_endereco VARCHAR(200),
                cli_email VARCHAR(200),
                CONSTRAINT pk_cliente PRIMARY KEY(cli_codigo)
            )
        `;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async incluir(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = `INSERT INTO cliente(cli_nome,cli_endereco,cli_telefone,cli_email)
                values(?,?,?,?)
            `;
            let parametros = [
                cliente.nome,
                cliente.endereco,
                cliente.telefone,
                cliente.email
            ]; //dados do cliente
            const resultado = await conexao.execute(sql, parametros);
            cliente.codigo = resultado[0].insertId;
            await conexao.release(); //libera a conexão
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
            sql = `SELECT * FROM cliente 
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
    async excluir(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = `DELETE FROM cliente WHERE cli_codigo = ?`;
            let parametros = [
                cliente.codigo
            ]; //dados do cliente
            await conexao.execute(sql, parametros);
            await conexao.release(); //libera a conexão
        }
    }
}*/

//DAO - Data Access Object
import Cliente from "../Modelo/cliente.js";
import conectar from "./Conexao.js";

export default class ClienteDAO {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar(); 
            const sql = `
                CREATE TABLE IF NOT EXISTS cliente(
                    cli_codigo INT NOT NULL AUTO_INCREMENT,
                    cli_nome VARCHAR(200) NOT NULL,
                    cli_endereco VARCHAR(200) NOT NULL,
                    cli_telefone VARCHAR(12) NOT NULL DEFAULT 0,
                    cli_email VARCHAR(200),
                    CONSTRAINT pk_cliente PRIMARY KEY(cli_codigo)
                )
            `;
            await conexao.execute(sql);
            await conexao.release();
        } catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async incluir(cliente) {
        if (cliente instanceof Cliente) {
            // Verifica se todos os campos obrigatórios estão preenchidos
            if (!cliente.nome || !cliente.endereco || !cliente.telefone || !cliente.email) {
                throw new Error("Todos os campos obrigatórios devem ser preenchidos.");
            }

            const conexao = await conectar();
            const sql = `
                INSERT INTO cliente(cli_nome, cli_endereco, cli_telefone, cli_email)
                VALUES(?, ?, ?, ?)
            `;
            const parametros = [cliente.nome, cliente.endereco, cliente.telefone, cliente.email];
            const resultado = await conexao.execute(sql, parametros);
            cliente.codigo = resultado[0].insertId;
            await conexao.release();
        } else {
            throw new Error("O objeto cliente não é válido.");
        }
    }

    async alterar(cliente) {
        if (cliente instanceof Cliente) {
            // Verifica se todos os campos obrigatórios estão preenchidos
            if (!cliente.nome || !cliente.endereco || !cliente.telefone || !cliente.email) {
                throw new Error("Todos os campos obrigatórios devem ser preenchidos.");
            }

            const conexao = await conectar();
            const sql = `
                UPDATE cliente SET cli_nome=?, cli_endereco=?, cli_telefone=?, cli_email=?
                WHERE cli_codigo = ?
            `;
            const parametros = [cliente.nome, cliente.endereco, cliente.telefone, cliente.email, cliente.codigo];
            await conexao.execute(sql, parametros);
            await conexao.release();
        } else {
            throw new Error("O objeto cliente não é válido.");
        }
    }

    async consultar(termo) {
        const conexao = await conectar();
        let sql = "";
        let parametros = [];
        if (isNaN(parseInt(termo))) {
            sql = `SELECT * FROM cliente WHERE cli_nome LIKE ?`;
            parametros = ['%' + termo + '%'];
        } else {
            sql = `SELECT * FROM cliente WHERE cli_codigo = ?`;
            parametros = [termo];
        }

        const [linhas] = await conexao.execute(sql, parametros);
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

    /*async excluir(cliente) {
        if (cliente instanceof Cliente && cliente.codigo) {
            try {
                const conexao = await conectar();
                const sql = `DELETE FROM cliente WHERE cli_codigo = ?`;
                const parametros = [cliente.codigo];
                await conexao.execute(sql, parametros);
                await conexao.release();
            } catch (err) {
                console.error("Erro ao excluir cliente:", err.message);
                throw new Error("Erro ao excluir cliente: " + err.message);
            }
        } else {
            throw new Error("Cliente ou código inválido.");
        }
    }*/

        async excluir(cliente) {
            if (cliente instanceof Cliente && cliente.codigo) {
                const conexao = await conectar();
                const sql = `DELETE FROM cliente WHERE cli_codigo = ?`;
                let parametros = [cliente.codigo]; // Garantir que o código esteja definido
                await conexao.execute(sql, parametros);
                await conexao.release(); // Libera a conexão
            } else {
                console.error('Cliente ou código inválido para exclusão:', cliente);
            }
        }
        
}
