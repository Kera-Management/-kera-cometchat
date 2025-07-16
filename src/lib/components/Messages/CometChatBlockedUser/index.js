import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { CometChat } from "@cometchat-pro/chat";

import { CometChatContext } from "../../../util/CometChatContext";
import { CometChatEvent } from "../../../util/CometChatEvent";
import * as enums from "../../../util/enums.js";

import Translator from "../../../resources/localization/translator";

const CometChatBlockedUser = (props) => {
  const context = React.useContext(CometChatContext);
  const chatWith = { ...context.item };

  const unblockUser = () => {
    let uid = chatWith.uid;
    CometChat.unblockUsers([uid])
      .then((response) => {
        if (
          response &&
          response.hasOwnProperty(uid) &&
          response[uid].hasOwnProperty("success") &&
          response[uid]["success"] === true
        ) {
          const newType = CometChat.ACTION_TYPE.TYPE_USER;
          const newItem = Object.assign({}, chatWith, { blockedByMe: false });
          context.setTypeAndItem(newType, newItem);
        } else {
          CometChatEvent.triggerHandler(
            enums.ACTIONS["ERROR"],
            "SOMETHING_WRONG"
          );
        }
      })
      .catch((error) =>
        CometChatEvent.triggerHandler(enums.ACTIONS["ERROR"], "SOMETHING_WRONG")
      );
  };

  return (
    <Box
      padding="16px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      backgroundColor="#fff"
      zIndex="1"
      order="3"
      position="relative"
      flex="none"
      minHeight="105px"
      width="100%"
      margin="auto"
      className=""
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Text
          fontSize="20px"
          fontWeight="700"
          textAlign="center"
        >
          {Translator.translate("YOU_HAVE_BLOCKED", props.lang) +
            " " +
            chatWith.name}
        </Text>
        <Text
          margin="16px 0"
          textAlign="center"
          color={context.theme.color.helpText}
        >
          {Translator.translate("NOT_POSSIBLE_TO_SEND_MESSAGES", props.lang)}
        </Text>
      </Box>
      <Button
        type="button"
        onClick={unblockUser}
        width={{
          base: "70%",
          sm: "70%",
          md: "50%",
          lg: "30%",
          xl: "20%"
        }}
        padding="8px 16px"
        margin="0"
        borderRadius="12px"
        backgroundColor={`${context.theme.primaryColor}!important`}
        color={context.theme.color.white}
        _hover={{
          backgroundColor: `${context.theme.primaryColor}!important`
        }}
      >
        {Translator.translate("UNBLOCK", props.lang)}
      </Button>
    </Box>
  );
};

// Specifies the default values for props:
CometChatBlockedUser.defaultProps = {
  lang: Translator.getDefaultLanguage(),
};

CometChatBlockedUser.propTypes = {
  lang: PropTypes.string,
};

export { CometChatBlockedUser };
