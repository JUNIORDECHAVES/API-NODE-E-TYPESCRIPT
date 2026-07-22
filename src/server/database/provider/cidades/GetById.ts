import { prisma } from "../../../../lib/prisma.js";
import type { ICidade } from "../../models/index.js";


export const getById = async (id: number): Promise< ICidade | Error> => {
    try {
        const cidade = await prisma.cidades.findFirst({
            where: {
                id
            }
        });

        if (!cidade) {
            return new Error("Cidade não encontrada");
        }

        return cidade;
    } catch (error) {
        console.error("Erro ao criar cidade:", error);
        return new Error("Erro ao criar cidade");
    };
};