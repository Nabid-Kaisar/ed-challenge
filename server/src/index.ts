import express, { Request, Response } from 'express';
import {SERVER_PORT} from "../../constants/CONSTANTS";

const app = express();
const port: number = SERVER_PORT;

app.get('/api/promotions/priceoffers/ond/:origin/:destination', (req: Request, res: Response) => {
    res.json({msg: 'Hello, World!'});
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});