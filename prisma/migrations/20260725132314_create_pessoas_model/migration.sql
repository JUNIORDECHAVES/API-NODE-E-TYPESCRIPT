-- DropIndex
DROP INDEX "Cidades_nome_key";

-- CreateTable
CREATE TABLE "Pessoas" (
    "id" SERIAL NOT NULL,
    "cidadeId" INTEGER NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "sobrenome" VARCHAR(100) NOT NULL,

    CONSTRAINT "Pessoas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pessoas" ADD CONSTRAINT "Pessoas_cidadeId_fkey" FOREIGN KEY ("cidadeId") REFERENCES "Cidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
