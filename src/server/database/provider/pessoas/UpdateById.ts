import { prisma } from "../../../../lib/prisma.js"
import type { Ipessoa } from "../../models/pessoa.js";

export const updateById = async (pessoa: Ipessoa): Promise<void | Error> => {
    try {
        const pessoaExiste = await prisma.cidades.findFirst({
            where: {
                id: pessoa.id
            },
        })
        if (!pessoaExiste) {
            return new Error("Pessoa nao encontrada");
        }

        const cidadeExistente = await prisma.cidades.findFirst({
            where: { id: pessoa.cidadeId }
        })
        if (!cidadeExistente) {
            throw new Error("Cidade usada na atualização não foi encontrada.");
        }

        const pessoaAtualizada = await prisma.cidades.update({
            where:{
                id: pessoa.id
            },
            data: {
                pessoa
            }
        })

        return;

    } catch (error) {
        console.error("Erro ao atualizar pessoa:", error);
        return new Error("Erro ao atualizar pessoa");
    }
}