import { prisma } from "../../../../lib/prisma.js";
import type { IPessoa } from "../../models/pessoa.js";

export const create = async (pessoa: Omit<IPessoa, "id">): Promise<IPessoa | Error> => {
    try {
        const possoaExistente = await prisma.pessoas.findFirst({
            where: { email: {
                equals: pessoa.email,
                mode: "insensitive"
            } }
        })
        if (possoaExistente) {
            throw new Error("Pessoa já cadastrada com este email.");
        }

        const cidadeExistente = await prisma.cidades.findFirst({
            where: { id: pessoa.cidadeId }
        })
        if (!cidadeExistente) {
            throw new Error("Cidade usada no cadastro não foi encontrada.");
        }

        const novaPessoa = await prisma.pessoas.create({
            data: pessoa
        });

        return novaPessoa;

    } catch (error) {
        console.error("Error ao criar pessoa:", error);
        throw new Error("Erro ao criar pessoa.");
    }
}