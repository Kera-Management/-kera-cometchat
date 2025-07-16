import React from "react";
import { Box, Flex, Text, Input, Button } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { CometChat } from "@cometchat-pro/chat";

import { AddMembersManager } from "./controller";

import { CometChatAddGroupMemberListItem } from "..";
import { CometChatBackdrop } from "../../Shared";

import { CometChatContext } from "../../../util/CometChatContext";
import * as enums from "../../../util/enums.js";

import Translator from "../../../resources/localization/translator";
import { theme } from "../../../resources/theme";

import addingIcon from "./resources/adding.svg";
import searchIcon from "./resources/search.svg";
import clearIcon from "./resources/close.svg";

class CometChatAddGroupMemberList extends React.Component {
  static contextType = CometChatContext;

  constructor(props, context) {
    super(props, context);

    this.state = {
      userlist: [],
      membersToAdd: [],
      filteredlist: [],
      addingMembers: false,
      decoratorMessage: Translator.translate("LOADING", context.language),
      errorMessage: "",
    };
  }

  componentDidMount() {
    this.AddMembersManager = new AddMembersManager(this.context);
    this.AddMembersManager.initializeMembersRequest().then(() => {
      this.getUsers();
      this.AddMembersManager.attachListeners(this.userUpdated);
    });
  }

  componentWillUnmount() {
    this.AddMembersManager.removeListeners();
    this.AddMembersManager = null;
  }

  userUpdated = (user) => {
    let userlist = [...this.state.userlist];

    //search for user
    let userKey = userlist.findIndex((u, k) => u.uid === user.uid);

    //if found in the list, update user object
    if (userKey > -1) {
      let userObj = userlist[userKey];
      let newUserObj = Object.assign({}, userObj, user);
      userlist.splice(userKey, 1, newUserObj);

      this.setState({ userlist: userlist });
    }
  };

  handleScroll = (e) => {
    const bottom =
      Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) ===
      Math.round(e.currentTarget.clientHeight);
    if (bottom) this.getUsers();
  };

  searchUsers = (e) => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    let val = e.target.value;

    this.AddMembersManager = new AddMembersManager(this.context, val);
    this.AddMembersManager.initializeMembersRequest().then(() => {
      this.timeout = setTimeout(() => {
        this.setState(
          {
            userlist: [],
            membersToAdd: [],
            membersToRemove: [],
            filteredlist: [],
            decoratorMessage: Translator.translate(
              "LOADING",
              this.context.language
            ),
          },
          () => this.getUsers()
        );
      }, 500);
    });
  };

  getUsers = () => {
    this.AddMembersManager.fetchNextUsers()
      .then((userList) => {
        const filteredUserList = userList.filter((user) => {
          const found = this.context.groupMembers.find(
            (member) => user.uid === member.uid
          );
          const foundbanned = this.context.bannedGroupMembers.find(
            (member) => user.uid === member.uid
          );
          if (found || foundbanned) {
            return false;
          }
          return true;
        });

        if (filteredUserList.length === 0) {
          this.setState({
            decoratorMessage: Translator.translate(
              "NO_USERS_FOUND",
              this.context.language
            ),
          });
        }

        this.setState({
          userlist: [...this.state.userlist, ...userList],
          filteredlist: [...this.state.filteredlist, ...filteredUserList],
        });
      })
      .catch((error) =>
        this.setState({
          decoratorMessage: Translator.translate(
            "SOMETHING_WRONG",
            this.context.language
          ),
        })
      );
  };

  membersUpdated = (user, userState) => {
    if (userState) {
      const members = [...this.state.membersToAdd];
      members.push(user);
      this.setState({ membersToAdd: [...members] });
    } else {
      const membersToAdd = [...this.state.membersToAdd];
      const IndexFound = membersToAdd.findIndex(
        (member) => member.uid === user.uid
      );
      if (IndexFound > -1) {
        membersToAdd.splice(IndexFound, 1);
        this.setState({ membersToAdd: [...membersToAdd] });
      }
    }
  };

  updateMembers = () => {
    const guid = this.context.item.guid;
    const membersList = [];

    this.state.membersToAdd.forEach((newmember) => {
      //if a selected member is already part of the member list, don't add
      const IndexFound = this.context.groupMembers.findIndex(
        (member) => member.uid === newmember.uid
      );
      if (IndexFound === -1) {
        const newMember = new CometChat.GroupMember(
          newmember.uid,
          CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT
        );
        membersList.push(newMember);

        newmember["type"] = "add";
      }
    });

    if (membersList.length) {
      this.setState({ addingMembers: true });

      const membersToAdd = [];
      CometChat.addMembersToGroup(guid, membersList, [])
        .then((response) => {
          if (Object.keys(response).length) {
            for (const member in response) {
              if (response[member] === "success") {
                const found = this.state.userlist.find(
                  (user) => user.uid === member
                );
                found["scope"] = CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT;
                membersToAdd.push(found);
              }
            }

            this.props.actionGenerated(
              enums.ACTIONS["ADD_GROUP_MEMBER_SUCCESS"],
              membersToAdd
            );
          }
          this.setState({ addingMembers: false });
          this.props.close();
        })
        .catch((error) => {
          this.setState({
            addingMembers: false,
            errorMessage: Translator.translate(
              "SOMETHING_WRONG",
              this.context.language
            ),
          });
        });
    }
  };

  render() {
    const createText = this.state.addingMembers
      ? Translator.translate("ADDING", this.context.language)
      : Translator.translate("ADD", this.context.language);
    let addGroupMemberBtn = (
      <Box
        m="24px auto 0 auto"
        className="modal__addmembers"
      >
        <Button
          cursor="pointer"
          p="8px 16px"
          bg={this.context.theme.primaryColor}
          borderRadius="5px"
          color="white"
          fontSize="14px"
          outline="0"
          border="0"
          isDisabled={this.state.addingMembers}
          onClick={this.updateMembers}
          sx={{
            background: this.state.addingMembers
              ? `url(${addingIcon}) ${this.context.theme.primaryColor} no-repeat right 10px center`
              : this.context.theme.primaryColor,
          }}
        >
          <Text mr={this.state.addingMembers ? "24px" : "0"}>
            {createText}
          </Text>
        </Button>
      </Box>
    );

    let messageContainer = null;
    if (this.state.filteredlist.length === 0) {
      messageContainer = (
        <Flex
          overflow="hidden"
          w="100%"
          justifyContent="center"
          alignItems="center"
          h="55%"
          className="members__decorator-message"
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
      addGroupMemberBtn = null;
    }

    let currentLetter = "";
    const filteredUserList = [...this.state.filteredlist];
    const users = filteredUserList.map((user) => {
      const chr = user.name[0].toUpperCase();
      let firstLetter = null;
      if (chr !== currentLetter) {
        currentLetter = chr;
        firstLetter = currentLetter;
      }

      return (
        <React.Fragment key={user.uid}>
          <CometChatAddGroupMemberListItem
            theme={this.props.theme}
            firstLetter={firstLetter}
            user={user}
            changed={this.membersUpdated}
          />
        </React.Fragment>
      );
    });

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
          className="modal__addmembers"
          sx={{
            [`@media ${this.context.theme.breakPoints[0]}`]: {
              w: "100%",
              h: "100%",
            },
            [`@media ${this.context.theme.breakPoints[1]}`]: {
              w: "100%",
              h: "100%",
            },
            [`@media ${this.context.theme.breakPoints[2]}`]: {
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
          <Flex
            p="24px"
            h="100%"
            w="100%"
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-start"
            className="modal__body"
          >
            <Text
              fontSize="20px"
              mb="16px"
              fontWeight="bold"
              w="100%"
              textAlign={Translator.getDirection(this.context.language) === "rtl" ? "right" : "left"}
              pr={Translator.getDirection(this.context.language) === "rtl" ? "32px" : "0"}
              className="modal__title"
            >
              {Translator.translate("USERS", this.context.language)}
            </Text>
            <Text
              fontSize="12px"
              color={this.context.theme.color.red}
              textAlign="center"
              m="8px 0"
              w="100%"
              className="modal__error"
            >
              {this.state.errorMessage}
            </Text>
            <Box
              fontWeight="normal"
              mb="16px"
              w="100%"
              h="35px"
              borderRadius="8px"
              boxShadow="rgba(20, 20, 20, 0.04) 0 0 0 1px inset"
              bg="rgba(20, 20, 20, 0.04)"
              display="flex"
              justifyContent="center"
              alignItems="center"
              className="modal__search"
            >
              <Input
                type="text"
                autoComplete="off"
                w="calc(100% - 30px)"
                h="100%"
                p="8px"
                fontSize="15px"
                outline="none"
                border="none"
                bg="transparent"
                className="search__input"
                placeholder={Translator.translate(
                  "SEARCH",
                  this.context.language
                )}
                onChange={this.searchUsers}
              />
            </Box>
            {messageContainer}
            <Flex
              h="calc(100% - 125px)"
              overflowY="auto"
              w="100%"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              className="modal__content"
              onScroll={this.handleScroll}
              sx={{
                [`@media ${this.context.theme.breakPoints[1]}, ${this.context.theme.breakPoints[2]}`]: {
                  h: "100%",
                },
              }}
            >
              {users}
            </Flex>
            {addGroupMemberBtn}
          </Flex>
        </Box>
      </React.Fragment>
    );
  }
}

// Specifies the default values for props:
CometChatAddGroupMemberList.defaultProps = {
  theme: theme,
};

CometChatAddGroupMemberList.propTypes = {
  theme: PropTypes.object,
};

export { CometChatAddGroupMemberList };
