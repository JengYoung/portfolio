# 🚦 CHANGELOG | 변경 사항을 기록해요.

## [1.7.0](https://github.com/JengYoung/portfolio/compare/v1.6.2...v1.7.0) (2022-12-04)

### 💫 CI/CD

- **config:** 커밋에 관한 CI 세부 수정을 업데이트한다 ([5de285d](https://github.com/JengYoung/portfolio/commit/5de285d84edc3af57e7432903871bd706de1375a))

### ♻️ Refactor

- **core-css-in-js:** 다크모드 정의를 위해 전체 CSS-in-JS 구조를 리팩토링한다 ([f8fc4dc](https://github.com/JengYoung/portfolio/commit/f8fc4dc4587893c43cf9f874cb5d56a1840c44a5))
- **css-style:** 모드에 따른 인트로 페이지의 색상을 정의한다 ([82898d5](https://github.com/JengYoung/portfolio/commit/82898d55018a2194829d977e3f30a55bed4d59a0))

### ✨ Features

- **component:** schemeButton을 구현한다 ([e128f0d](https://github.com/JengYoung/portfolio/commit/e128f0dd3e3aedf06241479da8cfae71ac0aca43))
- **css-style:** about 페이지의 라이트모드 및 다크모드를 구현한다 ([b677b04](https://github.com/JengYoung/portfolio/commit/b677b04916944c215613449c3918cefd7f9306f0))
- **css-style:** 다크모드와 라이트모드를 구현한다 ([fdf1a69](https://github.com/JengYoung/portfolio/commit/fdf1a6999a8fca4d3b1ba88707f1ceef4df658d8))
- **custom-hook:** 초기에 colorScheme을 체크하고 변경할 수 있는 useColorSheme을 구현한다 ([70f44e1](https://github.com/JengYoung/portfolio/commit/70f44e1747d708e79cfafe9dcd79ba40633d12fe))

### 📝 Docs

- **custom:** 컨벤션 변경에 따라 release 이슈 템플릿의 내용을 변경한다 ([1d92c41](https://github.com/JengYoung/portfolio/commit/1d92c41de52c1bd12d9e3eb579dc5013e02d0c9d))
- **README:** 리드미를 업데이트한다 ([f310f60](https://github.com/JengYoung/portfolio/commit/f310f6049334f7fdf1f05dca6d02130fe1a9ebd4))

### 🐛 Bug Fixes

- **css-style:** 브라우저 컴포넌트에서 초기화 시 글자 위치가 잘못 나오는 현상을 해결한다 ([895f605](https://github.com/JengYoung/portfolio/commit/895f6057faf7e1bd3e35d915cc907f528f64b7d7))
- **custom-hook:** useLocalStorage를 사용할 때 제대로 업데이트되지 않는 현상을 수정한다 ([0b8eec4](https://github.com/JengYoung/portfolio/commit/0b8eec432b59dfc702db6e8dc624e94f0661f016))
- **workflow:** pre-commit이 잘못 작동되는 오류를 해결한다 ([8179c06](https://github.com/JengYoung/portfolio/commit/8179c06a4672e6f8a76130d15acd519daf83d95b))

## 주요 변경 사항 요약

### 다크모드 구현

정말 다크한 느낌이 들 정도로 으스스한 결과물이 나왔어요 🤣
나름 재밌긴 한데, 보는 사람 입장에서는 약간 첫인상이 음침해보일 수 있겠군요...?
추후 검정색 + 노랑색의 조합으로 아예 바꿀지를 고민해볼 필요도 있겠어요. 😉

<img width="1504" alt="image" src="https://user-images.githubusercontent.com/78713176/205479284-0bbb442a-7d88-445f-a55a-59f2fdead416.png">

<img width="1505" alt="image" src="https://user-images.githubusercontent.com/78713176/205479310-56fae0c3-9525-456e-bb38-480fcca52479.png">

<img width="1509" alt="image" src="https://user-images.githubusercontent.com/78713176/205479343-bb159b6e-ef53-44a9-8f22-ce78bc176fd1.png">

---
