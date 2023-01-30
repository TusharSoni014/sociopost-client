import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";

export const getMyInfo = createAsyncThunk(
  "fetch/myInfo",
  async (_, thunkApi) => {
    //thunkApi se ek action dispatcher dusre action ko dispatch kr skta hai, simply async call hote time ek action dispatch kr skte hai jb ye wala thunk call hoga
    try {
      thunkApi.dispatch(setLoading(true));
      const result = await axiosClient.get("/user/getMyInfo");
      return result;
    } catch (err) {
      return Promise.reject(err);
    } finally {
      thunkApi.dispatch(setLoading(false));
    }
  }
);

export const updateMyProfile = createAsyncThunk(
  "user/updateMyProfile",
  async (body, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));
      const response = await axiosClient.put("/user/", body);
      return response;
    } catch (err) {
      return Promise.reject(err);
    } finally {
      thunkApi.dispatch(setLoading(false));
    }
  }
);

const appConfigSlice = createSlice({
  name: "appConfigSlice",
  initialState: {
    isLoading: false,
    toastData: {},
    myProfile: {},
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    showToast: (state, action) => {
      state.toastData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyInfo.fulfilled, (state, action) => {
        state.myProfile = action.payload.result.user;
      })
      .addCase(updateMyProfile.fulfilled, (state, action) => {
        state.myProfile = action.payload.result.user;
      });
  },
});

export default appConfigSlice.reducer;
export const { setLoading, showToast } = appConfigSlice.actions;
