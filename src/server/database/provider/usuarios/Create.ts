import { prisma } from "../../../../lib/prisma.js";
import type { IUsuario } from "../../models/usuario.js";


export const create = async (usuario: Omit<IUsuario, "id">): Promise<Pick<IUsuario, "id"> | Error> => {
    try {
        const usuarioExistente = await prisma.usuarios.findFirst({
            where: { email: usuario.email }
        })
        if (usuarioExistente) {
            throw new Error("Erro: Usuário com email existente .");
        }

        const novoUsuario = await prisma.usuarios.create({
            data: usuario
        });

        return { id: novoUsuario.id };

    } catch (error) {
        console.error("Error ao criar usuário:", error);
        if (error instanceof Error) return error;

        throw new Error("Erro ao criar usuário.");

    }
};