import { prisma } from "../../../../lib/prisma.js";
import type { Ipessoa } from "../../models/pessoa.js";

interface IGetAllResult {
    todasPessoas: Ipessoa[];
    totalCount: number;
}

export const  getAll = async (page?: number, limit?: number, filter?: string)
: Promise<IGetAllResult | Error> => {
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