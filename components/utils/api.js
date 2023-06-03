import { Command } from "@pipedrive/app-extensions-sdk";
import {
  GET_PERSONS_ENDPOINT,
  POST_DEALS_ENDPOINT,
  BASE_URL,
} from "../../config";
import fetchJson from "./fetch-json";

export default class ApiClient {
  constructor(sdk) {
    this.sdk = sdk;
  }

  async getPersons() {
    const { token } = await this.sdk.execute(Command.GET_SIGNED_TOKEN);
    const url = new URL(GET_PERSONS_ENDPOINT, BASE_URL);
    url.searchParams.set("token", token);
    const result = await fetchJson(url);
    return result;
  }

  async postDeal(body) {
    const { token } = await this.sdk.execute(Command.GET_SIGNED_TOKEN);
    const url = new URL(POST_DEALS_ENDPOINT, BASE_URL);
    url.searchParams.set("token", token);
    const result = await fetchJson(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    return result;
  }
}
