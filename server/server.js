import express from 'express';
import rmaRouter from './routes/rmaRouter.js';
import cors from 'cors';
import connectDB from './config/connectDB.js';
import dotenv from 'dotenv';
dotenv.config();


const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();


const PORT = process.env.PORT || 3000;




app.use("/api/rma", rmaRouter);

app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}
);

