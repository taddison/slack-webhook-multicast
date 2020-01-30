const fetch = require("node-fetch");

const SLACK_FORWARD_TO_URI = "SLACK_FORWARD_TO_URI";
const LOG_FULL_PAYLOAD = "LOG_FULL_PAYLOAD";

const processMessageForMulticast = async (context, rawBody) => {
  context.log("Processing multicast message");

  // TODO: Actually process it

  return;
};

module.exports = async function(context, req) {
  const { rawBody } = req;

  if (!rawBody) {
    context.log.warn("No request body to forward");
    return;
  }

  const logFullPayload = process.env[LOG_FULL_PAYLOAD];
  if(logFullPayload) {
    context.log(rawBody);
  }

  try {
    await processMessageForMulticast(context, rawBody);
  } catch (err) {
    context.log.error(err);
  }

  const slackForwardToUri = process.env[SLACK_FORWARD_TO_URI];
  if (!slackForwardToUri) {
    const errorMessage = `Missing config value: ${SLACK_FORWARD_TO_URI}`;
    throw new Error(errorMessage);
  }

  if (slackForwardToUri === "DO_NOT_FORWARD") {
    context.log(`Slack Uri set to DO_NOT_FORWARD, skipping...`);
    return;
  }

  const slackForwardOptions = {
    method: "POST",
    body: rawBody,
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    context.log(`Forwarding to ${slackForwardToUri}`);
    response = await fetch(slackForwardToUri, slackForwardOptions);

    if (!response.ok) {
      context.log.warn(`Response code indicates failure: ${response.status}`);
    }
  } catch (err) {
    throw err;
  }
};
