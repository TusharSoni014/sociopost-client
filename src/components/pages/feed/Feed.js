import Link from "antd/es/typography/Link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedPosts } from "../../../redux/slices/feedSlice";
import Follower from "../../follower/Follower";
import Post from "../../post/Post";
import "./feed.scss";

export default function Feed() {
  const dispatch = useDispatch();
  const feedData = useSelector((state) => state.feedSlice.feedData);

  useEffect(() => {
    dispatch(fetchFeedPosts());
  }, [dispatch]);

  //dispatch in dependency to prevent infinite loop

  return (
    <div className="feed container">
      <div className="main-feed">
        {feedData?.posts?.length > 0
          ? feedData?.posts?.map((post) => <Post key={post?._id} post={post} />)
          : "Follow someone to see their posts in your feed"}
      </div>
      <div className="sidebar">
        <div className="following">
          <h2>You are Following</h2>
          {feedData?.followings?.map((user) => (
            <Follower key={user._id} user={user} />
          ))}
        </div>
        <div className="suggestions">
          <h2>Suggested for you</h2>
          {feedData?.suggestions?.map((user) => (
            <Follower key={user._id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}
