import express, { type Express } from 'express';
import cors from 'cors';
import { router } from "./routes/index.js";
import  "dotenv/config";

const app: Express = express();
app.use(cors({
    origin: process.env.ENABLED_CORS?.split(";") || [],
}));
app.use(express.json());
app.use(router);
app.set('query parser', 'extended');

export { app };