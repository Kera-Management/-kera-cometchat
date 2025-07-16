import React from "react";
import twemoji from "twemoji";
import parse from "html-react-parser";
import { Box, Flex, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { CometChat } from "@cometchat-pro/chat";

import {
  CometChatMessageActions,
  CometChatThreadedMessageReplyCount,
  CometChatReadReceipt,
  CometChatLinkPreview,
} from "..";
import { CometChatMessageReactions } from "../Extensions";

import { CometChatContext } from "../../../util/CometChatContext";
import {
  linkify,
  checkMessageForExtensionsData,
  countEmojiOccurences,
} from "../../../util/common";
import * as enums from "../../../util/enums.js";

import Translator from "../../../resources/localization/translator";
import { theme } from "../../../resources/theme";


class CometChatSenderTextMessageBubble extends React.Component {
  static contextType = CometChatContext;

  constructor(props) {
    super(props);

    this.messageTextRef = React.createRef();

    this.state = {
      translatedMessage: "",
      isHovering: false,
      enableLargerSizeEmojis: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const currentMessageStr = JSON.stringify(this.props.message);
    const nextMessageStr = JSON.stringify(nextProps.message);

    if (
      currentMessageStr !== nextMessageStr ||
      this.state.isHovering !== nextState.isHovering ||
      this.state.translatedMessage !== nextState.translatedMessage ||
      this.state.enableLargerSizeEmojis !== nextState.enableLargerSizeEmojis
    ) {
      return true;
    }

    return false;
  }

  componentDidMount() {
    this.enableLargerSizeEmojis();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.message !== this.props.message) {
      this.setState({ translatedMessage: "" });
    }

    this.enableLargerSizeEmojis();
  }

  getMessageText = () => {
    let messageText = this.props.message.text;

    //xss extensions data
    const xssData = checkMessageForExtensionsData(
      this.props.message,
      "xss-filter"
    );
    if (
      xssData &&
      xssData.hasOwnProperty("sanitized_text") &&
      xssData.hasOwnProperty("hasXSS") &&
      xssData.hasXSS === "yes"
    ) {
      messageText = xssData.sanitized_text;
    }

    //datamasking extensions data
    const maskedData = checkMessageForExtensionsData(
      this.props.message,
      "data-masking"
    );
    if (
      maskedData &&
      maskedData.hasOwnProperty("data") &&
      maskedData.data.hasOwnProperty("sensitive_data") &&
      maskedData.data.hasOwnProperty("message_masked") &&
      maskedData.data.sensitive_data === "yes"
    ) {
      messageText = maskedData.data.message_masked;
    }

    //profanity extensions data
    const profaneData = checkMessageForExtensionsData(
      this.props.message,
      "profanity-filter"
    );
    if (
      profaneData &&
      profaneData.hasOwnProperty("profanity") &&
      profaneData.hasOwnProperty("message_clean") &&
      profaneData.profanity === "yes"
    ) {
      messageText = profaneData.message_clean;
    }

    const formattedText = linkify(messageText);

    const emojiParsedMessage = twemoji.parse(formattedText, {
      folder: "svg",
      ext: ".svg",
    });

    let count = countEmojiOccurences(emojiParsedMessage, 'class="emoji"');

    const parsedMessage = parse(emojiParsedMessage);

    let showVariation = true;
    //if larger size emojis feature is disabled
    if (this.state.enableLargerSizeEmojis === false) {
      showVariation = false;
    }

    messageText = (
      <Box
        className="message__txt__wrapper"
        display="inline-block"
        borderRadius="12px"
        backgroundColor={this.context.theme.primaryColor}
        color={this.context.theme.color.white}
        padding="8px 16px"
        width="auto"
      >
        <Text
          className="message__txt"
          as="p"
          margin="0"
          fontSize="14px"
          whiteSpace="pre-wrap"
          wordBreak="break-word"
          textAlign="left"
          width="auto"
          sx={{
            height: count === 1 ? "48px" : count === 2 ? "36px" : "auto",
            "a": {
              color: "#0432FF",
              "&:hover": {
                color: "#04009D"
              }
            },
            "a[href^='mailto:']": {
              color: "#F38C00",
              "&:hover": {
                color: "#F36800"
              }
            },
            "a[href^='tel:']": {
              color: "#3802DA",
              "&:hover": {
                color: "#2D038F"
              }
            },
            "> img": {
              width: showVariation === false ? "24px" : 
                     count === 1 ? "48px" : 
                     count === 2 ? "36px" : "24px",
              height: showVariation === false ? "24px" : 
                      count === 1 ? "48px" : 
                      count === 2 ? "36px" : "24px",
              display: "inline-block",
              verticalAlign: "top",
              zoom: "1",
              margin: "0 2px"
            }
          }}
        >
          {parsedMessage}
          {this.state.translatedMessage}
        </Text>
      </Box>
    );

    return messageText;
  };

  translateMessage = (message) => {
    const messageId = message.id;
    const messageText = message.text;

    const browserLanguageCode = Translator.getBrowserLanguage().toLowerCase();
    let translateToLanguage = browserLanguageCode;
    if (browserLanguageCode.indexOf("-") !== -1) {
      const browserLanguageArray = browserLanguageCode.split("-");
      translateToLanguage = browserLanguageArray[0];
    }

    let translatedMessage = "";
    CometChat.callExtension("message-translation", "POST", "v2/translate", {
      msgId: messageId,
      text: messageText,
      languages: [translateToLanguage],
    })
      .then((result) => {
        if (
          result.hasOwnProperty("language_original") &&
          result["language_original"] !== translateToLanguage
        ) {
          if (
            result.hasOwnProperty("translations") &&
            result.translations.length
          ) {
            const messageTranslation = result.translations[0];
            if (messageTranslation.hasOwnProperty("message_translated")) {
              translatedMessage = `\n(${messageTranslation["message_translated"]})`;
            }
          } else {
            this.props.actionGenerated(
              enums.ACTIONS["ERROR"],
              [],
              "SOMETHING_WRONG"
            );
          }
        } else {
          this.props.actionGenerated(
            enums.ACTIONS["INFO"],
            [],
            "SAME_LANGUAGE_MESSAGE"
          );
        }

        this.setState({ translatedMessage: translatedMessage });
      })
      .catch((error) =>
        this.props.actionGenerated(
          enums.ACTIONS["ERROR"],
          [],
          "SOMETHING_WRONG"
        )
      );
  };

  enableLargerSizeEmojis = () => {
    this.context.FeatureRestriction.isLargerSizeEmojisEnabled()
      .then((response) => {
        if (response !== this.state.enableLargerSizeEmojis) {
          this.setState({ enableLargerSizeEmojis: response });
        }
      })
      .catch((error) => {
        if (this.state.enableLargerSizeEmojis !== false) {
          this.setState({ enableLargerSizeEmojis: false });
        }
      });
  };

  handleMouseHover = () => {
    this.setState(this.toggleHoverState);
  };

  toggleHoverState = (state) => {
    return {
      isHovering: !state.isHovering,
    };
  };

  actionHandler = (action, message) => {
    switch (action) {
      case enums.ACTIONS["REACT_TO_MESSAGE"]:
        this.props.actionGenerated(action, message);
        break;
      case enums.ACTIONS["VIEW_THREADED_MESSAGE"]:
        this.props.actionGenerated(action, message);
        break;
      case enums.ACTIONS["DELETE_MESSAGE"]:
        this.props.actionGenerated(action, message);
        break;
      case enums.ACTIONS["EDIT_MESSAGE"]:
        this.props.actionGenerated(action, message);
        break;
      case enums.ACTIONS["TRANSLATE_MESSAGE"]:
        this.translateMessage(message);
        break;
      default:
        break;
    }
  };

  render() {
    let messageText = this.getMessageText();

    //linkpreview extensions data
    const linkPreviewData = checkMessageForExtensionsData(
      this.props.message,
      "link-preview"
    );
    if (
      linkPreviewData &&
      linkPreviewData.hasOwnProperty("links") &&
      linkPreviewData["links"].length
    ) {
      messageText = (
        <CometChatLinkPreview
          message={this.props.message}
          messageText={messageText}
        />
      );
    }

    //messagereactions extensions data
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
          actionGenerated={this.actionHandler}
        />
      );
    }

    return (
      <Flex
        className="sender__message__container message__text"
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
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}
      >
        {toolTipView}
        <Flex
          className="message__wrapper"
          width="auto"
          alignSelf="flex-end"
          display="flex"
          flex="1 1"
          ref={this.messageTextRef}
        >
          {messageText}
        </Flex>

        {messageReactions}

        <Flex 
          className="message__info__wrapper"
          alignSelf="flex-end"
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          height="25px"
          padding="4px 8px"
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
CometChatSenderTextMessageBubble.defaultProps = {
  theme: theme,
  actionGenerated: () => {},
};

CometChatSenderTextMessageBubble.propTypes = {
  theme: PropTypes.object,
  actionGenerated: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
};

export { CometChatSenderTextMessageBubble };
