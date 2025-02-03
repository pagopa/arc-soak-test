import http from "k6/http";
import { logResult } from "../common/dynamicScenarios/utils.js";
import { buildDefaultParams } from "../common/envVars.js";
import { getBaseUrl } from "../common/environment.js";

export const PAYMENT_NOTICES_API_NAMES = {
  getPaymentNotices: "paymentNotices/getPaymentNotices",
  getPaymentNoticesDetails: "paymentNotices/getPaymentNoticesDetails"
};

const baseUrl = getBaseUrl();

export function getPaymentNotices(token) {
  const apiName = PAYMENT_NOTICES_API_NAMES.getPaymentNotices;
  const myParams = buildDefaultParams(apiName, token);

  const res = http.get(`${baseUrl}/payment-notices`, myParams);
  logResult(apiName, res);
  return res;
}

export function getPaymentNoticesDetails(token, iupd) {
  const apiName = PAYMENT_NOTICES_API_NAMES.getPaymentNoticesDetails;
  const myParams = buildDefaultParams(apiName, token);

  const res = http.get(`${baseUrl}/payment-notices/${iupd}`, myParams);
  logResult(apiName, res);
  return res;
}