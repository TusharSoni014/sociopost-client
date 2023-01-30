import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { setLoading } from "./appConfigSlice";

export const getUserProfile = createAsyncThunk(
  "fetch/getUserProfile",
  async (body, thunkApi) => {
    //thunkApi se ek action dispatcher dusre action ko dispatch kr skta hai, simply async call hote time ek action dispatch kr skte hai jb ye wala thunk call hoga
    try {
      thunkApi.dispatch(setLoading(true));
      const result = await axiosClient.post("/user/getUserProfile", body);
      return result;
    } catch (err) {
      return Promise.reject(err);
    } finally {
      thunkApi.dispatch(setLoading(false));
    }
  }
);

export const likeAndUnlikePost = createAsyncThunk(
  "post/likeAndUnlike",
  async (body, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));
      const response = await axiosClient.post("/posts/like", body);
      return response.result.post;
    } catch (err) {
      return Promise.reject(err);
    } finally {
      thunkApi.dispatch(setLoading(false));
    }
  }
);

const postSlice = createSlice({
  name: "postSlice",
  initialState: {
    userProfile: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload.result;
      })
      .addCase(likeAndUnlikePost.fulfilled, (state, action) => {
        const post = action.payload;
        const index = state?.userProfile?.userPosts?.findIndex(
          (item) => item._id === post._id
        );
        if (index !== undefined && index !== -1) {
          //-1 nhi h toh mtlb contain hai user post me (profile page)
          state.userProfile.userPosts[index] = post;
        }
      });
  },
});

export default postSlice.reducer;
