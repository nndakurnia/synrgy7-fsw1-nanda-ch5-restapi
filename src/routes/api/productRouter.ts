import { Request, Response, NextFunction } from 'express'
const router = require("express").Router();
const {
  getAllProduct,
  getProductById,
  addProduct,
  updateProduct,
  deleteProductById
} = require("../../controllers/productsController");

const idChecker = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const newId = +id;

  if (newId > 0) {
    next();
  } else {
    res.status(400).json({ message: "ID tidak valid" });
  }
};

router.get("/", getAllProduct);
router.post("/", addProduct);
router.get("/:id", idChecker, getProductById);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProductById);

module.exports = router;
