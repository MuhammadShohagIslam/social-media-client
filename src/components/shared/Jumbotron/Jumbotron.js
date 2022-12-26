import React from "react";
import { Container } from "react-bootstrap";
import classes from "./Jumbotron.module.css";
import Typewriter from "typewriter-effect";

const Jumbotron = () => {
    return (
        <section className={classes.jumbotron}>
            <Container className={classes.jumbotronWrapper}>
                <div>
                    <h2 className={classes.jumbotronName}>
                        ShohagCSM New Social Media
                    </h2>
                    <div className={classes.jumbotronTitle}>
                        World Class Social Media For
                        <span className={classes.jumbotronTypeEffect}>
                            {
                                <Typewriter
                                    options={{
                                        strings: [
                                            "Connecting New People",
                                            "Making Post",
                                            "Seeing Other Post",
                                            "Knowing Each Other",
                                        ],
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            }
                        </span>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Jumbotron;
