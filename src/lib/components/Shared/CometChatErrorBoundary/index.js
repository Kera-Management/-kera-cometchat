import React from "react";
import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";

import Translator from "../../../resources/localization/translator";

export class CometChatErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.logErrorToMyService(error, errorInfo);
  }

  logErrorToMyService = console.log;

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="auto"
          padding="16px"
          zIndex="2"
          display="flex"
          justifyContent="center"
          backgroundColor="#F35051"
          color="#fff"
        >
          {Translator.translate("USER_NOT_LOGGED_IN", this.props.lang)}
        </Box>
      );
    }

    return this.props.children;
  }
}

CometChatErrorBoundary.defaultProps = {
  lang: Translator.getDefaultLanguage(),
};

CometChatErrorBoundary.propTypes = {
  lang: PropTypes.string,
};
