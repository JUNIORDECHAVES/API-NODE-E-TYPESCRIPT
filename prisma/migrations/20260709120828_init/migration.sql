-- CreateTable
CREATE TABLE "Cidades" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,

    CONSTRAINT "Cidades_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Cidades_id_nome_idx" ON "Cidades"("id", "nome");
