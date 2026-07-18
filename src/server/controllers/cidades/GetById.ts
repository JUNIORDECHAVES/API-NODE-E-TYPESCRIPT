import z from "zod";
import { validation } from "../../shared/middleware";
import type { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { cidadesProvider } from "../../database/provider/cidades";

const GetByIdParamsSchema = z.object({
    id: z.coerce.number().int().positive(),
});

type IParamsProps = { id: string };

export const GetByIdValidation: RequestHandler = validation((getSchema) => ({
    params: getSchema(GetByIdParamsSchema),
}));

export const getById = async (req: Request<IParamsProps>, res: Response) => {

    const result = await cidadesProvider.getById(Number(req.params.id));

    if (result instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { default: result.message } });

    return res.status(StatusCodes.OK).json(
        result
    );
};