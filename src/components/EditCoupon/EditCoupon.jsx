import React, { useContext } from "react";
import styles from "./EditCoupon.module.css";
import { Button, NumberInput, Switch, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { IconCurrencyShekel, IconPercentage } from "@tabler/icons-react";
import { NotificationContext } from "../../App";
import { editCoupon } from "../../mockServer/httpRequests";

export default function EditCoupon({ coupon, close, fetchCoupons }) {
    const { notifyError, notifySuccess } = useContext(NotificationContext);
    const form = useForm({
        mode: "controlled",
        initialValues: {
            id: coupon.id,
            createdAt: coupon.createdAt,
            userId: coupon.userId,
            code: coupon.code,
            description: coupon.description,
            byPercentage: coupon.byPercentage,
            amount: coupon.amount,
            hasExpirationDate: coupon.hasExpirationDate,
            expirationDate: coupon.expirationDate,
            isStackable: coupon.isStackable,
            isLimited: coupon.isLimited,
            usesLeft: coupon.usesLeft,
        },
    });

    const onEditCoupon = async (updatedCoupon) => {
        try {
            // Alert user if code or amount were not provideds
            if (!updatedCoupon.code || !updatedCoupon.amount) {
                notifyError("Code and Amount must be provided!");
                return;
            }

            // Reset values if they're not necessary
            if (!updatedCoupon.hasExpirationDate) {
                updatedCoupon.expirationDate = null;
            }
            if (!updatedCoupon.isLimited) {
                updatedCoupon.usesLeft = 0;
            }

            // Update coupon and notify user
            const res = await editCoupon(updatedCoupon);
            notifySuccess(res.message);

            // Re-fetch coupons and close edit modal
            await fetchCoupons();
            close();
        } catch (error) {
            notifyError(error.message);
            console.log(error);
        }
    };

    return (
        <div>
            <form
                className={styles.form}
                onSubmit={form.onSubmit((values) => onEditCoupon(values))}
            >
                <TextInput
                    style={{ width: "300px" }}
                    label="Coupon Code"
                    placeholder="SUMMER2024"
                    {...form.getInputProps("code")}
                />
                <Textarea
                    label="Coupon Description"
                    placeholder="Summer Sale Coupon"
                    {...form.getInputProps("description")}
                />
                {/* Container for amount inputs*/}
                <div>
                    <Switch
                        label="Amount by percentage"
                        {...form.getInputProps("byPercentage", { type: "checkbox" })}
                    />
                    <div className={styles.amountContainer}>
                        <NumberInput
                            rightSection={
                                form.getValues().byPercentage ? (
                                    <IconPercentage />
                                ) : (
                                    <IconCurrencyShekel />
                                )
                            }
                            label="Amount"
                            placeholder="20"
                            {...form.getInputProps("amount")}
                        />
                    </div>
                </div>

                {/* Container for expiration date inputs */}
                <div>
                    <Switch
                        label="Has expiration date"
                        {...form.getInputProps("hasExpirationDate", { type: "checkbox" })}
                    />
                    {form.getValues().hasExpirationDate ? (
                        <DateInput
                            label="Expiration Date"
                            {...form.getInputProps("expirationDate")}
                        />
                    ) : (
                        <></>
                    )}
                </div>

                <Switch
                    label="Coupon can be stacked"
                    {...form.getInputProps("isStackable", { type: "checkbox" })}
                />

                {/* Container for uses limit inputs */}
                <div>
                    <Switch
                        label="Limit Uses"
                        {...form.getInputProps("isLimited", { type: "checkbox" })}
                    />
                    {form.getValues().isLimited ? (
                        <NumberInput
                            label="Uses amount"
                            placeholder="10"
                            {...form.getInputProps("usesLeft")}
                        />
                    ) : (
                        <></>
                    )}
                </div>

                <Button type="submit">Update Coupon</Button>
            </form>
        </div>
    );
}
