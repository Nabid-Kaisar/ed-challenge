import express, { Request, Response } from 'express';
import {SERVER_PORT} from "../../constants/CONSTANTS";
import {DUMMY_RESPONSE} from "../../constants/DUMMY_RESPONSE";

const app = express();
const port: number = SERVER_PORT;

app.get('/api/promotions/priceoffers/ond/:origin/:destination', (req: Request, res: Response) => {
    res.json(DUMMY_RESPONSE);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});