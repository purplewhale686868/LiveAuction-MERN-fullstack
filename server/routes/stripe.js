import express from "express";
import { verifyToken } from "../verifyToken.js";

// const stripe = require("stripe")(process.env.STRIPE_KEY);
const KEY = process.env.STRIPE_KEY;
// const stripe = require("stripe")(KEY);
import Stripe from "stripe";

const stripe = Stripe(KEY);

const router = express.Router();

router.post("/payment", verifyToken, (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

export default router;
