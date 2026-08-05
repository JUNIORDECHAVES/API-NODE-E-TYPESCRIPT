import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";


describe("pessoas - update", () => {

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

    it("tentar atualizar registro sem token de acesso", async () => {
        const res1 = await testServer.put("/pessoas/1")
            .send({
                sobrenome: "oliveira",
            });
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });

    it('Atualizar um registro', async () => {

        const res1 = await testServer.post("/cidades")
            .set({ authorization: `Bearer ${acessToken}` }).send({
                nome: "Guaraciaba do Norte"
            });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const res2 = await testServer.post("/pessoas")
            .set({ authorization: `Bearer ${acessToken}` }).send({
                nome: "João",
                sobrenome: "Silva",
                email: "JoaoSilva02@example.com",
                cidadeId: "1"
            });
        expect(res2.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizado = await testServer
            .put(`/pessoas/${res2.body.id}`)
            .set({ authorization: `Bearer ${acessToken}` })
            .send({
                sobrenome: "Silva de oliveira",
            });

        expect(resAtualizado.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it('Atualizar um registro que nao existe', async () => {

        const res = await testServer.put("/pessoas/9999")
            .set({ authorization: `Bearer ${acessToken}` }).send({
                sobrenome: "oliveira",
            });
        expect(res.statusCode).toEqual(StatusCodes.NOT_FOUND);
        expect(res.body).toHaveProperty("errors.default");
    });

    it('Atualizar um registro com id menor que 1', async () => {

        const res = await testServer.put("/pessoas/0")
            .set({ authorization: `Bearer ${acessToken}` }).send({
                sobrenome: "oliveira",
            });
        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty("errors.params.id");
    });

});