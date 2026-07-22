import { prisma } from "../../../../lib/prisma.js";


export const create = async (nome: string): Promise< number | Error> => {
    try {
        const cidadeExistente = await prisma.cidades.findFirst({
            where: {
                nome: {
                    equals: nome,
                    mode: 'insensitive'
                }
            },
        });

        if (cidadeExistente) {
            return new Error("Cidade já existente");
        }

        const novaCidade = await prisma.cidades.create({
            data: {
                nome
            }
        });
        return novaCidade.id;
    } catch (error) {
        console.error("Erro ao criar cidade:", error);
        return new Error("Erro ao criar cidade");
    };
};