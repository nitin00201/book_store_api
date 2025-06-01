import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './routes/authRoutes.js';
import bookRouter from './routes/bookRoutes.js';
import reviewRouter from './routes/reviewRoutes.js';
import { searchBooks } from './controllers/bookController.js';

dotenv.config();
const app = express();

app.use(express.json());

connectDB();

app.use('/', authRouter);
app.use('/books', bookRouter);
app.use('/reviews', reviewRouter);
app.get('/search', searchBooks);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));