import React from "react";
import { useSelector } from "react-redux";
import Avatar from "../avatar/Avatar";
import "./createpost.scss";

export default function PostPreview({ imgSrc, caption }) {
  const myProfile = useSelector((state) => state.appConfigSlice.myProfile);
  return (
    <div className="post-preview">
      <div className="heading">
        <Avatar src={myProfile?.avatar?.url} /> <h4>{myProfile?.name}</h4>
      </div>
      <div className="content">
        <img src={imgSrc} alt={imgSrc} />
      </div>
      <div className="post-footer">
        <p className="caption">{caption}</p>
      </div>
    </div>
  );
}
