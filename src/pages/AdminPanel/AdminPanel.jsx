import React from "react";
import { AdminNav } from "../../components/AdminNav/AdminNav";
import styles from "./AdminPanel.module.css";

export default function AdminPanel({ loggedInUser }) {
    return (
        <div className={styles.container}>
            <AdminNav loggedInUser={loggedInUser} />
        </div>
    );
}
