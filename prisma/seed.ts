import { prisma } from "../src/lib/prisma.js";
import { cidadesSeed } from "./seeds/cidades.js";

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