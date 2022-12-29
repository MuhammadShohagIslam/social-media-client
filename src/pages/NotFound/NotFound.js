import React from "react";
import classes from "./NotFound.module.css";
import { TbError404 } from "react-icons/tb";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className={classes.notFoundPageWrapper}>
            <h1 className={classes.fourOrFourTitle}>
                <TbError404 />
            </h1>
            <h2 className={classes.fourOrFourInfo}>Page Not Found</h2>
            <h2 className={classes.fourOrFourInfo}>
                Please{" "}
                <Link to="/login" className={classes.fourOrFourLink}>
                    Login
                </Link>{" "}
                Or{" "}
                <Link to="/register" className={classes.fourOrFourLink}>
                    Register
                </Link>
            </h2>
        </div>
    );
};

export default NotFound;
