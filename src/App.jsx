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
    
      ],  
      // path: "/about",
      // element: <AboutPage />,
      // Add more routes here...
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
