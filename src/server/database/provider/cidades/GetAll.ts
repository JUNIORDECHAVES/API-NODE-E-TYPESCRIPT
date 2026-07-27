import { prisma } from "../../../../lib/prisma.js";
import type { ICidade } from "../../models/index.js";


export interface IGetAllResult {
    todasCidades: ICidade[];
    totalCount: number;
}

interface filter {
    
        nome?: string;
        sobrenome?: string;
    
}


export const getAll = async (page?: number, limit?: number, filter?: string): Promise<IGetAllResult | Error> => {
    try {
        const whereCodicao = filter ? {
            nome: {
                contains: filter,
            }
        } : undefined;

        const pageLimitCodicao = {
            skip: (page! - 1) * limit!,
            take: limit,
            where: whereCodicao
        } 

        const todasCidades = await prisma.cidades.findMany(
            limit && page ? pageLimitCodicao : { where: whereCodicao }
        );

        const totalCount = await prisma.cidades.count({
            where: whereCodicao
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