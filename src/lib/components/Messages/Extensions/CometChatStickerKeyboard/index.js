import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { CometChat } from "@cometchat-pro/chat";

import { CometChatContext } from "../../../../util/CometChatContext";
import * as enums from "../../../../util/enums.js";

import { theme } from "../../../../resources/theme";
import Translator from "../../../../resources/localization/translator";

import closeIcon from "./resources/close.svg";

class CometChatStickerKeyboard extends React.PureComponent {
  static contextType = CometChatContext;

  constructor(props, context) {
    super(props, context);

    this.decoratorMessage = Translator.translate("LOADING", context.language);

    this.state = {
      stickerlist: [],
      stickerset: {},
      activestickerlist: [],
      activestickerset: null,
    };
  }

  componentDidMount() {
    this.getStickers();
  }

  getStickers = () => {
    CometChat.callExtension("stickers", "GET", "v1/fetch", null)
      .then((stickers) => {
        // Stickers received
        let activeStickerSet = null;
        const customStickers = stickers.hasOwnProperty("customStickers")
          ? stickers["customStickers"]
          : [];
        const defaultStickers = stickers.hasOwnProperty("defaultStickers")
          ? stickers["defaultStickers"]
          : [];

        defaultStickers.sort(function (a, b) {
          return a.stickerSetOrder - b.stickerSetOrder;
        });

        customStickers.sort(function (a, b) {
          return a.stickerSetOrder - b.stickerSetOrder;
        });

        const stickerList = [...defaultStickers, ...customStickers];

        if (stickerList.length === 0) {
          this.decoratorMessage = Translator.translate(
            "NO_STICKERS_FOUND",
            this.context.language
          );
        }

        const stickerSet = stickerList.reduce((r, sticker, index) => {
          const { stickerSetName } = sticker;
          if (index === 0) {
            activeStickerSet = stickerSetName;
          }

          r[stickerSetName] = [...(r[stickerSetName] || []), { ...sticker }];

          return r;
        }, {});

        let activeStickerList = [];
        if (Object.keys(stickerSet).length) {
          Object.keys(stickerSet).forEach((key) => {
            stickerSet[key].sort(function (a, b) {
              return a.stickerOrder - b.stickerOrder;
            });
          });

          activeStickerList = stickerSet[activeStickerSet];
        }

        this.setState({
          stickerlist: stickerList,
          stickerset: stickerSet,
          activestickerlist: activeStickerList,
          activestickerset: activeStickerSet,
        });
      })
      .catch((error) => {
        this.decoratorMessage = Translator.translate(
          "SOMETHING_WRONG",
          this.context.language
        );
        this.setState({ activestickerlist: [], stickerset: {} });
      });
  };

  sendStickerMessage = (stickerItem) => {
    this.props.actionGenerated(enums.ACTIONS["SEND_STICKER"], stickerItem);
  };

  onStickerSetClicked = (sectionItem) => {
    this.setState({ activestickerlist: [] }, () => {
      const stickerSet = { ...this.state.stickerset };
      const activeStickerList = stickerSet[sectionItem];
      this.setState({
        activestickerset: sectionItem,
        activestickerlist: activeStickerList,
      });
    });
  };

  closeStickerKeyboard = () => {
    this.props.actionGenerated(enums.ACTIONS["CLOSE_STICKER_KEYBOARD"]);
  };

  render() {
    let messageContainer = null;
    if (this.state.activestickerlist.length === 0) {
      messageContainer = (
        <Box 
          className="stickers__decorator-message"
          overflow="hidden"
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="absolute"
          top="35%"
        >
          <Text
            className="decorator-message"
            margin="0"
            height="30px"
            color={this.context.theme.color.secondary}
            fontSize="24px!important"
            fontWeight="600"
          >
            {this.decoratorMessage}
          </Text>
        </Box>
      );
    }

    let stickers = null;
    if (Object.keys(this.state.stickerset).length) {
      const sectionItems = Object.keys(this.state.stickerset).map(
        (sectionItem, key) => {
          const stickerSetThumbnail =
            this.state.stickerset[sectionItem][0]["stickerUrl"];
          return (
            <Box
              key={key}
              className="stickers__sectionitem"
              height="35px"
              width="35px"
              cursor="pointer"
              flexShrink="0"
              sx={{
                ":not(:first-of-type)": {
                  marginLeft: "16px",
                },
              }}
              onClick={() => this.onStickerSetClicked(sectionItem)}
            >
              <Image src={stickerSetThumbnail} alt={sectionItem} />
            </Box>
          );
        }
      );

      let activeStickerList = [];
      if (this.state.activestickerlist.length) {
        const stickerList = [...this.state.activestickerlist];
        activeStickerList = stickerList.map((stickerItem, key) => {
          return (
            <Box
              key={key}
              className="stickers__listitem"
              minWidth="50px"
              minHeight="50px"
              maxWidth="70px"
              maxHeight="70px"
              cursor="pointer"
              flexShrink="0"
              marginRight="20px"
              sx={{
                [`@media ${this.context.theme.breakPoints[1]}, ${this.context.theme.breakPoints[2]}, ${this.context.theme.breakPoints[3]}`]: {
                  maxWidth: "70px",
                  maxHeight: "70px",
                },
              }}
              onClick={() => this.sendStickerMessage(stickerItem)}
            >
              <Image src={stickerItem.stickerUrl} alt={stickerItem.stickerName} />
            </Box>
          );
        });
      }

      stickers = (
        <React.Fragment>
          <Box
            className="stickers__close"
            width="20px"
            height="20px"
            borderRadius="50%"
            alignSelf="flex-end"
            cursor="pointer"
            margin="8px 8px 0 0"
            sx={{
              mask: `url(${closeIcon}) center center no-repeat`,
              backgroundColor: this.context.theme.primaryColor,
            }}
            onClick={this.closeStickerKeyboard}
          />
          <Flex 
            className="stickers__list"
            height="calc(100% - 50px)"
            display="flex"
            overflowX="hidden"
            overflowY="auto"
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
          >
            {activeStickerList}
          </Flex>
          <Flex
            className="stickers__sections"
            borderTop={`1px solid ${this.context.theme.borderColor.primary}`}
            backgroundColor={this.context.theme.backgroundColor.silver}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            textTransform="uppercase"
            overflowX="auto"
            overflowY="hidden"
            padding="10px"
            sx={{
              "::-webkit-scrollbar": {
                background: this.context.theme.backgroundColor.primary,
              },
              "::-webkit-scrollbar-thumb": {
                background: this.context.theme.backgroundColor.silver,
              },
            }}
          >
            {sectionItems}
          </Flex>
        </React.Fragment>
      );
    }

    return (
      <Box
        className="stickers"
        backgroundColor={this.context.theme.backgroundColor.grey}
        border={`1px solid ${this.context.theme.borderColor.primary}`}
        borderBottom="none"
        borderRadius="10px 10px 0 0"
        height="215px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        sx={{
          animation: "slideIn 0.5s ease-out",
          "@keyframes slideIn": {
            from: {
              bottom: "-55px"
            },
            to: {
              bottom: "0px"
            }
          }
        }}
      >
        {messageContainer}
        {stickers}
      </Box>
    );
  }
}

// Specifies the default values for props:
CometChatStickerKeyboard.defaultProps = {
  theme: theme,
};

CometChatStickerKeyboard.propTypes = {
  theme: PropTypes.object,
};

export { CometChatStickerKeyboard };
