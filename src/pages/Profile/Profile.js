import React from "react";
import { Form, Button, Container, Col, Row, Figure } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthProvider/AuthProvider";
import { toast } from "react-hot-toast";
import { FaUserAlt } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import Main from "./../../Layout/Main/Main";
import classes from "./Profile.module.css";

const Profile = () => {
    const { user, setLoading, userProfileUpdate } = useAuth();

    const handleUserProfileUpdate = (event) => {
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
                            {" "}
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
                            <div className={classes.profileInformationIconWrapper}>
                                <BiEdit
                                    className={classes.profileInformationIcon}
                                />
                            </div>
                        </div>
                        <Row>
                            <Col lg={7}>
                                <Form onSubmit={handleUserProfileUpdate}>
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
                                        controlId="formBasicEmail"
                                    >
                                        <Form.Label className="text-black">
                                            PhotoURL
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            disabled
                                            name="photoURL"
                                            defaultValue={user?.photoURL}
                                            placeholder="Enter PhotoURL"
                                        />
                                    </Form.Group>

                                    <Button
                                        size="lg"
                                        className="text-white border border-white"
                                        variant="outline-dark"
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </Main>
    );
};

export default Profile;
