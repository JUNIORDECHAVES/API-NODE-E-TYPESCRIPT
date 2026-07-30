import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";


describe("pessoas - getById", () => {

    it("busar pessoa", async () => {
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

                const resBuscarPessoa = await testServer.get(`/pessoas/${res2.body.id}`).send();

                expect(resBuscarPessoa.statusCode).toEqual(StatusCodes.OK);
                expect.arrayContaining(["id", "nome", "sobrenome", "email", "cidadeId"]);
    });

    it("busar pessoa nao existente", async () => {

        const resBuscarPessoa = await testServer.get(`/pessoas/99999`).send();

        expect(resBuscarPessoa.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(resBuscarPessoa.body).toHaveProperty('errors.default');
    });

    it("busar pessoa com id menor que 1", async () => { 

        const resBuscarPessoa = await testServer.get(`/pessoas/0`).send();

        expect(resBuscarPessoa.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resBuscarPessoa.body).toHaveProperty('errors.params.id');
    });

    it("busar pessoa com id não numerico", async () => {
        const resBuscarPessoa = await testServer.get(`/pessoas/abc`).send();

        expect(resBuscarPessoa.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resBuscarPessoa.body).toHaveProperty('errors.params.id');
    })


});