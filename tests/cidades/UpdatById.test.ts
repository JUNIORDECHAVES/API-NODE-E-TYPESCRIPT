import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("cidades - updateById", () => {
    it("tentar atualizar registro que não existe", async () => {
        const res1 = await testServer.put("/cidades/99999").send({nome: "Caxias"});

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty("errors.default");
    });

    it("atualizar registro existente", async () => {
        const res1 = await testServer.post("/cidades").send({nome: "Caxias"});
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer.put(`/cidades/${res1.body}`).send({nome: "Caxias do Sul"});
        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    })
})