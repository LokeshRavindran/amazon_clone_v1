const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51KnQp1SBJvny6lvWe5OcByAhpG06h1VGWtwyawkrTBagAqhgRKnDUqGUJbCP2fH2qycVM4pioCvspKzV8DgVjTpb00IJsgOQN0"
);

// API

// APP CONFIG
const app = express();

// MIDDLEWARES
app.use(cors({ origin: true }));
app.use(express.json());

// API ROUTES
app.get("/", (request, response) => response.status(200).send("Hello world"));

app.post("/payments/create", async (request, response) =>  {
  const total = request.query.total;
  console.log("Payment Request Recieved for this amount >>>", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "INR",
  });
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// LISTEN COMMAND
exports.api = functions.https.onRequest(app);

// http://127.0.0.1:5001/v1-1b592/us-central1/api
