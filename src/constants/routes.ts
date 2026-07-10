export const ROUTES = {
  home: "/",
  splash: "/splash",
  authEntry: "/auth",
  login: "/login",
  signup: "/signup",
  signupComplete: "/signup/complete",
  linkCreate: "/links/new",
  linkDetail: (linkId: string) => `/links/${linkId}`,
  linkEdit: (linkId: string) => `/links/${linkId}/edit`,
  collectionDetail: (tagId: string) => `/collections/${tagId}`,
  myPage: "/my",
  notifications: "/notifications",
} as const;
