import { users } from "./data";

//Mock login function
export const login = async (payload) => {
    await mimicDelay();

    const { username, password } = payload;
    const user = users.find(
        (user) => user.username === username && user.password === password
    );

    if (user) {
        return {
            message: "Login Successful",
            code: 200,
            data: user,
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
