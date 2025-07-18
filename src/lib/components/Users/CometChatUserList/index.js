import React from "react";
import { Box, Flex, Heading, Input, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { CometChat } from "@cometchat-pro/chat";

import { UserListManager } from "./controller";

import { CometChatUserListItem } from "..";

import {
  CometChatContextProvider,
  CometChatContext,
} from "../../../util/CometChatContext";
import * as enums from "../../../util/enums.js";

import { theme } from "../../../resources/theme";
import Translator from "../../../resources/localization/translator";


import searchIcon from "./resources/search.svg";
import navigateIcon from "./resources/back.svg";

class CometChatUserList extends React.PureComponent {
  item;
  timeout;
  static contextType = CometChatContext;

  constructor(props) {
    super(props);

    this.state = {
      userlist: [],
      enableSearchUser: false,
      decoratorMessage: Translator.translate("LOADING", props.lang),
    };

    this.contextProviderRef = React.createRef();
    this.userListRef = React.createRef();

    CometChat.getLoggedinUser()
      .then((user) => (this.loggedInUser = user))
      .catch((error) =>
        this.setState({
          decoratorMessage: Translator.translate(
            "SOMETHING_WRONG",
            this.props.lang
          ),
        })
      );
  }

  componentDidMount() {
    this.item =
      this.getContext().type === CometChat.ACTION_TYPE.TYPE_USER
        ? this.getContext().item
        : null;
    this.toggleUserSearch();

    this.UserListManager = new UserListManager(this.getContext());
    this.UserListManager.initializeUsersRequest()
      .then((response) => {
        this.getUsers();
        this.UserListManager.attachListeners(this.userUpdated);
      })
      .catch((error) =>
        this.setState({
          decoratorMessage: Translator.translate(
            "SOMETHING_WRONG",
            this.props.lang
          ),
        })
      );
  }

  componentDidUpdate(prevProps) {
    //if user is blocked/unblocked, update userlist
    if (
      this.item &&
      Object.keys(this.item).length &&
      this.getContext().type === CometChat.ACTION_TYPE.TYPE_USER &&
      this.item.uid === this.getContext().item.uid &&
      this.item.blockedByMe !== this.getContext().item.blockedByMe
    ) {
      let userlist = [...this.state.userlist];

      //search for user
      let userKey = userlist.findIndex(
        (u) => u.uid === this.getContext().item.uid
      );
      if (userKey > -1) {
        let userObject = { ...userlist[userKey] };
        let newUserObject = Object.assign({}, userObject, {
          blockedByMe: this.getContext().item.blockedByMe,
        });

        userlist.splice(userKey, 1, newUserObject);
        this.setState({ userlist: userlist });
      }
    }

    this.item =
      this.getContext().type === CometChat.ACTION_TYPE.TYPE_USER
        ? this.getContext().item
        : null;
    this.toggleUserSearch();
  }

  componentWillUnmount() {
    this.UserListManager.removeListeners();
    this.UserListManager = null;
  }

  toggleUserSearch = () => {
    this.getContext()
      .FeatureRestriction.isUserSearchEnabled()
      .then((response) => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableSearchUser) {
          this.setState({ enableSearchUser: response });
        }
      })
      .catch((error) => {
        if (this.state.enableSearchUser !== false) {
          this.setState({ enableSearchUser: false });
        }
      });
  };

  userUpdated = (user) => {
    let userlist = [...this.state.userlist];

    //search for user
    let userKey = userlist.findIndex((u) => u.uid === user.uid);

    //if found in the list, update user object
    if (userKey > -1) {
      let userObj = { ...userlist[userKey] };
      let newUserObj = { ...userObj, ...user };
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

  handleClick = (user) => {
    if (!this.props.onItemClick) return;

    this.props.onItemClick(user, CometChat.ACTION_TYPE.TYPE_USER);
  };

  handleMenuClose = () => {
    if (!this.props.actionGenerated) {
      return false;
    }

    this.props.actionGenerated(enums.ACTIONS["TOGGLE_SIDEBAR"]);
  };

  searchUsers = (e) => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    let val = e.target.value;
    this.UserListManager = new UserListManager(this.getContext(), val);
    this.UserListManager.initializeUsersRequest()
      .then((response) => {
        this.timeout = setTimeout(() => {
          this.setState(
            {
              userlist: [],
              decoratorMessage: Translator.translate(
                "LOADING",
                this.props.lang
              ),
            },
            () => this.getUsers()
          );
        }, 500);
      })
      .catch((error) =>
        this.setState({
          decoratorMessage: Translator.translate(
            "SOMETHING_WRONG",
            this.props.lang
          ),
        })
      );
  };

  getUsers = () => {
    this.UserListManager.fetchNextUsers()
      .then((userList) => {
        if (userList.length === 0) {
          if (this.state.userlist.length === 0) {
            this.setState({
              decoratorMessage: Translator.translate(
                "NO_USERS_FOUND",
                this.props.lang
              ),
            });
          }
        } else {
          this.setState({
            userlist: [...this.state.userlist, ...userList],
            decoratorMessage: "",
          });
        }
      })
      .catch((error) =>
        this.setState({
          decoratorMessage: Translator.translate(
            "SOMETHING_WRONG",
            this.props.lang
          ),
        })
      );
  };

  getContext = () => {
    if (this.props._parent.length) {
      return this.context;
    } else {
      return this.contextProviderRef.state;
    }
  };

  render() {
    let messageContainer = null;
    if (this.state.decoratorMessage.length !== 0) {
      messageContainer = (
        <Box
          className="contacts__decorator-message"
          overflow="hidden"
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="absolute"
          top="50%"
        >
          <Text
            className="decorator-message"
            m={0}
            minHeight="36px"
            color={theme.color.secondary}
            fontSize="20px"
            fontWeight="600"
            lineHeight="30px"
            wordWrap="break-word"
            px={4}
          >
            {this.state.decoratorMessage}
          </Text>
        </Box>
      );
    }

    const userList = [...this.state.userlist];
    let currentLetter = "";

    const users = userList.map((user) => {
      const chr = user.name[0].toUpperCase();
      let firstChar = null;
      if (chr !== currentLetter) {
        currentLetter = chr;
        firstChar = (
          <Box
            className="contacts__list__alphabet-filter"
            px={4}
            my={1}
            width="100%"
            fontSize="12px"
            fontWeight="500"
            lineHeight="20px"
            color={this.props.theme.color.tertiary}
          >
            {currentLetter}
          </Box>
        );
      } else {
        firstChar = null;
      }

      let selectedUser =
        this.getContext().type === CometChat.ACTION_TYPE.TYPE_USER &&
        this.getContext().item.uid === user.uid
          ? user
          : null;

      return (
        <React.Fragment key={user.uid}>
          {firstChar}
          <CometChatUserListItem
            user={user}
            selectedUser={selectedUser}
            clickHandler={this.handleClick}
          />
        </React.Fragment>
      );
    });

    let closeBtn = (
      <Box
        className="header__close"
        cursor="pointer"
        display="none"
        sx={{
          mask: `url(${navigateIcon}) left center no-repeat`,
          backgroundColor: theme.secondaryTextColor,
          [theme.breakPoints[1]]: {
            display: "block !important",
          },
        }}
        height="24px"
        width="33%"
        onClick={this.handleMenuClose}
      />
    );
    if (this.getContext() && Object.keys(this.getContext().item).length === 0) {
      closeBtn = null;
    }

    let searchUser = null;
    if (this.state.enableSearchUser) {
      searchUser = (
        <Box
          className="contacts__search"
          m={4}
          position="relative"
          borderRadius="8px"
          boxShadow="rgba(20, 20, 20, 0.04) 0 0 0 1px inset"
          backgroundColor="rgba(20, 20, 20, 0.04)"
          height="35px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Input
            type="text"
            autoComplete="off"
            className="search__input"
            placeholder={Translator.translate("SEARCH", this.props.lang)}
            onChange={this.searchUsers}
            width="calc(100% - 30px)"
            p={2}
            fontSize="15px"
            fontWeight="400"
            lineHeight="20px"
            outline="none"
            border="none"
            height="100%"
            color={this.props.theme.color.search}
            backgroundColor="transparent"
          />
        </Box>
      );
    }

    const userListTemplate = (
      <Box
        className="contacts"
        display="flex"
        flexDirection="column"
        height="100%"
        boxSizing="border-box"
        sx={{
          ...(this.props._parent === ""
            ? { border: `1px solid ${theme.borderColor.primary}` }
            : {}),
          "*": {
            boxSizing: "border-box",
            "::-webkit-scrollbar": {
              width: "8px",
              height: "4px",
            },
            "::-webkit-scrollbar-track": {
              background: "#ffffff00",
            },
            "::-webkit-scrollbar-thumb": {
              background: "#ccc",
              "&:hover": {
                background: "#aaa",
              },
            },
          },
        }}
      >
        <Flex
          className="contacts__header"
          p={4}
          position="relative"
          alignItems="center"
          borderBottom={`1px solid ${theme.borderColor.primary}`}
          height="70px"
        >
          {closeBtn}
          <Heading
            className="header__title"
            as="h4"
            m={0}
            fontWeight="700"
            display="inline-block"
            width="100%"
            textAlign="left"
            fontSize="22px"
            lineHeight="26px"
            dir={Translator.getDirection(this.props.lang)}
            sx={{
              ...(this.props.hasOwnProperty("enableCloseMenu") &&
              this.props.enableCloseMenu.length > 0
                ? {
                    width: "33%",
                    textAlign: "center",
                  }
                : {}),
              "&[dir=rtl]": {
                textAlign: "right",
              },
            }}
          >
            {Translator.translate("USERS", this.props.lang)}
          </Heading>
          <Box />
        </Flex>
        {searchUser}
        {messageContainer}
        <Box
          className="contacts__list"
          height="calc(100% - 125px)"
          overflowY="auto"
          m={0}
          p={0}
          onScroll={this.handleScroll}
          ref={(el) => (this.userListRef = el)}
        >
          {users}
        </Box>
      </Box>
    );

    let userListWrapper = userListTemplate;
    if (this.props._parent === "") {
      userListWrapper = (
        <CometChatContextProvider ref={(el) => (this.contextProviderRef = el)}>
          {userListTemplate}
        </CometChatContextProvider>
      );
    }

    return userListWrapper;
  }
}

// Specifies the default values for props:
CometChatUserList.defaultProps = {
  lang: Translator.getDefaultLanguage(),
  theme: theme,
  onItemClick: () => {},
  _parent: "",
};

CometChatUserList.propTypes = {
  lang: PropTypes.string,
  theme: PropTypes.object,
  onItemClick: PropTypes.func,
  _parent: PropTypes.string,
};

export { CometChatUserList };
