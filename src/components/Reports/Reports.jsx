import { Button, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import styles from "./Reports.module.css";
import { DateTimePicker } from "@mantine/dates";
import CouponstList from "../CouponsList/CouponsList";
import * as XLSX from "xlsx";

export default function Reports({ coupons, users }) {
    const [sortedCoupons, setSortedCoupons] = useState([...coupons]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    // Sort coupons whenever a sort value changes
    useEffect(() => {
        let couponsToSort = [...coupons];

        if (selectedUserId) {
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

    // Create excel file with coupons data - using XLSX library
    const exportToExcelFile = () => {
        const worksheet = XLSX.utils.json_to_sheet(sortedCoupons);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Coupons");
        XLSX.writeFile(workbook, `"Coupons".xlsx`);
    };

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
            <CouponstList page={"reports"} coupons={sortedCoupons} />
            <Button className={styles.excelBtn} onClick={exportToExcelFile}>
                Export to excel
            </Button>
        </div>
    );
}
