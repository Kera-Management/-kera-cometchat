import React from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import PropTypes from "prop-types";
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

class CometChatReceiverStickerMessageBubble extends React.Component {
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
          w="36px"
          h="36px"
          m="10px 5px"
          float="left"
          flexShrink="0"
          className="message__thumbnail"
        >
          <CometChatAvatar user={this.props.message.sender} />
        </Box>
      );

      name = (
        <Box
          alignSelf="flex-start"
          p={avatar ? "3px 5px" : "0"}
          className="message__name__wrapper"
        >
          <Text
            fontSize="11px"
            color={this.context.theme.color.search}
            className="message__name"
          >
            {this.props.message.sender.name}
          </Text>
        </Box>
      );
    }

    let stickerData = null;
    let stickerImg = null;
    if (
      this.props.message.hasOwnProperty("data") &&
      this.props.message.data.hasOwnProperty("customData")
    ) {
      stickerData = this.props.message.data.customData;

      if (stickerData.hasOwnProperty("sticker_url")) {
        const stickerName = stickerData.hasOwnProperty("sticker_name")
          ? stickerData.sticker_name
          : Translator.translate("STICKER", this.context.language);
        stickerImg = <Image src={stickerData.sticker_url} alt={stickerName} />;
      }
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
            alignSelf="flex-start"
            w="100%"
            flexWrap="wrap"
            justifyContent="flex-start"
            minH="36px"
            className="message__reaction__wrapper"
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
        alignSelf="flex-start"
        mb="16px"
        pl="16px"
        pr="16px"
        maxW="65%"
        clear="both"
        position="relative"
        flexDirection="column"
        flexShrink="0"
        className="receiver__message__container message__sticker"
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}
      >
        <Flex
          w="auto"
          flex="1 1"
          alignSelf="flex-start"
          className="message__wrapper"
        >
          {avatar}
          <Flex
            flex="1 1"
            flexDirection="column"
            className="message__details"
          >
            {name}
            {toolTipView}
            <Flex
              w="auto"
              flex="1 1"
              alignSelf="flex-start"
              className="message__image__container"
            >
              <Box
                display="inline-block"
                alignSelf="flex-start"
                maxW="128px"
                h="128px"
                cursor="pointer"
                className="message__image__wrapper"
                sx={{
                  [`@media ${this.context.theme.breakPoints[1]}, ${this.context.theme.breakPoints[2]}`]: {
                    maxW: "128px",
                    h: "128px",
                    p: "2px 2px",
                  },
                }}
              >
                {stickerImg}
              </Box>
            </Flex>

            {messageReactions}

            <Flex
              alignSelf="flex-start"
              p="4px 8px"
              alignItems="center"
              justifyContent="flex-start"
              h="25px"
              className="message__info__wrapper"
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
CometChatReceiverStickerMessageBubble.defaultProps = {
  theme: theme,
  actionGenerated: () => {},
};

CometChatReceiverStickerMessageBubble.propTypes = {
  theme: PropTypes.object,
  actionGenerated: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
};

export { CometChatReceiverStickerMessageBubble };
