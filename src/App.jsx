// import { useState } from 'react'
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";

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
import ManageEmploy from "./Resources/Admin/Accout/ManageUser/ManageEmploy.jsx";
import ManageUser from "./Resources/Admin/Accout/ManageUser/ManageUser.jsx";

import AddPost from "./Resources/Admin/Post/AddPost/AddPost.jsx";
import LayoutEmploy from "./Components/Layouts/LayoutEmploy/LayoutEmploy.jsx";
import ManagePostByEmploy from "./Resources/Employee/Post/ManagePost/ManagePost.jsx";
import ManageEmploy2 from "./Resources/Employee/Accout/ManageEmploy2.jsx";
import ManageCategory from "./Resources/Admin/Categories/manageCategory.jsx";
import ProtectedRoute from "./Components/ProtectRoute/ProtectRoute.jsx";
import { useSelector } from "react-redux";
import Loading from "./Components/Loading/Loading.jsx";
import OnTopButton from "./Components/OnTopButton/OnTopButton.jsx";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <OnTopButton/>
    </div>
  );
};

function App() {
  const isLoading = useSelector((state) => state.user.isLoading);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage />,
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
          element: <PostDetail />,
        },
      ],
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <LayoutAdmin />
        </ProtectedRoute>
      ),
      children: [
        // Admin routes here...
        {
          path: "manageEmploy",
          element: <ManageEmploy />,
        },
        {
          path: "manageUser",
          element: <ManageUser />,
        },
        {
          path: "managePost",
          element: <ManagePost />,
        },
        {
          path: "addPost",
          element: <AddPost />,
        },
        {
          path: "manageCategory",
          element: <ManageCategory />,
        },
      ],
    },
    {
      path: "/employ",
      element: (
        <ProtectedRoute>
          <LayoutEmploy />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "managePost",
          element: <ManagePostByEmploy />,
        },
        {
          path: "addPost",
          element: <AddPost />,
        },
        {
          path: "manageEmploy",
          element: <ManageEmploy2 />,
        },
        {
          path: "manageUser",
          element: <ManageUser />,
        },
      ],
    },
    {
      path: "/user",
      element: (
        <ProtectedRoute>
          <LayoutUser />
        </ProtectedRoute>
      ),
      children: [
        // User routes here...
      ],
    },
  ]);

  return (
    <>
    {isLoading === false || 
      window.location.pathname === "/" ||
      window.location.pathname === "/posts" ||
      window.location.pathname === "/categories" ||
      window.location.pathname === "/tags" ? (
        <RouterProvider router={router} />
      ) : (
        <Loading/>
      )
     }

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
