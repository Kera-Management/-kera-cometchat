import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { CometChat } from "@cometchat-pro/chat";

import { CometChatBanGroupMemberListItem } from "..";
import { CometChatBackdrop } from "../../Shared";

import { CometChatContext } from "../../../util/CometChatContext";
import * as enums from "../../../util/enums.js";

import Translator from "../../../resources/localization/translator";
import { theme } from "../../../resources/theme";

import clearIcon from "./resources/close.svg";

class CometChatBanGroupMemberList extends React.Component {
  static contextType = CometChatContext;

  constructor(props) {
    super(props);

    this.state = {
      membersToBan: [],
      membersToUnBan: [],
      decoratorMessage: Translator.translate(
        "LOADING",
        Translator.getDefaultLanguage()
      ),
      errorMessage: "",
    };
  }

  componentDidMount() {
    if (this.context.bannedGroupMembers.length === 0) {
      this.setState({
        decoratorMessage: Translator.translate(
          "NO_BANNED_MEMBERS_FOUND",
          this.context.language
        ),
      });
    } else {
      this.setState({ decoratorMessage: "" });
    }
  }

  componentDidUpdate() {
    if (
      this.context.bannedGroupMembers.length === 0 &&
      this.state.decoratorMessage === ""
    ) {
      this.setState({
        decoratorMessage: Translator.translate(
          "NO_BANNED_MEMBERS_FOUND",
          this.context.language
        ),
      });
    } else if (
      this.context.bannedGroupMembers.length &&
      this.state.decoratorMessage.length
    ) {
      this.setState({ decoratorMessage: "" });
    }
  }

  unbanMember = (memberToUnBan) => {
    const guid = this.context.item.guid;
    CometChat.unbanGroupMember(guid, memberToUnBan.uid)
      .then((response) => {
        if (response) {
          this.props.actionGenerated(
            enums.ACTIONS["UNBAN_GROUP_MEMBER_SUCCESS"],
            [memberToUnBan]
          );
        } else {
          this.setState({
            errorMessage: Translator.translate(
              "SOMETHING_WRONG",
              this.context.language
            ),
          });
        }
      })
      .catch((error) =>
        this.setState({
          errorMessage: Translator.translate(
            "SOMETHING_WRONG",
            this.context.language
          ),
        })
      );
  };

  updateMembers = (action, member) => {
    switch (action) {
      case enums.ACTIONS["UNBAN_GROUP_MEMBER"]:
        this.unbanMember(member);
        break;
      default:
        break;
    }
  };

  handleScroll = (e) => {
    const bottom =
      Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) ===
      Math.round(e.currentTarget.clientHeight);
    if (bottom) {
      this.props.actionGenerated(enums.ACTIONS["FETCH_BANNED_GROUP_MEMBERS"]);
    }
  };

  render() {
    const membersList = [...this.context.bannedGroupMembers];
    const bannedMembers = membersList.map((member, key) => {
      return (
        <CometChatBanGroupMemberListItem
          key={member.uid}
          member={member}
          loggedinuser={this.props.loggedinuser}
          actionGenerated={this.updateMembers}
        />
      );
    });

    let messageContainer = null;
    if (this.state.decoratorMessage.length !== 0) {
      messageContainer = (
        <Flex
          overflow="hidden"
          w="100%"
          justifyContent="center"
          alignItems="center"
          h="55%"
          className="bannedmembers__decorator-message"
        >
          <Text
            m="0"
            h="30px"
            color={this.context.theme.color.secondary}
            fontSize="20px"
            fontWeight="600"
            className="decorator-message"
          >
            {this.state.decoratorMessage}
          </Text>
        </Flex>
      );
    }

    return (
      <React.Fragment>
        <CometChatBackdrop show={true} clicked={this.props.close} />
        <Box
          minW="350px"
          minH="450px"
          w="40%"
          h="40%"
          overflow="hidden"
          bg={this.context.theme.backgroundColor.white}
          position="fixed"
          left="50%"
          top="50%"
          transform="translate(-50%, -50%)"
          zIndex="1002"
          m="0 auto"
          boxShadow="rgba(20, 20, 20, 0.2) 0 16px 32px, rgba(20, 20, 20, 0.04) 0 0 0 1px"
          borderRadius="12px"
          display="block"
          className="modal__bannedmembers"
          sx={{
            [`@media ${this.context.theme.breakPoints[1]}, ${this.context.theme.breakPoints[2]}`]: {
              w: "100%",
              h: "100%",
            },
          }}
        >
          <Box
            position="absolute"
            w="32px"
            h="32px"
            borderRadius="50%"
            top="16px"
            right="16px"
            bg={this.context.theme.primaryColor}
            cursor="pointer"
            className="modal__close"
            onClick={this.props.close}
            title={Translator.translate("CLOSE", this.context.language)}
            sx={{
              mask: `url(${clearIcon}) center center no-repeat`,
            }}
          />

          <Box p="24px" h="100%" w="100%" className="modal__body">
            <Text
              fontSize="20px"
              mb="8px"
              fontWeight="bold"
              w="100%"
              textAlign={Translator.getDirection(this.context.language) === "rtl" ? "right" : "left"}
              pr={Translator.getDirection(this.context.language) === "rtl" ? "32px" : "0"}
              className="modal__title"
            >
              {Translator.translate("BANNED_MEMBERS", this.context.language)}
            </Text>
            <Text
              fontSize="12px"
              color={this.context.theme.color.red}
              textAlign="center"
              p="8px 0"
              w="100%"
              h="31px"
              className="modal__error"
            >
              {this.state.errorMessage}
            </Text>

            <Flex
              w="100%"
              h="calc(100% - 70px)"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              className="modal__content"
            >
              <Flex
                flexDirection="row"
                justifyContent="flex-start"
                alignItems="center"
                fontWeight="bold"
                p="8px"
                w="100%"
                border={`1px solid ${this.context.theme.borderColor.primary}`}
                className="content__header"
              >
                <Box
                  className="name"
                  sx={{
                    w: "calc(100% - 220px)",
                    [`@media ${this.context.theme.breakPoints[0]}`]: {
                      w: "calc(100% - 185px)",
                    },
                    [`@media ${this.context.theme.breakPoints[1]}`]: {
                      w: "calc(100% - 185px)",
                    },
                    [`@media ${this.context.theme.breakPoints[2]}`]: {
                      w: "calc(100% - 185px)",
                    },
                  }}
                >
                  {Translator.translate("NAME", this.context.language)}
                </Box>
                <Box
                  className="role"
                  sx={{
                    w: "150px",
                    [`@media ${this.context.theme.breakPoints[0]}`]: {
                      w: "115px",
                    },
                    [`@media ${this.context.theme.breakPoints[1]}`]: {
                      w: "115px",
                    },
                    [`@media ${this.context.theme.breakPoints[2]}`]: {
                      w: "115px",
                    },
                  }}
                >
                  {Translator.translate("SCOPE", this.context.language)}
                </Box>
                <Box w="70px" className="unban">
                  {Translator.translate("UNBAN", this.context.language)}
                </Box>
              </Flex>
              {messageContainer}
              <Flex
                flexDirection="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                w="100%"
                h="calc(100% - 33px)"
                overflowY="auto"
                className="content__list"
                onScroll={this.handleScroll}
              >
                {bannedMembers}
              </Flex>
            </Flex>
          </Box>
        </Box>
      </React.Fragment>
    );
  }
}

// Specifies the default values for props:
CometChatBanGroupMemberList.defaultProps = {
  theme: theme,
};

CometChatBanGroupMemberList.propTypes = {
  theme: PropTypes.object,
};

export { CometChatBanGroupMemberList };
