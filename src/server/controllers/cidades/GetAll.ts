import z from "zod";
import { validation } from "../../shared/middleware";
import type { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";


const Iqueryschema = z.object({
    page: z.coerce.number().int().min(1).optional(),
    limit: z.coerce.number().int().min(1).optional(),
    filter: z.string().optional(),
}).strict();

type IQueryprops = z.infer<typeof Iqueryschema>;

export const GetAllValidation: RequestHandler = validation((getSchema) => ({
    query: getSchema(Iqueryschema),
}));


export const getAll = async (req: Request<{}, {}, {}, IQueryprops>, res: Response) => {
    res.setHeader("access-control-expose-headers", "x-total-count");
    res.setHeader("x-total-count", 1);
    
    return res.status(StatusCodes.OK).json([
        {
            id: 1,
            nome: "Caxias do Sul",
        }
    ]);
};