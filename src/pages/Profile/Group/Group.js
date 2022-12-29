import React from "react";
import ComingSoon from "../../../components/UI/ComingSoon/ComingSoon";
import ProfileLayout from "./../../../Layout/ProfileLayout/ProfileLayout";
import { Helmet } from "react-helmet-async";

const Group = () => {
    return (
        <ProfileLayout>
            <Helmet>
                <title>Group</title>
            </Helmet>
            <ComingSoon />
        </ProfileLayout>
    );
};

export default Group;
