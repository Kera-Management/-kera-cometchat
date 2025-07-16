import React from "react";
import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";

const CometChatBackdrop = (props) =>
  props.show ? (
    <Box
      zIndex="3"
      backgroundColor="#000"
      opacity=".3"
      position="fixed"
      width="100%"
      height="100%"
      top="0"
      left="0"
      cursor="pointer"
      transition="background .3s ease-out 0"
      className="modal__backdrop"
      onClick={props.clicked}
      sx={props.style}
    />
  ) : null;

// Specifies the default values for props:
CometChatBackdrop.defaultProps = {
  show: false,
  style: {},
  clicked: () => {},
};

CometChatBackdrop.propTypes = {
  show: PropTypes.bool,
  style: PropTypes.object,
  clicked: PropTypes.func,
};

export { CometChatBackdrop };
