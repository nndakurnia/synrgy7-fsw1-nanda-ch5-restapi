import { Request, Response } from 'express';
const products = require("../datas/products")

// GET /product
// GET /product?name=product
const getAllProduct = (req: Request, res: Response) => {
  const userQuery: string = req.query.name as string

  if (userQuery) {
    const filteredData = products.filter((row: any) =>
      row.name.toLowerCase().includes(userQuery.toLowerCase())
    );

    if (!filteredData) {
      return res.status(404).json({ message: "Product data not found." });
    } else {
      res.status(200).json({ message: "Success", filteredData });
    }
  } else {
    res.status(200).json({ message: "Success", products });
  }
};

// GET /product/10
const getProductById = (req: Request, res: Response) => {
  const productId = +req.params.id; // unary plus

  const product = products.find((row: any) => row.id == productId);
  if (product) {
    res.status(200).json({ message: "Success", product });
  } else {
    return res.status(404).json({ message: "Product data not found." });
  }
};

// POST /product
const addProduct = (req: Request, res: Response) => {
  const payload = req.body;
  products.push(payload);

  res.status(200).json({ message: "Success", products });
};

// PATCH /product/10
const updateProduct = (req: Request, res: Response) => {
  const productId = +req.params.id;
  const newData = req.body;

  const index = products.findIndex((row: any) => row.id == productId);
  if (index !== -1) {
    products[index] = { ...products[index], ...newData };
    res.status(200).json({ message: "Product updated successfully.", products });
  } else {
    return res.status(404).json({ message: "Product not found." });
  }
};

// DELETE /products/10
const deleteProductById = (req: Request, res: Response) => {
  const productId = +req.params.id;

  const index = products.findIndex((row: any) => row.id == productId);
  if (index !== -1) {
    products.splice(index, 1);
    res.status(200).json({ message: "Product deleted successfully.", products });
  } else {
    return res.status(404).json({ message: "Product not found." });
  }
};

module.exports = {
  getAllProduct,
  getProductById,
  addProduct,
  updateProduct,
  deleteProductById,
};
