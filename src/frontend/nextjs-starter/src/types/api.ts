export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface HelloResponse {
  message: string;
  timestamp: string;
  version: string;
}

export interface ErrorResponse {
  error: string;
  statusCode: number;
  message: string;
}
