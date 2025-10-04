export type ApiResponse<T> =
  | {
      success: true;
      data: T;
      error: null;
    }
  | {
      success: false;
      error: string;
      data: null;
    };

export const success = <T>(data: T): ApiResponse<T> => {
  return { success: true, data, error: null };
};

export const failure = <T>(error: string): ApiResponse<T> => {
  return { success: false, data: null, error };
};
