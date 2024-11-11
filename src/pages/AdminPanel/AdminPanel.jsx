import React from "react";
import { AdminNav } from "../../components/AdminNav/AdminNav";
import styles from "./AdminPanel.module.css";
import { Outlet } from "react-router-dom";

export default function AdminPanel({ loggedInUser }) {
    return (
        <div className={styles.container}>
            <div className={styles.navContainer}>
                <AdminNav loggedInUser={loggedInUser} />
            </div>
            <div className={styles.pageContainer}>
                <Outlet />
            </div>
        </div>
    );
}
