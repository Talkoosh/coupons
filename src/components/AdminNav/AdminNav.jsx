import { useContext, useState } from "react";
import { Group } from "@mantine/core";
import { IconPlus, IconList, IconLogout, IconUser, IconReportAnalytics } from "@tabler/icons-react";
import classes from "./AdminNav.module.css";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "../../App";

// Options for Admin pages
const data = [
    { label: "All Coupons", icon: IconList, page: "" },
    { label: "New Coupon", icon: IconPlus, page: "/admin/coupon-add" },
    { label: "Add User", icon: IconUser, page: "/admin/user-add" },
    { label: "Reports", icon: IconReportAnalytics, page: "/admin/reports" },
];

// Admin navigation panel
export function AdminNav({ loggedInUser, setLoggedInUser }) {
    const [active, setActive] = useState("All Coupons");
    const nav = useNavigate();
    const { notifySuccess } = useContext(NotificationContext);

    // Array of links to Admin pages
    const links = data.map((item) => (
        <a
            className={classes.link}
            data-active={item.label === active || undefined}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
                nav(item.page);
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </a>
    ));

    return (
        <nav className={classes.navbar}>
            <div className={classes.navbarMain}>
                <Group className={classes.header} justify="space-between">
                    <h1>Welcome, {loggedInUser.username} </h1>
                </Group>
                {links}
            </div>

            <div className={classes.footer}>
                <a
                    className={classes.link}
                    onClick={(event) => {
                        event.preventDefault();
                        setLoggedInUser(null);
                        notifySuccess("Logged out successfuly");
                        nav("/");
                    }}
                >
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Logout</span>
                </a>
            </div>
        </nav>
    );
}
