export type userLoginData = {
  email: string;
  password: string;
};

export type userRegisterData = userLoginData & {
  confirmPassword: string;
};

export type TokenPayload = {
  userId: number;
  email: string;
};
