import axios from "axios";

// like the post
export const likeThePost = async (likedPostData) => {
    return await axios.post(
        `${process.env.REACT_APP_server_api}/likes`,
        likedPostData
    );
};

// get all likedPosts
export const getAllLikePosts = async () => {
    return await axios.get(`${process.env.REACT_APP_server_api}/likes`);
};

// delete likedPost by query
export const removedLikedPost = async (likedUserEmail, postId) => {
    return await axios.delete(
        `${process.env.REACT_APP_server_api}/likes?likedUserEmail=${likedUserEmail}&postId=${postId}`
    );
};
