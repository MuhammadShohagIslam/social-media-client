import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import classes from "./CreatePost.module.css";
import { FaImage } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
const CreatePost = ({ setPostContent, handlePostSubmit }) => {
    const postImageRef = useRef();
    const [postImages, setPostImages] = useState(null);

    const handleImageChange = (e) => {
        if(e.target.files && e.target.files[0]){
            const image = e.target.files[0]
            setPostImages({
                postImage: URL.createObjectURL(image) 
            })
        }
    }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                    as="textarea"
                    name="postContent"
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder="Leave a post content here"
                    style={{ height: "100px" }}
                />
            </Form.Group>
            {postImages && (
                <div className={classes.previewPostImage}>
                    <AiOutlineClose onClick={() => setPostImages(null)} />
                    <img src={postImages.postImage} alt="" />
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
                className={`${classes.modalReviewButton} btn`}
                variant="primary"
                type="submit"
                onClick={(e) => handlePostSubmit(e)}
            >
                Submit
            </Button>
        </Form>
    );
};

export default CreatePost;
