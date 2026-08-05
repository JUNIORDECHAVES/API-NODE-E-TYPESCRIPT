import { testServer } from "../jest.setup.js";
import { StatusCodes } from "http-status-codes";


describe("cidedas - getAll", () => {

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

    it("tentar buscar registros sem token de acesso", async () => {
        const res1 = await testServer.get("/cidades")
            .send();
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });

    it("tentar buscar registros sem ter inserido nenhum", async () => {
        const res1 = await testServer.get("/cidades")
            .set({ authorization: `Bearer ${acessToken}` })
            .send();
        expect(res1.statusCode).toEqual(StatusCodes.OK);
        expect(res1.body.length).toBe(0);
    });

    it('Buscar todos os registros', async () => {

        const res1 = await testServer
            .post('/cidades')
            .set({ authorization: `Bearer ${acessToken}` })
            .send({ nome: 'Caxias do sul' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer
            .get('/cidades?page=1&limit=8')
            .set({ authorization: `Bearer ${acessToken}` })
            .send();

        expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body.length).toBeGreaterThan(0);
    });
})