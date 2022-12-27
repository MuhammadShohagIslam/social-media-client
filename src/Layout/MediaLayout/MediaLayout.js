import React from "react";
import Footer from "../../components/shared/Footer/Footer";
import MediaLeftSideBar from "../../components/shared/MediaLeftSideBar/MediaLeftSideBar";
import MediaRightSideBar from '../../components/shared/MediaRightSideBar/MediaRightSideBar';
import MediaNavBar from "../../components/shared/NavBar/MediaNavBar/MediaNavBar";
import classes from "./MediaLayout.module.css";

const MediaLayout = ({ children }) => {
    return (
        <>
            <header>
                <MediaNavBar />
            </header>
            <main className={classes.mainLayout}>
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

export default MediaLayout;
