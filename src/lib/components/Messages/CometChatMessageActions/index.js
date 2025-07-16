import React from "react";
import PropTypes from "prop-types";
import { CometChat } from "@cometchat-pro/chat";
import { Box, Flex, Button, List, ListItem } from "@chakra-ui/react";

import * as enums from "../../../util/enums.js";
import { CometChatContext } from "../../../util/CometChatContext";

import { theme } from "../../../resources/theme";
import Translator from "../../../resources/localization/translator";
import { ChatTeardropText } from "phosphor-react";

import editIcon from "./resources/edit.svg";
import reactIcon from "./resources/reactions.svg";
import translateIcon from "./resources/message-translate.svg";
import sendMessageInPrivateIcon from "./resources/send-message-in-private.svg";

class CometChatMessageActions extends React.PureComponent {
  static contextType = CometChatContext;

  constructor(props, context) {
    super(props, context);

    this.state = {
      loggedInUser: null,
      enableMessageReaction: false,
      enableThreadedChats: false,
      enableDeleteMessage: false,
      enableEditMessage: false,
      enableTranslateMessage: false,
      enableMessageInPrivate: false,
      enableDeleteMessageForModerator: false,
    };
  }

  componentDidMount() {
    this.context
      .getLoggedinUser()
      .then((user) => {
        this.setState({ loggedInUser: { ...user } });
      })
      .then(() => {
        this.enableMessageReaction();
        this.enableThreadedChats();
        this.enableDeleteMessage();
        this.enableDeleteMessageForModerator();
        this.enableEditMessage();
        this.enableTranslateMessage();
        this.enableMessageInPrivate();
      });
  }

  toggleTooltip = (event, flag) => {
    const elem = event.target;

    if (flag) {
      elem.setAttribute("title", elem.dataset.title);
    } else {
      elem.removeAttribute("title");
    }
  };

  enableMessageReaction = () => {
    /**
     * If reacting to messages feature is disabled
     */
    this.context.FeatureRestriction.isReactionsEnabled()
      .then((response) => {
        if (response === true) {
          this.setState({ enableMessageReaction: true });
        } else {
          this.setState({ enableMessageReaction: false });
        }
      })
      .catch((error) => {
        this.setState({ enableMessageReaction: false });
      });
  };

  enableThreadedChats = () => {
    /**
     * If threaded chats are open, return false
     */
    if (this.props.message.hasOwnProperty("parentMessageId") === true) {
      return false;
    }

    /**
     * If threaded replies feature is disabled
     */
    this.context.FeatureRestriction.isThreadedMessagesEnabled()
      .then((response) => {
        if (response === true) {
          this.setState({ enableThreadedChats: true });
        } else {
          this.setState({ enableThreadedChats: false });
        }
      })
      .catch((error) => {
        this.setState({ enableThreadedChats: false });
      });
  };

  enableDeleteMessage = () => {
    this.context.FeatureRestriction.isDeleteMessageEnabled()
      .then((response) => {
        if (response === true) {
          this.setState({ enableDeleteMessage: true });
        } else {
          this.setState({ enableDeleteMessage: false });
        }
      })
      .catch((error) => {
        this.setState({ enableDeleteMessage: false });
      });
  };

  enableDeleteMessageForModerator = () => {
    this.context.FeatureRestriction.isDeleteMemberMessageEnabled()
      .then((response) => {
        if (response === true) {
          this.setState({ enableDeleteMessageForModerator: true });
        } else {
          this.setState({ enableDeleteMessageForModerator: false });
        }
      })
      .catch((error) => {
        this.setState({ enableDeleteMessageForModerator: false });
      });
  };

  enableEditMessage = () => {
    /**
     * If the message is not sent by the logged in user or the message type is not text
     */
    if (
      this.props.message.sender?.uid !== this.state.loggedInUser?.uid ||
      this.props.message.type !== CometChat.MESSAGE_TYPE.TEXT
    ) {
      return false;
    }

    this.context.FeatureRestriction.isEditMessageEnabled()
      .then((response) => {
        if (response === true) {
          this.setState({ enableEditMessage: true });
        } else {
          this.setState({ enableEditMessage: false });
        }
      })
      .catch((error) => {
        this.setState({ enableEditMessage: false });
      });
  };

  enableTranslateMessage = () => {
    /**
     * message type is not text
     */
    if (this.props.message.type !== CometChat.MESSAGE_TYPE.TEXT) {
      return false;
    }

    this.context.FeatureRestriction.isMessageTranslationEnabled()
      .then((response) => {
        if (response === true) {
          this.setState({ enableTranslateMessage: true });
        } else {
          this.setState({ enableTranslateMessage: false });
        }
      })
      .catch((error) => {
        this.setState({ enableTranslateMessage: false });
      });
  };

  /**
   * If message in private feature is enabled
   */
  enableMessageInPrivate = () => {
    this.context.FeatureRestriction.isMessageInPrivateEnabled()
      .then((response) => {
        if (response === true) {
          this.setState({ enableMessageInPrivate: true });
        } else {
          this.setState({ enableMessageInPrivate: false });
        }
      })
      .catch((error) => {
        this.setState({ enableMessageInPrivate: false });
      });
  };

  sendMessageInPrivate = () => {
    const item = this.props.message?.sender;
    const type = CometChat.ACTION_TYPE.TYPE_USER;

    this.context.setTypeAndItem(type, item);
  };

  reactToMessage = () => {
    this.props.actionGenerated(
      enums.ACTIONS["REACT_TO_MESSAGE"],
      this.props.message
    );
  };

  viewThread = () => {
    this.props.actionGenerated(
      enums.ACTIONS["VIEW_THREADED_MESSAGE"],
      this.props.message
    );
  };

  deleteMessage = () => {
    this.props.actionGenerated(
      enums.ACTIONS["DELETE_MESSAGE"],
      this.props.message
    );
  };

  editMessage = () => {
    this.props.actionGenerated(
      enums.ACTIONS["EDIT_MESSAGE"],
      this.props.message
    );
  };

  translateMessage = () => {
    this.props.actionGenerated(
      enums.ACTIONS["TRANSLATE_MESSAGE"],
      this.props.message
    );
  };

  render() {
    //don't show the tooltip while the message is being sent
    if (this.props.message.hasOwnProperty("sentAt") === false) {
      return false;
    }

    let reactToMessage = null;
    if (this.state.enableMessageReaction) {
      reactToMessage = (
        <ListItem className="action__group">
          <Button
            variant="ghost"
            size="sm"
            onMouseEnter={(event) => this.toggleTooltip(event, true)}
            onMouseLeave={(event) => this.toggleTooltip(event, false)}
            className="group__button button__reacttomessage"
            data-title={Translator.translate(
              "ADD_REACTION",
              this.context.language
            )}
            onClick={this.reactToMessage}
            w="24px"
            h="24px"
            minW="24px"
            p="0"
            sx={{
              mask: `url(${reactIcon}) center center no-repeat`,
              backgroundColor: this.context.theme.primaryColor,
            }}
          />
        </ListItem>
      );
    }

    let threadedChats = null;
    if (this.state.enableThreadedChats) {
      threadedChats = (
        <ListItem className="action__group">
          <Button
            variant="ghost"
            size="sm"
            onMouseEnter={(event) => this.toggleTooltip(event, true)}
            onMouseLeave={(event) => this.toggleTooltip(event, false)}
            className="group__button button__threadedchats"
            data-title={
              this.props.message.replyCount
                ? Translator.translate("REPLY_TO_THREAD", this.context.language)
                : Translator.translate("REPLY_IN_THREAD", this.context.language)
            }
            onClick={this.viewThread}
            w="24px"
            h="24px"
            minW="24px"
            p="0"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ChatTeardropText size={16} weight="duotone" />
          </Button>
        </ListItem>
      );
    }

    /**
     * in one-on-one chat, allow deleting self messages if delete feature is enabled
     * in group chat, allow deleting other's messages for moderators and admins if moderator delete feature && delete feature is enabled
     */

    let editMessage = null;
    if (this.state.enableEditMessage) {
      editMessage = (
        <ListItem className="action__group">
          <Button
            variant="ghost"
            size="sm"
            onMouseEnter={(event) => this.toggleTooltip(event, true)}
            onMouseLeave={(event) => this.toggleTooltip(event, false)}
            className="group__button button__edit"
            data-title={Translator.translate(
              "EDIT_MESSAGE",
              this.context.language
            )}
            onClick={this.editMessage}
            w="24px"
            h="24px"
            minW="24px"
            p="0"
            sx={{
              mask: `url(${editIcon}) center center no-repeat`,
              backgroundColor: this.context.theme.primaryColor,
            }}
          />
        </ListItem>
      );
    }

    let translateMessage = null;
    if (this.state.enableTranslateMessage) {
      translateMessage = (
        <ListItem className="action__group">
          <Button
            variant="ghost"
            size="sm"
            onMouseEnter={(event) => this.toggleTooltip(event, true)}
            onMouseLeave={(event) => this.toggleTooltip(event, false)}
            className="group__button button__translate"
            data-title={Translator.translate(
              "TRANSLATE_MESSAGE",
              this.context.language
            )}
            onClick={this.translateMessage}
            w="24px"
            h="24px"
            minW="24px"
            p="0"
            sx={{
              mask: `url(${translateIcon}) center center no-repeat`,
              backgroundColor: this.context.theme.primaryColor,
            }}
          />
        </ListItem>
      );
    }

    /**
     * if send message in private feature is enabled, if group chat window is open, and messages are not sent by the loggedin user...
     */
    let messageInPrivate = null;
    if (
      this.state.enableMessageInPrivate === true &&
      this.context.type === CometChat.ACTION_TYPE.TYPE_GROUP &&
      this.props.message?.sender?.uid !== this.state.loggedInUser?.uid
    ) {
      messageInPrivate = (
        <ListItem>
          <Button
            variant="ghost"
            size="sm"
            onMouseEnter={(event) => this.toggleTooltip(event, true)}
            onMouseLeave={(event) => this.toggleTooltip(event, false)}
            className="group__button button__translate"
            data-title={Translator.translate(
              "SEND_MESSAGE_IN_PRIVATE",
              this.context.language
            )}
            onClick={this.sendMessageInPrivate}
            w="24px"
            h="24px"
            minW="24px"
            p="0"
            sx={{
              mask: `url(${sendMessageInPrivateIcon}) center center no-repeat`,
              backgroundColor: this.context.theme.primaryColor,
            }}
          />
        </ListItem>
      );
    }

    let tooltip = (
      <List
        className="message__actions"
        display="flex"
        flexDirection="row"
        bg={this.context.theme.backgroundColor.white}
        border={`1px solid ${this.context.theme.borderColor.primary}`}
        borderRadius="8px"
        p="4px"
        boxShadow="md"
        zIndex="10"
      >
        {reactToMessage}
        {threadedChats}
        {editMessage}
        {messageInPrivate}
        {translateMessage}
      </List>
    );

    if (
      threadedChats === null &&
      editMessage === null &&
      reactToMessage === null &&
      translateMessage === null &&
      messageInPrivate === null
    ) {
      tooltip = null;
    }

    return tooltip;
  }
}

// Specifies the default values for props:
CometChatMessageActions.defaultProps = {
  theme: theme,
  actionGenerated: () => {},
};

CometChatMessageActions.propTypes = {
  theme: PropTypes.object.isRequired,
  actionGenerated: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
};

export { CometChatMessageActions };
