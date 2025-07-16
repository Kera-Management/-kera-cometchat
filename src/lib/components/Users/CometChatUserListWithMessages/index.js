import React from "react";
import PropTypes from "prop-types";
import { Box, Flex } from "@chakra-ui/react";

import { CometChatUserList } from "..";
import { CometChatMessages } from "../../Messages";
import { CometChatIncomingCall } from "../../Calls";

import { CometChatContextProvider } from "../../../util/CometChatContext";
import * as enums from "../../../util/enums.js";

import { theme } from "../../../resources/theme";
import Translator from "../../../resources/localization/translator";

class CometChatUserListWithMessages extends React.Component {
  loggedInUser = null;

  constructor(props) {
    super(props);

    this.state = {
      sidebarview: false,
    };

    this.contextProviderRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.chatWithUser.length === 0) {
      this.toggleSideBar();
    }
  }

  itemClicked = (user, type) => {
    this.contextProviderRef.setTypeAndItem(type, user);
    this.toggleSideBar();
  };

  actionHandler = (action) => {
    switch (action) {
      case enums.ACTIONS["TOGGLE_SIDEBAR"]:
        this.toggleSideBar();
        break;
      default:
        break;
    }
  };

  toggleSideBar = () => {
    const sidebarview = this.state.sidebarview;
    this.setState({ sidebarview: !sidebarview });
  };

  render() {
    let messageScreen = (
      <CometChatMessages
        _parent="userscreen"
        actionGenerated={this.actionHandler}
      />
    );

    return (
      <CometChatContextProvider
        ref={(el) => (this.contextProviderRef = el)}
        user={this.props.chatWithUser}
        language={this.props.lang}
      >
        <Flex
          className="cometchat cometchat--contacts"
          dir={Translator.getDirection(this.props.lang)}
          height="100%"
          width="100%"
          boxSizing="border-box"
          fontFamily={this.props.theme.fontFamily}
          border={`1px solid ${this.props.theme.borderColor.primary}`}
          sx={{
            "*": {
              boxSizing: "border-box",
              fontFamily: this.props.theme.fontFamily,
              "::-webkit-scrollbar": {
                width: "8px",
                height: "4px",
              },
              "::-webkit-scrollbar-track": {
                background: "#ffffff00"
              },
              "::-webkit-scrollbar-thumb": {
                background: "#ccc",
                "&:hover": {
                  background: "#aaa"
                }
              }
            }
          }}
        >
          <Box
            className="contacts__sidebar"
            width={{ base: "100%", md: "280px" }}
            borderRight={`1px solid ${this.props.theme.borderColor.primary}`}
            height="100%"
            position="relative"
            display="flex"
            flexDirection="column"
            sx={{
              "> .contacts": {
                height: "calc(100% - 5px)",
              },
              "@media (max-width: 768px)": {
                position: "absolute !important",
                left: this.state.sidebarview ? "0" : "-100%",
                top: "0",
                bottom: "0",
                width: "100% !important",
                zIndex: "2",
                backgroundColor: this.props.theme.backgroundColor.white,
                transition: "all .3s ease-out",
                boxShadow: this.state.sidebarview ? "rgba(0, 0, 0, .4) -30px 0 30px 30px" : "none"
              }
            }}
          >
            <CometChatUserList
              _parent="ulwm"
              theme={this.props.theme}
              lang={this.props.lang}
              onItemClick={this.itemClicked}
              actionGenerated={this.actionHandler}
            />
          </Box>
          <Box
            className="contacts__main"
            width={{ base: "100%", md: "calc(100% - 280px)" }}
            height="100%"
            order="2"
            display="flex"
            flexDirection="row"
          >
            {messageScreen}
          </Box>
          <CometChatIncomingCall
            theme={this.props.theme}
            lang={this.props.lang}
            actionGenerated={this.actionHandler}
          />
        </Flex>
      </CometChatContextProvider>
    );
  }
}

// Specifies the default values for props:
CometChatUserListWithMessages.defaultProps = {
  lang: Translator.getDefaultLanguage(),
  theme: theme,
  chatWithUser: "",
};

CometChatUserListWithMessages.propTypes = {
  lang: PropTypes.string,
  theme: PropTypes.object,
  chatWithUser: PropTypes.string,
};

export { CometChatUserListWithMessages };
