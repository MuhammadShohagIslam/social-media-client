import React, { useEffect, useState } from "react";
import { Form, Container, Col, Row, Figure } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthProvider/AuthProvider";
import { toast } from "react-hot-toast";
import { FaUserAlt } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import Main from "./../../Layout/Main/Main";
import classes from "./Profile.module.css";
import ProfileEditModal from "../../components/shared/ProfileEditModal/ProfileEditModal";

const Profile = () => {
    const { user, setLoading, userProfileUpdate } = useAuth();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const handleShowModal = () => {
        setShowModal((prev) => !prev);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const fullName = form.fullName.value;
        const photoURL = form.photoURL.value;

        // validation
        if (!fullName) {
            return toast.error("Please Enter Full Name!");
        }

        const profile = {
            displayName: fullName,
            photoURL: photoURL,
        };
        userProfileUpdate(profile)
            .then((result) => {
                toast.success("Profile is Updated!");
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
        <Main>
            <div className={classes.profileWrapper}>
                <div className={classes.profileLeftWrapper}>
                    <div className="mt-5">
                        <Figure className="text-center w-100">
                            {user?.photoURL ? (
                                <Figure.Image
                                    width={100}
                                    height={100}
                                    alt="profile"
                                    roundedCircle
                                    src={`${user?.photoURL}`}
                                />
                            ) : (
                                <FaUserAlt className="text-white fs-1" />
                            )}
                        </Figure>
                        <h4 className="text-center text-white">
                            Muhammad Jhohirul Islam
                        </h4>
                    </div>
                </div>
                <div>
                    <Container className="py-5 ps-5">
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
                                            defaultValue={user?.displayName}
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
                                            defaultValue={user?.email}
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
                    modalName="Profile Information Update"
                />
            </div>
        </Main>
    );
};

export default Profile;
