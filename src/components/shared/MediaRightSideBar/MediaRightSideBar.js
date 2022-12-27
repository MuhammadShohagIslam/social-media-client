import React from 'react';
import { FaUserFriends } from "react-icons/fa";
import { GoDiffAdded } from "react-icons/go";

import classes from "./MediaRightSideBar.module.css";

const MediaRightSideBar = () => {
    return (
        <ul className={classes.rightSideListWrapper}>
        <li className={classes.rightSideListItemWrapper}>
            <FaUserFriends
                className={classes.rightSideProfileIcon}
            />
            <h6 className={`${classes.rightSideListItemTitle}`}>
                Waiting Connector
            </h6>
        </li>
        <hr/>
        <h5 className={classes.rightSideTitle}>Group Conversation</h5>
        <li className={classes.rightSideListItemWrapper}>
            <GoDiffAdded
                className={classes.rightSideProfileIcon}
            />
            <h6 className={`${classes.rightSideListItemTitle}`}>
                Create New Group
            </h6>
        </li>
    </ul>
    );
};

export default MediaRightSideBar;