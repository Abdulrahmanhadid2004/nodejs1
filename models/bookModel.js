let books = {
  "9780143127550": {
    isbn: "9780143127550",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    reviews: {}
  },
  "9780062316110": {
    isbn: "9780062316110",
    title: "The Alchemist",
    author: "Paulo Coelho",
    reviews: {}
  }
};

function getAllBooks() {
  return Object.values(books);
}

function getBookByISBN(isbn) {
  return books[isbn];
}

function findByAuthor(author) {
  const q = author.toLowerCase();
  return Object.values(books).filter(b => b.author.toLowerCase().includes(q));
}

function findByTitle(title) {
  const q = title.toLowerCase();
  return Object.values(books).filter(b => b.title.toLowerCase().includes(q));
}

module.exports = { books, getAllBooks, getBookByISBN, findByAuthor, findByTitle };
