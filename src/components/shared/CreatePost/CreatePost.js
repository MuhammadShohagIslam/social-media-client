import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import classes from "./CreatePost.module.css";
import { FaImage } from "react-icons/fa";

const CreatePost = ({ handlePostSubmit, loading, user }) => {
    const [postImages, setPostImages] = useState(null);
    const postImageRef = useRef();

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0];
            setPostImages({
                postImage: URL.createObjectURL(image),
            });
        }
    };

    return (
        <Form onSubmit={handlePostSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                    as="textarea"
                    name="postContent"
                    placeholder="Leave a post content here"
                    style={{ height: "100px" }}
                />
            </Form.Group>
            {postImages && (
                <div className={classes.previewPostImageWrapper}>
                    <span
                        className={classes.previewPostCrossIcon}
                        onClick={() => setPostImages(null)}
                    >
                        X
                    </span>
                    <img
                        className={classes.previewPostImage}
                        src={postImages.postImage}
                        alt=""
                    />
                </div>
            )}
            <div className={classes.uploadPhotoWrapper}>
                <div>
                    <h2 className={classes.uploadTitle}>Add To Your Post</h2>
                </div>
                <div onClick={() => postImageRef.current.click()}>
                    <FaImage className={classes.uploadPhotoIcon} />
                    <span className={classes.uploadPhotoIconTitle}>Photo</span>
                </div>
                <div className="d-none">
                    <Form.Control
                        type="file"
                        name="postImage"
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
                        : "Submit"
                    : "Please Login to Add a Post"}
            </Button>
        </Form>
    );
};

export default CreatePost;
