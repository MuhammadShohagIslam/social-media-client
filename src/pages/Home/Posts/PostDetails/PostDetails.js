import React, { useState, useEffect } from "react";
import {
    Card,
    Image,
    Container,
    OverlayTrigger,
    Tooltip,
    Spinner,
} from "react-bootstrap";
import moment from "moment";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import MediaLayout from "./../../../../Layout/MediaLayout/MediaLayout";
import { AiFillLike } from "react-icons/ai";
import { IoIosShareAlt } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import classes from "./PostDetails.module.css";
import CreateComment from "../../../../components/shared/CreateComment/CreateComment";
import Comment from "../../../../components/shared/Comment/Comment";
import { useAuth } from "./../../../../contexts/AuthProvider/AuthProvider";
import { getPostByPostId } from "./../../../../api/posts";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import axios from "axios";
import { createNewComment, getAllComments } from "./../../../../api/comments";
import DisplayError from "./../../../DisplayError/DisplayError";
import { Helmet } from 'react-helmet-async';
import {
    getAllLikePosts,
    removedLikedPost,
    likeThePost,
} from "../../../../api/likePosts";

const PostDetails = () => {
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(false);
    const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgdb_key}`;
    const { postId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    useEffect(() => {
        if (postId) {
            const loadingPost = async () => {
                const response = await getPostByPostId(postId);
                const data = await response.data;
                console.log(postId);
                setPost(data);
            };
            loadingPost();
        }
    }, [postId]);

    // functionality about like of the post
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

    const handleLikedThePost = (id, isLikedPostsArrayList) => {
        const likedPostData = {
            postId: id,
            likedUserEmail: user?.email,
            likedUserName: user?.displayName,
        };
        if (!user && !user?.uid) {
            return navigate("/login", {
                state: { from: location },
                replace: true,
            });
        }
        if (!isLikedPostsArrayList) {
            likeThePost(likedPostData)
                .then((data) => {
                    if (data.data.acknowledged) {
                        toast.success("Like The Post!");
                        refetch();
                    }
                })
                .catch((error) => {
                    console.log(error.message);
                });
        } else {
            removedLikedPost(user?.email, id).then((data) => {
                if (data.data.acknowledged) {
                    toast.success(`Removed To Liked From The Post!`);
                    refetch();
                }
            });
        }
    };
    const likedPostsByMap = allLikedPosts?.reduce((acc, cur) => {
        if (cur.postId === postId) {
            acc.push(cur.likedUserEmail);
        }
        return acc;
    }, []);

    const isLikedPostsArrayList = likedPostsByMap.includes(user?.email);

    const likedPostArrayByPostId =
        allLikedPosts &&
        allLikedPosts.filter((likedPost) => likedPost.postId === postId);

    const likedPostArrayByUserName =
        allLikedPosts &&
        allLikedPosts.filter(
            (likedPost) =>
                likedPost.postId === postId &&
                likedPost.likedUserName === user?.displayName
        );

    // functionality about comment of the post

    const {
        status: allCommentsStatus,
        data: allComments = [],
        error: allCommentsError,
        refetch: refetchComment,
    } = useQuery({
        queryKey: ["comments"],
        queryFn: async () => {
            const data = await getAllComments();
            return data.data;
        },
    });

    const handleCommentThePost = (event, setPostCommentImages) => {
        event.preventDefault();

        const form = event.target;
        const postComment = form.postComment.value;
        const commentImage = form.commentImage.files[0];

        if (!user && !user?.uid) {
            return navigate("/login", {
                state: { from: location },
                replace: true,
            });
        }

        if (commentImage) {
            const formData = new FormData();
            formData.append("image", commentImage);
            setLoading(true);

            axios
                .post(url, formData)
                .then((imgData) => {
                    const commentImgUrl = imgData.data.data.url;
                    const commentObjectData = {
                        commentedName: user?.displayName,
                        commentedEmail: user?.email,
                        commentedUserImage: user?.photoURL,
                        postId: postId,
                        comment: postComment,
                        commentImg: commentImgUrl,
                    };

                    createNewComment(commentObjectData)
                        .then((data) => {
                            if (data.data.acknowledged) {
                                toast.success(
                                    "Your are Commented in this Post!"
                                );
                                form.reset();
                                setPostCommentImages(null);
                                setLoading(false);
                                refetchComment();
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
            const commentObjectData = {
                commentedName: user?.displayName,
                commentedEmail: user?.email,
                commentedUserImage: user?.photoURL,
                postId: postId,
                comment: postComment,
                commentImg: null,
            };
            setLoading(true);
            createNewComment(commentObjectData)
                .then((data) => {
                    if (data.data.acknowledged) {
                        toast.success("Your are Commented in this Post!");
                        form.reset();
                        setPostCommentImages(null);
                        setLoading(false);
                        refetchComment();
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    console.log(error);
                });
        }
    };

    if (allCommentsStatus === "loading" || allLikedPostsStatus === "loading") {
        return (
            <div
                style={{ height: "350px" }}
                className="d-flex justify-content-center align-items-center"
            >
                <Spinner animation="border" className="spinner-color" />
            </div>
        );
    }

    const commentArrayByPostId =
        allComments &&
        allComments.filter((comment) => comment.postId === postId);

    if (allLikedPostsError === "error" || allCommentsError === "error") {
        return (
            <DisplayError
                message={allLikedPostsError?.message || allCommentsError?.message}
            />
        );
    }
    return (
        <MediaLayout>
             <Helmet>
                <title>Post-Details</title>
            </Helmet>
            <Container>
                <Card className={classes.cardWrapper}>
                    <Card.Header className={classes.cardHeaderWrapper}>
                        <div>
                            {post?.postedUserImage ? (
                                <Image
                                    className={classes.cardHeaderImg}
                                    roundedCircle
                                    src={post?.postedUserImage}
                                />
                            ) : (
                                <span className={classes.cardHeaderImg}>
                                    <FaUserAlt className="text-black fs-5" />
                                </span>
                            )}
                        </div>
                        <div>
                            <h2 className={classes.cardHeaderName}>
                                {post?.postedName}
                            </h2>
                            <p className={classes.cardHeaderPostCreatedAt}>
                                {moment(post?.postedAt).fromNow()}
                            </p>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text className={classes.cardContent}>
                            {post?.content?.length > 100
                                ? `${post?.content?.slice(0, 100)} ...`
                                : post?.content}
                        </Card.Text>
                    </Card.Body>
                    <div className={classes.cardImageWrapper}>
                        <Card.Img
                            className={classes.cardMainImage}
                            variant="bottom"
                            src={post?.image && post?.image}
                        />
                    </div>
                    <Card.Footer className={classes.cardFooterWrapper}>
                        <div className={classes.cardFooterTopWrapper}>
                            <div className={classes.cardFooterIconWrapper}>
                                <AiFillLike
                                    className={classes.cardFooterLikedIcon}
                                />
                                {likedPostArrayByUserName.length > 0 ? (
                                    <>
                                        You
                                        {likedPostArrayByPostId.length > 1
                                            ? ` and ${
                                                  likedPostArrayByPostId.length -
                                                  1
                                              } Others`
                                            : ""}
                                    </>
                                ) : (
                                    <>
                                        {likedPostArrayByPostId.length > 0
                                            ? likedPostArrayByPostId.length
                                            : 0}{" "}
                                        {likedPostArrayByPostId.length > 0
                                            ? "Likes"
                                            : "Like"}
                                    </>
                                )}
                            </div>
                            <div
                                className={
                                    classes.cardFooterCounterCommentShared
                                }
                            >
                                <p className={classes.cardFooterCounterComment}>
                                    {commentArrayByPostId &&
                                    commentArrayByPostId.length > 0
                                        ? commentArrayByPostId.length
                                        : 0}{" "}
                                    {commentArrayByPostId.length > 0
                                        ? "comments"
                                        : "comment"}
                                </p>
                                <p className={classes.cardFooterCounterShared}>
                                    2 shared
                                </p>
                            </div>
                        </div>
                        <div className={classes.cardFooterBottomWrapper}>
                            <OverlayTrigger
                                placement="top"
                                overlay={
                                    <Tooltip id={`tooltip-top`}>
                                        {!user && !user?.uid
                                            ? "Login To Like"
                                            : likedPostArrayByUserName.length >
                                              0
                                            ? "Already Like"
                                            : "Like"}
                                    </Tooltip>
                                }
                            >
                                <div
                                    className={
                                        classes.cardFooterBottomIconWrapper
                                    }
                                    onClick={() =>
                                        handleLikedThePost(
                                            postId,
                                            isLikedPostsArrayList
                                        )
                                    }
                                >
                                    {isLikedPostsArrayList ? (
                                        <AiFillLike
                                            className={
                                                classes.cardFooterBottomLikedIcon
                                            }
                                        />
                                    ) : (
                                        <AiFillLike
                                            className={
                                                classes.cardFooterBottomUnLikedIcon
                                            }
                                        />
                                    )}
                                    Like
                                </div>
                            </OverlayTrigger>
                            <div
                                className={classes.cardFooterBottomIconWrapper}
                            >
                                <IoIosShareAlt
                                    className={
                                        classes.cardFooterBottomSharedIcon
                                    }
                                />
                                Share
                            </div>
                        </div>
                    </Card.Footer>

                    <div className="mt-3">
                        <h4 className="text-center mb-4">
                            Comment To Post Here!
                        </h4>
                        <CreateComment
                            user={user}
                            handleCommentThePost={handleCommentThePost}
                            loading={loading}
                        />
                    </div>
                    <hr />
                    <div>
                        <h4 className="ms-4 mt-3">
                            {commentArrayByPostId &&
                            commentArrayByPostId.length > 0
                                ? `Comments(${commentArrayByPostId.length})`
                                : `Comments(0)`}
                        </h4>
                        <div>
                            {commentArrayByPostId &&
                            commentArrayByPostId.length > 0 ? (
                                <>
                                    {commentArrayByPostId.map((comment) => (
                                        <Comment
                                            comment={comment}
                                            key={comment._id}
                                        />
                                    ))}
                                </>
                            ) : (
                                <h5 className="text-center text-dark mb-5">
                                    There is no comment
                                </h5>
                            )}
                        </div>
                    </div>
                </Card>
            </Container>
        </MediaLayout>
    );
};

export default PostDetails;
