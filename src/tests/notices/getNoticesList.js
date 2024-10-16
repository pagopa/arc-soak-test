import { assert, statusOk } from "../../common/assertions.js";
import {
  notices,
  NOTICES_API_NAMES,
} from "../../api/notices.js";
import defaultHandleSummaryBuilder from "../../common/handleSummaryBuilder.js";
import { defaultApiOptionsBuilder } from "../../common/dynamicScenarios/defaultOptions.js";
import { logErrorResult } from "../../common/dynamicScenarios/utils.js";
import { getAuthToken } from "../../common/utils.js";

const application = "notices";
const testName = "getNoticesList";

// Dynamic scenarios' K6 configuration
export const options = defaultApiOptionsBuilder(
  application,
  testName,
  [
    NOTICES_API_NAMES.getNoticesList,
  ] // applying apiName tags to thresholds
);

// K6 summary configuration
export const handleSummary = defaultHandleSummaryBuilder(application, testName);

export function setup() {
  return { token: getAuthToken() };
}

export default (data) => {
  const getNoticesListResult = notices(data.token);

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