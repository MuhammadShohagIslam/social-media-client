import React from "react";
import ProfileLayout from "./../../../Layout/ProfileLayout/ProfileLayout";
import ComingSoon from "./../../../components/UI/ComingSoon/ComingSoon";
import { Helmet } from 'react-helmet-async';

const Posts = () => {
    return (
        <ProfileLayout>
            <Helmet>
                <title>Posts</title>
            </Helmet>
            <ComingSoon />
        </ProfileLayout>
    );
};

export default Posts;
