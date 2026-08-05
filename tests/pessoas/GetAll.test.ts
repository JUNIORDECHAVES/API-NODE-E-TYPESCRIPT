import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";

describe("pessoas - getAll", () => {

    let acessToken: string = "";
    beforeAll( async () => {
        const email = "joaopedro22@example.com";
        await testServer.post("/cadastrar").send({
            nome: "João Pedro",
            sobrenome: "Silva",
            email,
            senha: "password123"
        });

        const signInRes = await testServer.post("/entrar").send({
            email,
            senha: "password123"
        });

        acessToken = signInRes.body.acessToken;
        
    });

    it("tentar buscar registros sem token de acesso", async () => {
        const res1 = await testServer.get("/pessoas?page=1&limit=3")
            .send();
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });

    it('Buscar todos os registros sem paginacao', async () => {
        const res1 = await testServer.post("/cidades")
        .set({authorization: `Bearer ${acessToken}`}).send({
            nome: "Guaraciaba do Norte"
        });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const res2 = await testServer.post("/pessoas")
        .set({authorization: `Bearer ${acessToken}`}).send({
            nome: "João",
            sobrenome: "Silva",
            email: "Fj2QH@example.com",
            cidadeId: "1"
        });
        expect(res2.statusCode).toEqual(StatusCodes.CREATED);

        const res3 = await testServer.post("/pessoas")
        .set({authorization: `Bearer ${acessToken}`}).send({
            nome: "João",
            sobrenome: "Silva",
            email: "JoaoSilva@example.com",
            cidadeId: "1"
        });
        expect(res3.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscarPessoas = await testServer.get("/pessoas")
        .set({authorization: `Bearer ${acessToken}`}).send();

        expect(resBuscarPessoas.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscarPessoas.body).toHaveLength(2);
        expect(Number(resBuscarPessoas.header['x-total-count'])).toBeGreaterThan(0);

    });

    it('Buscar todos os registros com paginacao sem filtro', async () => {

        const res1 = await testServer.post("/pessoas")
        .set({authorization: `Bearer ${acessToken}`}).send({
            nome: "João",
            sobrenome: "pedro",
            email: "JoaoPedro02@example.com",
            cidadeId: "1"
        });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const res2 = await testServer.post("/pessoas")
        .set({authorization: `Bearer ${acessToken}`}).send({
            nome: "Joaquin",
            sobrenome: "Silva",
            email: "JoaquinSilva@example.com",
            cidadeId: "1"
        });
        expect(res2.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscarPessoas = await testServer.get("/pessoas?page=1&limit=3")
        .set({authorization: `Bearer ${acessToken}`}).send();

        expect(resBuscarPessoas.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscarPessoas.body).toHaveLength(3);

    });

    it("Buscar todos os registros com paginacao com filtro ", async () => {
        const res1 = await testServer.post("/pessoas")
        .set({authorization: `Bearer ${acessToken}`}).send({
            nome: "João",
            sobrenome: "Silva",
            email: "JoaoSilva02@example.com",
            cidadeId: "1"
        });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscarPessoas = await testServer.get("/pessoas?page=1&limit=2&filter[nome]=João&filter[sobrenome]=Silva")
        .set({authorization: `Bearer ${acessToken}`}).send();
        expect(resBuscarPessoas.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscarPessoas.body).toHaveLength(2);
    });

});