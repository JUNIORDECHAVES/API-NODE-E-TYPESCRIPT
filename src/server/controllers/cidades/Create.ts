import type { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as z from "zod";
import "../../shared/services/TranslationZod";
import { validation } from "../../shared/middleware";
import { prisma } from "../../../lib/prisma";

export const cidadeValidation = z.object({
    nome: z.string().min(3),
});

export type ICidade = z.infer<typeof cidadeValidation>;

export const createValidation: RequestHandler = validation((getSchema) => ({
    body: getSchema(cidadeValidation),
}));

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {

    const { nome } = req.body;
const cidadeExistente = await prisma.cidades.findFirst({
    where: {
        nome
    },
});

if (cidadeExistente) {
    return res.status(StatusCodes.CONFLICT).json({ errors: { default: "Cidade ja cadastrada" } });
}

    await prisma.cidades.create({ data: {
        nome
    } });

    return res.status(StatusCodes.CREATED).json({ message: "Cidade cadastrada com sucesso!" });
};
