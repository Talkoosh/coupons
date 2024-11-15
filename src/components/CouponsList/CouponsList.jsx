import { Button, Table, Modal } from "@mantine/core";
import { IconX, IconCheck, IconCurrencyShekel, IconPercentage } from "@tabler/icons-react";
import styles from "./CouponsList.module.css";
import { useContext, useState } from "react";
import { NotificationContext } from "../../App";
import { deleteCoupon } from "../../mockServer/httpRequests";
import { useDisclosure } from "@mantine/hooks";
import EditCoupon from "../EditCoupon/EditCoupon";

export default function CouponstList({ page, coupons, fetchCoupons }) {
    const { notifyError, notifySuccess } = useContext(NotificationContext);

    const [editModalOpen, { open, close }] = useDisclosure(false);

    const [couponToEdit, setCouponToEdit] = useState(null);

    const onDeleteCoupon = async (couponId) => {
        try {
            const res = await deleteCoupon(couponId);
            notifySuccess(res.message);
            // Fetch updated coupons from mock server after deleting a coupon
            fetchCoupons();
        } catch (error) {
            console.log(error);
            notifyError(error.message);
        }
    };

    return (
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Created At</Table.Th>
                    <Table.Th>Code</Table.Th>
                    <Table.Th>Description</Table.Th>
                    <Table.Th>Amount</Table.Th>
                    <Table.Th>Expiration Date</Table.Th>
                    <Table.Th>Can Be Stacked</Table.Th>
                    <Table.Th>Uses Left</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {coupons.map((coupon) => (
                    <Table.Tr key={coupon.id}>
                        <Table.Td>{coupon.createdAt.toLocaleDateString()}</Table.Td>
                        <Table.Td>{coupon.code}</Table.Td>
                        <Table.Td>{coupon.description}</Table.Td>
                        <Table.Td>
                            {coupon.amount}
                            {coupon.byPercentage ? <IconPercentage size={12} /> : <IconCurrencyShekel size={12} />}
                        </Table.Td>
                        <Table.Td>
                            {coupon.hasExpirationDate ? coupon.expirationDate.toLocaleDateString() : <IconX color="red" size={14}></IconX>}
                        </Table.Td>
                        <Table.Td>
                            {coupon.isStackable ? <IconCheck color="green" size={14}></IconCheck> : <IconX color="red" size={14}></IconX>}
                        </Table.Td>
                        <Table.Td>{coupon.isLimited ? coupon.usesLeft : "Unlimited"}</Table.Td>

                        {/* Only show edit and delete action buttons if CouponsList was not rendered from reports page */}
                        {page !== "reports" ? (
                            <Table.Td>
                                <div className={styles.actionBtnsContainer}>
                                    <Button
                                        onClick={() => {
                                            onDeleteCoupon(coupon.id);
                                        }}
                                        color="red"
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setCouponToEdit(coupon);
                                            open();
                                        }}
                                    >
                                        Edit
                                    </Button>
                                </div>
                            </Table.Td>
                        ) : (
                            ""
                        )}
                    </Table.Tr>
                ))}
            </Table.Tbody>

            {/* Edit coupon modal */}
            <Modal opened={editModalOpen} onClose={close} title="Edit Coupon" centered>
                <EditCoupon fetchCoupons={fetchCoupons} close={close} coupon={couponToEdit} />
            </Modal>
        </Table>
    );
}
