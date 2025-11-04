import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const createUser = asyncHandler(async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!(name || email || password)) {
            throw new ApiError(400, 'please provide all required fields')
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            throw new ApiError(400, "Email address you are trying to use is already taken by another account")
        }
        await User.create()
    } catch (error) {

    }
})

export {
    createUser
}