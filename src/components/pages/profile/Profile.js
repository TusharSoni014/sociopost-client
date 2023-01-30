import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getMyInfo } from "../../../redux/slices/appConfigSlice";
import {
  fetchFeedPosts,
  followUnfollow,
} from "../../../redux/slices/feedSlice";
import { getUserProfile } from "../../../redux/slices/postSlice";
import Avatar from "../../avatar/Avatar";
import Post from "../../post/Post";
import "./profile.scss";

export default function Profile() {
  const params = useParams();
  const dispatch = useDispatch();

  const [isUserFollowing, setIsUserFollowing] = useState(null);
  const userProfile = useSelector((state) => state.postSlice.userProfile);
  const feedData = useSelector((state) => state.feedSlice.feedData);
  const myProfile = useSelector((state) => state.appConfigSlice.myProfile);

  useEffect(() => {
    dispatch(getUserProfile({ userId: params.userId }));
    dispatch(fetchFeedPosts());
  }, []);

  function handleFollowUnfollow() {
    dispatch(
      followUnfollow({
        userIdToFollow: params.userId,
      })
    );
  }

  return (
    <div className="profile-page container">
      <div className="posts-container">
        <div className="user-posts">
          {userProfile?.userPosts?.length > 0
            ? userProfile?.userPosts?.map((item, index) => {
                return <Post post={item} key={index} />;
              })
            : "No Posts Available"}
        </div>
      </div>

      <div className="profile-info">
        <div className="profile-card">
          <Avatar src={userProfile?.avatar?.url} />
          <h2>{userProfile?.name}</h2>
          <small>{userProfile?.bio}</small>
        </div>
        <div className="profile-followers-followings">
          <div>
            <h3>{userProfile?.followers?.length}</h3>followers
          </div>
          <div>
            <h3>{userProfile?.followings?.length}</h3>followings
          </div>
        </div>
        <div className="profile-buttons">
          {userProfile?._id === myProfile?._id ? (
            <Link to="/update-profile">
              <Button type="primary" className="edit-profle" block>
                Update Profile
              </Button>
            </Link>
          ) : feedData?.followings?.find(
              (item) => item._id === params.userId
            ) ? (
            <Button onClick={handleFollowUnfollow} danger block>
              Unfollow
            </Button>
          ) : (
            <Button onClick={handleFollowUnfollow} block>
              Follow
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
