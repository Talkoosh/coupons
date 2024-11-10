import React from "react";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import Login from "./pages/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
export default function App() {
    return (
        <MantineProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/user" element={<div>TBD</div>} />
                </Routes>
            </BrowserRouter>
        </MantineProvider>
    );
}
