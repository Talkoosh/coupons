import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import styles from "./AddUser.module.css";
import { useContext } from "react";
import { NotificationContext } from "../../App";
import { addUser } from "../../mockServer/httpRequests";

export default function AddUser({ fetchUsers }) {
    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            username: "",
            password: "",
        },
    });
    const { notifySuccess, notifyError } = useContext(NotificationContext);

    const onAddUser = async (formValues) => {
        try {
            // Alert user if either username or password were not provided
            if (!formValues.username || !formValues.password) {
                notifyError("Username and password must be provided!");
                return;
            }

            // Attempt to add resource and alert user accordingly
            const res = await addUser(formValues);
            notifySuccess(res.message);

            // Reset form values if successful and re-fetch users
            form.reset();
            fetchUsers();
        } catch (error) {
            notifyError(error.message);
            console.log(error);
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={form.onSubmit((values) => onAddUser(values))}>
                <TextInput
                    style={{ width: "300px" }}
                    label="Username"
                    placeholder="Johnny"
                    key={form.key("username")}
                    {...form.getInputProps("username")}
                />
                <PasswordInput
                    style={{ width: "300px" }}
                    label="Password"
                    placeholder="Password"
                    key={form.key("password")}
                    {...form.getInputProps("password")}
                />
                <Button type="submit" color="green">
                    Add User
                </Button>
            </form>
        </div>
    );
}
