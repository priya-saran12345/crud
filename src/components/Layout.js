import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Category from './components/Category';
import Addcategory from './components/Addcategory';
import Details from './components/Details';
import Update from './components/Update';
import Signup from './components/Signup';
import Login from './components/Login';
import { isLogin } from './util/checkauth';

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Login />, // Set the login page as the default element
        },
        {
            path: "dashboard",
            loader: isLogin,
            element: <Layout />,
            children: [
                { path: "", element: <Category /> },
                { path: "category", element: <Category /> },
                { path: "addcategory", element: <Addcategory /> },
                { path: "details/:id", element: <Details /> },
                { path: "edit/:id", element: <Update /> },
            ]
        },
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> }
    ]);

    return (
        <RouterProvider router={router} />
    );
}

export default App;
