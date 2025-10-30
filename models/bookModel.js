const { error } = require("console");

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

async function getAllBooks() {
    if(Object.length>0)
  return Object.values(books);
else throw new error("there is no books available")
}

async function getBookByISBN(isbn) {
    try{
         
  return await getAllBooks[isbn];
}catch(err){console.error(err);
}
}


async function findByAuthor(author) {
  const q = author.toLowerCase();
  try{
  return await getAllBooks.values(books).filter(b => b.author.toLowerCase().includes(q));
}catch(err){console.error(err)}
}
async function findByTitle(title) {
  const q = title.toLowerCase();
  try{
  return await getAllBooks.values(books).filter(b => b.title.toLowerCase().includes(q));
}catch(err){}}

module.exports = { books, getAllBooks, getBookByISBN, findByAuthor, findByTitle };
