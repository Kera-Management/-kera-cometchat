import React, { useContext } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { CometChat } from "@cometchat-pro/chat";

import { CometChatAvatar, CometChatUserPresence } from "../../Shared";

import { CometChatContext } from "../../../util/CometChatContext";
import { theme } from "../../../resources/theme";
import Translator from "../../../resources/localization/translator";

const CometChatUserListItem = (props) => {
  const context = useContext(CometChatContext);

  let userPresence = <CometChatUserPresence status={props.user.status} />;

  const toggleTooltip = (event, flag) => {
    const elem = event.target;

    const scrollWidth = elem.scrollWidth;
    const clientWidth = elem.clientWidth;

    if (scrollWidth <= clientWidth) {
      return false;
    }

    if (flag) {
      elem.setAttribute("title", elem.textContent);
    } else {
      elem.removeAttribute("title");
    }
  };

  const isSelected = props.selectedUser && props.selectedUser.uid === props.user.uid;
  
  return (
    <Flex
      direction="row"
      justify="left"
      align="center"
      cursor="pointer"
      width="100%"
      padding="8px 16px"
      bg={isSelected ? context.theme.backgroundColor.primary : "transparent"}
      _hover={{ bg: context.theme.backgroundColor.primary }}
      onClick={() => props.clickHandler(props.user)}
      className="list__item"
    >
      <Box
        display="inline-block"
        width="36px"
        height="36px"
        flexShrink={0}
        className="list__item__thumbnail"
      >
        <CometChatAvatar user={props.user} />
        {userPresence}
      </Box>
      <Box
        width="calc(100% - 45px)"
        flexGrow={1}
        paddingLeft="16px"
        sx={{
          "&[dir=rtl]": {
            paddingRight: "16px",
            paddingLeft: "0",
          },
        }}
        className="list__item__details"
        dir={Translator.getDirection(context.language)}
      >
        <Text
          fontSize="15px"
          fontWeight="600"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          width="100%"
          margin="5px 0 0 0"
          lineHeight="22px"
          color={context.theme.color.primary}
          className="item__details__name"
          onMouseEnter={(event) => toggleTooltip(event, true)}
          onMouseLeave={(event) => toggleTooltip(event, false)}
        >
          {props.user.name}
        </Text>
        <Box
          marginTop="10px"
          borderBottom={`1px solid ${context.theme.borderColor.primary}`}
          className="item__details__desc"
        ></Box>
      </Box>
    </Flex>
  );
};

// Specifies the default values for props:
CometChatUserListItem.defaultProps = {
  theme: theme,
  user: {},
};

CometChatUserListItem.propTypes = {
  theme: PropTypes.object,
  user: PropTypes.shape(CometChat.User),
};

export { CometChatUserListItem };
