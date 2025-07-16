import React from "react";
import PropTypes from "prop-types";
import { CometChat } from "@cometchat-pro/chat";
import { Box, Flex, Text, UnorderedList, ListItem } from "@chakra-ui/react";

import {
  CometChatMessageActions,
  CometChatThreadedMessageReplyCount,
  CometChatReadReceipt,
} from "../..";
import { CometChatMessageReactions } from "..";
import { CometChatAvatar } from "../../../Shared";

import { CometChatContext } from "../../../../util/CometChatContext";
import { checkMessageForExtensionsData } from "../../../../util/common";
import * as enums from "../../../../util/enums.js";

import { theme } from "../../../../resources/theme";
import Translator from "../../../../resources/localization/translator";

import checkImg from "./resources/checkmark.svg";

class CometChatReceiverPollMessageBubble extends React.Component {
  pollId;
  static contextType = CometChatContext;
  loggedInUser;

  constructor(props, context) {
    super(props, context);

    this.state = {
      isHovering: false,
      loggedInUser: null,
    };
  }

  componentDidMount() {
    this.context.getLoggedinUser().then((user) => {
      this.setState({ loggedInUser: { ...user } });
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

  answerPollQuestion = (event, selectedOption) => {
    CometChat.callExtension("polls", "POST", "v2/vote", {
      vote: selectedOption,
      id: this.pollId,
    })
      .then((response) => {
        if (
          response.hasOwnProperty("success") === false ||
          (response.hasOwnProperty("success") && response["success"] === false)
        ) {
          this.props.actionGenerated(
            enums.ACTIONS["ERROR"],
            [],
            "SOMETHING_WRONG"
          );
        }
      })
      .catch((error) =>
        this.props.actionGenerated(
          enums.ACTIONS["ERROR"],
          [],
          "SOMETHING_WRONG"
        )
      );
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
    const pollExtensionData = checkMessageForExtensionsData(
      this.props.message,
      "polls"
    );
    if (!pollExtensionData) {
      return null;
    }

    // if (!this.props.message.hasOwnProperty("metadata")) {
    //     return null;
    // }

    // if (!this.props.message.metadata.hasOwnProperty("@injected")) {
    //     return null;
    // }

    // if (!this.props.message.metadata["@injected"].hasOwnProperty("extensions")) {
    //     return null;
    // }

    // if (!this.props.message.metadata["@injected"]["extensions"].hasOwnProperty("polls")) {
    //     return null;
    // }

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
          padding={avatar ? "3px 5px" : "0"}
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

    const pollOptions = [];
    //const pollExtensionData = this.props.message.metadata["@injected"]["extensions"]["polls"];

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

    for (const option in pollExtensionData.options) {
      const optionData = pollExtensionData.results.options[option];
      const vote = optionData["count"];

      let width = "0%";
      if (total) {
        const fraction = vote / total;
        width = fraction.toLocaleString("en", { style: "percent" });
      }

      let checkIcon = null;
      if (
        optionData.hasOwnProperty("voters") &&
        optionData.voters.hasOwnProperty(this.state.loggedInUser?.uid)
      ) {
        checkIcon = (
          <Box
            w="40px"
            h="24px"
            sx={{
              mask: `url(${checkImg}) center center no-repeat`,
              backgroundColor: this.context.theme.secondaryTextColor,
            }}
          />
        );
      }

      let countPadding = "0px 16px 0px 0px";
      let widthProp = "calc(100% - 40px)";
      if (optionData.hasOwnProperty("voters") && optionData.voters.hasOwnProperty(this.state.loggedInUser?.uid)) {
        widthProp = "calc(100% - 80px)";
      }

      const template = (
        <ListItem
          key={option}
          onClick={(event) => this.answerPollQuestion(event, option)}
          backgroundColor={this.context.theme.backgroundColor.white}
          m="10px 0"
          borderRadius="8px"
          display="flex"
          w="100%"
          cursor="pointer"
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
            color={this.context.theme.color.primary}
            alignItems="center"
            minH="35px"
            p="0 16px"
            h="100%"
            zIndex="2"
          >
            {checkIcon}
            <Text
              w="40px"
              padding={countPadding}
              fontWeight="bold"
              display="inline-block"
              fontSize="13px"
            >
              {width}
            </Text>
            <Text
              m="0"
              w={widthProp}
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
        className="receiver__message__container message__poll"
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}
      >
        <Flex
          w="100%"
          flex="1 1"
          alignSelf="flex-start"
          className="message__wrapper"
        >
          {avatar}
          <Flex
            flex="1 1"
            flexDirection="column"
            w="calc(100% - 36px)"
            className="message__details"
          >
            {name}
            {toolTipView}
            <Box
              w="auto"
              flex="1 1"
              alignSelf="flex-start"
              display="flex"
              className="message__poll__container"
            >
              <Flex
                flexDirection="column"
                borderRadius="12px"
                backgroundColor={this.context.theme.backgroundColor.secondary}
                p="8px 16px"
                alignSelf="flex-start"
                w="100%"
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
              </Flex>
            </Box>

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
CometChatReceiverPollMessageBubble.defaultProps = {
  theme: theme,
  actionGenerated: () => {},
};

CometChatReceiverPollMessageBubble.propTypes = {
  theme: PropTypes.object,
  actionGenerated: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
};

export { CometChatReceiverPollMessageBubble };
