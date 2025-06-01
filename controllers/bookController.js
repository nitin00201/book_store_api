import Book from '../models/Book.js';
import Review from '../models/Review.js';

export const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, author, genre } = req.query;

    const filter = {};
    if (author) filter.author = new RegExp(author, 'i');
    if (genre) filter.genre = genre;

    const skip = (Number(page) - 1) * Number(limit);

    const [books, total] = await Promise.all([
      Book.find(filter).skip(skip).limit(Number(limit)),
      Book.countDocuments(filter)
    ]);

    res.json({
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
      books
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const searchBooks = async (req, res) => {
  const { query, page = 1, limit = 10 } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  try {
    const regex = new RegExp(query, 'i'); // partial & case-insensitive
    const filter = {
      $or: [{ title: regex }, { author: regex }]
    };

    const skip = (Number(page) - 1) * Number(limit);

    const [books, total] = await Promise.all([
      Book.find(filter).skip(skip).limit(Number(limit)),
      Book.countDocuments(filter)
    ]);

    res.json({
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
      books
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


export const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  const reviews = await Review.find({ book: book._id });
  const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1);
  res.json({ ...book.toObject(), averageRating, reviews });
};
