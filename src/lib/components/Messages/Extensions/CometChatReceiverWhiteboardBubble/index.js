import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { CometChat } from "@cometchat-pro/chat";

import {
  CometChatMessageActions,
  CometChatThreadedMessageReplyCount,
  CometChatReadReceipt,
} from "../..";
import { CometChatMessageReactions } from "..";
import { CometChatAvatar } from "../../../Shared";

import { CometChatContext } from "../../../../util/CometChatContext";
import { checkMessageForExtensionsData } from "../../../../util/common";

import { theme } from "../../../../resources/theme";
import Translator from "../../../../resources/localization/translator";

// Removed emotion styles - now using Chakra UI

import whiteboardIcon from "./resources/collaborative-whiteboard.svg";

class CometChatReceiverWhiteboardBubble extends React.Component {
  static contextType = CometChatContext;
  loggedInUser;

  constructor(props, context) {
    super(props, context);

    this.state = {
      isHovering: false,
    };

    this.context.getLoggedinUser().then((user) => {
      this.loggedInUser = { ...user };
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const currentMessageStr = JSON.stringify(this.props.message);
    const nextMessageStr = JSON.stringify(nextProps.message);

    if (
      currentMessageStr !== nextMessageStr ||
      this.state.isHovering !== nextState.isHovering
    ) {
      return true;
    }
    return false;
  }

  launchCollaborativeWhiteboard = () => {
    let whiteboardUrl = null;
    let whiteboardData = checkMessageForExtensionsData(
      this.props.message,
      "whiteboard"
    );
    if (
      whiteboardData &&
      whiteboardData.hasOwnProperty("board_url") &&
      whiteboardData.board_url.length
    ) {
      let username = this.loggedInUser?.name.split(" ").join("_");
      // Appending the username to the board_url
      whiteboardUrl = whiteboardData.board_url + "&username=" + username;
      window.open(whiteboardUrl, "", "fullscreen=yes, scrollbars=auto");
    }
  };

  handleMouseHover = () => {
    this.setState(this.toggleHoverState);
  };

  toggleHoverState = (state) => {
    return {
      isHovering: !state.isHovering,
    };
  };

  render() {
    let avatar = null,
      name = null;
    if (this.props.message.receiverType === CometChat.RECEIVER_TYPE.GROUP) {
      avatar = (
        <Box 
          className="message__thumbnail"
          width="36px"
          height="36px"
          margin="10px 5px"
          float="left"
          flexShrink="0"
        >
          <CometChatAvatar user={this.props.message.sender} />
        </Box>
      );

      name = (
        <Box 
          className="message__name__wrapper"
          alignSelf="flex-start"
          padding={avatar ? "3px 5px" : "0"}
        >
          <Text 
            className="message__name"
            fontSize="11px"
            color={this.context.theme.color.search}
          >
            {this.props.message.sender.name}
          </Text>
        </Box>
      );
    }

    let messageReactions = null;
    const reactionsData = checkMessageForExtensionsData(
      this.props.message,
      "reactions"
    );
    if (reactionsData) {
      if (Object.keys(reactionsData).length) {
        messageReactions = (
          <Flex
            className="message__reaction__wrapper"
            display="flex"
            alignSelf="flex-start"
            width="100%"
            flexWrap="wrap"
            justifyContent="flex-start"
            minHeight="36px"
          >
            <CometChatMessageReactions
              message={this.props.message}
              actionGenerated={this.props.actionGenerated}
            />
          </Flex>
        );
      }
    }

    let toolTipView = null;
    if (this.state.isHovering) {
      toolTipView = (
        <CometChatMessageActions
          message={this.props.message}
          actionGenerated={this.props.actionGenerated}
        />
      );
    }

    const documentTitle = `${
      this.props.message.sender.name
    } ${Translator.translate(
      "SHARED_COLLABORATIVE_WHITEBOARD",
      this.context.language
    )}`;

    return (
      <Flex
        className="receiver__message__container message__whiteboard"
        alignSelf="flex-start"
        marginBottom="16px"
        paddingLeft="16px"
        paddingRight="16px"
        maxWidth="305px"
        clear="both"
        position="relative"
        display="flex"
        flexDirection="column"
        flexShrink="0"
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}
      >
        <Flex 
          className="message__wrapper"
          width="auto"
          flex="1 1"
          alignSelf="flex-start"
          display="flex"
        >
          {avatar}
          <Flex 
            className="message__details"
            flex="1 1"
            display="flex"
            flexDirection="column"
          >
            {name}
            {toolTipView}
            <Flex
              className="message__whiteboard__container"
              width="auto"
              flex="1 1"
              alignSelf="flex-start"
              display="flex"
            >
              <Box
                className="message__whiteboard__wrapper"
                display="flex"
                flexDirection="column"
                borderRadius="12px"
                backgroundColor={this.context.theme.backgroundColor.secondary}
                padding="16px"
                alignSelf="flex-start"
                width="100%"
              >
                <Flex
                  className="message__whiteboard__title"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  color={this.context.theme.color.primary}
                >
                  <Box
                    width="24px"
                    height="24px"
                    display="inline-block"
                    title={Translator.translate(
                      "COLLABORATIVE_WHITEBOARD",
                      this.context.language
                    )}
                    sx={{
                      mask: `url(${whiteboardIcon}) center center no-repeat`,
                      backgroundColor: this.context.theme.primaryColor,
                    }}
                  />
                  <Text 
                    className="whiteboard__title"
                    margin="0"
                    whiteSpace="pre-wrap"
                    wordBreak="break-word"
                    textAlign="left"
                    width="calc(100% - 24px)"
                    fontSize="14px"
                    marginLeft="8px"
                  >
                    {documentTitle}
                  </Text>
                </Flex>

                <Box
                  as="ul"
                  className="whiteboard__button"
                  listStyleType="none"
                  padding="0"
                  margin="0"
                  sx={{
                    li: {
                      backgroundColor: this.context.theme.backgroundColor.white,
                      borderRadius: "8px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      cursor: "pointer",
                      position: "relative",
                      margin: "16px 0 0 0",
                      padding: "8px",
                      "> p": {
                        background: "0 0",
                        textAlign: "center",
                        color: this.context.theme.primaryColor,
                        width: "100%",
                        display: "inline-block",
                        fontSize: "14px",
                        fontWeight: "600",
                        margin: "0",
                      },
                    },
                  }}
                >
                  <Box as="li" onClick={this.launchCollaborativeWhiteboard}>
                    <Text as="p">{Translator.translate("JOIN", this.context.language)}</Text>
                  </Box>
                </Box>
              </Box>
            </Flex>

            {messageReactions}

            <Flex
              className="message__info__wrapper"
              alignSelf="flex-start"
              padding="4px 8px"
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              height="25px"
            >
              <CometChatReadReceipt message={this.props.message} />
              <CometChatThreadedMessageReplyCount
                message={this.props.message}
                actionGenerated={this.props.actionGenerated}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    );
  }
}

// Specifies the default values for props:
CometChatReceiverWhiteboardBubble.defaultProps = {
  theme: theme,
  actionGenerated: () => {},
};

CometChatReceiverWhiteboardBubble.propTypes = {
  theme: PropTypes.object,
  actionGenerated: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
};

export { CometChatReceiverWhiteboardBubble };
