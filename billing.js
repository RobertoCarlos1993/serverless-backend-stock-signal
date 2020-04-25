import stripePackage from "stripe";
import handler from "./libs/handler-lib";
import { planCost } from "./libs/billing-lib";

export const main = handler(async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Billing...${planCost(1)}`,
        input: event,
      },
      null,
      2
    ),
  };
});
