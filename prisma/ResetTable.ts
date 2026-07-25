import { prisma} from "../src/lib/prisma.js";

const resetTable = async () => {
    try {
        await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Cidades" RESTART IDENTITY;`)
        console.log("Tabela 'Cidades' resetada com sucesso.");
    } catch (error) {
        console.error("Erro ao resetar a tabela:", error);
    } finally {
        await prisma.$disconnect();
    }
};

resetTable();