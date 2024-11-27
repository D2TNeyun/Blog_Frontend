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
import ProtectedRoute from "./Components/ProtectRoute/ProtectRoute.jsx";
import { useSelector } from "react-redux";
import Loading from "./Components/Loading/Loading.jsx";
import OnTopButton from "./Components/OnTopButton/OnTopButton.jsx";
import Profile from "./Resources/Admin/Accout/Profile/Profile.jsx";
import SearchResults from "./Resources/Home/SearchPost/SearchResults.jsx";
import EditPost from "./Resources/Admin/Post/EditPost/EditPost.jsx";
import Footer from "./Components/Layouts/DefaultLayout/Footer/Footer.jsx";
import Information from "./Resources/Home/Information/Information.jsx";
import Policy from "./Resources/Home/Information/policy.jsx";
import Category from "./Resources/Admin/Categories/Category.jsx";
import AdminHome from "./Resources/Admin/AdminHome/AdminHome.jsx";
import HistoriesNews from "./Resources/User/HistoriesNews/HistoriesNews.jsx";
import HistoriesCmt from "./Resources/User/HistoriesCmt/HistoriesCmt.jsx";
import Comments from "./Resources/Admin/Comment/Comments.jsx";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <OnTopButton/>
      <Footer/>
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
        {
          path: "/search-results",
          element: <SearchResults/>
        },
        {
          path: "/information", // chinh sach
          element: <Information/>
        },
        {
          path: "/policy",
          element: <Policy/>
        },
        {
          path: "/signin-google",
        }
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
          index: true,
          element: <AdminHome />,
        },
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
          path: "edit-post/:id",
          element: <EditPost/>
        },
        {
          path: "manageCategory",
          element: <Category />,
        },
        {
          path: "profile",
          element: <Profile/>
        }, 
        {
          path: "comment",
          element: <Comments />,
        }
      
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
          // path: "profile",
          element: <Profile />,
          index: true,
        },
        {
          path: "managePost",
          element: <ManagePostByEmploy />,
        },
        {
          path: "addPost",
          element: <AddPost />,
        },
        {
          path: "edit-post/:id",
          element: <EditPost/>
        },
        {
          path: "manageEmploy",
          element: <ManageEmploy2 />,
        },
        {
          path: "manageUser",
          element: <ManageUser />,
        },
        {
          path: "comment",
          element: <Comments />,
        }
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
        {
          element: <Profile/>,
          index: true,
        }, 
        {
          path: "cmt",
          element: <HistoriesCmt/>,
        },
        {
          path: "historieNews",
          element: <HistoriesNews/>,
        }
         
        //...
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
