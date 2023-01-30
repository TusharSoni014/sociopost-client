import React, { useEffect } from "react";
import Header from '../../header/Header'
// import { axiosClient } from "../../../utils/axiosClient";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMyInfo } from "../../../redux/slices/appConfigSlice";

export default function Home() {

  const dispatch = useDispatch()
  const myProfile = useSelector(state => state.appConfigSlice.myProfile)

  useEffect(()=>{
    dispatch(getMyInfo())
  },[])

  return <>
    <Header profile={myProfile}/>
    <Outlet/>
  </>
}
