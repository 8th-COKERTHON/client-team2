# 적재적소

적재적소는 사용자가 저장해두고 잊어버린 링크를 다시 확인하고, 학습 기록으로 이어갈 수 있도록 돕는 모바일 중심 PWA입니다.

서비스 흐름은 다음 세 가지 키워드를 기준으로 설계했습니다.

- 摘: 잊힌 배움을 다시 찾아내기
- 積: 꾸준히 지식을 쌓기
- 績: 배움을 실제 성과로 연결하기

## 주요 기능

- 회원가입, 로그인, 회원가입 완료 화면
- 홈 화면
  - 오늘 확인할 북마크 표시
  - 점수/달성률 표시
  - 태그별 컬렉션 표시
  - 북마크 검색 및 검색 결과/빈 상태 표시
- 북마크 저장
  - URL, 제목, 설명, 리마인드 날짜 입력
  - 해시태그 최대 5개 추가
  - 기본 체크리스트 `링크 열람하기` 제공
- 북마크 상세
  - 링크 열람 처리
  - 체크리스트 생성, 수정, 완료 처리
  - 북마크 수정 및 삭제
- 태그별 컬렉션 상세
  - 링크 열람 여부에 따른 정렬
  - 삭제 모드와 삭제 확인 팝업
- 알림
  - 알림 목록 화면
  - 빈 알림 화면
  - Web Push 권한 요청 모달
  - Push Subscription 등록/해제 API 연동
- PWA
  - Service Worker 자동 업데이트
  - Web Push 수신 worker 연결
  - 앱 설치용 manifest 생성

## 기술 스택

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- React Router
- Zustand
- React Compiler
- vite-plugin-pwa

## 프로젝트 구조

```txt
src/
├── app/                 # 라우터 등 앱 전역 구성
├── assets/              # 폰트, 캐릭터 이미지
├── components/          # 공통 UI와 레이아웃 컴포넌트
├── constants/           # 라우트 상수
├── features/            # auth, home, link, notification, user 기능 코드
├── lib/                 # 환경 변수 등 공통 설정
├── pages/               # 라우트 단위 페이지
├── services/            # API 클라이언트, 토큰, Push 서비스
├── utils/               # 공통 유틸리티
└── main.tsx
```

## 시작하기

### 설치

```bash
npm install
```

### 환경 변수

클라이언트 API Base URL은 `VITE_API_BASE_URL`로 설정합니다.
값이 없으면 기본값으로 `https://cokerthon-team2.p-e.kr`를 사용합니다.

```bash
VITE_API_BASE_URL=https://cokerthon-team2.p-e.kr
```

### 개발 서버

```bash
npm run dev
```

### 프로덕션 빌드

```bash
npm run build
```

### 빌드 결과 확인

```bash
npm run preview
```

## 스크립트

| 명령어                 | 설명                                  |
| ---------------------- | ------------------------------------- |
| `npm run dev`          | Vite 개발 서버 실행                   |
| `npm run build`        | TypeScript 빌드 후 Vite 프로덕션 빌드 |
| `npm run lint`         | ESLint 검사                           |
| `npm run preview`      | 빌드 결과 미리보기                    |
| `npm run format`       | Prettier 포맷 적용                    |
| `npm run format:check` | Prettier 포맷 검사                    |

## API 연동

공통 API 요청은 `src/services/apiClient.ts`에서 관리합니다.

- Base URL: `src/lib/env.ts`
- Access Token 저장/조회: `src/services/authTokenStorage.ts`
- 401 또는 Access Token 오류 발생 시 토큰을 정리하고 로그인 화면으로 이동
- 기능별 API는 각 feature 내부에 분리

주요 API 위치:

- 인증: `src/features/auth/api/authApi.ts`
- 홈: `src/features/home/api/getHome.ts`
- 북마크: `src/features/link/api/bookmarkApi.ts`
- 체크리스트: `src/features/link/api/checklistApi.ts`
- 알림: `src/features/notification/api/getNotifications.ts`
- 푸시 구독: `src/services/pushApi.ts`
- 사용자 성적표: `src/features/user/api/userApi.ts`

## PWA와 푸시 알림

PWA 설정은 `vite.config.ts`의 `VitePWA` 플러그인에서 관리합니다.

- `display: "standalone"`으로 모바일 앱처럼 실행
- `registerType: "autoUpdate"`로 Service Worker 자동 업데이트
- `public/push-worker.js`를 Workbox `importScripts`로 연결
- Web Push 권한 요청 후 VAPID public key를 받아 Push Subscription 등록

푸시 알림 관련 흐름:

1. 홈 진입 시 권한 안내 모달 표시
2. 사용자가 허용 버튼 클릭
3. 브라우저 알림 권한 요청
4. Service Worker 준비
5. Push Subscription 생성
6. `/api/push/subscriptions`로 구독 정보 저장
7. 백엔드에서 Web Push 발송
8. `push-worker.js`에서 알림 표시

## 라우팅

라우트 상수는 `src/constants/routes.ts`에서 관리하고, 실제 라우팅은 `src/app/router.tsx`에 정의합니다.

주요 화면:

- `/`: 홈
- `/splash`: 스플래시
- `/auth`: 회원가입/로그인 진입
- `/login`: 로그인
- `/signup`: 회원가입
- `/signup/complete`: 회원가입 완료
- `/links/new`: 북마크 저장
- `/links/:linkId`: 북마크 상세
- `/links/:linkId/edit`: 북마크 수정
- `/collections/:tagId`: 태그별 컬렉션 상세
- `/notifications`: 알림
- `/my`: 마이페이지

## 디자인 기준

모바일 PWA를 기준으로 Figma 디자인을 구현했습니다.

- 화면 최대 너비는 모바일 앱 기준으로 제한
- 하단 네비게이션은 홈, 북마크 추가, 마이페이지 흐름 제공
- 상단 iOS status bar용 고정 여백은 PWA 화면에서 과하게 남지 않도록 제거
- 피그마의 색상, 간격, 아이콘, 카드 형태를 우선 반영

## 현재 참고 사항

- 백엔드 API 명세에 맞춰 대부분의 주요 화면 API 연결이 진행되어 있습니다.
- 일부 fallback 데이터와 localStorage 기반 보조 로직은 API 실패 또는 개발 확인용으로 남아 있습니다.
- Web Share Target은 `vite.config.ts`에 주석으로 준비되어 있으며, 실제 활성화는 공유 플로우 확정 후 진행합니다.
- 실제 모바일 Push 수신은 HTTPS 배포 환경, 브라우저 권한, 백엔드 Web Push 발송 상태가 모두 맞아야 확인할 수 있습니다.
