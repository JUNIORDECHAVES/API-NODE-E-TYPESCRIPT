import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";


describe("cidades - create", () => {

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

    it("tentar criar registro sem token de acesso", async () => {
        const res1 = await testServer.post("/cidades")
            .send({
                nome: "Guaraciaba do Norte"
            });
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });


    it("cria registro existente", async () => {
        const res1 = await testServer.post("/cidades")
        .set({authorization: `Bearer ${acessToken}`})
        .send({
            nome: "Guaraciaba do Norte"
        });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const res2 = await testServer.post("/cidades")
        .set({authorization: `Bearer ${acessToken}`}).send({
            nome: "Guaraciaba do Norte"
        });
        expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res2.body).toHaveProperty('errors.default');
    });

    it("tentar criar um resgistro com nome menor que 3 caracteres", async () => {
        const res1 = await testServer.post("/cidades")
        .set({authorization: `Bearer ${acessToken}`}).send({
            nome: "Gu"
        });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');
    });

});