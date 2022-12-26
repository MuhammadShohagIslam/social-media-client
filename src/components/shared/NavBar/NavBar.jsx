import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useAuth } from "../../../contexts/AuthProvider/AuthProvider";
import classes from "./NavBar.module.css";

const NavBar = () => {
    const { user, logOut } = useAuth();
    
    const handleLogOut = () => {
        logOut()
            .then()
            .catch((error) => {
                console.log(error.message);
            });
    };
    return (
        <>
            <Navbar
                className={`${classes.navBar}`}
                expand="lg"
                bg="dark"
                variant="dark"
            >
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand className={classes.logo}>
                            SohagCSM
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav
                            className={`${classes.centerNavbar} d-flex justify-content-lg-between align-items-lg-center`}
                        >
                            <div className={classes.navItemMiddle}>
                                <LinkContainer to="/">
                                    <Nav.Link className={classes.navLink}>
                                        Home
                                    </Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/media">
                                    <Nav.Link className={classes.navLink}>
                                        Media
                                    </Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/message">
                                    <Nav.Link className={classes.navLink}>
                                        Message
                                    </Nav.Link>
                                </LinkContainer>
                            </div>
                            <div className="d-lg-flex">
                                {user && user?.uid ? (
                                    <Nav.Link
                                        className={`${classes.navLink} me-lg-0 me-2`}
                                        onClick={handleLogOut}
                                    >
                                        LogOut
                                    </Nav.Link>
                                ) : (
                                    <>
                                        <LinkContainer to="/login">
                                            <Nav.Link
                                                className={classes.navLink}
                                            >
                                                Login
                                            </Nav.Link>
                                        </LinkContainer>
                                        <LinkContainer to="/register">
                                            <Nav.Link
                                                className={classes.navLink}
                                            >
                                                Register
                                            </Nav.Link>
                                        </LinkContainer>
                                    </>
                                )}
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default NavBar;
