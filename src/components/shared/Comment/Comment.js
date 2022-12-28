import React from "react";
import { Card, Image } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import classes from "./Comment.module.css";
import moment from "moment";

const Comment = ({ comment }) => {
    const {
        commentedName,
        commentedUserImage,
        comment: message,
        commentImg,
        commentedAt,
    } = comment;
    return (
        <Card className={`${classes.commentCardWrapper}`}>
            <Card.Body className={classes.commentCardBodyWrapper}>
                <div>
                    {commentedUserImage ? (
                        <Image
                            className={classes.commentImg}
                            roundedCircle
                            src={commentedUserImage}
                        />
                    ) : (
                        <span className={classes.commentImg}>
                            <FaUserAlt className="text-black fs-5" />
                        </span>
                    )}
                </div>
                <div className="ms-4">
                    <div className={classes.commentCardBodyProfileInfoWrapper}>
                        <Card.Title className="h6">{commentedName}</Card.Title>
                        {commentImg && (
                            <Image
                                className={classes.commentContentImg}
                                thumbnail
                                src={commentImg}
                            />
                        )}
                        <p className="pb-2 mb-0">{message}</p>
                    </div>
                    <div className={classes.commentCardBodyBottomWrapper}>
                        <div className="me-2">Like</div>
                        <div className="me-2">Replay</div>
                        <div>{moment(commentedAt).fromNow()}</div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Comment;
