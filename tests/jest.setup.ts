import supertest from "supertest";
import { app } from "../src/server/server";
import { prisma } from "../src/lib/prisma";
import { execSync } from "child_process";

export const testServer = supertest(app);

const TEST_DB_URL = process.env.TEST_DATABASE_URL

beforeAll(async () => {
    if (!TEST_DB_URL) {
        throw new Error("❌ A variável TEST_DATABASE_URL não está definida no arquivo .env");
    }

    // Injeta no processo para garantir que o PrismaClient mude o ambiente
    process.env.DATABASE_URL = TEST_DB_URL;
    process.env.NODE_ENV = "test";

    try {
        // Sincroniza o schema com o banco local usando a URL correta
        execSync(`pnpm exec prisma db push --url="${TEST_DB_URL}"`, {
            env: { ...process.env }
        });
    } catch (error) {
        console.error("❌ Erro ao sincronizar o banco de dados de testes:", error);
        throw error;
    }
});

afterAll(async () => {
    try {
        // 1. Descobrir dinamicamente todas as tabelas criadas no schema público do seu Postgres
        const tablenames = await prisma.$queryRaw<Array<{ tablename: string }>>`
        SELECT tablename FROM pg_tables WHERE schemaname='public' AND tablename != '_prisma_migrations';
    `;

        // 2. Mapear os nomes e criar um único comando de TRUNCATE concatenado
        const tables = tablenames
            .map(({ tablename }) => `"${tablename}"`)
            .join(", ");

        if (tables.length > 0) {
            // 3. Limpa todas as tabelas, reseta os IDs auto-incrementais (Identity) e ignora restrições de FK de forma segura (Cascade)
            await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} RESTART IDENTITY CASCADE;`);
        }

        console.log("🧹 Banco de dados de testes limpo com sucesso!");
    } catch (error) {
        console.error("❌ Erro ao limpar o banco de testes:", error);
    } finally {
        // Desconecta o prisma para o processo do Jest não ficar travado aberto
        await prisma.$disconnect();
    }
});