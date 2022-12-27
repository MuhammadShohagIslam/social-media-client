import React from "react";
import { Container } from "react-bootstrap";
import Message from "../../components/shared/Message/Message";
import MessageLayout from "./../../Layout/MessageLayout/MessageLayout";

const Messages = () => {
    return (
        <MessageLayout>
            <Container>
                <Message />
                <Message />
                <Message />
            </Container>
        </MessageLayout>
    );
};

export default Messages;
