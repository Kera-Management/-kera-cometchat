import React from "react";
import { Box, Flex, Button, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { CometChat } from "@cometchat-pro/chat";

import { messageAlertManager } from "./controller";

import { CometChatAvatar } from "../../Shared";
import { CometChatCallScreen } from "../CometChatCallScreen";

import { CometChatContext } from "../../../util/CometChatContext";
import * as enums from "../../../util/enums.js";
import { SoundManager } from "../../../util/SoundManager";
import { Storage } from "../../../util/Storage";

import Translator from "../../../resources/localization/translator";
import { theme } from "../../../resources/theme";

// Removed emotion styles - now using Chakra UI

import videoCallIcon from "./resources/incoming-video-call.svg";

class CometChatIncomingDirectCall extends React.PureComponent {
  static contextType = CometChatContext;

  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      incomingCall: null,
      callInProgress: null,
      maximize: true,
    };

    this.callButtonRef = React.createRef();

    CometChat.getLoggedinUser()
      .then((user) => (this.loggedInUser = user))
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    this._isMounted = true;

    this.MessageAlertManager = new messageAlertManager();
    this.MessageAlertManager.attachListeners(this.messageListenerCallback);

    Storage.attachChangeDetection(this.logStorageChange);
  }

  componentDidUpdate() {
    if (this.state.incomingCall) {
      this.adjustFontSize();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    Storage.detachChangeDetection(this.logStorageChange);
  }

  adjustFontSize = () => {
    if (this.callButtonRef && this.callButtonRef.current) {
      let reduceFontSize = false;
      const buttonNodeList =
        this.callButtonRef.current.querySelectorAll("button");

      buttonNodeList.forEach((buttonNode) => {
        const parentContainerWidth = buttonNode.clientWidth;
        const currentTextWidth = buttonNode.scrollWidth;

        if (parentContainerWidth < currentTextWidth) {
          reduceFontSize = true;
        }
      });

      if (reduceFontSize) {
        buttonNodeList.forEach((buttonNode) => {
          buttonNode.style.fontSize = "85%";
        });
      }
    }
  };

  messageListenerCallback = (key, message) => {
    switch (key) {
      case enums.CUSTOM_MESSAGE_RECEIVED: //occurs at the callee end
        this.incomingCallReceived(message);
        break;
      default:
        break;
    }
  };

  incomingCallReceived = (message) => {
    if (this._isMounted) {
      if (message.type !== enums.CUSTOM_TYPE_MEETING) {
        return false;
      }

      if (Object.keys(this.context.callInProgress).length) {
        if (
          this.context.checkIfDirectCallIsOngoing() &&
          this.context.getActiveCallSessionID() ===
            message.data.customData.sessionID
        ) {
          return false;
        }
      }

      if (message?.sender.uid !== this.loggedInUser?.uid) {
        SoundManager.play(enums.CONSTANTS.AUDIO["INCOMING_CALL"], this.context);
        this.setState({ incomingCall: message });
      }
    }
  };

  joinCall = () => {
    this.checkForActiveCallAndEndCall()
      .then((response) => {
        SoundManager.pause(
          enums.CONSTANTS.AUDIO["INCOMING_CALL"],
          this.context
        );
        this.props.actionGenerated(enums.ACTIONS["ACCEPT_DIRECT_CALL"], true);

        if (this.context) {
          this.context.setCallInProgress(
            this.state.incomingCall,
            enums.CONSTANTS["INCOMING_DIRECT_CALLING"]
          );
        }
        Storage.setItem(enums.CONSTANTS["ACTIVECALL"], this.state.incomingCall);
        this.setState({
          incomingCall: null,
          callInProgress: this.state.incomingCall,
        });
      })
      .catch((error) => {
        const errorCode =
          error && error.hasOwnProperty("code") ? error.code : "ERROR";
        this.context.setToastMessage("error", errorCode);
      });
  };

  ignoreCall = () => {
    SoundManager.pause(enums.CONSTANTS.AUDIO["INCOMING_CALL"], this.context);
    Storage.setItem(enums.CONSTANTS["ACTIVECALL"], this.state.incomingCall);
    this.setState({ incomingCall: null });
  };

  checkForActiveCallAndEndCall = () => {
    const promise = new Promise((resolve, reject) => {
      if (this.isCallActive() === false) {
        return resolve({ success: true });
      }

      let sessionID = this.getActiveCallSessionID();
      CometChat.endCall(sessionID)
        .then((response) => {
          return resolve(response);
        })
        .catch((error) => {
          return reject(error);
        });
    });

    return promise;
  };

  isCallActive = () => {
    if (Object.keys(this.context.callInProgress).length === 0) {
      return false;
    }

    let sessionID = this.getActiveCallSessionID();
    if (!sessionID) {
      return false;
    }

    return true;
  };

  getActiveCallSessionID = () => {
    return this.context.getActiveCallSessionID();
  };

  actionHandler = (action) => {
    switch (action) {
      case enums.ACTIONS["DIRECT_CALL_ENDED"]:
      case enums.ACTIONS["DIRECT_CALL_ERROR"]:
        this.setState({ callInProgress: null });
        break;
      default:
        break;
    }
  };

  logStorageChange = (event) => {
    if (event?.key !== enums.CONSTANTS["ACTIVECALL"]) {
      return false;
    }

    if (event.newValue || event.oldValue) {
      let call;
      if (event.newValue) {
        call = JSON.parse(event.newValue);
      } else if (event.oldValue) {
        call = JSON.parse(event.oldValue);
      }

      if (this.state.incomingCall?.sessionId === call?.sessionId) {
        SoundManager.pause(
          enums.CONSTANTS.AUDIO["INCOMING_CALL"],
          this.context
        );
        this.setState({ incomingCall: null });
      }
    }
  };

  render() {
    let callScreen = null,
      incomingCallAlert = null;
    if (this.state.incomingCall) {
      let avatar = (
        <Box 
          className="header__thumbnail"
          width="36px"
          height="36px"
          display="flex"
          justifyContent="center"
        >
          <CometChatAvatar
            cornerRadius="50%"
            image={this.state.incomingCall.sender.avatar}
          />
        </Box>
      );

      const callType = (
        <React.Fragment>
          <Box
            width="24px"
            height="24px"
            display="inline-block"
            cursor="pointer"
            title={Translator.translate("INCOMING_VIDEO_CALL", this.props.lang)}
            sx={{
              mask: `url(${videoCallIcon}) center center no-repeat`,
              backgroundColor: this.context.theme.secondaryTextColor,
            }}
          />
          <Text as="span" padding="0 5px">
            {Translator.translate("INCOMING_VIDEO_CALL", this.props.lang)}
          </Text>
        </React.Fragment>
      );

      // Calculate positioning based on widget settings
      let positionProps = {
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "unset",
        zIndex: "998",
      };

      if (this.props.hasOwnProperty("widgetsettings")) {
        const ws = this.props.widgetsettings;
        if (ws.hasOwnProperty("dockedview") && ws.dockedview) {
          if (ws.hasOwnProperty("launched") && ws.launched) {
            positionProps.zIndex = "2147483000";
            positionProps.position = "fixed";
            positionProps.top = "unset";
            positionProps.bottom = "100px";

            if (ws.hasOwnProperty("alignment") && ws.alignment === "left") {
              positionProps.right = "unset";
              positionProps.left = "20px";
            } else {
              positionProps.left = "unset";
              positionProps.right = "20px";
            }
          } else {
            positionProps.left = "unset";
            positionProps.position = "fixed";
          }
        } else {
          positionProps.zIndex = "2147483000";
        }
      }

      incomingCallAlert = (
        <Box
          className="callalert__wrapper"
          {...positionProps}
          borderRadius="10px"
          margin="16px"
          backgroundColor={this.props.theme.backgroundColor.callScreenGrey}
          color={this.props.theme.color.white}
          textAlign="center"
          boxSizing="border-box"
          fontFamily={this.props.theme.fontFamily}
          width="248px"
          sx={{
            animation: "slideDown 250ms ease",
            "@keyframes slideDown": {
              "0%": { transform: "translateY(-50px)" },
              "100%": { transform: "translateY(0px)" },
            },
            "*": {
              boxSizing: "border-box",
              fontFamily: this.props.theme.fontFamily,
            },
          }}
        >
          <Flex 
            className="callalert__container"
            display="flex"
            flexDirection="column"
            width="100%"
            padding="16px"
          >
            <Flex 
              className="callalert__header"
              width="100%"
              display="flex"
            >
              <Flex 
                className="header__detail"
                width="calc(100% - 36px)"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                textAlign="left"
              >
                <Text 
                  className="name"
                  fontSize="15px"
                  fontWeight="600"
                  display="block"
                  width="100%"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  lineHeight="20px"
                >
                  {this.state.incomingCall.sender.name}
                </Text>
                <Flex 
                  className="calltype"
                  fontSize="13px"
                  width="100%"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  textTransform="capitalize"
                  lineHeight="20px"
                  color="#8A8A8A"
                  display="flex"
                  justifyContent="start"
                  alignItems="center"
                  padding="2px 0 0 0px"
                >
                  {callType}
                </Flex>
              </Flex>
              {avatar}
            </Flex>
            <Flex
              className="callalert__buttons"
              ref={this.callButtonRef}
              width="100%"
              display="flex"
              justifyContent="space-between"
              margin="10px 0 0 0"
            >
              <Button
                type="button"
                className="button button__ignore"
                onClick={this.ignoreCall}
                cursor="pointer"
                padding="8px 16px"
                backgroundColor={`${this.props.theme.backgroundColor.red}!important`}
                borderRadius="5px"
                color={this.props.theme.color.white}
                fontSize="100%"
                outline="0"
                border="0"
                width="49%"
                overflow="hidden"
              >
                {Translator.translate("IGNORE", this.props.lang)}
              </Button>
              <Button
                type="button"
                className="button button__join"
                onClick={this.joinCall}
                cursor="pointer"
                padding="8px 16px"
                backgroundColor={`${this.props.theme.backgroundColor.blue}!important`}
                borderRadius="5px"
                color={this.props.theme.color.white}
                fontSize="100%"
                outline="0"
                border="0"
                width="49%"
                overflow="hidden"
              >
                {Translator.translate("JOIN", this.props.lang)}
              </Button>
            </Flex>
          </Flex>
        </Box>
      );
    }

    if (this.state.callInProgress) {
      callScreen = (
        <CometChatCallScreen
          loggedInUser={this.loggedInUser}
          call={this.state.callInProgress}
          lang={this.props.lang}
          actionGenerated={this.actionHandler}
        />
      );
    }

    return (
      <React.Fragment>
        {incomingCallAlert}
        {callScreen}
      </React.Fragment>
    );
  }
}

// Specifies the default values for props:
CometChatIncomingDirectCall.defaultProps = {
  lang: Translator.getDefaultLanguage(),
  theme: theme,
};

CometChatIncomingDirectCall.propTypes = {
  lang: PropTypes.string,
  theme: PropTypes.object,
};

export { CometChatIncomingDirectCall };
