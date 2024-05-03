import express, { Express, Request, Response } from "express";

const app: Express = express();

app.get('/', (req:Request, res:Response) => {
  return res.send('Hello World!');
});

export default app;