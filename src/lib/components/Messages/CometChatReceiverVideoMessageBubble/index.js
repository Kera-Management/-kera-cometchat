import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { CometChat } from "@cometchat-pro/chat";

import {
  CometChatMessageActions,
  CometChatThreadedMessageReplyCount,
  CometChatReadReceipt,
} from "..";
import { CometChatMessageReactions } from "../Extensions";
import { CometChatAvatar } from "../../Shared";

import { CometChatContext } from "../../../util/CometChatContext";
import { checkMessageForExtensionsData } from "../../../util/common";

import { theme } from "../../../resources/theme";


class CometChatReceiverVideoMessageBubble extends React.Component {
  static contextType = CometChatContext;

  constructor(props) {
    super(props);

    this.state = {
      isHovering: false,
    };
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
            as="span"
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

    return (
      <Flex
        className="receiver__message__container message__video"
        alignSelf="flex-start"
        marginBottom="16px"
        paddingLeft="16px"
        paddingRight="16px"
        maxWidth="65%"
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
              className="message__video__container"
              width="auto"
              flex="1 1"
              alignSelf="flex-start"
              display="flex"
            >
              <Box
                className="message__video__wrapper"
                display="inline-block"
                alignSelf="flex-start"
                sx={{
                  "video": {
                    maxWidth: "250px",
                    borderRadius: "12px",
                    display: "inherit",
                    outline: "none",
                  }
                }}
              >
                <video controls>
                  <source src={this.props.message.data.attachments[0].url} />
                </video>
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
CometChatReceiverVideoMessageBubble.defaultProps = {
  theme: theme,
  actionGenerated: () => {},
};

CometChatReceiverVideoMessageBubble.propTypes = {
  theme: PropTypes.object,
  actionGenerated: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
};

export { CometChatReceiverVideoMessageBubble };
