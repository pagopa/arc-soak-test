import { assert, statusOk } from "../../common/assertions.js";
import {
  getPaymentNotices,
  getPaymentNoticesDetails,
  PAYMENT_NOTICES_API_NAMES,
} from "../../api/paymentNotices.js";
import defaultHandleSummaryBuilder from "../../common/handleSummaryBuilder.js";
import { defaultApiOptionsBuilder } from "../../common/dynamicScenarios/defaultOptions.js";
import { logErrorResult } from "../../common/dynamicScenarios/utils.js";
import { getAuthToken, getTestEntity } from "../../common/utils.js";

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
  const authToken = getAuthToken();
  const paymentNoticesList = getPaymentNotices(authToken).json().paymentNoticesList;

    if(paymentNoticesList.length === 0){
      abort("No elements found in payment notices list please restart test with at least one element");
    }

  return { 
    token: authToken,
    paymentNotices: paymentNoticesList.map(item => item.iupd)
  };
  
}

export default (data) => {
  const iupd = getTestEntity(data.paymentNotices);
  const getPaymentNoticesDetailsResult = getPaymentNoticesDetails(data.token, iupd);

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