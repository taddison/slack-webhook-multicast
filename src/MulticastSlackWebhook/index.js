const fetch = require("node-fetch");

module.exports = async function(context, req) {
  const body = req.rawBody;

  if (!body) {
    context.log("No request body to forward");
    return;
  }

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
