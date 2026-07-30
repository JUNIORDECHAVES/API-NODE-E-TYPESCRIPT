import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";

describe("pessoas - getAll", () => {

    it('Buscar todos os registros sem paginacao', async () => {
        const res1 = await testServer.post("/cidades").send({
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

        const res3 = await testServer.post("/pessoas").send({
            nome: "João",
            sobrenome: "Silva",
            email: "JoaoSilva@example.com",
            cidadeId: "1"
        });
        expect(res3.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscarPessoas = await testServer.get("/pessoas").send();

        expect(resBuscarPessoas.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscarPessoas.body).toHaveLength(2);
        expect(Number(resBuscarPessoas.header['x-total-count'])).toBeGreaterThan(0);

    });

    it('Buscar todos os registros com paginacao sem filtro', async () => {

        const res1 = await testServer.post("/pessoas").send({
            nome: "João",
            sobrenome: "pedro",
            email: "JoaoPedro02@example.com",
            cidadeId: "1"
        });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const res2 = await testServer.post("/pessoas").send({
            nome: "Joaquin",
            sobrenome: "Silva",
            email: "JoaquinSilva@example.com",
            cidadeId: "1"
        });
        expect(res2.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscarPessoas = await testServer.get("/pessoas?page=1&limit=3").send();

        expect(resBuscarPessoas.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscarPessoas.body).toHaveLength(3);

    });

    it("Buscar todos os registros com paginacao com filtro ", async () => {
        const res1 = await testServer.post("/pessoas").send({
            nome: "João",
            sobrenome: "Silva",
            email: "JoaoSilva02@example.com",
            cidadeId: "1"
        });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscarPessoas = await testServer.get("/pessoas?page=1&limit=2&filter[nome]=João&filter[sobrenome]=Silva").send();
        expect(resBuscarPessoas.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscarPessoas.body).toHaveLength(2);
    });

});