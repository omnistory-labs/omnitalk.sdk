

<p align="center">
  <img src="https://github.com/Luna-omni/readmdtest/assets/125844802/a910cb80-de3b-44d8-9f37-0ccd08b9dd19" width="500" height="100">
</p><br/>


# Omnitalk Javascript SDK 


옴니톡은 WebRTC 기반의 CPaas 플랫폼 서비스 입니다. 옴니톡 SDK를 통해 Web/App에서 간단하게 실시간 통신을 구현이 가능합니다. <br/>

[![kor](https://img.shields.io/badge/lang-kor-F86F03.svg)](https://github.com/omnistory-labs/omnitalk.sdk/blob/main/README.md)
[![en](https://img.shields.io/badge/lang-en-FFA41B.svg)](https://github.com/omnistory-labs/omnitalk.sdk/blob/main/README.en.md)
<br/><br/>


## Feature Overview

| feature |  implemented |
|---|:---:|
|  Audio/Video |  ✔️ |
|  Device Setting |  ✔️ |
|  Resolution Setting |  ✔️ |
|  Audio & Video Mute |  ✔️ |
|  Audio & Video Unmute |  ✔️ |
|  Screenshare |  ✔️ |
|  Chatting |  ✔️ |
|  SIP call |  ✔️ |


<br/>

## Pre-Requisite

- 옴니톡 서비스키 & 서비스 아이디
  - [옴니톡 홈페이지](https://omnitalk.io) 를 방문하여 서비스 키와 아이디를 발급받아 주세요.
  - 혹은 [이곳](https://omnitalk.io/demo/audio) 에서 1시간 동안 무료로 사용가능한 키를 받아주세요.
    

<br/>

## Getting Started

다음 설치 방법을 사용하여 설치를 진행 합니다.

1. npm 설치 시
```javascript
npm install omnitalk-ts-sdk

Omnitalk.sdkInit("SERVICE_ID","SERVICE_KEY");
const sdk = Omnitalk.getInstance();
```

2. cdn import 시
```javascript
<script src="https://cdn.jsdelivr.net/npm/omnitalk-ts-sdk@latest/omnitalk.min.js">

Omnitalk.Omnitalk.sdkInit("SERVICE_ID","SERVICE_KEY");
const sdk = Omnitalk.getInstance();
```
<br/>

## Documentation

쉽고 자세한 [문서](https://docs.omnitalk.io/javascript)를 제공하고 있습니다. 


<br/>

## Issue 

옴니톡을 사용하면서 발생하는 이슈나 궁금점은  [issue](https://github.com/omnistory-labs/omnitalk.sdk/issues) 페이지를 확인해 주세요.

<br/>

## Example Projects

옴니톡 SDK로 구현된 간단한 데모를 확인해 보세요.
- [javascript 데모](https://github.com/omnistory-labs/omnitalk.sdk/tree/demo-js) 
- [react 데모](https://github.com/omnistory-labs/omnitalk.sdk/tree/demo-react) 


