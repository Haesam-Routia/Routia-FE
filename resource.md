# Routia FE — API 연동 작업 로그

> 목표: "Routia-FE에서 실제 API(스펙/실서버)와 연동하고 자체 플로우 테스트를 돌린다."
> 작성: 2026-08-18 / 대상: 프론트 `LIKELION14th STUDY/Routia-FE`

---

## 1. 작업 정리 (한 일)

### 1-1. API 클라이언트 레이어 신규 (`src/api/`)
- `http.ts` — 공통 fetch 래퍼
  - baseURL 결정(`VITE_API_BASE_URL` → 전역 오버라이드 → `""`), 브라우저/Node 모두 방어
  - 로그인 시 `accessToken` 저장, 이후 `Authorization: Bearer` 자동 첨부
  - 성공 봉투 2종(`{success,data,message}` / raw)·오류 봉투 2종(`{code,message,fieldErrors}` / `{data:null,error}`) 정규화 → `ApiError`
  - `getCurrentUserId()` — JWT `sub` 디코드(atob)
- `types.ts` — enum(유니온) + 전체 요청/응답 DTO
- 엔드포인트 모듈: `auth.ts`(5) · `onboarding.ts`(6) · `home.ts`(4) · `profile.ts`(4) · `achievements.ts`(3) = 22개 함수. 이름/경로/스키마는 실서버 Swagger와 일치. (실서버 26경로 중 알림설정·푸시·이미지업로드는 미구현 → §4-2)
- `mappers.ts` — 화면 한글 라벨 ↔ API enum 코드(성별/연령/피부타입/피부·신체고민/목표/도구/시간대/난이도)
- `netguard.ts` — 네트워크 실패 시 데모 폴백(서버 오류코드는 그대로 노출)
- `index.ts` — 배럴

### 1-2. 화면 연동
| 화면 | 연동 내용 |
| --- | --- |
| `Authscreen/Loginfrom.tsx` | `login()` — 실패 시 코드별 메시지, 네트워크 실패는 데모 폴백 |
| `Authscreen/Signupform.tsx` | `checkEmailDuplicate` → `sendEmailVerificationCode` → `verifyEmailCode` |
| `signupStep/SignupScreen.tsx` | `signup()` + 제출 상태/오류 표시 |
| `onboarding/ProfileNameScreen.tsx` | draft 저장 + `submitOnboardingStep0`(multipart) → `/onboarding/step1` |
| `onboarding/Step1UserInfo.tsx` | 라벨→코드 매핑, 좌표 보정, draft + `submitOnboardingStep1` |
| `onboarding/Step2SkinConcern.tsx` | 멀티선택 매핑(bodyGoals 최소 1개 보정) + `submitOnboardingStep2` |
| `onboarding/Step3Difficulty.tsx` | 난이도/시간대 매핑 + `submitOnboardingStep3` |
| `onboarding/AiPlanLoadingScreen.tsx` | 진입 시 `completeOnboarding()` 1회 호출, 생성 루틴 세션 저장 |
| `home/HomePage.tsx` | `getHome()` + `getTodayWeather()` → 카드 매핑, 실패 시 mock 폴백. 로그아웃 시 토큰 정리 |
| `components/home/HomeBase.tsx` | 라이브 데이터 오버라이드 props 추가(미전달 시 mock) |

- 부속: `src/store/onboardingDraft.ts`(단계 간 sessionStorage 드래프트), `src/data/regionCoords.ts`(시·도 중심좌표)

### 1-3. 환경/빌드
- `.env.example`, `.env.local`(실 백엔드 주소, `*.local`로 git 미포함), `vite.config.ts`에 `/api` 프록시 옵션
- `package.json` 스크립트: `test:flow`, `test:live`

### 1-4. 테스트 인프라
- `test/mockServer.ts` — 스펙 재현 인메모리 백엔드(JWT 발급/단계순서/오류코드/봉투)
- `test/flow.test.ts` — 전체 여정 자동 검증
- `test/live.smoke.ts` — 실서버 안전 경로 검증

### 1-5. 실서버 확인
- Swagger(`/v3/api-docs`) 받아 경로/스키마 대조 → 클라이언트와 일치 확인
- CORS(전면 허용) 확인, 오류/성공 봉투 실제 형태 확인, JWT `sub`에 userId 확인

---

## 2. 이슈 & 대응

| # | 이슈 | 대응 |
| --- | --- | --- |
| 1 | 초기엔 로컬 BE 미가동(스펙 md만 존재) | 스펙 재현 mock으로 검증 → 이후 실배포 서버 확보해 실연동 확인 |
| 2 | 문서 md의 홈 계열 오류 봉투(`{data:null,error}`)가 실서버(`{code,message,fieldErrors}`)와 불일치 | 클라이언트가 **두 형태 모두** 파싱하도록 구현 |
| 3 | 로그인 응답에 userId 없음 (프로필/니즈 API는 `{id}` 필요) | JWT `sub` 디코드(`getCurrentUserId()`)로 해결 |
| 4 | 온보딩 라우팅 프로토타입 불일치 (ProfileNameScreen이 존재하지 않는 `/onboarding/profile/goal`로 이동) | `/onboarding/step1`로 정정. 네비게이션 전면 재작성은 보류 |
| 5 | Step1이 위/경도 미수집인데 API 필수 | 시·도 중심좌표(`regionCoords.ts`)로 보정 후 전송 |
| 6 | `verbatimModuleSyntax`/`erasableSyntaxOnly` 제약 | `import type` 사용, enum 대신 유니온+const 맵 |
| 7 | `Buffer` 참조가 브라우저 tsconfig에서 타입 오류 | Node/브라우저 공통 `atob`만 사용 |
| 8 | 테스트 종료 시 `process.exit()`가 Windows libuv assert 유발 | `process.exitCode`로 변경, 이벤트 루프 자연 종료 |
| 9 | 이 저장소 인앱 preview 하네스가 `.env.local`/vite `server.proxy` 미반영 → 창 내 실서버 클릭시연 불가 | 로컬 `npm run dev`는 정상. 실연동은 `test:live`(실 클라이언트→실서버)로 대체 증명 |
| 10 | `tsx` devDependency 설치 시 transitive 고심각도 취약점 1건(esbuild 계열) | 자동 수정 보류(빌드도구 dev 전용, 배포물 영향 없음). `npm audit`로 별도 처리 예정 |

---

## 3. 테스트 결과

| 항목 | 결과 |
| --- | --- |
| `npm run test:flow` (mock 전체 여정) | **35 passed / 0 failed** |
| `npm run test:live` (실서버 안전 경로) | **3 passed / 0 failed** |
| `tsc -p tsconfig.app.json` | 오류 0 |
| `tsc -p tsconfig.node.json` | 오류 0 |
| `eslint src/api …` | 오류 0 |
| 브라우저 렌더 확인 | 로그인/홈 정상 렌더, 콘솔 에러 없음 |

**flow 검증 커버리지**: 이메일 중복확인 → 인증번호(오류코드 포함) → 회원가입(비번 불일치 오류) → 로그인(오답 401·토큰 저장) → 온보딩 단계순서 위반 검증 → step0~3 → 완료(AI 루틴) → 홈(진행률 계산) → 오늘할일/토글·재토글 → 날씨 → 프로필/니즈 조회·수정 → **JWT sub userId 디코드** → 타 사용자 접근 차단(403) → 성취도 3종 → 무토큰 401.

**live 검증**: 실제 앱 클라이언트로 라이브 서버에 붙여 중복확인 파싱 / `INVALID_CREDENTIALS`(401) / 무토큰 홈 401 통과.

---

## 4. 보완할 점 (다음 작업)

### 4-1. 검증 마무리
- [ ] **실 authed 플로우 E2E**: 이미 가입+온보딩 끝난 **테스트 계정(email/pw)** 확보 시, 로그인→홈→성취도 실데이터로 검증. (회원가입은 실이메일 6자리 인증코드 때문에 자동화 불가)

### 4-2. 미연동 화면/기능
- [ ] 프로필/정보수정 `edit/*` (`ProfileEditBody/Skin/Routine/Alarm`) → `getProfile`/`updateProfile`, `getNeeds`/`updateNeeds`
- [ ] 알림 설정 `/api/v1/users/{id}/notification-settings` (조회/수정) — 클라이언트 함수 미작성
- [ ] 점수 화면 `score/*` → `achievements` 실데이터 바인딩 (현재 `data/score.ts` mock)
- [ ] 홈 "오늘 할 일" 카드/시트(`TodayTasksCard`, `AllTasksSheet`) → `getTodayRoutines`/`toggleTodayItem` 실연동 (현재 `data/home.ts` mock)
- [ ] 프로필 이미지 업로드 `/api/v1/users/{id}/photo`, Web Push 기기 등록/비활성화 — 클라이언트 함수 미작성
- [ ] 온보딩 중간 이탈 복구: `getOnboardingProgress()`로 재진입 단계 분기
- [ ] `AddressScreen` GPS 좌표 실수집(현재 시·도 중심좌표 근사)

### 4-3. 구조/품질
- [ ] **토큰 만료(401) 전역 처리**: 인터셉트해 자동 로그아웃/로그인 리다이렉트 (현재 화면별 처리)
- [ ] `netguard` 데모 폴백은 프로토타입 편의용 — 프로덕션 빌드에선 폴백 제거(오류를 숨기지 않도록) 검토
- [ ] 온보딩 라우팅/네비게이션 정합성 정리(단계 순서·뒤로가기)
- [ ] `mappers`의 난이도 매핑(`medium→SIMPLE`, `simple→MINIMAL`) 기획과 재확인 — 화면 라벨과 코드 의미 일치 검증
- [ ] `tsx` 취약점 정리(`npm audit` 확인 후 조치)
- [ ] `.env.local`에 실 서버 URL 존재 — 저장소 공개 시 노출 주의(현재 `*.local` gitignore로 커밋 제외됨)
