# 🎨 Gallery Hub

> 전시회 정보를 한눈에 확인하고 관심 전시를 찜할 수 있는 개인화된 전시회 정보 서비스

[![Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](https://gallery-hub-xi.vercel.app/exhibitions)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/SeoHee3478/gallery-hub)

<br />

## 프로젝트 미리보기

> 전시회 목록 페이지 - 카테고리 필터와 무한스크롤
> 
![Gallery Hub 메인 화면](https://github.com/user-attachments/assets/b8d74f5d-c422-416e-ae79-c455248d229c)

<br />


## 프로젝트 소개

평소 전시회에 관심이 많았지만, **원하는 전시 정보를 찾기가 어렵고 흩어진 정보를 한곳에서 관리할 수 없다는 불편함**을 느꼈습니다.

이를 해결하고자 **공공 API**를 활용하여 전시회 정보를 통합하고, **찜 기능**으로 관심 전시를 개인화하여 관리할 수 있는 서비스를 만들었습니다.

### 개발 기간
- **2024.11 - 2025.01** (약 6주)

### 개발 인원
- **1인 (개인 프로젝트)** - 기획, 디자인, 프론트엔드, 백엔드

<br />

## 주요 기능

### 1. 전시회 목록 조회
- 공공 API를 활용한 실시간 전시회 정보 제공
- 카테고리별 필터링 (전시, 연극, 뮤지컬/오페라, 음악/콘서트 등)
- 지역별 필터링 (서울, 경기, 부산 등)
- 무한스크롤로 끊김 없는 탐색 경험
- 로그인한 경우, 찜 추가 및 삭제 기능 사용 가능

### 2. 전시회 상세 정보
- 전시회 포스터 및 상세 정보 제공
- 기간, 장소, 카테고리, 가격 등 핵심 정보 표시
- 하단에 카카오맵으로 지도뷰 제공
- 찜하기 기능 (로그인 사용자만)

### 3. 찜 목록 관리
- 관심 전시를 개인 찜 목록에 저장
- 찜 추가/삭제 시 실시간 UI 업데이트
- 로그인한 사용자만 접근 가능한 개인화 페이지

### 4. 인증 시스템
- 회원가입 및 로그인
- Supabase Auth를 활용한 안전한 세션 관리

<br />

## 기술 스택

### Frontend
- **Next.js 16** (App Router)
- **TypeScript**
- **TailwindCSS**
- **TanStack Query** - 서버 상태 관리 및 캐싱

### Backend & Database
- **Supabase** - 인증 및 데이터베이스
- **Next.js API Routes** - 자체 API 구현

### Deployment
- **Vercel** - 자동 배포 및 호스팅

### External API
- **공공데이터포털 문화공연 API**

<br />

## 주요 기술적 개선 사항

### 1. Detail 페이지 렌더링 성능 최적화 ⭐

#### 문제 상황
- Detail 페이지 진입 시 이미지 로딩이 지연되어 사용자 경험 저하
- LCP(Largest Contentful Paint) 지표가 **1.7초**로 느림
- `useEffect + setState` 기반 이미지 교체 구조로 인해 브라우저가 첫 페인트 이후에야 이미지 다운로드 시작

#### 해결 방법
```typescript
// ❌ Before: useEffect로 이미지 교체
const [imageSrc, setImageSrc] = useState('/placeholder.jpg');
useEffect(() => {
  setImageSrc(exhibition.mainImage);
}, [exhibition.mainImage]);

// ✅ After: useMemo로 최초 렌더 시점에 이미지 확정
const imageSrc = useMemo(() => {
  return exhibition.mainImage || '/placeholder.jpg';
}, [exhibition.mainImage]);
```

#### 개선 결과

| 성능 지표 | Before | After | 개선율 |
|----------|--------|-------|--------|
| **LCP** | 1.7s | 0.7s | **58.8% ↓** |
| **Lighthouse Performance** | 93 | **100** | +7점 |

**관련 PR**: [#42 Exhibition Detail 페이지 LCP 및 초기 렌더링 성능 개선](https://github.com/SeoHee3478/gallery-hub/pull/42)

---

### 2. Suspense를 활용한 Toast UI 렌더링 문제 해결

#### 문제 상황
- `useSearchParams` 사용 시 Toast 알림이 화면에 렌더링되지 않는 문제 발생
- Next.js의 SSR/CSR 렌더링 타이밍 차이로 인한 Hydration 불일치

#### 해결 방법
```tsx
// ✅ useSearchParams 사용 컴포넌트를 Suspense로 감싸서 해결
<Suspense fallback={<div>Loading...</div>}>
  <LoginForm />
</Suspense>
```

#### 배운 점
- `useSearchParams`는 클라이언트 전용 훅으로, Next.js 공식 문서에서 Suspense boundary를 필수로 요구
- 비동기 렌더링을 안정적으로 처리하여 UI가 정상적으로 마운트되도록 개선

**관련 블로그**: [Next.js에서 Toast 알림이 안 보일 때 - Suspense로 해결하기](https://seoya.tistory.com/29)

---

### 3. TanStack Query를 활용한 효율적인 상태 관리

#### 구현 내용
```typescript
// 찜 추가 후 목록 자동 갱신
const { mutate: addFavorite } = useMutation({
  mutationFn: addFavoriteAPI,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['favorites'] });
    toast.success('찜 목록에 추가되었습니다');
  }
});
```

#### 효과
- `invalidateQueries`를 통해 찜 목록 자동 재검증
- 서버 상태와 UI 상태의 동기화 자동 처리
- Toast 알림으로 사용자 액션에 대한 즉각적인 피드백 제공

---

### 4. 개인화 페이지의 동적 렌더링 처리

#### 문제 상황
- 찜 목록 페이지는 사용자별로 다른 데이터를 표시해야 하는 개인화 페이지
- Next.js가 빌드 시 정적으로 pre-render를 시도하면서 에러 발생

#### 해결 방법
```typescript
// 동적 렌더링 강제 설정
export const dynamic = 'force-dynamic';
```

#### 배운 점
- 정적 생성(SSG)과 동적 렌더링(SSR)의 차이 이해
- 사용자별 데이터가 필요한 페이지는 동적 렌더링이 필수

<br />

## 로컬 실행 방법

### 1. 저장소 클론
```bash
git clone https://github.com/SeoHee3478/gallery-hub.git
cd gallery-hub
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정
`.env.local` 파일을 생성하고 아래 내용을 추가하세요

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# 공공데이터 API
NEXT_PUBLIC_API_KEY=your_api_key
```

### 4. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

<br />

## 📁 프로젝트 구조

```
gallery-hub/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── exhibitions/        # 전시회 목록 페이지
│   │   ├── exhibitions/[id]/   # 전시회 상세 페이지
│   │   ├── favorites/          # 찜 목록 페이지
│   │   ├── login/              # 로그인 페이지
│   │   └── signup/             # 회원가입 페이지
│   ├── components/             # 재사용 가능한 컴포넌트
│   ├── hooks/                  # 커스텀 훅
│   ├── lib/                    # 유틸리티 함수
│   ├── types/                  # TypeScript 타입 정의
│   └── utils/                  # Supabase 클라이언트 등
└── ...
```

<br />

## 향후 개선 계획

- [ ] 전시회 검색 기능 추가
- [ ] 카테고리/지역 필터 고도화
- [ ] 전시회 리뷰 및 평점 시스템
- [ ] 전시회 위치 기반 지도 서비스
- [ ] 알림 기능 (관심 전시회 일정 리마인더)
- [ ] 성능 최적화 (이미지 lazy loading, 번들 사이즈 최적화)

<br />

## 🔗 관련 링크

- **배포 사이트**: [https://gallery-hub-xi.vercel.app/exhibitions](https://gallery-hub-xi.vercel.app/exhibitions)
- **GitHub Repository**: [https://github.com/SeoHee3478/gallery-hub](https://github.com/SeoHee3478/gallery-hub)
- **기술 블로그**: [Next.js Suspense 문제 해결기](https://seoya.tistory.com/29)

<br />


## 👤 개발자

**SeoHee**
- GitHub: [@SeoHee3478](https://github.com/SeoHee3478)
- Blog: [코드의 바다에서 항해하기](https://seoya.tistory.com)
