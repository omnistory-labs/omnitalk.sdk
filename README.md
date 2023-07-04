# Omnitalk React Demo

<br><br>
<img width="300" height="400" alt="스크린샷 2023-07-04 오후 8 22 09" src="https://github.com/omnistory-labs/omnitalk.sdk/assets/125844802/c53eae81-4740-4ec7-80e2-8783935eacda">
<img width="300" height="400" alt="스크린샷 2023-07-04 오후 8 23 00" src="https://github.com/omnistory-labs/omnitalk.sdk/assets/125844802/50f69d19-7040-4e41-814c-1063697e2fdc">
<img width="500" height="600" alt="스크린샷 2023-07-04 오후 8 25 41" src="https://github.com/omnistory-labs/omnitalk.sdk/assets/125844802/8072a2be-28b0-4c1f-9ae1-77a517e28f9c">
<img width="472" height="600" alt="스크린샷 2023-07-04 오후 8 29 01" src="https://github.com/omnistory-labs/omnitalk.sdk/assets/125844802/d1c47392-87e9-4bdf-a6b0-f18d36af1843">
<br><br>

## 🗒️ 구현된 데모

- 오디오 콜
- 오디오 컨퍼런스
- 비디오 콜
- 비디오 컨퍼런스

<br><br>

## How to install

npm install 하거나 yarn add 로 설치 합니다.

```JavaScript
npm install omnitalk-ts-sdk
yarn add omnitalk-ts-sdk
```

<br><br>

## How to start

```JavaScript
const SERVICE_ID = "SERVICE ID를 입력하세요";
const SERVICE_KEY = "SERVICE KEY를 입력하세요";
Omnitalk.init(SERVICE_ID, SERVICE_KEY);
const omnitalk = Omnitalk.getInstance();
omnitalk.createSession();
```

<br>
옴니톡 SDK 사용전, 서비스 아이디와 서비스키를 넣고 옴니톡 객체를 초기화 시킵니다.

<br>

자세한 설명은 <a href="https://docs.omnitalk.io">document</a>에서 확인 가능 합니다.

<br>

SDK를 사용하다가 궁금한 점이 생기거나, 오류가 발생하면 <a href="https://github.com/omnistory-labs/omnitalk.sdk/issues">이슈</a>에 남겨주세요.
