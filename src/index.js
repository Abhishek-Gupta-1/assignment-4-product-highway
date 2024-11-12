
import express, { application } from "express";
const app = express();
const PORT = process.env.PORT || 3000;
import { connectDB } from './config/db.js';
import routes from "./routes/index.js";

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.get('/', (req, res) => {
  res.send('Heeelloo World');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});