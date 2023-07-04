# Omnitalk React Demo

<br><br>

<img width="238" height="400" alt="스크린샷 2023-07-04 오후 7 46 52" src="https://github.com/omnistory-labs/omnitalk.sdk/assets/125844802/2341d3ce-7014-4034-8f0d-24b1e2517ede">
<img width="230" height="400" alt="스크린샷 2023-07-04 오후 7 47 09" src="https://github.com/omnistory-labs/omnitalk.sdk/assets/125844802/18ad534e-3dac-4dd6-b815-d193e8fd5c6c">
<img width="238" height="400" alt="스크린샷 2023-07-04 오후 7 47 22" src="https://github.com/omnistory-labs/omnitalk.sdk/assets/125844802/4b2df644-52b5-40f9-be35-66002520f32e">
<img width="231" height="400" alt="스크린샷 2023-07-04 오후 7 47 33" src="https://github.com/omnistory-labs/omnitalk.sdk/assets/125844802/308152e2-f458-46b5-9554-63641af82dea">
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
