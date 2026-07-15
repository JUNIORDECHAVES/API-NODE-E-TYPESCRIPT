import { prisma } from "../../../../lib/prisma";


export const deleteById = async (id: number): Promise<Error | {
    id: number;
    nome: string;
}>  => {
    try {
        const cidadeExiste = await prisma.cidades.findFirst({
            where: {
                id
            },
        });

        if (!cidadeExiste) {
            return new Error("Cidade não encontrada");
        }

        const cidadeExcluida = await prisma.cidades.delete({
            where: {
                id
            }
        });
        return cidadeExcluida;
    } catch (error) {
        console.error("Erro ao excluir cidade:", error);
        return new Error("Erro ao excluir cidade");
    };
} 