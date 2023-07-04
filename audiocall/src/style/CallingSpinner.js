import React from "react";
import styled from "styled-components";
import { palette } from "./style";

function CallingSpinner({ connected }) {
  return (
    <StyledWrap>
      <div className="wrapper">
        <div className="ring">
          <div className="coccoc-alo-phone coccoc-alo-green coccoc-alo-show">
            <div className="coccoc-alo-ph-circle"></div>
            <div className="coccoc-alo-ph-circle-fill"></div>
            <div className="coccoc-alo-ph-img-circle"></div>
          </div>
        </div>
      </div>
    </StyledWrap>
  );
}

export default CallingSpinner;

const StyledWrap = styled.div`
  .coccoc-alo-ph-circle {
    width: 160px;
    height: 160px;
    top: 20px;
    left: 20px;
    position: absolute;
    background-color: ${palette.main.disabled};
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    border: 2px solid ${palette.main.vivid};
    opacity: 0.1;
    -webkit-animation: coccoc-alo-circle-anim 1.2s infinite ease-in-out;
    -moz-animation: coccoc-alo-circle-anim 1.2s infinite ease-in-out;
    -ms-animation: coccoc-alo-circle-anim 1.2s infinite ease-in-out;
    -o-animation: coccoc-alo-circle-anim 1.2s infinite ease-in-out;
    animation: coccoc-alo-circle-anim 1.2s infinite ease-in-out;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
  }

  .coccoc-alo-phone {
    width: 200px;
    height: 200px;
    cursor: pointer;
    z-index: 200000 !important;
    -webkit-backface-visibility: hidden;
    -webkit-transform: translateZ(0);
    -webkit-transition: visibility 0.5s;
    -moz-transition: visibility 0.5s;
    -o-transition: visibility 0.5s;
    transition: visibility 0.5s;
    right: 150px;
    top: 30px;
  }

  .coccoc-alo-phone.coccoc-alo-green .coccoc-alo-ph-circle-fill {
    background-color: ${palette.main.disabled};
    opacity: 0.75 !important;
  }

  .coccoc-alo-ph-circle-fill {
    width: 100px;
    height: 100px;
    top: 50px;
    left: 50px;
    position: absolute;
    background-color: #000;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    border: 2px solid ${palette.main.disabled};
    opacity: 0.1;
    -webkit-animation: coccoc-alo-circle-fill-anim 2.3s infinite ease-in-out;
    -moz-animation: coccoc-alo-circle-fill-anim 2.3s infinite ease-in-out;
    -ms-animation: coccoc-alo-circle-fill-anim 2.3s infinite ease-in-out;
    -o-animation: coccoc-alo-circle-fill-anim 2.3s infinite ease-in-out;
    animation: coccoc-alo-circle-fill-anim 2.3s infinite ease-in-out;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
  }

  .coccoc-alo-ph-img-circle {
    width: 60px;
    height: 60px;
    top: 70px;
    left: 70px;
    position: absolute;
    background: rgba(30, 30, 30, 0.1)
      url(https://drive.google.com/uc?id=1V3N2b79QjDWetC_ss9wI3c-xpWDymn9R)
      no-repeat center center;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    border: 2px solid ${palette.main.vivid};
    opacity: 0.7;
    -webkit-animation: coccoc-alo-circle-img-anim 1s infinite ease-in-out;
    -moz-animation: coccoc-alo-circle-img-anim 1s infinite ease-in-out;
    -ms-animation: coccoc-alo-circle-img-anim 1s infinite ease-in-out;
    -o-animation: coccoc-alo-circle-img-anim 1s infinite ease-in-out;
    animation: coccoc-alo-circle-img-anim 1s infinite ease-in-out;
  }

  .coccoc-alo-phone.coccoc-alo-green .coccoc-alo-ph-img-circle {
    background-color: ${palette.main.vivid};
  }

  .coccoc-alo-phone.coccoc-alo-green .coccoc-alo-ph-circle {
    border-color: ${palette.main.vivid};
    opacity: 0.5;
  }

  .coccoc-alo-phone.coccoc-alo-green.coccoc-alo-hover .coccoc-alo-ph-circle,
  .coccoc-alo-phone.coccoc-alo-green:hover .coccoc-alo-ph-circle {
    border-color: ${palette.main.vivid};
    opacity: 0.5;
  }

  .coccoc-alo-phone.coccoc-alo-green.coccoc-alo-hover
    .coccoc-alo-ph-circle-fill,
  .coccoc-alo-phone.coccoc-alo-green:hover .coccoc-alo-ph-circle-fill {
    background-color: ${palette.main.light};
    opacity: 0.75 !important;
  }

  .coccoc-alo-phone.coccoc-alo-green.coccoc-alo-hover .coccoc-alo-ph-img-circle,
  .coccoc-alo-phone.coccoc-alo-green:hover .coccoc-alo-ph-img-circle {
    background-color: ${palette.main.vivid};
  }

  @-moz-keyframes coccoc-alo-circle-anim {
    0% {
      transform: rotate(0) scale(0.5) skew(1deg);
      opacity: 0.1;
    }
    30% {
      transform: rotate(0) scale(0.7) skew(1deg);
      opacity: 0.5;
    }
    100% {
      transform: rotate(0) scale(1) skew(1deg);
      opacity: 0.1;
    }
  }

  @-webkit-keyframes coccoc-alo-circle-anim {
    0% {
      transform: rotate(0) scale(0.5) skew(1deg);
      opacity: 0.1;
    }
    30% {
      transform: rotate(0) scale(0.7) skew(1deg);
      opacity: 0.5;
    }
    100% {
      transform: rotate(0) scale(1) skew(1deg);
      opacity: 0.1;
    }
  }

  @-o-keyframes coccoc-alo-circle-anim {
    0% {
      transform: rotate(0) scale(0.5) skew(1deg);
      opacity: 0.1;
    }
    30% {
      transform: rotate(0) scale(0.7) skew(1deg);
      opacity: 0.5;
    }
    100% {
      transform: rotate(0) scale(1) skew(1deg);
      opacity: 0.1;
    }
  }

  @keyframes coccoc-alo-circle-anim {
    0% {
      transform: rotate(0) scale(0.5) skew(1deg);
      opacity: 0.1;
    }
    30% {
      transform: rotate(0) scale(0.7) skew(1deg);
      opacity: 0.5;
    }
    100% {
      transform: rotate(0) scale(1) skew(1deg);
      opacity: 0.1;
    }
  }

  @-moz-keyframes coccoc-alo-circle-fill-anim {
    0% {
      transform: rotate(0) scale(0.7) skew(1deg);
      opacity: 0.2;
    }
    50% {
      transform: rotate(0) scale(1) skew(1deg);
      opacity: 0.2;
    }
    100% {
      transform: rotate(0) scale(0.7) skew(1deg);
      opacity: 0.2;
    }
  }

  @-webkit-keyframes coccoc-alo-circle-fill-anim {
    0% {
      transform: rotate(0) scale(0.7) skew(1deg);
      opacity: 0.2;
    }
    50% {
      transform: rotate(0) scale(1) skew(1deg);
      opacity: 0.2;
    }
    100% {
      transform: rotate(0) scale(0.7) skew(1deg);
      opacity: 0.2;
    }
  }

  @-o-keyframes coccoc-alo-circle-fill-anim {
    0% {
      transform: rotate(0) scale(0.7) skew(1deg);
      opacity: 0.2;
    }
    50% {
      transform: rotate(0) scale(1) skew(1deg);
      opacity: 0.2;
    }
    100% {
      transform: rotate(0) scale(0.7) skew(1deg);
      opacity: 0.2;
    }
  }

  @keyframes coccoc-alo-circle-fill-anim {
    0% {
      transform: rotate(0) scale(0.7) skew(1deg);
      opacity: 0.2;
    }
    50% {
      transform: rotate(0) scale(1) skew(1deg);
      opacity: 0.2;
    }
    100% {
      transform: rotate(0) scale(0.7) skew(1deg);
      opacity: 0.2;
    }
  }

  @-moz-keyframes coccoc-alo-circle-img-anim {
    0% {
      transform: rotate(0) scale(1) skew(1deg);
    }
    10% {
      transform: rotate(-25deg) scale(1) skew(1deg);
    }
    20% {
      transform: rotate(25deg) scale(1) skew(1deg);
    }
    30% {
      transform: rotate(-25deg) scale(1) skew(1deg);
    }
    40% {
      transform: rotate(25deg) scale(1) skew(1deg);
    }
    50% {
      transform: rotate(0) scale(1) skew(1deg);
    }
    100% {
      transform: rotate(0) scale(1) skew(1deg);
    }
  }

  @-webkit-keyframes coccoc-alo-circle-img-anim {
    0% {
      transform: rotate(0) scale(1) skew(1deg);
    }
    10% {
      transform: rotate(-25deg) scale(1) skew(1deg);
    }
    20% {
      transform: rotate(25deg) scale(1) skew(1deg);
    }
    30% {
      transform: rotate(-25deg) scale(1) skew(1deg);
    }
    40% {
      transform: rotate(25deg) scale(1) skew(1deg);
    }
    50% {
      transform: rotate(0) scale(1) skew(1deg);
    }
    100% {
      transform: rotate(0) scale(1) skew(1deg);
    }
  }

  @-o-keyframes coccoc-alo-circle-img-anim {
    0% {
      transform: rotate(0) scale(1) skew(1deg);
    }
    10% {
      transform: rotate(-25deg) scale(1) skew(1deg);
    }
    20% {
      transform: rotate(25deg) scale(1) skew(1deg);
    }
    30% {
      transform: rotate(-25deg) scale(1) skew(1deg);
    }
    40% {
      transform: rotate(25deg) scale(1) skew(1deg);
    }
    50% {
      transform: rotate(0) scale(1) skew(1deg);
    }
    100% {
      transform: rotate(0) scale(1) skew(1deg);
    }
  }

  @keyframes coccoc-alo-circle-img-anim {
    0% {
      transform: rotate(0) scale(1) skew(1deg);
    }
    10% {
      transform: rotate(-25deg) scale(1) skew(1deg);
    }
    20% {
      transform: rotate(25deg) scale(1) skew(1deg);
    }
    30% {
      transform: rotate(-25deg) scale(1) skew(1deg);
    }
    40% {
      transform: rotate(25deg) scale(1) skew(1deg);
    }
    50% {
      transform: rotate(0) scale(1) skew(1deg);
    }
    100% {
      transform: rotate(0) scale(1) skew(1deg);
    }
  }
`;
