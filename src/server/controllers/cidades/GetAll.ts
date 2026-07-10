import z from "zod";
import { validation } from "../../shared/middleware";
import type { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../../../lib/prisma";


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
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const filter = req.query.filter;

    const whereCondition = filter ? {
        nome: {
            contains: filter,
            mode: 'insensitive' as const
        }
    } : undefined;

    const todasCidades = await prisma.cidades.findMany({
        skip: (page - 1) * limit,
        take: limit, 
        where: whereCondition,
    });

    const totalCount = await prisma.cidades.count({
        where: whereCondition
    });


    res.setHeader("access-control-expose-headers", "x-total-count");
    res.setHeader("x-total-count", totalCount);
    
    return res.status(StatusCodes.OK).json(todasCidades);
};