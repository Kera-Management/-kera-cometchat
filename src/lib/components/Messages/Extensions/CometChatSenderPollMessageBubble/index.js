import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Text, UnorderedList, ListItem } from "@chakra-ui/react";

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

class CometChatSenderPollMessageBubble extends React.Component {
  pollId;
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
    const pollExtensionData = checkMessageForExtensionsData(
      this.props.message,
      "polls"
    );
    if (!pollExtensionData) {
      return null;
    }

    const pollOptions = [];

    this.pollId = pollExtensionData.id;
    const total = pollExtensionData.results.total;
    let totalText = Translator.translate("NO_VOTE", this.context.language);

    if (total === 1) {
      totalText = `${total} ${Translator.translate(
        "VOTE",
        this.context.language
      )}`;
    } else if (total > 1) {
      totalText = `${total} ${Translator.translate(
        "VOTES",
        this.context.language
      )}`;
    }

    for (const option in pollExtensionData.results.options) {
      const optionData = pollExtensionData.results.options[option];
      const vote = optionData["count"];

      let width = "0%";
      if (total) {
        const fraction = vote / total;
        width = fraction.toLocaleString("en", { style: "percent" });
      }

      const template = (
        <ListItem
          key={option}
          backgroundColor={this.context.theme.backgroundColor.white}
          m="10px 0"
          borderRadius="8px"
          display="flex"
          w="100%"
          position="relative"
        >
          <Box
            maxW="100%"
            w={width}
            borderRadius={width === "100%" ? "8px" : "8px 0 0 8px"}
            backgroundColor={this.context.theme.backgroundColor.primary}
            minH="35px"
            h="100%"
            position="absolute"
            zIndex="1"
          />
          <Flex
            w="100%"
            color={this.context.theme.color.white}
            alignItems="center"
            minH="35px"
            p="0 16px"
            h="100%"
            zIndex="2"
          >
            <Text
              w="40px"
              pr="16px"
              fontWeight="bold"
              display="inline-block"
              fontSize="13px"
            >
              {width}
            </Text>
            <Text
              m="0"
              w="calc(100% - 40px)"
              whiteSpace="pre-wrap"
              wordWrap="break-word"
              fontSize="14px"
            >
              {optionData.text}
            </Text>
          </Flex>
        </ListItem>
      );
      pollOptions.push(template);
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

    return (
      <Flex
        alignSelf="flex-end"
        mb="16px"
        pl="16px"
        pr="16px"
        maxW="65%"
        clear="both"
        position="relative"
        flexDirection="column"
        flexShrink="0"
        className="sender__message__container message__poll"
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
            p="8px 16px"
            alignSelf="flex-end"
            w="auto"
            className="message__poll__wrapper"
          >
            <Text
              m="0"
              whiteSpace="pre-wrap"
              wordWrap="break-word"
              textAlign="left"
              w="100%"
              fontSize="14px"
              className="poll__question"
            >
              {pollExtensionData.question}
            </Text>
            <UnorderedList
              listStyleType="none"
              p="0"
              m="0"
              className="poll__options"
            >
              {pollOptions}
            </UnorderedList>
            <Text
              fontSize="13px"
              m="0"
              alignSelf="flex-end"
              className="poll__votes"
            >
              {totalText}
            </Text>
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
CometChatSenderPollMessageBubble.defaultProps = {
  theme: theme,
  actionGenerated: () => {},
};

CometChatSenderPollMessageBubble.propTypes = {
  theme: PropTypes.object,
  actionGenerated: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
};

export { CometChatSenderPollMessageBubble };
