import React from "react";
import { Box, Flex, Text, Link } from "@chakra-ui/react";
import PropTypes from "prop-types";

import { checkMessageForExtensionsData } from "../../../util/common";

import { CometChatContext } from "../../../util/CometChatContext";

import { theme } from "../../../resources/theme";
import Translator from "../../../resources/localization/translator";


class CometChatLinkPreview extends React.PureComponent {
  static contextType = CometChatContext;

  render() {
    const linkPreviewData = checkMessageForExtensionsData(
      this.props.message,
      "link-preview"
    );
    const linkObject = linkPreviewData["links"][0];

    const pattern = /(http:|https:)?\/\/(www\.)?(youtube.com|youtu.be)(\S+)?/;
    const linkText = linkObject["url"].match(pattern)
      ? Translator.translate("VIEW_ON_YOUTUBE", this.context.language)
      : Translator.translate("VISIT", this.context.language);

    return (
      <Box
        className="message__preview"
        display="inline-block"
        borderRadius="12px"
        backgroundColor={this.context.theme.backgroundColor.white}
        boxShadow="0px 1px 2px 1px rgba(0,0,0,0.18)"
        alignSelf="flex-start"
        width="auto"
      >
        <Flex className="preview__card" direction="column">
          <Box
            className="card__image"
            sx={{
              background: `url(${linkObject["image"]}) no-repeat center center`,
              backgroundSize: "contain",
            }}
            height="150px"
            margin="12px 0"
          />
          <Box
            className="card__info"
            borderTop={`1px solid ${this.context.theme.borderColor.primary}`}
            borderBottom={`1px solid ${this.context.theme.borderColor.primary}`}
            padding={4}
          >
            <Box className="card__title" mb={2}>
              <Text
                whiteSpace="pre-wrap"
                wordBreak="break-word"
                textAlign="left"
                width="auto"
                color={this.context.theme.color.helpText}
                fontWeight="700"
              >
                {linkObject["title"]}
              </Text>
            </Box>
            <Box className="card__desc">
              <Text
                whiteSpace="pre-wrap"
                wordBreak="break-word"
                textAlign="left"
                width="auto"
                color={this.context.theme.color.helpText}
                fontStyle="italic"
                fontSize="13px"
              >
                {linkObject["description"]}
              </Text>
            </Box>
            <Box
              className="card__text"
              whiteSpace="pre-wrap"
              wordBreak="break-word"
              textAlign="left"
              width="auto"
              sx={{
                ".message__txt__wrapper": {
                  backgroundColor: "transparent",
                  color: this.context.theme.color.helpText,
                  fontStyle: "normal",
                  padding: "8px 0",
                },
              }}
            >
              {this.props.messageText}
            </Box>
          </Box>
          <Flex
            className="card__link"
            alignItems="center"
            justifyContent="center"
            padding={3}
          >
            <Link
              href={linkObject["url"]}
              target="_blank"
              rel="noopener noreferrer"
              display="inline-block"
              color={this.context.theme.color.blue}
              fontWeight="700"
            >
              {linkText}
            </Link>
          </Flex>
        </Flex>
      </Box>
    );
  }
}

// Specifies the default values for props:
CometChatLinkPreview.defaultProps = {
  theme: theme,
};

CometChatLinkPreview.propTypes = {
  theme: PropTypes.object,
  message: PropTypes.object.isRequired,
};

export { CometChatLinkPreview };
