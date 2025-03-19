// const express = require('express')

import { Request, Response } from "express";
import express from "express";
import cors from "cors";
import router from "./app/route";
import globalErrorHandler from "./app/middlewares/globalErrorHandeler";
import notFound from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true})); // for ssl
app.use(cors({origin:['http://localhost:5173', 'https://bikerushdotcom.web.app'], credentials:true}));
app.use(cookieParser())

// app.use("/api/v1", router)
app.use("/api", router)

app.get('/', (req: Request , res : Response ) => {
  res.send('Basa Finder is running!')
})

// const test = async(req: Request , res : Response ) => {
//   // Promise.reject();
 
// }

// app.get('/', test)

app.use(globalErrorHandler);
app.use(notFound);

export default app;