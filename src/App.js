import { Routes, Route } from "react-router-dom";
import Signup from "./components/pages/signup/Signup";
import Login from "./components/pages/login/Login";
import Home from "./components/pages/home/Home";
import RequireUser from "./components/RequireUser";
import Feed from "./components/pages/feed/Feed";
import Profile from "./components/pages/profile/Profile";
import Footer from "./components/footer/Footer";
import UpdateProfile from "./components/update-profile/UpdateProfile";
import { useSelector } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import { notification } from "antd";
import { useEffect, useRef } from "react";
import CreatePost from "./components/createpost/CreatePost";
import NotFound from "./components/notfound/NotFound";
import NotRequireUser from "./components/NotRequireUser";

export const TOAST_SUCCESS = "success";
export const TOAST_ERROR = "error";

function App() {
  const loadingRef = useRef();
  const isLoading = useSelector((state) => state.appConfigSlice.isLoading);
  const toastData = useSelector((state) => state.appConfigSlice.toastData);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (isLoading) {
      loadingRef.current?.continuousStart();
    } else {
      loadingRef.current?.complete();
    }
  }, [isLoading]);

  useEffect(() => {
    switch (toastData.type) {
      case TOAST_SUCCESS:
        notification.success({
          message: "New Notification",
          description: toastData.message,
          placement: "bottomRight",
        });
        break;
      case TOAST_ERROR:
        notification.error({
          message: "New Notification",
          description: toastData.message,
          placement: "bottomRight",
        });
        break;
    }
  }, [toastData]);

  return (
    <>
      {contextHolder}
      <LoadingBar color="white" ref={loadingRef} />
      <Routes>
        <Route element={<RequireUser />}>
          <Route element={<Home />}>
            <Route path="/" element={<Feed />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/create-post" element={<CreatePost />} />
          </Route>
        </Route>
        <Route element={<NotRequireUser />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
