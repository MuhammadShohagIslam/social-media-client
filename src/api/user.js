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

// get single user
export const getUser = async (email, name) => {
    return await axios.get(
        `${process.env.REACT_APP_server_api}/users?email=${email}&name=${name}`
    );
};

// create-or-update-user
export const createOrUpdateUser = async (userData) => {
    return await axios.patch(
        `${process.env.REACT_APP_server_api}/create-or-update-user`,
        userData
    );
};
