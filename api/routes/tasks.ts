import { Router } from "express";
import { wrap } from "../routes/index"
import { getTasks, createTask, deleteTask, updateTask } from "../controllers/taskController";

export const router = Router();

router.get("/", wrap(getTasks));
router.delete("/:taskId", wrap(deleteTask));
router.patch("/:taskId", wrap(updateTask));
router.post("/create", wrap(createTask));