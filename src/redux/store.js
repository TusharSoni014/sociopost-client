import {configureStore} from '@reduxjs/toolkit'
import appConfigSlice from './slices/appConfigSlice'
import postSlice from './slices/postSlice'
import feedSlice from './slices/feedSlice'

export default configureStore({
    reducer:{
        appConfigSlice,
        postSlice,
        feedSlice
    }
})