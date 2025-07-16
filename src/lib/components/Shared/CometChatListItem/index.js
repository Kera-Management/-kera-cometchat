import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

const CometChatListItem = (props) => {
  let listIcon = null;
  if (props.iconURL) {
    listIcon = (
      <Box
        className="list_item_icon"
        marginLeft="0px"
        width="24px"
        height="24px"
        sx={{
          WebkitMask: `url(${props.iconURL}) center center no-repeat`,
          backgroundColor: props.style.iconBackground,
          transform: props.style.iconTransform,
          color: props.style.iconTint,
        }}
      />
    );
  }

  return (
    <Flex
      id={props.id}
      className="list__item"
      onClick={props.onItemClick.bind(this)}
      cursor="pointer"
      align="center"
      width={props.style.width}
      height={props.style.height}
      borderRadius={props.style.borderRadius}
      border={props.style.border}
      background={props.style.background}
      {...props.style}
    >
      {listIcon}
      <Text
        className="list_text"
        margin="0 6px"
        background="transparent"
        textTransform="capitalize"
        font={props.style.textFont}
        color={props.style.textColor}
        wordBreak="break-word"
      >
        {props.text}
      </Text>
      {props.tail}
    </Flex>
  );
};

export { CometChatListItem };

CometChatListItem.defaultProps = {
  id: "",
  text: "",
  tail: "",
  iconURL: "",
  style: {
    width: "",
    height: "",
    iconTint: "red",
    borderRadius: "8px",
    iconBackground: "white",
    textColor: "rgb(51,153,255)",
    border: "1px solid #141414",
    background: "rgba(255,255,255, 0.6)",
    textFont: "600 15px Inter, sans-serif",
  },
  onItemClick: () => {},
};

CometChatListItem.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  tail: PropTypes.string,
  iconURL: PropTypes.string,
  style: PropTypes.object,
  onItemClick: PropTypes.func,
};
