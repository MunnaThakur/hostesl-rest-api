import express from "express";
const router = express.Router();

import { signup, signin, getAllUser, testCookie } from "../controller/user.js";
import { requireAuth } from "../middleware/auth.js";

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/all-users", requireAuth, getAllUser);
router.get("/cookie", testCookie);

export default router;
