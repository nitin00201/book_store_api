import express from 'express';
import { updateReview, deleteReview } from '../controllers/reviewController.js';
import auth from '../middleware/authMiddleware.js';

const reviewRouter = express.Router();

reviewRouter.put('/:id', auth, updateReview);
reviewRouter.delete('/:id', auth, deleteReview);

export default reviewRouter;
