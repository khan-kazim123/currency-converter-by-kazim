import express from 'express';
import axios from 'axios';

const router = express.Router();
const API_BASE = 'https://api.freecurrencyapi.com/v1';
const API_KEY = "4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2"

router.get('/currencies', async (_, res) => {
  try {
    const result = await axios.get(`${API_BASE}/currencies`, {
      headers: { apikey: API_KEY }
    });
    res.json(result.data);
  } catch (err) {
    res.status(500).json({ error: 'Currency fetch failed' });
  }
});

// router.get('/convert', async (req, res) => {
//   const { base_currency, currencies } = req.query;
//   try {
//     const result = await axios.get(`${API_BASE}/latest`, {
//       headers: { apikey: API_KEY },
//       params: { base_currency, currencies }
//     });
//     // console.log(API_KEY)
//     console.log(result.data)
//     res.json(result.data);
//     // return API_KEY;
//   } catch (err) {
//     res.status(500).json({ error: 'Conversion failed' });
//   }
// });
// src/routes/currency.ts

router.get("/convert", async (req, res) => {
  const { base_currency, currencies } = req.query;

  try {
    const response = await axios.get("https://api.freecurrencyapi.com/v1/latest", {
      params: {
        apikey: process.env.CURRENCY_API_KEY, // pass as query param
        base_currency,
        currencies
      }
    });

    res.json({ data: response.data.data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Conversion failed" });
  }
});
const history: any[] = [];

router.get("/history", (req, res) => {
  res.json(history);
});

router.get("/convert", async (req, res) => {
  const { base_currency, currencies } = req.query;

  try {
    const response = await axios.get("https://api.freecurrencyapi.com/v1/latest", {
      params: {
        apikey: process.env.CURRENCY_API_KEY,
        base_currency,
        currencies,
      },
    });

    const rate = response.data.data[currencies as string];
    const converted = rate;
    
    const conversion = {
      date: new Date().toLocaleString(),
      base: base_currency,
      target: currencies,
      rate,
    };

    history.push(conversion); 

    res.json({ rate: converted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Conversion failed" });
  }
});

export default router;
