import React, { useState, useEffect } from "react";
import { Card, Image, Container,OverlayTrigger, Tooltip } from "react-bootstrap";
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
import {
    getAllLikePosts,
    removedLikedPost,
    likeThePost,
} from "../../../../api/likePosts";

const PostDetails = () => {
    const [post, setPost] = useState({});
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

    return (
        <MediaLayout>
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
                                    2 comments
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
                        <CreateComment user={user} />
                    </div>
                    <hr />
                    <div>
                        <h4 className="ms-4 mt-3">List Of The Comments</h4>
                        <div>
                            <Comment />
                            <Comment />
                            <Comment />
                        </div>
                    </div>
                </Card>
            </Container>
        </MediaLayout>
    );
};

export default PostDetails;
