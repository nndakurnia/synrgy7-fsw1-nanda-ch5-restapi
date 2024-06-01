import express, { Express, Request, Response } from 'express';
const Router = require("./routes");

const app: Express = express()

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Success!' })
})

app.use(Router);

app.listen(8000, () => console.log("Server is running..."))