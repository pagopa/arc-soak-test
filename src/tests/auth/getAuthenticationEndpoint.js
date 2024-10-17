import { assert,statusRedirect } from "../../common/assertions.js";
import {
  login,
  AUTH_API_NAMES,
} from "../../api/auth.js";
import defaultHandleSummaryBuilder from "../../common/handleSummaryBuilder.js";
import { defaultApiOptionsBuilder } from "../../common/dynamicScenarios/defaultOptions.js";
import { logErrorResult } from "../../common/dynamicScenarios/utils.js";
import { getAuthToken } from "../../common/utils.js";

const application = "auth";
const testName = "getAuthenticationEndpoint";

// Dynamic scenarios' K6 configuration
export const options = defaultApiOptionsBuilder(
  application,
  testName,
  [
    AUTH_API_NAMES.getAuthenticationEndpoint,
  ] // applying apiName tags to thresholds
);

// K6 summary configuration
export const handleSummary = defaultHandleSummaryBuilder(application, testName);

export default (data) => {
  const getAuthTokenResult = login();

  assert(getAuthTokenResult, [statusRedirect()]);

  if (getAuthTokenResult.status !== 302) {
    logErrorResult(
      `Unexpected getAuthToken status`,
      getAuthTokenResult,
      true
    );
    return;
  }
};