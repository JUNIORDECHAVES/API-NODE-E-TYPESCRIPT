import { Router } from "express";
const router = Router();
import { StatusCodes } from "http-status-codes";
router.get('/', (req, res) => {
    res.send('Hello World, baby!');
});
router.post('/name/:name', (req, res) => {
    console.log(req.body);
    res.status(StatusCodes.OK).json({ message: `Hello ${req.body.name}, baby!` });
});
export { router };
//# sourceMappingURL=index.js.map