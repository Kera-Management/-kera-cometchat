import React from "react";
import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";

import { theme } from "../../../resources/theme";

const CometChatBadgeCount = (props) => {
  let badgeCount = null;

  if (props.count) {
    badgeCount = (
      <Box
        as="span"
        display="block"
        fontSize="12px"
        width="auto"
        height="18px"
        borderRadius="16px"
        backgroundColor={props.theme.primaryColor}
        color={props.theme.color.white}
        textAlign="center"
        fontWeight="700"
        lineHeight="18px"
        marginLeft="4px"
        padding="0 9px"
        marginRight="2px"
        opacity="1"
        transition="opacity .1s"
        className="unread-count"
      >
        {props.count}
      </Box>
    );
  }

  return badgeCount;
};

// Specifies the default values for props:
CometChatBadgeCount.defaultProps = {
  count: 0,
  theme: theme,
};

CometChatBadgeCount.propTypes = {
  count: PropTypes.number,
  theme: PropTypes.object,
};

export { CometChatBadgeCount };
