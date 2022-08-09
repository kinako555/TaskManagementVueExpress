import { Router } from "express";
import { wrap } from "../routes/index"
import { getTasks, createTask } from "../controllers/taskController";

export const router = Router();

router.get("/", wrap(getTasks));
router.post("/create", wrap(createTask));