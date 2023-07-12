import { Omnitalk } from "omnitalk-ts-sdk";
import { useEffect, useState } from "react";
import {
  StyledAudioCallForm,
  StyledAudioCall,
  StyledListBtn,
} from "./style/style";
import CallStep1 from "./components/CallStep1";
import Timer from "./components/hook/Timer";
import { Bell, Ringing } from "./components/media/Ringing";
import CallingSpinner from "./style/CallingSpinner";
import { useRef } from "react";
import { IoMdRefresh } from "react-icons/io";
import { ImPhoneHangUp, ImPhone } from "react-icons/im";
import {
  AiOutlineAudioMuted,
  AiFillAudio,
  AiOutlineSetting,
} from "react-icons/ai";
import { VscChromeClose } from "react-icons/vsc";

// SERVICE ID for WEB
// SERVICE ID, SERVICE KEY for APP
const SERVICE_ID = "SERVICE ID를 입력하세요";
const SERVICE_KEY = "SERVICE KEY를 입력하세요";
Omnitalk.init(SERVICE_ID, SERVICE_KEY);
const omnitalk = Omnitalk.getInstance();

export default function AudioCall() {
  const [sessionId, setSessionId] = useState(""); // createSession();
  const [regiNum, setRegiNum] = useState("");
  const [callee, setCallee] = useState(""); // callee 수신자

  // call list
  const [callList, setCallList] = useState(false);
  const [callListArr, setCallListArr] = useState([]);
  const [active, setActive] = useState(false);

  // ui
  const [createToggle, setCreateToggle] = useState(true);
  const [ringingToggle, setRingingToggle] = useState(false);
  const [answerToggle, setAnswerToggle] = useState(false);
  const [callToggle, setCallToggle] = useState(false);

  const [audioinput, setAudioinput] = useState([]);
  const [audiomuteButton, setAudiomuteButton] = useState(false);
  const [audioinputToggle, setAudioinputToggle] = useState(false);
  const [calleeMute, setCalleeMute] = useState("");
  const [callerMute, setCallerMute] = useState("");

  const userId = useRef();
  const calleeRef = useRef();
  const callerRef = useRef();

  // on
  omnitalk.on("close", () => {});
  useEffect(() => {
    omnitalk.on("event", async (msg) => {
      switch (msg.cmd) {
        case "RINGING_EVENT":
          setCreateToggle(false);
          setCallList(false);
          setAnswerToggle(true);
          callerRef.current = msg.caller;
          break;
        case "CONNECTED_EVENT":
          setCallToggle(true);
          setCreateToggle(false);
          setCallList(false);
          // setOfferCallToggle(false);
          setAnswerToggle(false);
          setRingingToggle(false);

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
        default:
          break;
      }
    });
  }, []);

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

  const handleChange = (e) => {
    setRegiNum(e.target.value);
  };

  const handleInit = async () => {
    try {
      const sessionResult = await omnitalk.createSession(regiNum);
      setSessionId(sessionResult.session);
      userId.current = sessionResult.user_id;
      await omnitalk.sessionList().then((res) => {
        setCallListArr(res.list);
      });
      await omnitalk.getDeviceList().then((res) => {
        setAudioinput(res.audioinput);
      });
      setCallList(true);
    } catch (error) {
      console.log(error);
    } finally {
      setRegiNum("");
    }
  };

  const handleOfferCall = async (callee) => {
    try {
      await omnitalk.offerCall("audiocall", callee);
    } catch (error) {
      console.log(error);
    } finally {
      setCallList(false);
    }
  };

  const handleLeave = async () => {
    try {
      await omnitalk.leave(sessionId.session);
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
    }
  };

  const refresh = async (e) => {
    e.preventDefault();
    try {
      await omnitalk.sessionList().then((res) => {
        setCallListArr(res.list);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <StyledAudioCall>
        {/* 1.번호 등록 */}
        {createToggle && (
          <CallStep1
            regiNum={regiNum}
            handleInit={handleInit}
            handleChange={handleChange}
          />
        )}

        {callList && (
          <div className="list_container">
            {callListArr.length === 0 ? (
              <div className="user_id">
                <span>리스트가 존재하지 않습니다.</span>
                <button
                  type="button"
                  className="refresh_button"
                  onClick={refresh}
                >
                  Refresh
                  <IoMdRefresh fontSize={26} color="#FA5734" />
                </button>
              </div>
            ) : (
              <div className="user_id">
                <p>
                  {userId.current}
                  <span>님의 통화가능 목록입니다.</span>
                </p>
                <button
                  type="button"
                  className="refresh_button"
                  onClick={refresh}
                >
                  Refresh
                  <IoMdRefresh fontSize={26} color="#FA5734" />
                </button>
              </div>
            )}
            <div className="call_list_wrap">
              {callListArr.map((list, i) => {
                return (
                  <StyledListBtn
                    key={i}
                    type="button"
                    className={active === list.user_id ? "active" : ""}
                    disabled={list.state === "busy" ? true : false}
                    value={list.user_id}
                    onClick={(el) => {
                      setActive(el.target.value);
                      setCallee(el.target.value);
                      calleeRef.current = el.target.value;
                    }}
                  >
                    {list.state === "busy" ? (
                      <>
                        <span className="state">통화중</span>
                        <>{list.user_id}</>
                      </>
                    ) : (
                      <>{list.user_id}</>
                    )}
                  </StyledListBtn>
                );
              })}
            </div>
            <div className="bottom">
              <button
                type="button"
                disabled={callee === "" ? true : false}
                onClick={() => {
                  handleOfferCall(calleeRef.current);
                  setRingingToggle(true);
                  setCreateToggle(false);
                  setCallList(false);
                }}
              >
                전화걸기
              </button>
            </div>
          </div>
        )}

        {/* 3. callee view */}
        {answerToggle && (
          <StyledAudioCallForm>
            <h3>Audio Call</h3>
            <p className="name">{callerRef.current}</p>
            <p className="calling">전화 요청중</p>
            <Bell />
            <div className="calling_spinner">
              <CallingSpinner calling="true" />
            </div>
            <div className="btn_wrap">
              <button
                type="button"
                className="roomIcon"
                onClick={async () => {
                  await omnitalk.answerCall("audiocall");
                }}
              >
                <ImPhone />
              </button>
              <button
                className="roomIcon"
                type="button"
                onClick={async () => {
                  await handleLeave();
                }}
              >
                <ImPhoneHangUp />
              </button>
            </div>
          </StyledAudioCallForm>
        )}

        {/* 3. caller view */}
        {ringingToggle && (
          <StyledAudioCallForm>
            <h3>Audio Call</h3>
            <p className="name">{calleeRef.current}</p>
            <p className="calling">전화 연결중</p>
            <Ringing />
            <div className="calling_spinner">
              <CallingSpinner />
            </div>
            <div className="btn_wrap">
              <button
                type="button"
                className="roomIcon"
                onClick={() => {
                  handleLeave();
                }}
              >
                <ImPhoneHangUp />
              </button>
            </div>
          </StyledAudioCallForm>
        )}

        {/* 4. Connected */}
        {callToggle && (
          <StyledAudioCallForm>
            <h3>Audio Call</h3>
            <p className="name">
              <span>{calleeRef.current || callerRef.current}</span>
              <span>{calleeMute || callerMute}</span>
            </p>

            {/* 음소거 설정 */}
            <div className="menu_wrap">
              {audiomuteButton ? (
                <>
                  <button
                    className="roomIcon"
                    type="button"
                    onClick={async () => {
                      await omnitalk.setUnmute("audio");
                      setAudiomuteButton(false);
                      setAudioinputToggle(false);
                    }}
                  >
                    <AiOutlineAudioMuted color="mediumpurple" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="roomIcon"
                    type="button"
                    onClick={async () => {
                      await omnitalk.setMute("audio");
                      setAudiomuteButton(true);
                      setAudioinputToggle(false);
                    }}
                  >
                    <AiFillAudio />
                  </button>
                </>
              )}
              {/* 오디오 설정 */}
              <button
                className="roomIcon"
                type="button"
                onClick={() => {
                  setAudioinputToggle((prev) => !prev);
                }}
              >
                <span>
                  <AiOutlineSetting />
                </span>
              </button>
            </div>
            {audioinputToggle && (
              <div className="select_wrap">
                <div className="top">
                  <h3>오디오 설정</h3>
                  <button
                    type="button"
                    onClick={() => setAudioinputToggle(false)}
                  >
                    <VscChromeClose />
                  </button>
                </div>
                <div className="center">
                  {Object.values(audioinput).map((list, i) => {
                    return (
                      <button
                        type="button"
                        className="select"
                        key={i}
                        onClick={async () => {
                          await omnitalk.setAudioDevice(list.deviceId);
                          setAudioinputToggle(false);
                        }}
                      >
                        {list.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            <Timer />

            <div className="btn_wrap">
              <button
                type="button"
                className="roomIcon"
                onClick={() => {
                  handleLeave();
                }}
              >
                <ImPhoneHangUp />
              </button>
            </div>
          </StyledAudioCallForm>
        )}
      </StyledAudioCall>
    </>
  );
}
