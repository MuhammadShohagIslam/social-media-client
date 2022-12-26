import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home/Home';
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";



function App() {
    return (
        <>
            <Toaster />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />
            </Routes>
        </>
    );
}

export default App;
