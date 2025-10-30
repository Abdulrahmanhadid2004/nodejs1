const { books, getAllBooks, getBookByISBN, findByAuthor, findByTitle } = require('../models/bookModel');

// public endpoints
exports.getBooks = async (req, res) =>{ 
  try{
  res.json(getAllBooks());}
    catch(err){console.error(err)}
}
exports.getBookByISBN = (req, res) => {
  const book = getBookByISBN(req.params.isbn);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
};
exports.getBooksByAuthor = (req, res) => res.json(findByAuthor(req.params.author));
exports.getBooksByTitle = (req, res) => res.json(findByTitle(req.params.title));

exports.getBookReviews = (req, res) => {
  const book = books[req.params.isbn];
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(Object.entries(book.reviews).map(([user, review]) => ({ user, ...review })));
};

// protected endpoints
exports.addOrModifyReview = (req, res) => {
  const username = req.user.username;
  const book = books[req.params.isbn];
  if (!book) return res.status(404).json({ error: 'Book not found' });
  const { rating, comment } = req.body;
  book.reviews[username] = { rating, comment, date: new Date().toISOString() };
  res.json({ message: 'Review added/updated', review: book.reviews[username] });
};

exports.deleteReview = (req, res) => {
  const username = req.user.username;
  const book = books[req.params.isbn];
  if (!book || !book.reviews[username])
    return res.status(403).json({ error: 'You can delete only your own review' });
  delete book.reviews[username];
  res.json({ message: 'Review deleted' });
};
