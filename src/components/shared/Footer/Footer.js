import React from "react";
import { Container } from "react-bootstrap";
import classes from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={classes.footer}>
            <Container>
                <div className={classes.topFooter}>
                    <h3 className={classes.topFooterTitle}>ShohagCSM</h3>
                    <p className={classes.topFooterInfo}>World Class Social Media</p>
                </div>

                <div className={classes.bottomFooter}>
                    <p className={classes.bottomFooterCopyRight}>Copyright © 2022 ShohagCSM , All Rights Reserved.</p>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
