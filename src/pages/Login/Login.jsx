import { Button, Checkbox, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import styles from "./Login.module.css";
import { login } from "../../mockServer/httpRequests";
import { useContext } from "react";
import { NotificationContext } from "../../App";
import { useNavigate } from "react-router-dom";

// Login page for admins
export default function Login({}) {
    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            username: "",
            password: "",
        },
    });
    const { notifySuccess, notifyError } = useContext(NotificationContext);
    const nav = useNavigate();

    const onLogin = async (formValues) => {
        try {
            // Mock server call to login
            const res = await login(formValues);
            notifySuccess(res.message);
            console.log(res);
            nav("/admin");
        } catch (error) {
            notifyError(error.message);
            console.log(error);
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={form.onSubmit((values) => onLogin(values))}>
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
            </form>
        </div>
    );
}
