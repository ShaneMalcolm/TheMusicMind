import express from "express";
import {
  createComment,
  getNegativeComments,
  approveComment,
  deleteComment,
} from "../controllers/comments.js";

const router = express.Router();

/* CREATE */
router.post("/", createComment);

/* READ - Admin route to get all negative comments */
router.get("/negative", getNegativeComments);

/* UPDATE - Admin route to approve a comment */
router.patch("/:id/approve", approveComment);

/* DELETE - Admin route to delete a comment */
router.delete("/:postId/:commentId/delete", deleteComment);

export default router;
