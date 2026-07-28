import { prisma } from "../../../../lib/prisma.js";
import type { IPessoa } from "../../models/pessoa.js";

export const getById = async (id: number): Promise<IPessoa | Error> => {
    try {
        const pessoa = await prisma.pessoas.findUnique({
            where: {
                id
            }
        });

        if (!pessoa) {
            throw new Error("Pessoa não encontrada.");
        }

        return pessoa;
    } catch (error) {
        console.error("Error ao buscar pessoa:", error);
        throw new Error("Erro ao buscar pessoa.");
    }
}