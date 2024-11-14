# Taegram Clone

## 소개

Taegram은 소셜 네트워킹 서비스의 클론 프로젝트입니다.

## 기술 스택

- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma
- Framer Motion

## 주요 기능

- 전화번호 인증을 통한 회원가입
- 약관 동의
- 기본 정보 입력
- 반응형 UI
- 애니메이션 효과

## 시작하기

### 필수 조건

- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone https://github.com/your
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
gram_clone/
├── app/
│   ├── (auth)/
│   │   ├── components/
│   │   ├── signUp/
│   │   └── page.tsx
│   ├── fonts/
│   ├── globals.css
│   └── layout.tsx
├── public/
│   └── images/
└── package.json
```

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.
