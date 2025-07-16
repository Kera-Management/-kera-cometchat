import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Text, Button } from "@chakra-ui/react";

import {
  CometChatMessageActions,
  CometChatThreadedMessageReplyCount,
  CometChatReadReceipt,
} from "../..";
import { CometChatMessageReactions } from "..";

import { CometChatContext } from "../../../../util/CometChatContext";
import { checkMessageForExtensionsData } from "../../../../util/common";

import { theme } from "../../../../resources/theme";
import Translator from "../../../../resources/localization/translator";

import whiteboardIcon from "./resources/collaborative-whiteboard.svg";

class CometChatSenderWhiteboardBubble extends React.Component {
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
            alignSelf="flex-end"
            width="100%"
            flexWrap="wrap"
            justifyContent="flex-end"
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

    const documentTitle = Translator.translate(
      "CREATED_WHITEBOARD",
      this.context.language
    );
    return (
      <Flex
        className="sender__message__container message__whiteboard"
        alignSelf="flex-end"
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
        {toolTipView}

        <Flex 
          className="message__wrapper"
          width="auto"
          flex="1 1"
          alignSelf="flex-end"
          display="flex"
        >
          <Box
            className="message__whiteboard__wrapper"
            display="flex"
            flexDirection="column"
            borderRadius="12px"
            backgroundColor={this.context.theme.primaryColor}
            padding="16px"
            alignSelf="flex-end"
            width="100%"
          >
            <Flex
              className="message__whiteboard__container"
              width="auto"
              flex="1 1"
              alignSelf="flex-start"
              display="flex"
              alignItems="center"
              marginBottom="16px"
            >
              <Box
                width="24px"
                height="24px"
                display="inline-block"
                sx={{
                  mask: `url(${whiteboardIcon}) center center no-repeat`,
                  backgroundColor: this.context.theme.color.white,
                }}
              />
              <Text 
                className="document__title"
                margin="0"
                whiteSpace="pre-wrap"
                wordBreak="break-word"
                textAlign="left"
                width="calc(100% - 24px)"
                fontSize="14px"
                marginLeft="8px"
                color={this.context.theme.color.white}
              >
                {documentTitle}
              </Text>
            </Flex>
            <Box
              as="ul"
              className="document__button"
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
                  margin: "0",
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
                <Text as="p">{Translator.translate("LAUNCH", this.context.language)}</Text>
              </Box>
            </Box>
          </Box>
        </Flex>

        {messageReactions}

        <Flex 
          className="message__info__wrapper"
          alignSelf="flex-end"
          padding="4px 8px"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          height="25px"
        >
          <CometChatThreadedMessageReplyCount
            message={this.props.message}
            actionGenerated={this.props.actionGenerated}
          />
          <CometChatReadReceipt message={this.props.message} />
        </Flex>
      </Flex>
    );
  }
}

// Specifies the default values for props:
CometChatSenderWhiteboardBubble.defaultProps = {
  theme: theme,
  actionGenerated: () => {},
};

CometChatSenderWhiteboardBubble.propTypes = {
  theme: PropTypes.object,
  actionGenerated: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
};

export { CometChatSenderWhiteboardBubble };
