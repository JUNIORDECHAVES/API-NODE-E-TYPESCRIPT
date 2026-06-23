import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import z from "zod";

type TProperty = "body" | "query" | "params" | "headers";

type TGetSchema = <T extends z.ZodSchema>(schema: T) => T;

type TallSchemas = Record<TProperty, z.ZodSchema>;

type TGetAllSchema = (getSchema: TGetSchema) => Partial<TallSchemas>;



type TValidation = (getAllSchemas: TGetAllSchema) => RequestHandler;

export const validation: TValidation = (getallschemas) => async (req, res, next) => {
const schemas = getallschemas((schema) => schema);
    const errosResult: Record<string, Record<string, string>> = {};

    Object.entries(schemas).forEach(([key, schema]) => {
        try {
            
            const validateSchema = schema.parse(req[key as TProperty]);
            req[key as TProperty] = validateSchema;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const validationErrors: Record<string, string> = {};
                error.issues.forEach((issue) => {
                    const fieldName = String(issue.path?.[0] ?? "_root");
                    if (fieldName) {

                        validationErrors[fieldName] = issue.message;
                    }
                });
                errosResult[key] = validationErrors;

            }
        }
    });

    if (Object.entries(errosResult).length === 0) {
        return next();

    } else {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: errosResult,
        });

    }

};