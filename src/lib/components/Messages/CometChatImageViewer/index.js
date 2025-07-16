import React, { useContext } from "react";
import { Box, Image } from "@chakra-ui/react";
import PropTypes from "prop-types";

import { CometChatBackdrop } from "../../Shared";
import { CometChatContext } from "../../../util/CometChatContext";

import loadingIcon from "./resources/ring.svg";
import closeIcon from "./resources/close.svg";

const CometChatImageViewer = (props) => {
  const context = useContext(CometChatContext);
  const [image, setImage] = React.useState(null);

  let img = new Image();
  img.src = props.message.data.url;

  img.onload = () => {
    setImage(img.src);
  };

  let imageIcon = null;
  if (image) {
    imageIcon = image;
  } else {
    imageIcon = loadingIcon;
  }

  return (
    <React.Fragment>
      <CometChatBackdrop show={true} clicked={props.close} />
      <Box
        onClick={props.close}
        className="image__wrapper"
        position="absolute"
        top="0"
        left="0"
        bottom="0"
        right="0"
        width="100%"
        height={image ? "auto" : "100%"}
        padding="1.8% 2.3%"
        zIndex="9999"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg="white"
        cursor="pointer"
        sx={{
          background: `url(${closeIcon}) no-repeat 99% 0.8% #fff`,
          [`@media ${context.theme.breakPoints[1]}, ${context.theme.breakPoints[2]}`]: {
            height: "100%",
          },
        }}
      >
        <Image
          src={imageIcon}
          alt={imageIcon}
          objectFit="contain"
          width={!image ? "24px" : undefined}
          height={!image ? "24px" : undefined}
          maxHeight={image ? "100%" : undefined}
        />
      </Box>
    </React.Fragment>
  );
};

// Specifies the default values for props:
CometChatImageViewer.defaultProps = {
  count: 0,
  close: () => {},
};

CometChatImageViewer.propTypes = {
  show: PropTypes.bool,
  close: PropTypes.func,
  message: PropTypes.object.isRequired,
};

export { CometChatImageViewer };
