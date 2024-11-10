import { useState } from "react";
import { Group } from "@mantine/core";
import { IconPlus, IconList, IconLogout, IconPencil } from "@tabler/icons-react";
import classes from "./AdminNav.module.css";
import { useNavigate } from "react-router-dom";
const data = [
    { link: "", label: "All Coupons", icon: IconList, page: "" },
    { link: "", label: "New Coupon", icon: IconPlus, page: "/admin/coupon-add" },
];

export function AdminNav({ loggedInUser }) {
    const [active, setActive] = useState("All Coupons");
    const nav = useNavigate();

    const links = data.map((item) => (
        <a
            className={classes.link}
            data-active={item.label === active || undefined}
            href={item.link}
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
                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Logout</span>
                </a>
            </div>
        </nav>
    );
}
