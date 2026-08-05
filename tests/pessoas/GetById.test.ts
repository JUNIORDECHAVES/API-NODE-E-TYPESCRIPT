import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";


describe("pessoas - getById", () => {

    let acessToken: string = "";
    beforeAll(async () => {
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

    it("tentar buscar registro sem token de acesso", async () => {
        const res1 = await testServer.get('/pessoas/1').send();
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });

    it("busar pessoa", async () => {
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

        const resBuscarPessoa = await testServer.get(`/pessoas/${res2.body.id}`)
        .set({authorization: `Bearer ${acessToken}`}).send();

        expect(resBuscarPessoa.statusCode).toEqual(StatusCodes.OK);
        expect.arrayContaining(["id", "nome", "sobrenome", "email", "cidadeId"]);
    });

    it("busar pessoa nao existente", async () => {

        const resBuscarPessoa = await testServer.get(`/pessoas/99999`)
        .set({authorization: `Bearer ${acessToken}`}).send();

        expect(resBuscarPessoa.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(resBuscarPessoa.body).toHaveProperty('errors.default');
    });

    it("busar pessoa com id menor que 1", async () => {

        const resBuscarPessoa = await testServer.get(`/pessoas/0`)
        .set({authorization: `Bearer ${acessToken}`}).send();

        expect(resBuscarPessoa.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resBuscarPessoa.body).toHaveProperty('errors.params.id');
    });

    it("busar pessoa com id não numerico", async () => {
        const resBuscarPessoa = await testServer.get(`/pessoas/abc`)
        .set({authorization: `Bearer ${acessToken}`}).send();

        expect(resBuscarPessoa.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resBuscarPessoa.body).toHaveProperty('errors.params.id');
    })


});