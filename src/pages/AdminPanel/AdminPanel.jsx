import React from "react";
import { AdminNav } from "../../components/AdminNav/AdminNav";
import styles from "./AdminPanel.module.css";
import { Outlet } from "react-router-dom";

// Main admin panel page
export default function AdminPanel({ loggedInUser, setLoggedInUser }) {
    return (
        <div className={styles.container}>
            <div className={styles.navContainer}>
                <AdminNav setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />
            </div>
            <div className={styles.pageContainer}>
                <Outlet />
            </div>
        </div>
    );
}
