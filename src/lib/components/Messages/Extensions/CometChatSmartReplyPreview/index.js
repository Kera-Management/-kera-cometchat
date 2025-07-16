import { useContext } from "react";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import PropTypes from "prop-types";

import { CometChatContext } from "../../../../util/CometChatContext";

import { theme } from "../../../../resources/theme";

import closeIcon from "./resources/close.svg";

const CometChatSmartReplyPreview = (props) => {
  const context = useContext(CometChatContext);

  const slideAnimation = `
    @keyframes slide {
      from {
        bottom: -55px;
      }
      to {
        bottom: 0px;
      }
    }
  `;

  const options = props.options.map((option, key) => {
    return (
      <Box
        key={key}
        className="option"
        onClick={() => props.clicked(option)}
        padding="8px"
        margin="0 8px"
        backgroundColor={context.theme.backgroundColor.grey}
        border={`1px solid ${context.theme.borderColor.primary}`}
        borderRadius="10px"
        cursor="pointer"
        height="100%"
        textAlign="center"
      >
        {option}
      </Box>
    );
  });

  return (
    <>
      <style>{slideAnimation}</style>
      <Box
        className="reply__preview__wrapper"
        padding="8px 8px 16px 8px"
        marginBottom="-8px"
        backgroundColor={context.theme.backgroundColor.white}
        border={`1px solid ${context.theme.borderColor.primary}`}
        fontSize="13px"
        display="flex"
        flexDirection="row-reverse"
        justifyContent="space-between"
        animation="slide 0.5s ease-out"
        position="relative"
      >
        <Box
          className="preview__heading"
          alignSelf="flex-start"
          display="flex"
          alignItems="baseline"
          justifyContent="space-between"
        >
          <Box
            className="preview__close"
            onClick={props.close}
            width="24px"
            height="24px"
            borderRadius="50%"
            backgroundImage={`url(${closeIcon})`}
            backgroundPosition="center center"
            backgroundRepeat="no-repeat"
            backgroundColor={context.theme.primaryColor}
            cursor="pointer"
            sx={{
              mask: `url(${closeIcon}) center center no-repeat`,
              WebkitMask: `url(${closeIcon}) center center no-repeat`
            }}
          />
        </Box>
        <Flex
          className="preview__options"
          alignItems="center"
          justifyContent="space-around"
          width="100%"
        >
          {options}
        </Flex>
      </Box>
    </>
  );
};

// Specifies the default values for props:
CometChatSmartReplyPreview.defaultProps = {
  theme: theme,
};

CometChatSmartReplyPreview.propTypes = {
  theme: PropTypes.object,
};

export { CometChatSmartReplyPreview };
