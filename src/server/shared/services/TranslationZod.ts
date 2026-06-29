import { z } from "zod";

z.config({
    customError: (issue) => {

        if (
            issue.code === "invalid_type" &&
            issue.input === undefined
        ) {
            return "Campo obrigatório";
        }

        if (issue.code === "invalid_type") {
            return `O tipo esperado é ${issue.expected}.`;
        };

        if (issue.code === "unrecognized_keys") {
            return `Campos inválidos: ${issue.keys.join(", ")}`;
        };

        if (
            issue.code === "too_small" &&
            issue.origin === "string"
        ) {
            return `Deve ter pelo menos ${issue.minimum} caracteres`;
        }

        if (issue.code === "too_small" && issue.origin === "number") {
            return `O valor deve ser maior ou igual ${issue.minimum}`;
        }

        return "Valor inválido";
    },
});