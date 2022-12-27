import React, { useState } from "react";
import Footer from "../../components/shared/Footer/Footer";
import MediaLeftSideBar from "../../components/shared/MediaLeftSideBar/MediaLeftSideBar";
import MediaRightSideBar from "../../components/shared/MediaRightSideBar/MediaRightSideBar";
import MediaNavBar from "../../components/shared/NavBar/MediaNavBar/MediaNavBar";
import { AiOutlineBars } from "react-icons/ai";
import classes from "./MediaLayout.module.css";

const MediaLayout = ({ children }) => {
    const [openLeftSideBar, setOpenLeftSideBar] = useState(false);
    console.log(openLeftSideBar);
    const handleOpenMenu = () => {
        setOpenLeftSideBar((prev) => {
            setOpenLeftSideBar(!prev);
        });
    };
    return (
        <>
            <header>
                <MediaNavBar />
                <section className="d-block d-md-block d-lg-none">
                    <div className={classes.bottomSideBarShowWrapper}>
                        <span
                            className={classes.previewPostCrossIcon}
                            onClick={handleOpenMenu}
                        >
                            {openLeftSideBar ? "X" : <AiOutlineBars />}
                        </span>
                    </div>
                    {openLeftSideBar && <MediaLeftSideBar />}
                    {openLeftSideBar && <MediaRightSideBar />}
                </section>
            </header>
            <main className={classes.mainLayout}>
                <div className="d-none d-md-none d-lg-block">
                    <MediaLeftSideBar />
                </div>
                <div>{children}</div>
                <div className="d-none d-md-none d-lg-block">
                    <MediaRightSideBar />
                </div>
            </main>
            <Footer />
        </>
    );
};

export default MediaLayout;
