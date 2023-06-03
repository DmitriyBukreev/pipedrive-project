const { PersonsApi } = require("pipedrive");

async function handler(req, res) {
  const apiInstance = new PersonsApi(req.apiClient);
  const options = {
    userId: req.apiClient.userId,
  };

  try {
    const personsResponse = await apiInstance.getPersons(options);
    const result = personsResponse.data.map((item) => {
      return { id: item.id, label: item.name };
    });
    res.json(result);
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = handler;
