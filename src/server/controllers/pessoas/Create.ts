import type { Request, RequestHandler, Response } from "express";
import z from "zod";
import { validation } from "../../shared/middleware/Validation.js";
import { pessoasProvider } from "../../database/provider/pessoas/index.js";
import { StatusCodes } from "http-status-codes";


const pessoaValidacao = z.object({
    email: z.email(),
    cidadeId: z.coerce.number().int().min(1),
    nome: z.string().min(3).max(100),
    sobrenome: z.string().min(3).max(100),
});

export type IBodyPessoa = z.infer<typeof pessoaValidacao>;

export const createValidation: RequestHandler = validation((getSchema) => (
    {
        body: getSchema(pessoaValidacao),
    }
))

export const create = async (req: Request<{}, {}, IBodyPessoa>, res: Response) => {

    const result = await pessoasProvider.create(req.body);

    if (result instanceof Error) {

        if (result.message === "Cidade usada no cadastro não foi encontrada.") {
            return res.status(StatusCodes.NOT_FOUND).json({ errors: { default: result.message } });
        };
        if (result.message === "Pessoa já cadastrada com este E-mail.") {
            return res.status(StatusCodes.CONFLICT).json({ errors: { default: result.message } });
        };

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { default: result.message } });
    };

    return res.status(StatusCodes.CREATED).json({ message: "Pessoa cadastrada com sucesso!", id: result.id });
}