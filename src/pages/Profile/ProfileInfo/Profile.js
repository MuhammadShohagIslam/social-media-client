import React, { useEffect, useState } from "react";
import { Form, Container, Col, Row } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthProvider/AuthProvider";
import { toast } from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import classes from "./Profile.module.css";
import ProfileEditModal from "../../../components/shared/ProfileEditModal/ProfileEditModal";
import ProfileLayout from "../../../Layout/ProfileLayout/ProfileLayout";
import axios from "axios";
import { createOrUpdateUser, getUser } from "./../../../api/user";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
    const [showModal, setShowModal] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const { user, setLoading, userProfileUpdate } = useAuth();

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
        queryKey: ["singleUser", user?.email, user?.displayName],
        queryFn: async () => {
            const data = await getUser(user?.email, user?.displayName);
            return data.data;
        },
    });

    const handleShowModal = () => {
        setShowModal((prev) => !prev);
    };

    const handleSubmit = (event, setProfileImages) => {
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
                        profileImgUrl: user?.photoURL || profileImgUrl,
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
                            setProfileImages(null);
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
                    profileUpdate(profileObjectData.name, "");
                    refetch();
                    form.reset();
                    setProfileImages(null);
                    setSubmitLoading(false);
                    setShowModal(false);
                })
                .catch((error) => {
                    setSubmitLoading(false);
                    console.log(error.message);
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
                setLoading(false);
            })
            .catch((error) => {
                toast.error(error);
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return (
        <ProfileLayout>
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
                        <Row>
                            <Col lg={7}>
                                <Form>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail"
                                    >
                                        <Form.Label className="text-black">
                                            FullName
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            disabled
                                            name="fullName"
                                            defaultValue={
                                                user?.displayName ||
                                                userData?.name
                                            }
                                            placeholder="Enter Full Name"
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail"
                                    >
                                        <Form.Label className="text-black">
                                            Email address
                                        </Form.Label>
                                        <Form.Control
                                            name="email"
                                            type="email"
                                            disabled
                                            defaultValue={
                                                user?.email || userData?.email
                                            }
                                            placeholder="Enter Email"
                                        />
                                    </Form.Group>

                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicAddress"
                                    >
                                        <Form.Label className="text-black">
                                            Address
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="address"
                                            disabled
                                            defaultValue={userData?.address}
                                            placeholder="Enter Your Address"
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicUniversity"
                                    >
                                        <Form.Label className="text-black">
                                            University
                                        </Form.Label>
                                        <Form.Control
                                            disabled
                                            type="text"
                                            name="university"
                                            defaultValue={userData?.university}
                                            placeholder="Enter Your University"
                                        />
                                    </Form.Group>
                                </Form>
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
