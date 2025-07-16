import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Emojis } from "./emojis";
import { CometChatEmojiCategory } from "./EmojiCategory";
import { CometChatEmoji } from "./Emoji";

import { CometChatListItem } from "../../Shared";

/**
 *
 * CometChatEmojiKeyboard is a component that fetch emoji from emjis file and displays emoji
 * in the CometChatListItem component.
 *
 *
 * @version 1.0.0
 * @author CometChatTeam
 * @copyright © 2022 CometChat Inc.
 *
 */

const CometChatEmojiKeyboard = (props) => {
  
  const handleEvent = (obj) => {
    props.onClick(obj);
  };

  const autoScrollView = (id) => {
    document.getElementById(id).scrollIntoView(true);
  };

  const renderItems = () => {
    let emojiJSX = null;
    let emojiCategoryJSX = [];
    let renderId = null;
    emojiJSX = Emojis?.map((el, i) => {
      const vals = Object?.values(el)[0];
      renderId = Math.floor(Math.random() * (Emojis?.length - 0) + i);
      /**Each json iteration filter through EmojiCategory class */
      const emojiCategory = new CometChatEmojiCategory({
        id: vals.id,
        name: vals.name,
        symbol: vals.symbol,
        emojis: vals.emojis,
      });
      /**Emoji Category List */
      emojiCategoryJSX.push(
        <Box key={emojiCategory.id} className="emoji__autoscroll">
          <CometChatListItem
            key={emojiCategory.id}
            id={emojiCategory.id}
            iconURL={emojiCategory.symbol}
            style={{
              width: "24px",
              height: "24px",
              cursor: "pointer",
              alignItems: "center",
              justifyContent: "center",
              iconTint: "#3399ff",
              iconBackground: "rgba(20, 20, 20, 0.58)",
            }}
            onItemClick={autoScrollView.bind(this, emojiCategory.id)}
          />
        </Box>
      );

      const title = (
        <Text
          className="emoji__category__title"
          textAlign="left"
          paddingLeft="16px"
          paddingTop="8px"
          fontFamily={props.style?.sectionHeaderFont || "500 12px Inter, sans-serif"}
          color={props.style?.sectionHeaderColor || "rgba(20,20,20,0.58)"}
        >
          {emojiCategory.name}
        </Text>
      );

      /**Emojis List */
      let emojiList = null;
      emojiList = Object?.values(emojiCategory?.emojis)?.map((emoji, i) => {
        let emojiId = Math.floor(
          Math.random() * (Object?.values?.length - 0) + i
        );
        const emojiInstance = new CometChatEmoji({
          char: emoji.char,
          keywords: emoji.keywords,
        });

        return (
          <CometChatListItem
            id={emojiId}
            key={emojiId}
            onItemClick={handleEvent.bind(this, emojiInstance)}
            style={{
              padding: "10px",
              display: "flex",
              cursor: "pointer",
              borderRadius: "3px",
              alignItems: "center",
              justifyContent: "center",
              textFont: "700 22px Inter,sand-serif",
              background: props.style?.background,
            }}
            text={emojiInstance.char}
          />
        );
      });
      return (
        <Box
          key={emojiCategory.id}
          id={emojiCategory.id} // for auto scroll
          className="emoji__category__wrapper"
          justifyContent="center"
          alignItems="center"
        >
          {title}
          <Flex 
            className="emoji__list" 
            display="flex"
            flexWrap="wrap"
            justifyContent="space-evenly"
          >
            {emojiList}
          </Flex>
        </Box>
      );
    });

    return (
      <Box
        className="emoji__keyboard"
        padding="0px"
        overflowY="scroll"
        position="relative"
        width={props.style?.width || "100%"}
        height={props.style?.height || "300px"}
        background={props.style?.background || "rgb(255,255,255)"}
        boxShadow="0px 0px 10px #ddd"
        zIndex="9"
      >
        <Box className="emoji__list__items">{emojiJSX}</Box>
        <Flex
          className="emoji__category"
          width="100%"
          zIndex="9"
          display="flex"
          flexWrap="wrap"
          padding="15px 8px"
          position="sticky"
          bottom="0px"
          alignItems="center"
          justifyContent="space-around"
          background={props.style?.background || "rgb(255,255,255)"}
        >
          {emojiCategoryJSX}
        </Flex>
      </Box>
    );
  };

  return renderItems();
};

// Specifies the default values for props:
CometChatEmojiKeyboard.defaultProps = {
  hideSearch: false,
  onClick: () => {},
  style: {
    width: "100%",
    height: "300px",
    border: "none",
    background: "rgb(255,255,255)",
    borderRadius: "8px",
    sectionHeaderFont: "500 12px Inter, sans-serif",
    sectionHeaderColor: "rgba(20,20,20,0.58)",
    categoryIconTint: "RGBA(20, 20, 20, 0.58)",
    selectedCategoryIconTint: "#39f",
  },
};

CometChatEmojiKeyboard.propTypes = {
  hideSearch: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.object,
};

export { CometChatEmojiKeyboard };
