import { prisma } from "../../../../lib/prisma.js";
import type { IPessoa } from "../../models/pessoa.js";

export const create = async (pessoa: Omit<IPessoa, "id">): Promise<IPessoa | Error> => {
    try {
        const cidadeExistente = await prisma.cidades.findFirst({
            where: { id: pessoa.cidadeId }
        })
        if (!cidadeExistente) {
            throw new Error("Cidade usada no cadastro não foi encontrada.");
        }

        const pessoaExistente = await prisma.pessoas.findFirst({
            where: {
                email: {
                    equals: pessoa.email,
                    mode: "insensitive"
                }
            }
        })
        if (pessoaExistente) {
            throw new Error("Pessoa já cadastrada com este E-mail.");
        }

        const novaPessoa = await prisma.pessoas.create({
            data: pessoa
        });

        return novaPessoa;

    } catch (error) {
        console.error("Error ao criar pessoa:", error);
        if (error instanceof Error) return error;

        throw new Error("Erro ao criar pessoa.");

    }
}