import express, { Express } from "express";
import mongoose, { mongo } from "mongoose";
import cors from "cors"
import FinancialRecordRouter from "./routes/financial-record";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

const mongoURI: string =
  "mongodb+srv://adityaxraj72004:DXxJQrVgxyDcE9AO@personalfinancetracker.xsc0v.mongodb.net/";

mongoose
  .connect(mongoURI)
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.error("Failed to connect to mongoDB: ", err));

app.use("/financial-records", FinancialRecordRouter)

app.listen(port, () => {
    console.log("server running on port ",port);
    
})