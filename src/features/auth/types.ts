export type LoginFormValues = {
  username: string;
  password: string;
};

export type SignupFormValues = LoginFormValues & {
  nickname: string;
};
