$(document).ready(async () => {
  // SERVICE ID for WEB
  // SERVICE ID, SERVICE KEY for APP
  const SERVICE_ID = "SERVICE ID를 입력하세요";
  const SERVICE_KEY = "SERVICE KEY를 입력하세요";
  Omnitalk.Omnitalk.init(SERVICE_ID, SERVICE_KEY);
  const omnitalk = Omnitalk.Omnitalk.getInstance();
  let sessionId;
  let caller;
  const callTimer = new Object();

  document.getElementById("ringbacktone").volume = 0.4;
  document.getElementById("ringtone").volume = 0.4;
  omnitalk.on("event", async (msg) => {
    console.log(msg);
    switch (msg.cmd) {
      case "RINGING_EVENT":
        $("#ringtone").trigger("play");
        $("#answerBtn").css("display", "block");
        $("#peerNumber").html(msg.caller);
        $("#callModal").modal("show");
        startTimer();
        break;
      case "CONNECTED_EVENT":
        $("#ringbacktone").trigger("pause");
        $(".callState").html("connected");
        break;
      case "LEAVE_EVENT":
        window.location.reload(true);
        break;
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
      $(".caller .card").removeClass("activated").addClass("deactivated");
      $(".callee .card").removeClass("deactivated").addClass("activated");
      $("#regBtn").attr("disabled", true);
      $("#callBtn").attr("disabled", false);
    } else {
      $(".reg-box").effect("shake");
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

    $("#peerNumber").html($("#callNum").val());
    $("#callModal").modal("show");
    $("#ringbacktone").trigger("play");
    startTimer();
    try {
      await omnitalk.offerCall("audiocall", $("#callNum").val());
    } catch (error) {
      console.log(error);
    }
  }

  $("#answerBtn").click(async () => {
    $("#ringtone").trigger("pause");
    $("#answerBtn").css("display", "none");
    try {
      await omnitalk.answerCall("audiocall", caller);
    } catch (error) {
      console.log(error);
    }
  });

  $("#hangupBtn").click(async () => {
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
