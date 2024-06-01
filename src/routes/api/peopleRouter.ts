import { Request, Response, NextFunction } from 'express'
const router = require("express").Router();
const {
  getPeople,
  postPerson,
  getPeopleById,
  updateData,
  deleteDataById
} = require("../../controllers/peopleController");

const idChecker = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const newId = +id;

  if (newId > 0) {
    next();
  } else {
    res.status(400).json({ message: "ID tidak valid" });
  }
};

router.get("/", getPeople);
router.post("/", postPerson);
router.get("/:id", idChecker, getPeopleById);
router.patch("/:id", updateData);
router.delete("/:id", deleteDataById);

module.exports = router;
