import React from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { CometChat } from "@cometchat-pro/chat";

import { CallAlertManager } from "./controller";

import { CometChatCallScreen } from "../CometChatCallScreen";
import { CometChatAvatar } from "../../Shared";

import { CometChatContext } from "../../../util/CometChatContext";
import * as enums from "../../../util/enums.js";
import { SoundManager } from "../../../util/SoundManager";
import { Storage } from "../../../util/Storage";

import { theme } from "../../../resources/theme";
import Translator from "../../../resources/localization/translator";

import audioCallIcon from "./resources/incoming-call.svg";
import videoCallIcon from "./resources/incoming-video-call.svg";

class CometChatIncomingCall extends React.PureComponent {
  static contextType = CometChatContext;

  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      incomingCall: null,
      callInProgress: null,
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

    this.CallAlertManager = new CallAlertManager();
    this.CallAlertManager.attachListeners(this.callScreenUpdated);

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

  callScreenUpdated = (key, call) => {
    switch (key) {
      case enums.INCOMING_CALL_RECEIVED: //occurs at the callee end
        this.incomingCallReceived(call);
        break;
      case enums.INCOMING_CALL_CANCELLED: //occurs(call dismissed) at the callee end, caller cancels the call
        this.incomingCallCancelled(call);
        break;
      case enums.OUTGOING_CALL_ACCEPTED: //occurs(call dismissed) at the callee end, caller cancels the call
        this.outgoingCallAccepted(call);
        break;
      default:
        break;
    }
  };

  incomingCallReceived = (incomingCall) => {
    if (this._isMounted) {
      if (this.state.incomingCall === null) {
        if (incomingCall?.callInitiator.uid !== this.loggedInUser?.uid) {
          SoundManager.play(
            enums.CONSTANTS.AUDIO["INCOMING_CALL"],
            this.context
          );
          this.setState({ incomingCall: incomingCall });
        }
      }
    }
  };

  incomingCallCancelled = (call) => {
    if (this._isMounted) {
      //we are not marking this as read as it will done in messagelist component
      SoundManager.pause(enums.CONSTANTS.AUDIO["INCOMING_CALL"], this.context);
      this.setState({ incomingCall: null });
    }
  };

  outgoingCallAccepted = (call) => {
    if (call.sender?.uid === this.loggedInUser?.uid) {
      if (this._isMounted) {
        //we are not marking this as read as it will done in messagelist component
        SoundManager.pause(
          enums.CONSTANTS.AUDIO["INCOMING_CALL"],
          this.context
        );
        this.setState({ incomingCall: null });
      }
    }
  };

  rejectCall = () => {
    SoundManager.pause(enums.CONSTANTS.AUDIO["INCOMING_CALL"], this.context);
    let callStatus = this.isCallActive()
      ? CometChat.CALL_STATUS.BUSY
      : CometChat.CALL_STATUS.REJECTED;

    CometChat.rejectCall(this.state.incomingCall.sessionId, callStatus)
      .then((rejectedCall) => {
        if (this.isCallActive() === false) {
          if (this.context) {
            this.context.setCallInProgress(null, "");
          }
          Storage.setItem(enums.CONSTANTS["ACTIVECALL"], rejectedCall);
          this.props.actionGenerated(
            enums.ACTIONS["INCOMING_CALL_REJECTED"],
            rejectedCall
          );
          this.setState({ callInProgress: null });
        }

        this.setState({ incomingCall: null });
      })
      .catch((error) => {
        this.setState({ incomingCall: null, callInProgress: null });
        const errorCode =
          error && error.hasOwnProperty("code") ? error.code : "ERROR";
        this.context.setToastMessage("error", errorCode);
      });
  };

  acceptCall = () => {
    this.checkForActiveCallAndEndCall()
      .then((response) => {
        SoundManager.pause(
          enums.CONSTANTS.AUDIO["INCOMING_CALL"],
          this.context
        );
        CometChat.acceptCall(this.state.incomingCall.sessionId)
          .then((call) => {
            if (this.context) {
              this.context.setCallInProgress(
                call,
                enums.CONSTANTS["INCOMING_DEFAULT_CALLING"]
              );
            }
            Storage.setItem(enums.CONSTANTS["ACTIVECALL"], call);
            this.props.actionGenerated(
              enums.ACTIONS["INCOMING_CALL_ACCEPTED"],
              call
            );
            this.setState({ incomingCall: null, callInProgress: call });
          })
          .catch((error) => {
            if (this.context) {
              this.context.setCallInProgress(null, "");
            }
            this.setState({ incomingCall: null, callInProgress: null });

            const errorCode =
              error && error.hasOwnProperty("code") ? error.code : "ERROR";
            this.context.setToastMessage("error", errorCode);
          });
      })
      .catch((error) => {
        const errorCode =
          error && error.hasOwnProperty("code") ? error.code : "ERROR";
        this.context.setToastMessage("error", errorCode);
      });
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

  actionHandler = (action, call) => {
    switch (action) {
      case enums.ACTIONS["OUTGOING_CALL_ENDED"]:
        this.setState({ callInProgress: null });
        break;
      case enums.ACTIONS["USER_JOINED_CALL"]:
      case enums.ACTIONS["USER_LEFT_CALL"]:
        this.props.actionGenerated(action, call);
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

      if (this.state.incomingCall?.getSessionId() === call?.sessionId) {
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
      let callType = (
        <React.Fragment>
          <Box
            w="24px"
            h="24px"
            display="inline-block"
            cursor="pointer"
            bg={this.context.theme.secondaryTextColor}
            title={Translator.translate("INCOMING_AUDIO_CALL", this.props.lang)}
            sx={{
              mask: `url(${audioCallIcon}) center center no-repeat`,
            }}
          />
          <Text p="0 5px">
            {Translator.translate("INCOMING_AUDIO_CALL", this.props.lang)}
          </Text>
        </React.Fragment>
      );
      if (this.state.incomingCall.type === CometChat.CALL_TYPE.VIDEO) {
        callType = (
          <React.Fragment>
            <Box
              w="24px"
              h="24px"
              display="inline-block"
              cursor="pointer"
              bg={this.context.theme.secondaryTextColor}
              title={Translator.translate(
                "INCOMING_VIDEO_CALL",
                this.props.lang
              )}
              sx={{
                mask: `url(${videoCallIcon}) center center no-repeat`,
              }}
            />
            <Text p="0 5px">
              {Translator.translate("INCOMING_VIDEO_CALL", this.props.lang)}
            </Text>
          </React.Fragment>
        );
      }

      // Calculate positioning based on widget settings
      const getPositionProps = () => {
        let positionProps = {
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "unset",
          zIndex: "998",
        };
        
        if (this.props.hasOwnProperty("widgetsettings")) {
          if (this.props.widgetsettings.hasOwnProperty("dockedview") && this.props.widgetsettings.dockedview) {
            if (this.props.widgetsettings.hasOwnProperty("launched") && this.props.widgetsettings.launched) {
              positionProps.zIndex = "2147483000";
              positionProps.position = "fixed";
              positionProps.top = "unset";
              positionProps.bottom = "100px";
              
              if (this.props.widgetsettings.hasOwnProperty("alignment") && this.props.widgetsettings.alignment === "left") {
                positionProps.right = "unset";
                positionProps.left = "20px";
                
                if (this.props.widgetsettings.hasOwnProperty("width") && this.props.widgetsettings.width.includes("px")) {
                  const widgetWidth = this.props.widgetsettings.width.replace("px", "");
                  positionProps.right = (parseInt(widgetWidth) - 250 - 15) + "px";
                }
                
                if (this.props.widgetsettings.hasOwnProperty("height") && this.props.widgetsettings.height.includes("px")) {
                  const widgetHeight = this.props.widgetsettings.height.replace("px", "");
                  positionProps.bottom = (parseInt(widgetHeight) - 140 + 100) + "px";
                }
              } else {
                positionProps.left = "unset";
                positionProps.right = "20px";
                
                if (this.props.widgetsettings.hasOwnProperty("width") && this.props.widgetsettings.width.includes("px")) {
                  const widgetWidth = this.props.widgetsettings.width.replace("px", "");
                  positionProps.right = (parseInt(widgetWidth) - 250 - 15) + "px";
                }
                
                if (this.props.widgetsettings.hasOwnProperty("height") && this.props.widgetsettings.height.includes("px")) {
                  const widgetHeight = this.props.widgetsettings.height.replace("px", "");
                  positionProps.bottom = (parseInt(widgetHeight) - 140 + 100) + "px";
                }
              }
            } else {
              positionProps.left = "unset";
              positionProps.position = "fixed";
            }
          } else {
            positionProps.zIndex = "2147483000";
          }
        }
        
        return positionProps;
      };

      incomingCallAlert = (
        <Box
          {...getPositionProps()}
          borderRadius="10px"
          m="16px"
          bg={this.props.theme.backgroundColor.callScreenGrey}
          color={this.props.theme.color.white}
          textAlign="center"
          boxSizing="border-box"
          fontFamily={this.props.theme.fontFamily}
          w="248px"
          className="callalert__wrapper"
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
            flexDirection="column"
            w="100%"
            p="16px"
            className="callalert__container"
          >
            <Flex w="100%" className="callalert__header">
              <Flex
                w="calc(100% - 36px)"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                textAlign="left"
                className="header__detail"
              >
                <Text
                  fontSize="15px"
                  fontWeight="600"
                  display="block"
                  w="100%"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  lineHeight="20px"
                  className="name"
                >
                  {this.state.incomingCall.sender.name}
                </Text>
                <Flex
                  fontSize="13px"
                  w="100%"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  textTransform="capitalize"
                  lineHeight="20px"
                  color="#8A8A8A"
                  justifyContent="start"
                  alignItems="center"
                  p="2px 0 0 0px"
                  className="calltype"
                >
                  {callType}
                </Flex>
              </Flex>
              <Flex
                w="36px"
                h="36px"
                justifyContent="center"
                className="header__thumbnail"
              >
                <CometChatAvatar user={this.state.incomingCall.sender} />
              </Flex>
            </Flex>
            <Flex
              w="100%"
              justifyContent="space-between"
              m="10px 0 0 0"
              className="callalert__buttons"
              ref={this.callButtonRef}
            >
              <Button
                cursor="pointer"
                p="8px 16px"
                bg={`${this.props.theme.backgroundColor.red}!important`}
                borderRadius="5px"
                color={this.props.theme.color.white}
                fontSize="100%"
                outline="0"
                border="0"
                w="49%"
                overflow="hidden"
                className="button button__decline"
                onClick={() =>
                  this.rejectCall(
                    this.state.incomingCall,
                    CometChat.CALL_STATUS.REJECTED
                  )
                }
              >
                {Translator.translate("DECLINE", this.props.lang)}
              </Button>
              <Button
                cursor="pointer"
                p="8px 16px"
                bg={`${this.props.theme.backgroundColor.blue}!important`}
                borderRadius="5px"
                color={this.props.theme.color.white}
                fontSize="100%"
                outline="0"
                border="0"
                w="49%"
                overflow="hidden"
                className="button button__accept"
                onClick={this.acceptCall}
              >
                {Translator.translate("ACCEPT", this.props.lang)}
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
CometChatIncomingCall.defaultProps = {
  lang: Translator.getDefaultLanguage(),
  theme: theme,
};

CometChatIncomingCall.propTypes = {
  lang: PropTypes.string,
  theme: PropTypes.object,
};

export { CometChatIncomingCall };
