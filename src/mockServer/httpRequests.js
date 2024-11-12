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
    users.push({ id: Date.now().toString(), username, password });
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

    // Add coupon and add ID based on current timestamp
    coupons.push({ id: Date.now(), ...payload });
    return {
        message: "Coupon added successfuly!",
        code: 201,
    };
};

export const getAllCoupons = async () => {
    await mimicDelay();
    return [...coupons];
};

export const deleteCoupon = async (couponToDeleteId) => {
    await mimicDelay();

    // Find coupon index in the array
    const couponIndex = coupons.findIndex((coupon) => coupon.id === couponToDeleteId);

    // If coupon wasn't found - throw error
    if (couponIndex < 0) {
        throw {
            message: "Could not find coupon to delete",
            code: 404,
        };
    }

    // Remove found index from array
    coupons.splice(couponIndex, 1);

    return {
        message: "Coupon Deleted Successfuly",
        code: 200,
    };
};

export const editCoupon = async (updatedCoupon) => {
    await mimicDelay();

    const couponIndex = coupons.findIndex((coupon) => coupon.id === updatedCoupon.id);

    // If coupon wasn't found - throw error
    if (couponIndex < 0) {
        throw {
            message: "Could not find coupon to update",
            code: 404,
        };
    }

    coupons.splice(couponIndex, 1, updatedCoupon);

    return {
        message: "Coupon updated successfuly",
        code: 204,
    };
};

export const getCoupon = async (code) => {
    await mimicDelay();

    const coupon = coupons.find((coupon) => coupon.code === code);

    if (!coupon) {
        throw {
            message: "Coupon not found",
            code: 404,
        };
    }

    // Check if the requested coupon is expired
    if (coupon.hasExpirationDate && new Date() > coupon.expirationDate) {
        throw {
            message: "Coupon expired",
            code: 400,
        };
    }

    // Check if the requested coupon can't be used
    if (coupon.isLimited && coupon.usesLeft <= 0) {
        throw {
            message: "No uses left for coupon",
            code: 400,
        };
    }

    return {
        data: coupon,
        code: 200,
    };
};

export const getAllUsers = async () => {
    await mimicDelay();
    return [...users];
};

// Mimic actual request delay
const mimicDelay = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 600);
    });
};
