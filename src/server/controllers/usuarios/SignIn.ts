import type { Request, RequestHandler, Response } from "express";
import z from "zod";
import { validation } from "../../shared/middleware/Validation.js";
import { usuariosProvider } from "../../database/provider/usuarios/index.js";
import { StatusCodes } from "http-status-codes";

const usuarioValidacao = z.object({
    email: z.email().min(5),
    senha: z.string().min(6).max(30),
}).strict();

type SignInSchema = z.infer<typeof usuarioValidacao>;

export const SignInValidation: RequestHandler = validation((getSchema) => ({
    body: getSchema(usuarioValidacao),
}));

export const SignIn = async (req: Request<{}, {}, SignInSchema>, res: Response) => {


    const result = await usuariosProvider.getByEmail(req.body);

    if (result instanceof Error) {
        if (result.message === "Erro: Usuário com email existente .") {
            return res.status(StatusCodes.CONFLICT).json({ errors: { default: result.message } });
        };
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { default: result.message } });
    };

    if (req.body.senha !== result.senha) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ errors: { default: "Email ou senha incorretos" } });

    } else {
        return res.status(StatusCodes.OK).json({ acessToken: "teste.teste.teste", id: result.id });
    };



};