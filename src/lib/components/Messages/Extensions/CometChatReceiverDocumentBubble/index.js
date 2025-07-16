import React from "react";
import { Box, Flex, Text, UnorderedList, ListItem, Icon } from "@chakra-ui/react";
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

import documentIcon from "./resources/collaborative-document.svg";

class CometChatReceiverDocumentBubble extends React.Component {
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

  launchCollaborativeDocument = () => {
    let documentUrl = null;
    let documentData = checkMessageForExtensionsData(
      this.props.message,
      "document"
    );
    if (
      documentData &&
      documentData.hasOwnProperty("document_url") &&
      documentData.document_url.length
    ) {
      documentUrl = documentData.document_url;
      window.open(documentUrl, "", "fullscreen=yes, scrollbars=auto");
    }
  };

  render() {
    let avatar = null,
      name = null;
    if (this.props.message.receiverType === CometChat.RECEIVER_TYPE.GROUP) {
      avatar = (
        <Box
          width="36px"
          height="36px"
          margin="10px 5px"
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
          padding="3px 5px"
          className="message__name__wrapper"
        >
          <Text
            as="span"
            fontSize="11px"
            color={this.context.theme.color.search}
            className="message__name"
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
            display="flex"
            alignSelf="flex-start"
            width="100%"
            flexWrap="wrap"
            justifyContent="flex-start"
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

    const documentTitle = `${
      this.props.message.sender.name
    } ${Translator.translate(
      "SHARED_COLLABORATIVE_DOCUMENT",
      this.context.language
    )}`;

    return (
      <Flex
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
        className="receiver__message__container message__document"
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}
      >
        <Flex
          width="auto"
          flex="1 1"
          alignSelf="flex-start"
          display="flex"
          className="message__wrapper"
        >
          {avatar}
          <Flex
            flex="1 1"
            display="flex"
            flexDirection="column"
            className="message__details"
          >
            {name}
            {toolTipView}
            <Box
              width="auto"
              flex="1 1"
              alignSelf="flex-start"
              display="flex"
              className="message__document__container"
            >
              <Box
                display="inline-block"
                borderRadius="12px"
                backgroundColor={this.context.theme.backgroundColor.secondary}
                padding="8px 12px"
                alignSelf="flex-start"
                width="100%"
                className="message__document__wrapper"
              >
                <Flex
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  className="message__document__title"
                >
                  <Box
                    as="i"
                    width="24px"
                    height="24px"
                    margin="0 12px 0 0"
                    sx={{
                      mask: `url(${documentIcon}) center center no-repeat`,
                      backgroundColor: this.context.theme.primaryColor,
                    }}
                    title={Translator.translate(
                      "COLLABORATIVE_DOCUMENT",
                      this.context.language
                    )}
                  ></Box>
                  <Text
                    fontSize="14px"
                    fontWeight="500"
                    margin="0"
                    className="document__title"
                  >
                    {documentTitle}
                  </Text>
                </Flex>

                <UnorderedList
                  listStyleType="none"
                  margin="0"
                  padding="0"
                  className="document__button"
                  sx={{
                    "li": {
                      background: this.context.theme.primaryColor,
                      borderRadius: "12px",
                      display: "inline-block",
                      padding: "8px 12px",
                      margin: "5px 0 0 0",
                      cursor: "pointer",
                      "p": {
                        margin: "0",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: this.context.theme.color.white,
                      },
                    },
                  }}
                >
                  <ListItem onClick={this.launchCollaborativeDocument}>
                    <Text>{Translator.translate("JOIN", this.context.language)}</Text>
                  </ListItem>
                </UnorderedList>
              </Box>
            </Box>

            {messageReactions}

            <Flex
              alignSelf="flex-start"
              padding="4px 8px"
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              height="25px"
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
CometChatReceiverDocumentBubble.defaultProps = {
  theme: theme,
  actionGenerated: () => {},
};

CometChatReceiverDocumentBubble.propTypes = {
  theme: PropTypes.object,
  actionGenerated: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
};

export { CometChatReceiverDocumentBubble };
