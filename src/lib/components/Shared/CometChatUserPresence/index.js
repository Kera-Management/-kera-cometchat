import React from "react";
import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";

import { CometChatContext } from "../../../util/CometChatContext";

const CometChatUserPresence = (props) => {
  const context = React.useContext(CometChatContext);
  const [presence, setPresence] = React.useState(false);

  const togglePresence = () => {
    context.FeatureRestriction.isUserPresenceEnabled()
      .then((response) => {
        if (response !== presence) {
          setPresence(response);
        }
      })
      .catch((error) => {
        if (presence !== false) {
          setPresence(false);
        }
      });
  };

  React.useEffect(togglePresence);

  //if user presence feature is disabled
  if (presence === false) {
    return null;
  }

  const borderWidth = props.borderWidth;
  const borderColor = props.borderColor;
  const cornerRadius = props.cornerRadius;

  const getStyle = () => ({
    borderWidth: borderWidth,
    borderStyle: "solid",
    borderColor: borderColor,
    borderRadius: cornerRadius,
  });

  const backgroundColor = (props.status === "online" || props.status === "available") ? "#3BDF2F" : "#C4C4C4";

  return (
    <Box
      as="span"
      width="9px"
      height="9px"
      top="-12px"
      float="right"
      position="relative"
      backgroundColor={backgroundColor}
      borderWidth={borderWidth}
      borderStyle="solid"
      borderColor={borderColor}
      borderRadius={cornerRadius}
      className="presence"
    />
  );
};

// Specifies the default values for props:
CometChatUserPresence.defaultProps = {
  borderWidth: "1px",
  borderColor: "#eaeaea",
  cornerRadius: "50%",
};

CometChatUserPresence.propTypes = {
  borderWidth: PropTypes.string,
  borderColor: PropTypes.string,
  cornerRadius: PropTypes.string,
};

export { CometChatUserPresence };
