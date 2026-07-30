import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";


describe("pessoas - delete", () => {

    it("Apaga registro", async () => {

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

        const resApagada = await testServer
            .delete(`/pessoas/${res2.body.id}`)
            .send();

        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it("Apaga registro nao existente", async () => {

        
        

        const resApagada = await testServer
            .delete(`/pessoas/9999`)
            .send();

        expect(resApagada.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    });

    it("apagar registro sem id", async () => {

        const resApagada = await testServer
            .delete(`/pessoas/`)
            .send();

        expect(resApagada.statusCode).toEqual(StatusCodes.NOT_FOUND);
    });

    it("apagar registro com id zero", async () => {

        const resApagada = await testServer
            .delete(`/pessoas/0`)
            .send();

        expect(resApagada.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resApagada.body).toHaveProperty('errors.params.id');
    });

});