import express, { Request, Response } from "express";

const app = express();


app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Express + TypeScript + ESM is working perfectly!");
});


export default app