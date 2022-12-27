import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CreatePost from "../../../components/shared/CreatePost/CreatePost";
import SectionTitle from "../../../components/shared/SectionTitle/SectionTitle";
import Post from "./../../../components/shared/Post/Post";

const Posts = () => {
    return (
        <>
            <section>
                <Container className="my-5">
                    <SectionTitle
                        title="Create New Post"
                        info="Shared Your Idea/Knowledged With Post"
                    />
                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                            <CreatePost />
                        </Col>
                    </Row>
                </Container>
            </section>
            <section>
                <Container>
                    <SectionTitle
                        title="Popular Post"
                        info="Trending Post Which are People Liked"
                    />
                    <Row>
                        <Col>
                            <Col md={{ span: 6, offset: 3 }}>
                                <Post />
                                <Post />
                                <Post />
                            </Col>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Posts;
