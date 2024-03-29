// import bodyParser from "body-parser";
import React, { Component, lazy, Suspense, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
// import {crea}

import { UserAuthContextProvider } from "./context/UserAuthContext";
// components
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
// import About from "./components/About";
import Contact from "./components/Contact";
import RestaurantPage from "./components/RestaurantPage";
import Error from "./components/Error";
import Profile from "./components/Profile";
import Shimmer from "./components/Shimmer";
import UserContext from "./utils/UserContext";
import store from "./utils/store";
import Cart from "./components/Cart";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import ProfileInfoFormComponent from "./components/ProfileInfo";

import TemporaryPage from "./components/TempPage";
import OrderSummaryPage from "./components/OrderSummary";

// import Instamart from "./components/Instamart";


// this is a promise
const Instamart = lazy(() => import("./components/Instamart"));
const About = lazy(() => import("./components/About"));


const AppLayout = () => {
    return (
        <UserAuthContextProvider>
            <Provider store={store}>
                <div className="flex flex-col min-h-screen">
                    <Header />
                    {/* {Outlet} */}
                    <div className="flex-1">
                        <Outlet />
                    </div>
                    <div className="shrink-0">
                        <Footer />
                    </div>
                </div>
            </Provider>
        </UserAuthContextProvider>
        // {/* // Everything has been put inside <UserContext.Provider></UserContext.Provider> so that we can use the updated value of context everywhere */ }
    );
}

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Body />,
            },
            {
                path: "/about",
                element: <Suspense fallback={<h1>Loading...</h1>}>
                    <About />
                </Suspense>,
                children: [
                    {
                        // path: "/profile", // localhost:1234/profile
                        path: "profile", // parentPath/{path}
                        element: <Profile />,
                    }
                ],
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/restaurant/:id",
                element: <RestaurantPage />,
            },
            {
                path: "/instamart",
                element: <Suspense fallback={<Shimmer />}>
                    <Instamart />
                </Suspense>,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            },
            {
                path: "/profileInfo",
                element: <ProfileInfoFormComponent />,
            },
            {
                path: "/ordersummary",
                element: <OrderSummaryPage />,
            },
        ],
    },
])

const root = ReactDOM.createRoot(document.getElementById("root"));

// passing a react element inside the root
root.render(<RouterProvider router={appRouter} />);  // HeaderComponent() will also work




// {/* <UserContext.Provider
//                 value={{
//                     user: user,
//                     setUser: setUser,
//                 }}
//             >
//                 <Header />
//                 {/* {Outlet} */}
//                 <Outlet />
//                 <Footer />
//             </UserContext.Provider> */}