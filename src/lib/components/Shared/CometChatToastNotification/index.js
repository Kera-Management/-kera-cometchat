import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Text, Button, keyframes } from "@chakra-ui/react";

import Translator from "../../../resources/localization/translator";
import { theme } from "../../../resources/theme";

import closeIcon from "./resources/close-circle-filled.svg";
import successIcon from "./resources/checkmark-filled.svg";
import errorIcon from "./resources/warning-filled.svg";
import infoIcon from "./resources/info-filled.svg";
import warningIcon from "./resources/warning-filled.svg";

export class CometChatToastNotification extends React.Component {
  interval;
  static types = {
    INFO: "info",
    WARNING: "warning",
    SUCCESS: "success",
    ERROR: "error",
  };

  constructor(props) {
    super(props);

    this._isMounted = false;
    this.state = {
      type: "",
      message: "",
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount = () => {
    this._isMounted = false;
    this.clearAutoDismiss();
  };

  setInfo = (message) => {
    if (this._isMounted) {
      this.setState({ type: "INFO", message: message, icon: infoIcon });
      this.setAutoDismiss();
    }
  };

  setError = (message) => {
    if (this._isMounted) {
      this.setState({ type: "ERROR", message: message, icon: errorIcon });
      //this.setAutoDismiss();
    }
  };

  setSuccess = (message) => {
    if (this._isMounted) {
      this.setState({ type: "SUCCESS", message: message, icon: successIcon });
      this.setAutoDismiss();
    }
  };

  setWarning = (message) => {
    if (this._isMounted) {
      this.setState({ type: "WARNING", message: message, icon: warningIcon });
      this.setAutoDismiss();
    }
  };

  setAutoDismiss = () => {
    this.clearAutoDismiss();

    if (this.props.autoDelete) {
      this.interval = setTimeout(
        () => this.deleteToast(),
        this.props.dismissTime
      );
    }
  };

  clearAutoDismiss = () => {
    clearTimeout(this.interval);
  };

  deleteToast = () => {
    this.setState({ type: "", message: "", icon: "" });
  };

  render() {
    if (!this.state.type.trim().length || !this.state.message.trim().length) {
      return null;
    }

    const messageClassName = `toast__message message-${
      CometChatToastNotification.types[this.state.type]
    }`;
    const iconClassName = `toast__icon icon-${
      CometChatToastNotification.types[this.state.type]
    }`;
    const getBackgroundColor = () => {
      switch (this.state.type) {
        case "ERROR":
          return "#d9534f";
        case "SUCCESS":
          return "#5cb85c";
        case "INFO":
          return "#5bc0de";
        case "WARNING":
          return "#f0ad4e";
        default:
          return "#000";
      }
    };

    let toastIcon = this.state.icon.trim().length ? (
      <Box
        className={iconClassName}
        marginRight="16px"
        width="25px"
        height="25px"
        flexShrink="0"
        sx={{
          img: {
            maxWidth: "100%",
          }
        }}
      >
        <Box
          as="i"
          title={Translator.translate("CLOSE", this.props.lang)}
          width="24px"
          height="24px"
          display="inline-block"
          sx={{
            mask: `url(${this.state.icon}) center center no-repeat`,
            backgroundColor: this.props.theme.color.white,
          }}
        />
      </Box>
    ) : null;

    return (
      <Box
        className="toast__notification"
        fontSize="14px"
        boxSizing="border-box"
        position="absolute"
        zIndex="5"
        width="80%"
        maxWidth="320px"
        top="70px"
        left="50%"
        transform="translate(-50%, 0)"
      >
        <Flex
          className="toast__container"
          transition=".3s ease"
          position="relative"
          pointerEvents="auto"
          overflow="hidden"
          padding="8px"
          marginBottom="16px"
          fontSize="13px"
          width="100%"
          minHeight="50px"
          boxShadow="0 0 10px #999"
          color="#fff"
          backgroundColor={getBackgroundColor()}
          backgroundPosition="15px"
          backgroundRepeat="no-repeat"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
          boxSizing="border-box"
        >
          {toastIcon}
          <Box
            className={messageClassName}
            width="calc(100% - 60px)"
          >
            <Text
              margin="0"
              textAlign="left"
              marginLeft="-1px"
            >
              {Translator.translate(this.state.message, this.props.lang)}
            </Text>
          </Box>
          <Button
            className="toast__close"
            type="button"
            onClick={this.deleteToast}
            width="25px"
            height="25px"
            padding="0"
            border="none"
            outline="none"
            backgroundColor="transparent"
            cursor="pointer"
            sx={{
              img: {
                flexShrink: "0",
                maxWidth: "100%"
              }
            }}
          >
            <Box
              as="i"
              title={Translator.translate("CLOSE", this.props.lang)}
              width="24px"
              height="24px"
              display="inline-block"
              sx={{
                mask: `url(${closeIcon}) center center no-repeat`,
                backgroundColor: this.props.theme.color.white,
              }}
            />
          </Button>
        </Flex>
      </Box>
    );
  }
}

CometChatToastNotification.defaultProps = {
  type: "",
  message: "",
  icon: "",
  position: "center",
  autoDelete: true,
  dismissTime: 3000,
  lang: Translator.getDefaultLanguage(),
  theme: theme,
};

CometChatToastNotification.propTypes = {
  type: PropTypes.oneOf(
    Object.values(CometChatToastNotification.types).concat("")
  ),
  message: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  position: PropTypes.oneOf([
    "top-right",
    "bottom-right",
    "top-left",
    "bottom-left",
    "center",
  ]),
  autoDelete: PropTypes.bool,
  dismissTime: PropTypes.number,
  lang: PropTypes.string,
  theme: PropTypes.object,
};
