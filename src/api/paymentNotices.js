import http from "k6/http";
import { logResult } from "../common/dynamicScenarios/utils.js";
import { buildDefaultParams } from "../common/envVars.js";
import { getBaseUrl, getInnerBaseUrl } from "../common/environment.js";

export const PAYMENT_NOTICES_API_NAMES = {
  getPaymentNotices: "paymentNotices/getPaymentNotices",
};

const baseUrl = getBaseUrl();

export function getPaymentNotices(token) {
  const apiName = PAYMENT_NOTICES_API_NAMES.getPaymentNotices;
  const myParams = buildDefaultParams(apiName, token);

  const res = http.get(`${baseUrl}/payment-notices`, myParams);
  logResult(apiName, res);
  return res;
}