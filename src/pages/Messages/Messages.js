import React from 'react';
import Message from '../../components/shared/Message/Message';
import MessageLayout from './../../Layout/MessageLayout/MessageLayout';

const Messages = () => {
    return (
        <MessageLayout>
            <Message/>
            <Message/>
            <Message/>
        </MessageLayout>
    );
};

export default Messages;