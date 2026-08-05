import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";


describe("pessoas - delete", () => {

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

    it("tentar apagar registro sem token de acesso", async () => {
        const res1 = await testServer
            .delete('/pessoas/1')
            .send();
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });

    it("Apaga registro", async () => {

        const res1 = await testServer.post("/cidades")
            .set({ authorization: `Bearer ${acessToken}` }).send({
                nome: "Guaraciaba do Norte"
            });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const res2 = await testServer.post("/pessoas")
            .set({ authorization: `Bearer ${acessToken}` }).send({
                nome: "João",
                sobrenome: "Silva",
                email: "Fj2QH@example.com",
                cidadeId: "1"
            });
        expect(res2.statusCode).toEqual(StatusCodes.CREATED);

        const resApagada = await testServer
            .delete(`/pessoas/${res2.body.id}`)
            .set({ authorization: `Bearer ${acessToken}` })
            .send();

        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it("Apaga registro nao existente", async () => {

        const resApagada = await testServer
            .delete(`/pessoas/9999`)
            .set({ authorization: `Bearer ${acessToken}` })
            .send();

        expect(resApagada.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    });

    it("apagar registro sem id", async () => {

        const resApagada = await testServer
            .delete(`/pessoas/`)
            .set({ authorization: `Bearer ${acessToken}` })
            .send();

        expect(resApagada.statusCode).toEqual(StatusCodes.NOT_FOUND);
    });

    it("apagar registro com id zero", async () => {

        const resApagada = await testServer
            .delete(`/pessoas/0`)
            .set({ authorization: `Bearer ${acessToken}` })
            .send();

        expect(resApagada.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resApagada.body).toHaveProperty('errors.params.id');
    });

});