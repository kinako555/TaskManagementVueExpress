import createHttpError from "http-errors";
import express from "express";
import { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import { initializeApp }  from "firebase-admin/app";

import { router as indexRouter } from "./routes/index";
import { router as usersRouter } from "./routes/users";
// setting reflect-metadata (typeorm)
import "reflect-metadata";
import { AppDataSource } from "./data-source";

// setting firebase
initializeApp();

// setting typeorm
AppDataSource.initialize().then(() => {
  // here you can start to work with your database
  console.log("startDB");
}).catch(
  (error) => console.log(error)
);


const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use((req: Request, res: Response, next: NextFunction) =>
  next(createHttpError(404))
);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

/*
app.listen(3000,()=>{
  console.log('start port to 3000')
});
*/

export {app};