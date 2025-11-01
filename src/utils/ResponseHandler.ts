import { Response } from "express";

export interface ApiMeta {
  page?: number;
  limit?: number;
  total?: number;
  [key: string]: unknown;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  meta?: ApiMeta;
}

export interface SendResponseParams<T> extends ApiResponse<T> {
  statusCode?: number;
}

export function sendResponse<T>(
  res: Response,
  { statusCode = 200, success, message, data, meta }: SendResponseParams<T>
): Response<ApiResponse<T>> {
  return res.status(statusCode).json({ success, message, data, meta });
}

export default sendResponse;
