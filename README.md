# Taegram Clone

## 소개

Taegram은 소셜 네트워킹 서비스의 클론 프로젝트입니다.

## 기술 스택

- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma
- Framer Motion
- Naver Maps API

## 주요 기능

- 전화번호 인증을 통한 회원가입
- 약관 동의
- 기본 정보 입력
  - 성별
  - 생년월일
  - 위치 정보
  - 신체 정보
  - 학력
  - 직업
  - 종교
  - 음주/흡연
  - 프로필 사진
  - 선호도 설정
  - 특징/관심사
- 위치 기반 서비스
  - 네이버 지도 API 연동
  - 주소 검색
  - 현재 위치 확인
- 반응형 UI
- 애니메이션 효과

## 시작하기

### 필수 조건

- Node.js 18.0.0 이상
- npm 또는 yarn
- Naver Cloud Platform 계정 및 API 키

### 환경 변수 설정

```bash
NEXT_PUBLIC_NAVER_CLIENT_ID=your_client_id
NAVER_CLIENT_SECRET=your_client_secret
```

### 설치

```bash
# 저장소 클론
git clone https://github.com/your-username/taegram-clone

# 의존성 설치
npm install
# 또는
yarn install
```

### 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
```

브라우저에서 http://localhost:3000 으로 접속하여 결과를 확인할 수 있습니다.

## 프로젝트 구조

```
taegram_clone/
├── app/
│   ├── (auth)/
│   │   ├── components/
│   │   ├── signUp/
│   │   └── page.tsx
│   ├── api/
│   │   └── geocode/
│   ├── fonts/
│   ├── globals.css
│   └── layout.tsx
├── components/
│   └── common/
├── public/
│   └── images/
├── types/
└── package.json
```

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.
