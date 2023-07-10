

<p align="center">
  <img src="https://github.com/Luna-omni/readmdtest/assets/125844802/a910cb80-de3b-44d8-9f37-0ccd08b9dd19" width="500" height="100">
</p><br/>


# Omnitalk Javascript SDK 


Omnitalk is a CPaas platform service based on WebRTC. Omnitalk SDK enables you to implement easy real-time communication on Web/App. <br/>

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

- omnitalk service id, service key
  - Visit [omnitalk site](https://omnitalk.io) to get omnitalk service id and service key.
  - You can also get a one-hour test key [here](https://omnitalk.io/demo/audio).
    

<br/>

## Getting Started

Use one of the following preferred package install methods to immediately get going.


1. npm install
```javascript
npm install omnitalk-ts-sdk

Omnitalk.sdkInit("SERVICE_ID","SERVICE_KEY");
const sdk = Omnitalk.getInstance();
```

2. cdn import 
```javascript
<script src="https://cdn.jsdelivr.net/npm/omnitalk-ts-sdk@latest/omnitalk.min.js">

Omnitalk.Omnitalk.sdkInit("SERVICE_ID","SERVICE_KEY");
const sdk = Omnitalk.getInstance();
```
<br/>

## Documentation

We provide an easy and detailed [documentation](https://docs.omnitalk.io/javascript). 


<br/>

## Issue 

Please check the [issue](https://github.com/omnistory-labs/omnitalk.sdk/issues)  page for any issues or questions while using Omnitalk.

<br/>

## Example Projects

Check out a simple demo implemented with the Omnitalk SDK.
- [javascript demo](https://github.com/omnistory-labs/omnitalk.sdk/tree/demo-js) 
- [react demo](https://github.com/omnistory-labs/omnitalk.sdk/tree/demo-react) 
