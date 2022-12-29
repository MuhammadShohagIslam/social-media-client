import React from "react";
import { Nav, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Figure } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { ImBlogger } from "react-icons/im";
import { HiOutlineUserGroup } from "react-icons/hi";
import { GiTimeSynchronization } from "react-icons/gi";
import classes from "./ProfileLeftSideBar.module.css";
import { useAuth } from "./../../../contexts/AuthProvider/AuthProvider";

const ProfileLeftSideBar = () => {
    const { user } = useAuth();
    return (
        <ul className={`${classes.leftSideListWrapper} pt-4`}>
            <li className={classes.leftSideTopListItemWrapper}>
                {user?.photoURL ? (
                    <Image
                        width={100}
                        height={100}
                        className={classes.commentImg}
                        roundedCircle
                        src={`${user?.photoURL}`}
                    />
                ) : (
                    <FaUserAlt className="text-white fs-1" />
                )}

                <h5 className="text-center text-white mt-2">
                    Muhammad Jhohirul Islam
                </h5>
            </li>
            <li className="mb-3">
                <LinkContainer
                    className={classes.leftSideListItemWrapper}
                    to="/profile"
                >
                    <Nav.Link className={classes.navLink}>
                        <CgProfile className={classes.leftSideProfileIcon} />
                        Profile
                    </Nav.Link>
                </LinkContainer>
            </li>
            <li className="mb-3">
                <LinkContainer
                    className={classes.leftSideListItemWrapper}
                    to="/userPost"
                >
                    <Nav.Link className={classes.navLink}>
                        <ImBlogger className={classes.leftSideProfileIcon} />
                        Posts
                    </Nav.Link>
                </LinkContainer>
            </li>
            <li className="mb-3">
                <LinkContainer
                    className={classes.leftSideListItemWrapper}
                    to="/userGroup"
                >
                    <Nav.Link className={classes.navLink}>
                        <HiOutlineUserGroup
                            className={classes.leftSideProfileIcon}
                        />
                        Groups
                    </Nav.Link>
                </LinkContainer>
            </li>
            <li className="mb-3">
                <LinkContainer
                    className={classes.leftSideListItemWrapper}
                    to="/userRecentActivities"
                >
                    <Nav.Link className={classes.navLink}>
                        <GiTimeSynchronization
                            className={classes.leftSideProfileIcon}
                        />
                        Most Recent
                    </Nav.Link>
                </LinkContainer>
            </li>
        </ul>
    );
};

export default ProfileLeftSideBar;
