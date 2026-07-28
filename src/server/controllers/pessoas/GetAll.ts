import z from "zod";
import { validation } from "../../shared/middleware/index.js";
import type { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { pessoasProvider } from "../../database/provider/pessoas/index.js";


const Iqueryschema = z.object({
    page: z.coerce.number().int().min(1).optional(),
    limit: z.coerce.number().int().min(1).optional(),
    filter: z.object({
        nome: z.string().optional(),
        sobrenome: z.string().optional(),
    }).optional(),
}).strict();

export type Iquery = z.infer<typeof Iqueryschema>;

export const getAllValidation: RequestHandler = validation((getSchema) => ({
    query: getSchema(Iqueryschema),
}));


    export const getAll = async (req: Request<{}, {}, {}, Iquery>, res: Response) => {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const { nome, sobrenome } = req.query.filter || {};

    const result = await pessoasProvider.getAll(page, limit, { nome, sobrenome });

    if (result instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { default: result.message } });



    res.setHeader("access-control-expose-headers", "x-total-count");
    res.setHeader("x-total-count", result.totalCount);




    return res.status(StatusCodes.OK).json(result.todasPessoas);
};