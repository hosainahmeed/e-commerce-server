import ApiError from "./ApiError.js";

export const validateFields = (payload: any, requiredFields: any) => {
  if (!payload)
    throw new ApiError(400, `Request body is required`);

  for (const field of requiredFields)
    if (!payload[field])
      throw new ApiError(400, `${field} is required`);
};

