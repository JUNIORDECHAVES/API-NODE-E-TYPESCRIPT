import z from "zod";
import { validation } from "../../shared/middleware";
import type { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { cidadesProvider } from "../../database/provider/cidades";


const IparamSchema = z.object({
    id: z.coerce.number().int().min(1)
}).strict();

type IParamsProps = z.infer<typeof IparamSchema>;

export const deleteValidation: RequestHandler = validation((getSchema) => ({
    params: getSchema(IparamSchema),
}));


export const deleteById = async (req: Request<IParamsProps>, res: Response) => {
    
    const result = await cidadesProvider.deleteById(Number(req.params.id));


    if (result instanceof Error) return res.status(StatusCodes.BAD_REQUEST).json({ errors: { default: result.message } });


    return res.status(StatusCodes.NO_CONTENT).send();
};