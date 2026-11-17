// Replace these values for your own WeChat project before enabling live services.
const apiOrigin = "https://example.invalid";
const cloudEnvironment = "";
const meetingMiniProgram = "";
const apiUrl = endpoint => apiOrigin.replace(/\/$/, "") + endpoint;
module.exports = { apiUrl, cloudEnvironment, meetingMiniProgram };
