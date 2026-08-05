import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";



describe("cidades - delete", () => {

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

    it("tentar apagar registro sem token de acesso", async () => {
        const res1 = await testServer
            .delete('/cidades/1')
            .send();
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });

    it("Apaga registro", async () => {

        const res1 = await testServer.post("/cidades")
        .set({authorization: `Bearer ${acessToken}`})
        .send({ nome: 'Caxias do sul' });


        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resApagada = await testServer
            .delete(`/cidades/${res1.body.id}`)
            .set({authorization: `Bearer ${acessToken}`})
            .send();

        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it("Tenta apagar registro que não existe", async () => {

        const res1 = await testServer
            .delete('/cidades/99999')
            .set({authorization: `Bearer ${acessToken}`})
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });

});