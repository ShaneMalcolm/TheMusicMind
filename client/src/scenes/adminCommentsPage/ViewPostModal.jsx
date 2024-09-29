import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import PostWidget from "scenes/widgets/PostWidget";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
};

export default function ViewPostModal({ post }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleOpen}
      >
        View Post
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <PostWidget
            postId={post.postId}
            postUserId={post.userId}
            name={`${post.firstName} ${post.lastName}`}
            description={post.description}
            location={post.location}
            picturePath={post.picturePath}
            userPicturePath={post.userPicturePath}
            likes={post.likes}
            comments={post.comments}
          />
        </Box>
      </Modal>
    </>
  );
}
