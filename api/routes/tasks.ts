import { Router } from "express";
import { wrap } from "../routes/index"
import { getTasks, createTask, deleteTask } from "../controllers/taskController";

export const router = Router();

router.get("/", wrap(getTasks));
router.delete("/:taskId", wrap(deleteTask));
router.post("/create", wrap(createTask));