import express from 'express';
import connectDB from './infrastructure/db'
import 'dotenv/config';
import UserRouter from './api/User';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', UserRouter);

connectDB();

const PORT = process.env.PORT || 8000;
app.listen(PORT,()=> {
    console.log(`Server is running on port ${PORT}`);
})