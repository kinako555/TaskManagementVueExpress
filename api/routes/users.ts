import { Router } from "express";

export const router = Router();

router.get("/", (req, res, next) => res.send('respond with a resource'));
router.get("/a", (req, res, next) => res.send(req.params));