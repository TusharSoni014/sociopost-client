import React, { useEffect, useState } from "react";
import Avatar from "../avatar/Avatar";
import "./follower.scss";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { followUnfollow } from "../../redux/slices/feedSlice";
import { useNavigate } from "react-router-dom";

export default function Follower({ user }) {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const feedData = useSelector((state) => state.feedSlice.feedData);
  const [isFollowing, setIsFollowing] = useState();

  useEffect(() => {
    setIsFollowing(feedData.followings.find((item) => item._id === user._id));
  }, [feedData]);

  function handleFollowUnfollow() {
    dispatch(
      followUnfollow({
        userIdToFollow: user._id,
      })
    );
  }
  return (
    <div className="follower">
      <div className="profile" onClick={() => navigate(`/profile/${user._id}`)}>
        <Avatar src={user?.avatar?.url} />
        <h4 className="name">{user?.name}</h4>
      </div>
      {isFollowing ? (
        <Button onClick={handleFollowUnfollow} type="link" danger>
          Unfollow
        </Button>
      ) : (
        <Button onClick={handleFollowUnfollow} type="primary">
          Follow
        </Button>
      )}
    </div>
  );
}
