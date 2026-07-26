/*
  Warnings:

  - You are about to drop the `Cidades` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pessoas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pessoas" DROP CONSTRAINT "Pessoas_cidadeId_fkey";

-- DropTable
DROP TABLE "Cidades";

-- DropTable
DROP TABLE "Pessoas";

-- CreateTable
CREATE TABLE "cidades" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,

    CONSTRAINT "cidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pessoas" (
    "id" SERIAL NOT NULL,
    "cidadeId" INTEGER NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "sobrenome" VARCHAR(100) NOT NULL,

    CONSTRAINT "pessoas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "cidades_id_nome_idx" ON "cidades"("id", "nome");

-- CreateIndex
CREATE UNIQUE INDEX "pessoas_email_key" ON "pessoas"("email");

-- CreateIndex
CREATE INDEX "pessoas_id_cidadeId_nome_sobrenome_idx" ON "pessoas"("id", "cidadeId", "nome", "sobrenome");

-- AddForeignKey
ALTER TABLE "pessoas" ADD CONSTRAINT "pessoas_cidadeId_fkey" FOREIGN KEY ("cidadeId") REFERENCES "cidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
