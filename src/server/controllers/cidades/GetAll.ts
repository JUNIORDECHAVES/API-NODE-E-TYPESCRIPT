import z from "zod";
import { validation } from "../../shared/middleware";
import type { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { cidadesProvider } from "../../database/provider/cidades";


const Iqueryschema = z.object({
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).optional().default(5),
    filter: z.string().optional(),
}).strict();

type IQueryprops = z.infer<typeof Iqueryschema>;

export const GetAllValidation: RequestHandler = validation((getSchema) => ({
    query: getSchema(Iqueryschema),
}));


export const getAll = async (req: Request<{}, {}, {}, IQueryprops>, res: Response) => {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const filter = req.query.filter;

    const result = await cidadesProvider.getAll(page, limit, filter);

    if (result instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { default: result.message } });



    res.setHeader("access-control-expose-headers", "x-total-count");
    res.setHeader("x-total-count", result.totalCount);




    return res.status(StatusCodes.OK).json(result.todasCidades);
};