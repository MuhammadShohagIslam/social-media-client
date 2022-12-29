import React from "react";
import { Container } from "react-bootstrap";
import Message from "../../components/shared/Message/Message";
import MessageLayout from "./../../Layout/MessageLayout/MessageLayout";
import { Helmet } from 'react-helmet-async';

const Messages = () => {
    return (
        <MessageLayout>
            <Helmet>
                <title>Message</title>
            </Helmet>
            <Container>
                <Message />
                <Message />
                <Message />
            </Container>
        </MessageLayout>
    );
};

export default Messages;
