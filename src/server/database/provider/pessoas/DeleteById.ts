import { prisma } from "../../../../lib/prisma.js";


export const deleteById =async (id: number): Promise<void | Error> => {
    try {
        const pessoa = prisma.pessoas.findUnique({
            where: {
                id
            }
        });

        if (!pessoa) {
            throw new Error("Pessoa nao encontrada");
        }

        const pessoaExcluida = await prisma.pessoas.delete({where: {id}});

        return;
    } catch (error) {
        console.error("Error ao excluir pessoa:", error);
        throw new Error("Erro ao excluir pessoa.");
    }
};