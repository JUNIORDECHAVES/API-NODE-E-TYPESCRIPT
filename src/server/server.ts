import { Express } from 'express';
import express from 'express';

const app: Express = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

interface test {

}

export { app };