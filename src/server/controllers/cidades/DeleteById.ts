import z from "zod";
import { validation } from "../../shared/middleware/index.js";
import type { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { cidadesProvider } from "../../database/provider/cidades/index.js";


const IparamSchema = z.object({
    id: z.coerce.number().int().min(1)
}).strict();

export const deleteValidation: RequestHandler = validation((getSchema) => ({
    params: getSchema(IparamSchema),
}));


export const deleteById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const result = await cidadesProvider.deleteById(id);


    if (result instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { default: result.message } });


    return res.status(StatusCodes.NO_CONTENT).send();
};