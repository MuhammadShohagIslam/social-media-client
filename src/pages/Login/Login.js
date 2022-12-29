import React, { useEffect } from "react";
import { GoogleAuthProvider } from "firebase/auth";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { toast } from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider/AuthProvider";
import Main from "../../Layout/Main/Main";
import { createJwtToken } from "./../../api/user";

const Login = () => {
    const {
        user,
        loginWithEmailAndPassword,
        registerAndLoginWithProvider,
        setLoading,
    } = useAuth();
    const googleProvider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // validation
        if (!email) {
            return toast.error("Please Enter Email!");
        }
        if (!password) {
            return toast.error("Please Enter Password!");
        }

        loginWithEmailAndPassword(email, password)
            .then((result) => {
                const userCredential = result.user;
                const currentUserData = {
                    name: user?.displayName || userCredential?.displayName,
                    email: userCredential.email || email,
                };
                createJwtToken(currentUserData).then((res) => {
                    const data = res.data;
                    localStorage.setItem("ShohagCSM-token", `Bearer ${data.token}`);
                    form.reset();
                    toast.success("Login Successfully");
                    navigate(from, { replace: true });
                });
                form.reset();
            })
            .catch((error) => {
                toast.error(error.message.split("Firebase: ").join(""));
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleSignUpWithProvider = (event, providerName) => {
        event.preventDefault();
        if (providerName === "google") {
            popupForSignInProvider(googleProvider);
        }
    };

    const popupForSignInProvider = (provider) => {
        registerAndLoginWithProvider(provider)
            .then((result) => {
                const userCredential = result.user;
                const currentUserData = {
                    name: userCredential?.displayName,
                    email: userCredential?.email,
                };
                createJwtToken(currentUserData).then((res) => {
                    const data = res.data;
                    localStorage.setItem("ShohagCSM-token", `Bearer ${data.token}`);
                    navigate(from, { replace: true });
                });
            })
            .catch((error) => {
                toast.error(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Main>
            <Helmet>
                <title>Login</title>
            </Helmet>

            <Container className="my-5">
                <Row className="m-0">
                    <Col lg={6} className="m-auto bg-dark p-lg-5 p-4">
                        <h2 className="text-white text-center mb-3">Log in</h2>
                        <div className="d-grid gap-2">
                            <Button
                                className="fs-4 d-flex justify-content-center px-2"
                                size="sm"
                                onClick={(e) =>
                                    handleSignUpWithProvider(e, "google")
                                }
                            >
                                <div className="d-flex py-2 h-100">
                                    <FaGoogle className="align-baseline me-2 fs-4" />
                                </div>
                                <h5 className="mb-0 fs-lg-3 fs-6 d-flex align-baseline h-100 pt-2">
                                    Continue with Google
                                </h5>
                            </Button>
                        </div>
                        <h3 className="text-white text-center mt-2">Or</h3>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                            >
                                <Form.Label className="text-white">
                                    Email Address
                                </Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="Enter email"
                                />
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="formBasicPassword"
                            >
                                <Form.Label className="text-white">
                                    Password
                                </Form.Label>
                                <Form.Control
                                    type="password"
                                    required
                                    name="password"
                                    placeholder="Password"
                                />
                            </Form.Group>
                            <Button
                                size="lg"
                                className="text-white"
                                type="submit"
                            >
                                Login
                            </Button>
                            <hr className="border border-white border-1 opacity-50 mt-4"></hr>
                            <p className="text-white text-center">
                                Don't have an account?{" "}
                                <Link
                                    className="text-decoration-underline"
                                    to="/register"
                                >
                                    Register
                                </Link>
                            </p>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Main>
    );
};

export default Login;
