import express from 'express';
import connectDB from './infrastructure/db'
import 'dotenv/config';

const app = express();

app.use(express.json());

connectDB();

const PORT = process.env.PORT || 8000;
app.listen(PORT,()=> {
    console.log(`Server is running on port ${PORT}`);
})