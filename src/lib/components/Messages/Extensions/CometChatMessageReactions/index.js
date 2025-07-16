import React from "react";
import PropTypes from "prop-types";
import { CometChat } from "@cometchat-pro/chat";
import { Box, Button, Text } from "@chakra-ui/react";

import { CometChatContext } from "../../../../util/CometChatContext";
import * as enums from "../../../../util/enums.js";
import { checkMessageForExtensionsData } from "../../../../util/common";

import { theme } from "../../../../resources/theme";
import Translator from "../../../../resources/localization/translator";

import reactIcon from "./resources/reactions.svg";
import { Emojis } from "./EmojiMapping";

class CometChatMessageReactions extends React.Component {
  static contextType = CometChatContext;
  loggedInUser;

  constructor(props, context) {
    super(props, context);
    this._isMounted = false;
    this.state = {
      enableMessageReaction: false,
    };

    this.context.getLoggedinUser().then((user) => {
      this.loggedInUser = { ...user };
    });
  }

  componentDidMount() {
    this._isMounted = true;
    this.enableMessageReaction();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  enableMessageReaction = () => {
    /**
     * If reacting to messages feature is disabled
     */
    this.context.FeatureRestriction.isReactionsEnabled()
      .then((response) => {
        if (response !== this.state.enableMessageReaction && this._isMounted) {
          this.setState({ enableMessageReaction: response });
        }
      })
      .catch((error) => {
        if (this.state.enableMessageReaction !== false) {
          this.setState({ enableMessageReaction: false });
        }
      });
  };

  reactToMessages = (emoji) => {
    let messageObject = { ...this.props.message };
    delete messageObject["metadata"]["@injected"]["extensions"]["reactions"][
      emoji
    ][this.loggedInUser.uid];
    this.props.actionGenerated(enums.ACTIONS["MESSAGE_EDITED"], messageObject);

    CometChat.callExtension("reactions", "POST", "v1/react", {
      msgId: this.props.message.id,
      emoji: emoji,
    })
      .then((response) => {
        // Reaction failed
        if (!response || !response.success || response.success !== true) {
          this.props.actionGenerated(
            enums.ACTIONS["ERROR"],
            [],
            "SOMETHING_WRONG"
          );
        }
      })
      .catch((error) => {
        this.props.actionGenerated(
          enums.ACTIONS["ERROR"],
          [],
          "SOMETHING_WRONG"
        );
      });
  };

  getMessageReactions = (reaction) => {
    if (reaction === null) {
      return null;
    }

    const messageReactions = Object.keys(reaction).map((data, key) => {
      const reactionData = reaction[data];
      let reactionName = data.replaceAll(":", "");
      const reactionCount = Object.keys(reactionData).length;

      /**Showing "?" instead of unknown :emoji_name: */
      if (data.includes(":")) {
        reactionName = Emojis[reactionName] ?? "?";
      }

      if (!reactionCount) {
        return null;
      }

      const userList = [];
      let reactionTitle = "";

      for (const user in reactionData) {
        userList.push(reactionData[user]["name"]);
      }

      if (userList.length) {
        reactionTitle = userList.join(", ");
        const str = ` ${Translator.translate(
          "REACTED",
          this.context.language
        )}`;
        reactionTitle = reactionTitle.concat(str);
      }

      const reactionClassName = `reaction reaction__${reactionName}`;
      const uid = this.loggedInUser?.uid;
      const hasUserReacted = reactionData.hasOwnProperty(uid);
      
      return (
        <Box
          key={key}
          fontSize="11px"
          p="2px 6px"
          display="inline-flex"
          alignItems="center"
          verticalAlign="top"
          backgroundColor={this.context.theme.backgroundColor.secondary}
          borderRadius="12px"
          m="4px 4px 0 0"
          cursor="pointer"
          border={hasUserReacted ? `1px solid ${this.context.theme.primaryColor}` : "1px solid transparent"}
          _hover={{
            border: hasUserReacted ? `1px solid ${this.context.theme.primaryColor}` : `1px solid ${this.context.theme.borderColor.primary}`,
          }}
          onClick={this.reactToMessages.bind(this, reactionName)}
          className={reactionClassName}
          title={reactionTitle}
        >
          <Box
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            fontSize="16px"
            className="emoji"
          >
            {reactionName}
          </Box>
          <Text
            color={this.context.theme.color.primary}
            p="0 1px 0 3px"
            className="reaction__count"
          >
            {reactionCount}
          </Text>
        </Box>
      );
    });

    return messageReactions;
  };

  addMessageReaction = () => {
    //If reacting to messages feature is disabled
    if (this.state.enableMessageReaction === false) {
      return null;
    }

    const addReactionEmoji = (
      <Box
        key="-1"
        fontSize="11px"
        p="2px 6px"
        display="inline-flex"
        alignItems="center"
        verticalAlign="top"
        backgroundColor={this.context.theme.backgroundColor.secondary}
        borderRadius="12px"
        m="4px 4px 0 0"
        cursor="pointer"
        border="1px solid transparent"
        _hover={{
          border: `1px solid ${this.context.theme.borderColor.primary}`,
        }}
        className="reaction reaction__add"
        title={Translator.translate("ADD_REACTION", this.context.language)}
      >
        <Button
          type="button"
          p="0"
          minW="auto"
          h="auto"
          outline="0"
          border="0"
          borderRadius="4px"
          alignItems="center"
          display="inline-flex"
          justifyContent="center"
          position="relative"
          bg="transparent"
          _hover={{ bg: "transparent" }}
          className="button__reacttomessage"
          onClick={() =>
            this.props.actionGenerated(
              enums.ACTIONS["REACT_TO_MESSAGE"],
              this.props.message
            )
          }
        >
          <Box
            h="24px"
            w="24px"
            sx={{
              mask: `url(${reactIcon}) center center no-repeat`,
              backgroundColor: this.context.theme.secondaryTextColor,
            }}
          />
        </Button>
      </Box>
    );

    return addReactionEmoji;
  };

  render() {
    const reaction = checkMessageForExtensionsData(
      this.props.message,
      "reactions"
    );
    const messageReactions = this.getMessageReactions(reaction);

    const addReactionEmoji = this.addMessageReaction();

    if (
      messageReactions !== null &&
      messageReactions.length &&
      addReactionEmoji !== null
    ) {
      if (this.props.message?.sender?.uid !== this.loggedInUser?.uid) {
        messageReactions.push(addReactionEmoji);
      } else {
        messageReactions.unshift(addReactionEmoji);
      }
    }

    return messageReactions;
  }
}

// Specifies the default values for props:
CometChatMessageReactions.defaultProps = {
  theme: theme,
  actionGenerated: () => {},
};

CometChatMessageReactions.propTypes = {
  theme: PropTypes.object,
  actionGenerated: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
};

export { CometChatMessageReactions };
