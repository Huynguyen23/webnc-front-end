import React from "react";
import { Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import PropTypes from "prop-types";
import useResendOTP from "../hooks/resendOTP";
import {ResendIcon} from './icon';
function ResendOTP({ renderTime, renderButton, style, className, ...props }) {
  const { remainingTime, handelResendClick } = useResendOTP(props);
  return (
    <div
      className={className || ""}
      data-testid="otp-resend-root"
      style={{
        height:10,
        display: "flex",
        justifyContent: "space-between",
        ...style
      }}
    >
      {renderTime ? (
        renderTime(remainingTime)
      ) : (
        <span style={{marginTop:10}}>{remainingTime} sec</span>
      )}
      {renderButton ? (
        renderButton({
          disabled: remainingTime !== 0,
          onClick: handelResendClick,
          remainingTime
        })
      ) : (
        <Button
          onClick={handelResendClick}
          style={{marginTop:5,color:'#006600', borderColor:'#FFFFFF', backgroundColor:'#FFFFFF'}}
          disabled={remainingTime !== 0}>
          <SendOutlined />
          Gửi lại
        </Button>
      )}
    </div>
  );
}

ResendOTP.defaultProps = {
  maxTime: 60,
  timeInterval: 1000,
  style: {}
};

ResendOTP.propTypes = {
  onTimerComplete: PropTypes.func,
  onResendClick: PropTypes.func,
  renderTime: PropTypes.func,
  renderButton: PropTypes.func,
  maxTime: PropTypes.number,
  timeInterval: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string
};

export default ResendOTP;
