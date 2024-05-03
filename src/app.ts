import express, { Express, Request, Response } from "express";
import cors from "cors";
import apiRoutes from "./api";


const app: Express = express();


//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


//api routes middleware
app.use("/api",apiRoutes)

app.get("/", (req:Request, res:Response) => {
  return res.send("Hello World!");
});

export default app;