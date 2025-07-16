import React from "react";
import { Box, Flex, Image as ChakraImage } from "@chakra-ui/react";
import PropTypes from "prop-types";

import {
  CometChatMessageActions,
  CometChatThreadedMessageReplyCount,
  CometChatReadReceipt,
} from "..";
import { CometChatMessageReactions } from "../Extensions";

import { CometChatContext } from "../../../util/CometChatContext";
import * as enums from "../../../util/enums.js";
import {
  checkMessageForExtensionsData,
  getMessageFileMetadata,
} from "../../../util/common";

import { theme } from "../../../resources/theme";
import Translator from "../../../resources/localization/translator";


import srcIcon from "./resources/1px.png";

class CometChatSenderImageMessageBubble extends React.Component {
  static contextType = CometChatContext;
  timer = null;

  constructor(props, context) {
    super(props, context);
    this._isMounted = false;
    this.imgRef = React.createRef();

    this.state = {
      imageUrl: srcIcon,
      imageName: Translator.translate("LOADING", context.language),
      isHovering: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const currentMessageStr = JSON.stringify(this.props.message);
    const nextMessageStr = JSON.stringify(nextProps.message);

    if (
      currentMessageStr !== nextMessageStr ||
      this.state.imageUrl !== nextState.imageUrl ||
      this.state.isHovering !== nextState.isHovering
    ) {
      return true;
    }

    return false;
  }

  componentDidMount() {
    this._isMounted = true;
    this.setImage();
  }

  componentDidUpdate(prevProps) {
    const previousMessageStr = JSON.stringify(prevProps.message);
    const currentMessageStr = JSON.stringify(this.props.message);

    if (previousMessageStr !== currentMessageStr) {
      this.setImage();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  chooseImage = (thumbnailGenerationObject) => {
    const smallUrl = thumbnailGenerationObject["url_small"];
    const mediumUrl = thumbnailGenerationObject["url_medium"];

    const mq = window.matchMedia(this.props.theme.breakPoints[0]);

    let imageToDownload = mediumUrl;
    if (mq.matches) {
      imageToDownload = smallUrl;
    }

    return imageToDownload;
  };

  setImage = () => {
    const thumbnailGenerationData = checkMessageForExtensionsData(
      this.props.message,
      "thumbnail-generation"
    );
    if (thumbnailGenerationData) {
      let imageName = "";
      if (
        this.props.message.data.attachments &&
        typeof this.props.message.data.attachments === "object" &&
        this.props.message.data.attachments.length
      ) {
        imageName = this.props.message.data.attachments[0]?.name;
      }

      const mq = window.matchMedia(this.props.theme.breakPoints[0]);
      mq.addListener(() => {
        const imageToDownload = this.chooseImage(thumbnailGenerationData);
        let img = new Image();
        img.src = imageToDownload;
        img.onload = () => {
          if (this._isMounted && this.state.imageUrl !== img.src) {
            this.setState({ imageUrl: img.src, imageName: imageName });
          }
        };
      });

      const imageToDownload = this.chooseImage(thumbnailGenerationData);
      this.downloadImage(imageToDownload)
        .then((response) => {
          let img = new Image();
          img.src = imageToDownload;
          img.onload = () => {
            if (this._isMounted && this.state.imageUrl !== img.src) {
              this.setState({ imageUrl: img.src, imageName: imageName });
            }
          };
        })
        .catch((error) => console.error(error));
    } else {
      this.setMessageImageUrl();
    }
  };

  setMessageImageUrl = () => {
    const metadataKey = enums.CONSTANTS["FILE_METADATA"];
    const fileMetadata = getMessageFileMetadata(
      this.props.message,
      metadataKey
    );

    let img = new Image();
    let imageName;
    if (fileMetadata instanceof Blob) {
      const reader = new FileReader();
      reader.onload = function () {
        img.src = reader.result;
      };
      imageName = fileMetadata["name"];
      reader.readAsDataURL(fileMetadata);
    } else if (
      this.props.message.data.attachments &&
      typeof this.props.message.data.attachments === "object" &&
      this.props.message.data.attachments.length
    ) {
      const fileUrl = this.props.message.data.attachments[0]?.url;
      imageName = this.props.message.data.attachments[0]?.name;
      img.src = fileUrl;
    }

    img.onload = () => {
      //only if there is a change in the image path, update state
      if (this._isMounted && this.state.imageUrl !== img.src) {
        this.setState({ imageUrl: img.src, imageName: imageName });
      }
    };
  };

  downloadImage(imgUrl) {
    const promise = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", imgUrl, true);
      xhr.responseType = "blob";

      xhr.onload = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            this.timer = null;
            resolve(imgUrl);
          } else if (xhr.status === 403) {
            this.timer = setTimeout(() => {
              this.downloadImage(imgUrl)
                .then((response) => resolve(imgUrl))
                .catch((error) => reject(error));
            }, 800);
          }
        } else {
          reject(xhr.statusText);
        }
      };

      xhr.onerror = (event) =>
        reject(new Error("There was a network error.", event));
      xhr.ontimeout = (event) =>
        reject(new Error("There was a timeout error.", event));
      xhr.send();
    });

    return promise;
  }

  open = () => {
    this.props.actionGenerated(
      enums.ACTIONS["VIEW_ORIGINAL_IMAGE"],
      this.props.message
    );
  };

  handleMouseHover = () => {
    this.setState(this.toggleHoverState);
  };

  toggleHoverState = (state) => {
    return {
      isHovering: !state.isHovering,
    };
  };

  render() {
    let messageReactions = null;
    const reactionsData = checkMessageForExtensionsData(
      this.props.message,
      "reactions"
    );
    if (reactionsData) {
      if (Object.keys(reactionsData).length) {
        messageReactions = (
          <Flex
            className="message__reaction__wrapper"
            display="flex"
            alignSelf="flex-end"
            width="100%"
            flexWrap="wrap"
            justifyContent="flex-end"
            minHeight="36px"
          >
            <CometChatMessageReactions
              message={this.props.message}
              actionGenerated={this.props.actionGenerated}
            />
          </Flex>
        );
      }
    }

    let toolTipView = null;
    if (this.state.isHovering) {
      toolTipView = (
        <CometChatMessageActions
          message={this.props.message}
          actionGenerated={this.props.actionGenerated}
        />
      );
    }

    return (
      <Flex
        className="sender__message__container message__image"
        alignSelf="flex-end"
        marginBottom="16px"
        paddingLeft="16px"
        paddingRight="16px"
        maxWidth="65%"
        clear="both"
        position="relative"
        display="flex"
        flexDirection="column"
        flexShrink="0"
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}
      >
        {toolTipView}

        <Flex 
          className="message__wrapper"
          width="auto"
          flex="1 1"
          alignSelf="flex-end"
          display="flex"
        >
          <Box
            className="message__img__wrapper"
            onClick={this.open}
            cursor="pointer"
            display="inline-block"
            alignSelf="flex-end"
            maxWidth="300px"
            height="200px"
            flexShrink="0"
            sx={{
              [`@media ${this.context.theme.breakPoints[1]}, ${this.context.theme.breakPoints[2]}`]: {
                minWidth: "50px",
                maxWidth: "150px",
                height: "100px",
                padding: "2px 2px",
              },
            }}
          >
            <ChakraImage
              src={this.state.imageUrl}
              alt={this.state.imageName}
              borderRadius="8px"
              height="100%"
              ref={(el) => {
                this.imgRef = el;
              }}
            />
          </Box>
        </Flex>

        {messageReactions}

        <Flex 
          className="message__info__wrapper"
          alignSelf="flex-end"
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          height="25px"
          padding="4px 8px"
        >
          <CometChatThreadedMessageReplyCount
            message={this.props.message}
            actionGenerated={this.props.actionGenerated}
          />
          <CometChatReadReceipt message={this.props.message} />
        </Flex>
      </Flex>
    );
  }
}

// Specifies the default values for props:
CometChatSenderImageMessageBubble.defaultProps = {
  theme: theme,
  actionGenerated: () => {},
};

CometChatSenderImageMessageBubble.propTypes = {
  theme: PropTypes.object,
  actionGenerated: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
};

export { CometChatSenderImageMessageBubble };
