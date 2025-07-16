import React from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import PropTypes from "prop-types";

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

class CometChatSenderStickerBubble extends React.Component {
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
            display="flex"
            alignSelf="flex-end"
            width="100%"
            flexWrap="wrap"
            justifyContent="flex-end"
            minHeight="36px"
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
        alignSelf="flex-end"
        marginBottom="16px"
        paddingLeft="16px"
        paddingRight="16px"
        maxWidth="65%"
        clear="both"
        position="relative"
        display="flex"
        flexDirection="column"
        flexShrink="0"
        className="sender__message__container message__sticker"
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}
      >
        {toolTipView}

        <Flex
          width="auto"
          flex="1 1"
          alignSelf="flex-end"
          display="flex"
          className="message__wrapper"
        >
          <Box
            display="inline-block"
            alignSelf="flex-end"
            maxWidth={{ base: "128px", sm: "128px", md: "128px" }}
            height="128px"
            cursor="pointer"
            flexShrink="0"
            padding={{ base: "0", sm: "2px 2px", md: "2px 2px" }}
            className="message__img__wrapper"
          >
            {stickerImg}
          </Box>
        </Flex>

        {messageReactions}

        <Flex
          alignSelf="flex-end"
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          padding="4px 8px"
          height="25px"
          className="message__info__wrapper"
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
CometChatSenderStickerBubble.defaultProps = {
  theme: theme,
  actionGenerated: () => {},
};

CometChatSenderStickerBubble.propTypes = {
  theme: PropTypes.object,
  actionGenerated: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
};

export { CometChatSenderStickerBubble };
