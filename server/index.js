require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const FINCRA_SECRET_KEY = process.env.FINCRA_SECRET_KEY;
const FINCRA_PUBLIC_KEY = process.env.FINCRA_PUBLIC_KEY;
const REDIRECT_URL = process.env.REDIRECT_URL;

app.post("/api/initiate-payment", async (req, res) => {
  const { name, email, amount, currency } = req.body;

  try {
    const response = await axios.post(
      "https://sandboxapi.fincra.com/checkout/payments",
      {
        amount,
        currency,
        customer: { name, email },
        redirectUrl: REDIRECT_URL,
      },
      {
        headers: {
          "api-key": FINCRA_SECRET_KEY,
          "x-pub-key": FINCRA_PUBLIC_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ paymentLink: response.data?.data?.link });
  } catch (err) {
    console.error("Fincra Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to initiate payment" });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`✅ Backend running on http://localhost:${PORT}`)
);
