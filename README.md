# **JengYoung's Portfolio**

> 제 이력을 볼 수 있는 포트폴리오 웹사이트 repo에요 🖐🏻

&nbsp;

## 🚀 **배경**

가끔은 글이 모든 것을 보여줄 수 없다고 생각해요.  
그렇기에 언젠가, 한 번 제 포트폴리오를 제작해보고 싶다는 생각을 하고는 했어요.

마침 이번에 다시 취직 준비를 시작하게 된 겸, 동기와 흥미가 있는 지금이 적기라 생각하여 포트폴리오 웹사이트를 만들어 보았어요.

&nbsp;

## 🖥 **기술 스택**

<img src="https://img.shields.io/badge/TypeScript-2F73BF?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/React-5ED2F3?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=Next.js&logoColor=white"> <img src="https://img.shields.io/badge/@emotion-CC67BB?style=for-the-badge&logo=emotion-js&logoColor=white"> <img src="https://img.shields.io/badge/github actions-black?style=for-the-badge&logo=github-actions&logoColor=white"> <img src="https://img.shields.io/badge/AWS(S3, Route 53, CloudFront)-black?style=for-the-badge&logo=amazon&logoColor=white">

&nbsp;

## 📝 **와이어프레임**

[포트폴리오 와이어프레임](./docs/wireframe.md)에 기술되어 있어요!
다만 이는 이미지 위주의 내용이라, [Figma](https://www.figma.com/file/hl7Y6CCjVpxKSErbojMVWd/Untitled?node-id=0%3A1)를 참고하시길 바랍니다!

&nbsp;

## 🎬 **유저 시나리오**

> 최신 순으로 정렬합니다.

### 인트로 페이지(`/`)

[Issue: [🌈 Feature] 인트로 페이지를 구현한다](https://github.com/JengYoung/portfolio/issues/43)

### 자기소개 페이지(`/about`)

[Issue: [🌈 Feature] 자기소개 페이지를 구현한다](https://github.com/JengYoung/portfolio/issues/44)

### 경험/프로젝트 페이지 (`/experiences-and-skills`)

[Issue: [🌈 Feature] 경험과 프로젝트 페이지를 구현한다](https://github.com/JengYoung/portfolio/issues/45)

&nbsp;

## 커밋 컨벤션

> [커밋 템플릿 문서](./.github/git-commit-message.txt)를 참고해주세요! 🙆🏻

&nbsp;

## 브랜치 컨벤션

- 브랜치는 `pf-[[이슈명]]/[[원하는 유니크한 이름]]`으로 정의한다.
- 만약 중복되는 이름이 존재한다면 `pf-[[이슈명]]/[[원하는 유니크한 이름]]-[[다른 구분지을만한 특징이나 인덱스]]`으로 정의한다.

&nbsp;

## 🐛 Trouble Shooting

> 문제를 해결할 때마다 추가할 거에요!

- [yarn berry + prettier plugin = 😖](https://github.com/JengYoung/portfolio/pull/42)
- [[🐛 Bugfix] hotfix: 새로고침 시 403이 호출되는 현상](https://github.com/JengYoung/portfolio/pull/38)
- [Next.js Dynamic import + ForwardRef = 😖](https://github.com/JengYoung/portfolio/pull/12)

&nbsp;

## 🚦 실행방법

### How to run

```bash
# ~/now/path/portfolio

yarn dev;

# or you can run by build and start command

yarn build;
yarn start;
```
