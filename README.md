# 과제명

## 과제 시작

1. tools 붙여넣기

2. 최초 의존성, ESLint, Prettier 설치
  npm install
  npx install-peerdeps --dev eslint-config-airbnb
  npm install prettier -D

3. package.json, package-lock.json 변경사항 삭제

4. 초기 커밋
  git add .
  git commit -m "chore: 초기 환경 설정"

5. README.md, REQUIREMENTS.md 작성
  최소 통과 기준 (ApplicationTest 기준)
  구현 기능 목록 정리

### 주의사항

- async/await 잘 붙이기
- private 메서드에 return 잘 붙이기
- getter에 잘 () 붙이기

## 최소 통과 기준 (ApplicationTest)

- [ ] 다섯글자가 넘는 이름 예외

## 중요 조건

- 이름 5자 이하, csv 입력

## 구현 기능 목록

### 1. 입력

- [ ] 경주 할 자동차 이름
  - [ ] csv
  - [ ] 유효성 검증

### 2. 핵심 로직

- [ ] 자동차 객체 생성
  - [ ] 이름 배열 인자
  - [ ] 자동차 배열 반환

### 3. 출력

- [ ] 각 차수별 실행 결과
  - [ ] 자동차 정보 배열 인자 (이름, 점수)
  - [ ] 정보를 문자열로
  - [ ] 각 차수 출력
