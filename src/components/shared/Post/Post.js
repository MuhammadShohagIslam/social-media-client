import React from "react";
import { Card, Container, Image } from "react-bootstrap";
import classes from "./Post.module.css";
import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import { Link } from "react-router-dom";

const Post = () => {
    return (
        <Container>
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
                        make up the bulk of the card's content.{" "}
                        <Link
                            className={classes.cardContentDetails}
                            to={`/posts/1`}
                        >
                            Details
                        </Link>
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
                        <div className={classes.cardFooterBottomIconWrapper}>
                            <AiFillLike
                                className={classes.cardFooterBottomLikedIcon}
                            />
                            Like
                        </div>
                        <div className={classes.cardFooterBottomIconWrapper}>
                            <FaCommentAlt
                                className={classes.cardFooterBottomCommentIcon}
                            />
                            Comment
                        </div>
                        <div className={classes.cardFooterBottomIconWrapper}>
                            <IoIosShareAlt
                                className={classes.cardFooterBottomSharedIcon}
                            />
                            Share
                        </div>
                    </div>
                </Card.Footer>
            </Card>
        </Container>
    );
};

export default Post;
