import React from "react";
import { Box, Flex, Text, Select, Icon } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { CometChat } from "@cometchat-pro/chat";

import { CometChatAvatar, CometChatUserPresence } from "../../Shared";

import { CometChatContext } from "../../../util/CometChatContext";
import * as enums from "../../../util/enums.js";

import Translator from "../../../resources/localization/translator";

import scopeIcon from "./resources/edit.svg";
import doneIcon from "./resources/done.svg";
import clearIcon from "./resources/close.svg";
import banIcon from "./resources/ban-member.svg";
import kickIcon from "./resources/delete.svg";

class CometChatViewGroupMemberListItem extends React.Component {
  static contextType = CometChatContext;

  constructor(props, context) {
    super(props, context);

    this.changeScopeDropDown = (
      <select
        className="members-scope-select"
        onChange={this.scopeChangeHandler}
        defaultValue={this.props.member.scope}
      ></select>
    );

    this.state = {
      showChangeScope: false,
      scope: null,
    };

    this.roles = context.roles;
  }

  toggleChangeScope = (flag) => {
    this.setState({ showChangeScope: flag });
  };

  scopeChangeHandler = (event) => {
    this.setState({ scope: event.target.value });
  };

  updateMemberScope = () => {
    this.props.actionGenerated(
      enums.ACTIONS["CHANGE_SCOPE_GROUP_MEMBER"],
      this.props.member,
      this.state.scope
    );
    this.toggleChangeScope();
  };

  toggleTooltip = (event, flag) => {
    const elem = event.currentTarget;

    if (elem.classList.contains("name")) {
      const scrollWidth = elem.scrollWidth;
      const clientWidth = elem.clientWidth;

      if (scrollWidth <= clientWidth) {
        return false;
      }
    }

    if (flag) {
      elem.setAttribute("title", this.props.member.name);
    } else {
      elem.removeAttribute("title");
    }
  };

  render() {
    let editClassName = "";

    let name = this.props.member.name;
    let scope = (
      <Text fontSize="12px" maxWidth="calc(100% - 20px)">
        {this.context.roles[this.props.member.scope]}
      </Text>
    );
    let changescope = null;
    let ban = (
      <Box
        as="i"
        width="24px"
        height="24px"
        display="inline-block"
        cursor="pointer"
        title={Translator.translate("BAN", this.context.language)}
        onClick={() => {
          this.props.actionGenerated(
            enums.ACTIONS["BAN_GROUP_MEMBER"],
            this.props.member
          );
        }}
        sx={{
          mask: `url(${banIcon}) center center no-repeat`,
          backgroundColor: this.context.theme.secondaryTextColor,
        }}
      />
    );
    let kick = (
      <Box
        as="i"
        width="24px"
        height="24px"
        display="inline-block"
        cursor="pointer"
        title={Translator.translate("KICK", this.context.language)}
        onClick={() => {
          this.props.actionGenerated(
            enums.ACTIONS["KICK_GROUP_MEMBER"],
            this.props.member
          );
        }}
        sx={{
          background: `url(${kickIcon}) center center no-repeat`,
        }}
      />
    );

    if (this.state.showChangeScope) {
      let options = (
        <React.Fragment>
          <option value={CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT}>
            {this.context.roles[CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT]}
          </option>
          <option value={CometChat.GROUP_MEMBER_SCOPE.MODERATOR}>
            {this.context.roles[CometChat.GROUP_MEMBER_SCOPE.MODERATOR]}
          </option>
          <option value={CometChat.GROUP_MEMBER_SCOPE.ADMIN}>
            {this.context.roles[CometChat.GROUP_MEMBER_SCOPE.ADMIN]}
          </option>
        </React.Fragment>
      );

      if (
        this.context.item.scope === CometChat.GROUP_MEMBER_SCOPE.MODERATOR &&
        this.props.member.scope === CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT
      ) {
        options = (
          <React.Fragment>
            <option value={CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT}>
              {this.context.roles[CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT]}
            </option>
            <option value={CometChat.GROUP_MEMBER_SCOPE.MODERATOR}>
              {this.context.roles[CometChat.GROUP_MEMBER_SCOPE.MODERATOR]}
            </option>
          </React.Fragment>
        );
      }

      changescope = (
        <Flex
          className="scope__wrapper"
          direction="row"
          align="center"
          justify="center"
          width="100%"
          transition="opacity .1s linear"
        >
          <Select
            className="scope__select"
            width="65%"
            border="0"
            boxShadow="rgba(20, 20, 20, 0.04) 0 0 0 1px inset"
            borderRadius="8px"
            backgroundColor="rgba(20, 20, 20, 0.04)"
            padding="8px"
            color="rgba(20, 20, 20, 0.6)"
            float="left"
            onChange={this.scopeChangeHandler}
            defaultValue={this.props.member.scope}
          >
            {options}
          </Select>
          <Box
            as="i"
            width="24px"
            height="24px"
            display="inline-block"
            cursor="pointer"
            margin="0px 4px"
            title={Translator.translate("CHANGE_SCOPE", this.context.language)}
            onClick={this.updateMemberScope}
            sx={{
              mask: `url(${doneIcon}) center center no-repeat`,
              backgroundColor: this.context.theme.secondaryTextColor,
            }}
          />
          <Box
            as="i"
            width="24px"
            height="24px"
            display="inline-block"
            cursor="pointer"
            margin="0px 4px"
            title={Translator.translate("CHANGE_SCOPE", this.context.language)}
            onClick={() => this.toggleChangeScope(false)}
            sx={{
              mask: `url(${clearIcon}) center center no-repeat`,
              backgroundColor: this.context.theme.secondaryTextColor,
            }}
          />
        </Flex>
      );
    } else {
      if (
        this.context.item.scope === CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT
      ) {
        changescope = scope;
      } else {
        changescope = (
          <React.Fragment>
            {scope}
            <Box
              as="i"
              width="24px"
              height="24px"
              display="inline-block"
              cursor="pointer"
              title={Translator.translate(
                "CHANGE_SCOPE",
                this.context.language
              )}
              onClick={() => this.toggleChangeScope(true)}
              sx={{
                mask: `url(${scopeIcon}) center center no-repeat`,
                backgroundColor: this.context.theme.secondaryTextColor,
              }}
            />
          </React.Fragment>
        );
      }
    }

    //disable change scope, kick, ban of group owner
    if (this.context.item.owner === this.props.member.uid) {
      scope = (
        <Text fontSize="12px" maxWidth="calc(100% - 20px)">
          {Translator.translate("OWNER", this.context.language)}
        </Text>
      );
      changescope = scope;
      ban = null;
      kick = null;
    }

    //disable change scope, kick, ban of self
    if (this.props.loggedinuser.uid === this.props.member.uid) {
      name = Translator.translate("YOU", this.context.language);
      changescope = scope;
      ban = null;
      kick = null;
    }

    //if the loggedin user is moderator, don't allow to change scope, ban, kick group moderators or administrators
    if (
      this.context.item.scope === CometChat.GROUP_MEMBER_SCOPE.MODERATOR &&
      (this.props.member.scope === CometChat.GROUP_MEMBER_SCOPE.ADMIN ||
        this.props.member.scope === CometChat.GROUP_MEMBER_SCOPE.MODERATOR)
    ) {
      changescope = scope;
      ban = null;
      kick = null;
    }

    //if the loggedin user is administrator but not group owner, don't allow to change scope, ban, kick group administrators
    if (
      this.context.item.scope === CometChat.GROUP_MEMBER_SCOPE.ADMIN &&
      this.context.item.owner !== this.props.loggedinuser.uid &&
      this.props.member.scope === CometChat.GROUP_MEMBER_SCOPE.ADMIN
    ) {
      changescope = scope;
      ban = null;
      kick = null;
    }

    let editAccess = null;
    //if the loggedin user is participant, don't show the option to change scope, ban, or kick group members
    if (this.context.item.scope === CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT) {
      editAccess = null;
      editClassName = "true";
    } else {
      editAccess = (
        <React.Fragment>
          <Box 
            className="ban"
            width={{ base: "40px", md: "40px", lg: "70px" }}
          >
            {ban}
          </Box>
          <Box 
            className="kick"
            width={{ base: "40px", md: "40px", lg: "70px" }}
          >
            {kick}
          </Box>
        </React.Fragment>
      );

      /**
       * if kick and ban feature is disabled
       */
      if (
        this.props.enableBanGroupMembers === false &&
        this.props.enableKickGroupMembers === false
      ) {
        editAccess = null;
      } else if (this.props.enableBanGroupMembers === false) {
        //if ban feature is disabled
        editAccess = (
          <Box 
            className="kick"
            width={{ base: "40px", md: "40px", lg: "70px" }}
          >
            {kick}
          </Box>
        );
      } else if (this.props.enableKickGroupMembers === false) {
        //if kick feature is disabled
        editAccess = (
          <Box 
            className="ban"
            width={{ base: "40px", md: "40px", lg: "70px" }}
          >
            {ban}
          </Box>
        );
      }

      /**
       * if promote_demote_members feature is disabled
       */
      if (this.props.enableChangeScope === false) {
        changescope = scope;
      }
    }

    let userPresence = (
      <CometChatUserPresence status={this.props.member.status} />
    );

    const isParticipantView = editClassName === "true";

    return (
      <Flex
        className="content__row"
        borderLeft={`1px solid ${this.context.theme.borderColor.primary}`}
        borderRight={`1px solid ${this.context.theme.borderColor.primary}`}
        borderBottom={`1px solid ${this.context.theme.borderColor.primary}`}
        width="100%"
        fontSize="14px"
        direction="row"
        justify="flex-start"
        align="center"
        padding="8px"
      >
        <Flex
          className="userinfo"
          direction="row"
          justify="flex-start"
          align="center"
          width={isParticipantView ? {
            base: "calc(100% - 140px)",
            sm: "calc(100% - 140px)",
            md: "calc(100% - 180px)"
          } : {
            base: "calc(100% - 240px)",
            sm: "calc(100% - 220px)",
            md: "calc(100% - 260px)",
            lg: "calc(100% - 260px)"
          }}
        >
          <Box
            className="thumbnail"
            width="36px"
            height="36px"
            flexShrink="0"
            marginRight={{ base: isParticipantView ? "8px" : "0", md: "8px" }}
            onMouseEnter={(event) => this.toggleTooltip(event, true)}
            onMouseLeave={(event) => this.toggleTooltip(event, false)}
          >
            <CometChatAvatar user={this.props.member} />
            {userPresence}
          </Box>
          <Text
            className="name"
            margin="8px 0"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            width={isParticipantView ? "100%" : "calc(100% - 50px)"}
            display={{ base: isParticipantView ? "inline" : "none", sm: "inline" }}
            onMouseEnter={(event) => this.toggleTooltip(event, true)}
            onMouseLeave={(event) => this.toggleTooltip(event, false)}
          >
            {name}
          </Text>
        </Flex>
        <Flex
          className="scope"
          direction="row"
          align="center"
          justify="flex-start"
          width={{
            base: "120px",
            sm: "140px",
            md: "180px",
            lg: "180px"
          }}
          sx={{
            "img": {
              width: "24px",
              height: "24px",
              cursor: "pointer",
            }
          }}
        >
          {changescope}
        </Flex>
        {editAccess}
      </Flex>
    );
  }
}

// Specifies the default values for props:
CometChatViewGroupMemberListItem.defaultProps = {
  loggedinuser: {},
  enableChangeScope: false,
};

CometChatViewGroupMemberListItem.propTypes = {
  loggedinuser: PropTypes.shape(CometChat.User),
  enableChangeScope: PropTypes.bool,
};

export { CometChatViewGroupMemberListItem };
