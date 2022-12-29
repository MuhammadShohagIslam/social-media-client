import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import Home from "./pages/Home/Home";
import PostDetails from "./pages/Home/Posts/PostDetails/PostDetails";
import Login from "./pages/Login/Login";
import Media from "./pages/Media/Media";
import Messages from "./pages/Messages/Messages";
import Registration from "./pages/Registration/Registration";
import Profile from "./pages/Profile/ProfileInfo/Profile";
import TermCondition from "./pages/TermCondition/TermCondition";
import NotFound from "./pages/NotFound/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import PrivateRouter from "./routers/PrivateRouter/PrivateRouter";
import Posts from "./pages/Profile/Posts/Posts";
import Group from "./pages/Profile/Group/Group";
import MostRecent from "./pages/Profile/MostRecent/MostRecent";
import Preloader from "./components/UI/Preloader/Preloader";

function App() {
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        const timeOut = setTimeout(() => setLoader(false), 1000);
        return () => clearTimeout(timeOut);
    }, []);

    return (
        <>
            {loader ? (
                <Preloader />
            ) : (
                <>
                    <Toaster />
                    <ScrollToTop smooth color="#6f00ff" />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/media" element={<Media />} />
                        <Route
                            path="/posts/:postId"
                            element={<PostDetails />}
                        />
                        <Route path="/message" element={<Messages />} />
                        <Route
                            path="/profile"
                            element={
                                <PrivateRouter>
                                    <Profile />
                                </PrivateRouter>
                            }
                        />
                        <Route
                            path="/profile-posts"
                            element={
                                <PrivateRouter>
                                    <Posts />
                                </PrivateRouter>
                            }
                        />
                        <Route
                            path="/group"
                            element={
                                <PrivateRouter>
                                    <Group />
                                </PrivateRouter>
                            }
                        />
                        <Route
                            path="/recent-post"
                            element={
                                <PrivateRouter>
                                    <MostRecent />
                                </PrivateRouter>
                            }
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Registration />} />
                        <Route
                            path="/term-condition"
                            element={<TermCondition />}
                        />
                        <Route
                            path="/privacy-policy"
                            element={<PrivacyPolicy />}
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </>
            )}
        </>
    );
}

export default App;
