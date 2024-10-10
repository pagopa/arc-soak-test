import http from "k6/http";
import { logResult } from "../common/dynamicScenarios/utils.js";
import { buildDefaultParams } from "../common/envVars.js";
import { getBaseUrl, getInnerBaseUrl } from "../common/environment.js";

export const AUTH_API_NAMES = {
  getAuthTokenTestUser: "transactions/getAuthTokenTestUser",
};

const innerBaseUrl = getInnerBaseUrl();

export function getAuthTokenTestUser() {
  const apiName = AUTH_API_NAMES.getAuthTokenTestUser;
  const myParams = buildDefaultParams(apiName);

  const res = http.get(`${innerBaseUrl}/auth/testuser`, null, myParams);
  logResult(apiName, res);
  return res;
}
