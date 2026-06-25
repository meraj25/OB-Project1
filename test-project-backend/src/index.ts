import express from 'express';
import connectDB from './infrastructure/db'
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import UserRouter from './api/User';
import TaskRouter from './api/Task';
import globalErrorHandlingMiddleware from './api/middleware/global-error-handling-middleware';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', UserRouter);
app.use('/api/tasks',TaskRouter)

connectDB();

app.use(globalErrorHandlingMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT,()=> {
    console.log(`Server is running on port ${PORT}`);
})