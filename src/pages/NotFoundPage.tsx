import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">페이지를 찾을 수 없습니다.</h1>

      <Link className="underline" to="/">
        홈으로 이동
      </Link>
    </main>
  );
}
