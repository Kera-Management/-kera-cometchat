import React from "react";
import { Box, Table, Tbody, Tfoot, Tr, Td, Input, Select, Button, Text } from "@chakra-ui/react";
import { CometChat } from "@cometchat-pro/chat";

import { CometChatBackdrop } from "../../Shared";

import { CometChatContext } from "../../../util/CometChatContext";
import * as enums from "../../../util/enums.js";
import Translator from "../../../resources/localization/translator";


import creatingIcon from "./resources/creating.svg";
import closeIcon from "./resources/close.svg";

class CometChatCreateGroup extends React.Component {
  static contextType = CometChatContext;

  constructor(props) {
    super(props);

    this.state = {
      errorMessage: "",
      passwordInput: false,
      name: "",
      type: "",
      password: "",
      creatingGroup: false,
      enablePublicGroup: false,
      enablePasswordGroup: false,
      enablePrivateGroup: false,
    };
  }

  componentDidMount() {
    this.enablePublicGroup();
    this.enablePasswordGroup();
    this.enablePrivateGroup();
  }

  componentDidUpdate() {
    this.enablePublicGroup();
    this.enablePasswordGroup();
    this.enablePrivateGroup();
  }

  enablePublicGroup = () => {
    this.context.FeatureRestriction.isPublicGroupEnabled()
      .then((response) => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enablePublicGroup) {
          this.setState({ enablePublicGroup: response });
        }
      })
      .catch((error) => {
        if (this.state.enablePublicGroup !== false) {
          this.setState({ enablePublicGroup: false });
        }
      });
  };

  enablePasswordGroup = () => {
    this.context.FeatureRestriction.isPasswordGroupEnabled()
      .then((response) => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enablePasswordGroup) {
          this.setState({ enablePasswordGroup: response });
        }
      })
      .catch((error) => {
        if (this.state.enablePasswordGroup !== false) {
          this.setState({ enablePasswordGroup: false });
        }
      });
  };

  enablePrivateGroup = () => {
    this.context.FeatureRestriction.isPrivateGroupEnabled()
      .then((response) => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enablePrivateGroup) {
          this.setState({ enablePrivateGroup: response });
        }
      })
      .catch((error) => {
        if (this.state.enablePrivateGroup !== false) {
          this.setState({ enablePrivateGroup: false });
        }
      });
  };

  passwordChangeHandler = (event) => {
    this.setState({ password: event.target.value });
  };

  nameChangeHandler = (event) => {
    this.setState({ name: event.target.value });
  };

  typeChangeHandler = (event) => {
    const type = event.target.value;
    this.setState({ type });

    if (type === CometChat.GROUP_TYPE.PASSWORD) {
      this.setState({ passwordInput: true });
    } else {
      this.setState({ passwordInput: false });
    }
  };

  validate = () => {
    const groupName = this.state.name.trim();
    const groupType = this.state.type.trim();

    if (!groupName) {
      this.setState({
        errorMessage: Translator.translate(
          "INVALID_GROUP_NAME",
          this.context.language
        ),
      });
      return false;
    }

    if (!groupType) {
      this.setState({
        errorMessage: Translator.translate(
          "INVALID_GROUP_TYPE",
          this.context.language
        ),
      });
      return false;
    }

    let password = "";
    if (groupType === CometChat.GROUP_TYPE.PASSWORD) {
      password = this.state.password;

      if (!password.length) {
        this.setState({
          errorMessage: Translator.translate(
            "INVALID_PASSWORD",
            this.context.language
          ),
        });
        return false;
      }
    }
    return true;
  };

  createGroup = () => {
    if (!this.validate()) {
      return false;
    }

    this.setState({ creatingGroup: true });

    const groupType = this.state.type.trim();

    const password = this.state.password;
    const guid = "group_" + new Date().getTime();
    const name = this.state.name.trim();
    let type = CometChat.GROUP_TYPE.PUBLIC;

    switch (groupType) {
      case "public":
        type = CometChat.GROUP_TYPE.PUBLIC;
        break;
      case "private":
        type = CometChat.GROUP_TYPE.PRIVATE;
        break;
      case "password":
        type = CometChat.GROUP_TYPE.PASSWORD;
        break;
      default:
        break;
    }

    const group = new CometChat.Group(guid, name, type, password);
    CometChat.createGroup(group)
      .then((newGroup) => {
        this.setState({ creatingGroup: false });

        if (typeof newGroup === "object" && Object.keys(newGroup).length) {
          this.context.setToastMessage("success", "GROUP_CREATION_SUCCESS");
          this.setState({
            name: "",
            type: "",
            password: "",
            passwordInput: "",
          });
          this.props.actionGenerated(enums.ACTIONS["GROUP_CREATED"], newGroup);
        } else {
          this.setState({
            errorMessage: Translator.translate(
              "SOMETHING_WRONG",
              this.context.language
            ),
          });
        }
      })
      .catch((error) => {
        this.setState({
          creatingGroup: false,
          errorMessage: Translator.translate(
            "SOMETHING_WRONG",
            this.context.language
          ),
        });
      });
  };

  populateGroupType = () => {};

  render() {
    const groupTypes = {};
    let groupTypeSelect = null;

    if (this.state.enablePublicGroup === true) {
      groupTypes[CometChat.GROUP_TYPE.PUBLIC] = Translator.translate(
        "PUBLIC",
        this.context.language
      );
    }

    if (this.state.enablePasswordGroup === true) {
      groupTypes[CometChat.GROUP_TYPE.PASSWORD] = Translator.translate(
        "PASSWORD_PROTECTED",
        this.context.language
      );
    }

    if (this.state.enablePrivateGroup === true) {
      groupTypes[CometChat.GROUP_TYPE.PRIVATE] = Translator.translate(
        "PRIVATE",
        this.context.language
      );
    }

    const groupTypeKeys = Object.keys(groupTypes);
    if (groupTypeKeys.length) {
      const groupTypeListOptions = groupTypeKeys.map((groupTypeKey) => {
        return (
          <option value={groupTypeKey} key={groupTypeKey}>
            {groupTypes[groupTypeKey]}
          </option>
        );
      });

      if (groupTypeKeys.length > 1) {
        groupTypeSelect = (
          <Tr>
            <Td>
              <Select
                className="grouptype"
                onChange={this.typeChangeHandler}
                value={this.state.type}
                tabIndex="2"
                display="block"
                width="100%"
                border="0"
                boxShadow="rgba(20, 20, 20, 0.04) 0 0 0 1px inset"
                borderRadius="8px"
                backgroundColor={this.context.theme.backgroundColor.grey}
                color={this.context.theme.color.helpText}
                fontSize="14px"
              >
                <option value="">
                  {Translator.translate(
                    "SELECT_GROUP_TYPE",
                    this.context.language
                  )}
                </option>
                {groupTypeListOptions}
              </Select>
            </Td>
          </Tr>
        );
      } else {
        groupTypeSelect = (
          <Tr>
            <Td>
              <Select
                className="grouptype"
                onChange={this.typeChangeHandler}
                value={this.state.type}
                tabIndex="2"
                display="block"
                width="100%"
                border="0"
                boxShadow="rgba(20, 20, 20, 0.04) 0 0 0 1px inset"
                borderRadius="8px"
                backgroundColor={this.context.theme.backgroundColor.grey}
                color={this.context.theme.color.helpText}
                fontSize="14px"
              >
                {groupTypeListOptions}
              </Select>
            </Td>
          </Tr>
        );
      }
    }

    let password = null;
    if (this.state.passwordInput) {
      password = (
        <Tr>
          <Td>
            <Input
              autoComplete="off"
              placeholder={Translator.translate(
                "ENTER_GROUP_PASSWORD",
                this.context.language
              )}
              type="password"
              tabIndex="3"
              onChange={this.passwordChangeHandler}
              value={this.state.password}
              display="block"
              width="100%"
              border="0"
              boxShadow="rgba(20, 20, 20, 0.04) 0 0 0 1px inset"
              borderRadius="8px"
              backgroundColor={this.context.theme.backgroundColor.grey}
              color={this.context.theme.color.helpText}
              fontSize="14px"
            />
          </Td>
        </Tr>
      );
    }

    const createText = this.state.creatingGroup
      ? Translator.translate("CREATING", this.context.language)
      : Translator.translate("CREATE", this.context.language);

    return (
      <React.Fragment>
        <CometChatBackdrop show={true} clicked={this.props.close} />
        <Box
          className="modal__creategroup"
          minWidth="350px"
          minHeight="350px"
          width="40%"
          height="40%"
          overflow="hidden"
          backgroundColor={this.context.theme.backgroundColor.white}
          position="fixed"
          left="50%"
          top="50%"
          transform="translate(-50%, -50%)"
          zIndex={4}
          margin="0 auto"
          boxShadow="rgba(20, 20, 20, 0.2) 0 16px 32px, rgba(20, 20, 20, 0.04) 0 0 0 1px"
          borderRadius="12px"
          display="block"
          sx={{
            [this.context.theme.breakPoints[0]]: {
              width: "100%",
              height: "100%",
            },
          }}
        >
          <Box
            className="modal__close"
            position="absolute"
            width="32px"
            height="32px"
            borderRadius="50%"
            top="16px"
            right="16px"
            sx={{
              mask: `url(${closeIcon}) center center no-repeat`,
              backgroundColor: this.context.theme.primaryColor,
            }}
            cursor="pointer"
            onClick={this.props.close}
            title={Translator.translate("CLOSE", this.context.language)}
          />
          <Box className="modal__body" p={6} height="100%" width="100%">
            <Table
              borderCollapse="collapse"
              m={0}
              p={0}
              width="100%"
              height="90%"
              sx={{
                "tr": {
                  display: "table",
                  width: "100%",
                  tableLayout: "fixed",
                },
              }}
            >
              <Text
                as="caption"
                className="modal__title"
                fontSize="20px"
                mb={4}
                fontWeight="bold"
                textAlign="left"
              >
                {Translator.translate(
                  "CREATE_GROUP",
                  this.context.language
                )}
              </Text>
              <Tbody
                className="modal__search"
                height="calc(100% - 40px)"
                overflowY="auto"
                display="block"
                sx={{
                  "tr": {
                    "td": {
                      padding: "8px 0",
                      fontSize: "14px",
                      "input": {
                        width: "100%",
                        border: "none",
                        padding: "8px 16px",
                        fontSize: "14px",
                        outline: "none",
                      },
                      "select": {
                        outline: "none",
                        padding: "8px 16px",
                      },
                    },
                  },
                }}
              >
                <Tr>
                  <Td>
                    <Box
                      fontSize="12px"
                      color={this.context.theme.color.red}
                      textAlign="center"
                      margin="8px 0"
                      width="100%"
                    >
                      {this.state.errorMessage}
                    </Box>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Input
                      autoComplete="off"
                      className="search__input"
                      placeholder={Translator.translate(
                        "ENTER_GROUP_NAME",
                        this.context.language
                      )}
                      type="text"
                      tabIndex="1"
                      onChange={this.nameChangeHandler}
                      value={this.state.name}
                      display="block"
                      width="100%"
                      border="0"
                      boxShadow="rgba(20, 20, 20, 0.04) 0 0 0 1px inset"
                      borderRadius="8px"
                      backgroundColor={this.context.theme.backgroundColor.grey}
                      color={this.context.theme.color.helpText}
                      fontSize="14px"
                    />
                  </Td>
                </Tr>
                {groupTypeSelect}
                {password}
              </Tbody>
              <Tfoot
                display="inline-block"
                sx={{
                  "tr": {
                    border: "none",
                    "td": {
                      textAlign: "center",
                    },
                  },
                }}
              >
                <Tr className="creategroup">
                  <Td>
                    <Button
                      type="button"
                      tabIndex="4"
                      onClick={this.createGroup}
                      cursor="pointer"
                      p="8px 16px"
                      backgroundColor={this.context.theme.primaryColor}
                      borderRadius="5px"
                      color={this.context.theme.color.white}
                      fontSize="14px"
                      outline="0"
                      border="0"
                      sx={{
                        ...(this.state.creatingGroup
                          ? {
                              disabled: "true",
                              pointerEvents: "none",
                              background: `url(${creatingIcon}) no-repeat right 10px center ${this.context.theme.primaryColor}`,
                            }
                          : {}),
                      }}
                    >
                      <Text
                        sx={{
                          ...(this.state.creatingGroup
                            ? { marginRight: "24px" }
                            : {}),
                        }}
                      >
                        {createText}
                      </Text>
                    </Button>
                  </Td>
                </Tr>
              </Tfoot>
            </Table>
          </Box>
        </Box>
      </React.Fragment>
    );
  }
}

export { CometChatCreateGroup };
