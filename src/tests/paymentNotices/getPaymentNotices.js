import { assert, statusOk } from "../../common/assertions.js";
import {
  getPaymentNotices,
  PAYMENT_NOTICES_API_NAMES,
} from "../../api/paymentNotices.js";
import defaultHandleSummaryBuilder from "../../common/handleSummaryBuilder.js";
import { defaultApiOptionsBuilder } from "../../common/dynamicScenarios/defaultOptions.js";
import { logErrorResult } from "../../common/dynamicScenarios/utils.js";
import { getAuthToken } from "../../common/utils.js";

const application = "paymentNotices";
const testName = "getPaymentNotices";

// Dynamic scenarios' K6 configuration
export const options = defaultApiOptionsBuilder(
  application,
  testName,
  [
    PAYMENT_NOTICES_API_NAMES.getPaymentNotices,
  ] // applying apiName tags to thresholds
);

// K6 summary configuration
export const handleSummary = defaultHandleSummaryBuilder(application, testName);

export function setup() {
  return { token: getAuthToken() };
}

export default (data) => {
  const getPaymentNoticesResult = getPaymentNotices(data.token);

  assert(getPaymentNoticesResult, [statusOk()]);

  if (getPaymentNoticesResult.status !== 200) {
    logErrorResult(
      `Unexpected getPaymentNotices status`,
      getPaymentNoticesResult,
      true
    );
    return;
  }
};