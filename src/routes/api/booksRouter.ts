import { Request, Response, NextFunction } from 'express'
const router = require("express").Router();
const {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBookById
} = require("../../controllers/booksController");

const idChecker = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const newId = +id;

  if (newId > 0) {
    next();
  } else {
    res.status(400).json({ message: "ID tidak valid" });
  }
};

router.get("/", getBooks);
router.post("/", addBook);
router.get("/:id", idChecker, getBookById);
router.patch("/:id", updateBook);
router.delete("/:id", deleteBookById);

module.exports = router;
