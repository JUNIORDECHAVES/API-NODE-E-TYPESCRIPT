import { prisma } from "../../../../lib/prisma"

export const updateById = async (id: number, nome: string): Promise<void | Error> => {
    try {
        const cidadeExiste = await prisma.cidades.findFirst({
            where: {
                id
            },
        })

        if (!cidadeExiste) {
            return new Error("Cidade nao encontrada");
        }

        const cidadeAtualizada = await prisma.cidades.update({
            where:{
                id
            },
            data: {
                nome: nome
            }
        })

        return;

    } catch (error) {
        console.error("Erro ao atualizar cidade:", error);
        return new Error("Erro ao atualizar cidade");
    }
}