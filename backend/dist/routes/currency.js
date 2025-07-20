"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const router = express_1.default.Router();
const API_BASE = 'https://api.freecurrencyapi.com/v1';
const API_KEY = process.env.API_KEY;
router.get('/currencies', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield axios_1.default.get(`${API_BASE}/currencies`, {
            headers: { apikey: API_KEY }
        });
        res.json(result.data);
    }
    catch (err) {
        res.status(500).json({ error: 'Currency fetch failed' });
    }
}));
router.get('/convert', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { base_currency, currencies } = req.query;
    try {
        const result = yield axios_1.default.get(`${API_BASE}/latest`, {
            headers: { apikey: API_KEY },
            params: { base_currency, currencies }
        });
        res.json(result.data);
    }
    catch (err) {
        res.status(500).json({ error: 'Conversion failed' });
    }
}));
exports.default = router;
