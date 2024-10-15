import http from "k6/http";
import { logResult } from "../common/dynamicScenarios/utils.js";
import { buildDefaultParams } from "../common/envVars.js";
import { getBaseUrl, getInnerBaseUrl } from "../common/environment.js";

export const AUTH_API_NAMES = {
  getAuthTokenTestUser: "transactions/getAuthTokenTestUser",
  getUserInfo: "auth/getUserInfo",
};

const innerBaseUrl = getInnerBaseUrl();
const baseUrl = getBaseUrl();

export function getAuthTokenTestUser() {
  const apiName = AUTH_API_NAMES.getAuthTokenTestUser;
  const myParams = buildDefaultParams(apiName);

  const res = http.get(`${innerBaseUrl}/auth/testuser`, null, myParams);
  logResult(apiName, res);
  return res;
}

export function getUserInfo(token){
  const apiName = AUTH_API_NAMES.getUserInfo;
  const myParams = buildDefaultParams(apiName, token);

  const res = http.get(`${baseUrl}/auth/user`, myParams);
  logResult(apiName, res);
  return res;
}