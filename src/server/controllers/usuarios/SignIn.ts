import type { Request, RequestHandler, Response } from "express";
import z from "zod";
import { validation } from "../../shared/middleware/Validation.js";
import { usuariosProvider } from "../../database/provider/usuarios/index.js";
import { StatusCodes } from "http-status-codes";
import { PasswordCrypto } from "../../shared/services/PasswordCrypto.js";
import { JWTService } from "../../shared/services/JWTService.js";

const usuarioValidacao = z.object({
    email: z.email().min(5),
    senha: z.string().min(6).max(30),
}).strict();

type SignInSchema = z.infer<typeof usuarioValidacao>;

export const SignInValidation: RequestHandler = validation((getSchema) => ({
    body: getSchema(usuarioValidacao),
}));

export const SignIn = async (req: Request<{}, {}, SignInSchema>, res: Response) => {

    const { email, senha } = req.body;

    const result = await usuariosProvider.getByEmail(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ errors: { default: "Usuário ou senha incorretos" } });

    };

    const comparePassword = await PasswordCrypto.verifyPassword(senha, result.senha);

    if (!comparePassword) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ errors: { default: "Usuário ou senha incorretos" } });
    } else {

        const acessToken = JWTService.sign({ uid: result.id});
        if (acessToken === "JWT_SECRET_NOT_FOUND") {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: 'Erro ao gerar o token de acesso'
                }
            });

        }


        return res.status(StatusCodes.OK).json({ acessToken });
    }






};