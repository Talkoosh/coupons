import { NotificationContext } from "../../App";
import { Button, NumberInput, Switch, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useContext } from "react";
import { IconPercentage, IconCurrencyShekel } from "@tabler/icons-react";
import { DateInput } from "@mantine/dates";
import styles from "./NewCoupon.module.css";
import { addCoupon } from "../../mockServer/httpRequests";

export default function NewCoupon({ loggedInUser, fetchCoupons }) {
    const { notifyError, notifySuccess } = useContext(NotificationContext);
    const form = useForm({
        mode: "controlled",
        initialValues: {
            userId: loggedInUser.id,
            code: "",
            description: "",
            byPercentage: false,
            amount: 0,
            hasExpirationDate: false,
            expirationDate: null,
            isStackable: false,
            isLimited: false,
            usesLeft: 0,
        },
    });

    const onAddCoupon = async (newCoupon) => {
        try {
            // Alert user if code or amount were not provideds
            if (!newCoupon.code || !newCoupon.amount) {
                notifyError("Code and Amount must be provided!");
                return;
            }

            if (newCoupon.amount < 0) {
                notifyError("Amount must be higher than 0");
                return;
            }

            // If coupon can't be expired reset expiration date
            if (!newCoupon.hasExpirationDate) {
                newCoupon.expirationDate = null;
            }
            // Notify user if expiration date has not been provided in case coupon should be expired
            else if (!newCoupon.expirationDate) {
                notifyError("Coupon has expiration date - it must be provided");
                return;
            }

            // If coupon is not limited reset uses left
            if (!newCoupon.isLimited) {
                newCoupon.usesLeft = 0;
            }
            // Notify user if uses left has not been provided in case coupon is limited
            else if (!newCoupon.usesLeft || newCoupon.usesLeft < 0) {
                notifyError("Coupon has limited uses - uses left field must be provided with at least 0");
                return;
            }

            // Add creation date and time to coupon
            newCoupon.createdAt = new Date();

            // Create coupon and alert user
            const res = await addCoupon(newCoupon);
            notifySuccess(res.message);

            // Reset form values
            form.reset();

            // Re-fetch coupons so state is always updated
            fetchCoupons();
        } catch (error) {
            notifyError(error.message);
            console.log(error);
        }
    };
    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={form.onSubmit((values) => onAddCoupon(values))}>
                <TextInput style={{ width: "300px" }} label="Coupon Code" placeholder="SUMMER2024" {...form.getInputProps("code")} />

                <Textarea label="Coupon Description" placeholder="Summer Sale Coupon" {...form.getInputProps("description")} />

                {/* Container for amount inputs*/}
                <div>
                    <Switch label="Amount by percentage" {...form.getInputProps("byPercentage", { type: "checkbox" })} />
                    <div className={styles.amountContainer}>
                        <NumberInput
                            rightSection={form.getValues().byPercentage ? <IconPercentage /> : <IconCurrencyShekel />}
                            label="Amount"
                            placeholder="20"
                            {...form.getInputProps("amount")}
                        />
                    </div>
                </div>

                {/* Container for expiration date inputs */}
                <div>
                    <Switch label="Has expiration date" {...form.getInputProps("hasExpirationDate", { type: "checkbox" })} />
                    {form.getValues().hasExpirationDate ? (
                        <DateInput valueFormat="DD/MM/YYYY HH:mm:ss" label="Expiration Date" {...form.getInputProps("expirationDate")} />
                    ) : (
                        <></>
                    )}
                </div>

                <Switch label="Coupon can be stacked" {...form.getInputProps("isStackable", { type: "checkbox" })} />

                {/* Container for uses limit inputs */}
                <div>
                    <Switch label="Limit Uses" {...form.getInputProps("isLimited", { type: "checkbox" })} />
                    {form.getValues().isLimited ? <NumberInput label="Uses amount" placeholder="10" {...form.getInputProps("usesLeft")} /> : <></>}
                </div>

                <Button color="green" type="submit">
                    Add Coupon
                </Button>
            </form>
        </div>
    );
}
