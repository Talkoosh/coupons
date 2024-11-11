import { users } from "./data";

//Mock login function
export const login = async (payload) => {
    await mimicDelay();

    const { username, password } = payload;
    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
        return {
            message: "Login successful",
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

export const addUser = async (payload) => {
    await mimicDelay();

    const { username, password } = payload;
    // Checks if user with given username already exists
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
        throw {
            message: "User with this username already exists",
            code: 409,
        };
    }

    // Add user and generate id based on current timestamp
    users.push({ id: Date.now(), username, password });
    return {
        message: "User added successfuly!",
        code: 201,
    };
};

//Mimic actual request delay
const mimicDelay = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 800);
    });
};
