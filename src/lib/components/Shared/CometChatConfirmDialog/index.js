import React from "react";
import { Box, Text, Button, Flex } from "@chakra-ui/react";

import { CometChatBackdrop } from "..";
import Translator from "../../../resources/localization/translator";

class CometChatConfirmDialog extends React.Component {
  render() {
    const confirmButtonText = this.props?.confirmButtonText
      ? this.props.confirmButtonText
      : Translator.translate("YES", this.props.lang || Translator.getDefaultLanguage());
    const cancelButtonText = this.props?.cancelButtonText
      ? this.props.cancelButtonText
      : Translator.translate("NO", this.props.lang || Translator.getDefaultLanguage());

    return (
      <React.Fragment>
        <CometChatBackdrop
          show={true}
          style={{ position: "absolute" }}
          clicked={this.props.close}
        />
        <Box
          className="confirm__dialog"
          width="calc(100% - 32px)"
          height="auto"
          backgroundColor={this.props.theme.backgroundColor.white}
          position="absolute"
          margin="0 auto"
          padding="16px"
          fontSize="13px"
          borderRadius="8px"
          border="1px solid #eee"
          zIndex="4"
          top="50%"
          left="0"
          right="0"
          transform="translateY(-50%)"
        >
          <Text
            className="confirm__message"
            textAlign="center"
          >
            {this.props?.message}
          </Text>
          <Flex
            className="confirm__buttons"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            margin="24px 0 0 0"
          >
            <Button
              type="button"
              value="no"
              onClick={this.props.onClick}
              padding="5px 24px"
              margin="0 8px"
              borderRadius="4px"
              fontSize="12px"
              fontWeight="600"
              border={`1px solid ${this.props.theme.primaryColor}`}
              backgroundColor={this.props.theme.backgroundColor.secondary}
              _hover={{
                backgroundColor: this.props.theme.backgroundColor.secondary
              }}
            >
              {cancelButtonText}
            </Button>
            <Button
              type="button"
              value="yes"
              onClick={this.props.onClick}
              padding="5px 24px"
              margin="0 8px"
              borderRadius="4px"
              fontSize="12px"
              fontWeight="600"
              border={`1px solid ${this.props.theme.primaryColor}`}
              backgroundColor={this.props.theme.primaryColor}
              color={this.props.theme.color.white}
              _hover={{
                backgroundColor: this.props.theme.primaryColor
              }}
            >
              {confirmButtonText}
            </Button>
          </Flex>
        </Box>
      </React.Fragment>
    );
  }
}

export { CometChatConfirmDialog };
