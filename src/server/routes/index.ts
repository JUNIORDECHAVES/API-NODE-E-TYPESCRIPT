import { Router } from "express";
const router: Router = Router();
import { cidadesControlles, pessoasControlles } from "../controllers/index.js";

router.get("/", (req, res) => {
    res.send("Hello guys!");
})

//Cidades
router.get("/cidades", cidadesControlles.GetAllValidation, cidadesControlles.getAll);
router.post("/cidades", cidadesControlles.createValidation, cidadesControlles.create);
router.get("/cidades/:id", cidadesControlles.GetByIdValidation, cidadesControlles.getById);
router.put("/cidades/:id", cidadesControlles.updateByIdValidation, cidadesControlles.updatById);
router.delete("/cidades/:id", cidadesControlles.deleteValidation, cidadesControlles.deleteById);

//Pessoas
router.get("/pessoas", pessoasControlles.getAllValidation, pessoasControlles.getAll);
router.post("/pessoas", pessoasControlles.createValidation, pessoasControlles.create);
router.get("/pessoas/:id", pessoasControlles.getByIdValidation, pessoasControlles.getById);
router.put("/pessoas/:id", pessoasControlles.updateByIdValidation, pessoasControlles.updatById);
router.delete("/pessoas/:id", pessoasControlles.deleteValidation, pessoasControlles.deleteById);

export { router };