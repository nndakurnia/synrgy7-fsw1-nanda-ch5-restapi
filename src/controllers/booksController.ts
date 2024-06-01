import { Request, Response } from 'express';
const books = require("../datas/books")

// GET /books
// GET /books?title=fairy
const getBooks = (req: Request, res: Response) => {
  const userQuery: string = req.query.title as string || req.query.author as string

  if (userQuery) {
    const filteredData = books.filter((row: any) =>
      row.title.toLowerCase().includes(userQuery.toLowerCase()) || row.author.toLowerCase().includes(userQuery.toLowerCase())
    );

    if (!filteredData) {
      return res.status(404).json({ message: "Book data not found." });
    } else {
      res.status(200).json({ message: "Success", filteredData });
    }
  } else {
    res.status(200).json({ message: "Success", books });
  }
};

// GET /books/10
const getBookById = (req: Request, res: Response) => {
  const bookId = +req.params.id; // unary plus

  const book = books.find((row: any) => row.id == bookId);
  if (book) {
    res.status(200).json({ message: "Success", book });
  } else {
    return res.status(404).json({ message: "Book data not found." });
  }
};

// POST /books
const addBook = (req: Request, res: Response) => {
  const payload = req.body;
  books.push(payload);

  res.status(200).json({ message: "Success", books });
};

// PATCH /books/10
const updateBook = (req: Request, res: Response) => {
  const bookId = +req.params.id;
  const newData = req.body;

  const index = books.findIndex((row: any) => row.id == bookId);
  if (index !== -1) {
    books[index] = { ...books[index], ...newData };
    res.status(200).json({ message: "Book data updated successfully.", books });
  } else {
    return res.status(404).json({ message: "Book data not found." });
  }
};

// DELETE /books/10
const deleteBookById = (req: Request, res: Response) => {
  const bookId = +req.params.id;

  const index = books.findIndex((row: any) => row.id == bookId);
  if (index !== -1) {
    books.splice(index, 1);
    res.status(200).json({ message: "Book data deleted successfully.", books });
  } else {
    return res.status(404).json({ message: "Book data not found." });
  }
};

module.exports = {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBookById,
};
