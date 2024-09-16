import express from "express";
import {
  createComment,
  getNegativeComments,
  approveComment,
} from "../controllers/comments.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* CREATE */
router.post("/", createComment);

/* READ - Admin route to get all negative comments */
router.get("/negative", getNegativeComments);

/* UPDATE - Admin route to approve a comment */
router.patch("/:id/approve", approveComment);

export default router;
