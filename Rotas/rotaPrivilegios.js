//Associar os métodos da camada de controle de produto 
//à requisições GET, POST, PUT, PATCH e DELETE HTTP

import { Router } from "express"; //micro-aplicação HTTP
import PrivilegioCtrl from "../Controle/privilegioCtrl.js";

const catCtrl = new PrivilegioCtrl();
const rotaPrivilegio = Router();

rotaPrivilegio.post("/", catCtrl.gravar);
rotaPrivilegio.put("/:codigo", catCtrl.editar);
rotaPrivilegio.patch("/:codigo", catCtrl.editar);
rotaPrivilegio.delete("/:codigo", catCtrl.excluir);
rotaPrivilegio.get("/:codigo", catCtrl.consultar);
rotaPrivilegio.get("/",catCtrl.consultar);

export default rotaPrivilegio;


