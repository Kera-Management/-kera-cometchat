import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { CometChat } from "@cometchat-pro/chat";

import { CometChatViewGroupMemberListItem } from "..";
import { CometChatBackdrop } from "../../Shared";

import * as enums from "../../../util/enums.js";
import { CometChatContext } from "../../../util/CometChatContext";

import { theme } from "../../../resources/theme";
import Translator from "../../../resources/localization/translator";

import clearIcon from "./resources/close.svg";

class CometChatViewGroupMemberList extends React.Component {
  static contextType = CometChatContext;

  constructor(props, context) {
    super(props, context);
    this._isMounted = false;
    const chatWindow = context.UIKitSettings.chatWindow;
    this.mq = chatWindow.matchMedia(this.context.theme.breakPoints[1]);

    this.state = {
      userColumnTitle: "",
      errorMessage: "",
    };
  }

  componentDidMount() {
    this.updateUserColumnTitle();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lang !== this.props.lang) {
      this.updateUserColumnTitle();
    }
  }

  updateUserColumnTitle = () => {
    let userColumnTitle = Translator.translate("NAME", this.props.lang);
    if (this.mq.matches) {
      userColumnTitle = Translator.translate("AVATAR", this.props.lang);
    }

    this.setState({ userColumnTitle });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleScroll = (e) => {
    const bottom =
      Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) ===
      Math.round(e.currentTarget.clientHeight);
    if (bottom) {
      this.props.actionGenerated(enums.ACTIONS["FETCH_GROUP_MEMBERS"]);
    }
  };

  updateMembers = (action, member, scope) => {
    switch (action) {
      case enums.ACTIONS["BAN_GROUP_MEMBER"]:
        this.banMember(member);
        break;
      case enums.ACTIONS["KICK_GROUP_MEMBER"]:
        this.kickMember(member);
        break;
      case enums.ACTIONS["CHANGE_SCOPE_GROUP_MEMBER"]:
        this.changeScope(member, scope);
        break;
      default:
        break;
    }
  };

  banMember = (memberToBan) => {
    const guid = this.context.item.guid;
    CometChat.banGroupMember(guid, memberToBan.uid)
      .then((response) => {
        if (response) {
          this.context.setToastMessage("success", "BAN_GROUPMEMBER_SUCCESS");
          this.props.actionGenerated(
            enums.ACTIONS["BAN_GROUPMEMBER_SUCCESS"],
            memberToBan
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

  kickMember = (memberToKick) => {
    const guid = this.context.item.guid;
    CometChat.kickGroupMember(guid, memberToKick.uid)
      .then((response) => {
        if (response) {
          this.props.actionGenerated(
            enums.ACTIONS["KICK_GROUPMEMBER_SUCCESS"],
            memberToKick
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

  changeScope = (member, scope) => {
    const guid = this.context.item.guid;
    CometChat.updateGroupMemberScope(guid, member.uid, scope)
      .then((response) => {
        if (response) {
          this.context.setToastMessage(
            "success",
            "SCOPECHANGE_GROUPMEMBER_SUCCESS"
          );
          const updatedMember = Object.assign({}, member, { scope: scope });
          this.props.actionGenerated(
            enums.ACTIONS["SCOPECHANGE_GROUPMEMBER_SUCCESS"],
            updatedMember
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

  setUserColumnTitle = (editAccess) => {
    if (this._isMounted) {
      if (editAccess !== null && this.mq.matches) {
        this.setState({
          userColumnTitle: Translator.translate(
            "AVATAR",
            this.context.language
          ),
        });
      } else {
        this.setState({
          userColumnTitle: Translator.translate("NAME", this.context.language),
        });
      }
    }
  };

  render() {
    const membersList = [...this.context.groupMembers];

    const groupMembers = membersList.map((member, key) => {
      return (
        <CometChatViewGroupMemberListItem
          loggedinuser={this.props.loggedinuser}
          theme={this.props.theme}
          key={key}
          member={member}
          enableChangeScope={this.props.enableChangeScope}
          enableBanGroupMembers={this.props.enableBanGroupMembers}
          enableKickGroupMembers={this.props.enableKickGroupMembers}
          actionGenerated={this.updateMembers}
        />
      );
    });

    let editAccess = null;
    if (this.context.item.scope !== CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT) {
      editAccess = (
        <React.Fragment>
          <Box
            w="70px"
            className="ban"
            sx={{
              [`@media ${this.context.theme.breakPoints[1]}`]: {
                w: "40px",
              },
              [`@media ${this.context.theme.breakPoints[2]}`]: {
                w: "40px",
              },
            }}
          >
            {Translator.translate("BAN", this.context.language)}
          </Box>
          <Box
            w="70px"
            className="kick"
            sx={{
              [`@media ${this.context.theme.breakPoints[1]}`]: {
                w: "40px",
              },
              [`@media ${this.context.theme.breakPoints[2]}`]: {
                w: "40px",
              },
            }}
          >
            {Translator.translate("KICK", this.context.language)}
          </Box>
        </React.Fragment>
      );

      if (
        this.props.enableKickGroupMembers === false &&
        this.props.enableBanGroupMembers === false
      ) {
        editAccess = null;
      }
    }

    this.mq.addListener((editAccess) => this.setUserColumnTitle(editAccess));

    return (
      <React.Fragment>
        <CometChatBackdrop show={true} clicked={this.props.close} />
        <Box
          minW="350px"
          minH="450px"
          w="50%"
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
          className="modal__viewmembers"
          sx={{
            [`@media ${this.context.theme.breakPoints[1]}`]: {
              w: "100%",
              h: "100%",
            },
            [`@media ${this.context.theme.breakPoints[2]}`]: {
              w: "100%",
              h: "100%",
            },
            [`@media ${this.context.theme.breakPoints[3]}`]: {
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
              mb="16px"
              fontWeight="bold"
              w="100%"
              textAlign={Translator.getDirection(this.context.language) === "rtl" ? "right" : "left"}
              pr={Translator.getDirection(this.context.language) === "rtl" ? "32px" : "0"}
              className="modal__title"
            >
              {Translator.translate("GROUP_MEMBERS", this.context.language)}
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
                    w: editAccess === null ? "calc(100% - 180px)" : "calc(100% - 260px)",
                    [`@media ${this.context.theme.breakPoints[1]}`]: {
                      w: editAccess === null ? "calc(100% - 140px)" : "calc(100% - 220px)",
                    },
                    [`@media ${this.context.theme.breakPoints[2]}`]: {
                      w: editAccess === null ? "calc(100% - 180px)" : "calc(100% - 260px)",
                    },
                    [`@media ${this.context.theme.breakPoints[3]}`]: {
                      w: editAccess === null ? "calc(100% - 180px)" : "calc(100% - 240px)",
                    },
                  }}
                >
                  {this.state.userColumnTitle}
                </Box>
                <Box
                  w="180px"
                  mr="8px"
                  className="scope"
                  sx={{
                    [`@media ${this.context.theme.breakPoints[1]}`]: {
                      w: "140px",
                    },
                    [`@media ${this.context.theme.breakPoints[2]}`]: {
                      w: "180px",
                    },
                    [`@media ${this.context.theme.breakPoints[3]}`]: {
                      w: "120px",
                    },
                  }}
                >
                  {Translator.translate("SCOPE", this.context.language)}
                </Box>
                {editAccess}
              </Flex>
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
                {groupMembers}
              </Flex>
            </Flex>
          </Box>
        </Box>
      </React.Fragment>
    );
  }
}

// Specifies the default values for props:
CometChatViewGroupMemberList.defaultProps = {
  theme: theme,
  userColumnTitle: "",
  enableChangeScope: false,
  enableKickGroupMembers: false,
  enableBanGroupMembers: false,
};

CometChatViewGroupMemberList.propTypes = {
  theme: PropTypes.object,
  userColumnTitle: PropTypes.string,
  enableChangeScope: PropTypes.bool,
  enableKickGroupMembers: PropTypes.bool,
  enableBanGroupMembers: PropTypes.bool,
};

export { CometChatViewGroupMemberList };
