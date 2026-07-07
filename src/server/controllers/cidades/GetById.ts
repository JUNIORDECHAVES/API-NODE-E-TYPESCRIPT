import z from "zod";
import { validation } from "../../shared/middleware";
import type { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";

const GetByIdParamsSchema = z.object({
    id: z.coerce.number().int().positive(),
});

type IParamsProps = { id: string };

export const GetByIdValidation: RequestHandler = validation((getSchema) => ({
    params: getSchema(GetByIdParamsSchema),
}));

export const getById = async (req: Request<IParamsProps>, res: Response) => {
    console.log(req.params);
    if (Number(req.params.id) === 99999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
            default: 'Registro não encontrado'
        }
    });

    return res.status(StatusCodes.OK).json({
        id: req.params.id,
        nome: 'Caxias do Sul',
    });
};