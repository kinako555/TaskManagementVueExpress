import { Router } from "express";
import { wrap } from "../routes/index"
import { deleteUser } from "../controllers/userController";

export const router = Router();

router.patch('/delete', wrap(deleteUser));