import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";

describe("pessoas - create", () => {

    it("criar cadastro de pessoa", async () => {

        const res1= await testServer.post("/cidades").send({
            nome: "Guaraciaba do Norte"
        });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);


        const res2 = await testServer.post("/pessoas").send({
            nome: "João",
            sobrenome: "Silva",
            email: "Fj2QH@example.com",
            cidadeId: "1"
        });

        expect(res2.statusCode).toEqual(StatusCodes.CREATED);
        expect.arrayContaining(["message", "id"]);

    });

    it("tentar criar cadastro de pessoa sem cidade", async () => {

        const res1 = await testServer.post("/pessoas").send({
            nome: "João",
            sobrenome: "Silva",
            email: "joaopedro22@example.com",
            cidadeId: "10"
        });

        expect(res1.statusCode).toEqual(StatusCodes.NOT_FOUND);
        expect(res1.body).toHaveProperty('errors.default');
    });
    
    it("tentar criar cadastro de pessoa duplicada por email", async () => {

        const res1 = await testServer.post("/pessoas").send({
            nome: "João Pedro",
            sobrenome: "Silva Brito",
            email: "JoaoPedrobrito@example.com",
            cidadeId: "1"
        });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const res2 = await testServer.post("/pessoas").send({
            nome: "João Pedro",
            sobrenome: "Silva",
            email: "JoaoPedrobrito@example.com",
            cidadeId: "1"
        });

        expect(res2.statusCode).toEqual(StatusCodes.CONFLICT);
        expect(res2.body).toHaveProperty('errors.default');
    });

    it("criar cadastro de pessoa com nome menor que 3 caracteres", async () => {
        const res1 = await testServer.post("/pessoas").send({
            nome: "Jo",
            sobrenome: "Silva",
            email: "JoaoPedro123@example.com",
            cidadeId: "1"
        });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');
    });

    it("criar cadastro de pessoa faltando campo sobrenome", async () => {
        const res1 = await testServer.post("/pessoas").send({
            nome: "Silvana",
            email: "JoaoPedro@example.com",
            cidadeId: "1"
        });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.sobrenome');
    })

});