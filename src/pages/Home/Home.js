import React, { useEffect } from 'react';
import Jumbotron from '../../components/shared/Jumbotron/Jumbotron.js';
import Main from '../../Layout/Main/Main.js';
import Posts from './Posts/Posts.js';

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    return (
        <Main>
            <Jumbotron/>
            <Posts/>
        </Main>
    );
};

export default Home;