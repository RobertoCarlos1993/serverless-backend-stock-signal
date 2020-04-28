import Responses from "./common/API_Response";
import stripePackage from "stripe";
import AWS from "aws-sdk";
import handler from "./libs/handler-lib";
import { planCost } from "./libs/billing-lib";
import config from "./config";

const ssm = new AWS.SSM();
const stripeSecretKeyPromise = ssm
  .getParameter({
    Name: config.stripeKeyName,
    WithDecryption: true,
  })
  .promise();

export const main = handler(async (event, context) => {
  // Ensure minimum runtime, whenever certain params are not given
  if (event.httpMethod !== "POST" || !event.body) {
    return Responses._400({
      paid: false,
      msg: "Missing params: we cannot process with the payment",
    });
  }

  const { token, months, email } = JSON.parse(event.body);
  const amount = planCost(months);
  const description = "Membership Investment";

  const stripeSecretKey = await stripeSecretKeyPromise;
  const stripe = stripePackage(stripeSecretKey.Parameter.Value);

  try {
    await stripe.charges.create({
      source: token,
      amount,
      description,
      receipt_email: email,
      currency: "eur",
    });

    return Responses._200({
      paid: true,
      msg: "Payment has been succesfully!",
    });
  } catch (err) {
    return Responses._400({
      paid: false,
      msg: err.message,
    });
  }
});
