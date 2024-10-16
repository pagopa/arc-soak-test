import http from "k6/http";
import { logResult } from "../common/dynamicScenarios/utils.js";
import { buildDefaultParams } from "../common/envVars.js";
import { getBaseUrl, getInnerBaseUrl } from "../common/environment.js";

export const NOTICES_API_NAMES = {
  notices: "notices",
};

const baseUrl = getBaseUrl();

export function notices(token) {
  const apiName = NOTICES_API_NAMES.notices;
  const myParams = buildDefaultParams(apiName, token);

  const res = http.get(`${baseUrl}/notices`, myParams);
  logResult(apiName, res);
  return res;
}