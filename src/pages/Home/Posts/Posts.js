import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CreatePost from "../../../components/shared/CreatePost/CreatePost";
import SectionTitle from "../../../components/shared/SectionTitle/SectionTitle";

const Posts = () => {
    return (
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
    );
};

export default Posts;
