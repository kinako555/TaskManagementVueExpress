import { Router } from "express";
import { wrap } from "../routes/index"
import { getTasks } from "../controllers/taskController";

export const router = Router();

router.get("/", wrap(getTasks));