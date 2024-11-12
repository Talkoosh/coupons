import { useState } from "react";
import styles from "./RedeemCoupon.module.css";
import { IconCurrencyShekel } from "@tabler/icons-react";
import { Button, TextInput } from "@mantine/core";
import { useContext } from "react";
import { NotificationContext } from "../../App";
import { editCoupon, getCoupon } from "../../mockServer/httpRequests";

export default function RedeemCoupon() {
    const [nonStackableUsed, setNonStackableUsed] = useState(false);
    const [usedCoupons, setUsedCoupons] = useState([]);
    const [total, setTotal] = useState(100);
    const [couponCode, setCouponCode] = useState("");
    const { notifySuccess, notifyError } = useContext(NotificationContext);

    const onRedeemCoupon = async () => {
        try {
            // Check if coupon was already used
            if (usedCoupons.find((code) => code === couponCode)) {
                notifyError("Coupon already used");
                return;
            }

            // Alert user if coupons can't be stacked
            if (nonStackableUsed) {
                notifyError("Coupons can't be stacked with coupon " + usedCoupons[0]);
                return;
            }

            // Fetch coupon from server
            const res = await getCoupon(couponCode);
            const coupon = res.data;

            // Check if coupon can be stacked
            if (!coupon.isStackable) {
                if (usedCoupons.length) {
                    notifyError("Coupon can't be stacked");
                    return;
                } else {
                    setNonStackableUsed(true);
                }
            }

            // Coupon passed all checks - redeem it
            setTotal((prevTotal) => {
                let newTotal = coupon.byPercentage
                    ? prevTotal * (1 - coupon.amount / 100)
                    : prevTotal - coupon.amount;

                if (newTotal < 0) {
                    newTotal = 0;
                }
                return newTotal;
            });

            // Store coupon code in usedCoupons list
            setUsedCoupons((prevUsedCoupons) => [...prevUsedCoupons, coupon.code]);

            // Decrease coupon uses if it's limited
            if (coupon.isLimited) {
                const updatedCoupon = { ...coupon, usesLeft: coupon.usesLeft - 1 };
                await editCoupon(updatedCoupon);
            }

            notifySuccess("Coupon redeemed - " + coupon.code);
            setCouponCode("");
        } catch (error) {
            notifyError(error.message);
            console.log(error);
        }
    };

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
            <Button onClick={onRedeemCoupon}>Redeem Coupon</Button>

            <ul className={styles.usedList}>
                Used Coupons:
                {usedCoupons.map((code) => (
                    <li>{code}</li>
                ))}
            </ul>
        </div>
    );
}
