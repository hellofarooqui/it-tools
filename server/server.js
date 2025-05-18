import express from 'express';
import rmaRouter from './routes/rmaRouter.js';
import devicesRouter from './routes/devicesRouter.js';
import cors from 'cors';
import connectDB from './config/connectDB.js';
import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import { fileURLToPath } from 'url';


const app = express();


app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
rmaRouter
connectDB();


const PORT = process.env.PORT || 3000;




app.use("/api/rma", rmaRouter);
app.use("/api/devices", devicesRouter);

app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}
);

