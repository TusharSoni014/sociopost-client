import React from "react";
import "./avatar.scss";
import defaultProfile from "../img/profile.jpg";

export default function Avatar({ src }) {
  return (
    <div className="avatar">
      <img src={src} alt="" />
    </div>
  );
}

Avatar.defaultProps = {
  src: defaultProfile,
};
