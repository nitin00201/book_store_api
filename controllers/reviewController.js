import Review from '../models/Review.js';

export const addReview = async (req, res) => {
  const { rating, comment } = req.body;
  const exists = await Review.findOne({ user: req.user.id, book: req.params.id });
  if (exists) return res.status(400).json({ message: 'Review already exists' });
  const review = await Review.create({ user: req.user.id, book: req.params.id, rating, comment });
  res.status(201).json(review);
};

export const updateReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review || review.user.toString() !== req.user.id)
    return res.status(403).json({ message: 'Not authorized' });
  Object.assign(review, req.body);
  await review.save();
  res.json(review);
};

export const deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review || review.user.toString() !== req.user.id)
    return res.status(403).json({ message: 'Not authorized' });
  await review.remove();
  res.json({ message: 'Review deleted' });
};