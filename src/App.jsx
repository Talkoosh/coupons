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
import { getAllCoupons } from "./mockServer/httpRequests";
import RedeemCoupon from "./pages/RedeemCoupon/RedeemCoupon";

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
        id: 1,
    });
    // State for holding all coupons
    const [coupons, setCouopons] = useState([]);

    // Fetch coupons on app entry
    useEffect(() => {
        fetchCoupons();
    }, []);

    // Fetches coupons from server and saves in state
    const fetchCoupons = async () => {
        const res = await getAllCoupons();
        setCouopons(res);
    };

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
                            <Route
                                index
                                element={
                                    <CouponsList fetchCoupons={fetchCoupons} coupons={coupons} />
                                }
                            />
                            <Route
                                path="coupon-add"
                                element={
                                    <NewCoupon
                                        fetchCoupons={fetchCoupons}
                                        loggedInUser={loggedInUser}
                                    />
                                }
                            />
                            <Route path="reports" element={<>asdasd</>} />
                            <Route path="coupon-edit/:couponId" element={<div>Edit Coupon</div>} />
                            <Route path="user-add" element={<AddUser />} />
                        </Route>
                        <Route path="/redeem-coupon" element={<RedeemCoupon />} />
                    </Routes>
                </BrowserRouter>
                <ToastContainer position="bottom-right" />
            </NotificationContext.Provider>
        </MantineProvider>
    );
}
