import { prisma } from "../src/lib/prisma";
import { cidadesSeed } from "./seeds/cidades";

async function main() {
    try {
        await cidadesSeed();

        
    } catch (error) {
        console.error("Erro ao executar script de seed:", error);
    }finally {
        await prisma.$disconnect();
    }
};

main();