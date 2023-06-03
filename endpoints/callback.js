const PrismaClient = require("@prisma/client").PrismaClient;
const pipedrive = require("pipedrive");
const { saveToken } = require("../db/auth");
async function handler(req, res) {
  const authCode = req.query.code;
  try {
    const token = await req.apiClient.authorize(authCode);
    const usersApi = new pipedrive.UsersApi(req.apiClient);
    const currentUser = await usersApi.getCurrentUser();

    if (!currentUser.success) {
      throw new Error("Failed to get ids");
    }

    await saveToken(currentUser.data.id, currentUser.data.company_id, token);

    console.info(
      `Authenticated user ${currentUser.data.name} from ${currentUser.data.company_name}`
    );
    res.redirect(token.api_domain);
  } catch (e) {
    throw new Error(e.message);
  }
}

module.exports = handler;
