import axios from "axios";

// create new comment
export const createNewComment = async (commentData) => {
    return await axios.post(
        `${process.env.REACT_APP_server_api}/comments`,
        commentData
    );
};

// get all comments
export const getAllComments = async () => {
    return await axios.get(`${process.env.REACT_APP_server_api}/comments`);
};

