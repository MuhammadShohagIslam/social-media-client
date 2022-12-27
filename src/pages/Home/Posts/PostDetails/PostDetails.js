import MediaLayout from './../../../../Layout/MediaLayout/MediaLayout';
import React, { useRef, useState } from "react";
import { Button, Form, Card, Image } from "react-bootstrap";
import { FaImage,FaCommentAlt } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { IoIosShareAlt } from "react-icons/io";
import classes from "./PostDetails.module.css";

const PostDetails = () => {
    const postImageRef = useRef();
    const [postImages, setPostImages] = useState(null);
    const [postContent, setPostContent] = useState(null);

    const handleImageChange = (e) => {
        if(e.target.files && e.target.files[0]){
            const image = e.target.files[0]
            setPostImages({
                postImage: URL.createObjectURL(image) 
            })
        }
    }
    const handlePostSubmit = (e) => {
        if(e.target.files && e.target.files[0]){
            const image = e.target.files[0]
            setPostImages({
                postImage: URL.createObjectURL(image) 
            })
        }
    }

   
    return (
        <MediaLayout>
            <Card className={classes.cardWrapper}>
            <Card.Header className={classes.cardHeaderWrapper}>
                <div>
                    <Image
                        className={classes.cardHeaderImg}
                        roundedCircle
                        src="holder.js/100px180"
                    />
                </div>
                <div>
                    <h2 className={classes.cardHeaderName}>
                        Muhammad Shohag Islam
                    </h2>
                    <p className={classes.cardHeaderPostCreatedAt}>
                        2 days ago
                    </p>
                </div>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content
                </Card.Text>
            </Card.Body>
            <div className={classes.cardImageWrapper}>
                <Card.Img variant="bottom" src="holder.js/100px180" />
            </div>
            <Card.Footer className={classes.cardFooterWrapper}>
                <div className={classes.cardFooterTopWrapper}>
                    <div className={classes.cardFooterIconWrapper}>
                        <AiFillLike className={classes.cardFooterLikedIcon} />
                        You and 1k Others
                    </div>
                    <div className={classes.cardFooterCounterCommentShared}>
                        <p className={classes.cardFooterCounterComment}>
                            2 comments
                        </p>
                        <p className={classes.cardFooterCounterShared}>
                            2 shared
                        </p>
                    </div>
                </div>
                <div className={classes.cardFooterBottomWrapper}>
                    <div className={classes.cardFooterIconWrapper}>
                        <AiFillLike
                            className={classes.cardFooterBottomLikedIcon}
                        />
                        Like
                    </div>
                    <div className={classes.cardFooterIconWrapper}>
                        <IoIosShareAlt
                            className={classes.cardFooterBottomSharedIcon}
                        />
                        Share
                    </div>
                </div>
            </Card.Footer>

            <div>
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
                <div className={classes.previewPostImageWrapper}>
                    <span className={classes.previewPostCrossIcon} onClick={() => setPostImages(null)} >X</span>
                    <img className={classes.previewPostImage} src={postImages.postImage} alt="" />
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
                onClick={(e) => handlePostSubmit(e)}
            >
                Submit
            </Button>
        </Form>
            </div>
        </Card>
        </MediaLayout>
    );
};

export default PostDetails;