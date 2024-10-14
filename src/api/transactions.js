import http from "k6/http";
import { logResult } from "../common/dynamicScenarios/utils.js";
import { buildDefaultParams } from "../common/envVars.js";
import { getBaseUrl } from "../common/environment.js";

export const TRANSACTIONS_API_NAMES = {
  getTransactionsList: "transactions/getTransactionsList",
  getTransactionDetails: "transactions/getTransactionDetails",
};

const baseUrl = getBaseUrl();

export function getTransactionsList(token) {
  const apiName = TRANSACTIONS_API_NAMES.getTransactionsList;
  const myParams = buildDefaultParams(apiName, token);

  const res = http.get(`${baseUrl}/transactions`, myParams);
  logResult(apiName, res);
  return res;
}

export function getTransactionDetails(token, transactionId) {
  const apiName = TRANSACTIONS_API_NAMES.getTransactionDetails;
  const myParams = buildDefaultParams(apiName, token);

  const res = http.get(`${baseUrl}/transactions/${transactionId}`, myParams);
  logResult(apiName, res);
  return res;
}
