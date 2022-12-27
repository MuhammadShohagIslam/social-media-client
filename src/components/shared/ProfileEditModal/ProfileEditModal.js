import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import classes from "./ProfileEditModal.module.css";

const ProfileEditModal = ({
    showModal,
    setShowModal,
    modalName,
    handleSubmit,
}) => {
    return (
        <Modal show={showModal} onHide={() => setShowModal(!showModal)}>
            <Modal.Header closeButton>
                <Modal.Title>{modalName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-black">
                            Email address
                        </Form.Label>
                        <Form.Control name="email" type="email" disabled />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicFullName">
                        <Form.Label className="text-black">FullName</Form.Label>
                        <Form.Control
                            type="text"
                            name="fullName"
                            placeholder="Enter Your Full Name"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicAddress">
                        <Form.Label className="text-black">Address</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            placeholder="Enter Your Address"
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="formBasicUniversity"
                    >
                        <Form.Label className="text-black">
                            University
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="university"
                            placeholder="Enter Your University"
                        />
                    </Form.Group>

                    <Button
                        className={`${classes.profileUpdateButton} btn`}
                        variant="outline-dark"
                        type="submit"
                    >
                        Update
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ProfileEditModal;
