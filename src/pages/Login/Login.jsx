import { Button, Checkbox, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";

// Login page for admins
export default function Login() {
    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            username: "",
            password: "",
        },
    });

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={form.onSubmit((values) => console.log(values))}>
                <TextInput
                    style={{ width: "300px" }}
                    withAsterisk
                    label="Username"
                    placeholder="Johnny"
                    key={form.key("username")}
                    {...form.getInputProps("username")}
                />
                <TextInput
                    style={{ width: "300px" }}
                    withAsterisk
                    label="Password"
                    placeholder="123456"
                    key={form.key("password")}
                    {...form.getInputProps("password")}
                />

                <Group justify="flex-end" mt="md">
                    <Button type="submit" color="green">
                        Login
                    </Button>
                </Group>
                <Link to="/user">
                    <Button>Enter coupon</Button>
                </Link>
            </form>
        </div>
    );
}
