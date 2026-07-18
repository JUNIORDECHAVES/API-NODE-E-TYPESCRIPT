import { prisma } from "../../../../lib/prisma";


export const deleteById = async (id: number): Promise<void | Error>  => {
    try {
        const cidadeExiste = await prisma.cidades.findFirst({
            where: {
                id
            },
        });

        if (!cidadeExiste) {
            return new Error("erro ao excluir cidade, cidade não encontrada");
        }

        const cidadeExcluida = await prisma.cidades.delete({
            where: {
                id
            }
        });
        return;
    } catch (error) {
        console.error("Erro ao excluir cidade:", error);
        return new Error("Erro ao excluir cidade");
    };
} 