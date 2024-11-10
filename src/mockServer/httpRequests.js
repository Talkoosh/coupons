import { users } from "./data";

export const login = async (payload) => {
    const { username, password } = payload;
    if (users.find((user) => user.username === username && user.password === password)) {
        return {
            message: "Login Successful",
            code: 200,
        };
    } else {
        throw {
            message: "User not found",
            code: 404,
        };
    }
};
