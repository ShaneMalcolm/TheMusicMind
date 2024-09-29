// client/src/scenes/adminCommentsPage/index.jsx
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import WidgetWrapper from "components/WidgetWrapper";

const AdminCommentsPage = () => {
  const { palette } = useTheme();
  const [negativeComments, setNegativeComments] = useState([]);
  const token = useSelector((state) => state.token);

  const getNegativeComments = async () => {
    const response = await fetch("http://localhost:3001/comments/negative", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setNegativeComments(data);
  };

  const approveComment = async (commentId) => {
    const response = await fetch(
      `http://localhost:3001/comments/${commentId}/approve`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      setNegativeComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
    }
  };
  const deleteComment = async (commentId, postId) => {
    const response = await fetch(
      `http://localhost:3001/comments/${postId}/${commentId}/delete`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      setNegativeComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
    }
  };

  useEffect(() => {
    getNegativeComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="2rem"
      >
        <Typography variant="h4" color={palette.neutral.dark}>
          Admin - Negative Comments Review
        </Typography>

        {negativeComments.length === 0 ? (
          <Typography variant="h6" color={palette.neutral.main}>
            No negative comments to review.
          </Typography>
        ) : (
          <Box width="100%" maxWidth="800px">
            {negativeComments.map((comment) => (
              <WidgetWrapper key={comment._id} mb="2rem">
                <Typography variant="h6" color={palette.neutral.dark}>
                  {comment.content}
                </Typography>
                <Typography sx={{ color: palette.neutral.main, mb: "1rem" }}>
                  Post ID: {comment.postId}
                </Typography>
                <Typography sx={{ color: palette.neutral.main, mb: "1rem" }}>
                  Description: {comment.description}
      </Typography>
      {comment.picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${comment.picturePath}`}
        />
      )}
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => approveComment(comment._id)}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => deleteComment(comment._id, comment.postId)}
                  sx={{ ml: "1rem" }}
                >
                  REJECT
                </Button>
              </WidgetWrapper>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AdminCommentsPage;
