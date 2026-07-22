import type { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as z from "zod";
import "../../shared/services/TranslationZod.js";
import { validation } from "../../shared/middleware/index.js";
import { cidadesProvider } from "../../database/provider/cidades/index.js";

export const cidadeValidation = z.object({
    nome: z.string().min(3).max(100),
});

export type ICidade = z.infer<typeof cidadeValidation>;

export const createValidation: RequestHandler = validation((getSchema) => ({
    body: getSchema(cidadeValidation),
}));

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {

    const result = await cidadesProvider.create(req.body.nome);

    if (result instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { default: result.message } });


    return res.status(StatusCodes.CREATED).json({ message: "Cidade cadastrada com sucesso!", id: result });
};
