import { prisma } from "../../../../lib/prisma.js"
import type { IPessoa } from "../../models/pessoa.js";

export const updateById = async (id: number ,pessoa: Partial<Omit<IPessoa, "id">>): Promise<void | Error> => {
    try {
        const pessoaExiste = await prisma.pessoas.findFirst({
            where: {
                id: id
            },
        })
        if (!pessoaExiste) {
            return new Error("Pessoa não encontrada");
        }

        const cidadeExistente = await prisma.cidades.findFirst({
            where: { id: pessoa.cidadeId }
        })
        if (!cidadeExistente) {
            throw new Error("Cidade usada na atualização não foi encontrada.");
        }

        const pessoaAtualizada = await prisma.pessoas.update({
            where:{
                id: id
            },
            data: pessoa
            
        })

        return;

    } catch (error) {
        console.error("Erro ao atualizar pessoa:", error);
        return new Error("Erro ao atualizar pessoa");
    }
}