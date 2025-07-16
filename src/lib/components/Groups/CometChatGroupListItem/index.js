import React from "react";
import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { CometChat } from "@cometchat-pro/chat";
import { ShieldCheck, Lock } from "phosphor-react";

import { CometChatAvatar } from "../../Shared";
import { CometChatContext } from "../../../util/CometChatContext";

import { theme } from "../../../resources/theme";
import Translator from "../../../resources/localization/translator";

class CometChatGroupListItem extends React.PureComponent {
  static contextType = CometChatContext;

  toggleTooltip = (event, flag) => {
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

  clickHandler = () => {
    this.props.clickHandler(this.props.group);
  };

  render() {
    let groupTypeIcon = null;
    if (this.props.group.type === CometChat.GROUP_TYPE.PRIVATE) {
      groupTypeIcon = (
        <Icon
          as={ShieldCheck}
          boxSize="24px"
          color={this.context.theme.secondaryTextColor}
          title={Translator.translate("PRIVATE_GROUP", this.context.language)}
        />
      );
    } else if (this.props.group.type === CometChat.GROUP_TYPE.PASSWORD) {
      groupTypeIcon = (
        <Icon
          as={Lock}
          boxSize="24px"
          color={this.context.theme.secondaryTextColor}
          title={Translator.translate("PROTECTED_GROUP", this.context.language)}
        />
      );
    }

    const isSelected = this.props.selectedGroup && this.props.selectedGroup.guid === this.props.group.guid;

    return (
      <Flex
        direction="row"
        justify="left"
        align="center"
        cursor="pointer"
        width="100%"
        padding="8px 16px"
        bg={isSelected ? this.context.theme.backgroundColor.primary : "transparent"}
        _hover={{ bg: this.context.theme.backgroundColor.primary }}
        className="list__item"
        onClick={this.clickHandler}
      >
        <Box
          display="inline-block"
          width="36px"
          height="36px"
          flexShrink={0}
          className="list__item__thumbnail"
        >
          <CometChatAvatar group={this.props.group} />
        </Box>
        <Box
          width="calc(100% - 70px)"
          flexGrow={1}
          paddingLeft="16px"
          sx={{
            "&[dir=rtl]": {
              paddingRight: "16px",
              paddingLeft: "0",
            },
          }}
          className="list__item__details"
          dir={Translator.getDirection(this.context.language)}
        >
          <Flex
            align="center"
            width="100%"
            margin="0"
            className="item__details__name"
            onMouseEnter={(event) => this.toggleTooltip(event, true)}
            onMouseLeave={(event) => this.toggleTooltip(event, false)}
          >
            <Text
              fontSize="15px"
              fontWeight="600"
              maxWidth="calc(100% - 30px)"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              margin="0"
              lineHeight="22px"
              color={this.context.theme.color.primary}
            >
              {this.props.group.name}
            </Text>
            <Box width="24px" height="auto" margin="0 8px">
              {groupTypeIcon}
            </Box>
          </Flex>
          <Text
            borderBottom={`1px solid ${this.context.theme.borderColor.primary}`}
            padding="0 0 5px 0"
            fontSize="13px"
            fontWeight="400"
            lineHeight="20px"
            color={this.context.theme.color.helpText}
            className="item__details__desc"
          >
            {`${this.props.group.membersCount} ${Translator.translate(
              "MEMBERS",
              this.context.language
            )}`}
          </Text>
        </Box>
      </Flex>
    );
  }
}

// Specifies the default values for props:
CometChatGroupListItem.defaultProps = {
  theme: theme,
  group: {},
  selectedGroup: {},
  clickHandler: () => {},
};

CometChatGroupListItem.propTypes = {
  theme: PropTypes.object,
  selectedGroup: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.shape(CometChat.Group),
  ]),
  group: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.shape(CometChat.Group),
  ]),
  clickHandler: PropTypes.func,
};

export { CometChatGroupListItem };
