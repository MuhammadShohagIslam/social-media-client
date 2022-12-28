import React from "react";
import moment from "moment";
import { Card, Container, Image } from "react-bootstrap";
import classes from "./Post.module.css";
import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt, FaUserAlt } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
    const { _id, content, image, postedAt, postedName, postedUserImage } = post;
    return (
        <Container>
            <Card className={classes.cardWrapper}>
                <Card.Header className={classes.cardHeaderWrapper}>
                    <div>
                        {postedUserImage ? (
                            <Image
                                className={classes.cardHeaderImg}
                                roundedCircle
                                src={postedUserImage}
                            />
                        ) : (
                            <span className={classes.cardHeaderImg}>
                                <FaUserAlt className="text-black fs-5" />
                            </span>
                        )}
                    </div>
                    <div>
                        <h2 className={classes.cardHeaderName}>{postedName}</h2>
                        <p className={classes.cardHeaderPostCreatedAt}>
                            {moment(postedAt).startOf("hour").fromNow()}
                        </p>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Text className={classes.cardContent}>
                        {content.length > 100
                            ? `${content.slice(0, 100)} ...`
                            : content}
                        <Link
                            className={classes.cardContentDetails}
                            to={`/posts/${_id}`}
                        >
                            details
                        </Link>
                    </Card.Text>
                </Card.Body>
                <div className={classes.cardImageWrapper}>
                    <Card.Img variant="bottom" src={image && image} />
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
