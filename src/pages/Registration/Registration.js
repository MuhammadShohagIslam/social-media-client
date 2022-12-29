import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider/AuthProvider";
import Main from "../../Layout/Main/Main";
import { createJwtToken, createNewUser } from "./../../api/user";

const Registration = () => {
    const [accepted, setAccepted] = useState(false);
    const { user, createUser, userProfileUpdate, setLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const userName = form.userName.value;
        const email = form.email.value;
        const password = form.password.value;

        if (!email) {
            return toast.error("Please Enter Email!");
        }
        if (password.length <= 5) {
            return toast.error("Please Enter Valid Password!");
        }

        createUser(email, password)
            .then((result) => {
                const userCredential = result.user;
                const currentUserData = {
                    name:
                        user?.displayName ||
                        userCredential?.displayName ||
                        userName,
                    email: userCredential.email || email,
                };
                createJwtToken(currentUserData).then((res) => {
                    const data = res.data;
                    handleProfileUpdate(userName, "");
                    saveNewUserToDb(currentUserData);
                    localStorage.setItem("ShohagCSM-token", `Bearer ${data.token}`);
                    form.reset();
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: "Registration Successfully",
                        showConfirmButton: false,
                        timer: 2500,
                    });
                    navigate("/");
                });
            })
            .catch((error) => {
                toast.error(error.message.split("Firebase: ").join(""));
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleProfileUpdate = (name, photoURL) => {
        const profile = {
            displayName: name,
            photoURL,
        };
        userProfileUpdate(profile)
            .then((result) => {})
            .catch((error) => {
                toast.error(error.message);
            });
    };

    const saveNewUserToDb = (userData) => {
        createNewUser(userData)
            .then((data) => {})
            .catch((error) => {
                console.log(error.message);
            });
    };

    return (
        <Main>
            <Helmet>
                <title>Register</title>
            </Helmet>

            <Container className="my-5">
                <Row className="m-0">
                    <Col lg={5} className="m-auto bg-dark p-lg-5 p-4">
                        <h2 className="registerHeading text-center fs-lg-5 mb-lg-4 mb-4">
                            Connected With ShohagCSM By Register
                        </h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="userName">
                                <Form.Label className="text-white">
                                    UserName
                                </Form.Label>
                                <Form.Control
                                    name="userName"
                                    type="text"
                                    placeholder="Enter Your User Name"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label className="text-white">
                                    Email address
                                </Form.Label>
                                <Form.Control
                                    name="email"
                                    type="email"
                                    placeholder="Enter Your Email"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label className="text-white">
                                    Password
                                </Form.Label>
                                <Form.Control
                                    name="password"
                                    type="password"
                                    placeholder="Enter Your Password"
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicCheckbox"
                            >
                                <Form.Check
                                    className="text-white"
                                    type="checkbox"
                                    onClick={(e) =>
                                        setAccepted(e.target.checked)
                                    }
                                    label={
                                        <>
                                            By Register, you agree to our
                                            <Link
                                                className="mx-1 text-decoration-underline"
                                                to="/term-condition"
                                            >
                                                Terms of Use
                                            </Link>
                                            and
                                            <Link
                                                className="ms-1 text-decoration-underline"
                                                to="/privacy-policy"
                                            >
                                                Privacy Policy
                                            </Link>
                                        </>
                                    }
                                />
                            </Form.Group>
                            <Button
                                size="lg"
                                className="text-white"
                                variant="outline-dark"
                                type="submit"
                                disabled={!accepted}
                            >
                                Register
                            </Button>
                            <hr className="border border-white border-1 opacity-50 mt-4"></hr>
                            <p className="text-white text-center">
                                Already have an account?{" "}
                                <Link
                                    className="text-decoration-underline"
                                    to="/login"
                                >
                                    Log in
                                </Link>
                            </p>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Main>
    );
};

export default Registration;
