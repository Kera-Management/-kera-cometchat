import { useState, useContext } from "react";
import { Box, Flex, Text, Checkbox } from "@chakra-ui/react";
import PropTypes from "prop-types";

import { CometChatAvatar, CometChatUserPresence } from "../../Shared";

import { CometChatContext } from "../../../util/CometChatContext";

import { theme } from "../../../resources/theme";

import inactiveIcon from "./resources/group-member-unselect.svg";
import activeIcon from "./resources/group-member-select.svg";

const CometChatAddGroupMemberListItem = (props) => {
  const { groupMembers, theme } = useContext(CometChatContext);

  const [checked, setChecked] = useState(() => {
    const found = groupMembers.find((member) => member.uid === props.user.uid);
    const value = found ? true : false;

    return value;
  });

  const handleCheck = (event) => {
    const value = checked === true ? false : true;
    setChecked(value);
    props.changed(props.user, value);
  };

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
      border={`1px solid ${theme.borderColor.primary}`}
      width="100%"
      fontSize="14px"
      direction="row"
      justify="flex-start"
      align="center"
      sx={{
        "&:not(:last-child)": {
          borderBottom: "none"
        }
      }}
    >
      <Flex
        className="userinfo"
        padding="8px"
        width="calc(100% - 50px)"
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
          <CometChatAvatar user={props.user} />
          <CometChatUserPresence status={props.user.status} />
        </Box>
        <Text
          className="name"
          margin="10px"
          width="calc(100% - 50px)"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {props.user.name}
        </Text>
      </Flex>
      <Flex
        className="selection"
        padding="8px"
        width="50px"
        justify="center"
        align="center"
      >
        <Box position="relative">
          <Checkbox
            isChecked={checked}
            id={props.user.uid + "sel"}
            onChange={handleCheck}
            display="none"
            sx={{
              " + label": {
                display: "block",
                cursor: "pointer",
                userSelect: "none",
                padding: "8px",
                width: "100%",
                mask: `url(${inactiveIcon}) center center no-repeat`,
                backgroundColor: theme.secondaryTextColor,
              },
              "&:checked + label": {
                width: "100%",
                mask: `url(${activeIcon}) center center no-repeat`,
                backgroundColor: theme.secondaryTextColor,
              }
            }}
          />
          <Box as="label" htmlFor={props.user.uid + "sel"}>
            &nbsp;
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

// Specifies the default values for props:
CometChatAddGroupMemberListItem.defaultProps = {
  theme: theme,
};

CometChatAddGroupMemberListItem.propTypes = {
  theme: PropTypes.object,
};

export { CometChatAddGroupMemberListItem };
