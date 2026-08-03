import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";


describe("usuarios - singUp", () => {
    it("Cadastrar 1 usuário", async () => {
        const res1 = await testServer.post("/cadastrar").send({
            nome: "John",
            sobrenome: "Doe",
            email: "johnDoe@example.com",
            senha: "password123"
        });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    });

    it("Cadastrar 2 usuário", async () => {
        const res1 = await testServer.post("/cadastrar").send({
            nome: "Gabriel",
            sobrenome: "Borges",
            email: "gabrielborges@example.com",
            senha: "password123"
        });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const res2 = await testServer.post("/cadastrar").send({
            nome: "Junior",
            sobrenome: "silva",
            email: "juniorsilva@example.com",
            senha: "password123"
        });

        expect(res2.statusCode).toEqual(StatusCodes.CREATED);
    });

    it("Erro ao tentar cadastrar 1 usuário com email já duplicado", async () => {
        const res1 = await testServer.post("/cadastrar").send({
            nome: "João",
            sobrenome: "Silva",
            email: "joaosilva@example.com",
            senha: "password123"
        });
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const res2 = await testServer.post("/cadastrar").send({
            nome: "João Pedro",
            sobrenome: "Silva",
            email: "joaosilva@example.com",
            senha: "password123"
        });
        expect(res2.statusCode).toEqual(StatusCodes.CONFLICT);
        expect(res2.body).toHaveProperty('errors.default');
    });

    it("Erro ao tentar cadastrar 1 usuário com email inválido", async () => {
        const res1 = await testServer.post("/cadastrar").send({
            nome: "João",
            sobrenome: "Silva",
            email: "joaosilvaexample.com",
            senha: "password123"
        });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');
    });

    it("Erro ao tentar cadastrar 1 usuário sem senha", async () => {
        const res1 = await testServer.post("/cadastrar").send({
            nome: "João Reis",
            sobrenome: "Silva",
            email: "joaoreissilva@example.com",
            senha: ""
        });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.senha');
    });

    it("Erro ao tentar cadastrar 1 usuário sem Email", async () => {
        const res1 = await testServer.post("/cadastrar").send({
            nome: "João Reis",
            sobrenome: "Silva",
            email: "",
            senha: "password123"
        });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');
    });

    it("Erro ao tentar cadastrar 1 usuário sem sobrenome", async () => {
        const res1 = await testServer.post("/cadastrar").send({
            nome: "João Reis",
            sobrenome: "",
            email: "joaoreissilva@example.com",
            senha: "password123"
        });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.sobrenome');
    });

    it("Erro ao tentar cadastrar 1 usuário sem nome", async () => {
        const res1 = await testServer.post("/cadastrar").send({
            nome: "",
            sobrenome: "Silva",
            email: "joaoreissilva@example.com",
            senha: "password123"
        });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');
    });

    it("Erro ao tentar cadastrar 1 usuário com sobrenome menor que 3 caracteres", async () => {
        const res1 = await testServer.post("/cadastrar").send({
            nome: "João Reis",
            sobrenome: "Si",
            email: "joaoreissilva@example.com",
            senha: "password123"
        });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.sobrenome');
    });

    it("Erro ao tentar cadastrar 1 usuário com nome menor que 3 caracteres", async () => {
        const res1 = await testServer.post("/cadastrar").send({
            nome: "Jo",
            sobrenome: "Silva",
            email: "joaoreissilva@example.com",
            senha: "password123"
        });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');
    });

    it("Erro ao tentar cadastrar 1 usuário com senha menor que 6 caracteres", async () => {
        const res1 = await testServer.post("/cadastrar").send({
            nome: "João Reis",
            sobrenome: "Si",
            email: "joaoreissilva@example.com",
            senha: "passw"
        });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.senha');
    });

});