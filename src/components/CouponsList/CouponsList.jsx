import { Button, Table } from "@mantine/core";
import { IconX, IconCheck, IconCurrencyShekel, IconPercentage } from "@tabler/icons-react";
import styles from "./CouponsList.module.css";

export default function CouponstList({ coupons }) {
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
                    <Table.Tr>
                        <Table.Td>{coupon.createdAt.toLocaleDateString()}</Table.Td>
                        <Table.Td>{coupon.code}</Table.Td>
                        <Table.Td>{coupon.description}</Table.Td>
                        <Table.Td>
                            {coupon.amount}
                            {coupon.byPercentage ? (
                                <IconPercentage size={12} />
                            ) : (
                                <IconCurrencyShekel size={12} />
                            )}
                        </Table.Td>
                        <Table.Td>
                            {coupon.hasExpirationDate ? (
                                coupon.expirationDate.toLocaleDateString()
                            ) : (
                                <IconX color="red" size={14}></IconX>
                            )}
                        </Table.Td>
                        <Table.Td>
                            {coupon.isStackable ? (
                                <IconCheck color="green" size={14}></IconCheck>
                            ) : (
                                <IconX color="red" size={14}></IconX>
                            )}
                        </Table.Td>
                        <Table.Td>{coupon.isLimited ? coupon.usesLeft : "Unlimited"}</Table.Td>
                        <Table.Td>
                            <div className={styles.actionBtnsContainer}>
                                <Button color="red">Delete</Button>
                                <Button>Edit</Button>
                            </div>
                        </Table.Td>
                    </Table.Tr>
                ))}
            </Table.Tbody>
        </Table>
    );
}
