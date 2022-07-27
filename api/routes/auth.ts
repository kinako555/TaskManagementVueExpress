import { Router } from "express";
import { wrap } from "../routes/index"
import { signin, oautnSignin } from "../controllers/authController";

export const router = Router();

router.post("/signin", wrap(signin));
router.post("/oauthSignin", wrap(oautnSignin));