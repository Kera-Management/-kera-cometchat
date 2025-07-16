import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import PropTypes from "prop-types";

import {
  CometChatMessageActions,
  CometChatThreadedMessageReplyCount,
  CometChatReadReceipt,
} from "..";
import { CometChatMessageReactions } from "../Extensions";

import {
  checkMessageForExtensionsData,
  getMessageFileMetadata,
} from "../../../util/common";
import * as enums from "../../../util/enums.js";

import { theme } from "../../../resources/theme";

class CometChatSenderAudioMessageBubble extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isHovering: false,
      fileData: {},
    };
  }

  componentDidMount() {
    const fileData = this.getFileData();
    this.setState({ fileData: fileData });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const currentMessageStr = JSON.stringify(this.props.message);
    const nextMessageStr = JSON.stringify(nextProps.message);

    if (
      currentMessageStr !== nextMessageStr ||
      this.state.isHovering !== nextState.isHovering ||
      this.state.fileData !== nextState.fileData
    ) {
      return true;
    }
    return false;
  }

  componentDidUpdate(prevProps) {
    const previousMessageStr = JSON.stringify(prevProps.message);
    const currentMessageStr = JSON.stringify(this.props.message);

    if (previousMessageStr !== currentMessageStr) {
      const fileData = this.getFileData();

      const previousfileData = JSON.stringify(this.state.fileData);
      const currentfileData = JSON.stringify(fileData);

      if (previousfileData !== currentfileData) {
        this.setState({ fileData: fileData });
      }
    }
  }

  getFileData = () => {
    const metadataKey = enums.CONSTANTS["FILE_METADATA"];
    const fileMetadata = getMessageFileMetadata(
      this.props.message,
      metadataKey
    );

    if (fileMetadata instanceof Blob) {
      return { fileName: fileMetadata["name"] };
    } else if (
      this.props.message.data.hasOwnProperty("attachments") &&
      this.props.message.data.attachments.length
    ) {
      const fileName = this.props.message.data.attachments[0]?.name;
      const fileUrl = this.props.message.data.attachments[0]?.url;

      return { fileName, fileUrl: fileUrl };
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
    if (!Object.keys(this.state.fileData).length) {
      return null;
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
          actionGenerated={this.props.actionGenerated}
        />
      );
    }

    return (
      <Flex
        className="sender__message__container message__audio"
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
          flex="1 1"
          alignSelf="flex-end"
          display="flex"
        >
          <Box
            className="message__audio__wrapper"
            display="inline-block"
            borderRadius="12px"
            alignSelf="flex-end"
            sx={{
              "> audio": {
                maxWidth: "250px",
                display: "inherit",
                outline: "none",
              }
            }}
          >
            <audio controls src={this.state.fileData?.fileUrl}></audio>
          </Box>
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
CometChatSenderAudioMessageBubble.defaultProps = {
  theme: theme,
  actionGenerated: () => {},
};

CometChatSenderAudioMessageBubble.propTypes = {
  theme: PropTypes.object,
  actionGenerated: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
};

export { CometChatSenderAudioMessageBubble };
