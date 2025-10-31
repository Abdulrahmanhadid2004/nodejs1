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
   reviews: {
    "reader123": {
      rating: 5,
      comment: "Haunting and beautifully written."
    },
    "booklover88": {
      rating: 4,
      comment: "Bleak but powerful."
    }
  }

  }
};

async function getAllBooks() {
  if (Object.keys(books).length > 0)
    return Object.values(books);
  else
    throw new Error("There are no books available");
}

function getBookByISBN(isbn) {
  return getAllBooks()
    .then(allBooks => {
      return allBooks.find(book => book.isbn === isbn);
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
}



async function findByAuthor(author) {
  const q = author.toLowerCase();
  try {
    const allBooks = await getAllBooks();
    return allBooks.filter(b => b.author.toLowerCase().includes(q));
  } catch (err) {
    console.error(err);
  }
}

async function findByTitle(title) {
  const q = title.toLowerCase();
  try {
    const allBooks = await getAllBooks();
    return allBooks.filter(b => b.title.toLowerCase().includes(q));
  } catch (err) {
    console.error(err);
  }
}

module.exports = { books, getAllBooks, getBookByISBN, findByAuthor, findByTitle };