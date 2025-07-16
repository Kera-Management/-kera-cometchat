import React from "react";
import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { CometChat } from "@cometchat-pro/chat";

import { getMessageSentTime } from "../../../util/common";
import { CometChatContext } from "../../../util/CometChatContext";
import { Check } from "phosphor-react";

import Translator from "../../../resources/localization/translator";
import { theme } from "../../../resources/theme";

import blueDoubleTick from "./resources/message-read.svg";
import greyDoubleTick from "./resources/message-delivered.svg";
import greyTick from "./resources/message-sent.svg";
import sendingTick from "./resources/wait.svg";
import errorTick from "./resources/warning-small.svg";

class CometChatReadReceipt extends React.PureComponent {
  static contextType = CometChatContext;
  loggedInUser;

  constructor(props, context) {
    super(props, context);
    this._isMounted = false;
    this.state = {
      receipts: false,
    };

    this.context.getLoggedinUser().then((user) => {
      this.loggedInUser = { ...user };
    });
  }

  componentDidMount() {
    this._isMounted = true;
    this.toggleReadReceipts();
  }

  componentDidUpdate() {
    this.toggleReadReceipts();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  toggleReadReceipts = () => {
    /**
     * if delivery receipts feature is disabled
     */
    this.context.FeatureRestriction.isDeliveryReceiptsEnabled()
      .then((response) => {
        if (response !== this.state.receipts && this._isMounted) {
          this.setState({ receipts: response });
        }
      })
      .catch((error) => {
        if (this.state.receipts !== false) {
          this.setState({ receipts: false });
        }
      });
  };

  render() {
    let ticks,
      receiptText = null,
      dateField = null,
      color = null;

    if (this.props.message?.sender?.uid === this.loggedInUser?.uid) {
      if (this.props.message.receiverType === CometChat.RECEIVER_TYPE.GROUP) {
        if (this.props.message.hasOwnProperty("error")) {
          ticks = errorTick;
          receiptText = "ERROR";
          dateField = this.props.message._composedAt;
          color = this.context.theme.color.red;
        } else {
          ticks = sendingTick;
          receiptText = "SENDING";
          dateField = this.props.message._composedAt;
          color = this.context.theme.secondaryTextColor;
          if (this.props.message.hasOwnProperty("sentAt")) {
            ticks = greyTick;
            receiptText = "SENT";
            dateField = this.props.message.sentAt;
          }
        }
      } else {
        if (this.props.message.hasOwnProperty("error")) {
          ticks = errorTick;
          receiptText = "ERROR";
          dateField = this.props.message._composedAt;
          color = this.context.theme.color.red;
        } else {
          ticks = sendingTick;
          receiptText = "SENDING";
          dateField = this.props.message._composedAt;
          color = this.context.theme.secondaryTextColor;

          if (this.props.message.hasOwnProperty("readAt")) {
            ticks = blueDoubleTick;
            receiptText = "SEEN";
            color = this.context.theme.primaryColor;
            dateField = this.props.message.readAt;
          } else if (this.props.message.hasOwnProperty("deliveredAt")) {
            ticks = greyDoubleTick;
            receiptText = "DELIVERED";
            dateField = this.props.message.deliveredAt;
          } else if (this.props.message.hasOwnProperty("sentAt")) {
            ticks = greyTick;
            receiptText = "SENT";
            dateField = this.props.message.sentAt;
          }
        }
      }
    } else {
      dateField = this.props.message.sentAt;
    }

    //if delivery receipts are disabled
    if (this.state.receipts === false) {
      ticks = null;
    }

    const receipt = ticks ? <Check size={12} weight="duotone" /> : null;

    const timestamp = getMessageSentTime(dateField, this.context.language);

    return (
      <React.Fragment>
        <Box
          as="span"
          className="message__timestamp"
          display="flex"
          fontSize="11px"
          fontWeight="500"
          lineHeight="12px"
          textTransform="uppercase"
          color={this.context.theme.color.search}
        >
          {timestamp}
        </Box>
        {receipt}
      </React.Fragment>
    );
  }
}

// Specifies the default values for props:
CometChatReadReceipt.defaultProps = {
  theme: theme,
};

CometChatReadReceipt.propTypes = {
  theme: PropTypes.object,
  message: PropTypes.object.isRequired,
};

export { CometChatReadReceipt };
