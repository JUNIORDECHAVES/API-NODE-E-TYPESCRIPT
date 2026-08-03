import { prisma } from "../../../../lib/prisma.js";
import { PasswordCrypto } from "../../../shared/services/PasswordCrypto.js";
import type { IUsuario } from "../../models/usuario.js";


export const getByEmail = async (usuario: Pick<IUsuario, "email" | "senha">): Promise<IUsuario | Error> => {
    try {
        const usuarioExistente = await prisma.usuarios.findUnique({
            where: {
                email: usuario.email
            }
        });

        if (!usuarioExistente) {
            throw new Error("Usuário não encontrado.");
        }

        const comparePassword = await PasswordCrypto.verifyPassword(usuario.senha, usuarioExistente.senha );

        if (!comparePassword) {
            throw new Error("Senha incorreta.");
        }

        return usuarioExistente;
    } catch (error) {
        console.error("Error ao buscar pessoa:", error);
        if (error instanceof Error) return error;
        throw new Error("Erro ao buscar pessoa.");
    }
}