const router = require("express").Router();
const PeopleRouter = require("./api/peopleRouter");
const BooksRouter = require("./api/booksRouter")
const ProductRouter = require("./api/productRouter")

router.use("/people", PeopleRouter);
router.use("/books", BooksRouter);
router.use("/product", ProductRouter);

module.exports = router;
