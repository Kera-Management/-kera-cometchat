import React from "react";
import dateFormat from "dateformat";
import { Box, Flex, Text, Heading, VStack, HStack } from "@chakra-ui/react";
import PropTypes from "prop-types";

import { CometChat } from "@cometchat-pro/chat";

import { CometChatAvatar, CometChatToastNotification } from "../../Shared";
import { CometChatSharedMediaView } from "../../Shared/CometChatSharedMediaView/index.js";

import { UserDetailManager } from "./controller";

import { CometChatContext } from "../../../util/CometChatContext";
import * as enums from "../../../util/enums.js";

import Translator from "../../../resources/localization/translator";
import { theme } from "../../../resources/theme";

import navigateIcon from "./resources/back.svg";

class CometChatUserDetails extends React.Component {
  static contextType = CometChatContext;

  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      loggedInUser: null,
      status: null,
      enableSharedMedia: false,
      enableBlockUser: false,
      enableViewProfile: false,
      enableUserPresence: false,
    };

    this.toastRef = React.createRef();
  }

  componentDidMount() {
    CometChat.getLoggedinUser()
      .then((user) => {
        if (this._isMounted) {
          this.setState({ loggedInUser: user });
        }
      })
      .catch((error) => this.toastRef.setError("SOMETHING_WRONG"));

    this._isMounted = true;
    this.toastRef = React.createRef();

    this.UserDetailManager = new UserDetailManager();
    this.UserDetailManager.attachListeners(this.updateUser);

    this.setStatusForUser();
    this.enableSharedMedia();
    this.enableBlockUser();
    this.enableViewProfile();
    this.enableUserPresence();
  }

  componentDidUpdate(prevProps) {
    this.enableSharedMedia();
    this.enableBlockUser();
    this.enableViewProfile();
    this.enableUserPresence();

    if (prevProps.lang !== this.props.lang) {
      this.setStatusForUser();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.UserDetailManager.removeListeners();
    this.UserDetailManager = null;
  }

  enableUserPresence = () => {
    this.context.FeatureRestriction.isUserPresenceEnabled()
      .then((response) => {
        if (response !== this.state.enableUserPresence && this._isMounted) {
          this.setState({ enableUserPresence: response });
        }
      })
      .catch((error) => {
        if (this.state.enableUserPresence !== false) {
          this.setState({ enableUserPresence: false });
        }
      });
  };

  updateUser = (key, user) => {
    switch (key) {
      case enums.USER_ONLINE:
      case enums.USER_OFFLINE: {
        if (
          this.context.type === CometChat.ACTION_TYPE.TYPE_USER &&
          this.context.item.uid === user.uid
        ) {
          //if user presence feature is disabled
          if (this.state.enableUserPresence === false) {
            return false;
          }

          let status = "";
          if (user.status === CometChat.USER_STATUS.OFFLINE) {
            status = Translator.translate("OFFLINE", this.props.lang);
          } else if (user.status === CometChat.USER_STATUS.ONLINE) {
            status = Translator.translate("ONLINE", this.props.lang);
          }
          this.setState({ status: status });
        }
        break;
      }
      default:
        break;
    }
  };

  setStatusForUser = () => {
    let status = null;
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

    this.setState({ status: status });
  };

  enableSharedMedia = () => {
    this.context.FeatureRestriction.isSharedMediaEnabled()
      .then((response) => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableSharedMedia && this._isMounted) {
          this.setState({ enableSharedMedia: response });
        }
      })
      .catch((error) => {
        if (this.state.enableSharedMedia !== false && this._isMounted) {
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
        if (response !== this.state.enableBlockUser && this._isMounted) {
          this.setState({ enableBlockUser: response });
        }
      })
      .catch((error) => {
        if (this.state.enableBlockUser !== false && this._isMounted) {
          this.setState({ enableBlockUser: false });
        }
      });
  };

  enableViewProfile = () => {
    this.context.FeatureRestriction.isViewProfileEnabled()
      .then((response) => {
        if (response !== this.state.enableViewProfile && this._isMounted) {
          this.setState({ enableViewProfile: response });
        }
      })
      .catch((error) => {
        if (this.state.enableViewProfile !== false && this._isMounted) {
          this.setState({ enableViewProfile: false });
        }
      });
  };

  blockUser = () => {
    let uid = this.context.item.uid;
    let usersList = [uid];
    CometChat.blockUsers(usersList)
      .then((response) => {
        if (
          response &&
          response.hasOwnProperty(uid) &&
          response[uid].hasOwnProperty("success") &&
          response[uid]["success"] === true
        ) {
          const newType = CometChat.ACTION_TYPE.TYPE_USER;
          const newItem = Object.assign({}, this.context.item, {
            blockedByMe: true,
          });
          this.context.setTypeAndItem(newType, newItem);
        } else {
          this.toastRef.setError("SOMETHING_WRONG");
        }
      })
      .catch((error) => this.toastRef.setError("SOMETHING_WRONG"));
  };

  unblockUser = () => {
    let uid = this.context.item.uid;
    let usersList = [uid];
    CometChat.unblockUsers(usersList)
      .then((response) => {
        if (
          response &&
          response.hasOwnProperty(uid) &&
          response[uid].hasOwnProperty("success") &&
          response[uid]["success"] === true
        ) {
          const newType = CometChat.ACTION_TYPE.TYPE_USER;
          const newItem = Object.assign({}, this.context.item, {
            blockedByMe: false,
          });
          this.context.setTypeAndItem(newType, newItem);
        } else {
          this.toastRef.setError("SOMETHING_WRONG");
        }
      })
      .catch((error) => this.toastRef.setError("SOMETHING_WRONG"));
  };

  viewProfile = () => {
    const profileLink = this.context.item.link;
    window.open(profileLink, "", "fullscreen=yes, scrollbars=auto");
  };

  closeDetailView = () => {
    this.props.actionGenerated(enums.ACTIONS["CLOSE_USER_DETAIL"]);
  };

  render() {
    if (this.state.loggedInUser === null) {
      return null;
    }

    let viewProfile = null;
    if (
      this.state.enableViewProfile === true &&
      this.context.item.hasOwnProperty("link") &&
      this.context.item.link &&
      this.context.item.link.trim().length
    ) {
      viewProfile = (
        <VStack
          margin="0"
          padding="16px 16px 0 16px"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="flex-start"
          className="detailpane__section"
        >
          <Box
            width="100%"
            className="section section__viewprofile"
            sx={{
              "> div": {
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "12px",
              },
              ".item__link": {
                color: this.context.theme.color.blue,
              },
            }}
          >
            <Heading
              as="h6"
              margin="0"
              width="100%"
              fontSize="12px"
              fontWeight="500"
              lineHeight="20px"
              color={this.context.theme.color.secondary}
              textTransform="uppercase"
              className="section__header"
            >
              {Translator.translate("ACTIONS", this.context.language)}
            </Heading>
            <Box
              width="100%"
              margin="6px 0"
              className="section__content"
            >
              <Box
                width="100%"
                className="content__item"
              >
                <Text
                  fontSize="15px"
                  lineHeight="20px"
                  fontWeight="600"
                  display="inline-block"
                  color={this.context.theme.color.red}
                  cursor="pointer"
                  className="item__link"
                  onClick={this.viewProfile}
                >
                  {Translator.translate("VIEW_PROFILE", this.context.language)}
                </Text>
              </Box>
            </Box>
          </Box>
        </VStack>
      );
    }

    let blockUserText;
    if (this.context.item.blockedByMe) {
      blockUserText = (
        <Text
          fontSize="15px"
          lineHeight="20px"
          fontWeight="600"
          display="inline-block"
          color={this.context.theme.color.red}
          cursor="pointer"
          className="item__link"
          onClick={this.unblockUser}
        >
          {Translator.translate("UNBLOCK_USER", this.context.language)}
        </Text>
      );
    } else {
      blockUserText = (
        <Text
          fontSize="15px"
          lineHeight="20px"
          fontWeight="600"
          display="inline-block"
          color={this.context.theme.color.red}
          cursor="pointer"
          className="item__link"
          onClick={this.blockUser}
        >
          {Translator.translate("BLOCK_USER", this.context.language)}
        </Text>
      );
    }

    let sharedmediaView = (
      <VStack
        height="calc(100% - 255px)"
        width="100%"
        margin="0"
        padding="16px 16px 0 16px"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="flex-start"
        className="detailpane__section"
      >
        <CometChatSharedMediaView
          theme={this.props.theme}
          lang={this.context.language}
        />
      </VStack>
    );

    //if shared media feature is disabled
    if (this.state.enableSharedMedia === false) {
      sharedmediaView = null;
    }

    const isOnline = this.state.status ? this.state.status.toLowerCase() : "";
    const compareToOnline = Translator.translate(CometChat.USER_STATUS.ONLINE.toUpperCase(), this.context.language).toLowerCase();
    const statusColor = isOnline === compareToOnline ? this.context.theme.color.blue : this.context.theme.color.helpText;

    return (
      <VStack
        display="flex"
        flexDirection="column"
        height="100%"
        position="relative"
        boxSizing="border-box"
        fontFamily={this.context.theme.fontFamily}
        className="detailpane detailpane--user"
        sx={{
          "*": {
            boxSizing: "border-box",
            fontFamily: this.context.theme.fontFamily,
          },
        }}
      >
        <HStack
          padding="16px"
          position="relative"
          borderBottom={`1px solid ${this.context.theme.borderColor.primary}`}
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          height="69px"
          className="detailpane__header"
        >
          <Box
            cursor="pointer"
            display={{ base: "block", sm: "block", md: "block", lg: "none" }}
            width="24px"
            height="24px"
            className="header__close"
            onClick={this.closeDetailView}
            sx={{
              mask: `url(${navigateIcon}) center center no-repeat`,
              backgroundColor: this.context.theme.primaryColor,
            }}
          ></Box>
          <Heading
            as="h4"
            margin="0"
            fontWeight="700"
            fontSize="20px"
            className="header__title"
          >
            {Translator.translate("DETAILS", this.context.language)}
          </Heading>
        </HStack>
        <VStack
          margin="0"
          padding="16px 16px 0 16px"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="flex-start"
          className="detailpane__section"
        >
          <HStack
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            className="section section__userinfo"
          >
            <Box
              width="35px"
              height="35px"
              display="inline-block"
              flexShrink="0"
              margin="0 16px 0 0"
              className="user__thumbnail"
            >
              <CometChatAvatar user={this.context.item} />
            </Box>
            <VStack
              width="calc(100% - 50px)"
              className="user__status"
              spacing={0}
              alignItems="flex-start"
            >
              <Heading
                as="h6"
                margin="0"
                fontSize="15px"
                fontWeight="600"
                lineHeight="22px"
                width="100%"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                {this.context.item.name}
              </Heading>
              <Text
                as="span"
                width="calc(100% - 50px)"
                textTransform="capitalize"
                fontSize="13px"
                fontWeight="400"
                lineHeight="20px"
                color={statusColor}
              >
                {this.state.status}
              </Text>
            </VStack>
          </HStack>
        </VStack>
        <CometChatToastNotification
          ref={(el) => (this.toastRef = el)}
          lang={this.props.lang}
        />
        {viewProfile}
        {sharedmediaView}
      </VStack>
    );
  }
}

// Specifies the default values for props:
CometChatUserDetails.defaultProps = {
  theme: theme,
};

CometChatUserDetails.propTypes = {
  theme: PropTypes.object,
};

export { CometChatUserDetails };
