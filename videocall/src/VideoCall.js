import { useEffect, useRef, useState } from "react";
import { StyledCallForm, StyledContents } from "./style/style";
import { Bell, Ringing } from "./components/media/Ringing";
import {
  AiFillAudio,
  AiOutlineAudioMuted,
  AiOutlineClose,
} from "react-icons/ai";
import { IoMdRefresh } from "react-icons/io";
import { ImPhoneHangUp, ImPhone } from "react-icons/im";
import { MdCameraswitch, MdPictureInPictureAlt } from "react-icons/md";
import { BsFillCameraVideoFill, BsCameraVideoOff } from "react-icons/bs";
import CreateSession from "./components/CreateSession";
import { Omnitalk } from "omnitalk-ts-sdk";

// SERVICE ID for WEB
// SERVICE ID, SERVICE KEY for APP
const SERVICE_ID = "SERVICE ID를 입력하세요";
const SERVICE_KEY = "SERVICE KEY를 입력하세요";
Omnitalk.init(SERVICE_ID, SERVICE_KEY);
const omnitalk = Omnitalk.getInstance();

export default function VideoCall() {
  const [sessionId, setSessionId] = useState(""); // createSession();
  const [regiNum, setRegiNum] = useState("");
  const [callee, setCallee] = useState(""); // 수신자
  const [caller, setCaller] = useState(""); // 발신자
  const [callListArr, setCallListArr] = useState([]);

  // device
  const [audioInput, setAudioInput] = useState(""); // 마이크
  const [videoInput, setVideoInput] = useState(""); // 카메라

  // ui
  const [camera, setCamera] = useState(false);
  const [audio, setAudio] = useState(false);

  // mute button
  const [audiomuteButton, setAudiomuteButton] = useState(false);
  const [videomuteButton, setVideomuteButton] = useState(false);
  // video mute view
  const [localVideoMute, setLocalVideoMute] = useState(false);
  const [remoteVideoMute, setRemoteVideoMute] = useState(false);
  // audio mute view
  const [localAudioMute, setLocalAudioMute] = useState(false);
  const [remotAudiooMute, setRemoteAudioMute] = useState(false);
  const [calleeMute, setCalleeMute] = useState("");
  const [callerMute, setCallerMute] = useState("");

  const [createToggle, setCreateToggle] = useState(true);
  const [callerToggle, setCallerToggle] = useState(false);
  const [calleeToggle, setCalleeToggle] = useState(false);
  const [callToggle, setCallToggle] = useState(false);
  const [listToggle, setListToggle] = useState(false);
  const [answerToggle, setAnswerToggle] = useState(false);
  const [btnToggle, setBtnToggle] = useState(false);

  const calleeRef = useRef();
  const callerRef = useRef();
  const [callList, setCallList] = useState(false);
  const [isCaller, setIsCaller] = useState(false);

  useEffect(() => {
    if (omnitalk) {
      omnitalk.on("close", () => {
        console.log("close Event");
      });
      omnitalk.on("event", async (msg) => {
        switch (msg.cmd) {
          case "RINGING_EVENT":
            setCaller(msg.caller);
            setCreateToggle(false);
            setCallList(false);
            setCalleeToggle(true);
            setAnswerToggle(true);
            setListToggle(false);
            break;
          case "CONNECTED_EVENT":
            setCallToggle(true);
            setAnswerToggle(true);
            setBtnToggle(true);
            setCreateToggle(false);
            setCallList(false);
            break;
          case "LEAVE_EVENT":
            window.location.reload(true);
            break;
          case "AUDIO_MUTE_EVENT":
            muteIcon(msg.user_id);
            break;
          case "AUDIO_UNMUTE_EVENT":
            unmuteIcon(msg.user_id);
            break;
          case "MUTE_EVENT":
            if (msg.track === "audio") {
              if (msg.session === sessionId) {
                setLocalAudioMute(true);
              } else {
                setRemoteAudioMute(true);
              }
            }
            if (msg.track === "video") {
              if (msg.session === sessionId) {
                setLocalVideoMute(true);
              } else {
                setRemoteVideoMute(true);
              }
            }
            break;
          case "UNMUTE_EVENT":
            if (msg.track === "audio") {
              if (msg.session === sessionId) {
                setLocalAudioMute(false);
              } else {
                setRemoteAudioMute(false);
              }
            }
            if (msg.track === "video") {
              if (msg.session === sessionId) {
                setLocalVideoMute(false);
              } else {
                setRemoteVideoMute(false);
              }
            }
            break;

          default:
            break;
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [omnitalk]);

  const handleChange = (e) => {
    setRegiNum(e.target.value);
  };
  const muteIcon = (user_id) => {
    if (user_id === calleeRef.current) {
      setCalleeMute(<AiOutlineAudioMuted />);
    } else if (user_id === callerRef.current) {
      setCallerMute(<AiOutlineAudioMuted />);
    }
  };
  const unmuteIcon = (user_id) => {
    if (user_id === calleeRef.current) {
      setCalleeMute("");
    } else if (user_id === callerRef.current) {
      setCallerMute("");
    }
  };

  // 세션 생성
  const handleCreateSession = async () => {
    try {
      const sessionResult = await omnitalk.createSession(regiNum);
      setSessionId(sessionResult.session);
      setListToggle(true);
      await omnitalk.sessionList().then((result) => {
        setCallListArr(result.list);
      });
      await omnitalk.getDeviceList().then((device) => {
        setAudioInput(device.audioinput);
        setVideoInput(device.videoinput);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(async () => {}, 1000 * 3);
    }
  };

  const handleOfferCall = async (user_id) => {
    try {
      await omnitalk.offerCall("videocall", user_id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLeave = async () => {
    try {
      await omnitalk.leave(sessionId.session);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const refresh = (e) => {
    e.preventDefault();
    omnitalk.sessionList().then((result) => {
      setCallListArr(result.list);
    });
  };

  return (
    <>
      <StyledContents>
        <section>
          {/* 1.번호 등록 */}
          {createToggle && (
            <CreateSession
              handleCreateSession={handleCreateSession}
              handleChange={handleChange}
              regiNum={regiNum}
            />
          )}
          {/* 2. callList */}
          {listToggle && (
            <>
              <div className="callList_wrap">
                <h4 htmlFor="call_list">
                  상대방 번호를 선택하세요.
                  <button
                    type="button"
                    className="refresh_button"
                    onClick={refresh}
                  >
                    Refresh
                    <IoMdRefresh fontSize={26} color="#FA5734" />
                  </button>
                </h4>
                <div className="call_list_container">
                  {/* get list */}
                  {callListArr.length === 0 ? (
                    <li>등록된 번호가 없습니다.</li>
                  ) : (
                    callListArr.map((list, i) => {
                      return (
                        <button
                          type="button"
                          key={i}
                          className="call_list_card"
                          onClick={() => {
                            handleOfferCall(list.user_id);
                            setCreateToggle(false);
                            setListToggle(false);
                            setCallerToggle(true);
                            setAnswerToggle(true);
                            setIsCaller(true);
                            setCallee(list.user_id);
                          }}
                        >
                          {list.user_id}
                          {list.state === "busy" && (
                            <span
                              className={
                                list.state === "busy" ? "list_disabled" : ""
                              }
                            >
                              님이 통화중입니다.
                            </span>
                          )}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </>
          )}
          {/* 3. 통화 화면 */}
          {callerToggle === true || calleeToggle === true ? (
            <StyledCallForm>
              {!callToggle && !isCaller && (
                <>
                  {/* 통화요청 화면 버튼 */}
                  <div className="btn_wrap">
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await omnitalk.answerCall();
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                    >
                      <ImPhone color="white" fontSize={30} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleLeave();
                      }}
                    >
                      <ImPhoneHangUp color="white" fontSize={30} />
                    </button>
                  </div>
                  <p className="name">{caller}님이 영상통화를 요청합니다.</p>
                  <Bell />
                </>
              )}
              {!callToggle && isCaller && (
                <>
                  <div className="btn_wrap">
                    <button
                      type="button"
                      onClick={() => {
                        handleLeave();
                      }}
                    >
                      <ImPhoneHangUp color="white" fontSize={30} />
                    </button>
                  </div>
                  <p className="name">{callee}님을 기다리고 있습니다.</p>
                  <Ringing />
                </>
              )}
              {answerToggle && (
                <>
                  {btnToggle && (
                    <div className="btn_wrap">
                      <>
                        {/* 통화 연결시 화면 */}

                        {/* 카메라 설정 버튼 */}
                        <button
                          type="button"
                          onClick={() => {
                            setCamera((prev) => !prev);
                            setAudio(false);
                          }}
                        >
                          <MdCameraswitch color="#fff" fontSize="28px" />
                        </button>
                        {/* audiomute - button*/}
                        {audiomuteButton ? (
                          <>
                            <button
                              type="button"
                              onClick={async () => {
                                try {
                                  await omnitalk.setUnmute("audio");
                                  setAudiomuteButton(false);
                                  setCamera(false);
                                  setAudio(false);
                                } catch (error) {
                                  console.log(error);
                                }
                              }}
                            >
                              <AiOutlineAudioMuted
                                color="#fff"
                                fontSize="28px"
                              />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={async () => {
                                try {
                                  await omnitalk.setMute("audio");
                                  setAudiomuteButton(true);
                                  setCamera(false);
                                  setAudio(false);
                                } catch (error) {
                                  console.log(error);
                                }
                              }}
                            >
                              <AiFillAudio color="#fff" fontSize="28px" />
                            </button>
                          </>
                        )}
                        {/* videomute - button*/}
                        {videomuteButton ? (
                          <>
                            <button
                              type="button"
                              onClick={async () => {
                                try {
                                  setVideomuteButton(false);
                                  setCamera(false);
                                  setAudio(false);
                                  await omnitalk.setUnmute("video");
                                } catch (error) {
                                  console.log(error);
                                }
                              }}
                            >
                              <BsCameraVideoOff color="#fff" fontSize="28px" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={async () => {
                                try {
                                  setVideomuteButton(true);
                                  setCamera(false);
                                  setAudio(false);
                                  await omnitalk.setMute("video");
                                } catch (error) {
                                  console.log(error);
                                }
                              }}
                            >
                              <BsFillCameraVideoFill
                                color="#fff"
                                fontSize="28px"
                              />
                            </button>
                          </>
                        )}
                        {/* 종료 버튼 */}
                        <button
                          type="button"
                          onClick={() => {
                            handleLeave();
                          }}
                        >
                          <ImPhoneHangUp color="white" fontSize={30} />
                        </button>

                        {/* 설정 버튼 modal */}
                        <div className="device_modal">
                          {audio && (
                            <>
                              <button
                                className="device_modal_close"
                                type="button"
                                onClick={() => {
                                  setAudio(false);
                                }}
                              >
                                <AiOutlineClose fontSize={20} />
                              </button>
                              <div className="select_wrap">
                                <div className="select_title">
                                  오디오 설정 - Microphone
                                </div>
                                {Object.values(audioInput).map((list, i) => {
                                  return (
                                    <button
                                      type="button"
                                      className="select"
                                      key={i}
                                      onClick={async () => {
                                        try {
                                          await omnitalk.setAudioDevice(
                                            list.deviceId
                                          );
                                          setAudio(false);
                                        } catch (error) {
                                          console.log(error);
                                        }
                                      }}
                                    >
                                      {list.label}
                                    </button>
                                  );
                                })}
                              </div>
                            </>
                          )}
                          {camera && (
                            <>
                              <button
                                className="device_modal_close"
                                type="button"
                                onClick={() => {
                                  setCamera(false);
                                }}
                              >
                                <AiOutlineClose fontSize={20} />
                              </button>
                              <div className="select_wrap">
                                <div className="select_title">카메라 설정</div>
                                {Object.values(videoInput).map((list, i) => {
                                  return (
                                    <button
                                      type="button"
                                      className="select"
                                      key={i}
                                      onClick={async () => {
                                        try {
                                          await omnitalk.setVideoDevice(
                                            list.deviceId
                                          );
                                          setCamera(false);
                                        } catch (error) {
                                          console.log(error);
                                        }
                                      }}
                                    >
                                      {list.label}
                                    </button>
                                  );
                                })}
                              </div>
                            </>
                          )}
                        </div>
                      </>
                    </div>
                  )}

                  {/* remote video_mute시 화면 */}
                  {remotAudiooMute && (
                    <AiOutlineAudioMuted
                      color="red"
                      fontSize={22}
                      style={{
                        position: "absolute",
                        top: "30px",
                        left: "30px",
                        zIndex: 30,
                      }}
                    />
                  )}
                  {remoteVideoMute && (
                    <>
                      <div className="camera_icon">
                        <BsCameraVideoOff
                          color="red"
                          fontSize={40}
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            zIndex: 21,
                          }}
                        />
                        <video className="remote_video_mute" />
                      </div>
                    </>
                  )}

                  {/* remote video연결 */}
                  <div className="video_wrap">
                    <video id="Omnitalk-RemoteVideo-0" autoPlay playsInline />
                    {/* local video_mute시 */}
                    {localAudioMute && (
                      <AiOutlineAudioMuted
                        color="red"
                        fontSize="22px"
                        style={{
                          position: "absolute",
                          top: "30px",
                          right: "60px",
                          zIndex: 60,
                        }}
                      />
                    )}
                    {/* local video연결 */}
                    <div className="local_video_container">
                      {localVideoMute && (
                        <>
                          <BsCameraVideoOff
                            color="red"
                            fontSize={22}
                            style={{
                              position: "absolute",
                              top: "30px",
                              right: "30px",
                              zIndex: 50,
                            }}
                          />
                          <span className="videomut_background" />
                        </>
                      )}
                      <video id="Omnitalk-LocalVideo-0" autoPlay playsInline />
                    </div>
                  </div>
                </>
              )}
            </StyledCallForm>
          ) : null}
        </section>
      </StyledContents>
    </>
  );
}
