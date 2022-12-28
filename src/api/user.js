import axios from "axios";

// create jwt token
export const createJwtToken = async (userData) => {
    return await axios.post(
        `${process.env.REACT_APP_server_api}/jwt`,
        userData
    );
};

// create new user
export const createNewUser = async (userData) => {
    return await axios.post(
        `${process.env.REACT_APP_server_api}/users`,
        userData
    );
};

