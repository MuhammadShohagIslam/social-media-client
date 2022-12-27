import React from "react";
import { Card, Image } from "react-bootstrap";
import classes from "./Comment.module.css";

const Comment = ({ comment }) => {
    // const { name, message, img, commentAt } = comment;
    return (
        <Card className={`${classes.commentCardWrapper}`}>
            <Card.Body className={classes.commentCardBodyWrapper}>
                <div>
                    <Image
                        roundedCircle
                        src="holder.js/100px180"
                        className={classes.commentImg}
                    />
                </div>
                <div className="ms-4">
                    <div className={classes.commentCardBodyProfileInfoWrapper}>
                        <Card.Title className="h6">Name</Card.Title>
                        <p className="pb-2 mb-0">SDFSFSFSFSFSFS</p>
                    </div>
                    <div className={classes.commentCardBodyBottomWrapper}>
                        <div className="me-2">Like</div>
                        <div className="me-2">Replay</div>
                        <div>{new Date().toString().substring(4, 16)}</div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Comment;
