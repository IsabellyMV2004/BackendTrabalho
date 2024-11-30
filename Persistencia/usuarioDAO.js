//DAO - Data Access Object
import Usuario from "../Modelo/usuario.js";
import Privilegio from "../Modelo/privilegio.js"

import conectar from "./Conexao.js";
export default class UsuarioDAO {
    constructor() {
        this.init();
    }

    async init() {
        try 
        {
            const conexao = await conectar(); //retorna uma conexão
            const sql = `
            CREATE TABLE IF NOT EXISTS usuario(
                usu_codigo INT NOT NULL AUTO_INCREMENT,
                usu_email VARCHAR(200) NOT NULL,
                usu_senha VARCHAR(200) NOT NULL,
                usu_nome VARCHAR(200) NOT NULL,
                usu_telefone VARCHAR(12) NOT NULL DEFAULT 0,
                usu_endereco VARCHAR(200),
                fk_codigo_usu INT NOT NULL,
                CONSTRAINT pk_usuario PRIMARY KEY(usu_codigo),
                CONSTRAINT fk_privilegio FOREIGN KEY(fk_codigo_usu) REFERENCES privilegio(codigo) 
            )
        `;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async incluir(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = `INSERT INTO usuario(usu_email,usu_senha,usu_nome,usu_telefone,usu_endereco, fk_codigo_usu)
                values(?,?,?,?,?,str_to_date(?,'%d/%m/%Y'),?)
            `;
            let parametros = [
                usuario.email,
                usuario.senha,
                usuario.nome,
                usuario.telefone,
                usuario.endereco,
                usuario.privilegio.codigo
            ]; //dados do usuario
            const resultado = await conexao.execute(sql, parametros);
            usuario.codigo = resultado[0].insertId;
            await conexao.release(); //libera a conexão
        }
    }
    async alterar(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = `UPDATE usuario SET usu_email=?,usu_senha=?,usu_nome=?,usu_telefone=?,usu_endereco=?, fk_codigo_usu = ?
                WHERE usu_codigo = ?
            `;
            let parametros = [
                usuario.email,
                usuario.senha,
                usuario.nome,
                usuario.telefone,
                usuario.endereco,
                usuario.privilegio.codigo,
                usuario.codigo
            ]; //dados do usuario
            await conexao.execute(sql, parametros);
            await conexao.release(); //libera a conexão
        }
    }
    async consultar(termo) {
        //resuperar as linhas da tabela usuario e transformá-las de volta em usuarios
        const conexao = await conectar();
        let sql = "";
        let parametros = [];
        if (isNaN(parseInt(termo))) {
            sql = `SELECT * FROM usuario p
                   INNER JOIN privilegio c ON p.fk_codigo_usu = c.codigo
                   WHERE usu_email LIKE ?`;
            parametros = ['%' + termo + '%'];
        }
        else {
            sql = `SELECT * FROM usuario p
                   INNER JOIN privilegio c ON p.fk_codigo_usu = c.codigo 
                   WHERE usu_codigo = ?`
            parametros = [termo];
        }
        const [linhas, campos] = await conexao.execute(sql, parametros);
        let listaUsuarios = [];
        for (const linha of linhas) {
            const privilegio = new Privilegio(linha['codigo'],linha["email"]);    
            const usuario = new Usuario(
                linha['usu_codigo'],
                linha['usu_email'],
                linha['usu_senha'],
                linha['usu_nome'],
                linha['usu_telefone'],
                linha['usu_endereco'],
                privilegio
            );
            listaUsuarios.push(usuario);
        }
        await conexao.release();
        return listaUsuarios;
    }
    async excluir(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = `DELETE FROM usuario WHERE usu_codigo = ?`;
            let parametros = [
                usuario.codigo
            ]; //dados do usuario
            await conexao.execute(sql, parametros);
            await conexao.release(); //libera a conexão
        }
    }
}