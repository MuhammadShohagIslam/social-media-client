import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import CreatePost from "../../../components/shared/CreatePost/CreatePost";
import SectionTitle from "../../../components/shared/SectionTitle/SectionTitle";
import Post from "./../../../components/shared/Post/Post";
import classes from "./Posts.module.css";
import { getTopThreePosts } from "../../../api/posts";
import { toast } from "react-hot-toast";
import axios from "axios";
import { createNewPost } from "./../../../api/posts";
import { useAuth } from "./../../../contexts/AuthProvider/AuthProvider";
import { getAllLikePosts } from "../../../api/likePosts";
import { getAllComments } from "../../../api/comments";

const Posts = () => {
    const [loading, setLoading] = useState(false);

    const { user } = useAuth();
    const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgdb_key}`;
    const navigate = useNavigate();
    const location = useLocation();

    const {
        status,
        data = [],
        error,
        refetch: refetchPost,
    } = useQuery({
        queryKey: ["topThreePost"],
        queryFn: async () => {
            const data = await getTopThreePosts();
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

    const handlePostSubmit = (event, setPostImages) => {
        event.preventDefault();

        const form = event.target;
        const postContent = form.postContent.value;
        const postImage = form.postImage.files[0];

        if (!user && !user?.uid) {
            return navigate("/login", {
                state: { from: location },
                replace: true,
            });
        }
        // validation
        if (!postContent) {
            return toast.error("Please Write Some Content of Post!");
        }

        if (postImage) {
            const formData = new FormData();
            formData.append("image", postImage);
            setLoading(true);

            axios
                .post(url, formData)
                .then((imgData) => {
                    const productImgUrl = imgData.data.data.url;
                    const postObjectData = {
                        postedName: user?.displayName,
                        postedEmail: user?.email,
                        postedUserImage: user?.photoURL,
                        content: postContent,
                        image: productImgUrl,
                    };

                    createNewPost(postObjectData)
                        .then((data) => {
                            if (data.data.acknowledged) {
                                toast.success("Post is Created!");
                                form.reset();
                                setPostImages(null);
                                setLoading(false);
                                navigate("/media");
                            }
                        })
                        .catch((error) => {
                            setLoading(false);
                            console.log(error);
                        });
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        } else {
            const postObjectData = {
                postedName: user?.displayName,
                postedEmail: user?.email,
                postedUserImage: user?.photoURL,
                content: postContent,
                image: null,
            };
            setLoading(true);
            createNewPost(postObjectData)
                .then((data) => {
                    if (data.data.acknowledged) {
                        toast.success("Post is Created!");
                        form.reset();
                        setPostImages(null);
                        setLoading(false);
                        navigate("/media");
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    console.log(error);
                });
        }
    };

    if (
        status === "error" ||
        allLikedPostsError === "error" ||
        allCommentsError === "error"
    ) {
        return <span>Error: {error.message}</span>;
    }

    return (
        <>
            <section className={classes.postWrapper}>
                <Container>
                    <SectionTitle
                        title="Create New Post"
                        info="Shared Your Idea/Knowledged With Post"
                    />
                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                            <CreatePost
                                handlePostSubmit={handlePostSubmit}
                                loading={loading}
                                user={user}
                            />
                        </Col>
                    </Row>
                </Container>
            </section>
            <section>
                <Container>
                    <SectionTitle
                        title="Popular Post"
                        info="Trending Post Which are People Liked"
                    />
                    <Row>
                        {status === "loading" ||
                        allLikedPostsStatus === "loading" ||
                        allCommentsStatus === "loading" ? (
                            <div
                                style={{ height: "350px" }}
                                className="d-flex justify-content-center align-items-center"
                            >
                                <Spinner
                                    animation="border"
                                    className="spinner-color"
                                />
                            </div>
                        ) : (
                            <Col>
                                {data.length > 0 ? (
                                    <>
                                        {data.map((post) => (
                                            <Col
                                                key={post._id}
                                                lg={{ span: 6, offset: 3 }}
                                            >
                                                <Post
                                                    post={post}
                                                    allLikedPosts={
                                                        allLikedPosts
                                                    }
                                                    refetch={refetch}
                                                    refetchPost={refetchPost}
                                                    allComments={allComments}
                                                />
                                            </Col>
                                        ))}
                                    </>
                                ) : (
                                    <h3 className="text-center text-dark mb-5">
                                        There is no post
                                    </h3>
                                )}
                            </Col>
                        )}
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Posts;
