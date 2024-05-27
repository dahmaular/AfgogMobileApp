export type ChangePasswordRequest = {
  currentPassword: string;
  newPassword: string;
};

export type ChangePasswordResponse = {
  isSuccess: boolean;
  value: string;
  error: null;
  responseCode: string;
  responseDescription: string;
};
