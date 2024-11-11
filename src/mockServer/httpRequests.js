import { coupons, users } from "./data";

// Mock functions for server requests:

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

export const addCoupon = async (payload) => {
    await mimicDelay();

    // Check if coupon already exists based on coupon code
    const existingCoupon = coupons.find((coupon) => coupon.code === payload.code);
    if (existingCoupon) {
        throw {
            message: "Coupon with the same code already exists",
            code: 409,
        };
    }

    // Add coupon
    coupons.push(payload);
    return {
        message: "Coupon added successfuly!",
        code: 201,
    };
};

export const getAllCoupons = async () => {
    await mimicDelay();
    return coupons;
};

//Mimic actual request delay
const mimicDelay = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 800);
    });
};
