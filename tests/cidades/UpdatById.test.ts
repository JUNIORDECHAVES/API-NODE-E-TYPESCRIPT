import { set } from "supertest/lib/cookies.js";
import { testServer } from "../jest.setup.js";
import { StatusCodes } from "http-status-codes";

describe("cidades - updateById", () => {

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

    it("tentar atualizar registro que não existe", async () => {
        const res1 = await testServer.put("/cidades/99999")
            .set({ authorization: `Bearer ${acessToken}` })
            .send({ nome: "Caxias" });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty("errors.default");
    });

    it("atualizar registro existente", async () => {
        const res1 = await testServer.post("/cidades")
        .set({ authorization: `Bearer ${acessToken}` }).send({ nome: "Caxias" });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer.put(`/cidades/${res1.body.id}`)
        .set({ authorization: `Bearer ${acessToken}` }).send({ nome: "Caxias do Sul" });
        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    })
})