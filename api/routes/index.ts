import { Router } from "express";

export const wrap = (fn: Function) => (...args: any[]) => fn(...args).catch(args[2]);

export const router = Router();

router.get("/", (req, res, next) => res.render("index", { title: "Express" }));