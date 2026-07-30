import type { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import z from "zod";
import { validation } from "../../shared/middleware/Validation.js";
import { pessoasProvider } from "../../database/provider/pessoas/index.js";


const paramsSchema = z.object({
    id: z.coerce.number().int().min(1).optional(),
});
const bodySchema = z.object({
    nome: z.string().min(3).optional(),
    sobrenome: z.string().min(3).optional(),
    cidadeId: z.coerce.number().int().min(1).optional(),
    email: z.email().optional(),
}).strict();

type IParamsProps = z.infer<typeof paramsSchema>;
type IBodyProps = z.infer<typeof bodySchema>;

export const updateByIdValidation: RequestHandler = validation((getSchema) => ({
    body: getSchema(bodySchema),
    params: getSchema(paramsSchema),
})
);


export const updateById = async (req: Request<IParamsProps, {}, IBodyProps>, res: Response) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: { default: "Preencha ao menos um dos campos para atualizar seu cadastro" }
        });
    }

    const result = await pessoasProvider.updateById(Number(req.params.id), req.body);

    if (result instanceof Error) {
        if (result.message === "Cidade usada na atualização não foi encontrada.") {
            return res.status(StatusCodes.NOT_FOUND).json({ errors: { default: result.message } });
        };
        if (result.message === "Pessoa não encontrada") {
            return res.status(StatusCodes.NOT_FOUND).json({ errors: { default: result.message } });

        };
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { default: result.message } });
    }


    res.status(StatusCodes.NO_CONTENT).json();
};