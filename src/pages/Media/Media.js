import React, { useEffect } from "react";
import MediaLayout from "../../Layout/MediaLayout/MediaLayout";
import Post from "./../../components/shared/Post/Post";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../api/posts";
import { Spinner } from "react-bootstrap";
import { getAllLikePosts } from "../../api/likePosts";
import { getAllComments } from "../../api/comments";

const Media = () => {
    const { status, data, error } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const data = await getAllPosts();
            return data.data;
        },
    });

    const {
        status: allLikedPostsStatus,
        data: allLikedPosts = [],
        error: allLikedPostsError,
        refetch,
    } = useQuery({
        queryKey: ["likedPosts"],
        queryFn: async () => {
            const data = await getAllLikePosts();
            return data.data;
        },
    });

    const {
        status: allCommentsStatus,
        data: allComments = [],
        error: allCommentsError,
    } = useQuery({
        queryKey: ["comments"],
        queryFn: async () => {
            const data = await getAllComments();
            return data.data;
        },
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (
        status === "error" ||
        allLikedPostsError === "error" ||
        allCommentsError === "error"
    ) {
        return <span>Error: {error.message}</span>;
    }
    return (
        <MediaLayout>
            {status === "loading" ||
            allLikedPostsStatus === "loading" ||
            allCommentsStatus === "loading" ? (
                <div
                    style={{ height: "350px" }}
                    className="d-flex justify-content-center align-items-center"
                >
                    <Spinner animation="border" className="spinner-color" />
                </div>
            ) : (
                <>
                    {data.length > 0 ? (
                        <>
                            {data.map((post) => (
                                <Post
                                    key={post._id}
                                    post={post}
                                    allLikedPosts={allLikedPosts}
                                    refetch={refetch}
                                    allComments={allComments}
                                />
                            ))}
                        </>
                    ) : (
                        <h3 className="text-center text-dark mb-5">
                            There is no post
                        </h3>
                    )}
                </>
            )}
        </MediaLayout>
    );
};

export default Media;
