import express from "express";
const router = express.Router();

import { signup, signin, getAllUser, testCookie,getSingleUser } from "../controller/user.js";
import { requireAuth } from "../middleware/auth.js";

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/all-users", requireAuth, getAllUser);
router.get("/cookie", testCookie);
router.get('/single-user',requireAuth, getSingleUser)

export default router;
