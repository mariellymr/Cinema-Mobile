-- CreateTable
CREATE TABLE "Notificacao" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "filmeId" INTEGER,
    "lida" BOOLEAN NOT NULL DEFAULT false,
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notificacao_pkey" PRIMARY KEY ("id")
);
