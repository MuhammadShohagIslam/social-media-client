import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaImage } from "react-icons/fa";
import classes from "./CreateComment.module.css";

const CreateComment = ({ handleCommentThePost, user, loading }) => {
    const postImageRef = useRef();
    const [postCommentImages, setPostCommentImages] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0];
            setPostCommentImages({
                postImage: URL.createObjectURL(image),
            });
        }
    };

    return (
        <Form
            className={classes.commentPostWrapperForm}
            onSubmit={(e) => handleCommentThePost(e, setPostCommentImages)}
        >
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                    as="textarea"
                    name="postComment"
                    placeholder="Leave a comment here"
                    style={{ height: "80px" }}
                />
            </Form.Group>
            {postCommentImages && (
                <div className={classes.previewPostImageWrapper}>
                    <span
                        className={classes.previewPostCrossIcon}
                        onClick={() => setPostCommentImages(null)}
                    >
                        X
                    </span>
                    <img
                        className={classes.previewPostImage}
                        src={postCommentImages.postImage}
                        alt=""
                    />
                </div>
            )}
            <div className={classes.uploadPhotoWrapper}>
                <div>
                    <h2 className={classes.uploadTitle}>Add To Your Comment</h2>
                </div>
                <div onClick={() => postImageRef.current.click()}>
                    <FaImage className={classes.uploadPhotoIcon} />
                    <span className={classes.uploadPhotoIconTitle}>Photo</span>
                </div>
                <div className="d-none">
                    <Form.Control
                        type="file"
                        name="commentImage"
                        ref={postImageRef}
                        onChange={handleImageChange}
                    />
                </div>
            </div>
            <Button
                className={`${classes.postCreatedButton} btn`}
                variant="primary"
                type="submit"
                disabled={loading}
            >
                {user && user?.uid
                    ? loading
                        ? "Loading"
                        : "Add Comment"
                    : "Please Login to Add a Comment"}
            </Button>
        </Form>
    );
};

export default CreateComment;
