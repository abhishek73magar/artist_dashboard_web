import { lazy } from "react";

// export const Login = lazy(() => import('pages/Login'))

export const User = lazy(() => import('pages/Dashboard/User/User'))
export const AddUser = lazy(() => import('pages/Dashboard/User/AddUser'))
export const EditUser = lazy(() => import('pages/Dashboard/User/EditUser'))
export const Profile = lazy(() => import('pages/Dashboard/User/Profile'))

export const Artist = lazy(() => import('pages/Dashboard/Artist/Artist'))
export const AddArtist = lazy(() => import('pages/Dashboard/Artist/AddArtist'))
export const EditArtist = lazy(() => import('pages/Dashboard/Artist/EditArtist'))

export const Music = lazy(() => import('pages/Dashboard/Music/Music'))
export const AddMusic = lazy(() => import('pages/Dashboard/Music/AddMusic'))
export const EditMusic = lazy(() => import('pages/Dashboard/Music/EditMusic'))

