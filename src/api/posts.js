import axios from "axios";

// create new post
export const createNewPost = async (postData) => {
    return await axios.post(
        `${process.env.REACT_APP_server_api}/posts`,
        postData
    );
};

// get all posts
export const getAllPosts = async () => {
    return await axios.get(`${process.env.REACT_APP_server_api}/posts`);
};

// get post by postId
export const getPostByPostId = async (postId) => {
    return await axios.get(
        `${process.env.REACT_APP_server_api}/posts/${postId}`
    );
};
