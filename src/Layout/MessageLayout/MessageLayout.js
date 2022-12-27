import React from "react";
import Footer from "../../components/shared/Footer/Footer";
import MediaLeftSideBar from "../../components/shared/MediaLeftSideBar/MediaLeftSideBar";
import MediaRightSideBar from '../../components/shared/MediaRightSideBar/MediaRightSideBar';
import MediaNavBar from "../../components/shared/NavBar/MediaNavBar/MediaNavBar";
import classes from "./MessageLayout.module.css";

const MessageLayout = ({ children }) => {
    return (
        <>
            <header>
                <MediaNavBar />
            </header>
            <main className={classes.mainMessageLayout}>
                <div>
                    <MediaLeftSideBar/>
                </div>
                <div>{children}</div>
                <div>
                    <MediaRightSideBar/>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default MessageLayout;
