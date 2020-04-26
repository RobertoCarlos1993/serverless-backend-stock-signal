import Responses from "./common/API_Response";
import handler from "./libs/handler-lib";

export const main = handler(async (event, context) => {
  const { to } = JSON.parse(event.body);

  if (!to || !secret) {
    return Responses._400({
      msg: 'Missing "to" field',
    });
  }

  return Responses._200({
    msg: "Confirmación de la compra y contenido",
  });
});
