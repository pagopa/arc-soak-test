import { assert, statusOk } from "../../common/assertions.js";
import {
  noticeDetails,
  NOTICES_API_NAMES,
} from "../../api/notices.js";
import defaultHandleSummaryBuilder from "../../common/handleSummaryBuilder.js";
import { defaultApiOptionsBuilder } from "../../common/dynamicScenarios/defaultOptions.js";
import { logErrorResult } from "../../common/dynamicScenarios/utils.js";
import { getAuthToken } from "../../common/utils.js";
import { getNoticesList } from "./getNoticesList.js"

const application = "notices";
const testName = "getNoticeDetails";

// Dynamic scenarios' K6 configuration
export const options = defaultApiOptionsBuilder(
  application,
  testName,
  [
    NOTICES_API_NAMES.getNoticeDetails,
  ] // applying apiName tags to thresholds
);

// K6 summary configuration
export const handleSummary = defaultHandleSummaryBuilder(application, testName);

export function setup() {
  const authToken = getAuthToken();
  return {
    token: authToken,
    noticesList: getNoticesList(authToken).json().notices.map(item => item.eventId)
  };
}

export default (data) => {
  const eventId = data.noticesList.at(Math.floor(Math.random() * data.noticesList.length));
  const getNoticesListResult = noticeDetails(data.token,eventId);
  assert(getNoticesListResult, [statusOk()]);
  if (getNoticesListResult.status !== 200) {
    logErrorResult(
      `Unexpected getNoticesList status`,
      getNoticesListResult,
      true
    );
    return;
  }

};