
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Converter() {
  const [currencies, setCurrencies] = useState([]);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('PKR');
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCurrencies = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/currencies');
      setCurrencies(Object.keys(res.data.data));
    } catch (err) {
      console.error('Error fetching currencies:', err.message);
    }
  };

  const convert = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/convert', {
        params: { base_currency: from, currencies: to }
      });
      const rate = res.data.data[to];
      const final = rate * amount;
      const formatted = final.toFixed(2);
      setResult(formatted);

      const newEntry = {
        amount,
        from,
        to,
        result: formatted,
        date: new Date().toLocaleString()
      };
      saveToHistory(newEntry);
    } catch (err) {
      console.error('Conversion error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const saveToHistory = (entry) => {
    const prev = JSON.parse(localStorage.getItem('history') || '[]');
    const updated = [entry, ...prev];
    localStorage.setItem('history', JSON.stringify(updated));
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  return (
    <div className="p-3">
      <h4>Currency Converter</h4>

      <input
        type="number"
        value={amount}
        onChange={e => setAmount(Number(e.target.value))}
        className="form-control mb-2"
      />

      <div className="d-flex mb-2">
        <select value={from} onChange={e => setFrom(e.target.value)} className="form-select me-2">
          {currencies.map(c => <option key={c}>{c}</option>)}
        </select>
        <span className="align-self-center">to</span>
        <select value={to} onChange={e => setTo(e.target.value)} className="form-select ms-2">
          {currencies.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      <button className="btn btn-primary" onClick={convert} disabled={loading}>
        {loading ? 'Converting...' : 'Convert'}
      </button>

      {result && (
        <div className="alert alert-success mt-3">
          Result: {result} {to}
        </div>
      )}
    </div>
  );
}

export default Converter;
