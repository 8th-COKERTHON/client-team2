import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { ROUTES } from "@/constants/routes";
import { login } from "@/features/auth/api/authApi";
import { AuthButton } from "@/features/auth/components/AuthButton";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { AuthTextField } from "@/features/auth/components/AuthTextField";
import { LogoPlaceholder } from "@/features/auth/components/LogoPlaceholder";
import type { LoginFormValues } from "@/features/auth/types";
import { getAuthErrorMessage } from "@/features/auth/utils";

const INITIAL_FORM_VALUES: LoginFormValues = {
  username: "",
  password: "",
};

export function LoginPage() {
  const navigate = useNavigate();
  const [formValues, setFormValues] =
    useState<LoginFormValues>(INITIAL_FORM_VALUES);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = useState("");

  const canSubmit =
    formValues.username.trim().length > 0 &&
    formValues.password.trim().length > 0 &&
    !isSubmitting;

  const handleChange =
    (field: keyof LoginFormValues) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setSubmitErrorMessage("");
      setFormValues((prevValues) => ({
        ...prevValues,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitErrorMessage("");
      await login({
        username: formValues.username.trim(),
        password: formValues.password,
      });
      navigate(ROUTES.home);
    } catch (error) {
      setSubmitErrorMessage(getAuthErrorMessage(error, "login"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <section className="flex flex-col items-start gap-2">
        <LogoPlaceholder size="sm" />
        <h1 className="typo-kr-heading-semibold text-grayscale-900">로그인</h1>
      </section>

      <form
        className="mt-[42px] flex flex-col"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="flex flex-col gap-4">
          <AuthTextField
            id="login-username"
            label="아이디"
            value={formValues.username}
            onChange={handleChange("username")}
            placeholder="아이디를 입력해주세요."
            autoComplete="username"
          />
          <AuthTextField
            id="login-password"
            label="비밀번호"
            value={formValues.password}
            onChange={handleChange("password")}
            placeholder="비밀번호를 입력해주세요."
            type="password"
            autoComplete="current-password"
          />
        </div>

        <div className="typo-kr-detail-medium mt-6 flex gap-[7px] px-1">
          <span className="text-grayscale-300">계정이 없으신가요?</span>
          <Link
            to={ROUTES.signup}
            className="typo-kr-detail-semibold text-main"
          >
            회원가입
          </Link>
        </div>

        {submitErrorMessage ? (
          <p
            className="typo-kr-caption-medium mt-4 px-1 text-error"
            role="alert"
            aria-live="polite"
          >
            {submitErrorMessage}
          </p>
        ) : null}

        <div className="absolute right-4 bottom-[56px] left-4">
          <AuthButton type="submit" disabled={!canSubmit}>
            {isSubmitting ? "로그인 중" : "로그인"}
          </AuthButton>
        </div>
      </form>
    </AuthLayout>
  );
}
