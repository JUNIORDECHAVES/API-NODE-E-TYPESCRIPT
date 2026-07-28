import { prisma } from "../../../../lib/prisma.js";
import type { IPessoa } from "../../models/pessoa.js";

export interface IGetAllResult {
    todasPessoas: IPessoa[];
    totalCount: number;
}

export interface filter {
    
        nome?: string;
        sobrenome?: string;
    
}

export const  getAll = async (page?: number, limit?: number, { nome, sobrenome }: filter = {}, filter?: string)
: Promise<IGetAllResult | Error> => {
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

        const pessoas = await prisma.pessoas.findMany(
            page && limit ? pageLimitCodicao : { where: whereCodicao }
        );

        const totalCount = await prisma.pessoas.count({
            where: whereCodicao
        });

        const result: IGetAllResult = {
            todasPessoas: pessoas,
            totalCount
        };

        return result;
    } catch (error) {
        console.error("Error ao buscar pessoas:", error);
        throw new Error("Erro ao buscar pessoas.");
    }
};