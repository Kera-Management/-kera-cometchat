import React from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { CometChat } from "@cometchat-pro/chat";

import { CometChatTransferOwnershipMemberListItem } from "..";
import { CometChatBackdrop } from "../../Shared";

import * as enums from "../../../util/enums.js";
import { CometChatContext } from "../../../util/CometChatContext";

import Translator from "../../../resources/localization/translator";

import clearIcon from "./resources/close.svg";
import transferIcon from "./resources/transferring.svg";

class CometChatTransferOwnershipMemberList extends React.Component {
  static contextType = CometChatContext;

  constructor(props, context) {
    super(props, context);

    this._isMounted = false;
    const chatWindow = context.UIKitSettings.chatWindow;
    this.mq = chatWindow.matchMedia(context.theme.breakPoints[1]);

    let userColumnTitle = Translator.translate("NAME", context.language);
    if (this.mq.matches) {
      userColumnTitle = Translator.translate("AVATAR", context.language);
    }

    this.state = {
      userColumnTitle: userColumnTitle,
      newGroupOwner: null,
      transferringOwnership: false,
      errorMessage: "",
    };
  }

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
      case enums.ACTIONS["CHANGE_OWNERSHIP_GROUP_MEMBER"]:
        this.changeOwnership(member, scope);
        break;
      default:
        break;
    }
  };

  updateGroupOwner = (member) => {
    this.setState({ newGroupOwner: member?.uid });
  };

  transferOwnership = () => {
    const guid = this.context?.item?.guid;
    const uid = this.state.newGroupOwner;

    if (!guid || !uid) {
      return false;
    }

    this.setState({ transferringOwnership: true });
    CometChat.transferGroupOwnership(guid, uid)
      .then((response) => {
        this.setState({ transferringOwnership: false });
        this.props.actionGenerated(enums.ACTIONS["OWNERSHIP_TRANSFERRED"], uid);
      })
      .catch((error) => {
        this.setState({
          transferringOwnership: false,
          errorMessage: Translator.translate(
            "SOMETHING_WRONG",
            this.context.language
          ),
        });
      });
  };

  changeOwnership = () => {};

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
    const memberList = [...this.context.groupMembers];
    const groupMembers = memberList
      .filter((member) => member?.uid !== this.props?.loggedinuser?.uid)
      .map((member) => {
        return (
          <CometChatTransferOwnershipMemberListItem
            loggedinuser={this.props.loggedinuser}
            key={member?.uid}
            checked={this.updateGroupOwner}
            member={member}
            actionGenerated={this.updateMembers}
          />
        );
      });

    let transferBtn = null;
    if (memberList.length) {
      const transferText = this.state.transferringOwnership
        ? Translator.translate("TRANSFERRING", this.context.language)
        : Translator.translate("TRANSFER", this.context.language);
      transferBtn = (
        <Box
          pt="24px"
          textAlign="center"
          className="modal__transferownership"
        >
          <Button
            cursor="pointer"
            p="8px 16px"
            bg={this.context.theme.backgroundColor.blue}
            borderRadius="5px"
            color={this.context.theme.color.white}
            fontSize="14px"
            outline="0"
            border="0"
            isDisabled={!this.state.newGroupOwner || this.state.transferringOwnership}
            onClick={this.transferOwnership}
            sx={{
              background: this.state.transferringOwnership
                ? `url(${transferIcon}) no-repeat right 10px center ${this.context.theme.backgroundColor.blue}`
                : this.context.theme.backgroundColor.blue,
            }}
          >
            <Text mr={this.state.transferringOwnership ? "24px" : "0"}>
              {transferText}
            </Text>
          </Button>
        </Box>
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
          className="modal__groupmembers"
          sx={{
            "@media (min-width : 320px) and (max-width: 767px)": {
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
              {Translator.translate("GROUP_MEMBERS", this.context.language)}
            </Text>
            <Text
              fontSize="12px"
              color={this.context.theme.color.red}
              textAlign="center"
              p="8px 0"
              h="31px"
              w="100%"
              className="modal__error"
            >
              {this.state.errorMessage}
            </Text>
            <Flex
              w="100%"
              h="calc(100% - 120px)"
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
                    w: "calc(100% - 180px)",
                    [`@media ${this.context.theme.breakPoints[1]}`]: {
                      w: "calc(100% - 140px)",
                    },
                    [`@media ${this.context.theme.breakPoints[2]}`]: {
                      w: "calc(100% - 180px)",
                    },
                    [`@media ${this.context.theme.breakPoints[3]}`]: {
                      w: "calc(100% - 120px)",
                    },
                  }}
                >
                  {this.state.userColumnTitle}
                </Box>
                <Box
                  className="scope"
                  sx={{
                    w: "180px",
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
              </Flex>
              <Flex
                flexDirection="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                w="100%"
                h="calc(100% - 100px)"
                overflowY="auto"
                className="content__list"
                onScroll={this.handleScroll}
              >
                {groupMembers}
              </Flex>
            </Flex>
            {transferBtn}
          </Box>
        </Box>
      </React.Fragment>
    );
  }
}

export { CometChatTransferOwnershipMemberList };
