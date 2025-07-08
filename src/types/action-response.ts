export type ActionResponse<T> = {
  data?: T;
  error?: string | null;
  success: boolean;
};
