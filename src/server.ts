import express, { Request, Response } from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(cors({
    origin: "*",
    credentials: true,
}));

app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Express + TypeScript + ESM is working perfectly!");
});


export default app