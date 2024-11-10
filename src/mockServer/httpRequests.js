import { users } from "./data";

//Mock login function
export const login = async (payload) => {
    await mimicDelay();
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

//Mimic actual request delay
const mimicDelay = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 800); // Resolves after `ms` milliseconds
    });
};
