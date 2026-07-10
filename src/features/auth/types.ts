export type LoginFormValues = {
  username: string;
  password: string;
};

export type SignupFormValues = LoginFormValues & {
  nickname: string;
};

export type LoginRequest = {
  loginId: string;
  password: string;
};

export type SignupRequest = LoginRequest & {
  nickname: string;
};

export type TokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export type MemberInfoResponse = {
  id: number;
  loginId: string;
  nickname: string;
  totalScore: number;
};
