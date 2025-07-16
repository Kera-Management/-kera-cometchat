import React from "react";
import { Box, Flex, Text, UnorderedList, ListItem } from "@chakra-ui/react";
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

import documentIcon from "./resources/collaborative-document.svg";

class CometChatSenderDocumentBubble extends React.Component {
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

    const documentTitle = Translator.translate(
      "CREATED_DOCUMENT",
      this.context.language
    );
    return (
      <Flex
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
        className="sender__message__container message__document"
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
            borderRadius="12px"
            backgroundColor={this.context.theme.backgroundColor.blue}
            padding="8px 12px"
            alignSelf="flex-end"
            width="100%"
            className="message__document__wrapper"
          >
            <Flex
              display="flex"
              flexDirection="row"
              alignItems="center"
              className="message__document__container"
            >
              <Box
                as="i"
                width="24px"
                height="24px"
                margin="0 12px 0 0"
                sx={{
                  mask: `url(${documentIcon}) center center no-repeat`,
                  backgroundColor: this.context.theme.color.white,
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
                color={this.context.theme.color.white}
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
                  background: this.context.theme.color.white,
                  borderRadius: "12px",
                  display: "inline-block",
                  padding: "8px 12px",
                  margin: "5px 0 0 0",
                  cursor: "pointer",
                  "p": {
                    margin: "0",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: this.context.theme.backgroundColor.blue,
                  },
                },
              }}
            >
              <ListItem onClick={this.launchCollaborativeDocument}>
                <Text>{Translator.translate("LAUNCH", this.context.language)}</Text>
              </ListItem>
            </UnorderedList>
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
CometChatSenderDocumentBubble.defaultProps = {
  theme: theme,
  actionGenerated: () => {},
};

CometChatSenderDocumentBubble.propTypes = {
  theme: PropTypes.object,
  actionGenerated: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
};

export { CometChatSenderDocumentBubble };
