const PrismaClient = require("@prisma/client").PrismaClient;

const prisma = new PrismaClient();

async function saveToken(clientId, companyId, token) {
  await prisma.oAuth.upsert({
    where: {
      clientId_companyId: {
        clientId,
        companyId,
      },
    },
    update: {
      accessToken: JSON.stringify(token),
    },
    create: {
      clientId,
      companyId,
      accessToken: JSON.stringify(token),
    },
  });
}

async function getToken(clientId, companyId) {
  const data = await prisma.oAuth.findUnique({
    where: {
      clientId_companyId: {
        clientId,
        companyId,
      },
    },
  });
  return JSON.parse(data.accessToken);
}

module.exports = {
  saveToken,
  getToken,
};
