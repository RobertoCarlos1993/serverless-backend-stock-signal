import handler from "./libs/handler-lib";

export const main = handler(async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Confirmación de la compra y contenido",
        input: event,
      },
      null,
      2
    ),
  };
});
