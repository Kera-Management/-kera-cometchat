import React from "react";
import { Box, Flex, Heading, Input, Text, IconButton } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { CometChat } from "@cometchat-pro/chat";

import { GroupListManager } from "./controller";

import { CometChatCreateGroup, CometChatGroupListItem } from "..";
import { CometChatToastNotification } from "../../Shared";

import {
  CometChatContextProvider,
  CometChatContext,
} from "../../../util/CometChatContext";
import * as enums from "../../../util/enums.js";

import { theme } from "../../../resources/theme";
import Translator from "../../../resources/localization/translator";


import searchIcon from "./resources/search.svg";
import navigateIcon from "./resources/back.svg";
import addIcon from "./resources/create.svg";

class CometChatGroupList extends React.PureComponent {
  item;
  timeout;
  loggedInUser = null;

  static contextType = CometChatContext;

  constructor(props) {
    super(props);

    this.state = {
      grouplist: [],
      createGroup: false,
      enableSearchGroup: false,
      enableCreateGroup: false,
      enableJoinGroup: false,
      decoratorMessage: Translator.translate("LOADING", props.lang),
    };

    this.contextProviderRef = React.createRef();
    this.groupListRef = React.createRef();
    this.toastRef = React.createRef();

    CometChat.getLoggedinUser()
      .then((user) => (this.loggedInUser = user))
      .catch((error) =>
        this.setState({
          decoratorMessage: Translator.translate("SOMETHING_WRONG", props.lang),
        })
      );
  }

  componentDidMount() {
    this.item =
      this.getContext().type === CometChat.ACTION_TYPE.TYPE_GROUP
        ? this.getContext().item
        : null;
    this.enableSearchGroup();
    this.enableCreateGroup();
    this.enableJoinGroup();

    this.GroupListManager = new GroupListManager();
    this.getGroups();
    this.GroupListManager.attachListeners(this.groupUpdated);
  }

  componentDidUpdate(prevProps) {
    //if group detail(membersCount) is updated, update grouplist
    if (
      this.item &&
      Object.keys(this.item).length &&
      this.getContext().type === CometChat.ACTION_TYPE.TYPE_GROUP &&
      this.item.guid === this.getContext().item.guid &&
      this.item.membersCount !== this.getContext().item.membersCount
    ) {
      const groups = [...this.state.grouplist];

      let groupKey = groups.findIndex(
        (group) => group.guid === this.getContext().item.guid
      );
      if (groupKey > -1) {
        const groupObj = groups[groupKey];
        let newGroupObj = Object.assign({}, groupObj, {
          membersCount: this.getContext().item.membersCount,
        });

        groups.splice(groupKey, 1, newGroupObj);
        this.setState({ grouplist: groups });
      }
    }

    //upon user deleting a group, remove group from group list
    if (this.getContext().deletedGroupId.trim().length) {
      const guid = this.getContext().deletedGroupId.trim();

      const groups = [...this.state.grouplist];
      const groupKey = groups.findIndex((group) => group.guid === guid);

      if (groupKey > -1) {
        groups.splice(groupKey, 1);
        this.setState({ grouplist: groups });
      }
    }

    if (this.getContext().leftGroupId.trim().length) {
      const guid = this.getContext().leftGroupId.trim();
      const groups = [...this.state.grouplist];
      const groupKey = groups.findIndex((group) => group.guid === guid);
      if (groupKey > -1) {
        const groupObj = groups[groupKey];
        const membersCount = Number(groupObj.membersCount)
          ? Number(groupObj.membersCount) - 1
          : 0;
        let newGroupObj = Object.assign({}, groupObj, {
          membersCount,
          hasJoined: false,
        });
        groups.splice(groupKey, 1, newGroupObj);
        this.setState({ grouplist: groups });
      }
    }

    this.item =
      this.getContext().type === CometChat.ACTION_TYPE.TYPE_GROUP
        ? this.getContext().item
        : null;
    this.enableSearchGroup();
    this.enableCreateGroup();
    this.enableJoinGroup();
  }

  componentWillUnmount() {
    this.GroupListManager = null;
  }

  /**
   * if search group feature is disabled
   */
  enableSearchGroup = () => {
    this.getContext()
      .FeatureRestriction.isGroupSearchEnabled()
      .then((response) => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableSearchGroup) {
          this.setState({ enableSearchGroup: response });
        }
      })
      .catch((error) => {
        if (this.state.enableSearchGroup !== false) {
          this.setState({ enableSearchGroup: false });
        }
      });
  };

  /**
   * if create group feature is disabled
   */
  enableCreateGroup = () => {
    this.getContext()
      .FeatureRestriction.isGroupCreationEnabled()
      .then((response) => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableCreateGroup) {
          this.setState({ enableCreateGroup: response });
        }
      })
      .catch((error) => {
        if (this.state.enableCreateGroup !== false) {
          this.setState({ enableCreateGroup: false });
        }
      });
  };

  /**
   * if join group feature is disabled
   */
  enableJoinGroup = () => {
    this.getContext()
      .FeatureRestriction.isJoinLeaveGroupsEnabled()
      .then((response) => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableJoinGroup) {
          this.setState({ enableJoinGroup: response });
        }
      })
      .catch((error) => {
        if (this.state.enableJoinGroup !== false) {
          this.setState({ enableJoinGroup: false });
        }
      });
  };

  groupUpdated = (key, message, group, options) => {
    switch (key) {
      case enums.GROUP_MEMBER_SCOPE_CHANGED:
        this.updateMemberChanged(group, options);
        break;
      case enums.GROUP_MEMBER_KICKED:
      case enums.GROUP_MEMBER_BANNED:
      case enums.GROUP_MEMBER_LEFT:
        this.updateMemberRemoved(group, options);
        break;
      case enums.GROUP_MEMBER_ADDED:
      case enums.GROUP_MEMBER_JOINED:
        this.updateMemberAddition(group, options);
        break;
      default:
        break;
    }
  };

  updateMemberRemoved = (group, options) => {
    let grouplist = [...this.state.grouplist];

    //search for group
    let groupKey = grouplist.findIndex((g) => g.guid === group.guid);

    if (groupKey > -1) {
      if (options && this.loggedInUser.uid === options.user.uid) {
        let groupObj = { ...grouplist[groupKey] };
        let membersCount = parseInt(group.membersCount);
        let hasJoined = group.hasJoined;

        let newgroupObj = Object.assign({}, groupObj, {
          membersCount: membersCount,
          hasJoined: hasJoined,
        });

        grouplist.splice(groupKey, 1, newgroupObj);
        this.setState({ grouplist: grouplist });
      } else {
        let groupObj = { ...grouplist[groupKey] };
        let membersCount = parseInt(group.membersCount);

        let newgroupObj = Object.assign({}, groupObj, {
          membersCount: membersCount,
        });

        grouplist.splice(groupKey, 1, newgroupObj);
        this.setState({ grouplist: grouplist });
      }
    }
  };

  // Callback for when group member is added or joined
  updateMemberAddition = (group, options) => {
    let grouplist = [...this.state.grouplist];

    //search for group
    let groupKey = grouplist.findIndex((g) => g.guid === group.guid);

    if (groupKey > -1) {
      if (options && this.loggedInUser.uid === options.user.uid) {
        let groupObj = { ...grouplist[groupKey] };
        let hasJoined = true;
        let newgroupObj = Object.assign({}, groupObj, { hasJoined: hasJoined });

        grouplist.splice(groupKey, 1, newgroupObj);
        this.setState({ grouplist: grouplist });
      } else {
        let groupObj = { ...grouplist[groupKey] };
        let membersCount = parseInt(groupObj.membersCount);

        let newgroupObj = Object.assign({}, groupObj, {
          membersCount: membersCount,
        });
        grouplist.splice(groupKey, 1, newgroupObj);
        this.setState({ grouplist: grouplist });
      }
    }
  };

  updateMemberChanged = (group, options) => {
    let grouplist = [...this.state.grouplist];

    //search for group
    let groupKey = grouplist.findIndex((g) => g.guid === group.guid);

    if (groupKey > -1) {
      let groupObj = { ...grouplist[groupKey] };
      if (options && this.loggedInUser.uid === options.user.uid) {
        let newgroupObj = Object.assign({}, groupObj, { scope: options.scope });

        grouplist.splice(groupKey, 1, newgroupObj);
        this.setState({ grouplist: grouplist });
      }
    }
  };

  handleScroll = (e) => {
    const bottom =
      Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) ===
      Math.round(e.currentTarget.clientHeight);
    if (bottom) this.getGroups();
  };

  handleClick = (group) => {
    if (!this.props.onItemClick) return;

    if (group.hasJoined === false) {
      //if join group feature is disabled
      if (this.state.enableJoinGroup === false) {
        return false;
      }

      let password = "";
      if (group.type === CometChat.GROUP_TYPE.PASSWORD) {
        password = prompt(
          Translator.translate("ENTER_YOUR_PASSWORD", this.props.lang)
        );
      }

      const guid = group.guid;
      const groupType = group.type;

      CometChat.joinGroup(guid, groupType, password)
        .then((response) => {
          if (typeof response === "object" && Object.keys(response).length) {
            const groups = [...this.state.grouplist];

            let groupKey = groups.findIndex((g, k) => g.guid === guid);
            if (groupKey > -1) {
              const groupObj = groups[groupKey];
              const newGroupObj = Object.assign({}, groupObj, response, {
                scope: CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT,
              });

              groups.splice(groupKey, 1, newGroupObj);
              this.setState({ grouplist: groups });

              this.props.onItemClick(
                newGroupObj,
                CometChat.ACTION_TYPE.TYPE_GROUP
              );
            }
          } else {
            this.toastRef.setError("SOMETHING_WRONG");
          }
        })
        .catch((error) => {
          if (
            error.hasOwnProperty("code") &&
            error.code &&
            error.code === "ERR_WRONG_GROUP_PASS"
          ) {
            this.toastRef.setError("WRONG_PASSWORD");
          } else {
            this.toastRef.setError("SOMETHING_WRONG");
          }
        });
    } else {
      this.props.onItemClick(group, CometChat.ACTION_TYPE.TYPE_GROUP);
    }
  };

  handleMenuClose = () => {
    if (!this.props.actionGenerated) {
      return false;
    }

    this.props.actionGenerated(enums.ACTIONS["TOGGLE_SIDEBAR"]);
  };

  searchGroup = (e) => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    let val = e.target.value;
    this.timeout = setTimeout(() => {
      this.setState({
        grouplist: [],
        decoratorMessage: Translator.translate("LOADING", this.props.lang),
      });

      this.GroupListManager = new GroupListManager(val);
      this.getGroups();
    }, 500);
  };

  getGroups = () => {
    this.GroupListManager.fetchNextGroups()
      .then((groupList) => {
        if (groupList.length === 0) {
          if (this.state.grouplist.length === 0) {
            this.setState({
              decoratorMessage: Translator.translate(
                "NO_GROUPS_FOUND",
                this.props.lang
              ),
            });
          }
        } else {
          this.setState({
            grouplist: [...this.state.grouplist, ...groupList],
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

  createGroupHandler = (flag) => {
    this.setState({ createGroup: flag });
  };

  createGroupActionHandler = (action, group) => {
    if (action === enums.ACTIONS["GROUP_CREATED"]) {
      this.handleClick(group);

      const groupList = [...this.state.grouplist];
      groupList.unshift(group);

      this.setState({ grouplist: groupList, createGroup: false });
    }
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
          className="groups__decorator-message"
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

    const groups = this.state.grouplist.map((group) => {
      let selectedGroup =
        this.getContext().type === CometChat.ACTION_TYPE.TYPE_GROUP &&
        this.getContext().item.guid === group.guid
          ? group
          : null;

      return (
        <CometChatGroupListItem
          key={group.guid}
          group={group}
          selectedGroup={selectedGroup}
          clickHandler={this.handleClick}
        />
      );
    });

    let createGroupBtn = (
      <IconButton
        aria-label={Translator.translate("CREATE_GROUP", this.props.lang)}
        title={Translator.translate("CREATE_GROUP", this.props.lang)}
        onClick={() => this.createGroupHandler(true)}
        height="24px"
        width="24px"
        minWidth="24px"
        cursor="pointer"
        background="none"
        _hover={{ background: "none" }}
        sx={{
          "& > *": {
            display: "inline-block",
            width: "24px",
            height: "24px",
            mask: `url(${addIcon}) center center no-repeat`,
            backgroundColor: theme.primaryColor,
          },
        }}
      >
        <Box />
      </IconButton>
    );

    //if create group feature is disabled
    if (this.state.enableCreateGroup === false) {
      createGroupBtn = null;
    }

    let closeBtn = (
      <Box
        className="header__close"
        cursor="pointer"
        display="none"
        sx={{
          mask: `url(${navigateIcon}) left center no-repeat`,
          backgroundColor: theme.primaryColor,
          [theme.breakPoints[0]]: {
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

    let searchGroup = null;
    if (this.state.enableSearchGroup) {
      searchGroup = (
        <Box
          className="groups__search"
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
            onChange={this.searchGroup}
            width="calc(100% - 30px)"
            height="100%"
            p={2}
            fontSize="15px"
            fontWeight="400"
            lineHeight="20px"
            outline="none"
            border="none"
            color={this.props.theme.color.search}
            backgroundColor="transparent"
          />
        </Box>
      );
    }

    let createGroup = null;
    if (this.state.createGroup) {
      createGroup = (
        <CometChatCreateGroup
          theme={this.props.theme}
          close={() => this.createGroupHandler(false)}
          actionGenerated={this.createGroupActionHandler}
        />
      );
    }

    const groupListTemplate = (
      <React.Fragment>
        <Box
          className="groups"
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
            className="groups__header"
            p={4}
            position="relative"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`1px solid ${theme.borderColor.primary}`}
            height="70px"
          >
            {closeBtn}
            <Heading
              className="header__title"
              as="h4"
              m={0}
              display="inline-block"
              width="100%"
              textAlign="left"
              fontSize="22px"
              fontWeight="700"
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
              {Translator.translate("GROUPS", this.props.lang)}
            </Heading>
            {createGroupBtn}
          </Flex>
          {searchGroup}
          {messageContainer}
          <Box
            className="groups__list"
            height="calc(100% - 125px)"
            overflowY="auto"
            m={0}
            p={0}
            onScroll={this.handleScroll}
            ref={(el) => (this.groupListRef = el)}
          >
            {groups}
          </Box>
        </Box>
        {createGroup}
        <CometChatToastNotification
          ref={(el) => (this.toastRef = el)}
          lang={this.props.lang}
        />
      </React.Fragment>
    );

    let groupListWrapper = groupListTemplate;
    //if used as a standalone component, add errorboundary and context provider
    if (this.props._parent === "") {
      groupListWrapper = (
        <CometChatContextProvider ref={(el) => (this.contextProviderRef = el)}>
          {groupListTemplate}
        </CometChatContextProvider>
      );
    }

    return groupListWrapper;
  }
}

// Specifies the default values for props:
CometChatGroupList.defaultProps = {
  lang: Translator.getDefaultLanguage(),
  theme: theme,
  onItemClick: () => {},
  _parent: "",
};

CometChatGroupList.propTypes = {
  lang: PropTypes.string,
  theme: PropTypes.object,
  onItemClick: PropTypes.func,
  _parent: PropTypes.string,
};

export { CometChatGroupList };
