import React,{useState} from 'react';
import NavBar from '../../components/shared/NavBar/NavBar';
import { AiOutlineBars } from "react-icons/ai";
import classes from "./ProfileLayout.module.css";
import Footer from './../../components/shared/Footer/Footer';
import ProfileLeftSideBar from '../../components/shared/ProfileLeftSideBar/ProfileLeftSideBar';

const ProfileLayout = ({children}) => {
    const [openLeftSideBar, setOpenLeftSideBar] = useState(false);
   
    const handleOpenMenu = () => {
        setOpenLeftSideBar(!openLeftSideBar);
    };

    return (
        <>
            <header>
                <NavBar />
                <section className="d-block d-md-block d-lg-none">
                    <div className={classes.bottomSideBarShowWrapper}>
                        <span
                            className={classes.previewPostCrossIcon}
                            onClick={handleOpenMenu}
                        >
                            {openLeftSideBar ? "X" : <AiOutlineBars />}
                        </span>
                    </div>
                    {openLeftSideBar && <ProfileLeftSideBar />}
                </section>
            </header>
            <main className={classes.profileLayout}>
                <div className="d-none d-md-none d-lg-block" style={{"height":"100%"}}>
                    <ProfileLeftSideBar />
                </div>
                <div className="pt-4">{children}</div>
            </main>
            <Footer />
        </>
    );
};

export default ProfileLayout;