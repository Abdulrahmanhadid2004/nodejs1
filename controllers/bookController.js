const { books, getAllBooks, getBookByISBN, findByAuthor, findByTitle } = require('../models/bookModel');

// public endpoints

exports.getBooks = async (req, res) => {
  try{const books = await getAllBooks();
  res.json(books);}
    catch(err){console.error(err)}

};

exports.getBookByISBN = (req, res) => {
  getBookByISBN(req.params.isbn)
    .then(book => {
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.json(book);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
};

exports.getBooksByAuthor = async(req, res) =>{
  try{
     res.json(await findByAuthor(req.params.author));
  }  catch(err){console.error(err); res.status(404).json({ error: 'Book not found' });}
}
exports.getBooksByTitle = async(req, res) => {
  try{
    res.json(await findByTitle(req.params.title));


  }  catch(err){console.error(err); res.status(404).json({ error: 'Book not found' });}
}

exports.getBookReviews = async(req, res) => {
  try{
    const book =await getBookByISBN(req.params.isbn);

     res.json(Object.entries(book.reviews).map(([user, review]) => ({ user, ...review })));

  }  catch(err){console.error(err); res.status(404).json({ error: 'Book not found' });}
}

// protected endpoints
exports.addOrModifyReview = (req, res) => {
  const username = req.user.username;
  const book = books[req.params.isbn];
  if (!book) return res.status(404).json({ error: 'Book not found' });

  const { rating, comment } = req.body;
  book.reviews[username] = {
    rating,
    comment,
    date: new Date().toISOString()
  };

  res.json({ message: 'Review added/updated', review: book.reviews[username] });
};

exports.deleteReview = (req, res) => {
  const username = req.user.username;
  const book = books[req.params.isbn];
  if (!book || !book.reviews[username]) {
    return res.status(403).json({ error: 'You can delete only your own review' });
  }

  delete book.reviews[username];
  res.json({ message: 'Review deleted' });
};
