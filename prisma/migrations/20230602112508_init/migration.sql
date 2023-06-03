-- CreateTable
CREATE TABLE "OAuth" (
    "clientId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "accessToken" TEXT NOT NULL,

    PRIMARY KEY ("clientId", "companyId")
);
