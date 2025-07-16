import React from "react";
import { Box, Flex, Text, Heading } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { CometChat } from "@cometchat-pro/chat";

import { CallScreenManager } from "./controller";

import { CometChatCallScreen } from "../CometChatCallScreen";
import { CometChatAvatar } from "../../Shared";

import { CometChatContext } from "../../../util/CometChatContext";
import * as enums from "../../../util/enums.js";
import { SoundManager } from "../../../util/SoundManager";

import Translator from "../../../resources/localization/translator";
import { theme } from "../../../resources/theme";

import callIcon from "./resources/end-call.svg";

class CometChatOutgoingCall extends React.PureComponent {
  static contextType = CometChatContext;

  constructor(props) {
    super(props);

    this.callScreenFrame = React.createRef();

    this.state = {
      errorScreen: false,
      errorMessage: null,
      outgoingCallScreen: false,
      callInProgress: null,
    };

    CometChat.getLoggedinUser()
      .then((user) => (this.loggedInUser = user))
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    this.CallScreenManager = new CallScreenManager();
    this.CallScreenManager.attachListeners(this.callScreenUpdated);
  }

  componentWillUnmount() {
    this.CallScreenManager.removeListeners();
    this.CallScreenManager = null;
  }

  callScreenUpdated = (key, call) => {
    switch (key) {
      case enums.OUTGOING_CALL_ACCEPTED: //occurs at the caller end
        this.outgoingCallAccepted(call);
        break;
      case enums.OUTGOING_CALL_REJECTED: //occurs at the caller end, callee rejects the call
        this.outgoingCallRejected(call);
        break;
      default:
        break;
    }
  };

  outgoingCallAccepted = (call) => {
    if (this.state.outgoingCallScreen === true) {
      this.props.actionGenerated(enums.ACTIONS["OUTGOING_CALL_ACCEPTED"], call);

      SoundManager.pause(enums.CONSTANTS.AUDIO["OUTGOING_CALL"], this.context);
      this.setState({
        outgoingCallScreen: false,
        callInProgress: call,
        errorScreen: false,
        errorMessage: null,
      });

      if (this.context) {
        this.context.setCallInProgress(
          call,
          enums.CONSTANTS["OUTGOING_DEFAULT_CALLING"]
        );
      }
    }
  };

  outgoingCallRejected = (call) => {
    SoundManager.pause(enums.CONSTANTS.AUDIO["OUTGOING_CALL"], this.context);
    if (
      call.hasOwnProperty("status") &&
      call.status === CometChat.CALL_STATUS.BUSY
    ) {
      //show busy message.
      const errorMessage = `${call.sender.name} ${Translator.translate(
        "ON_ANOTHER_CALL",
        this.props.lang
      )}`;
      this.setState({ errorScreen: true, errorMessage: errorMessage });
      this.clearCallInProgress();
    } else {
      this.props.actionGenerated(enums.ACTIONS["OUTGOING_CALL_REJECTED"], call);
      this.setState({
        outgoingCallScreen: false,
        callInProgress: null,
        errorScreen: false,
        errorMessage: null,
      });
      this.clearCallInProgress();
    }
  };

  startCall = (call) => {
    SoundManager.play(enums.CONSTANTS.AUDIO["OUTGOING_CALL"], this.context);
    this.setState({
      outgoingCallScreen: true,
      callInProgress: call,
      errorScreen: false,
      errorMessage: null,
    });
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

  //cancelling an outgoing call
  cancelCall = () => {
    SoundManager.pause(enums.CONSTANTS.AUDIO["OUTGOING_CALL"], this.context);
    //if user busy error, just close the callscreen, no need to reject the call
    if (this.state.errorScreen) {
      this.setState({
        errorScreen: false,
        errorMessage: null,
        outgoingCallScreen: false,
        callInProgress: null,
      });
      this.clearCallInProgress();
      this.props.actionGenerated(enums.ACTIONS["OUTGOING_CALL_CANCELLED"]);
    } else {
      CometChat.rejectCall(
        this.state.callInProgress.sessionId,
        CometChat.CALL_STATUS.CANCELLED
      )
        .then((call) => {
          this.setState({ outgoingCallScreen: false, callInProgress: null });
          this.clearCallInProgress();
          this.props.actionGenerated(enums.ACTIONS["OUTGOING_CALL_CANCELLED"]);
        })
        .catch((error) => {
          this.setState({ outgoingCallScreen: false, callInProgress: null });
          this.clearCallInProgress();
        });
    }
  };

  clearCallInProgress = () => {
    if (this.context) {
      this.context.setCallInProgress(null, "");
    }
  };

  render() {
    let callScreen = null,
      errorScreen = null;
    if (this.state.callInProgress) {
      let avatar = (
        <CometChatAvatar user={this.state.callInProgress.receiver} />
      );
      if (this.state.errorScreen) {
        errorScreen = (
          <Box
            color="#fff"
            textAlign="center"
            borderRadius="2px"
            p="13px 10px"
            fontSize="13px"
            w="100%"
            h="10%"
            bg="#333"
            className="callscreen__error__wrapper"
          >
            <Box>{this.state.errorMessage}</Box>
          </Box>
        );
      }

      if (this.state.outgoingCallScreen) {
        const wrapperStyles = this.props.widgetsettings
          ? {
              w: "100%",
              h: "100%",
              position: "fixed",
              top: "0",
              right: "0",
              bottom: "0",
              left: "0",
              zIndex: "2147483000",
            }
          : {
              w: "100%",
              h: "100%",
              position: "absolute",
              top: "0",
              right: "0",
              bottom: "0",
              left: "0",
              zIndex: "999",
            };

        callScreen = (
          <Box
            {...wrapperStyles}
            bg={this.props.theme.backgroundColor.darkGrey}
            color={this.props.theme.color.white}
            textAlign="center"
            boxSizing="border-box"
            fontFamily={this.props.theme.fontFamily}
            className="callscreen__wrapper"
            ref={(el) => {
              this.callScreenFrame = el;
            }}
            sx={{
              animation: "fadeIn 250ms ease",
              "@keyframes fadeIn": {
                from: { opacity: 0 },
                to: { opacity: 1 },
              },
              "*": {
                boxSizing: "border-box",
                fontFamily: this.props.theme.fontFamily,
              },
            }}
          >
            <Flex
              flexDirection="column"
              h="100%"
              w="100%"
              className="callscreen__container"
            >
              <Box p="20px 10px" w="100%" h="20%" className="callscreen__header">
                <Text
                  fontSize="13px"
                  display="inline-block"
                  p="5px"
                  className="header__calling"
                >
                  {Translator.translate("CALLING", this.props.lang)}
                </Text>
                <Heading
                  as="h6"
                  m="0"
                  fontWeight="700"
                  textTransform="capitalize"
                  fontSize="16px"
                  className="header__name"
                >
                  {this.state.callInProgress.receiver.name}
                </Heading>
              </Box>
              <Flex
                w="100%"
                h="50%"
                justifyContent="center"
                alignItems="center"
                className="callscreen__thumbnail__wrapper"
              >
                <Box
                  w="200px"
                  flexShrink="0"
                  className="callscreen__thumbnail"
                >
                  {avatar}
                </Box>
              </Flex>
              {errorScreen}
              <Flex
                w="100%"
                h="15%"
                p="10px"
                justifyContent="center"
                className="callscreen__icons"
              >
                <Flex className="icon__block" onClick={this.cancelCall}>
                  <Flex
                    w="50px"
                    h="50px"
                    borderRadius="27px"
                    bg="red"
                    m="auto 10px"
                    cursor="pointer"
                    justifyContent="center"
                    alignItems="center"
                    className="icon icon__end"
                  >
                    <Box
                      display="inline-block"
                      w="24px"
                      h="24px"
                      bg="white"
                      sx={{
                        mask: `url(${callIcon}) center center no-repeat`,
                      }}
                    />
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Box>
        );
      } else {
        callScreen = (
          <CometChatCallScreen
            loggedInUser={this.loggedInUser}
            call={this.state.callInProgress}
            lang={this.props.lang}
            actionGenerated={this.actionHandler}
          />
        );
      }
    }
    return callScreen;
  }
}

// Specifies the default values for props:
CometChatOutgoingCall.defaultProps = {
  lang: Translator.getDefaultLanguage(),
  theme: theme,
};

CometChatOutgoingCall.propTypes = {
  lang: PropTypes.string,
  theme: PropTypes.object,
};

export { CometChatOutgoingCall };
