# Omnitalk JS Demo

<br><br>
<img width="508" alt="스크린샷 2023-06-23 오전 11 36 05" src="https://github.com/Luna-omni/demo-read-me/assets/125844802/ee697990-41a2-4aed-8bec-577b8508c828">

<br><br>

## 🗒️ 구현된 데모

- 오디오 콜
- 오디오 컨퍼런스
- 비디오 콜
- 비디오 컨퍼런스

<br><br>

## How to install

- cdn에서 링크를 import해서 사용할 수 있습니다.

```JavaScript
https://cdn.jsdelivr.net/npm/omnitalk-ts-sdk@latest
```

<br><br>

## How to start

```JavaScript
const SERVICE_ID = "SERVICE ID를 입력하세요";
const SERVICE_KEY = "SERVICE KEY를 입력하세요";
Omnitalk.Omnitalk.init(SERVICE_ID, SERVICE_KEY);
const omnitalk = Omnitalk.Omnitalk.getInstance();
```

<br>
app.js 코드에서 서비스 아이디와 서비스키를 넣고 옴니톡 객체를 초기화 시킵니다.

자세한 설명은 <a href="https://docs.omnitalk.io">document</a>에서 확인 가능 합니다.

<br>

SDK를 사용하다가 궁금한 점이 생기거나, 오류가 발생하면 <a href="https://github.com/omnistory-labs/omnitalk.sdk/issues">이슈</a>에 남겨주세요.
