import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { ROUTES } from "@/constants/routes";
import { signup } from "@/features/auth/api/authApi";
import { AuthButton } from "@/features/auth/components/AuthButton";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { AuthTextField } from "@/features/auth/components/AuthTextField";
import { LogoPlaceholder } from "@/features/auth/components/LogoPlaceholder";
import type { SignupFormValues } from "@/features/auth/types";

const INITIAL_FORM_VALUES: SignupFormValues = {
  username: "",
  password: "",
  nickname: "",
};

export function SignupPage() {
  const navigate = useNavigate();
  const [formValues, setFormValues] =
    useState<SignupFormValues>(INITIAL_FORM_VALUES);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit =
    formValues.username.trim().length > 0 &&
    formValues.password.trim().length > 0 &&
    formValues.nickname.trim().length > 0 &&
    !isSubmitting;

  const handleChange =
    (field: keyof SignupFormValues) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
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
      await signup({
        username: formValues.username.trim(),
        password: formValues.password,
        nickname: formValues.nickname.trim(),
      });
      navigate(ROUTES.signupComplete);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <section className="flex flex-col items-start gap-2">
        <LogoPlaceholder />
        <h1 className="typo-kr-heading-semibold text-grayscale-900">
          회원가입
        </h1>
      </section>

      <form
        className="mt-[42px] flex flex-col"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="flex flex-col gap-4">
          <AuthTextField
            id="signup-username"
            label="아이디"
            value={formValues.username}
            onChange={handleChange("username")}
            placeholder="아이디를 입력해주세요."
            autoComplete="username"
          />
          <AuthTextField
            id="signup-password"
            label="비밀번호"
            value={formValues.password}
            onChange={handleChange("password")}
            placeholder="비밀번호를 입력해주세요."
            type="password"
            autoComplete="new-password"
          />
          <AuthTextField
            id="signup-nickname"
            label="닉네임"
            value={formValues.nickname}
            onChange={handleChange("nickname")}
            placeholder="닉네임을 입력해주세요."
            autoComplete="nickname"
          />
        </div>

        <div className="typo-kr-detail-medium mt-6 flex gap-[7px] px-1">
          <span className="text-grayscale-300">계정이 있으신가요?</span>
          <Link to={ROUTES.login} className="typo-kr-detail-semibold text-main">
            로그인
          </Link>
        </div>

        <div className="absolute right-4 bottom-[56px] left-4">
          <AuthButton type="submit" disabled={!canSubmit}>
            {isSubmitting ? "가입 중" : "회원가입"}
          </AuthButton>
        </div>
      </form>
    </AuthLayout>
  );
}
