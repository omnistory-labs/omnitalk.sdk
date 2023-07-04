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
  let localUser;

  omnitalk.on("event", async (msg) => {
    switch (msg.cmd) {
      case "BROADCASTING_EVENT":
        try {
          await addRemoteVideo(msg.session.replace(/\=/g, ""), msg.user_id);
          await omnitalk.subscribe(msg.session, msg.user_id);
        } catch (error) {
          console.log(error);
        }

        break;
      case "LEAVE_EVENT":
        try {
          const id = msg.session.replace(/\=/g, "");
          $(`#${id}`).remove();
        } catch (error) {
          console.log(error);
        }

      default:
        break;
    }
  });
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
      const option = document.createElement("option");
      option.value = i;
      option.text =
        deviceInfo.label || `microphone ${audioInputSelect.length + 1}`;
      audioInputSelect.appendChild(option);
    }

    for (const i in deviceList.videoinput) {
      const deviceInfo = deviceList.videoinput[i];

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

  $("#regRoomBtn").click(async () => {
    regiRoomFunc();
  });

  $("#title").keypress(async (event) => {
    const keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == 13) {
      regiRoomFunc();
    }
  });

  $("#secret").keypress(async (event) => {
    const keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == 13) {
      regiRoomFunc();
    }
  });

  async function regiRoomFunc() {
    if (!$("#title").val()) {
      $(".reg-box").effect("shake");
      return;
    }

    $("#regRoomBtn").html(
      '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true""></span>'
    );
    $("#regRoomBtn").attr("id", "");
    $("#title").attr("disabled", true);
    $("#secret").attr("disabled", true);
    try {
      await omnitalk.createRoom(
        "videoroom",
        $("#title").val(),
        $("#secret").val()
      );
    } catch (error) {
      $(".reg-box").effect("shake");
      console.log(error);
    } finally {
      setTimeout(() => {
        window.location.reload(true);
      }, 2000);
    }
  }

  $("#hangupBtn").click(async () => {
    clear("Hangup");
    await omnitalk.leave(sessionId);
  });

  function clear(reason) {
    $("#conferenceModal").modal("hide");
    setTimeout(() => {
      window.location.reload(true);
    }, 2000);
  }
  async function addLocalVideo(session, user_id) {
    let localVideoContainer = `<div class="col" id="${session}">`;
    localVideoContainer += `<div class="card">`;
    localVideoContainer += `<div class="card-body">`;
    localVideoContainer += `<video id="${user_id}" autoplay playsinline style="width: 100%"></video>`;
    localVideoContainer += `</div>`;
    localVideoContainer += `</div>`;
    localVideoContainer += `</div>`;
    $("#videoList").prepend(localVideoContainer);
  }
  async function addRemoteVideo(session, user_id) {
    let remoteVideoContainer = `<div class="col" id="${session}">`;
    remoteVideoContainer += `<div class="card">`;
    remoteVideoContainer += `<div class="card-body">`;
    remoteVideoContainer += `<video id="${user_id}" autoplay playsinline style="width: 100%"></video>`;
    remoteVideoContainer += `</div>`;
    remoteVideoContainer += `</div>`;
    remoteVideoContainer += `</div>`;
    $("#videoList").prepend(remoteVideoContainer);
  }
  function time2str(t) {
    const date = new Date(t * 1000);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`;
    const day = `0${date.getDate()}`;
    const hour = `0${date.getHours()}`;
    const minute = `0${date.getMinutes()}`;
    const second = `0${date.getSeconds()}`;
    return `${month.substr(-2)}.${day.substr(-2)} ${hour.substr(
      -2
    )}:${minute.substr(-2)}`;
  }

  $(document).on("click", ".JoinBtn", async function () {
    const index = $(this).data("index");
    const check = $(this).data("check");
    const roomId = $(this).data("room_id");
    const secretClass = `#secret-${index}`;

    if (check == true && $(secretClass).val() == undefined) {
      let room =
        '<div class="form-box reg-box secret-box" style="padding:5px;">';
      room += '<div class="box-input-wrap">';
      room += `<input style="margin-left:10px; margin-right:10px;" type="password" maxLength="6" placeholder="secret" id="secret-${index}">`;
      room += `<button type="button" class="btn button-default me-2 mb-2 JoinBtn" data-check=${check} data-index=${index} data-room_id=${roomId}>Join</Button>`;
      room += "</div>";
      room += "</div>";
      $(`.join-box-${index}`).html(room);
    } else {
      try {
        await omnitalk.joinRoom(roomId, $(secretClass).val());
        await getDeviceInformation();
        $("#conferenceModal").modal("show");
        await addLocalVideo(sessionId.replace(/\=/g, ""), localUser);
        await omnitalk.publish(localUser);
        const publishListResult = await omnitalk.publishList(roomId);
        publishListResult.list.map(async (item, index) => {
          await addRemoteVideo(item.session.replace(/\=/g, ""), item.user_id);
          await omnitalk.subscribe(item.session, item.user_id);
        });
      } catch (error) {
        $(secretClass).effect("shake");
        console.log(error);
      }
    }
  });

  const init = (async () => {
    try {
      const sessionResult = await omnitalk.createSession();
      sessionId = sessionResult.session;
      localUser = sessionResult.user_id;
      const roomResult = await omnitalk.roomList("videoroom");
      roomResult.list.map((item, index) => {
        let roomType;
        if (item.sip_support == true) return;

        if (item.room_type == "videocall" || item.room_type == "videoroom") {
          roomType =
            '<i class="bi bi-person-workspace" style="font-size:1.0rem;margin-right:7px;"></i>';
          roomType +=
            '<i class="bi bi-camera-video" style="font-size:1.0rem;margin-right:7px;"></i>';
        } else {
          roomType =
            '<i class="bi bi-camera-video-off" style="font-size:1.0rem;margin-right:7px;"></i>';
        }

        if (item.secret) {
          roomType +=
            '<i class="bi bi-key" style="font-size:1.0rem;margin-right:7px;"></i>';
        }

        let room = "<div class='col'>";
        room += "<div class='card mb-3' style='max-width: 100%;'>";
        room += `<div class='card-header'>${item.subject}&nbsp;</div>`;
        room += "<div class='card-body text-secondary'>";

        room += '<ul class="list-group list-group-flush">';
        room += `<li class='list-group-item'>${time2str(
          item.start_date
        )} ~ ${time2str(item.end_date)}</p>`;
        room += `<li class='list-group-item'>${roomType}</p>`;
        room += `<li class='list-group-item'><i class="bi bi-people"style="font-size:1.0rem;margin-right:7px;"></i> ${item.count}</p>`;
        room += "</ul>";

        room += `<div class="join-box-${index}">`;
        room +=
          '<div class="d-grid gap-2 d-md-flex justify-content-md-end" style="padding:6px;">';
        room += `<button type="button" class="btn button-default JoinBtn" data-check=${item.secret} data-index=${index} data-room_id=${item.room_id}>Join</button>`;
        room += "</div>";
        room += "</div>";

        room += "</div>";
        room += "</div>";
        room += "</div>";
        room += "</div>";
        $("#roomlist").prepend(room);
      });
    } catch (error) {
      console.log(error);
    }
  })();
});
