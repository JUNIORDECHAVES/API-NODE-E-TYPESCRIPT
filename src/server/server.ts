import express, { type Express } from 'express';
import { router } from "./routes/index.js";
import  "dotenv/config";

const app: Express = express();
app.use(express.json());
app.use(router);


export { app };