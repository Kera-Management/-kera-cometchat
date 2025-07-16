import React from "react";
import { Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

import { CometChatContext } from "../../../util/CometChatContext";
import * as enums from "../../../util/enums.js";

import { theme } from "../../../resources/theme";
import Translator from "../../../resources/localization/translator";

const CometChatThreadedMessageReplyCount = (props) => {
  const context = React.useContext(CometChatContext);
  const [reply, setReply] = React.useState(false);

  const toggleReply = () => {
    context.FeatureRestriction.isThreadedMessagesEnabled()
      .then((response) => {
        if (response !== reply) {
          setReply(response);
        }
      })
      .catch((error) => {
        if (reply !== false) {
          setReply(false);
        }
      });
  };

  React.useEffect(toggleReply);

  const viewThread = () => {
    props.actionGenerated(
      enums.ACTIONS["VIEW_THREADED_MESSAGE"],
      props.message
    );
  };

  const replyCount = props.message.replyCount;
  const replyText =
    replyCount === 1
      ? `${replyCount} ${Translator.translate("REPLY", context.language)}`
      : `${replyCount} ${Translator.translate("REPLIES", context.language)}`;

  let replies = (
    <Text
      as="span"
      display="inline-block"
      fontSize="11px"
      fontWeight="500"
      lineHeight="12px"
      textTransform="lowercase"
      padding="0 10px"
      cursor="pointer"
      color={context.theme.color.blue}
      _hover={{
        textDecoration: "underline",
      }}
      className="replycount"
      onClick={viewThread}
    >
      {replyText}
    </Text>
  );

  if (props.message.hasOwnProperty("replyCount") === false) {
    replies = null;
  }

  //if threadedchats feature is disabled
  if (reply === false) {
    replies = null;
  }

  return replies;
};

// Specifies the default values for props:
CometChatThreadedMessageReplyCount.defaultProps = {
  theme: theme,
  actionGenerated: () => {},
};

CometChatThreadedMessageReplyCount.propTypes = {
  theme: PropTypes.object,
  actionGenerated: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
};

export { CometChatThreadedMessageReplyCount };
