import type { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import z from "zod";
import { validation } from "../../shared/middleware/Validation";
import { cidadesProvider } from "../../database/provider/cidades";


const paramsSchema = z.object({
    id: z.coerce.number().int().min(1).optional(),
});
const bodySchema = z.object({
    nome: z.string().min(3),
}).strict();

type IParamsProps = z.infer<typeof paramsSchema>;
type IBodyProps = z.infer<typeof bodySchema>;

export const updateByIdValidation: RequestHandler = validation((getSchema) => ({
    body: getSchema(bodySchema),
    params: getSchema(paramsSchema),
})
);


export const updatById = async (req: Request<IParamsProps, {}, IBodyProps>, res: Response) => {

    const result = await cidadesProvider.updateById(Number(req.params.id), req.body.nome);

    if (result instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { default: result.message } });

    res.status(StatusCodes.NO_CONTENT).json();
};