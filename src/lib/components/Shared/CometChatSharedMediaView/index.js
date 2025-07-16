import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Text, Heading, Button, Image, Link, VStack, HStack } from "@chakra-ui/react";
import { CometChat } from "@cometchat-pro/chat";

import { CometChatContext } from "../../../util/CometChatContext";

import { SharedMediaManager } from "./controller";
import * as enums from "../../../util/enums.js";

import { theme } from "../../../resources/theme";
import Translator from "../../../resources/localization/translator";

import fileIcon from "./resources/file-upload.svg";

class CometChatSharedMediaView extends React.Component {
  static contextType = CometChatContext;

  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      messagetype: "image",
      messageList: [],
    };

    this.messageContainer = React.createRef();

    CometChat.getLoggedinUser()
      .then((user) => (this.loggedInUser = user))
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    this._isMounted = true;
    this.SharedMediaManager = new SharedMediaManager(
      this.context.item,
      this.context.type,
      this.state.messagetype
    );
    this.getMessages(true);
    this.SharedMediaManager.attachListeners(this.messageUpdated);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.messagetype !== this.state.messagetype) {
      this.SharedMediaManager = null;
      this.SharedMediaManager = new SharedMediaManager(
        this.context.item,
        this.context.type,
        this.state.messagetype
      );
      this.getMessages(true);
      this.SharedMediaManager.attachListeners(this.messageUpdated);
    }
  }

  componentWillUnmount() {
    this.SharedMediaManager.removeListeners();
    this.SharedMediaManager = null;
    this._isMounted = false;
  }

  //callback for listener functions
  messageUpdated = (key, message) => {
    switch (key) {
      case enums.MESSAGE_DELETED:
        this.messageDeleted(message);
        break;
      case enums.MEDIA_MESSAGE_RECEIVED:
        this.messageReceived(message);
        break;
      default:
        break;
    }
  };

  messageDeleted = (deletedMessage) => {
    const messageType = deletedMessage.data.type;
    if (
      this.context.type === CometChat.ACTION_TYPE.TYPE_GROUP &&
      deletedMessage.getReceiverType() === CometChat.RECEIVER_TYPE.GROUP &&
      deletedMessage.getReceiver().guid === this.context.item.guid &&
      messageType === this.state.messagetype
    ) {
      const messageList = [...this.state.messageList];
      const filteredMessages = messageList.filter(
        (message) => message.id !== deletedMessage.id
      );
      this.setState({ messageList: filteredMessages, scrollToBottom: false });
    }
  };

  //message is received or composed & sent
  messageReceived = (message) => {
    const messageType = message.data.type;
    if (
      this.context.type === CometChat.ACTION_TYPE.TYPE_GROUP &&
      message.getReceiverType() === CometChat.RECEIVER_TYPE.GROUP &&
      message.getReceiver().guid === this.context.item.guid &&
      messageType === this.state.messagetype
    ) {
      let messages = [...this.state.messageList];
      messages = messages.concat(message);
      this.setState({ messageList: messages, scrollToBottom: true });
    }
  };

  getMessages = (scrollToBottom = false) => {
    this.SharedMediaManager.fetchPreviousMessages()
      .then((messages) => {
        const messageList = [...messages, ...this.state.messageList];
        if (this._isMounted) {
          this.setState({ messageList: messageList });
          if (scrollToBottom) {
            this.scrollToBottom();
          }
        }
      })
      .catch((error) => {
        const errorCode =
          error && error.hasOwnProperty("code") ? error.code : "ERROR";
        this.context.setToastMessage("error", errorCode);
      });
  };

  scrollToBottom = () => {
    if (this.messageContainer) {
      this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
    }
  };

  handleScroll = (e) => {
    const top = Math.round(e.currentTarget.scrollTop) === 0;
    if (top && this.state.messageList.length) {
      this.getMessages();
    }
  };

  mediaClickHandler = (type) => {
    this.setState({ messagetype: type, messageList: [] });
  };

  render() {
    const template = (message, key) => {
      if (this.state.messagetype === "image" && message.data.url) {
        return (
          <Box
            id={message.id}
            key={key}
            className="item item__image"
            margin="0.5rem"
            textAlign="center"
            flex="1 0 auto"
            height="120px"
            width="120px"
            backgroundColor={this.props.theme.backgroundColor.lightGrey}
            sx={{
              "@for $i from 1 through 36": {
                "&:nth-of-type(#{$i})": {
                  maxWidth: "100%",
                },
              },
            }}
          >
            <Image
              src={message.data.url}
              alt={Translator.translate("SHARED_MEDIA", this.props.lang)}
              display="block"
              width="100%"
              height="100%"
              objectFit="contain"
            />
          </Box>
        );
      } else if (this.state.messagetype === "video" && message.data.url) {
        return (
          <Box
            id={message.id}
            key={key}
            className="item item__video"
            margin="0.5rem"
            textAlign="center"
            flex="1 0 auto"
            sx={{
              "@for $i from 1 through 36": {
                "&:nth-of-type(#{$i})": {
                  maxWidth: "100%",
                },
              },
            }}
          >
            <Box
              as="video"
              src={message.data.url}
              height="120px"
              width="120px"
              margin="auto"
            />
          </Box>
        );
      } else if (
        this.state.messagetype === "file" &&
        message.data.attachments
      ) {
        return (
          <Box
            id={message.id}
            key={key}
            className="item item__file"
            margin="0.5rem"
            textAlign="center"
            flex="1 0 auto"
            backgroundColor={this.props.theme.backgroundColor.lightGrey}
            sx={{
              "@for $i from 1 through 36": {
                "&:nth-of-type(#{$i})": {
                  maxWidth: "100%",
                },
              },
            }}
          >
            <Link
              href={message.data.attachments[0].url}
              target="_blank"
              rel="noopener noreferrer"
              maxWidth="100%"
              maxHeight="100%"
              margin="auto"
              display="flex"
              padding="8px"
              _hover={{ color: this.props.theme.secondaryTextColor }}
              _visited={{ color: this.props.theme.secondaryTextColor }}
            >
              <Box
                width="30px"
                height="24px"
                display="inline-block"
                sx={{
                  mask: `url(${fileIcon}) left center no-repeat`,
                  backgroundColor: this.context.theme.secondaryTextColor,
                }}
              />
              <Text
                fontSize="13px"
                color={this.props.theme.secondaryTextColor}
                whiteSpace="pre-wrap"
                wordBreak="break-word"
                textAlign="left"
                width="calc(100% - 30px)"
              >
                {message.data.attachments[0].name}
              </Text>
            </Link>
          </Box>
        );
      }
    };

    const messages = [...this.state.messageList];
    const messageList = messages.map((message, key) => {
      return template(message, key);
    });

    return (
      <Box
        className="section section__sharedmedia"
        width="100%"
        height={this.props.containerHeight ? `calc(100% - ${this.props.containerHeight})` : "calc(100% - 20px)"}
      >
        <Heading
          as="h6"
          className="section__header"
          margin="0"
          width="100%"
          fontSize="12px"
          fontWeight="500!important"
          lineHeight="20px"
          color={this.props.theme.color.secondary}
          textTransform="uppercase"
        >
          {Translator.translate("SHARED_MEDIA", this.props.lang)}
        </Heading>
        <VStack
          data-id="sharedmedia"
          className="section__content"
          width="100%"
          margin="6px 0"
          display="flex"
          flexDirection="column"
          height="calc(100% - 20px)"
          spacing={0}
        >
          <Box
            className="media__button"
            borderRadius="8px"
            backgroundColor="rgba(20, 20, 20, 0.08)"
            width="100%"
            padding="2px"
            margin="6px 0"
            clear="both"
          >
            <HStack spacing={0}>
              <Box
                onClick={() => this.mediaClickHandler("image")}
                display="inline-block"
                width="33.33%"
                fontSize="13px"
                fontWeight="500"
                lineHeight="18px"
                padding="5px"
                position="relative"
                textAlign="center"
                cursor="pointer"
                backgroundColor={this.state.messagetype === "image" ? "#fff" : "transparent"}
                boxShadow={this.state.messagetype === "image" ? "rgba(20, 20, 20, 0.04) 0 3px 1px, rgba(20, 20, 20, 0.12) 0 3px 8px" : "none"}
                borderRadius={this.state.messagetype === "image" ? "7px" : "0"}
                sx={{
                  "&:before": {
                    content: this.state.messagetype === "image" ? "none" : '""',
                    position: "absolute",
                    display: this.state.messagetype === "image" ? "none" : "block",
                    width: "2px",
                    height: "16px",
                    backgroundColor: "rgba(20, 20, 20, 0.12)",
                    right: "-2px",
                    top: "6px",
                  },
                }}
              >
                {Translator.translate("PHOTOS", this.props.lang)}
              </Box>
              <Box
                onClick={() => this.mediaClickHandler("video")}
                display="inline-block"
                width="33.33%"
                fontSize="13px"
                fontWeight="500"
                lineHeight="18px"
                padding="5px"
                position="relative"
                textAlign="center"
                cursor="pointer"
                backgroundColor={this.state.messagetype === "video" ? "#fff" : "transparent"}
                boxShadow={this.state.messagetype === "video" ? "rgba(20, 20, 20, 0.04) 0 3px 1px, rgba(20, 20, 20, 0.12) 0 3px 8px" : "none"}
                borderRadius={this.state.messagetype === "video" ? "7px" : "0"}
                sx={{
                  "&:before": {
                    content: this.state.messagetype === "video" ? "none" : '""',
                    position: "absolute",
                    display: this.state.messagetype === "video" ? "none" : "block",
                    width: "2px",
                    height: "16px",
                    backgroundColor: "rgba(20, 20, 20, 0.12)",
                    right: "-2px",
                    top: "6px",
                  },
                }}
              >
                {Translator.translate("VIDEOS", this.props.lang)}
              </Box>
              <Box
                onClick={() => this.mediaClickHandler("file")}
                display="inline-block"
                width="33.33%"
                fontSize="13px"
                fontWeight="500"
                lineHeight="18px"
                padding="5px"
                position="relative"
                textAlign="center"
                cursor="pointer"
                backgroundColor={this.state.messagetype === "file" ? "#fff" : "transparent"}
                boxShadow={this.state.messagetype === "file" ? "rgba(20, 20, 20, 0.04) 0 3px 1px, rgba(20, 20, 20, 0.12) 0 3px 8px" : "none"}
                borderRadius={this.state.messagetype === "file" ? "7px" : "0"}
                sx={{
                  "&:last-of-type::before": {
                    display: "none",
                  },
                }}
              >
                {Translator.translate("DOCS", this.props.lang)}
              </Box>
            </HStack>
          </Box>
          <Flex
            className="media_items"
            height="calc(100% - 45px)"
            overflowY="auto"
            overflowX="hidden"
            display="flex"
            flexWrap="wrap"
            fontSize="14px"
            ref={(el) => (this.messageContainer = el)}
            onScroll={this.handleScroll}
          >
            {messageList.length
              ? messageList
              : Translator.translate("NO_RECORDS_FOUND", this.props.lang)}
          </Flex>
        </VStack>
      </Box>
    );
  }
}

// Specifies the default values for props:
CometChatSharedMediaView.defaultProps = {
  lang: Translator.getDefaultLanguage(),
  theme: theme,
};

CometChatSharedMediaView.propTypes = {
  lang: PropTypes.string,
  theme: PropTypes.object,
};

export { CometChatSharedMediaView };
