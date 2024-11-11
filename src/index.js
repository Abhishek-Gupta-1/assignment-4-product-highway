
import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;
import { connectDB } from './config/db.js';

connectDB();

app.get('/', (req, res) => {
  res.send('Heeelloo World');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});