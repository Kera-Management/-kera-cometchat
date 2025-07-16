import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Text, Heading } from "@chakra-ui/react";
import { CometChat } from "@cometchat-pro/chat";

import { CometChatAvatar, CometChatToastNotification } from "../../Shared";

import { theme } from "../../../resources/theme";
import Translator from "../../../resources/localization/translator";

import notificationIcon from "./resources/notify.svg";
import privacyIcon from "./resources/privacy.svg";
import chatIcon from "./resources/chats.svg";
import helpIcon from "./resources/help.svg";
import reportIcon from "./resources/warning.svg";

class CometChatUserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInUser: null,
    };

    this.toastRef = React.createRef();
  }

  componentDidMount() {
    CometChat.getLoggedinUser()
      .then((user) => {
        this.setState({ loggedInUser: user });
      })
      .catch((error) => this.toastRef.setError("SOMETHING_WRONG"));
  }

  render() {
    let userProfile = null;
    if (this.state.loggedInUser) {
      let avatar = <CometChatAvatar user={this.state.loggedInUser} />;
      userProfile = (
        <React.Fragment>
          <Box
            className="userinfo__header"
            padding="16px"
            position="relative"
            borderBottom={`1px solid ${this.props.theme.borderColor.primary}`}
            height="70px"
            display="flex"
            alignItems="center"
          >
            <Heading
              as="h4"
              className="header__title"
              margin="0"
              fontSize="22px"
              fontWeight="700"
              lineHeight="26px"
            >
              {Translator.translate("MORE", this.props.lang)}
            </Heading>
          </Box>
          <Flex
            className="userinfo__detail"
            padding="16px"
            flexDirection="row"
            justifyContent="left"
            alignItems="center"
          >
            <Box
              className="detail__thumbnail"
              display="inline-block"
              width="36px"
              height="36px"
              flexShrink="0"
            >
              {avatar}
            </Box>
            <Box
              className="detail__user"
              dir={Translator.getDirection(this.props.lang)}
              width="calc(100% - 45px)"
              flexGrow="1"
              paddingLeft="16px"
              sx={{
                "&[dir=rtl]": {
                  paddingRight: "16px",
                  paddingLeft: "0",
                }
              }}
            >
              <Text
                className="user__name"
                margin="0"
                fontSize="15px"
                fontWeight="600"
                display="block"
                maxWidth="100%"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                {this.state.loggedInUser.name}
              </Text>
              <Text
                as="p"
                className="user__status"
                fontSize="13px"
                margin="0"
                color={this.props.theme.color.blue}
              >
                {Translator.translate("ONLINE", this.props.lang)}
              </Text>
            </Box>
          </Flex>
          <Box
            className="userinfo__options"
            height="calc(100% - 145px)"
            overflowY="auto"
            padding="0 16px"
            display="flex"
            flexDirection="column"
            justifyContent="left"
            alignItems="flex-start"
          >
            <Text
              className="options__title"
              margin="5px 0"
              width="100%"
              fontSize="12px"
              color={this.props.theme.color.helpText}
              textTransform="uppercase"
            >
              {Translator.translate("PREFERENCES", this.props.lang)}
            </Text>
            <Box
              className="options_list"
              padding="10px 0"
              width="100%"
              fontSize="15px"
            >
              <Box
                className="option option-notification"
                width="100%"
                padding="16px 16px 16px 36px"
                fontWeight="600"
                sx={{
                  background: `url(${notificationIcon}) left center no-repeat`,
                }}
              >
                <Box className="option_name" width="100%">
                  {Translator.translate("NOTIFICATIONS", this.props.lang)}
                </Box>
              </Box>
              <Box
                className="option option-privacy"
                width="100%"
                padding="16px 16px 16px 36px"
                fontWeight="600"
                sx={{
                  background: `url(${privacyIcon}) left center no-repeat`,
                }}
              >
                <Box className="option_name" width="100%">
                  {Translator.translate(
                    "PRIVACY_AND_SECURITY",
                    this.props.lang
                  )}
                </Box>
              </Box>
              <Box
                className="option option-chats"
                width="100%"
                padding="16px 16px 16px 36px"
                fontWeight="600"
                sx={{
                  background: `url(${chatIcon}) left center no-repeat`,
                }}
              >
                <Box className="option_name" width="100%">
                  {Translator.translate("CHATS", this.props.lang)}
                </Box>
              </Box>
            </Box>
            <Text
              className="options__title"
              margin="5px 0"
              width="100%"
              fontSize="12px"
              color={this.props.theme.color.helpText}
              textTransform="uppercase"
            >
              {Translator.translate("OTHER", this.props.lang)}
            </Text>
            <Box
              className="options_list"
              padding="10px 0"
              width="100%"
              fontSize="15px"
            >
              <Box
                className="option option-help"
                width="100%"
                padding="16px 16px 16px 36px"
                fontWeight="600"
                sx={{
                  background: `url(${helpIcon}) left center no-repeat`,
                }}
              >
                <Box className="option_name" width="100%">
                  {Translator.translate("HELP", this.props.lang)}
                </Box>
              </Box>
              <Box
                className="option option-report"
                width="100%"
                padding="16px 16px 16px 36px"
                fontWeight="600"
                sx={{
                  background: `url(${reportIcon}) left center no-repeat`,
                }}
              >
                <Box className="option_name" width="100%">
                  {Translator.translate("REPORT_PROBLEM", this.props.lang)}
                </Box>
              </Box>
            </Box>
          </Box>
        </React.Fragment>
      );
    }

    return (
      <Box
        className="userinfo"
        display="flex"
        flexDirection="column !important"
        height="calc(100% - 50px)"
        fontFamily={this.props.theme.fontFamily}
        sx={{
          "*": {
            boxSizing: "border-box",
            fontFamily: this.props.theme.fontFamily,
          }
        }}
      >
        {userProfile}
        <CometChatToastNotification
          ref={(el) => (this.toastRef = el)}
          lang={this.props.lang}
        />
      </Box>
    );
  }
}

// Specifies the default values for props:
CometChatUserProfile.defaultProps = {
  lang: Translator.getDefaultLanguage(),
  theme: theme,
};

CometChatUserProfile.propTypes = {
  lang: PropTypes.string,
  theme: PropTypes.object,
};

export { CometChatUserProfile };
