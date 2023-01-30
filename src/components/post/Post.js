import React from "react";
import Avatar from "../avatar/Avatar";
import "./post.scss";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { likeAndUnlikePost } from "../../redux/slices/postSlice";
import { useNavigate } from "react-router-dom";

export default function Post({ post }) {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  function handleLikeUnlike() {
    
    // dispatch(showToast({
    //   type: TOAST_SUCCESS,
    //   message:"Completed Reaction on Post !"
    // }))
    dispatch(likeAndUnlikePost({ postId: post._id }));
  }
  return (
    <div className="post">
      <div className="heading" onClick={() => navigate(`/profile/${post?.owner?._id}`)}>
        <Avatar src={post?.owner?.avatar?.url} /> <h4>{post?.owner?.name}</h4>
      </div>
      <div className="content">
        <img src={post?.image?.url} alt="" />
      </div>
      <div className="post-footer">
        <div className="like-status" onClick={handleLikeUnlike}>
          {post?.isLiked ? (
            <AiFillHeart className="liked" />
          ) : (
            <AiOutlineHeart />
          )}

          <h5>{post?.likesCount} Likes</h5>
        </div>
        <p className="caption">{post?.caption}</p>
        <h6 className="time-ago">{post?.timeAgo}</h6>
      </div>
    </div>
  );
}
