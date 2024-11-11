import React, { useState } from "react";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext } from "react";

import Login from "./pages/Login/Login";
import MainPage from "./pages/MainPage/MainPage";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import AddUser from "./components/AddUser/AddUser";

// Context for providing notifications to the entire app
export const NotificationContext = createContext();
const notifySuccess = (message) => {
    toast.success(message);
};
const notifyError = (message) => {
    toast.error(message);
};

export default function App() {
    // State for holding current logged in user
    const [loggedInUser, setLoggedInUser] = useState({
        username: "Admin",
        password: "cooltest123",
    });

    return (
        <MantineProvider>
            <NotificationContext.Provider value={{ notifySuccess, notifyError }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route
                            path="/login"
                            element={<Login setLoggedInUser={setLoggedInUser} />}
                        />
                        <Route
                            path="/admin"
                            element={
                                <AdminPanel
                                    setLoggedInUser={setLoggedInUser}
                                    loggedInUser={loggedInUser}
                                />
                            }
                        >
                            <Route index element={<div>All</div>} />
                            <Route path="coupon-add" element={<div>Add Coupon</div>} />
                            <Route path="coupon-edit/:couponId" element={<div>Edit Coupon</div>} />
                            <Route path="user-add" element={<AddUser />} />
                        </Route>
                        <Route path="/user" element={<div>TBD</div>} />
                    </Routes>
                </BrowserRouter>
                <ToastContainer position="bottom-left" />
            </NotificationContext.Provider>
        </MantineProvider>
    );
}
