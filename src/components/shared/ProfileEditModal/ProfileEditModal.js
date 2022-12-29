import React, { useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaImage } from "react-icons/fa";
import classes from "./ProfileEditModal.module.css";

const ProfileEditModal = ({
    showModal,
    setShowModal,
    modalName,
    handleSubmit,
    userData,
    user,
    submitLoading,
}) => {
    const [profileImages, setProfileImages] = useState(null);
    const profileImageRef = useRef();

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0];
            setProfileImages({
                profileImage: URL.createObjectURL(image),
            });
        }
    };
    return (
        <Modal show={showModal} onHide={() => setShowModal(!showModal)}>
            <Modal.Header closeButton>
                <Modal.Title>{modalName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => handleSubmit(e, setProfileImages)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-black">
                            Email address
                        </Form.Label>
                        <Form.Control
                            name="email"
                            type="email"
                            disabled
                            defaultValue={user?.email || userData?.email}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicFullName">
                        <Form.Label className="text-black">FullName</Form.Label>
                        <Form.Control
                            type="text"
                            name="fullName"
                            defaultValue={user?.displayName || userData?.name}
                            placeholder="Enter Your Full Name"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicAddress">
                        {profileImages && (
                            <div className={classes.previewPostImageWrapper}>
                                <span
                                    className={classes.previewPostCrossIcon}
                                    onClick={() => setProfileImages(null)}
                                >
                                    X
                                </span>
                                <img
                                    className={classes.previewPostImage}
                                    src={profileImages.profileImage}
                                    alt=""
                                />
                            </div>
                        )}
                        <div className={classes.uploadPhotoWrapper}>
                            <div>
                                <h2 className={classes.uploadTitle}>
                                    Add To Your Profile Picture
                                </h2>
                            </div>
                            <div
                                onClick={() => profileImageRef.current.click()}
                            >
                                <FaImage className={classes.uploadPhotoIcon} />
                                <span className={classes.uploadPhotoIconTitle}>
                                    Photo
                                </span>
                            </div>
                            <div className="d-none">
                                <Form.Control
                                    type="file"
                                    name="profileImage"
                                    ref={profileImageRef}
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicAddress">
                        <Form.Label className="text-black">Address</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            defaultValue={user?.address || userData?.address}
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
                            defaultValue={
                                user?.university || userData?.university
                            }
                            placeholder="Enter Your University"
                        />
                    </Form.Group>

                    <Button
                        className={`${classes.profileUpdateButton} btn`}
                        variant="outline-dark"
                        type="submit"
                        disabled={submitLoading}
                    >
                        {submitLoading ? "Loading" : "Update"}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ProfileEditModal;
