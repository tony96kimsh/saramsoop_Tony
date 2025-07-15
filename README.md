# 인사 관리 ERP 어플리케이션 사람숲 

A | B| C
--|--|--|
![구현 사진](url) | ![구현 사진](url) | ![구현 사진](url) 


## 목차
- [기획서 및 개발 문서](#기획서-및-개발-문서)
- [프로젝트 개요](#프로젝트-개요)
  - [인원 소개 (4명)](#인원-소개-4명)
  - [일정](#일정)
  - [제작 배경](#제작-배경)
  - [기술 스택](#기술-스택)
  - [주요 기능](#주요-기능)
- [프로젝트 구조](#프로젝트-구조)
  - [레이아웃 구성](#레이아웃-구성)
  - [폴더 구조](#폴더-구조)
  - [DB 구조](#db-구조)
- [개인 역할](#개인-역할)
  - [김민혁](#김민혁)
  - [김성훈](#김성훈)
  - [김한석](#김한석)
  - [최영비](#최영비)

<br>

## 기획서 및 개발 문서


1. [🔗 작업 로그 노션 ](https://universal-gallium-010.notion.site/2059b2f7b0af804f870feea9b6471448?source=copy_link)
2. [🔗 기획 및 개발 정의서 구글 슬라이드](https://docs.google.com/presentation/d/1cj48KtGpLL-fApoqQQtzJOlXoqCeXz00Ee7nb3GiBJg/edit?usp=sharing)
3. [🔗 DB 구조 및 ERD](https://dbdiagram.io/d/684f63793cc77757c8f86fe8)
4. [🔗 협업 규칙](docs/cowork_rule.md)
5. [🔗 피그마](https://www.figma.com/design/A4J6j9Wokzh3biuYxfpDQs/%EC%82%AC%EB%9E%8C%EC%88%B2_%EC%95%B1_%EB%94%94%EC%9E%90%EC%9D%B8?node-id=0-1&t=93PXqXVUEyUP5VSy-1)

---

## 프로젝트 개요

### 인원 소개 (4명)

|이름|깃 포크 주소|
| --- | --- |
| 김성훈 | https://github.com/tony96kimsh/saramsoop_Tony |
| 김민혁 | https://github.com/kmh8405/KMH_saramsoop |
| 김한석 | https://github.com/hanseok0621/saramsoop_hs |
| 최영비(메인 스트림 담당) | https://github.com/cyeongb/saramsoop |

### 일정
**5주: 2025.06.11(수) ~ 2025.07.16(수)**

### 제작 배경
우리 팀은 실무에 가까운 개발 경험을 쌓는 것을 목표로 삼아, 많은 기업에서 실제로 활용되는 ERP 시스템에 주목하게 되었습니다. 특히 그중에서도 **인사(HR) 시스템은 조직의 핵심 운영과 밀접하게 연관되어 있고, 다양한 업무 시나리오와 데이터 흐름을 담을 수 있다는 점**에서 높은 학습 효과를 기대할 수 있다고 판단했습니다.

팀원 모두가 효율적인 시스템 설계와 사용자 중심의 UX에 관심이 있어, 단순한 CRUD를 넘어 실질적인 업무 흐름을 반영한 ERP 인사 시스템을 구현하고자 의기투합했습니다. 이 프로젝트는 단순한 기능 구현을 넘어서, 실제 현업에서 활용 가능한 **ERP 구조와 기능에 대한 이해를 높이고자 하는 공동의 목표**를 담고 있습니다.

### 기술 스택

#### 프론트엔드
- JavScript
- React vite
- TypeScript
- UI 라이브러리: Material UI (MUI)
#### 백엔드
- C#
- ASP.NET
- ORM(Object-Relational Mapping): Entity Framework

#### 데이터베이스
- DBMS: PostgreSQL
- 로컬 개발용 툴: DBeaver


### 주요 기능
1. JWT 토큰과 SHA 해시 알고리즘을 이용한 로그인 기능
2. MUI를 사용한 프론트 화면 구성
3. APS.NET을 통한 postgreSQL서버 제어

    - MVC 모델 구현
    - Entity ORM을 통한 C#코드를 통한 SQL 제어


---

## 프로젝트 구조

### 레이아웃 구성
로그인 | 홈 | 근태관리
--|--|--|
![로그인]() | ![comm](src) | ![comm](src)

직원관리 | 결재
--|--|
![comm](src) | ![comm](src)

### 폴더 구조

#### Frontend/
```
├── eslint.config.js
├── index.html
├── node_modules
├── package-lock.json
├── package.json
├── public
├── src
    ├── App.css
    ├── App.tsx
    ├── assets
    ├── components
    ├── contexts
    ├── hooks
    ├── index.css
    ├── main.tsx
    ├── mock
    ├── pages
    ├── routes
    ├── services
    ├── style
    ├── types
    ├── utils
    └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json
└── vite.config.ts

```
#### Backend/
```
├── Controllers
│   ├── ApprovalController.cs
│   ├── AttendControllers.cs
│   ├── AttendanceController.cs
│   ├── AuthController.cs
│   └── EmployeeController.cs
├── Data
│   ├── AppDbContext.cs
│   └── ApplicationDbContext.cs
├── Dtos
│   ├── ApprovalDto.cs
│   ├── AttendDtos.cs
│   ├── AttendanceDto.cs
│   ├── DepartmentDto.cs
│   └── EmployeeDto.cs
├── Models
│   ├── Approval.cs
│   ├── Attendance.cs
│   ├── Departments.cs
│   └── EmployeeUser.cs
├── Program.cs
├── Properties
│   └── launchSettings.json
├── Repositories
│   ├── Implementations
│   └── Interfaces
├── Services
│   ├── ApprovalService.cs
│   ├── EmployeeService.cs
│   ├── Implementations
│   └── Interfaces
├── appsettings.Development.json
├── appsettings.json
├── backend.csproj
├── backend.http
├── backend.sln
├── bin
│   └── Debug
└── obj
    ├── Debug
    ├── backend.csproj.nuget.dgspec.json
    ├── backend.csproj.nuget.g.props
    ├── backend.csproj.nuget.g.targets
    ├── project.assets.json
    └── project.nuget.cache

```

### DB 구조

테이블 구조 | 필드 구조 |
--|--|
![1](docs/img/ERD_sub1.jpg)| ![1](docs/img/ERD_sub2.jpg)

전체 구조 |
--|
![1](docs/img/ERD_main.svg)


---

## 개인 역할

> 모두가 배우는 입장을 고려하여 기능 중심으로 개인마다 모두 백엔드, 프론트엔드, 마크업을 진행하였습니다.

### 김민혁
프론트엔드
- 1
백엔드
- 1

### 김성훈
프론트엔드
- 1
백엔드
- 1

### 김한석
프론트엔드
- 1
백엔드
- 1

### 최영비
프론트엔드
- 1
백엔드
- 1


