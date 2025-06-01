import express from 'express';
import { createBook, getBooks, getBookById, searchBooks } from '../controllers/bookController.js';
import { addReview } from '../controllers/reviewController.js';
import auth from '../middleware/authMiddleware.js';

const bookRouter = express.Router();

bookRouter.post('/', auth, createBook);
bookRouter.get('/', getBooks);

bookRouter.get('/:id', getBookById);
bookRouter.post('/:id/reviews', auth, addReview);

export default bookRouter;
