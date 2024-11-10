import React from "react";
import { Button } from "@mantine/core";
import styles from "./MainPage.module.css";
import { Link } from "react-router-dom";

// Starting page - navigates to either login page for admin
// or enter coupon page for customers
export default function MainPage() {
    return (
        <div className={styles.container}>
            <Link to="/login">
                <Button className={styles.button} color="red">
                    I Am An Admin
                </Button>
            </Link>
            <Link to="/user">
                {/* TODO: NAVIGATE TO ENTER COUPON PAGE */}
                <Button className={styles.button}>I Am A Customer</Button>
            </Link>
        </div>
    );
}
