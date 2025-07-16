import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Text, UnorderedList, ListItem } from "@chakra-ui/react";

import {
  CometChatMessageActions,
  CometChatThreadedMessageReplyCount,
  CometChatReadReceipt,
} from "..";
import { CometChatMessageReactions } from "../Extensions";

import { CometChatContext } from "../../../util/CometChatContext";
import { checkMessageForExtensionsData } from "../../../util/common";
import * as enums from "../../../util/enums.js";

import { theme } from "../../../resources/theme";
import Translator from "../../../resources/localization/translator";

import callIcon from "./resources/video-call.svg";

class CometChatSenderDirectCallBubble extends React.Component {
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
    let messageReactions = null;
    const reactionsData = checkMessageForExtensionsData(
      this.props.message,
      "reactions"
    );
    if (reactionsData) {
      if (Object.keys(reactionsData).length) {
        messageReactions = (
          <Flex
            alignSelf="flex-end"
            w="100%"
            flexWrap="wrap"
            justifyContent="flex-end"
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

    let callMessage = null;
    const joinCallMessage = Translator.translate(
      "YOU_ALREADY_ONGOING_CALL",
      this.context.language
    );

    if (
      this.context.checkIfDirectCallIsOngoing() ===
      enums.CONSTANTS.CALLS["ONGOING_CALL_SAME_GROUP"]
    ) {
      //ongoing call in same group
      callMessage = (
        <ListItem
          backgroundColor={this.context.theme.backgroundColor.white}
          borderRadius="8px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          w="100%"
          position="relative"
          m="0"
          p="8px"
          cursor="pointer"
          className="directcall__row"
          title={joinCallMessage}
        >
          <Text
            background="0 0"
            textAlign="center"
            color={this.context.theme.primaryColor}
            w="100%"
            fontWeight="600"
            display="inline-block"
            fontSize="14px"
            m="0"
            className="directcall__text"
          >
            {Translator.translate("JOIN", this.context.language)}
          </Text>
        </ListItem>
      );
    } else if (
      this.context.checkIfDirectCallIsOngoing() ===
      enums.CONSTANTS.CALLS["ONGOING_CALL_DIFF_GROUP"]
    ) {
      //ongoing call in different group

      callMessage = (
        <ListItem
          backgroundColor={this.context.theme.backgroundColor.white}
          borderRadius="8px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          w="100%"
          position="relative"
          m="0"
          p="8px"
          cursor="pointer"
          className="directcall__row"
          title={joinCallMessage}
        >
          <Text
            background="0 0"
            textAlign="center"
            color={this.context.theme.primaryColor}
            w="100%"
            fontWeight="600"
            display="inline-block"
            fontSize="14px"
            m="0"
            className="directcall__text"
          >
            {Translator.translate("JOIN", this.context.language)}
          </Text>
        </ListItem>
      );
    } else if (this.context.checkIfCallIsOngoing()) {
      //ongoing call

      callMessage = (
        <ListItem
          backgroundColor={this.context.theme.backgroundColor.white}
          borderRadius="8px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          w="100%"
          position="relative"
          m="0"
          p="8px"
          cursor="pointer"
          className="directcall__row"
          title={joinCallMessage}
        >
          <Text
            background="0 0"
            textAlign="center"
            color={this.context.theme.primaryColor}
            w="100%"
            fontWeight="600"
            display="inline-block"
            fontSize="14px"
            m="0"
            className="directcall__text"
          >
            {Translator.translate("JOIN", this.context.language)}
          </Text>
        </ListItem>
      );
    } else {
      callMessage = (
        <ListItem
          backgroundColor={this.context.theme.backgroundColor.white}
          borderRadius="8px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          w="100%"
          position="relative"
          m="0"
          p="8px"
          cursor="pointer"
          className="directcall__row"
          onClick={() =>
            this.props.actionGenerated(
              enums.ACTIONS["JOIN_DIRECT_CALL"],
              this.props.message
            )
          }
        >
          <Text
            background="0 0"
            textAlign="center"
            color={this.context.theme.primaryColor}
            w="100%"
            fontWeight="600"
            display="inline-block"
            fontSize="14px"
            m="0"
            className="directcall__text"
          >
            {Translator.translate("JOIN", this.context.language)}
          </Text>
        </ListItem>
      );
    }

    const messageTitle = Translator.translate(
      "YOU_INITIATED_GROUP_CALL",
      this.context.language
    );
    return (
      <Flex
        alignSelf="flex-end"
        mb="16px"
        pl="16px"
        pr="16px"
        maxW="305px"
        clear="both"
        position="relative"
        flexDirection="column"
        flexShrink="0"
        className="sender__message__container message__directcall"
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}
      >
        {toolTipView}

        <Flex
          w="auto"
          flex="1 1"
          alignSelf="flex-end"
          className="message__wrapper"
        >
          <Box
            display="inline-block"
            borderRadius="12px"
            backgroundColor={this.context.theme.primaryColor}
            color={this.context.theme.color.white}
            p="16px"
            alignSelf="flex-end"
            w="auto"
            minH="106px"
            className="message__directcall__wrapper"
          >
            <Flex
              justifyContent="center"
              alignItems="center"
              className="message__directcall__container"
              sx={{
                img: {
                  width: "35px"
                }
              }}
            >
              <Box
                w="30px"
                h="24px"
                display="inline-block"
                sx={{
                  mask: `url(${callIcon}) center center no-repeat`,
                  backgroundColor: this.context.theme.color.white,
                }}
                alt={Translator.translate("VIDEO_CALL", this.context.language)}
              />
              <Text
                m="0"
                whiteSpace="pre-wrap"
                wordBreak="break-word"
                textAlign="left"
                w="calc(100% - 30px)"
                fontSize="14px"
                ml="8px"
                className="directcall__title"
              >
                {messageTitle}
              </Text>
            </Flex>
            <UnorderedList
              listStyleType="none"
              p="0"
              m="16px 0 0 0"
              w="100%"
              className="directcall__button"
            >
              {callMessage}
            </UnorderedList>
          </Box>
        </Flex>

        {messageReactions}

        <Flex
          alignSelf="flex-end"
          justifyContent="flex-end"
          alignItems="center"
          h="25px"
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
CometChatSenderDirectCallBubble.defaultProps = {
  theme: theme,
  actionGenerated: () => {},
};

CometChatSenderDirectCallBubble.propTypes = {
  theme: PropTypes.object,
  actionGenerated: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
};

export { CometChatSenderDirectCallBubble };
