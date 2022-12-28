import React from "react";
import moment from "moment";
import { useNavigate, useLocation } from "react-router-dom";
import {
    Card,
    Container,
    Image,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";
import classes from "./Post.module.css";
import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt, FaUserAlt } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import { Link } from "react-router-dom";
import { useAuth } from "./../../../contexts/AuthProvider/AuthProvider";
import { likeThePost, removedLikedPost } from "../../../api/likePosts";
import { toast } from "react-hot-toast";

const Post = ({ post, allLikedPosts, refetch, allComments, refetchPost }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { _id, content, image, postedAt, postedName, postedUserImage } = post;

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
                        refetchPost();
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
                    refetchPost();
                }
            });
        }
    };
    const likedPostsByMap = allLikedPosts?.reduce((acc, cur) => {
        if (cur.postId === _id) {
            acc.push(cur.likedUserEmail);
        }
        return acc;
    }, []);

    const isLikedPostsArrayList = likedPostsByMap?.includes(user?.email);

    const likedPostArrayByPostId =
        allLikedPosts &&
        allLikedPosts.filter((likedPost) => likedPost.postId === _id);

    const likedPostArrayByUserName =
        allLikedPosts &&
        allLikedPosts.filter(
            (likedPost) =>
                likedPost.postId === _id &&
                likedPost.likedUserName === user?.displayName
        );

    // functionality about comment of the post
    const commentArrayByPostId =
        allComments && allComments.filter((comment) => comment.postId === _id);

    return (
        <Container>
            <Card className={classes.cardWrapper}>
                <Card.Header className={classes.cardHeaderWrapper}>
                    <div>
                        {postedUserImage ? (
                            <Image
                                className={classes.cardHeaderImg}
                                roundedCircle
                                src={postedUserImage}
                            />
                        ) : (
                            <span className={classes.cardHeaderImg}>
                                <FaUserAlt className="text-black fs-5" />
                            </span>
                        )}
                    </div>
                    <div>
                        <h2 className={classes.cardHeaderName}>{postedName}</h2>
                        <p className={classes.cardHeaderPostCreatedAt}>
                            {moment(postedAt).fromNow()}
                        </p>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Text className={classes.cardContent}>
                        {content.length > 100
                            ? `${content.slice(0, 100)} ...`
                            : content}
                        <Link
                            className={classes.cardContentDetails}
                            to={`/posts/${_id}`}
                        >
                            details
                        </Link>
                    </Card.Text>
                </Card.Body>
                <div className={classes.cardImageWrapper}>
                    <Card.Img variant="bottom" src={image && image} />
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
                                              likedPostArrayByPostId.length - 1
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
                        <div className={classes.cardFooterCounterCommentShared}>
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
                                        : likedPostArrayByUserName.length > 0
                                        ? "Already Like"
                                        : "Like"}
                                </Tooltip>
                            }
                        >
                            <div
                                className={classes.cardFooterBottomIconWrapper}
                                onClick={() =>
                                    handleLikedThePost(
                                        _id,
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
                        <div className={classes.cardFooterBottomIconWrapper}>
                            <Link
                                className={classes.cardFooterBottomCommentLink}
                                to={`/posts/${_id}`}
                            >
                                <FaCommentAlt
                                    className={
                                        classes.cardFooterBottomCommentIcon
                                    }
                                />
                                Comment
                            </Link>
                        </div>
                        <div className={classes.cardFooterBottomIconWrapper}>
                            <IoIosShareAlt
                                className={classes.cardFooterBottomSharedIcon}
                            />
                            Share
                        </div>
                    </div>
                </Card.Footer>
            </Card>
        </Container>
    );
};

export default Post;
