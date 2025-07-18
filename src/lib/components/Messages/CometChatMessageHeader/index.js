import React from "react";
import dateFormat from "dateformat";
import PropTypes from "prop-types";
import { CometChat } from "@cometchat-pro/chat";
import { Info, CaretLeft } from "phosphor-react";
import { Box, Flex, Text, Heading } from "@chakra-ui/react";

import { MessageHeaderManager } from "./controller";

import { CometChatAvatar, CometChatUserPresence } from "../../Shared";

import { CometChatContext } from "../../../util/CometChatContext";
import * as enums from "../../../util/enums.js";

import { theme } from "../../../resources/theme";
import Translator from "../../../resources/localization/translator";

import menuIcon from "./resources/menu.svg";
import audioCallIcon from "./resources/audio-call.svg";
import videoCallIcon from "./resources/video-call.svg";
import detailPaneIcon from "./resources/info.svg";

class CometChatMessageHeader extends React.Component {
  item;
  static contextType = CometChatContext;

  constructor(props) {
    super(props);

    this.state = {
      status: "",
      presence: "offline",
      typing: null,
      enableGroupVoiceCall: false,
      enableGroupVideoCall: false,
      enableOneOnOneVoiceCall: false,
      enableOneOnOneVideoCall: false,
      enableUserPresence: false,
      enableAddGroupMembers: false,
      enableChangeScope: false,
      enableKickGroupMembers: false,
      enableBanGroupMembers: false,
      enableDeleteGroup: false,
      enableViewGroupMembers: false,
      enableLeaveGroup: false,
      enableSharedMedia: false,
      enableBlockUser: false,
      enableTypingIndicator: false,
    };
  }

  componentDidMount() {
    CometChat.getLoggedinUser()
      .then((user) => (this.loggedInUser = user))
      .catch((error) =>
        this.props.actionGenerated(
          enums.ACTIONS["ERROR"],
          [],
          "SOMETHING_WRONG"
        )
      );

    this.MessageHeaderManager = new MessageHeaderManager();
    this.MessageHeaderManager.attachListeners(this.updateHeader);

    if (this.context.type === CometChat.ACTION_TYPE.TYPE_USER) {
      this.setStatusForUser();
    } else if (this.context.type === CometChat.ACTION_TYPE.TYPE_GROUP) {
      this.setStatusForGroup();
    }

    this.item = this.context.item;

    this.enableGroupVoiceCall();
    this.enableGroupVideoCall();
    this.enableOneOnOneVoiceCall();
    this.enableOneOnOneVideoCall();
    this.enableUserPresence();
    this.enableAddGroupMembers();
    this.enableChangeScope();
    this.enableKickGroupMembers();
    this.enableBanGroupMembers();
    this.enableViewGroupMembers();
    this.enableDeleteGroup();
    this.enableLeaveGroup();
    this.enableSharedMedia();
    this.enableBlockUser();
    this.enableTypingIndicator();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.context.type === CometChat.ACTION_TYPE.TYPE_USER &&
      (this.item !== this.context.item || prevProps.lang !== this.props.lang)
    ) {
      this.setStatusForUser();
    } else if (
      this.context.type === CometChat.ACTION_TYPE.TYPE_GROUP &&
      (this.item !== this.context.item || prevProps.lang !== this.props.lang)
    ) {
      this.setStatusForGroup();
    }

    this.item = this.context.item;

    this.enableGroupVoiceCall();
    this.enableGroupVideoCall();
    this.enableOneOnOneVoiceCall();
    this.enableOneOnOneVideoCall();
    this.enableUserPresence();
    this.enableAddGroupMembers();
    this.enableChangeScope();
    this.enableKickGroupMembers();
    this.enableBanGroupMembers();
    this.enableViewGroupMembers();
    this.enableDeleteGroup();
    this.enableLeaveGroup();
    this.enableSharedMedia();
    this.enableBlockUser();
    this.enableTypingIndicator();
  }

  setStatusForUser = () => {
    let status = "";
    const presence =
      this.context.item.status === CometChat.USER_STATUS.ONLINE
        ? CometChat.USER_STATUS.ONLINE
        : CometChat.USER_STATUS.OFFLINE;

    if (
      this.context.item.status === CometChat.USER_STATUS.OFFLINE &&
      this.context.item.lastActiveAt
    ) {
      const lastActive = this.context.item.lastActiveAt * 1000;
      const messageDate = dateFormat(lastActive, "dS mmm yyyy, h:MM TT");

      status = `${Translator.translate(
        "LAST_ACTIVE_AT",
        this.props.lang
      )}: ${messageDate}`;
    } else if (this.context.item.status === CometChat.USER_STATUS.OFFLINE) {
      status = Translator.translate("OFFLINE", this.props.lang);
    } else if (this.context.item.status === CometChat.USER_STATUS.ONLINE) {
      status = Translator.translate("ONLINE", this.props.lang);
    }

    this.setState({ status: status, presence: presence });
  };

  setStatusForGroup = () => {
    let membersText = Translator.translate("MEMBERS", this.props.lang);
    const status = `${this.context.item.membersCount} ${membersText}`;
    this.setState({ status: status });
  };

  componentWillUnmount() {
    this.MessageHeaderManager.removeListeners();
    this.MessageHeaderManager = null;
  }

  updateHeader = (key, item, groupUser) => {
    switch (key) {
      case enums.USER_ONLINE:
      case enums.USER_OFFLINE: {
        if (
          this.context.type === CometChat.ACTION_TYPE.TYPE_USER &&
          this.context.item.uid === item.uid
        ) {
          //if user presence feature is disabled
          if (this.state.enableUserPresence === false) {
            return false;
          }

          let status = "";
          if (item.status === CometChat.USER_STATUS.OFFLINE) {
            status = Translator.translate("OFFLINE", this.context.language);
          } else if (item.status === CometChat.USER_STATUS.ONLINE) {
            status = Translator.translate("ONLINE", this.context.language);
          }
          this.setState({ status: status, presence: item.status });
        }
        break;
      }
      case enums.GROUP_MEMBER_KICKED:
      case enums.GROUP_MEMBER_BANNED:
      case enums.GROUP_MEMBER_LEFT:
        if (
          this.context.type === CometChat.ACTION_TYPE.TYPE_GROUP &&
          this.context.item.guid === item.guid &&
          this.loggedInUser?.uid !== groupUser?.uid
        ) {
          let membersCount = parseInt(item.membersCount);
          const status = `${membersCount} ${Translator.translate(
            "MEMBERS",
            this.context.language
          )}`;
          this.setState({ status: status });
        }
        break;
      case enums.GROUP_MEMBER_JOINED:
        if (
          this.context.type === CometChat.ACTION_TYPE.TYPE_GROUP &&
          this.context.item.guid === item.guid
        ) {
          let membersCount = parseInt(item.membersCount);
          const status = `${membersCount} ${Translator.translate(
            "MEMBERS",
            this.context.language
          )}`;
          this.setState({ status: status });
        }
        break;
      case enums.GROUP_MEMBER_ADDED:
        if (
          this.context.type === CometChat.ACTION_TYPE.TYPE_GROUP &&
          this.context.item.guid === item.guid
        ) {
          let membersCount = parseInt(item.membersCount);
          const status = `${membersCount} ${Translator.translate(
            "MEMBERS",
            this.context.language
          )}`;
          this.setState({ status: status });
        }
        break;
      case enums.TYPING_STARTED:
        this.onTypingStarted(item);
        break;
      case enums.TYPING_ENDED:
        this.onTypingEnded(item);
        break;
      default:
        break;
    }
  };

  onTypingStarted = (item) => {
    const showTyping = (typingText) => {
      /**
       * if metadata is available, show live reactions else show typing
       */
      // if (item.hasOwnProperty("metadata") && item.metadata && item.metadata.hasOwnProperty("type") && item.metadata.type === enums.CONSTANTS["METADATA_TYPE_LIVEREACTION"]) {
      // 	this.props.actionGenerated(enums.ACTIONS["SHOW_LIVE_REACTION"], item);
      // } else {

      if (this.state.enableTypingIndicator === true) {
        this.setState({ typing: typingText });
      }
      //}
    };

    if (
      this.context.type === CometChat.ACTION_TYPE.TYPE_GROUP &&
      this.context.type === item.receiverType &&
      this.context.item.guid === item.receiverId
    ) {
      const typingText = `${item.sender.name} ${Translator.translate(
        "IS_TYPING",
        this.context.language
      )}`;
      showTyping(typingText);
    } else if (
      this.context.type === CometChat.ACTION_TYPE.TYPE_USER &&
      this.context.type === item.receiverType &&
      this.context.item.uid === item.sender.uid
    ) {
      const typingText = `${Translator.translate(
        "TYPING",
        this.context.language
      )}`;
      showTyping(typingText);
    }
  };

  onTypingEnded = (item) => {
    const endTyping = () => {
      /**
       * if metadata is available, end live reactions else end typing
       */
      // if (item.hasOwnProperty("metadata") && item.metadata && item.metadata.hasOwnProperty("type") && item.metadata.type === enums.CONSTANTS["METADATA_TYPE_LIVEREACTION"]) {
      // 	this.props.actionGenerated(enums.ACTIONS["STOP_LIVE_REACTION"], item);
      // } else {

      if (this.state.enableTypingIndicator === true) {
        this.setState({ typing: null });
      }
      //}
    };

    if (
      this.context.type === CometChat.ACTION_TYPE.TYPE_GROUP &&
      this.context.type === item.receiverType &&
      this.context.item.guid === item.receiverId
    ) {
      this.setStatusForGroup();
      endTyping();
    } else if (
      this.context.type === CometChat.ACTION_TYPE.TYPE_USER &&
      this.context.type === item.receiverType &&
      this.context.item.uid === item.sender.uid
    ) {
      if (this.state.presence === CometChat.USER_STATUS.ONLINE) {
        this.setState({
          status: Translator.translate("ONLINE", this.context.language),
          presence: CometChat.USER_STATUS.ONLINE,
        });
      } else {
        this.setStatusForUser();
      }

      endTyping();
    }
  };

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

  resetChat = () => {
    this.context.setItem({});
    this.props.actionGenerated(enums.ACTIONS["TOGGLE_SIDEBAR"]);
  };

  /**
   * if typing indicator feature is disabled
   */
  enableTypingIndicator = () => {
    this.context.FeatureRestriction.isTypingIndicatorsEnabled()
      .then((response) => {
        if (response !== this.state.enableTypingIndicator) {
          this.setState({ enableTypingIndicator: response });
        }
      })
      .catch((error) => {
        if (this.state.enableTypingIndicator !== false) {
          this.setState({ enableTypingIndicator: false });
        }
      });
  };

  enableGroupVoiceCall = () => {};

  enableGroupVideoCall = () => {
    this.context.FeatureRestriction.isGroupVideoCallEnabled()
      .then((response) => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableGroupVideoCall) {
          this.setState({ enableGroupVideoCall: response });
        }
      })
      .catch((error) => {
        if (this.state.enableGroupVideoCall !== false) {
          this.setState({ enableGroupVideoCall: false });
        }
      });
  };

  enableOneOnOneVoiceCall = () => {
    this.context.FeatureRestriction.isOneOnOneAudioCallEnabled()
      .then((response) => {
        /**
         * Don't update state if the response has the same value
         */
        const combinedResponse = response && !this.context.item.blockedByMe;
        if (combinedResponse !== this.state.enableOneOnOneVoiceCall) {
          this.setState({ enableOneOnOneVoiceCall: combinedResponse });
        }
      })
      .catch((error) => {
        if (this.state.enableOneOnOneVoiceCall !== false) {
          this.setState({ enableOneOnOneVoiceCall: false });
        }
      });
  };

  enableOneOnOneVideoCall = () => {
    this.context.FeatureRestriction.isOneOnOneVideoCallEnabled()
      .then((response) => {
        /**
         * Don't update state if the response has the same value
         */
        const combinedResponse = response && !this.context.item.blockedByMe;
        if (combinedResponse !== this.state.enableOneOnOneVideoCall) {
          this.setState({ enableOneOnOneVideoCall: combinedResponse });
        }
      })
      .catch((error) => {
        if (this.state.enableOneOnOneVideoCall !== false) {
          this.setState({ enableOneOnOneVideoCall: false });
        }
      });
  };

  enableUserPresence = () => {
    this.context.FeatureRestriction.isUserPresenceEnabled()
      .then((response) => {
        if (response !== this.state.enableUserPresence) {
          this.setState({ enableUserPresence: response });
        }
      })
      .catch((error) => {
        if (this.state.enableUserPresence !== false) {
          this.setState({ enableUserPresence: false });
        }
      });
  };

  enableAddGroupMembers = () => {
    this.context.FeatureRestriction.isAddingGroupMembersEnabled()
      .then((response) => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableAddGroupMembers) {
          this.setState({ enableAddGroupMembers: response });
        }
      })
      .catch((error) => {
        if (this.state.enableAddGroupMembers !== false) {
          this.setState({ enableAddGroupMembers: false });
        }
      });
  };

  enableChangeScope = () => {
    this.context.FeatureRestriction.isChangingGroupMemberScopeEnabled()
      .then((response) => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableChangeScope) {
          this.setState({ enableChangeScope: response });
        }
      })
      .catch((error) => {
        if (this.state.enableChangeScope !== false) {
          this.setState({ enableChangeScope: false });
        }
      });
  };

  enableKickGroupMembers = () => {
    this.context.FeatureRestriction.isKickingGroupMembersEnabled()
      .then((response) => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableKickGroupMembers) {
          this.setState({ enableKickGroupMembers: response });
        }
      })
      .catch((error) => {
        if (this.state.enableKickGroupMembers !== false) {
          this.setState({ enableKickGroupMembers: false });
        }
      });
  };

  enableBanGroupMembers = () => {
    this.context.FeatureRestriction.isBanningGroupMembersEnabled()
      .then((response) => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableBanGroupMembers) {
          this.setState({ enableBanGroupMembers: response });
        }
      })
      .catch((error) => {
        if (this.state.enableBanGroupMembers !== false) {
          this.setState({ enableBanGroupMembers: false });
        }
      });
  };

  enableDeleteGroup = () => {
    this.context.FeatureRestriction.isGroupDeletionEnabled()
      .then((response) => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableDeleteGroup) {
          this.setState({ enableDeleteGroup: response });
        }
      })
      .catch((error) => {
        if (this.state.enableDeleteGroup !== false) {
          this.setState({ enableDeleteGroup: false });
        }
      });
  };

  enableViewGroupMembers = () => {
    this.context.FeatureRestriction.isViewingGroupMembersEnabled()
      .then((response) => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableViewGroupMembers) {
          this.setState({ enableViewGroupMembers: response });
        }
      })
      .catch((error) => {
        if (this.state.enableViewGroupMembers !== false) {
          this.setState({ enableViewGroupMembers: false });
        }
      });
  };

  enableLeaveGroup = () => {
    this.context.FeatureRestriction.isJoinLeaveGroupsEnabled()
      .then((response) => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableLeaveGroup) {
          this.setState({ enableLeaveGroup: response });
        }
      })
      .catch((error) => {
        if (this.state.enableLeaveGroup !== false) {
          this.setState({ enableLeaveGroup: false });
        }
      });
  };

  enableSharedMedia = () => {
    this.context.FeatureRestriction.isSharedMediaEnabled()
      .then((response) => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableSharedMedia) {
          this.setState({ enableSharedMedia: response });
        }
      })
      .catch((error) => {
        if (this.state.enableSharedMedia !== false) {
          this.setState({ enableSharedMedia: false });
        }
      });
  };

  enableBlockUser = () => {
    this.context.FeatureRestriction.isBlockUserEnabled()
      .then((response) => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableBlockUser) {
          this.setState({ enableBlockUser: response });
        }
      })
      .catch((error) => {
        if (this.state.enableBlockUser !== false) {
          this.setState({ enableBlockUser: false });
        }
      });
  };

  initiateAudioCall = () => {
    this.props.actionGenerated(enums.ACTIONS["INITIATE_AUDIO_CALL"]);
  };

  initiateVideoCall = () => {
    this.props.actionGenerated(enums.ACTIONS["INITIATE_VIDEO_CALL"]);
  };

  viewDetail = () => {
    this.props.actionGenerated(enums.ACTIONS["VIEW_DETAIL"]);
  };

  render() {
    let avatar, presence;
    let videoCallClassName = "option__videocall-user";
    let audioCallClassName = "option__audiocall-user";
    let viewDetailClassName = "option__viewdetail-user";
    let chatWithClassName = "chat__user";
    let chatNameClassName = "user__name";
    let chatStatusClassName = "user__status";

    if (this.context.type === CometChat.ACTION_TYPE.TYPE_USER) {
      avatar = <CometChatAvatar user={this.context.item} />;
      presence = (
        <CometChatUserPresence
          status={this.state.presence}
          borderColor={this.props.theme.borderColor.primary}
        />
      );
    } else if (this.context.type === CometChat.ACTION_TYPE.TYPE_GROUP) {
      chatWithClassName = "chat__group";
      chatNameClassName = "group__name";
      chatStatusClassName = "group__members";
      videoCallClassName = "option__videocall-group";
      audioCallClassName = "option__audiocall-group";
      viewDetailClassName = "option__viewdetail-group";
      avatar = <CometChatAvatar group={this.context.item} />;
    }

    let typing = null;
    if (this.state.typing) {
      typing = (
        <Text
          fontSize="13px"
          width="100%"
          color={this.context.theme.color.helpText}
          fontStyle="italic"
          className={chatStatusClassName}
        >
          {this.state.typing}
        </Text>
      );
    }

    let status = (
      <Text
        fontSize="13px"
        width="100%"
        color={
          this.context.type === CometChat.ACTION_TYPE.TYPE_USER
            ? this.state.presence === "offline"
              ? this.context.theme.color.helpText
              : this.context.theme.color.blue
            : this.context.theme.color.helpText
        }
        textTransform={
          this.context.type === CometChat.ACTION_TYPE.TYPE_USER
            ? "capitalize"
            : "none"
        }
        className={chatStatusClassName}
      >
        {this.state.status}
      </Text>
    );

    const viewDetailText = Translator.translate(
      "VIEW_DETAIL",
      this.context.language
    );
    let viewDetailBtn = (
      <Box
        className={viewDetailClassName}
        w="24px"
        h="24px"
        cursor="pointer"
        display="flex"
        alignItems="center"
        ml="16px"
        title={viewDetailText}
        onClick={this.viewDetail}
      >
        <Info size={32} weight="duotone" />
      </Box>
    );

    /**
     * If the chat window open is of users and block user and shared media feature is disabled, hide view detail button
     */
    if (this.context.type === CometChat.ACTION_TYPE.TYPE_USER) {
      if (
        this.state.enableBlockUser === false &&
        this.state.enableSharedMedia === false
      ) {
        viewDetailBtn = null;
      }
    } else if (this.context.type === CometChat.ACTION_TYPE.TYPE_GROUP) {
      /**
       * If the chat window open is of group
       */
      if (
        this.context.item?.scope === CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT
      ) {
        /**
         * If the loggedin user scope is participant, leave group, view group members, and shared media feature is disabled, hide view detail button
         */
        if (
          this.state.enableLeaveGroup === false &&
          this.state.enableSharedMedia === false &&
          this.state.enableViewGroupMembers === false
        ) {
          viewDetailBtn = null;
        }
      } else if (
        this.context.item?.scope === CometChat.GROUP_MEMBER_SCOPE.MODERATOR
      ) {
        /**
         * If the loggedin user scope is moderator, leave group, view group members, kick & ban group members, changing scope of group members and shared media feature is disabled, hide view detail button
         */
        if (
          this.state.enableLeaveGroup === false &&
          this.state.enableSharedMedia === false &&
          this.state.enableViewGroupMembers === false &&
          this.state.enableKickGroupMembers === false &&
          this.state.enableBanGroupMembers === false &&
          this.state.enableChangeScope === false
        ) {
          viewDetailBtn = null;
        }
      } else if (
        this.context.item?.scope === CometChat.GROUP_MEMBER_SCOPE.ADMIN
      ) {
        /**
         * If the loggedin user scope is admin, add group members, view group members, kick & ban group members, changing scope of group members, leave and delete group and shared media feature is disabled, hide view detail button
         */
        if (
          this.state.enableLeaveGroup === false &&
          this.state.enableSharedMedia === false &&
          this.state.enableViewGroupMembers === false &&
          this.state.enableKickGroupMembers === false &&
          this.state.enableBanGroupMembers === false &&
          this.state.enableChangeScope === false &&
          this.state.enableDeleteGroup === false &&
          this.state.enableAddGroupMembers === false
        ) {
          viewDetailBtn = null;
        }
      }
    }

    //if user presence is disabled in chat widget
    if (
      this.state.enableUserPresence === false &&
      this.context.type === CometChat.ACTION_TYPE.TYPE_USER
    ) {
      status = null;
    }

    return (
      <Flex
        className="chat__header"
        p="16px"
        w="100%"
        bg={this.context.theme.backgroundColor.white}
        zIndex="1"
        borderBottom={`1px solid ${this.context.theme.borderColor.primary}`}
        justify="space-between"
        align="center"
      >
        <Flex
          className="chat__details"
          align="center"
          width="calc(100% - 116px)"
        >
          <Box
            className="chat__sidebar-menu"
            cursor="pointer"
            display={{ base: "block", md: "none" }}
            sx={{
              mask: `url(${menuIcon}) center center no-repeat`,
              width: "24px",
              height: "24px",
              ...(this.props.hasOwnProperty("sidebar") &&
              this.props.sidebar === 0
                ? { display: "none !important" }
                : {}),
            }}
            onClick={this.resetChat}
          >
            <CaretLeft size={24} weight="duotone" />
          </Box>
          <Box
            className="chat__thumbnail"
            display="inline-block"
            w="36px"
            h="36px"
            flexShrink="0"
            m="0 16px"
            position="relative"
          >
            {avatar}
            {presence}
          </Box>
          <Box
            className={chatWithClassName}
            w={{ base: "calc(100% - 80px)", md: "calc(100% - 50px)" }}
            p="0"
            flexGrow="1"
            display="flex"
            flexDirection="column"
          >
            <Heading
              as="h6"
              className={chatNameClassName}
              m="0"
              fontSize="15px"
              fontWeight="600"
              lineHeight="22px"
              w="100%"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              color={this.context.theme.primary}
              onMouseEnter={(event) => this.toggleTooltip(event, true)}
              onMouseLeave={(event) => this.toggleTooltip(event, false)}
            >
              {this.context.item.name}
            </Heading>
            {typing ? typing : status}
          </Box>
        </Flex>
        <Flex
          className="chat__options"
          justify="space-between"
          align="center"
          w="auto"
        >
          {viewDetailBtn}
        </Flex>
      </Flex>
    );
  }
}

// Specifies the default values for props:
CometChatMessageHeader.defaultProps = {
  theme: theme,
  item: {},
  type: "",
};

CometChatMessageHeader.propTypes = {
  theme: PropTypes.object,
  item: PropTypes.object,
  type: PropTypes.string,
};

export { CometChatMessageHeader };
