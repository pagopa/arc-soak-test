import { assert, statusOk } from "../../common/assertions.js";
import {
  logout,
  AUTH_API_NAMES,
} from "../../api/auth.js";
import defaultHandleSummaryBuilder from "../../common/handleSummaryBuilder.js";
import { defaultApiOptionsBuilder } from "../../common/dynamicScenarios/defaultOptions.js";
import { logErrorResult } from "../../common/dynamicScenarios/utils.js";
import { getAuthToken } from "../../common/utils.js";

const application = "auth";
const testName = "getLogoutEndpoint";

// Dynamic scenarios' K6 configuration
export const options = defaultApiOptionsBuilder(
  application,
  testName,
  [
    AUTH_API_NAMES.getLogoutEndpoint,
  ] // applying apiName tags to thresholds
);

// K6 summary configuration
export const handleSummary = defaultHandleSummaryBuilder(application, testName);

export default (data) => {
  const getLogoutEndpointResult = logout("sampleToken");

  assert(getLogoutEndpointResult, [statusOk()]);

  if (getLogoutEndpointResult.status !== 200) {
    logErrorResult(
      `Unexpected getLogoutEndpoint status`,
      getLogoutEndpointResult,
      true
    );
    return;
  }
};