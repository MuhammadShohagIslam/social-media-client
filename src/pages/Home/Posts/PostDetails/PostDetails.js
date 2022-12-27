import MediaLayout from "./../../../../Layout/MediaLayout/MediaLayout";
import React, { useRef, useState } from "react";
import { Button, Form, Card, Image } from "react-bootstrap";
import { FaImage, FaCommentAlt } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { IoIosShareAlt } from "react-icons/io";
import classes from "./PostDetails.module.css";
import CreateComment from "../../../../components/shared/CreateComment/CreateComment";
import Comment from "../../../../components/shared/Comment/Comment";

const PostDetails = () => {
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
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content
                    </Card.Text>
                </Card.Body>
                <div className={classes.cardImageWrapper}>
                    <Card.Img variant="bottom" src="holder.js/100px180" />
                </div>
                <Card.Footer className={classes.cardFooterWrapper}>
                    <div className={classes.cardFooterTopWrapper}>
                        <div className={classes.cardFooterIconWrapper}>
                            <AiFillLike
                                className={classes.cardFooterLikedIcon}
                            />
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
               
                <div className="mt-3">
                    <h4 className="text-center mb-4">Comment To Post Here!</h4>
                    <CreateComment />
                </div>
                <hr/>
                <div>
                    <h4 className="ms-4 mt-3">List Of The Comments</h4>
                    <div>
                        <Comment />
                        <Comment />
                        <Comment />
                    </div>
                </div>
            </Card>
        </MediaLayout>
    );
};

export default PostDetails;
