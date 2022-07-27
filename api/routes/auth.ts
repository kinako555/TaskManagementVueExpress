import { Router } from "express";
import { wrap } from "../routes/index"

export const router = Router();

const authController = require('../controllers/authController');

router.post("/signup", wrap(authController.signup));