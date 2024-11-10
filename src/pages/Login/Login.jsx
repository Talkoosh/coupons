import { Button, Group, TextInput, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import styles from "./Login.module.css";
import { login } from "../../mockServer/httpRequests";
import { useContext } from "react";
import { NotificationContext } from "../../App";
import { useNavigate } from "react-router-dom";

// Login page for admins
export default function Login({ setLoggedInUser }) {
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
            // Alert user if either username or password were not provided
            if (!formValues.username || !formValues.password) {
                notifyError("Username and password must be provided!");
                return;
            }
            // Mock server call to login
            const res = await login(formValues);
            // Set logged in user state to the found user
            setLoggedInUser(res.data);
            notifySuccess(res.message);
            // Navigate to the admin panel
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
                <PasswordInput
                    style={{ width: "300px" }}
                    withAsterisk
                    label="Password"
                    placeholder="123456"
                    key={form.key("password")}
                    {...form.getInputProps("password")}
                />

                <Group mt="md">
                    <Button type="submit" color="green">
                        Login
                    </Button>
                </Group>
            </form>
        </div>
    );
}
