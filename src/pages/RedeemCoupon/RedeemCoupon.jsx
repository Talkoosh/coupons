import { useState } from "react";
import styles from "./RedeemCoupon.module.css";
import { IconCurrencyShekel } from "@tabler/icons-react";
import { Button, TextInput } from "@mantine/core";
import { useContext } from "react";
import { NotificationContext } from "../../App";

export default function RedeemCoupon() {
    const [total, setTotal] = useState(100);
    const [couponCode, setCouponCode] = useState("");
    const { notifySuccess, notifyError } = useContext(NotificationContext);

    const redeemCoupon = async () => {};

    return (
        <div className={styles.container}>
            <h2>
                Cart Total: {total}
                <IconCurrencyShekel size={18} />
            </h2>
            <TextInput
                label="Coupon Code"
                value={couponCode}
                onChange={(event) => setCouponCode(event.target.value)}
            />
            <Button onClick={redeemCoupon}>Redeem Coupon</Button>
        </div>
    );
}
