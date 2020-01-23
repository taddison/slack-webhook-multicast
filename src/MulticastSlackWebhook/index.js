const fetch = require("node-fetch");

module.exports = async function(context, req) {
  const body = req.rawBody;

  if (!body) {
    context.log("No request body to forward");
    return;
  }

  // TODO: Fallback uri should come from config (and be the original Slack endpoint)
  // TODO: Every post should go the Slack endpoint UNLESS the endpoint is empty (migration complete)
  // TODO: Try to send the webhook on to a destination based on parsing

  const forwardToUri = "http://requestbin.net/1/1frjgmd1";
  const fetchOptions = {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    response = await fetch(forwardToUri, fetchOptions);
    if (!response.ok) {
      context.log.warn(`Response code indicates failure: ${response.status}`);
    }
  } catch (err) {
    context.log.error(err);
  }
};
