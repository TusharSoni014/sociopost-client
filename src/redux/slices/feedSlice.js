import { axiosClient } from "../../utils/axiosClient";
import { setLoading } from "./appConfigSlice";
import { likeAndUnlikePost } from "./postSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchFeedPosts = createAsyncThunk(
  "fetch/feedPosts",
  async (_, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));
      const resonse = await axiosClient.get("/user/getFeedData");
      return resonse.result;
    } catch (err) {
      return Promise.reject(err);
    } finally {
      thunkApi.dispatch(setLoading(false));
    }
  }
);

export const followUnfollow = createAsyncThunk(
  "user/followUnfollow",
  async (body, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));
      const resonse = await axiosClient.post("/user/follow", body);
      return resonse.result.user;
    } catch (err) {
      console.log(err);
    } finally {
      thunkApi.dispatch(setLoading(false));
    }
    const response = axiosClient.post("/follow", body);
    return response.result;
  }
);

const feedSlice = createSlice({
  name: "feedSlice",
  initialState: {
    feedData: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedPosts.fulfilled, (state, action) => {
        state.feedData = action.payload;
      })
      .addCase(likeAndUnlikePost.fulfilled, (state, action) => {
        const post = action.payload;

        const index = state?.feedData?.posts?.findIndex(
          (item) => item._id === post._id
        );
        if (index !== undefined && index != -1) {
          //-1 nhi h toh mtlb contain hai user post me (profile page)
          state.feedData.posts[index] = post;
        }
      })
      .addCase(followUnfollow.fulfilled, (state, action) => {
        const user = action.payload;
        const index = state?.feedData?.followings?.findIndex(
          (item) => item._id == user._id
        );
        if (index != -1) {
          state?.feedData?.followings?.splice(index, 1);
          state?.feedData?.suggestions?.push(user);
        } else {
          const index = state?.feedData?.suggestions?.findIndex(
            (item) => item._id == user._id
          );
          state.feedData.followings.push(user);
          state.feedData.suggestions.splice(index, 1);
        }
      });
  },
});

export default feedSlice.reducer;
