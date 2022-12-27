import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home/Home';
import PostDetails from "./pages/Home/Posts/PostDetails/PostDetails";
import Login from "./pages/Login/Login";
import Media from "./pages/Media/Media";
import Messages from "./pages/Messages/Messages";
import Registration from "./pages/Registration/Registration";



function App() {
    return (
        <>
            <Toaster />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/media" element={<Media />} />
                <Route path="/posts/:postId" element={<PostDetails />} />
                <Route path="/message" element={<Messages />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />
            </Routes>
        </>
    );
}

export default App;
