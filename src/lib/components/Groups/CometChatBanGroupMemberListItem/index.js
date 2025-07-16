import { useContext } from "react";
import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { CometChat } from "@cometchat-pro/chat";

import { CometChatAvatar, CometChatUserPresence } from "../../Shared";

import { CometChatContext } from "../../../util/CometChatContext";
import * as enums from "../../../util/enums.js";

import Translator from "../../../resources/localization/translator";
import { theme } from "../../../resources/theme";

import unban from "./resources/ban-member.svg";

const CometChatBanGroupMemberListItem = (props) => {
  const context = useContext(CometChatContext);

  let name = props.member.name;
  let scope = context.roles[props.member.scope];
  let unBan = (
    <Box
      as="i"
      width="24px"
      height="24px"
      cursor="pointer"
      display="inline-block"
      title={Translator.translate("UNBAN", context.language)}
      onClick={() => {
        props.actionGenerated(
          enums.ACTIONS["UNBAN_GROUP_MEMBER"],
          props.member
        );
      }}
      sx={{
        mask: `url(${unban}) center center no-repeat`,
        backgroundColor: context.theme.secondaryTextColor,
      }}
    />
  );

  //if the loggedin user is moderator, don't allow unban of banned moderators or administrators
  if (
    context.item.scope === CometChat.GROUP_MEMBER_SCOPE.MODERATOR &&
    (props.member.scope === CometChat.GROUP_MEMBER_SCOPE.ADMIN ||
      props.member.scope === CometChat.GROUP_MEMBER_SCOPE.MODERATOR)
  ) {
    unBan = null;
  }

  //if the loggedin user is administrator, don't allow unban of banned administrators
  if (
    context.item.scope === CometChat.GROUP_MEMBER_SCOPE.ADMIN &&
    props.member.scope === CometChat.GROUP_MEMBER_SCOPE.ADMIN
  ) {
    if (context.item.owner !== props.loggedinuser.uid) {
      unBan = null;
    }
  }

  const toggleTooltip = (event, flag) => {
    const elem = event.currentTarget;
    const nameContainer = elem.lastChild;

    const scrollWidth = nameContainer.scrollWidth;
    const clientWidth = nameContainer.clientWidth;

    if (scrollWidth <= clientWidth) {
      return false;
    }

    if (flag) {
      nameContainer.setAttribute("title", nameContainer.textContent);
    } else {
      nameContainer.removeAttribute("title");
    }
  };

  return (
    <Flex
      borderLeft={`1px solid ${context.theme.borderColor.primary}`}
      borderRight={`1px solid ${context.theme.borderColor.primary}`}
      borderBottom={`1px solid ${context.theme.borderColor.primary}`}
      width="100%"
      fontSize="14px"
      direction="row"
      justify="flex-start"
      align="center"
      padding="8px"
    >
      <Flex
        className="userinfo"
        width={{
          base: "calc(100% - 185px)",
          md: "calc(100% - 185px)",
          lg: "calc(100% - 220px)"
        }}
        onMouseEnter={(event) => toggleTooltip(event, true)}
        onMouseLeave={(event) => toggleTooltip(event, false)}
      >
        <Box
          className="avatar"
          display="inline-block"
          float="left"
          width="36px"
          height="36px"
          marginRight="8px"
        >
          <CometChatAvatar user={props.member} />
          <CometChatUserPresence
            status={props.member.status}
            borderColor={props.theme.borderColor.primary}
          />
        </Box>
        <Text
          className="name"
          margin="10px 0 0 0"
          width="calc(100% - 50px)"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {name}
        </Text>
      </Flex>
      <Box
        className="role"
        width={{ base: "115px", lg: "150px" }}
        fontSize="12px"
      >
        {scope}
      </Box>
      <Box className="unban" width="70px">
        {unBan}
      </Box>
    </Flex>
  );
};

// Specifies the default values for props:
CometChatBanGroupMemberListItem.defaultProps = {
  theme: theme,
};

CometChatBanGroupMemberListItem.propTypes = {
  theme: PropTypes.object,
};

export { CometChatBanGroupMemberListItem };
