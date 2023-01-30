import React, { useState } from "react";
import { Button, Modal, Tooltip } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { IoMdSettings, IoMdLogOut } from "react-icons/io";
import { BsFillPlusSquareFill } from "react-icons/bs";
import "./header.scss";
import logo from "../img/logo.png";
import Avatar from "../avatar/Avatar";
import { useDispatch } from "react-redux";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStorageManager";

export default function Header({ profile }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showSettingsModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleLogoutClick = async () => {
    try {
      await axiosClient.post("/auth/logout");
      removeItem(KEY_ACCESS_TOKEN);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <div className="logo-container">
          <img src={logo} alt="" />
          <h2>Sociopost</h2>
        </div>
      </Link>

      <div className="header-right">
        <IoMdSettings onClick={showSettingsModal} className="settings-icon" />

        <Tooltip placement="bottom" title="Create New Post">
          <Link to="/create-post">
            <BsFillPlusSquareFill className="settings-icon" />
          </Link>
        </Tooltip>

        <Modal
          className="header-settings"
          footer={false}
          title="Sociopost Settings"
          open={isModalOpen}
          onCancel={handleCancel}
          width={250}
        >
          <Link to="/update-profile">
            <Button className="update-profile-btn" type="primary" block>
              Update Profile
            </Button>
          </Link>

          <Button
            onClick={handleLogoutClick}
            className="logout-btn"
            icon={<IoMdLogOut className="logout-icon" />}
            type="primary"
            block
            danger
          >
            Log Out
          </Button>
        </Modal>
        <div
          className="profile"
          onClick={() => navigate(`/profile/${profile?._id}`)}
        >
          <Avatar src={profile?.avatar?.url} />
          <span>{profile?.name}</span>
        </div>
      </div>
    </div>
  );
}
