import React from "react";
import { Image } from "react-bootstrap";
import { FaUserFriends,FaBusinessTime } from "react-icons/fa";
import { ImFileVideo } from "react-icons/im";
import { HiOutlineUserGroup } from "react-icons/hi";
import { GiTimeSynchronization } from "react-icons/gi";
import classes from "./MediaLeftSideBar.module.css";

const MediaLeftSideBar = () => {
    return (
        <ul className={`${classes.leftSideListWrapper} pt-4`}>
            <li className={classes.leftSideListItemWrapper}>
                <Image
                    className={classes.leftSideProfileImg}
                    roundedCircle
                    src="holder.js/100px180"
                />
                <h6 className={`${classes.leftSideListItemTitle}`}>
                    Muhammad Shohag Islam
                </h6>
            </li>
            <li className={classes.leftSideListItemWrapper}>
                <FaUserFriends
                    className={classes.leftSideProfileIcon}
                />
                <h6 className={`${classes.leftSideListItemTitle}`}>
                    Find Connector
                </h6>
            </li>
            <li className={classes.leftSideListItemWrapper}>
                <HiOutlineUserGroup
                    className={classes.leftSideProfileIcon}
                />
                <h6 className={`${classes.leftSideListItemTitle}`}>Groups</h6>
            </li>
            <li className={classes.leftSideListItemWrapper}>
                <GiTimeSynchronization
                    className={classes.leftSideProfileIcon}
                />
                <h6 className={`${classes.leftSideListItemTitle}`}>Most Recent</h6>
            </li>
            <li className={classes.leftSideListItemWrapper}>
                <FaBusinessTime
                    className={classes.leftSideProfileIcon}
                />
                <h6 className={`${classes.leftSideListItemTitle}`}>MarketPlace</h6>
            </li>
            <li className={classes.leftSideListItemWrapper}>
                <ImFileVideo
                    className={classes.leftSideProfileIcon}
                />
                <h6 className={`${classes.leftSideListItemTitle}`}>Watch</h6>
            </li>
        </ul>
    );
};

export default MediaLeftSideBar;
