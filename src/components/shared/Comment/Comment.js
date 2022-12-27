import React from "react";
import { Card, Image } from "react-bootstrap";
import classes from "./Comment.module.css";

const Comment = ({ comment }) => {
    const { name, message, img, commentAt } = comment;
    return (
        <Card className="mb-3">
            <Card.Body>
                <div className={classes.commentCardWrapper}>
                    <Image
                        roundedCircle
                        className={classes.commentImg}
                        src={img ? img : ""}
                        alt={name}
                    />
                </div>
                <div>
                    <div>
                        <Card.Title className="pt-2">{name}Name</Card.Title>
                        <Card.Text className="pb-2">{message}SDFSFSFSFSFSFS</Card.Text>
                    </div>
                    <div>
                        <div>
                            Like
                        </div>
                        <div>
                            Replay
                        </div>
                        <div>
                            <Card.Subtitle className="mb-2 text-muted">
                                {new Date(commentAt)
                                    .toString()
                                    .substring(4, 16)}
                            </Card.Subtitle>
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Comment;
