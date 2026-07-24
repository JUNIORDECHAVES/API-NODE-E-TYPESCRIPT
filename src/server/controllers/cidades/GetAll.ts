import z from "zod";
import { validation } from "../../shared/middleware/index.js";
import type { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { cidadesProvider } from "../../database/provider/cidades/index.js";


const Iqueryschema = z.object({
    page: z.coerce.number().int().min(1).optional(),
    limit: z.coerce.number().int().min(1).optional(),
    filter: z.string().optional(),
}).strict();

export const GetAllValidation: RequestHandler = validation((getSchema) => ({
    query: getSchema(Iqueryschema),
}));


export const getAll = async (req: Request, res: Response) => {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const filter = req.query.filter as string | undefined;

    const result = await cidadesProvider.getAll(page, limit, filter);

    if (result instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { default: result.message } });



    res.setHeader("access-control-expose-headers", "x-total-count");
    res.setHeader("x-total-count", result.totalCount);




    return res.status(StatusCodes.OK).json(result.todasCidades);
};