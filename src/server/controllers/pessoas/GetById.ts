import z from "zod";
import { validation } from "../../shared/middleware/index.js";
import type { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { pessoasProvider } from "../../database/provider/pessoas/index.js";

const GetByIdParamsSchema = z.object({
    id: z.coerce.number().int().positive().min(1),
});

type IParamsProps = { id: string };

export const getByIdValidation: RequestHandler = validation((getSchema) => ({
    params: getSchema(GetByIdParamsSchema),
}));

export const getById = async (req: Request<IParamsProps>, res: Response) => {
    if (!req.params.id) return res.status(StatusCodes.BAD_REQUEST).json({ errors: { default: "O parâmetro 'id' é obrigatório" } });

    const result = await pessoasProvider.getById(Number(req.params.id));

    if (result instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { default: result.message } });

    return res.status(StatusCodes.OK).json(
        result
    );
};