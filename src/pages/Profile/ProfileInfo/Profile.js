import React, { useEffect, useState } from "react";
import { Container, Col, Row, ListGroup } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthProvider/AuthProvider";
import { toast } from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import classes from "./Profile.module.css";
import ProfileEditModal from "../../../components/shared/ProfileEditModal/ProfileEditModal";
import ProfileLayout from "../../../Layout/ProfileLayout/ProfileLayout";
import axios from "axios";
import { createOrUpdateUser, getUser } from "./../../../api/user";
import { useQuery } from "@tanstack/react-query";
import DisplayError from "./../../DisplayError/DisplayError";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [showModal, setShowModal] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const { user, setLoading, userProfileUpdate, logOut, setUser } = useAuth();
    const navigate = useNavigate();
    const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgdb_key}`;

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const {
        status,
        data: userData,
        error,
        refetch,
    } = useQuery({
        queryKey: ["singleUser"],
        queryFn: async () => {
            const data = await getUser(user?.email, user?.displayName);
            return data.data;
        },
    });

    const handleShowModal = () => {
        setShowModal((prev) => !prev);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const fullName = form.fullName.value;
        const email = form.email.value;
        const photoImage = form.profileImage.files[0];
        const address = form.address.value;
        const university = form.university.value;

        if (photoImage) {
            const formData = new FormData();
            formData.append("image", photoImage);
            setSubmitLoading(true);
            axios
                .post(url, formData)
                .then((imgData) => {
                    const profileImgUrl = imgData.data.data.url;
                    const profileObjectData = {
                        userId: userData?._id,
                        name: fullName || user?.displayName,
                        email: user?.email || email,
                        profileImgUrl: profileImgUrl || user?.photoURL,
                        address: address || null,
                        university: university || null,
                    };

                    createOrUpdateUser(profileObjectData)
                        .then((data) => {
                            toast.success("User Profile Is Updated!");
                            profileUpdate(
                                profileObjectData.name,
                                profileObjectData.profileImgUrl
                            );
                            refetch();
                            form.reset();
                            setSubmitLoading(false);
                            setShowModal(false);
                        })
                        .catch((error) => {
                            setSubmitLoading(false);
                            console.log(error.message);
                        });
                })
                .catch((err) => {
                    console.log(err.message);
                    setSubmitLoading(false);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            const profileObjectData = {
                userId: userData?._id,
                name: fullName || user?.displayName,
                email: user?.email || email,
                address: address || null,
                university: university || null,
            };
            setSubmitLoading(true);
            createOrUpdateUser(profileObjectData)
                .then((data) => {
                    toast.success("User Profile Is Updated!");
                    profileUpdate(
                        profileObjectData.name,
                        profileObjectData.photoURL
                    );
                    form.reset();
                    refetch();
                    setSubmitLoading(false);
                    setShowModal(false);
                })
                .catch((error) => {
                    setSubmitLoading(false);
                    console.log(error.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const profileUpdate = (fullName, photoImage) => {
        const profile = {
            displayName: fullName,
            photoURL: photoImage,
        };
        userProfileUpdate(profile)
            .then((result) => {
                setUser(user);
                setLoading(false);
            })
            .catch((error) => {
                toast.error(error);
                setLoading(false);
            });
    };

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate("/login");
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    if (status === "error") {
        if (error.response.status === 403 || error.response.status === 401) {
            handleLogOut();
        } else {
            <DisplayError message={error.message} />;
        }
    }
    return (
        <ProfileLayout>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <div className={classes.profileWrapper}>
                <div>
                    <Container className="py-2 ps-4 ps-md-0 ps-lg-4">
                        <div className={classes.profileInformationWrapper}>
                            <h2 className={classes.profileInformationTitle}>
                                Profile Information
                            </h2>
                            <div
                                className={
                                    classes.profileInformationIconWrapper
                                }
                            >
                                <BiEdit
                                    onClick={() => handleShowModal()}
                                    className={classes.profileInformationIcon}
                                />
                            </div>
                        </div>
                        <Row className="mt-3">
                            <Col lg={7}>
                                <ListGroup as="ol">
                                    <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                    >
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">Email</div>
                                        </div>
                                        <div>
                                            {user?.email || userData?.email || "None"}
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                    >
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">Full Name</div>
                                        </div>
                                        <div>
                                            {userData?.name || "None"}
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                    >
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">Address</div>
                                        </div>
                                        <div>
                                            {userData?.address || "None"}
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                    >
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">University</div>
                                        </div>
                                        <div>
                                            {userData?.university || "None"}
                                        </div>
                                    </ListGroup.Item>
                                   
                                   
                                </ListGroup>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <ProfileEditModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    handleShowModal={handleShowModal}
                    handleSubmit={handleSubmit}
                    userData={userData}
                    user={user}
                    submitLoading={submitLoading}
                    modalName="Profile Information Update"
                />
            </div>
        </ProfileLayout>
    );
};

export default Profile;
