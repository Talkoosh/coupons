import React from "react";
import { AdminNav } from "../../components/AdminNav/AdminNav";
import styles from "./AdminPanel.module.css";
import { Outlet } from "react-router-dom";

export default function AdminPanel({ loggedInUser }) {
    return (
        <div className={styles.container}>
            <AdminNav loggedInUser={loggedInUser} />
            <Outlet />
        </div>
    );
}
