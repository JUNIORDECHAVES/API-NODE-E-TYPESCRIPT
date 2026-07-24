import { prisma } from "../../../../lib/prisma.js";
import type { ICidade } from "../../models/index.js";


export interface IGetAllResult {
    todasCidades: ICidade[];
    totalCount: number;
}


export const getAll = async (page?: number, limit?: number, filter?: string): Promise<IGetAllResult | Error> => {
    try {
        const whereCondition = filter ? {
            nome: {
                contains: filter,
                mode: 'insensitive' as const
            }
        } : undefined;

        const pageLimitCondition = {
            skip: (page! - 1) * limit!,
            take: limit,
            where: whereCondition,
        }

        const todasCidades = await prisma.cidades.findMany(
            limit && page ? pageLimitCondition : { where: whereCondition }
        );

        const totalCount = await prisma.cidades.count({
            where: whereCondition
        });

        const result: IGetAllResult = {
            todasCidades,
            totalCount
        };
        return result;


    } catch (error) {
        console.error("Erro ao listar cidades:", error);
        return new Error("Erro ao listar cidades");
    };
};