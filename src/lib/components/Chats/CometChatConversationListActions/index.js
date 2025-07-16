import React from "react";
import { Box, Button, List, ListItem } from "@chakra-ui/react";

import { CometChatContext } from "../../../util/CometChatContext";
import * as enums from "../../../util/enums.js";

import Translator from "../../../resources/localization/translator";

import loadingIcon from "./resources/progress.svg";
import deleteIcon from "./resources/delete.svg";

class CometChatConversationListActions extends React.PureComponent {
  static contextType = CometChatContext;

  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      deleteInProgress: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  toggleTooltip = (event, flag) => {
    const elem = event.target;

    if (flag) {
      elem.setAttribute("title", elem.dataset.title);
    } else {
      elem.removeAttribute("title");
    }
  };

  deleteConversation = (event) => {
    this.props.actionGenerated(
      enums.ACTIONS["DELETE_CONVERSATION"],
      this.props.conversation
    );
    event.stopPropagation();
  };

  render() {
    const backgroundImage = this.state.deleteInProgress ? loadingIcon : deleteIcon;

    const deleteConversation = (
      <ListItem>
        <Button
          variant="unstyled"
          height="24px"
          width="24px"
          borderRadius="4px"
          className="group__button button__delete"
          data-title={Translator.translate("DELETE", this.context.language)}
          onMouseEnter={(event) => this.toggleTooltip(event, true)}
          onMouseLeave={(event) => this.toggleTooltip(event, false)}
          onClick={this.deleteConversation}
          sx={{
            background: `url(${backgroundImage}) center center no-repeat`,
          }}
        />
      </ListItem>
    );

    return (
      <List
        display="flex"
        listStyleType="none"
        padding="8px"
        margin="0"
        width="72px"
        backgroundColor={this.context.theme.backgroundColor.primary}
        borderRadius="4px"
        alignItems="center"
        justifyContent="flex-end"
        position="absolute"
        right="16px"
        height="100%"
        className="list__item__actions"
      >
        {deleteConversation}
      </List>
    );
  }
}

export { CometChatConversationListActions };
