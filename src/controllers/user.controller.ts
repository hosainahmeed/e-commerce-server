import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { codeGenerator } from "../utils/codeGenerator.js";
import { validateFields } from "../utils/validateFields.js";

const createUser = asyncHandler(async (req, res) => {
    try {
        const payload = req.body
        validateFields(payload, ['name', 'email', 'password'])
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            throw new ApiError(400, "Email address you are trying to use is already taken by another account")
        }
        const { code, expiredAt } = codeGenerator(3)
        await User.create()
    } catch (error) {

    }
})

export {
    createUser
}