import type { Request, RequestHandler, Response } from "express";
import z from "zod";
import { validation } from "../../shared/middleware/Validation.js";
import { usuariosProvider } from "../../database/provider/usuarios/index.js";
import { StatusCodes } from "http-status-codes";

const usuarioValidacao = z.object({
    nome: z.string().min(3).max(100),
    sobrenome: z.string().min(3).max(100),
    email: z.email().min(5),
    senha: z.string().min(6).max(30),
}).strict();

export const SignUpValidation: RequestHandler = validation((getSchema) => ({
    body: getSchema(usuarioValidacao),
}));

export const SignUp = async (req: Request, res: Response) => {

    const result = await usuariosProvider.create(req.body);

    if (result instanceof Error) {
        if(result.message === "Erro: Usuário com email existente .") {
            return res.status(StatusCodes.CONFLICT).json({ errors: { default: result.message } });
        };
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { default: result.message } });
    };

    return res.status(StatusCodes.CREATED).json({ message: "Usuário cadastrado com sucesso!", id: result.id });
    
};