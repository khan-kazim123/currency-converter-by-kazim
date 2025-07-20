
import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 👉 GET /api/currencies
app.get('/api/currencies', async (req: Request, res: Response) => {
  try {
    const response = await axios.get('https://api.freecurrencyapi.com/v1/currencies', {
      headers: {
        apikey: process.env.FREECURRENCY_API_KEY!,
      }
    });
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch currencies' });
  }
});

app.get('/api/convert', async (req: Request, res: Response) => {
  try {
    const { base_currency, currencies } = req.query;

    const response = await axios.get('https://api.freecurrencyapi.com/v1/latest', {
      headers: {
        apikey: process.env.FREECURRENCY_API_KEY!,
      },
      params: {
        base_currency,
        currencies,
      },
    });

    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Conversion failed' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
