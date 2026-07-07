import z from "zod";
import { validation } from "../../shared/middleware";
import type { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";


const IparamSchema = z.object({
    id: z.coerce.number().int().min(1).optional(),
}).strict();

type IParamsProps = z.infer<typeof IparamSchema>;

export const deleteValidation: RequestHandler = validation((getSchema) => ({
    params: getSchema(IparamSchema),
}));


export const deleteById = async (req: Request<IParamsProps>, res: Response) => {
    console.log(req.params);

    if (Number(req.params.id) === 99999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
            default: "Registro não encontrado"
        }
    });

    return res.status(StatusCodes.NO_CONTENT).send();
};