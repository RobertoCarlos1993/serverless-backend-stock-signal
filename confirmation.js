import Responses from "./common/API_Response";
import AWS from "aws-sdk";

const SES = new AWS.SES();
const from = "";

export const main = handler(async (event, context) => {
  // Ensure minimum runtime, whenever certain params are not given
  if (event.httpMethod !== "POST" || !event.body) {
    return Responses._400({
      paid: false,
      msg: "Missing params: we cannot process with the emaling service",
    });
  }

  const { to } = JSON.parse(event.body);

  if (!to) {
    return Responses._400({
      msg: "Email was not provided",
    });
  }

  const params = {
    Destination: {
      ToAddress: [to],
    },
    Template: "afterPaid",
    Source: from,
  };

  try {
    await SES.sendEmail(params).promise();

    return Responses._200({
      msg: "Email was sent succesfully!",
    });
  } catch (err) {
    return Responses._400({
      msg: "Email could not be sent",
    });
  }
});
