import type { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as z from "zod";
import "../../shared/services/TranslationZod";
import { validation } from "../../shared/middleware";

export const cidadeValidation = z.object({
    nome: z.string().min(3),
});

export type ICidade = z.infer<typeof cidadeValidation>;

export const createValidation: RequestHandler = validation((getSchema) => ({
    body: getSchema(cidadeValidation),
}));

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
    return res.status(StatusCodes.CREATED).send("create success ");
};
