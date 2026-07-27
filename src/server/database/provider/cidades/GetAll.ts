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


export const getAll = async (page?: number, limit?: number, { nome, sobrenome }: filter = {}): Promise<IGetAllResult | Error> => {
    try {
        const whereCodicao = nome && sobrenome ? {
            nome: {
                contains: nome,
                mode: 'insensitive' as const
            },
            sobrenome: {
                contains: sobrenome,
                mode: 'insensitive' as const
            }
        } : undefined;

        const pageLimitCodicao = {
            skip: (page! - 1) * limit!,
            take: limit,
            where: whereCodicao,
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