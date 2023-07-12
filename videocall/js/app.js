$(document).ready(() => {
  // SERVICE ID for WEB
  // SERVICE ID, SERVICE KEY for APP
  const SERVICE_ID = "SERVICE ID를 입력하세요";
  const SERVICE_KEY = "SERVICE KEY를 입력하세요";
  Omnitalk.Omnitalk.init(SERVICE_ID, SERVICE_KEY);
  const omnitalk = Omnitalk.Omnitalk.getInstance();

  const audioInputSelect = document.querySelector("select#audioSource");
  const videoSelect = document.querySelector("select#videoSource");
  audioInputSelect.addEventListener("change", handleAudioDeviceChange);
  videoSelect.addEventListener("change", handleVideoDeviceChange);
  const selectors = [audioInputSelect, videoSelect];

  let sessionId;
  const callTimer = new Object();
  document.getElementById("ringbacktone").volume = 0.4;
  document.getElementById("ringtone").volume = 0.4;

  omnitalk.on("event", async (msg) => {
    console.log(msg);
    switch (msg.cmd) {
      case "RINGING_EVENT":
        $("#ringtone").trigger("play");
        $("#answerBtn").css("display", "inline-block");
        $("#answerBtn").attr("data-caller", msg.caller);
        $("#peerNumber").html(msg.caller);
        $("#videoCallModal").modal("show");
        startTimer();
        break;

      case "CONNECTED_EVENT":
        $("#leaveBtn").css("display", "none");
        $("#ringbacktone").trigger("pause");
        $(".callState").html("connected");
        break;
      case "LEAVE_EVENT":
        clear("Hangup");
        omnitalk.leave();
      default:
        break;
    }
  });

  $("#regBtn").click(async () => {
    regiFunc();
  });

  $("#regNum").keypress(async (event) => {
    const keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == 13) {
      regiFunc();
    }
  });

  async function regiFunc() {
    if (!$("#regNum").val()) {
      $(".reg-box").effect("shake");
      return;
    }

    const number = $("#regNum").val();
    if (sessionId == undefined) {
      try {
        const sessionResult = await omnitalk.createSession(number);
        sessionId = sessionResult.session;
      } catch (error) {
        $(".reg-box").effect("shake");
        console.log(error);
      }
    }

    if (sessionId != undefined) {
      $("#regNum").css("font-weight", "bold");
      $("#regNum").attr("disabled", true);
      $("#callNum").attr("disabled", false);

      $("#callNum").focus();
      $(".caller .card")
        .removeClass("text-bg-success")
        .addClass("text-bg-light");
      $(".callee .card").removeClass("text-bg-light");
      $("#regBtn").attr("disabled", true);
      $("#callBtn").attr("disabled", false);
    } else {
      $(".reg-box").effect("shake");
    }
  }
  async function getDeviceInformation() {
    const deviceList = await omnitalk.getDeviceList();
    await makeSelectOption(deviceList);
    await omnitalk.setAudioDevice(deviceList.audioinput[0].deviceId);
    await omnitalk.setVideoDevice(deviceList.videoinput[0].deviceId);
  }
  async function makeSelectOption(deviceList) {
    const values = selectors.map((select) => select.value);
    selectors.forEach((select) => {
      while (select.firstChild) {
        select.removeChild(select.firstChild);
      }
    });

    for (const i in deviceList.audioinput) {
      const deviceInfo = deviceList.audioinput[i];
      console.log("deviceInfo", deviceInfo);
      const option = document.createElement("option");
      option.value = i;
      option.text =
        deviceInfo.label || `microphone ${audioInputSelect.length + 1}`;
      audioInputSelect.appendChild(option);
    }

    for (const i in deviceList.videoinput) {
      const deviceInfo = deviceList.videoinput[i];
      console.log("video deviceInfo", deviceInfo);

      const option = document.createElement("option");
      option.value = i;
      option.text = deviceInfo.label || `camera ${videoSelect.length + 1}`;
      videoSelect.appendChild(option);
    }

    selectors.forEach((select, selectorIndex) => {
      if (
        Array.prototype.slice
          .call(select.childNodes)
          .some((n) => n.value === values[selectorIndex])
      ) {
        select.value = values[selectorIndex];
      }
    });
  }

  async function handleAudioDeviceChange(event) {
    const selectedIndex = event.target.value;
    try {
      const deviceList = await omnitalk.getDeviceList();
      const audioInputDevices = Object.values(deviceList.audioinput);
      const selectedDeviceId = audioInputDevices[selectedIndex]?.deviceId;
      await omnitalk.setAudioDevice(selectedDeviceId);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleVideoDeviceChange(event) {
    const selectedIndex = event.target.value;
    try {
      const deviceList = await omnitalk.getDeviceList();
      const videoInputDevices = Object.values(deviceList.videoinput);
      const selectedDeviceId = videoInputDevices[selectedIndex]?.deviceId;
      await omnitalk.setVideoDevice(selectedDeviceId);
    } catch (error) {
      console.log(error);
    }
  }

  $("#callBtn").click(async () => {
    callFunc();
  });

  $("#callNum").keypress(async (event) => {
    const keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == "13") {
      callFunc();
    }
  });

  async function callFunc() {
    if (!$("#callNum").val()) {
      $(".call-box").effect("shake");
      return;
    }

    if ($("#regNum").val() === $("#callNum").val()) {
      $(".call-box").effect("shake");
      return;
    }

    try {
      $("#peerNumber").html($("#callNum").val());
      await getDeviceInformation();
      $("#videoCallModal").modal("show");
      await omnitalk.offerCall("videocall", $("#callNum").val(), true);
      $("#ringbacktone").trigger("play");
      startTimer();
    } catch (error) {
      console.log(error);
    }
  }

  $("#answerBtn").click(async () => {
    $("#ringtone").trigger("pause");
    $("#answerBtn").css("display", "none");
    await getDeviceInformation();
    await omnitalk.answerCall();
  });

  $("#hangupBtn").click(async () => {
    clear("Hangup");
    await omnitalk.leave(sessionId);
  });

  $("#leaveBtn").click(async () => {
    clear("Hangup");
    await omnitalk.leave(sessionId);
  });

  function clear(reason) {
    stopTimer();
    $("#ringbacktone").trigger("pause");
    $("#ringtone").trigger("pause");
    $(".callState").html(reason);
    $(".callState").effect("pulsate");
    setTimeout(() => {
      window.location.reload(true);
    }, 2000);
  }

  function twolength(n) {
    return (n < 10 ? "0" : "") + n;
  }

  function dispTimer() {
    if (
      callTimer.sec == undefined ||
      callTimer.min == undefined ||
      callTimer.hour == undefined
    ) {
      callTimer.hour = 0;
      callTimer.min = 0;
      callTimer.sec = 0;
    }

    callTimer.sec++;
    if (callTimer.sec >= 60) {
      callTimer.min++;
      callTimer.sec = 0;
    }
    if (callTimer.min >= 60) {
      callTimer.hour++;
      callTimer.min = 0;
    }

    if (callTimer.hour)
      $(".callTimer").html(
        `<time datetime=''>${twolength(callTimer.hour)}:${twolength(
          callTimer.min
        )}:${twolength(callTimer.sec)}</time>`
      );
    else
      $(".callTimer").html(
        `<time datetime=''>${twolength(callTimer.min)}:${twolength(
          callTimer.sec
        )}</time>`
      );
  }

  function startTimer() {
    callTimer.hour = 0;
    callTimer.min = 0;
    callTimer.sec = 0;
    $(".callTimer").html("<time datetime=''>00:00</time>");
    callTimer.id = setInterval(() => {
      dispTimer();
    }, 1000);
  }

  function stopTimer() {
    clearInterval(callTimer.id);
  }
});
