import type { LoginFormValues, SignupFormValues } from "@/features/auth/types";

export async function login(values: LoginFormValues): Promise<void> {
  void values;
  // TODO: Connect to the backend login API after the auth endpoint is ready.
}

export async function signup(values: SignupFormValues): Promise<void> {
  void values;
  // TODO: Connect to the backend signup API after the auth endpoint is ready.
}
