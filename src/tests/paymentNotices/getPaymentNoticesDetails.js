import { assert, statusOk } from "../../common/assertions.js";
import {
  getPaymentNoticesDetails,
  PAYMENT_NOTICES_API_NAMES,
} from "../../api/paymentNotices.js";
import defaultHandleSummaryBuilder from "../../common/handleSummaryBuilder.js";
import { defaultApiOptionsBuilder } from "../../common/dynamicScenarios/defaultOptions.js";
import { logErrorResult } from "../../common/dynamicScenarios/utils.js";
import { getAuthToken } from "../../common/utils.js";

const application = "paymentNotices";
const testName = "getPaymentNoticesDetails";

// Dynamic scenarios' K6 configuration
export const options = defaultApiOptionsBuilder(
  application,
  testName,
  [
    PAYMENT_NOTICES_API_NAMES.getPaymentNoticesDetails,
  ] // applying apiName tags to thresholds
);

// K6 summary configuration
export const handleSummary = defaultHandleSummaryBuilder(application, testName);

export function setup() {
  return { token: getAuthToken() };
}

export default (data) => {
  const getPaymentNoticesDetailsResult = getPaymentNoticesDetails(data.token);

  assert(getPaymentNoticesDetailsResult, [statusOk()]);

  if (getPaymentNoticesDetailsResult.status !== 200) {
    logErrorResult(
      `Unexpected getPaymentNoticesDetails status`,
      getPaymentNoticesDetailsResult,
      true
    );
    return;
  }
};