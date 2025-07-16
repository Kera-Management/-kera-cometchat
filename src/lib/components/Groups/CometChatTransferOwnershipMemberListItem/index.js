import React from "react";
import { Box, Flex, Text, Radio } from "@chakra-ui/react";

import { CometChatContext } from "../../../util/CometChatContext";
import { CometChatAvatar, CometChatUserPresence } from "../../Shared";

import inactiveIcon from "./resources/group-member-unselect.svg";
import activeIcon from "./resources/group-member-select.svg";

class CometChatTransferOwnershipMemberListItem extends React.Component {
  static contextType = CometChatContext;
  constructor(props, context) {
    super(props, context);

    this.state = {
      isSelected: false,
    };
  }

  handleCheck = (e) => {
    this.setState(this.toggleSelectedState);
    this.props.checked(this.props.member);
  };

  toggleSelectedState = (state) => {
    return {
      isSelected: !state.isSelected,
    };
  };

  toggleTooltip = (event, flag) => {
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

  render() {
    return (
      <Flex
        width="100%"
        fontSize="14px"
        padding="8px"
        direction="row"
        justify="flex-start"
        align="center"
        borderLeft={`1px solid ${this.context.theme.borderColor.primary}`}
        borderRight={`1px solid ${this.context.theme.borderColor.primary}`}
        borderBottom={`1px solid ${this.context.theme.borderColor.primary}`}
      >
        <Flex
          className="memberinfo"
          width={{
            base: "calc(100% - 120px)",
            sm: "calc(100% - 140px)", 
            md: "calc(100% - 180px)",
            lg: "calc(100% - 180px)"
          }}
          onMouseEnter={(event) => this.toggleTooltip(event, true)}
          onMouseLeave={(event) => this.toggleTooltip(event, false)}
        >
          <Box
            className="avatar"
            display="inline-block"
            float="left"
            width="36px"
            height="36px"
            marginRight="8px"
          >
            <CometChatAvatar user={this.props.member} />
            <CometChatUserPresence status={this.props.member.status} />
          </Box>
          <Text
            className="name"
            margin="10px"
            width="calc(100% - 50px)"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            {this.props.member.name}
          </Text>
        </Flex>
        <Flex
          className="selection"
          width={{
            base: "120px",
            sm: "140px",
            md: "180px",
            lg: "180px"
          }}
          justify="flex-start"
          align="center"
        >
          <Text
            fontSize="12px"
            display="block"
            paddingRight="8px"
          >
            {this.context.roles[this.props.member.scope]}
          </Text>
          <Box position="relative">
            <Radio
              isChecked={this.state.checked}
              name="transferOwnership"
              id={this.props.member.uid + "sel"}
              onChange={this.handleCheck}
              display="none"
              sx={{
                " + label": {
                  display: "block",
                  cursor: "pointer",
                  mask: `url(${inactiveIcon}) center center no-repeat`,
                  backgroundColor: this.context.theme.secondaryTextColor,
                  userSelect: "none",
                  padding: "8px",
                },
                "&:checked + label": {
                  mask: `url(${activeIcon}) center center no-repeat`,
                  backgroundColor: this.context.theme.secondaryTextColor,
                  padding: "8px",
                }
              }}
            />
            <Box as="label" htmlFor={this.props.member.uid + "sel"}>
              &nbsp;
            </Box>
          </Box>
        </Flex>
      </Flex>
    );
  }
}

export { CometChatTransferOwnershipMemberListItem };
