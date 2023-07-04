import styled, { css } from "styled-components";

export const disabledBtn = css`
  width: 410px;
  height: 48px;
  border-radius: 5px;
  background-color: rgba(255, 83, 29, 0.5);
  font-size: 1rem;
  color: white;
`;

export const defaultInput = css`
  width: 408px;
  height: 48px;
  padding: 10px;
  border: 1px solid #d1d1d1;
  border-radius: 5px;
  ::placeholder {
    font-size: 0.95rem;
    color: #d1d1d1;
    padding-left: 10px;
  }
  outline: none;
`;

export const defaultFlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const transformXCenter = css`
  left: 50%;
  transform: translateX(-50%);
`;

export const absoluteCenter = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const defaultButton = css`
  border: 0;
  border-radius: 10px;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.08);
  background-color: #fff;
`;

export const fontBox = css`
  width: 120px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ebebeb;
  border-radius: 5px;
`;

export const size = {
  width: "1200px",
  footer: "150px",
  left: "250px",
};

export const fontSize = {
  large: "2.75rem",
  medium: "1.5rem",
  regular: "1.125rem",
  small: "1rem",
  micro: "0.875rem",
  space: "0.75rem",
  devDocTitle: "40px",
  devDocSecTitle: "36px",
  devDocSubTitle: "28px",
  devDocText: "16px",
  devDocStrong: "15px",
};

export const fontWeight = {
  bold: 700,
  semiBold: 600,
  medium: 500,
  regular: 400,
  light: 300,
};

export const palette = {
  white: "#FFF",
  black: "#000",
  gray: {
    light: "#f9f9f9",
    bright: "#EBEBEB",
    middle: "#C4C4C4",
    dark: "#9D9D9D",
    boxColor: "#fafafa",
    camera: "#d9d9d9",
    normal: "#A4A3A3",
    formBorder: "#D1D1D1",
    consoleBar: "#D7D7D7",
    main: "#6b7684",
  },
  main: {
    default: "#FA5734",
    bright: "#E86B3A",
    light: "#FFAB8F",
    vivid: "#FF531D",
    disabled: "rgba(255,83,29,0.5)",
    darker: "#de4917",
  },
  opacity: "rgba(0,0,0,0)",
  text: {
    default: "#333",
    light: "#666",
    disabled: "#999",
    gray: "#A4A3A3",
  },
  blue: {
    default: "#FA5734",
    dark: "#ED571D",
    lighten: "rgba(255, 140, 140, 0.2)",
  },
  red: {
    default: "#07BF72",
    dark: "#06AD67",
  },
  shadow: "-2px 0 10px rgba(0,0,0,0.08)",
  btnShadow: "3px 2px 2px rgba(0,0,0,0.1)",
};

export const StyledContents = styled.div`
  width: 100%;
  padding: 0;
  section {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.03);
  }
  .callList_wrap {
    width: 400px;
    height: 100%;
    margin: 0 auto;
    h4 {
      padding: 0 5%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 400;
      color: ${palette.text.default};
      margin-bottom: 30px;
      position: relative;
      .refresh_button {
        display: flex;
        align-items: center;
        border: 0;
        background-color: rgba(0, 0, 0, 0);
        color: #999;
        :hover {
          cursor: pointer;
          color: ${palette.text.default};
        }
      }
    }
    .call_list_container {
      width: 100%;
      height: 100%;
      border: 1px solid rgba(0, 0, 0, 0);
      .call_list_card {
        width: 400px;
        height: 80px;
        padding: 0 5%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        color: ${palette.text.default};
        border: 0;
        background-color: ${palette.white};
        border-bottom: 1px solid ${palette.gray.formBorder};
        :hover {
          font-weight: ${fontWeight.bold};
          font-size: ${fontSize.regular};
          color: ${palette.main.vivid};
          cursor: pointer;
        }
        :first-child {
          border-top-right-radius: 10px;
          border-top-left-radius: 10px;
        }
        :last-child {
          margin-bottom: 80px;
          border: 0;
          border-bottom-right-radius: 10px;
          border-bottom-left-radius: 10px;
        }
        span {
          font-size: 14px;
          color: #999;
          margin-left: 10px;
        }
      }
    }
  }
  @media screen and (max-width: 580px) and (min-width: 230px) {
    .callList_wrap {
      width: 100%;
      padding: 0 5%;
      h4 {
        padding: 0;
      }
      .call_list_container {
        .call_list_card {
          width: 100%;
          height: 50px;
          padding: 0 5%;
          font-size: 14px;
          :hover {
            font-size: 16px;
          }
        }
      }
    }
  }
`;

export const StyledCallForm = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  border-radius: 15px;
  background-color: ${palette.gray.boxColor};
  position: relative;
  overflow: hidden;
  .background {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 10;
  }
  h2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 1.5rem;
  }
  button {
    position: relative;
    background-color: rgba(0, 0, 0, 0);
  }
  .camera_icon {
    width: 100%;
    height: 100%;
    z-index: 22;
    video {
      width: 100%;
      height: 100%;
      background-color: #0b0a20;
    }
    .local_video_mute {
      display: block;
      width: 30%;
      height: 31%;
      padding-top: 20px;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 30;
      background-color: #0b0a20;
      border: 1px solid lightgrey;
    }
    .remote_video_mute {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
  }
  .device_modal {
    position: absolute;
    bottom: 100px;
    left: 40%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: row-reverse;
    z-index: 100;
    .device_modal_close {
      width: 40px;
      height: 40px;
      background-color: #fff;
    }
    .select_wrap {
      width: 100%;
      z-index: 50;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #fff;
      border-radius: 5px;
      .select_title {
        width: 280px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        background-color: #fff;
        border-bottom: 1px solid ${palette.gray.middle};
      }
      .select {
        width: 280px;
        background-color: #fff;
        border-radius: 0;
        border-bottom: 1px solid ${palette.gray.middle};
      }
    }
  }
  h4 {
    display: inline-block;
    width: 100%;
    margin: 0;
    margin-bottom: 20px;
    text-align: start;
    font-weight: ${fontWeight.regular};
    font-size: ${fontSize.regular};
  }
  .name {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: ${fontSize.medium};
    color: #fff;
    z-index: 10;
  }
  .video_wrap {
    width: 100%;
    height: 100vh;
    background-color: #0b0a20;
    position: relative;
    video:first-child {
      /* remote-video */
      position: absolute;
      width: 100%;
      right: 0;
      top: 0;
    }
    .local_video_container {
      width: 30%;
      height: 300px;
      float: right;
      position: relative;
      .videomut_background {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-color: #0b0a20;
        z-index: 26;
      }
      video {
        width: 100%;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 25;
      }
    }

    .remote_video_mute {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
  }
  .btn_wrap {
    position: absolute;
    top: 85%;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 80px;
    ${defaultFlexCenter}
    justify-content: center;
    /* background-color: #13131c; */
    z-index: 21;
    button {
      width: 60px;
      height: 60px;
      margin: 0 10px;
      background-color: rgba(0, 0, 0, 0.6);
      border: 0;
      border-radius: 5px;
      :hover {
        cursor: pointer;
      }
    }
  }
  @media screen and (max-width: 580px) and (min-width: 230px) {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    border-radius: 15px;
    background-color: ${palette.gray.boxColor};
    position: relative;
    overflow: hidden;
    .background {
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 10;
    }
    h2 {
      text-align: center;
      margin-bottom: 20px;
      font-size: 1.5rem;
    }
    button {
      position: relative;
      background-color: rgba(0, 0, 0, 0);
    }
    .camera_icon {
      width: 100%;
      height: 100%;
      z-index: 22;
      video {
        width: 100%;
        height: 100%;
        background-color: #0b0a20;
      }
      .local_video_mute {
        display: block;
        width: 30%;
        height: 31%;
        padding-top: 20px;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 30;
        background-color: #0b0a20;
        border: 1px solid lightgrey;
      }
      .remote_video_mute {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
      }
    }
    .device_modal {
      position: absolute;
      bottom: 100px;
      left: 40%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: row-reverse;
      z-index: 100;
      .device_modal_close {
        width: 40px;
        height: 40px;
        background-color: #fff;
      }
      .select_wrap {
        width: 100%;
        z-index: 50;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #fff;
        border-radius: 5px;
        .select_title {
          width: 280px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          background-color: #fff;
          border-bottom: 1px solid ${palette.gray.middle};
        }
        .select {
          width: 280px;
          background-color: #fff;
          border-radius: 0;
          border-bottom: 1px solid ${palette.gray.middle};
        }
      }
    }
    h4 {
      display: inline-block;
      width: 100%;
      margin: 0;
      margin-bottom: 20px;
      text-align: start;
      font-weight: ${fontWeight.regular};
      font-size: ${fontSize.regular};
    }
    .name {
      font-size: 16px;
    }
    .video_wrap {
      video:first-child {
        width: 270%;
        right: -70%;
      }
      .local_video_container {
        width: 50%;
        height: 400px;
        float: right;
        overflow: hidden;
        position: relative;
        .videomut_background {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;
          background-color: #0b0a20;
          z-index: 26;
        }
        video {
          width: 220%;
          position: absolute;
          top: 0;
          right: -35%;
          z-index: 25;
        }
      }
      .remote_video_mute {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
      }
    }
    .btn_wrap {
      button {
        width: 50px;
        height: 50px;
        margin: 0 6px;
      }
    }
  }
`;
