import { assert, statusOk } from "../../common/assertions.js";
import {
  noticeReceipt,
  NOTICES_API_NAMES,
} from "../../api/notices.js";

import defaultHandleSummaryBuilder from "../../common/handleSummaryBuilder.js";
import { defaultApiOptionsBuilder } from "../../common/dynamicScenarios/defaultOptions.js";
import { logErrorResult } from "../../common/dynamicScenarios/utils.js";
import { getAuthToken,abort,getTestEntity } from "../../common/utils.js";
import { getNoticesList } from "./getNoticesList.js"
import { setup } from "./getNoticeDetails.js"

const application = "notices";
const testName = "getNoticeReceipt";

// Dynamic scenarios' K6 configuration
export const options = defaultApiOptionsBuilder(
  application,
  testName,
  [
    NOTICES_API_NAMES.getNoticeReceipt,
  ] // applying apiName tags to thresholds
);

// K6 summary configuration
export const handleSummary = defaultHandleSummaryBuilder(application, testName);

export { setup };

export default (data) => {
  const eventId = getTestEntity(data.notices);
  const getNoticesReceiptResult = noticeReceipt(data.token,eventId);

  assert(getNoticesReceiptResult, [statusOk()]);

  if (getNoticesReceiptResult.status !== 200) {
    logErrorResult(
      `Unexpected getNoticesReceipt status`,
      getNoticesReceiptResult,
      true
    );
    return;
  }

};