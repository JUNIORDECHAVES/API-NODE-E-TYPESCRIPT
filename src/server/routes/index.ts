import { Router } from "express";
const router: Router = Router();
import { cidadesControlles, pessoasControlles } from "../controllers/index.js";
import { usuariosControlles } from "../controllers/usuarios/index.js";
import { EnsureAuthenticated } from "../shared/middleware/index.js";

router.get("/", (req, res) => {
    res.send("Hello guys!");
})

//Cidades
router.get("/cidades", EnsureAuthenticated, cidadesControlles.GetAllValidation, cidadesControlles.getAll);
router.post("/cidades", EnsureAuthenticated, cidadesControlles.createValidation, cidadesControlles.create);
router.get("/cidades/:id", EnsureAuthenticated, cidadesControlles.GetByIdValidation, cidadesControlles.getById);
router.put("/cidades/:id", EnsureAuthenticated, cidadesControlles.updateByIdValidation, cidadesControlles.updatById);
router.delete("/cidades/:id", EnsureAuthenticated, cidadesControlles.deleteValidation, cidadesControlles.deleteById);

//Pessoas
router.get("/pessoas", EnsureAuthenticated, pessoasControlles.getAllValidation, pessoasControlles.getAll);
router.post("/pessoas", EnsureAuthenticated, pessoasControlles.createValidation, pessoasControlles.create);
router.get("/pessoas/:id", EnsureAuthenticated, pessoasControlles.getByIdValidation, pessoasControlles.getById);
router.put("/pessoas/:id", EnsureAuthenticated, pessoasControlles.updateByIdValidation, pessoasControlles.updateById);
router.delete("/pessoas/:id", EnsureAuthenticated, pessoasControlles.deleteValidation, pessoasControlles.deleteById);

//Usuários
router.post("/entrar", usuariosControlles.SignInValidation, usuariosControlles.SignIn);
router.post("/cadastrar", usuariosControlles.SignUpValidation, usuariosControlles.SignUp);

export { router };