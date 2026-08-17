# CLAUDE.md — Routia Frontend

Routia = 개인 맞춤 스킨/바디 루틴 추천 앱. 이 저장소는 프론트엔드(모바일 웹, 402px 프레임)입니다.

## 스택 / 실행

- Vite 8 + React 19 + TypeScript 6 + react-router-dom 7 + Tailwind v4
- `npm run dev` — 개발 서버 (기본 5173, 이 저장소 preview는 5203)
- `npm run build` — `tsc -b && vite build`
- `npm run lint` — eslint
- `npm run test:flow` — mock 백엔드 대상 전체 플로우 테스트 (tsx)
- `npm run test:live` — 실배포 백엔드 대상 무해한(읽기전용) 스모크 테스트

> tsconfig 에 `verbatimModuleSyntax` + `erasableSyntaxOnly` 활성 → **타입 import 는 `import type`**, **TS enum·namespace 금지**(유니온 타입 + const 맵으로 대체). Node 타입 스트리핑(tsx/직접 실행)에도 동일 규칙.

## 백엔드 연동

- **실배포 백엔드**: `https://port-0-routia-backend-mnhfhlid34c7c977.sel3.cloudtype.app`
  - Swagger: `/v3/api-docs`
  - CORS 전면 허용(`Access-Control-Allow-Origin: *`, `authorization` 헤더 허용) → 브라우저 직접 호출 가능
- **환경변수**(`.env.local`, git 미포함):
  - `VITE_API_BASE_URL` — 지정 시 그 주소로 직접 호출. 비우면 상대경로(`/api/...`) + Vite proxy 사용.
  - `VITE_API_PROXY_TARGET` — 로컬 BE 를 프록시로 붙일 때 대상(기본 `http://localhost:8080`).
- **응답 봉투(실서버 기준)**: 성공 `{ success, data, message }`, 오류 `{ code, message, fieldErrors }` 로 통일.
  (클라이언트는 `{data:null,error:{...}}` 형태 오류도 함께 처리한다.)
- **인증**: 로그인 응답은 `{ accessToken, tokenType }` 뿐. **userId 는 JWT `sub` 클레임**에 있음 →
  `getCurrentUserId()`(`src/api/http.ts`)로 디코드해 `/api/v1/users/{id}/*` 호출에 사용.

## API 레이어 구조 (`src/api/`)

| 파일 | 역할 |
| --- | --- |
| `http.ts` | fetch 래퍼. baseURL 결정, JWT 자동첨부, 봉투/오류 정규화(`ApiError`), 토큰 저장, `getCurrentUserId()` |
| `types.ts` | 모든 enum(유니온) + 요청/응답 DTO |
| `auth.ts` `onboarding.ts` `home.ts` `profile.ts` `achievements.ts` | 엔드포인트 함수 |
| `mappers.ts` | 화면 한글 라벨 ↔ API enum 코드 |
| `netguard.ts` | 백엔드 미가동(네트워크 실패) 시 데모 폴백 헬퍼. 서버가 실제 오류코드를 주면 그대로 throw |
| `index.ts` | 배럴 export |

- 온보딩 단계 데이터는 라우트 분리 화면 간 이어붙이기 위해 `src/store/onboardingDraft.ts`(sessionStorage) 사용.
- 사용법: `import { login, getHome, getCurrentUserId, ApiError } from "../api";`

## 테스트

- `test/mockServer.ts` — 스펙(단계순서/JWT/오류코드/봉투)을 재현한 인메모리 mock 백엔드
- `test/flow.test.ts` — 실제 클라이언트로 회원가입~로그인~온보딩~완료~홈~토글~프로필~성취도 전 여정 + 오류/권한/401 검증
- `test/live.smoke.ts` — 실서버 대상(계정생성/메일발송 없이) 안전 경로만

## 주의 / 알려진 제약

- 이 저장소의 인앱 preview 하네스는 `.env.local` 과 vite `server.proxy` 를 반영하지 않을 수 있음. 로컬 `npm run dev` 는 정상.
- 온보딩 라우팅은 프로토타입이라 일부 화면 네비게이션이 정합적이지 않음(전면 재작성하지 않음).
- 상세 작업 로그·이슈·보완점은 [resource.md](resource.md) 참고.
