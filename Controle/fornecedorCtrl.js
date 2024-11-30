//É a classe responsável por traduzir requisições HTTP e produzir respostas HTTP
import Fornecedor from "../Modelo/fornecedor.js";

export default class FornecedorCtrl{
/*
    gravar(requisicao, resposta){
        //preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");
        //Verificando se o método da requisição é POST e conteúdo é JSON
        if (requisicao.method == 'POST' && requisicao.is("application/json")){
            const cpf  = requisicao.body.cpf;
            //pseudo validação
            if (cpf)
            {
                //gravar a fornecedor
                const fornecedor = new Fornecedor(0,cpf);
                fornecedor.gravar()
                .then(()=>{
                    resposta.status(200).json({
                        "status":true,
                        "mensagem":"Fornecedor adicionada com sucesso!",
                        "codigo": fornecedor.codigo
                    });
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Não foi possível incluir a fornecedor: " + erro.message
                    });
                });
            }
            else
            {
                resposta.status(400).json(
                    {
                        "status":false,
                        "mensagem":"Informe corretamente todos os dados de uma fornecedor conforme documentação da API."
                    }
                );
            }

        }
        else
        {
            resposta.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida! Consulte a documentação da API."
            });

        }

    }

    editar(requisicao, resposta){
        //preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");
        //Verificando se o método da requisição é POST e conteúdo é JSON
        if ((requisicao.method == 'PUT' || requisicao.method == 'PATCH') && requisicao.is("application/json")){
            //o código será extraída da URL (padrão REST)
            const codigo = requisicao.params.codigo;
            const cpf  = requisicao.body.cpf;
            
            //pseudo validação
            if (codigo > 0 && cpf)
            {
                //alterar a fornecedor
                const fornecedor = new Fornecedor(codigo,cpf);
                fornecedor.editar().then(()=>{
                    resposta.status(200).json({
                        "status":true,
                        "mensagem":"fornecedor alterada com sucesso!",
                    });
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Não foi possível alterar a fornecedor: " + erro.message
                    });
                });
            }
            else
            {
                resposta.status(400).json(
                    {
                        "status":false,
                        "mensagem":"Informe corretamente todos os dados de uma fornecedor conforme documentação da API."
                    }
                );
            }
        }
        else
        {
            resposta.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida! Consulte a documentação da API."
            });

        }
    }

    excluir(requisicao, resposta){
        //preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");
        //Verificando se o método da requisição é POST e conteúdo é JSON
        if (requisicao.method == 'DELETE'){
            //o código será extraída da URL (padrão REST)
            const codigo = requisicao.params.codigo;
            //pseudo validação
            if (codigo > 0)
            {
                //alterar o fornecedor
                const fornecedor = new Fornecedor(codigo);
                fornecedor.excluir()
                .then(()=>{
                    resposta.status(200).json({
                        "status":true,
                        "mensagem":"fornecedor excluída com sucesso!",
                    });
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Não foi possível excluir o fornecedor: " + erro.message
                    });
                });
            }
            else
            {
                resposta.status(400).json(
                    {
                        "status":false,
                        "mensagem":"Informe um código válido de uma fornecedor conforme documentação da API."
                    }
                );
            }

        }
        else
        {
            resposta.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida! Consulte a documentação da API."
            });

        }
    }

    consultar(requisicao, resposta){
        resposta.type("application/json");
        if (requisicao.method=="GET"){
            let codigo = requisicao.params.codigo;
            //evitar que código tenha valor undefined
            if (isNaN(codigo)){
                codigo = "";
            }

            const fornecedor = new Fornecedor();
            //método consultar retorna uma lista de fornecedors
            fornecedor.consultar(codigo)
            .then((listaFornecedors) =>{
                resposta.status(200).json(listaFornecedors
                    /*{
                        "status": true,
                        "listafornecedors": listafornecedors
                    }*//*
                );
            })
            .catch((erro) => {
                resposta.status(500).json(
                    {
                        "status":false,
                        "mensagem":"Erro ao consultar fornecedors:" + erro.message    
                    }
                );
            });

        }
        else
        {
            resposta.status(400).json(
                {
                    "status":false,
                    "mensagem":"Requisição inválida! Consulte a documentação da API."
                }
            );
        }
    }
*/


gravar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method == 'POST' && requisicao.is("application/json")) {
        const { nome, endereco, telefone, email, produtos } = requisicao.body;

        if (nome && endereco && telefone && email) {
            const fornecedor = new Fornecedor(0, nome, endereco, telefone, email, produtos || []);
            fornecedor.gravar()
                .then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Fornecedor adicionado com sucesso!",
                        "codigo": fornecedor.codigo
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Não foi possível incluir o fornecedor: " + erro.message
                    });
                });
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Informe corretamente todos os dados do fornecedor conforme documentação da API."
            });
        }
    } else {
        resposta.status(400).json({
            "status": false,
            "mensagem": "Requisição inválida! Consulte a documentação da API."
        });
    }
}

editar(requisicao, resposta) {
    resposta.type("application/json");
    if ((requisicao.method == 'PUT' || requisicao.method == 'PATCH') && requisicao.is("application/json")) {
        const codigo = requisicao.params.codigo;
        const { nome, endereco, telefone, email, produtos } = requisicao.body;

        if (codigo > 0 && nome && endereco && telefone && email) {
            const fornecedor = new Fornecedor(codigo, nome, endereco, telefone, email, produtos || []);
            fornecedor.alterar()
                .then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Fornecedor alterado com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Não foi possível alterar o fornecedor: " + erro.message
                    });
                });
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Informe corretamente todos os dados do fornecedor conforme documentação da API."
            });
        }
    } else {
        resposta.status(400).json({
            "status": false,
            "mensagem": "Requisição inválida! Consulte a documentação da API."
        });
    }
}


consultar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method == "GET") {
        let codigo = requisicao.params.codigo;
        if (isNaN(codigo)) {
            codigo = "";
        }

        const fornecedor = new Fornecedor();
        fornecedor.consultar(codigo)
            .then((listaFornecedores) => {
                resposta.status(200).json(listaFornecedores.map(f => ({
                    codigo: f.codigo,
                    nome: f.nome,
                    endereco: f.endereco,
                    telefone: f.telefone,
                    email: f.email,
                    produtos: f.produtos // Inclui os produtos na resposta
                })));
            })
            .catch((erro) => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao consultar fornecedores: " + erro.message
                });
            });
    } else {
        resposta.status(400).json({
            "status": false,
            "mensagem": "Requisição inválida! Consulte a documentação da API."
        });
    }
}


excluir(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method == 'DELETE') {
        const codigo = requisicao.params.codigo;

        if (codigo > 0) {
            const fornecedor = new Fornecedor(codigo);
            fornecedor.excluir()
                .then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Fornecedor excluído com sucesso! Todos os produtos vinculados também foram removidos."
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Não foi possível excluir o fornecedor: " + erro.message
                    });
                });
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Informe um código válido de fornecedor conforme documentação da API."
            });
        }
    } else {
        resposta.status(400).json({
            "status": false,
            "mensagem": "Requisição inválida! Consulte a documentação da API."
        });
    }
}

}