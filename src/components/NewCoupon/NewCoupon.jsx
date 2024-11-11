import { useForm } from "@mantine/form";
import React from "react";

export default function NewCoupon({ loggedInUser }) {
    const form = useForm({
        mode: "uncontrollerd",
        initialValues: {
            code: "",
            description: "",
            userId: loggedInUser.id,
            byPercentage: false,
            expirationDate: null,
            isStackable: false,
            amount: 0,
            isLimited: false,
            usesLeft: 0,
        },
    });
    return <div>NewCoupon</div>;
}
