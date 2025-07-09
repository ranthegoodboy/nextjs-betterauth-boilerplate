export type ActionResponse<T> = {
  data: T | null;
  error: string | null;
  success: boolean;
};

export type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  success: boolean;
  status: number;
};
