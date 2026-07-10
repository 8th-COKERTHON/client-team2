import { ApiError } from "@/services/apiClient";

type AuthErrorContext = "login" | "signup";

export function getAuthErrorMessage(
  error: unknown,
  context: AuthErrorContext,
): string {
  if (!(error instanceof ApiError)) {
    return "네트워크 상태를 확인한 뒤 다시 시도해 주세요.";
  }

  if (context === "login") {
    if (error.status === 400 || error.status === 401) {
      return "아이디 또는 비밀번호를 확인해 주세요.";
    }

    return "로그인에 실패했어요. 잠시 후 다시 시도해 주세요.";
  }

  if (error.status === 400) {
    return "입력한 회원가입 정보를 확인해 주세요.";
  }

  if (error.status === 409) {
    return "이미 사용 중인 아이디 또는 닉네임이에요.";
  }

  return "회원가입에 실패했어요. 잠시 후 다시 시도해 주세요.";
}
