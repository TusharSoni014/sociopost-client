import React, { useState } from "react";
import "./createpost.scss";
import PostPreview from "./PostPreview";
import defaultPost from "../img/defaultPost.png";
import { Button, notification } from "antd";
import { FaRegImage } from "react-icons/fa";
import { axiosClient } from "../../utils/axiosClient";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slices/appConfigSlice";

export default function CreatePost() {
  const dispatch = useDispatch();
  const [postImage, setPostImage] = useState(defaultPost);
  const [caption, setCaption] = useState(null);

  //ant design notificaion
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, message, type) => {
    api[type]({
      message: "New Notification !",
      description: message,
      placement,
    });
  };

  async function handleAddPost() {
    try {
      dispatch(setLoading(true));
      const response = await axiosClient.post("/posts", {
        caption,
        postImage,
      });

      setCaption(null);
      setPostImage(defaultPost);
      openNotification(
        "right",
        "Post has been Created Successfully !",
        "success"
      );
      //ant design notification
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
      setCaption(null);
      setPostImage(defaultPost);
    }
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setPostImage(fileReader.result);
      }
    };
  }
  return (
    <>
      <div className="createpost container">
        <div className="post-preview-container">
          <PostPreview imgSrc={postImage} caption={caption} />
        </div>

        <div className="post-upload-container">
          <div className="post-img-container">
            <span className="label">Image: </span>
            <label htmlFor="post-img">
              <div className="upload-button">
                <FaRegImage style={{ width: "25px" }} /> Upload Post Image
              </div>
            </label>
            <input
              id="post-img"
              accept="image/*"
              onChange={handleImageChange}
              type="file"
            />
          </div>
          <span className="label">Caption: </span>
          <textarea
            onChange={(e) => setCaption(e.target.value)}
            rows="5"
            placeholder="type your post caption here"
          ></textarea>
          <Button
            onClick={handleAddPost}
            block
            className="upload-post-btn"
            type="primary"
          >
            Upload Post
          </Button>
        </div>
      </div>
    </>
  );
}
