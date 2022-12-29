import React from "react";
import ProfileLayout from './../../../Layout/ProfileLayout/ProfileLayout';
import ComingSoon from './../../../components/UI/ComingSoon/ComingSoon';
import { Helmet } from 'react-helmet-async';

const MostRecent = () => {
    return (
        <ProfileLayout>
            <Helmet>
                <title>Most-Recent</title>
            </Helmet>
            <ComingSoon/>
        </ProfileLayout>
    );
};

export default MostRecent;
