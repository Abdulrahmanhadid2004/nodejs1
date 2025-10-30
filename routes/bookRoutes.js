const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { verifyToken } = require('../middleware/authMiddleware');

// Public routes
router.get('/', bookController.getBooks);
router.get('/isbn/:isbn', bookController.getBookByISBN);
router.get('/author/:author', bookController.getBooksByAuthor);
router.get('/title/:title', bookController.getBooksByTitle);
router.get('/:isbn/review', bookController.getBookReviews);

// Protected routes
router.post('/:isbn/review', verifyToken, bookController.addOrModifyReview);
router.delete('/:isbn/review', verifyToken, bookController.deleteReview);

module.exports = router;
