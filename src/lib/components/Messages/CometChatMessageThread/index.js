import React from "react";
import { Box, Flex, Text, Heading } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { CometChat } from "@cometchat-pro/chat";

import {
  CometChatMessageList,
  CometChatMessageComposer,
  CometChatSenderTextMessageBubble,
  CometChatReceiverTextMessageBubble,
  CometChatSenderImageMessageBubble,
  CometChatReceiverImageMessageBubble,
  CometChatSenderFileMessageBubble,
  CometChatReceiverFileMessageBubble,
  CometChatSenderAudioMessageBubble,
  CometChatReceiverAudioMessageBubble,
  CometChatSenderVideoMessageBubble,
  CometChatReceiverVideoMessageBubble,
  CometChatSenderDirectCallBubble,
  CometChatReceiverDirectCallBubble,
  CometChatImageViewer,
} from "..";

import {
  CometChatSenderPollMessageBubble,
  CometChatReceiverPollMessageBubble,
  CometChatSenderStickerBubble,
  CometChatReceiverStickerMessageBubble,
  CometChatSenderDocumentBubble,
  CometChatReceiverDocumentBubble,
  CometChatSenderWhiteboardBubble,
  CometChatReceiverWhiteboardBubble,
} from "../Extensions";

import { CometChatContext } from "../../../util/CometChatContext";
import { checkMessageForExtensionsData } from "../../../util/common";
import * as enums from "../../../util/enums.js";
import { CometChatEvent } from "../../../util/CometChatEvent";

import { theme } from "../../../resources/theme";
import Translator from "../../../resources/localization/translator";


import clearIcon from "./resources/close.svg";

class CometChatMessageThread extends React.PureComponent {
  loggedInUser = null;
  static contextType = CometChatContext;

  constructor(props) {
    super(props);

    this.state = {
      messageList: [],
      scrollToBottom: true,
      replyCount: 0,
      replyPreview: null,
      messageToBeEdited: null,
      parentMessage: props.parentMessage,
      viewOriginalImage: false,
      enableSendingOneOnOneMessage: false,
      enableSendingGroupMessage: false,
      enableHideDeletedMessages: false,
    };

    this.composerRef = React.createRef();
    this.toastRef = React.createRef();

    this.loggedInUser = this.props.loggedInUser;
  }

  componentDidMount() {
    CometChat.getLoggedinUser()
      .then((user) => (this.loggedInUser = user))
      .catch((error) => this.errorHandler("SOMETHING_WRONG"));

    this.enableSendingOneOnOneMessage();
    this.enableSendingGroupMessage();
    this.enableHideDeletedMessages();
  }

  componentDidUpdate(prevProps) {
    this.enableSendingOneOnOneMessage();
    this.enableSendingGroupMessage();
    this.enableHideDeletedMessages();

    if (prevProps.parentMessage !== this.props.parentMessage) {
      if (prevProps.parentMessage.id !== this.props.parentMessage.id) {
        this.setState({
          messageList: [],
          scrollToBottom: true,
          parentMessage: this.props.parentMessage,
        });
      } else if (
        prevProps.parentMessage.data !== this.props.parentMessage.data
      ) {
        this.setState({ parentMessage: this.props.parentMessage });
      }
    }
  }

  enableSendingOneOnOneMessage = () => {
    this.context.FeatureRestriction.isOneOnOneChatEnabled()
      .then((response) => {
        if (response !== this.state.enableSendingOneOnOneMessage) {
          this.setState({ enableSendingOneOnOneMessage: response });
        }
      })
      .catch((error) => {
        if (this.state.enableSendingOneOnOneMessage !== false) {
          this.setState({ enableSendingOneOnOneMessage: false });
        }
      });
  };

  enableSendingGroupMessage = () => {
    this.context.FeatureRestriction.isGroupChatEnabled()
      .then((response) => {
        if (response !== this.state.enableSendingGroupMessage) {
          this.setState({ enableSendingGroupMessage: response });
        }
      })
      .catch((error) => {
        if (this.state.enableSendingGroupMessage !== false) {
          this.setState({ enableSendingGroupMessage: false });
        }
      });
  };

  enableHideDeletedMessages = () => {
    this.context.FeatureRestriction.isHideDeletedMessagesEnabled()
      .then((response) => {
        if (response !== this.state.enableHideDeletedMessages) {
          this.setState({ enableHideDeletedMessages: response });
        }
      })
      .catch((error) => {
        if (this.state.enableHideDeletedMessages !== false) {
          this.setState({ enableHideDeletedMessages: false });
        }
      });
  };

  errorHandler = (errorCode) => {
    this.toastRef.setError(errorCode);
  };

  parentMessageEdited = (message) => {
    const parentMessage = { ...this.props.parentMessage };

    if (parentMessage.id === message.id) {
      const newMessageObj = { ...message };
      this.setState({ parentMessage: newMessageObj });
    }
  };

  actionHandler = (action, messages) => {
    switch (action) {
      case enums.ACTIONS["CUSTOM_MESSAGE_RECEIVED"]:
      case enums.ACTIONS["MESSAGE_RECEIVED"]:
        {
          const message = messages[0];
          if (
            message.hasOwnProperty("parentMessageId") &&
            message.parentMessageId === this.state.parentMessage.id
          ) {
            const replyCount = this.state.parentMessage.hasOwnProperty(
              "replyCount"
            )
              ? this.state.parentMessage.replyCount
              : 0;
            const newReplyCount = replyCount + 1;

            let messageObj = { ...this.state.parentMessage };
            let newMessageObj = Object.assign({}, messageObj, {
              replyCount: newReplyCount,
            });
            this.setState({ parentMessage: newMessageObj });

            this.smartReplyPreview(messages);
            this.appendMessage(messages);
          }
        }
        break;
      case enums.ACTIONS["MESSAGE_COMPOSED"]:
        {
          const replyCount = this.state.parentMessage.hasOwnProperty(
            "replyCount"
          )
            ? this.state.parentMessage.replyCount
            : 0;
          const newReplyCount = replyCount + 1;

          let messageObj = { ...this.state.parentMessage };
          let newMessageObj = Object.assign({}, messageObj, {
            replyCount: newReplyCount,
          });
          this.setState({ parentMessage: newMessageObj });

          this.appendMessage(messages);
          this.props.actionGenerated(
            enums.ACTIONS["THREAD_MESSAGE_COMPOSED"],
            messages
          );
        }
        break;
      case enums.ACTIONS["MESSAGE_SENT"]:
      case enums.ACTIONS["ERROR_IN_SENDING_MESSAGE"]:
        this.messageSent(messages);
        this.props.actionGenerated(action, messages);
        break;
      case enums.ACTIONS["ON_MESSAGE_READ_DELIVERED"]:
        this.updateMessages(messages);
        break;
      case enums.ACTIONS["ON_MESSAGE_EDITED"]:
        this.updateMessages(messages);
        break;
      case "messageFetched":
        this.prependMessages(messages);
        break;
      case enums.ACTIONS["MESSAGES_INITIAL_FETCH"]:
        this.prependMessagesAndScrollToBottom(messages);
        break;
      case enums.ACTIONS["ON_MESSAGE_DELETED"]:
        this.removeMessages(messages);
        break;
      case enums.ACTIONS["EDIT_MESSAGE"]:
        this.editMessage(messages);
        break;
      case enums.ACTIONS["MESSAGE_EDITED"]:
        this.messageEdited(messages);
        break;
      case enums.ACTIONS["CLEAR_EDIT_PREVIEW"]:
        this.clearEditPreview();
        break;
      case enums.ACTIONS["DELETE_MESSAGE"]:
        this.deleteMessage(messages);
        break;
      case enums.ACTIONS["REACT_TO_MESSAGE"]:
        this.reactToMessage(messages);
        break;
      case enums.ACTIONS["VIEW_ORIGINAL_IMAGE"]:
        this.toggleOriginalImageView(messages);
        break;
      default:
        break;
    }
  };

  toggleOriginalImageView = (message) => {
    this.setState({ viewOriginalImage: message });
  };

  messageSent = (messages) => {
    const message = messages[0];
    const messageList = [...this.state.messageList];
    let messageKey = messageList.findIndex((m) => m._id === message._id);
    if (messageKey > -1) {
      const newMessageObj = { ...message };

      messageList.splice(messageKey, 1, newMessageObj);
      this.updateMessages(messageList);
    }
  };

  editMessage = (message) => {
    this.setState({ messageToBeEdited: message });
  };

  messageEdited = (message) => {
    const messageList = [...this.state.messageList];
    let messageKey = messageList.findIndex((m) => m.id === message.id);
    if (messageKey > -1) {
      const messageObj = messageList[messageKey];

      const newMessageObj = { ...messageObj, ...message };

      messageList.splice(messageKey, 1, newMessageObj);
      this.updateMessages(messageList);

      if (messageList.length - messageKey === 1) {
        //this.context.setLastMessage(newMessageObj);
        CometChatEvent.triggerHandler("updateLastMessage", {
          ...newMessageObj,
        });
      }
    }
  };

  clearEditPreview = () => {
    this.setState({ messageToBeEdited: "" });
  };

  deleteMessage = (message) => {
    const messageId = message.id;
    CometChat.deleteMessage(messageId)
      .then((deletedMessage) => {
        this.removeMessages([deletedMessage]);

        const messageList = [...this.state.messageList];
        let messageKey = messageList.findIndex((m) => m.id === message.id);

        if (messageList.length - messageKey === 1 && !message.replyCount) {
          //this.context.setLastMessage(deletedMessage);
          CometChatEvent.triggerHandler("updateLastMessage", {
            ...deletedMessage,
          });
        }
      })
      .catch((error) => this.errorHandler("SOMETHING_WRONG"));
  };

  smartReplyPreview = (messages) => {
    const message = messages[0];

    const smartReplyData = checkMessageForExtensionsData(
      message,
      "smart-reply"
    );
    if (smartReplyData && smartReplyData.hasOwnProperty("error") === false) {
      this.setState({ replyPreview: message });
    } else {
      this.setState({ replyPreview: null });
    }
  };

  //message is received or composed & sent
  appendMessage = (message) => {
    let messages = [...this.state.messageList];
    messages = messages.concat(message);
    this.setState({ messageList: messages, scrollToBottom: true });
  };

  //message status is updated
  updateMessages = (messages) => {
    this.setState({ messageList: messages });
  };

  //messages are fetched from backend
  prependMessages = (messages) => {
    const messageList = [...messages, ...this.state.messageList];
    this.setState({ messageList: messageList, scrollToBottom: false });
  };

  //messages are fetched, scroll to bottom
  prependMessagesAndScrollToBottom = (messages) => {
    const messageList = [...messages, ...this.state.messageList];
    this.setState({ messageList: messageList, scrollToBottom: true });
  };

  //messages are deleted
  removeMessages = (messages) => {
    const deletedMessage = messages[0];
    const messagelist = [...this.state.messageList];

    let messageKey = messagelist.findIndex(
      (message) => message.id === deletedMessage.id
    );
    if (messageKey > -1) {
      if (this.state.enableHideDeletedMessages) {
        messagelist.splice(messageKey, 1);
      } else {
        let messageObj = { ...messagelist[messageKey] };
        let newMessageObj = Object.assign({}, messageObj, deletedMessage);
        messagelist.splice(messageKey, 1, newMessageObj);
      }

      this.setState({ messageList: messagelist, scrollToBottom: false });
    }
  };

  getSenderMessageComponent = (message) => {
    let component;

    switch (message.type) {
      case CometChat.MESSAGE_TYPE.TEXT:
        component = (
          <CometChatSenderTextMessageBubble
            key={message.id}
            message={message}
            actionGenerated={this.actionHandler}
          />
        );
        break;
      case CometChat.MESSAGE_TYPE.IMAGE:
        component = (
          <CometChatSenderImageMessageBubble
            key={message.id}
            message={message}
            actionGenerated={this.actionHandler}
          />
        );
        break;
      case CometChat.MESSAGE_TYPE.FILE:
        component = (
          <CometChatSenderFileMessageBubble
            key={message.id}
            message={message}
            actionGenerated={this.actionHandler}
          />
        );
        break;
      case CometChat.MESSAGE_TYPE.VIDEO:
        component = (
          <CometChatSenderVideoMessageBubble
            key={message.id}
            message={message}
            actionGenerated={this.actionHandler}
          />
        );
        break;
      case CometChat.MESSAGE_TYPE.AUDIO:
        component = (
          <CometChatSenderAudioMessageBubble
            key={message.id}
            message={message}
            actionGenerated={this.actionHandler}
          />
        );
        break;
      default:
        break;
    }

    return component;
  };

  getReceiverMessageComponent = (message) => {
    let component;

    switch (message.type) {
      case "message":
      case CometChat.MESSAGE_TYPE.TEXT:
        component = (
          <CometChatReceiverTextMessageBubble
            key={message.id}
            message={message}
            actionGenerated={this.actionHandler}
          />
        );
        break;
      case CometChat.MESSAGE_TYPE.IMAGE:
        component = (
          <CometChatReceiverImageMessageBubble
            key={message.id}
            message={message}
            actionGenerated={this.actionHandler}
          />
        );
        break;
      case CometChat.MESSAGE_TYPE.FILE:
        component = (
          <CometChatReceiverFileMessageBubble
            key={message.id}
            message={message}
            actionGenerated={this.actionHandler}
          />
        );
        break;
      case CometChat.MESSAGE_TYPE.AUDIO:
        component = (
          <CometChatReceiverAudioMessageBubble
            key={message.id}
            message={message}
            actionGenerated={this.actionHandler}
          />
        );
        break;
      case CometChat.MESSAGE_TYPE.VIDEO:
        component = (
          <CometChatReceiverVideoMessageBubble
            key={message.id}
            message={message}
            actionGenerated={this.actionHandler}
          />
        );
        break;
      default:
        break;
    }

    return component;
  };

  getSenderCustomMessageComponent = (message) => {
    let component;

    switch (message.type) {
      case enums.CUSTOM_TYPE_POLL:
        component = (
          <CometChatSenderPollMessageBubble
            key={message.id}
            message={message}
            actionGenerated={this.props.actionGenerated}
          />
        );
        break;
      case enums.CUSTOM_TYPE_STICKER:
        component = (
          <CometChatSenderStickerBubble
            key={message.id}
            message={message}
            actionGenerated={this.props.actionGenerated}
          />
        );
        break;
      case enums.CUSTOM_TYPE_DOCUMENT:
        component = (
          <CometChatSenderDocumentBubble
            key={message.id}
            message={message}
            actionGenerated={this.props.actionGenerated}
          />
        );
        break;
      case enums.CUSTOM_TYPE_WHITEBOARD:
        component = (
          <CometChatSenderWhiteboardBubble
            key={message.id}
            message={message}
            actionGenerated={this.props.actionGenerated}
          />
        );
        break;
      case enums.CUSTOM_TYPE_MEETING:
        component = (
          <CometChatSenderDirectCallBubble
            key={message.id}
            message={message}
            actionGenerated={this.props.actionGenerated}
          />
        );
        break;
      default:
        break;
    }

    return component;
  };

  getReceiverCustomMessageComponent = (message) => {
    let component;
    switch (message.type) {
      case enums.CUSTOM_TYPE_POLL:
        component = (
          <CometChatReceiverPollMessageBubble
            key={message.id}
            message={message}
            actionGenerated={this.props.actionGenerated}
          />
        );
        break;
      case enums.CUSTOM_TYPE_STICKER:
        component = (
          <CometChatReceiverStickerMessageBubble
            key={message.id}
            message={message}
            actionGenerated={this.props.actionGenerated}
          />
        );
        break;
      case enums.CUSTOM_TYPE_DOCUMENT:
        component = (
          <CometChatReceiverDocumentBubble
            key={message.id}
            message={message}
            actionGenerated={this.props.actionGenerated}
          />
        );
        break;
      case enums.CUSTOM_TYPE_WHITEBOARD:
        component = (
          <CometChatReceiverWhiteboardBubble
            key={message.id}
            message={message}
            actionGenerated={this.props.actionGenerated}
          />
        );
        break;
      case enums.CUSTOM_TYPE_MEETING:
        component = (
          <CometChatReceiverDirectCallBubble
            key={message.id}
            message={message}
            actionGenerated={this.props.actionGenerated}
          />
        );
        break;
      default:
        break;
    }

    return component;
  };

  getParentMessageComponent = (message) => {
    let component = null;

    switch (message.category) {
      case CometChat.CATEGORY_MESSAGE:
        if (this.loggedInUser.uid === message.sender.uid) {
          component = this.getSenderMessageComponent(message);
        } else {
          component = this.getReceiverMessageComponent(message);
        }
        break;
      case CometChat.CATEGORY_CUSTOM:
        if (this.loggedInUser.uid === message.sender.uid) {
          component = this.getSenderCustomMessageComponent(message);
        } else {
          component = this.getReceiverCustomMessageComponent(message);
        }
        break;
      default:
        break;
    }

    return component;
  };

  reactToMessage = (message) => {
    this.setState({ messageToReact: message });

    if (this.composerRef) {
      this.composerRef.toggleEmojiPicker();
    }
  };

  render() {
    let parentMessage = this.getParentMessageComponent(
      this.state.parentMessage
    );

    let seperator = (
      <Flex alignItems="center" position="relative" m="7px 16px" height="15px">
        <Box
          as="hr"
          flex="1"
          margin="1px 0 0 0"
          borderTop={`1px solid ${this.context.theme.borderColor.primary}`}
        />
      </Flex>
    );
    if (this.state.parentMessage.hasOwnProperty("replyCount")) {
      const replyCount = this.state.parentMessage.replyCount;
      const replyText =
        replyCount === 1
          ? `${replyCount} ${Translator.translate(
              "REPLY",
              this.context.language
            )}`
          : `${replyCount} ${Translator.translate(
              "REPLIES",
              this.context.language
            )}`;

      seperator = (
        <Flex
          className="message__separator"
          alignItems="center"
          position="relative"
          m="7px 16px"
          height="15px"
        >
          <Text
            className="message__replies"
            mr={3}
            fontSize="12px"
          >
            {replyText}
          </Text>
          <Box
            as="hr"
            flex="1"
            margin="1px 0 0 0"
            borderTop={`1px solid ${this.context.theme.borderColor.primary}`}
          />
        </Flex>
      );
    }

    let originalImageView = null;
    if (this.state.viewOriginalImage) {
      originalImageView = (
        <CometChatImageViewer
          open={true}
          close={() => this.toggleOriginalImageView(false)}
          message={this.state.viewOriginalImage}
          lang={this.context.language}
        />
      );
    }

    let messageComposer = (
      <CometChatMessageComposer
        ref={(el) => {
          this.composerRef = el;
        }}
        parentMessageId={this.props.parentMessage.id}
        messageToBeEdited={this.state.messageToBeEdited}
        replyPreview={this.state.replyPreview}
        messageToReact={this.state.messageToReact}
        actionGenerated={this.actionHandler}
      />
    );

    //if send messages feature is disabled
    if (
      (this.context.type === CometChat.ACTION_TYPE.TYPE_USER &&
        this.state.enableSendingOneOnOneMessage === false) ||
      (this.context.type === CometChat.ACTION_TYPE.TYPE_GROUP &&
        this.state.enableSendingGroupMessage === false)
    ) {
      messageComposer = null;
    }

    return (
      <React.Fragment>
        <Box
          className="thread__chat"
          display="flex"
          flexDirection="column"
          height="100%"
          boxSizing="border-box"
          fontFamily={this.context.theme.fontFamily}
          sx={{
            "*": {
              boxSizing: "border-box",
              fontFamily: this.context.theme.fontFamily,
            },
          }}
        >
          <Box
            className="chat__header"
            p={4}
            width="100%"
            backgroundColor={this.context.theme.backgroundColor.white}
            zIndex={1}
            borderBottom={`1px solid ${this.context.theme.borderColor.primary}`}
            height="69px"
            display="flex"
          >
            <Flex
              className="header__wrapper"
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Flex
                className="header__details"
                direction="column"
                width="calc(100% - 40px)"
              >
                <Heading
                  className="header__title"
                  as="h6"
                  m={0}
                  fontSize="15px"
                  fontWeight="600"
                  lineHeight="22px"
                  width="100%"
                >
                  {Translator.translate("THREAD", this.context.language)}
                </Heading>
                <Text
                  className="header__username"
                  fontSize="13px"
                  lineHeight="20px"
                  width="100%"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  {this.props.threadItem.name}
                </Text>
              </Flex>
              <Box
                className="header__close"
                cursor="pointer"
                width="24px"
                height="24px"
                sx={{
                  mask: `url(${clearIcon}) center center no-repeat`,
                  backgroundColor: this.context.theme.primaryColor,
                }}
                onClick={() =>
                  this.props.actionGenerated(
                    enums.ACTIONS["CLOSE_THREADED_MESSAGE"]
                  )
                }
              />
            </Flex>
          </Box>
          <Box
            className="chat__message__container"
            display="flex"
            flexDirection="column"
            height="100%"
            overflowX="hidden"
            overflowY="auto"
            transition="background .3s ease-out .1s"
            width="100%"
            zIndex={100}
            minHeight="calc(100% - 68px)"
            order={2}
            sx={{
              ".chat__list": {
                minHeight: "250px",
                ".list__wrapper": {
                  "::-webkit-scrollbar": {
                    display: "none",
                  },
                  scrollbarWidth: "none",
                },
              },
            }}
          >
            <Flex
              className="parent__message"
              p="14px 16px"
              alignItems="center"
              justifyContent={
                this.props.parentMessage.messageFrom === "sender"
                  ? "flex-end"
                  : "flex-start"
              }
              sx={{
                ".sender__message__container, .receiver__message__container": {
                  maxWidth: "100%",
                  "&:hover": {
                    ".message__actions": {
                      display: "none",
                    },
                  },
                },
                ".replycount": {
                  display: "none",
                },
              }}
            >
              {parentMessage}
            </Flex>
            {seperator}
            <CometChatMessageList
              messages={this.state.messageList}
              item={this.props.threadItem}
              type={this.props.threadType}
              scrollToBottom={this.state.scrollToBottom}
              parentMessageId={this.props.parentMessage.id}
              actionGenerated={this.actionHandler}
            />
            {messageComposer}
          </Box>
        </Box>
        {originalImageView}
      </React.Fragment>
    );
  }
}

// Specifies the default values for props:
CometChatMessageThread.defaultProps = {
  theme: theme,
};

CometChatMessageThread.propTypes = {
  theme: PropTypes.object,
};

export { CometChatMessageThread };
