import "./updateProfile.scss";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import Avatar from "../avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { updateMyProfile } from "../../redux/slices/appConfigSlice";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStorageManager";
import { useNavigate } from "react-router-dom";

export default function UpdateProfile() {
  const myProfile = useSelector((state) => state.appConfigSlice.myProfile);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [userImg, setUserImg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    setName(myProfile?.name);
    setBio(myProfile?.bio);
    setUserImg(myProfile?.avatar?.url);
  }, [myProfile]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setUserImg(fileReader.result);
      }
    };
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    try {
      await axiosClient.delete("/user/delete", {
        currentUserId: myProfile?._id,
      });
      await axiosClient.post("/auth/logout");
      removeItem(KEY_ACCESS_TOKEN);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = () => {
    try {
      dispatch(
        updateMyProfile({
          name,
          bio,
          userImg,
        })
      ); //we can pass only one object
    } catch (error) {
      console.log(error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="update-profile container">
      <div className="left">
        <div className="input-user-image">
          <label htmlFor="userImage">
            <Avatar src={userImg} />
          </label>
          <input
            id="userImage"
            className="user-image-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
      </div>
      <div className="right">
        <Form
          className="edit-profile-form"
          layout="vertical"
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="Name" name="name">
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder={myProfile.name}
            />
          </Form.Item>

          <Form.Item label="Profile Bio" name="profile-bio">
            <Input.TextArea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Update Profile
            </Button>
          </Form.Item>
        </Form>
        <Button onClick={showModal} type="primary" danger>
          Delete Profile
        </Button>
        <Modal
          className="delete-profile-modal"
          title="Delete Sociopost Account !"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={
            <>
              <Button type="primary" danger onClick={handleOk}>
                Yes, Delete
              </Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </>
          }
        >
          <p>Are you sure you want to Delete your account?</p>
          <p>
            This action cannot be reversed, deleting your account will delete
            the following things from our platform.
          </p>
          <p></p>
          <ul>
            <li>All your Posts</li>
            <li>All your likes</li>
            <li>All your followers</li>
            <li>All your followings</li>
          </ul>
        </Modal>
      </div>
    </div>
  );
}
