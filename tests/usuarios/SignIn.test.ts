import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";


describe("usuarios - singIn", () => {

    it("entrar em uma conta existente", async () => {
        const res1 = await testServer.post("/cadastrar").send({
            nome: "John",
            sobrenome: "Doe",
            email: "johnDoe@example.com",
            senha: "password123"
        });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const res2 = await testServer.post("/entrar").send({
            email: "johnDoe@example.com",
            senha: "password123"
        });
        expect(res2.statusCode).toEqual(StatusCodes.OK);
        expect(res2.body).toHaveProperty('acessToken');
    });

    it("Erro ao tentar entrar em uma conta com email incorretos", async () => {
        const res1 = await testServer.post("/cadastrar").send({
            nome: "João",
            sobrenome: "Silva",
            email: "joaosilva12@example.com",
            senha: "password123"
        });


        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const res2 = await testServer.post("/entrar").send({
            email: "joaosilva123@example.com",
            senha: "password123"
        });
        expect(res2.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res2.body).toHaveProperty('errors.default');
    });

    it("Erro ao tentar entrar em uma conta com email invalido", async () => {
        const res1 = await testServer.post("/entrar").send({
            email: "joaosilva12example.com",
            senha: "password123"
        });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');
    });

    it("Erro ao tentar entrar em uma conta com sem o email", async () => {
        const res1 = await testServer.post("/entrar").send({
            senha: "password123"
        });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');
    });

    it("Erro ao tentar entrar em uma conta com sem a senha", async () => {
        const res1 = await testServer.post("/entrar").send({
            email: "joaosilva12@example.com"
        });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.senha');
    });

    it("Erro ao tentar entrar em uma conta com senha incorretos", async () => {
        const res1 = await testServer.post("/entrar").send({
            email: "joaosilva12@example.com",
            senha: "password"
        });
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });

    it("Erro ao tentar entrar em uma conta com senha muito curta", async () => {
        const res1 = await testServer.post("/entrar").send({
            email: "joaosilva12@example.com",
            senha: "pass"
        });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.senha');
    });



});