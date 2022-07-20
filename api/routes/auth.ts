import { Router } from "express";

export const router = Router();

const authController = require('../controllers/authController');

router.post("/signup", authController.signup);