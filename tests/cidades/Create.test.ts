import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe("cidades - create", () => {


    it("cria registro", async () => {
        const res1 = await testServer.post("/cidades").send({
            nome: "Guaraciaba"
        });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual("number");
    });

    it("tentar criar um resgistro com nome menor que 3 caracteres", async () => {
        const res1 = await testServer.post("/cidades").send({
            nome: "Gu"
        });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');
    });

});