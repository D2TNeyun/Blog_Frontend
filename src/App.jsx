// import { useState } from 'react'
import {
  Outlet,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Header from "./Components/Layouts/DefaultLayout/Header/Header.jsx";
import AuthModal from "./Resources/Auth/Auth.jsx";
import HomePage from "./Resources/Home/HomePage/HomePage.jsx";
import PostByCategory from "./Resources/Home/PostByCategory/PostByCategory.jsx";
import TagByCate from "./Resources/Home/TagByCate/TagByCate.jsx";
import PostDetail from "./Resources/Home/PostDetail/PostDetail.jsx";
import LayoutAdmin from "./Components/Layouts/LayoutAdmin/LayoutAdmin.jsx";
import LayoutUser from "./Components/Layouts/LayoutUser/LayoutUser.jsx";
import { ToastContainer } from "react-toastify";
import ManagePost from "./Resources/Admin/Post/ManagePost/ManagePost.jsx";
import ManageUser from "./Resources/Admin/User/ManageUser/ManageUser.jsx";
import ManageEmploy from "./Resources/Admin/User/ManageUser/ManageEmploy.jsx";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

function App() {
  // const [count, setCount] = useState(0)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage/>,
        },
        {
          path: "/",
          element: <AuthModal />,
        },
        {
          path: "/categories/:id/:categoryName",
          element: <PostByCategory />,
        },
        {
          path: "/tags/:id/:tagName",
          element: <TagByCate />,
        },
        {
          path: "/posts/:id/:title",
          element: <PostDetail/>,  
        }
    
      ],  
      // path: "/about",
      // element: <AboutPage />,
      // Add more routes here...
    },
    {
      path: "/admin",
      element: <LayoutAdmin/>,
      children: [
        // Admin routes here...
        {
          path: "/admin/manageEmploy",
          element: <ManageEmploy />,
        },
        {
          path: "/admin/manageUser",
          element: <ManageUser />,
        },
        {
          path: "/admin/managePost",
          element: <ManagePost />,
        }
      ],
    },
    {
      path: "/user",
      element: <LayoutUser />,
      children: [
        // User routes here...
      ],
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />

      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
