import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider/AuthProvider";
import Main from "../../Layout/Main/Main";

const Registration = () => {
    const [isFetching, setIsFetching] = useState(true);
    const [accepted, setAccepted] = useState(false);
    const {
        createUser,
        userProfileUpdate,
        setLoading,
    } = useAuth();

    useEffect(() => {
        setTimeout(function () {
            setIsFetching(false);
        }, 200);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const fullName = form.fullName.value;
        const photoURL = form.photoURL.value;
        const email = form.email.value;
        const password = form.password.value;
        // validation
        if (!fullName) {
            return toast.error("Please Enter Full Name!");
        }
        if (!email) {
            return toast.error("Please Enter Email!");
        }
        if (password.length <= 5) {
            return toast.error("Please Enter Valid Password!");
        }

        createUser(email, password)
            .then((result) => {
                handleProfileUpdate(fullName, photoURL);
                const userCredential = result.user;
               
            })
            .catch((error) => {
                toast.error(error.message.split("Firebase: ").join(""));
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleProfileUpdate = (fullName, photoURL) => {
        const profile = {
            displayName: fullName,
            photoURL,
        };
        userProfileUpdate(profile)
            .then(() => {})
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <Main>
            <Helmet>
                <title>Register</title>
            </Helmet>
            {isFetching ? (
                <div
                    style={{ height: "400px" }}
                    className="d-flex justify-content-center align-items-center"
                >
                    <Spinner animation="border" className="spinner-color" />
                </div>
            ) : (
                <Container className="my-5">
                    <Row className="m-0">
                        <Col lg={5} className="m-auto bg-dark p-lg-5 p-4">
                            <h2 className="registerHeading text-center fs-lg-5 mb-lg-4 mb-4">
                                Connected With ShohagCSM By Register
                            </h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label className="text-white">
                                        Email address
                                    </Form.Label>
                                    <Form.Control
                                        name="email"
                                        type="email"
                                        placeholder="Enter Email"
                                    />
                                </Form.Group>

                                <Form.Group
                                    className="mb-3"
                                    controlId="password"
                                >
                                    <Form.Label className="text-white">
                                        Password
                                    </Form.Label>
                                    <Form.Control
                                        name="password"
                                        type="password"
                                        placeholder="Password"
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
            )}
        </Main>
    );
};

export default Registration;
