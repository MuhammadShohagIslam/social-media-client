import React from "react";
import { Image } from "react-bootstrap";
import { FaUserFriends, FaBusinessTime, FaUserAlt } from "react-icons/fa";
import { ImFileVideo } from "react-icons/im";
import { HiOutlineUserGroup } from "react-icons/hi";
import { GiTimeSynchronization } from "react-icons/gi";
import { Link } from "react-router-dom";
import classes from "./MediaLeftSideBar.module.css";
import { useAuth } from "../../../contexts/AuthProvider/AuthProvider";

const MediaLeftSideBar = () => {
    const { user } = useAuth();
    return (
        <ul className={`${classes.leftSideListWrapper} pt-4`}>
            <li className={classes.leftSideListItemWrapper}>
                {user && user?.uid ? (
                    <>
                        {user?.photoURL ? (
                            <Image
                                className={classes.leftSideProfileImg}
                                roundedCircle
                                src={`${user?.photoURL}`}
                            />
                        ) : (
                            <FaUserAlt className={classes.leftSideProfileIcon} />
                        )}
                        <h6 className={`${classes.leftSideListItemTitle}`}>
                            {user?.displayName ? user?.displayName : "No Name"}
                        </h6>
                    </>
                ) : (
                    <>
                        <FaUserAlt className={classes.leftSideProfileIcon} />

                        <h6 className={`${classes.leftSideListItemTitle}`}>
                            <Link to="/login" className="text-black">
                                Login To See Name
                            </Link>
                        </h6>
                    </>
                )}
            </li>
            <li className={classes.leftSideListItemWrapper}>
                <FaUserFriends className={classes.leftSideProfileIcon} />
                <h6 className={`${classes.leftSideListItemTitle}`}>
                    Find Connector
                </h6>
            </li>
            <li className={classes.leftSideListItemWrapper}>
                <HiOutlineUserGroup className={classes.leftSideProfileIcon} />
                <h6 className={`${classes.leftSideListItemTitle}`}>Groups</h6>
            </li>
            <li className={classes.leftSideListItemWrapper}>
                <GiTimeSynchronization
                    className={classes.leftSideProfileIcon}
                />
                <h6 className={`${classes.leftSideListItemTitle}`}>
                    Most Recent
                </h6>
            </li>
            <li className={classes.leftSideListItemWrapper}>
                <FaBusinessTime className={classes.leftSideProfileIcon} />
                <h6 className={`${classes.leftSideListItemTitle}`}>
                    MarketPlace
                </h6>
            </li>
            <li className={classes.leftSideListItemWrapper}>
                <ImFileVideo className={classes.leftSideProfileIcon} />
                <h6 className={`${classes.leftSideListItemTitle}`}>Watch</h6>
            </li>
        </ul>
    );
};

export default MediaLeftSideBar;
