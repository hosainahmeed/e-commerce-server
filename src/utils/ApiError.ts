export default class ApiError extends Error {
  public statusCode: number;
  public status: string;
  public isOperational: boolean;
  public errors?: unknown;

  constructor(statusCode: number, message: string, errors?: unknown, stack?: string) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace?.(this, this.constructor);
    }

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
