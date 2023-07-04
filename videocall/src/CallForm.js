import React, { useState } from "react";
import { ImPhone, ImPhoneHangUp } from "react-icons/im";
import { MdPictureInPictureAlt, MdCameraswitch } from "react-icons/md";
import { FiSpeaker } from "react-icons/fi";
import {
  AiFillAudio,
  AiOutlineAudioMuted,
  AiOutlineClose,
} from "react-icons/ai";
import { BsCameraVideoOff, BsFillCameraVideoFill } from "react-icons/bs";
import { StyledCallForm } from "./style/style";

const CallForm = ({
  callToggle,
  handleLeave,
  isCaller,
  caller,
  callee,
  omnitalk,
  audioInput,
  videoInput,
  resolutionInput,
}) => {
  const [resolution, setResolution] = useState(false);
  const [audio, setAudio] = useState(false);
  const [camera, setCamera] = useState(false);
  const [audiomuteButton, setAudiomuteButton] = useState(false);
  const [videomuteButton, setVideomuteButton] = useState(false);
  const [localVideoMute, setLocalVideoMute] = useState(false);
  const [localAudioMute, setLocalAudioMute] = useState(false);
  const [remoteVideoMute, setRemoteVideoMute] = useState(false);
  const [remoteAudioMute, setRemoteAudioMute] = useState(false);

  return (
    <StyledCallForm>
      {!callToggle && (
        <>
          <div className="btn_wrap">
            <button type="button" onClick={handleLeave}>
              <ImPhoneHangUp color="white" fontSize={30} />
            </button>
          </div>
          {!callToggle &&
            (isCaller ? (
              <p className="name">{callee}님을 기다리고 있습니다.</p>
            ) : (
              <p className="name">{caller}님이 영상통화를 요청합니다.</p>
            ))}
        </>
      )}

      {callToggle && (
        <div className="btn_wrap">
          {/* 통화 연결시 화면 */}
          {/* resolution설정 버튼 */}
          <button
            type="button"
            onClick={() => {
              setResolution((prev) => !prev);
              setAudio(false);
              setCamera(false);
            }}
          >
            <MdPictureInPictureAlt color="white" fontSize={30} />
          </button>
          {/* audio설정 버튼 */}
          <button
            type="button"
            onClick={() => {
              setAudio((prev) => !prev);
              setCamera(false);
              setResolution(false);
            }}
          >
            <span>
              <FiSpeaker color="#fff" fontSize="28px" />
            </span>
          </button>

          {/* 카메라 설정 버튼 */}
          <button
            type="button"
            onClick={() => {
              setCamera((prev) => !prev);
              setResolution(false);
              setAudio(false);
            }}
          >
            <MdCameraswitch color="#fff" fontSize="28px" />
          </button>

          {/* 통화 종료 버튼 */}
          <button type="button" onClick={handleLeave}>
            <ImPhoneHangUp color="white" fontSize={30} />
          </button>
        </div>
      )}
      <video
        id="localVideo"
        className={localVideoMute ? "local-video-mute" : ""}
        ref={omnitalk.localRef}
        autoPlay
        muted
      />
      <video
        id="remoteVideo"
        className={remoteVideoMute ? "remote-video-mute" : ""}
        ref={omnitalk.remoteRef}
        autoPlay
      />
      {/* 설정 창 */}
      {(resolution || audio || camera) && (
        <div className="setting_wrap">
          <div className="setting_body">
            <div className="title">
              {resolution && <h3>Resolution</h3>}
              {audio && <h3>Audio</h3>}
              {camera && <h3>Camera</h3>}
              <button
                type="button"
                className="close_btn"
                onClick={() => {
                  setResolution(false);
                  setAudio(false);
                  setCamera(false);
                }}
              >
                <AiOutlineClose fontSize={24} />
              </button>
            </div>
            {resolution && (
              <div className="resolution_setting">
                <select
                  value={videoInput}
                  onChange={(e) => {
                    const deviceId = e.target.value;
                    setLocalVideoMute(false);
                    omnitalk.setVideoInput(deviceId);
                  }}
                >
                  {omnitalk.videoInputs.map((input) => (
                    <option key={input.deviceId} value={input.deviceId}>
                      {input.label}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="mute_btn"
                  onClick={() => {
                    omnitalk.setVideoMute(!localVideoMute);
                    setLocalVideoMute((prev) => !prev);
                  }}
                >
                  {localVideoMute ? (
                    <BsCameraVideoOff color="#fff" fontSize="28px" />
                  ) : (
                    <BsFillCameraVideoFill color="#fff" fontSize="28px" />
                  )}
                </button>
              </div>
            )}
            {audio && (
              <div className="audio_setting">
                <select
                  value={audioInput}
                  onChange={(e) => {
                    const deviceId = e.target.value;
                    setLocalAudioMute(false);
                    omnitalk.setAudioInput(deviceId);
                  }}
                >
                  {omnitalk.audioInputs.map((input) => (
                    <option key={input.deviceId} value={input.deviceId}>
                      {input.label}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="mute_btn"
                  onClick={() => {
                    omnitalk.setAudioMute(!localAudioMute);
                    setLocalAudioMute((prev) => !prev);
                  }}
                >
                  {localAudioMute ? (
                    <AiOutlineAudioMuted color="#fff" fontSize="28px" />
                  ) : (
                    <AiFillAudio color="#fff" fontSize="28px" />
                  )}
                </button>
              </div>
            )}
            {camera && (
              <div className="camera_setting">
                <select
                  value={videoInput}
                  onChange={(e) => {
                    const deviceId = e.target.value;
                    omnitalk.setVideoInput(deviceId);
                  }}
                >
                  {omnitalk.videoInputs.map((input) => (
                    <option key={input.deviceId} value={input.deviceId}>
                      {input.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      )}
    </StyledCallForm>
  );
};

export default CallForm;
