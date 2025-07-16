import React from "react";
import { Box } from "@chakra-ui/react";
import { CometChat } from "@cometchat-pro/chat";

import { CometChatContext } from "../../../util/CometChatContext";
import * as enums from "../../../util/enums.js";

import heartIcon from "./resources/heart.png";

class CometChatLiveReactions extends React.PureComponent {
  static contextType = CometChatContext;

  constructor(props) {
    super(props);

    this.parentElement = React.createRef();

    this.counter = 0;
    this.verticalSpeed = 5;
    this.horizontalSpeed = 2;
    this.items = [];

    this.before = Date.now();

    const reaction = props.reaction
      ? enums.CONSTANTS["LIVE_REACTIONS"][props.reaction]
      : enums.CONSTANTS["LIVE_REACTIONS"]["heart"];
    const reactionImg = <img src={heartIcon} alt={reaction} />;
    this.emojis = Array(6).fill(reactionImg);
  }

  componentDidMount() {
    //this.sendMessage();
    this.setItems();
    this.requestAnimation();
  }

  componentWillUnmount() {
    this.timer = null;
  }

  sendMessage = () => {
    //fetching the metadata type from constants
    const metadata = {
      type: enums.CONSTANTS["METADATA_TYPE_LIVEREACTION"],
      reaction: this.props.reaction,
    };

    const receiverType =
      this?.context?.type === CometChat.ACTION_TYPE.TYPE_USER
        ? CometChat.ACTION_TYPE.TYPE_USER
        : CometChat.ACTION_TYPE.TYPE_GROUP;
    const receiverId =
      this?.context?.type === CometChat.ACTION_TYPE.TYPE_USER
        ? this?.context?.item?.uid
        : this?.context?.item?.guid;

    let transientMessage = new CometChat.TransientMessage(
      receiverId,
      receiverType,
      metadata
    );
    CometChat.sendTransientMessage(transientMessage);
  };

  setItems = () => {
    const width = this.parentElement.offsetWidth;
    const height = this.parentElement.offsetHeight;

    const elements = this.parentElement.querySelectorAll(".emoji");

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i],
        elementWidth = element.offsetWidth,
        elementHeight = element.offsetHeight;

      const item = {
        element: element,
        elementHeight: elementHeight,
        elementWidth: elementWidth,
        ySpeed: -this.verticalSpeed,
        omega: (2 * Math.PI * this.horizontalSpeed) / (width * 60), //omega= 2Pi*frequency
        random: (Math.random() / 2 + 0.5) * i * 10000, //random time offset
        x: function (time) {
          return (
            ((Math.sin(this.omega * (time + this.random)) + 1) / 2) *
            (width - elementWidth)
          );
        },
        y: height + (Math.random() + 1) * i * elementHeight,
      };

      this.items.push(item);
    }
  };

  requestAnimation = () => {
    this.timer = setTimeout(this.animate, 1000 / 60);
  };

  animate = () => {
    if (!this.parentElement) {
      return false;
    }

    const height = this.parentElement.offsetHeight;
    const time = +new Date(); //little trick, gives unix time in ms

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      const transformString =
        "translate3d(" + item.x(time) + "px, " + item.y + "px, 0px)";
      item.element.style.transform = transformString;

      item.element.style.visibility = "visible";

      if (item.y <= height) {
        item.element.classList.add("fade");
      }

      item.y += item.ySpeed;
    }

    this.requestAnimation();
  };

  render() {
    const emojis = this.emojis.map((emoji, index) => (
      <Box
        as="span"
        className="emoji"
        key={index}
        position="absolute"
        color="#DD4144"
        visibility="hidden"
        width="20px"
        height="20px"
        opacity="1"
        transition="opacity 3s"
        sx={{
          "&.fade": {
            opacity: "0"
          }
        }}
      >
        {emoji}
      </Box>
    ));
    return (
      <Box
        ref={(el) => (this.parentElement = el)}
        width="100px"
        height="calc(100% - 120px)"
        overflow="hidden"
        position="absolute"
        top="70px"
        right="0"
      >
        {emojis}
      </Box>
    );
  }
}

export { CometChatLiveReactions };
