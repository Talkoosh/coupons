import React, { useEffect, useState } from "react";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext } from "react";

import Login from "./pages/Login/Login";
import MainPage from "./pages/MainPage/MainPage";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import AddUser from "./components/AddUser/AddUser";
import NewCoupon from "./components/NewCoupon/NewCoupon";
import CouponsList from "./components/CouponsList/CouponsList";
import { getAllCoupons, getAllUsers } from "./mockServer/httpRequests";
import RedeemCoupon from "./pages/RedeemCoupon/RedeemCoupon";
import Reports from "./components/Reports/Reports";

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
    const [loggedInUser, setLoggedInUser] = useState([]);

    // State for holding all coupons
    const [coupons, setCoupons] = useState([]);

    // State for holding all users
    const [users, setUsers] = useState([]);

    // Fetch coupons on app entry
    useEffect(() => {
        fetchCoupons();
        fetchUsers();
    }, []);

    // Fetches coupons from server and saves in state
    const fetchCoupons = async () => {
        const res = await getAllCoupons();
        setCoupons(res);
    };

    // Fetches users from server and saves in state
    const fetchUsers = async () => {
        const res = await getAllUsers();
        setUsers(res);
    };

    return (
        <MantineProvider>
            <NotificationContext.Provider value={{ notifySuccess, notifyError }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} />} />
                        <Route path="/redeem-coupon" element={<RedeemCoupon />} />

                        {/* Admin Routes */}
                        <Route path="/admin" element={<AdminPanel setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />}>
                            <Route index element={<CouponsList fetchCoupons={fetchCoupons} coupons={coupons} />} />
                            <Route path="coupon-add" element={<NewCoupon fetchCoupons={fetchCoupons} loggedInUser={loggedInUser} />} />
                            <Route path="user-add" element={<AddUser fetchUsers={fetchUsers} />} />
                            <Route path="reports" element={<Reports users={users} coupons={coupons} />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
                <ToastContainer position="bottom-right" />
            </NotificationContext.Provider>
        </MantineProvider>
    );
}
