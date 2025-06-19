# HR Management System
인사관리 시스템 

💡 제발 git 올리기 전에 PULL 꼭 해주세요!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

## 🏗️ 프로젝트 구조

```
hr-management-system/
├── backend/                     # ASP.NET Core 백엔드
│   └── HRManagementBackend/
│       ├── Controllers/         # API 컨트롤러
│       ├── Models/             # 데이터 모델
│       ├── DTOs/               # 데이터 전송 객체
│       ├── Services/           # 비즈니스 로직
│       ├── Data/               # EF Core 설정
│       ├── Utils/              # 유틸리티
│       ├── Program.cs          # 앱 진입점
│       └── appsettings.json    # 설정 파일
│
├── frontend/                   # React 프론트엔드
│   └── hr-management-frontend/
│       ├── src/
│       │   ├── components/     # 재사용 컴포넌트
│       │   ├── pages/          # 페이지 컴포넌트
│       │   ├── services/       # API 호출
│       │   ├── types/          # TypeScript 타입
│       │   ├── utils/          # 유틸리티
│       │   └── theme/          # Material-UI 테마
│       ├── package.json        # 의존성 관리
│       └── vite.config.ts      # Vite 설정
│
├── docs/                       # 프로젝트 문서
├── scripts/                    # 자동화 스크립트
├── .gitignore                  # Git 무시 파일
└── README.md                   # 이 파일
```

## 🚀 빠른 시작 (팀원용)

### 📋 1. 필수 프로그램 설치

#### Windows 환경
```
✅ Visual Studio 2022 Community
   - "ASP.NET 및 웹 개발" 워크로드 포함
   - 다운로드: https://visualstudio.microsoft.com/

✅ .NET 8.0 SDK
   - 다운로드: https://dotnet.microsoft.com/download/dotnet/8.0

✅ Node.js 20.x LTS (권장)
   - 다운로드: https://nodejs.org/

✅ PostgreSQL 16.9
   - 다운로드: https://www.postgresql.org/download/

✅ Git
   - 다운로드: https://git-scm.com/

✅ DBeaver (DB 관리 도구, 선택사항)
   - 다운로드: https://dbeaver.io/
```

#### 설치 확인
```bash
# 터미널에서 버전 확인
dotnet --version        # 8.0.xxx 또는 9.0.xxx
node --version         # v20.x.x 또는 v22.x.x
npm --version          # 10.x.x 또는 11.x.x
psql --version         # PostgreSQL 16.9
git --version          # 최신 버전
```

### 📥 2. 프로젝트 설정

#### 저장소 클론
```bash
git clone https://github.com/your-org/hr-management-system.git
cd hr-management-system
```

#### 백엔드 설정
```bash
# 백엔드 폴더로 이동
cd backend/HRManagementBackend

# NuGet 패키지 복원
dotnet restore

# 프로젝트 빌드 테스트
dotnet build
```

#### 프론트엔드 설정
```bash
# 프론트엔드 폴더로 이동
cd ../../frontend/hr-management-frontend

# Node.js 패키지 설치 (시간이 걸릴 수 있음)
npm install

# 설치 확인
npm list --depth=0
```

### 🗄️ 3. 데이터베이스 설정

#### PostgreSQL 데이터베이스 생성
```sql
-- DBeaver 또는 pgAdmin에서 실행
CREATE DATABASE "HRManagement";

-- 또는 터미널에서
psql -U postgres
CREATE DATABASE "HRManagement";
\q
```

#### 백엔드 연결 문자열 설정
```bash
# backend/HRManagementBackend/ 폴더에서
# appsettings.Development.json 파일 생성
```

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=HRManagement;Username=postgres;Password=YOUR_PASSWORD;Include Error Detail=true"
  },
  "JwtSettings": {
    "Key": "your-secret-key-here-must-be-at-least-256-bits-long-for-security-purposes",
    "Issuer": "HRManagement",
    "Audience": "HRManagement",
    "DurationInMinutes": 60
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.EntityFrameworkCore.Database.Command": "Information"
    }
  }
}
```

> ⚠️ **중요**: `YOUR_PASSWORD`를 본인의 PostgreSQL 비밀번호로 변경하세요!

#### Entity Framework 마이그레이션 실행
```bash
# backend/HRManagementBackend/ 폴더에서
dotnet ef database update

# 마이그레이션이 없다면 먼저 생성
dotnet ef migrations add InitialCreate
dotnet ef database update
```

#### 프론트엔드 환경 변수 설정 (선택사항)
```bash
# frontend/hr-management-frontend/ 폴더에서
# .env.local 파일 생성
```

```env
# 백엔드 API 주소
VITE_API_BASE_URL=https://localhost:5001/api

# 애플리케이션 설정
VITE_APP_TITLE=HR Management System
```

### ▶️ 4. 애플리케이션 실행

#### 방법 1: 수동으로 각각 실행 (권장)
```bash
# 터미널 1: 백엔드 서버 실행
cd backend/HRManagementBackend
dotnet run

# 터미널 2: 프론트엔드 서버 실행 (새 터미널)
cd frontend/hr-management-frontend
npm run dev
```

#### 방법 2: Visual Studio + VS Code 동시 사용
```bash
# 1. Visual Studio에서 백엔드 열기
start backend/HRManagementBackend.sln

# 2. VS Code에서 프론트엔드 열기
code frontend/hr-management-frontend
```

#### 실행 확인
```
✅ 백엔드: https://localhost:5001/swagger (Swagger UI)
✅ 프론트엔드: http://localhost:3000 (React 앱)
✅ 데이터베이스: localhost:5432 (PostgreSQL)
```

## 🛠️ 개발 가이드

### 🎯 기술 스택

#### 백엔드 (ASP.NET Core)
- **.NET 8.0** - 프레임워크
- **Entity Framework Core** - ORM
- **PostgreSQL** - 데이터베이스
- **JWT** - 인증
- **Swagger** - API 문서
- **AutoMapper** - 객체 매핑

#### 프론트엔드 (React)
- **React 18** - UI 라이브러리
- **TypeScript** - 타입 시스템
- **Vite** - 빌드 도구
- **Material-UI** - UI 컴포넌트
- **Material-Table** - 데이터 테이블
- **React Query** - 서버 상태 관리
- **React Router** - 라우팅
- **Axios** - HTTP 클라이언트

### 📱 주요 기능
- ✅ 사용자 인증 및 권한 관리
- ✅ 직원 정보 관리 (CRUD)
- ✅ 출근/퇴근 관리
- ✅ 휴가 신청 및 승인 시스템
- ✅ 급여 관리
- ✅ 결재 시스템
- ✅ 대시보드 및 리포트

### 🔄 개발 워크플로우

#### 새 기능 개발 (예: 사용자 관리)
```bash
# 1. 새 브랜치 생성
git checkout -b feature/user-management

# 2. 백엔드 API 개발
cd backend/HRManagementBackend
# - Models/User.cs 수정
# - Controllers/UsersController.cs 구현
# - Services/UserService.cs 구현

# 3. 데이터베이스 마이그레이션 (필요시)
dotnet ef migrations add AddUserFeatures
dotnet ef database update

# 4. 백엔드 테스트
dotnet run
# https://localhost:5001/swagger에서 API 테스트

# 5. 프론트엔드 개발
cd ../../frontend/hr-management-frontend
# - src/types/user.ts 타입 정의
# - src/services/userService.ts API 호출
# - src/pages/Users.tsx 페이지 구현
# - src/components/UserTable.tsx 컴포넌트

# 6. 프론트엔드 테스트
npm run dev
# http://localhost:3000에서 UI 테스트

# 7. 통합 테스트
# 백엔드 + 프론트엔드 동시 실행하여 전체 기능 테스트

# 8. 커밋 및 푸시
git add .
git commit -m "feat: 사용자 관리 기능 구현

- 백엔드: User CRUD API 추가
- 프론트엔드: 사용자 목록/등록/수정 페이지 구현
- 데이터베이스: User 테이블 필드 추가"

git push origin feature/user-management
```

### 🔌 API 엔드포인트 예시
```
# 인증
POST   /api/auth/login
POST   /api/auth/logout

# 사용자 관리
GET    /api/users
GET    /api/users/{id}
POST   /api/users
PUT    /api/users/{id}
DELETE /api/users/{id}

# 출근 관리
GET    /api/attendance
POST   /api/attendance/clock-in
POST   /api/attendance/clock-out

# 휴가 관리
GET    /api/leave
POST   /api/leave/request
PUT    /api/leave/{id}/approve

# 전체 API 문서: https://localhost:5001/swagger
```

## 🚨 문제 해결

### 자주 발생하는 오류들

#### 1. 백엔드 관련 오류

**"No connection string named 'DefaultConnection'"**
```bash
# 해결: appsettings.Development.json 파일 확인
# backend/HRManagementBackend/appsettings.Development.json 생성 필요
```

**"Cannot connect to PostgreSQL server"**
```bash
# 해결:
# 1. PostgreSQL 서비스 실행 확인
# 2. 사용자명/비밀번호 확인
# 3. 데이터베이스 "HRManagement" 생성 확인
# 4. 포트 5432 확인
```

**"A migration was not applied"**
```bash
# 해결:
cd backend/HRManagementBackend
dotnet ef database update
```

**"Package restore failed"**
```bash
# 해결:
dotnet nuget locals all --clear
dotnet restore
```

#### 2. 프론트엔드 관련 오류

**"npm install failed"**
```bash
# 해결:
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**"Module not found"**
```bash
# 해결:
cd frontend/hr-management-frontend
npm install
```

**"API 연결 실패"**
```bash
# 해결 확인사항:
# 1. 백엔드 서버 실행 상태 확인 (https://localhost:5001)
# 2. .env.local 파일의 VITE_API_BASE_URL 확인
# 3. 브라우저 개발자 도구 → Network 탭에서 오류 확인
```

**"Port 3000 is already in use"**
```bash
# 해결:
npm run dev -- --port 3001
# 또는 기존 프로세스 종료
```

### 🔧 개발 도구 설정

#### Visual Studio 2022 권장 설정
```
1. 확장 프로그램:
   - Entity Framework Visual Editor
   - PostgreSQL Language Support

2. 옵션 설정:
   - 도구 → 옵션 → NuGet → 자동 복원 체크
   - 도구 → 옵션 → 텍스트 편집기 → C# → 고급 → using 자동 정렬
```

#### VS Code 권장 확장 프로그램
```json
// frontend/hr-management-frontend/.vscode/extensions.json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

## 📝 코딩 규칙

### 백엔드 (C#)
```csharp
// 파일명: PascalCase
// UserController.cs, UserService.cs

// 클래스명: PascalCase
public class UserController : ControllerBase

// 메서드명: PascalCase
public async Task<ActionResult<UserDto>> GetUserAsync(int id)

// 변수명: camelCase
var userName = "홍길동";

// 상수: UPPER_SNAKE_CASE
public const string DEFAULT_STATUS = "ACTIVE";
```

### 프론트엔드 (TypeScript/React)
```typescript
// 파일명: PascalCase (컴포넌트), camelCase (유틸리티)
// UserTable.tsx, userService.ts

// 컴포넌트명: PascalCase
const UserTable: React.FC<UserTableProps> = ({ users }) => {

// 변수명: camelCase
const userName = "홍길동"

// 상수: UPPER_SNAKE_CASE
const API_BASE_URL = "https://localhost:5001/api"

// 타입명: PascalCase
interface UserDto {
  id: number
  name: string
}
```

## 📂 폴더별 역할

### 백엔드 폴더
```
Controllers/     # API 엔드포인트 정의
Models/         # 데이터베이스 엔티티
DTOs/           # API 요청/응답 객체
Services/       # 비즈니스 로직
Data/           # Entity Framework 설정
Utils/          # 공통 유틸리티 (JWT, 암호화 등)
```

### 프론트엔드 폴더
```
components/     # 재사용 가능한 UI 컴포넌트
pages/          # 페이지별 컴포넌트
services/       # API 호출 로직
types/          # TypeScript 타입 정의
utils/          # 공통 유틸리티 함수
theme/          # Material-UI 테마 설정
```

## 🌐 배포

### 로컬 개발 환경
- **프론트엔드**: http://localhost:3000
- **백엔드 API**: https://localhost:5001
- **Swagger UI**: https://localhost:5001/swagger
- **데이터베이스**: localhost:5432

### 프로덕션 빌드
```bash
# 백엔드 빌드
cd backend/HRManagementBackend
dotnet build --configuration Release
dotnet publish --configuration Release --output ./publish

# 프론트엔드 빌드
cd ../../frontend/hr-management-frontend
npm run build
# 결과물: dist/ 폴더
```

## 📞 팀 지원

### 문제 발생시 연락처
- **프로젝트 리더**: [이름] ([이메일] / [슬랙])
- **백엔드 담당**: [이름] ([이메일])
- **프론트엔드 담당**: [이름] ([이메일])
- **데이터베이스 담당**: [이름] ([이메일])
- **팀 슬랙 채널**: #hr-system-dev

### 유용한 링크
- **백엔드 API 문서**: https://localhost:5001/swagger
- **ASP.NET Core 문서**: https://docs.microsoft.com/aspnet/core
- **React 문서**: https://react.dev/
- **Material-UI 문서**: https://mui.com/
- **PostgreSQL 문서**: https://www.postgresql.org/docs/
- **팀 위키**: [링크]

### 개발 명령어 요약
```bash
# 백엔드
cd backend/HRManagementBackend
dotnet restore              # 패키지 복원
dotnet build               # 빌드
dotnet run                 # 실행
dotnet ef database update  # DB 마이그레이션

# 프론트엔드  
cd frontend/hr-management-frontend
npm install                # 패키지 설치
npm run dev               # 개발 서버 실행
npm run build             # 프로덕션 빌드
npm run lint              # 코드 검사
```

---

## 🎯 팀 개발 팁
💡 **제발 git 올리기 전에 PULL 꼭 해주세요!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!**

💡 **백엔드 + 프론트엔드 동시 수정시**: 하나의 커밋으로 묶어서 관리하면 API 변경과 UI 수정이 동기화됩니다.

💡 **API 우선 개발**: 백엔드 API를 먼저 완성한 후 Swagger로 테스트하고, 그 다음 프론트엔드를 개발하면 효율적입니다.

💡 **타입 일치**: 백엔드 DTO와 프론트엔드 타입을 항상 일치시켜 주세요.

💡 **브랜치 전략**: `feature/기능명`으로 브랜치를 만들고, 완성되면 `main`에 머지하세요.

**개발 시작하기 전에 위의 설정을 모두 완료해주세요! 🚀**
