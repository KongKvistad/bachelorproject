import * as functions from "firebase-functions";
import "firebase-functions";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import * as sgMail from "@sendgrid/mail";

export const mailTest = functions.https.onRequest((request, response) => {
  sgMail.setApiKey(functions.config().sendgrid.key);
  const msg = {
    to: "eirik.kvistad@gmail.com", // Change to your recipient
    from: "eirkvi@stud.ntnu.no", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  sgMail
      .send(msg)
      .then((res) => {
        functions.logger.info(res);
        response.send(res);
      })
      .catch((error) => {
        functions.logger.info(error);
        response.send(error);
      });
});
