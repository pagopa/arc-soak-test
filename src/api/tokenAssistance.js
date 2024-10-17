import http from "k6/http";
import { logResult } from "../common/dynamicScenarios/utils.js";
import { buildDefaultParams } from "../common/envVars.js";
import { getBaseUrl } from "../common/environment.js";

export const TOKEN_ASSISTANCE_API_NAMES = {
  getZendeskAssistanceToken: "tokenAssistance/getZendeskAssistanceToken",
};

const baseUrl = getBaseUrl();

export function getZendeskAssistanceToken(token) {
  const apiName = TOKEN_ASSISTANCE_API_NAMES.getZendeskAssistanceToken;
  const myParams = buildDefaultParams(apiName, token);

  const res = http.get(`${baseUrl}/token/assistance?userEmail=someone@email.com`, myParams);
  logResult(apiName, res);
  return res;
}