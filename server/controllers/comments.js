// server/controllers/comments.js
import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

/* CREATE */
export const createComment = async (req, res) => {
  try {
    const { postId, userId, content, isNegative, isApproved } = req.body;

    const newComment = new Comment({
      postId,
      userId,
      content,
      isNegative,
      isApproved,
    });

    const savedComment = await newComment.save();

    await Post.findByIdAndUpdate(postId, {
      $push: { comments: savedComment._id },
    });

    res.status(201).json(savedComment);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ - Fetch all negative comments (for admin review) */
export const getNegativeComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      isNegative: true,
      isApproved: false,
    });
    res.status(200).json(comments);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE - Approve a comment */
export const approveComment = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { isApproved: true },
      { new: true }
    );

    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
