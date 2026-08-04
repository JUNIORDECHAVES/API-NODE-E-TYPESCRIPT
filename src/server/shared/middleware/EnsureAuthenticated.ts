import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { JWTService } from "../services/JWTService.js";


export const EnsureAuthenticated: RequestHandler = async (req, res, next) => {

    const authHeader = req.headers.authorization;

    const [type, token] = authHeader?.split(" ") ?? [];
    if (type !== "Bearer") {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Não autenticado" });
    }

    const jwtData = JWTService.verify(token as string);

    if (jwtData === "JWT_SECRET_NOT_FOUND") {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error:
                { default: "Erro ao gerar o token de acesso" }
        });
    }
    if (jwtData === "INVALID_TOKEN") {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            error:
                { default: "Não autenticado" }
        });
    }

    console.log(jwtData);

    req.headers.idUsuario = jwtData.uid.toString();


    return next();
};