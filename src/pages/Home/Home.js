import React, { useEffect } from "react";
import Jumbotron from "../../components/shared/Jumbotron/Jumbotron.js";
import Main from "../../Layout/Main/Main.js";
import Posts from "./Posts/Posts.js";
import { Helmet } from "react-helmet-async";

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Main>
            <Helmet>
                <title>Home-ShohagCSM</title>
            </Helmet>
            <Jumbotron />
            <Posts />
        </Main>
    );
};

export default Home;
