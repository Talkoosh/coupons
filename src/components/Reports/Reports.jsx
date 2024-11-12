import { Select } from "@mantine/core";
import { useEffect, useState } from "react";
import styles from "./Reports.module.css";
import { DateTimePicker } from "@mantine/dates";
import CouponstList from "../CouponsList/CouponsList";

export default function Reports({ coupons, users }) {
    const [sortedCoupons, setSortedCoupons] = useState([...coupons]);
    console.log("🚀 ~ Reports ~ sortedCoupons:", sortedCoupons);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    useEffect(() => {
        let couponsToSort = [...coupons];

        if (selectedUserId) {
            console.log("🚀 ~ useEffect ~ selectedUserId:", selectedUserId);
            couponsToSort = couponsToSort.filter((coupon) => coupon.userId === selectedUserId);
        }

        if (fromDate) {
            couponsToSort = couponsToSort.filter((coupon) => coupon.createdAt > fromDate);
        }

        if (toDate) {
            couponsToSort = couponsToSort.filter((coupon) => coupon.createdAt < toDate);
        }

        setSortedCoupons(couponsToSort);
    }, [selectedUserId, fromDate, toDate]);

    return (
        <div className={styles.container}>
            <Select
                style={{ width: "300px" }}
                label="Sort by user"
                placeholder="Choose User"
                value={selectedUserId || null}
                data={users.map((user) => ({ value: user.id, label: user.username }))}
                onChange={(value) => setSelectedUserId(value)}
            />
            <DateTimePicker
                style={{ width: "300px" }}
                clearable
                valueFormat="DD MMM YYYY hh:mm A"
                label="From:"
                placeholder="From"
                onChange={setFromDate}
            />
            <DateTimePicker
                style={{ width: "300px" }}
                clearable
                valueFormat="DD MMM YYYY hh:mm A"
                label="To:"
                placeholder="To"
                onChange={setToDate}
            />
            <div>
                <CouponstList page={"reports"} coupons={sortedCoupons} />
            </div>
        </div>
    );
}
