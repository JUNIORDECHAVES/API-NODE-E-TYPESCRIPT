import { Router } from "express";
const router: Router = Router();
import { cidadesControlles } from "../controllers";

router.get('/cidades', cidadesControlles.GetAllValidation, cidadesControlles.getAll);
router.post('/cidades', cidadesControlles.createValidation, cidadesControlles.create);
router.get('/cidades/:id', cidadesControlles.GetByIdValidation, cidadesControlles.getById);
router.put('/cidades/:id', cidadesControlles.updateByIdValidation, cidadesControlles.updatById);
router.delete('/cidades/:id', cidadesControlles.deleteValidation, cidadesControlles.deleteById);

export { router };