import http from "k6/http";
import { logResult } from "../common/dynamicScenarios/utils.js";
import { buildDefaultParams } from "../common/envVars.js";
import { getBaseUrl, getInnerBaseUrl } from "../common/environment.js";

export const NOTICES_API_NAMES = {
  getNoticesList: "notices/getNoticesList",
  getNoticeDetails: "notices/getNoticeDetails",
  getNoticeReceipt: "notices/getNoticeReceipt",
};

const baseUrl = getBaseUrl();

export function notices(token) {
  const apiName = NOTICES_API_NAMES.getNoticesList;
  const myParams = buildDefaultParams(apiName, token);

  const res = http.get(`${baseUrl}/notices`, myParams);
  logResult(apiName, res);
  return res;
}

export function noticeDetails(token,noticeId) {
  const apiName = NOTICES_API_NAMES.getNoticeDetails;
  const myParams = buildDefaultParams(apiName, token);

  const res = http.get(`${baseUrl}/notices/${noticeId}`, myParams);
  logResult(apiName, res);
  return res;
}

export function noticeReceipt(token,noticeId) {
  const apiName = NOTICES_API_NAMES.getNoticeReceipt;
  const myParams = buildDefaultParams(apiName, token);

  const res = http.get(`${baseUrl}/notices/${noticeId}/receipt`, myParams);
  logResult(apiName, res);
  return res;
}