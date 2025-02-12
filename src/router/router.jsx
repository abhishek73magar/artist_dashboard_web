import { createBrowserRouter, redirect } from "react-router-dom";
import { AddArtist, AddMusic, AddUser, Artist, EditArtist, EditMusic, EditUser, Music, Profile, User } from "router/lazy/Lazyload";
import Login from "pages/Login";
import Signup from "pages/Signup";
import SidebarOutlets from "router/Outlets/SidebarOutlet";
import { auth } from "middleware/auth";
import CommonOutlet from "./Outlets/CommnaOutlet";

export const router = createBrowserRouter([
  { 
    path: '/',
    loader: auth,
    element: <SidebarOutlets />,
    children: [
      { path: "", loader: () => redirect('/music')},
      { 
        path: 'music',
        element: <Music />
      },
      {
        path: 'artist',
        element: <CommonOutlet component={<Artist />} />,
        children: [
          { path: "add", element: <AddArtist /> },
          { path: ":id", element: <EditArtist /> },
        ]
      },
      { 
        path: "artist/:artist_id/music",
        element: <CommonOutlet component={<Music />} />,
        children: [
          { path: "add", element: <AddMusic /> },
          { path: ":id", element: <EditMusic /> }
        ]
      },
      { 
        path: 'user', 
        element: <CommonOutlet component={<User />} />,
        children: [
          { path: "add", element: <AddUser /> },
          { path: ":id", element: <EditUser /> }
        ]
      },
      { path: 'profile', element: <Profile /> }
    ]
  },
  { path: "/login", loader: auth, element: <Login /> },
  { path: "/signup", loader: auth, element: <Signup /> }
])