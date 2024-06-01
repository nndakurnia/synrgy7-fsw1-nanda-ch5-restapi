import { Request, Response } from 'express';
const data = require("../datas/people")

// GET /people
// GET /people?name=Leanne
const getPeople = (req: Request, res: Response) => {
  const userQuery = req.query.name as string

  if (userQuery) {
    const filteredData = data.filter((row: any) =>
      row.name.toLowerCase().includes(userQuery.toLowerCase())
    );

    if (!filteredData) {
      return res.status(404).json({ message: "Data not found." });
    } else {
      res.status(200).json({ message: "Success", filteredData });
    }
  } else {
    res.status(200).json({ message: "Success", data });
  }
};

// GET /people/10
const getPeopleById = (req: Request, res: Response) => {
  const userId = +req.params.id; // unary plus

  const person = data.find((row: any) => row.id == userId);
  if (person) {
    res.status(200).json({ message: "Success", person });
  } else {
    return res.status(404).json({ message: "Data not found." });
  }
};

// POST /people
const postPerson = (req: Request, res: Response) => {
  const payload = req.body;
  data.push(payload);

  res.status(200).json({ message: "Success", data });
};

// PATCH /people/10
const updateData = (req: Request, res: Response) => {
  const userId = +req.params.id;
  const newData = req.body;

  const index = data.findIndex((row: any) => row.id == userId);
  if (index !== -1) {
    data[index] = { ...data[index], ...newData };
    res.status(200).json({ message: "Data updated successfully.", data });
  } else {
    return res.status(404).json({ message: "Data not found." });
  }
};

// DELETE /people/10
const deleteDataById = (req: Request, res: Response) => {
  const userId = +req.params.id;

  const index = data.findIndex((row: any) => row.id == userId);
  if (index !== -1) {
    data.splice(index, 1);
    res.status(200).json({ message: "Data deleted successfully.", data });
  } else {
    return res.status(404).json({ message: "Data not found." });
  }
};

module.exports = {
  getPeople,
  getPeopleById,
  postPerson,
  updateData,
  deleteDataById,
};
