import React, { useContext, useState, useEffect } from "react";
import dateFormat from "dateformat";
import { Box, Text, Flex } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { CometChat } from "@cometchat-pro/chat";

import { CometChatAvatar } from "../../Shared";

import { CometChatContext } from "../../../util/CometChatContext";

import { theme } from "../../../resources/theme";
import Translator from "../../../resources/localization/translator";

const CometChatDeleteMessageBubble = (props) => {
  const context = useContext(CometChatContext);

  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    context.getLoggedinUser().then((user) => {
      setLoggedInUser({ ...user });
    });
  }, [context]);

  let message = null;
  const messageDate = props.message.sentAt * 1000;
  const isOwnMessage = props.message?.sender?.uid === loggedInUser?.uid;
  
  if (isOwnMessage) {
    message = (
      <React.Fragment>
        <Box
          display="inline-block"
          borderRadius="12px"
          padding="8px 12px"
          alignSelf="flex-end"
          width="100%"
          backgroundColor={context.theme.backgroundColor.secondary}
          fontStyle="italic"
          className="message__txt__wrapper"
        >
          <Text
            fontSize="14px"
            margin="0"
            lineHeight="20px"
            color={context.theme.color.helpText}
            className="message__txt"
          >
            {Translator.translate("YOU_DELETED_THIS_MESSAGE", context.language)}
          </Text>
        </Box>
        <Box
          alignSelf="flex-end"
          className="message__info__wrapper"
        >
          <Text
            as="span"
            display="inline-block"
            fontSize="11px"
            fontWeight="500"
            lineHeight="12px"
            textTransform="uppercase"
            color={context.theme.color.helpText}
            className="message__timestamp"
          >
            {dateFormat(messageDate, "shortTime")}
          </Text>
        </Box>
      </React.Fragment>
    );
  } else {
    let avatar = null,
      name = null;
    const isGroupMessage = props.message.receiverType === CometChat.RECEIVER_TYPE.GROUP;
    
    if (isGroupMessage) {
      avatar = (
        <Box
          width="36px"
          height="36px"
          margin="12px 0"
          float="left"
          className="message__thumbnail"
        >
          <CometChatAvatar user={props.message.sender} />
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
            fontSize="10px"
            color={context.theme.color.helpText}
            className="message__name"
          >
            {props.message.sender.name}
          </Text>
        </Box>
      );
    }

    message = (
      <React.Fragment>
        {avatar}
        <Flex
          flex="1 1"
          direction="column"
          position="relative"
          paddingLeft={isGroupMessage ? "5px" : "0"}
          className="message__details"
        >
          {name}
          <Box
            display="inline-block"
            borderRadius="12px"
            padding="8px 12px"
            alignSelf="flex-start"
            width="100%"
            backgroundColor={context.theme.backgroundColor.secondary}
            fontStyle="italic"
            className="message__txt__wrapper"
          >
            <Text
              fontSize="14px"
              margin="0"
              lineHeight="20px"
              color={context.theme.color.helpText}
              className="message__txt"
            >
              {Translator.translate("THIS_MESSAGE_DELETED", context.language)}
            </Text>
          </Box>
          <Box
            alignSelf="flex-start"
            className="message__info__wrapper"
          >
            <Text
              as="span"
              display="inline-block"
              fontSize="11px"
              fontWeight="500"
              lineHeight="12px"
              textTransform="uppercase"
              color={context.theme.color.helpText}
              className="message__timestamp"
            >
              {dateFormat(messageDate, "shortTime")}
            </Text>
          </Box>
        </Flex>
      </React.Fragment>
    );
  }

  return (
    <Box
      marginBottom="16px"
      paddingLeft="16px"
      paddingRight="16px"
      maxWidth="65%"
      clear="both"
      flexShrink="0"
      alignSelf={isOwnMessage ? "flex-end" : "flex-start"}
      className="message__deleted"
    >
      <Flex
        flex="1 1"
        position="relative"
        width="100%"
        direction={isOwnMessage ? "column" : "row"}
        className="message__wrapper"
      >
        {message}
      </Flex>
    </Box>
  );
};

// Specifies the default values for props:
CometChatDeleteMessageBubble.defaultProps = {
  theme: theme,
};

CometChatDeleteMessageBubble.propTypes = {
  theme: PropTypes.object,
  message: PropTypes.object.isRequired,
};

export { CometChatDeleteMessageBubble };
