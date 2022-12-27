import React from "react";
import { Card, Image } from "react-bootstrap";
import classes from "./Message.module.css";


const Message = () => {
    return (
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
        </Card>
    );
};

export default Message;
