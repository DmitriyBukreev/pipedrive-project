const pipedrive = require("pipedrive");

class FieldConverter {
  constructor(fields, dealFieldsApi) {
    this.fields = fields;
    this.dealFieldsApi = dealFieldsApi;
  }

  async getFieldKey(name, type) {
    const item = this.fields.find((item) => item.name === name);
    if (item) {
      return item.key;
    }

    // TODO: create key if it doesn't exist
    // const newField = pipedrive.FieldCreateRequest.constructFromObject({
    //   name,
    //   type,
    // });

    // const field = await this.dealFieldsApi.addDealField(newField);

    // return field.data.key;
  }
}

class DealConverter {
  constructor(apiClient) {
    this.personsApi = new pipedrive.PersonsApi(apiClient);
    this.dealsApi = new pipedrive.DealsApi(apiClient);
    this.dealFieldsApi = new pipedrive.DealFieldsApi(apiClient);
  }

  convertToArrayValue(data) {
    return [
      {
        value: data,
        primary: true,
        label: "work",
      },
    ];
  }

  convertPerson({ firstName, lastName, email, phone }) {
    return pipedrive.NewPerson.constructFromObject({
      name: `${firstName} ${lastName}`,
      email: this.convertToArrayValue(email),
      phone: this.convertToArrayValue(phone),
    });
  }

  async convertDeal({
    person_id,
    jobType,
    jobSource,
    address,
    city,
    state,
    zipCode,
    date,
    startTime,
    endTime,
    tech,
    area,
    jobDescription,
  }) {
    const fields = await this.dealFieldsApi.getDealFields();
    const fieldConverter = new FieldConverter(fields.data, this.dealFieldsApi);

    const [
      addressKey,
      jobTypeKey,
      jobSourceKey,
      dateKey,
      startTimeKey,
      endTimeKey,
      techKey,
      areaKey,
      commentKey,
    ] = await Promise.all([
      fieldConverter.getFieldKey("Address", "address"),
      fieldConverter.getFieldKey("Job type", "varchar"),
      fieldConverter.getFieldKey("Job source", "varchar"),
      fieldConverter.getFieldKey("Job date", "date"),
      fieldConverter.getFieldKey("Job start time", "time"),
      fieldConverter.getFieldKey("Job end time", "time"),
      fieldConverter.getFieldKey("Technician", "varchar"),
      fieldConverter.getFieldKey("Area", "varchar"),
      fieldConverter.getFieldKey("Job comment", "text"),
    ]);

    const obj = {
      title: `${jobType} - ${jobSource}`,
      person_id,
      [addressKey]: `${address}, ${city}, ${zipCode}, ${state}`,
      [jobTypeKey]: jobType,
      [jobSourceKey]: jobSource,
      [dateKey]: date,
      [startTimeKey]: startTime,
      [endTimeKey]: endTime,
      [techKey]: tech,
      [areaKey]: area,
      [commentKey]: jobDescription,
    };
    return pipedrive.NewDeal.constructFromObject(obj);
  }

  async addPerson(data) {
    const personReq = this.convertPerson(data);
    const personRes = await this.personsApi.addPerson(personReq);
    return personRes.data;
  }

  async addDeal(data) {
    const person = await this.addPerson(data);
    const deal = await this.convertDeal({ person_id: person.id, ...data });
    return this.dealsApi.addDeal(deal);
  }
}

async function handler(req, res) {
  const data = req.body;

  const converter = new DealConverter(req.apiClient);
  const newDeal = await converter.addDeal(data);

  const usersApi = new pipedrive.UsersApi(req.apiClient);
  const currentUser = await usersApi.getCurrentUser();

  res.json({
    status: "success",
    deal_url: `https://${currentUser.data.company_domain}.pipedrive.com/deal/${newDeal.data.id}`,
  });
}

module.exports = handler;
