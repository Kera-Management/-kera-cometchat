import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Text, Button, Input, Table, Thead, Tbody, Tfoot, Tr, Td, Th, TableCaption, Icon } from "@chakra-ui/react";
import { CometChat } from "@cometchat-pro/chat";

import { CometChatBackdrop } from "../../../Shared";
import { CometChatCreatePollOptions } from "..";

import { CometChatContext } from "../../../../util/CometChatContext";
import * as enums from "../../../../util/enums.js";

import { theme } from "../../../../resources/theme";
import Translator from "../../../../resources/localization/translator";

import creatingIcon from "./resources/creating.svg";
import addIcon from "./resources/add-circle-filled.svg";
import clearIcon from "./resources/close.svg";

class CometChatCreatePoll extends React.Component {
  loggedInUser = null;
  static contextType = CometChatContext;

  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      options: [],
      creatingPoll: false,
    };

    this.questionRef = React.createRef();
    this.optionOneRef = React.createRef();
    this.optionTwoRef = React.createRef();
    this.optionRef = React.createRef();
  }

  addPollOption = () => {
    const options = [...this.state.options];
    options.push({ value: "", id: new Date().getTime() });
    this.setState({ options: options });
  };

  removePollOption = (option) => {
    const options = [...this.state.options];
    const optionKey = options.findIndex((opt) => opt.id === option.id);
    if (optionKey > -1) {
      options.splice(optionKey, 1);
      this.setState({ options: options });
    }
  };

  optionChangeHandler = (event, option) => {
    const options = [...this.state.options];
    const optionKey = options.findIndex((opt) => opt.id === option.id);
    if (optionKey > -1) {
      const newOption = { ...option, value: event.target.value };
      options.splice(optionKey, 1, newOption);
      this.setState({ options: options });
    }
  };

  createPoll = () => {
    const question = this.questionRef.current.value.trim();
    const firstOption = this.optionOneRef.current.value.trim();
    const secondOption = this.optionTwoRef.current.value.trim();
    const optionItems = [firstOption, secondOption];

    if (question.length === 0) {
      this.setState({
        errorMessage: Translator.translate(
          "INVALID_POLL_QUESTION",
          this.context.language
        ),
      });
      return false;
    }

    if (firstOption.length === 0 || secondOption.length === 0) {
      this.setState({
        errorMessage: Translator.translate(
          "INVALID_POLL_OPTION",
          this.context.language
        ),
      });
      return false;
    }

    this.state.options.forEach(function (option) {
      optionItems.push(option.value);
    });

    let receiverId;
    let receiverType = this.context.type;
    if (this.context.type === CometChat.RECEIVER_TYPE.USER) {
      receiverId = this.context.item.uid;
    } else if (this.context.type === CometChat.RECEIVER_TYPE.GROUP) {
      receiverId = this.context.item.guid;
    }

    this.setState({ creatingPoll: true, errorMessage: "" });

    CometChat.callExtension("polls", "POST", "v2/create", {
      question: question,
      options: optionItems,
      receiver: receiverId,
      receiverType: receiverType,
    })
      .then((response) => {
        if (
          response &&
          response.hasOwnProperty("success") &&
          response["success"] === true
        ) {
          this.setState({ creatingPoll: false });
          this.props.actionGenerated(enums.ACTIONS["POLL_CREATED"]);
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
        this.setState({ creatingPoll: false });
        this.setState({
          errorMessage: Translator.translate(
            "SOMETHING_WRONG",
            this.context.language
          ),
        });
      });
  };

  render() {
    const optionList = [...this.state.options];
    const pollOptionView = optionList.map((option, index) => {
      return (
        <CometChatCreatePollOptions
          key={index}
          option={option}
          tabIndex={index + 4}
          lang={this.context.language}
          optionChangeHandler={this.optionChangeHandler}
          removePollOption={this.removePollOption}
        />
      );
    });

    const createText = this.state.creatingPoll
      ? Translator.translate("CREATING", this.context.language)
      : Translator.translate("CREATE", this.context.language);
    return (
      <React.Fragment>
        <CometChatBackdrop show={true} clicked={this.props.close} />
        <Box
          className="modal__createpoll"
          minWidth="350px"
          minHeight="450px"
          width="50%"
          height="40%"
          overflow="hidden"
          backgroundColor={this.context.theme.backgroundColor.white}
          position="fixed"
          left="50%"
          top="50%"
          transform="translate(-50%, -50%)"
          zIndex="1002"
          margin="0 auto"
          boxShadow="rgba(20, 20, 20, 0.2) 0 16px 32px, rgba(20, 20, 20, 0.04) 0 0 0 1px"
          borderRadius="12px"
          display="block"
          sx={{
            [`@media ${this.context.theme.breakPoints[1]}, ${this.context.theme.breakPoints[2]}`]: {
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
            cursor="pointer"
            title={Translator.translate("CLOSE", this.context.language)}
            onClick={this.props.close}
            sx={{
              mask: `url(${clearIcon}) center center no-repeat`,
              backgroundColor: this.context.theme.primaryColor,
            }}
          />
          <Box className="modal__body" padding="24px" height="100%" width="100%">
            <Table
              borderCollapse="collapse"
              margin="0"
              padding="0"
              width="100%"
              height="90%"
              sx={{
                tr: {
                  borderBottom: `1px solid ${this.context.theme.borderColor.primary}`,
                  display: "table",
                  width: "100%",
                  tableLayout: "fixed",
                },
              }}
            >
              <TableCaption
                className="modal__title"
                fontSize="20px"
                marginBottom="15px"
                fontWeight="bold"
                textAlign="left"
                placement="top"
              >
                {Translator.translate("CREATE_POLL", this.context.language)}
              </TableCaption>
              <Tbody
                height="calc(100% - 40px)"
                overflowY="auto"
                display="block"
                sx={{
                  "tr": {
                    "td": {
                      padding: "8px 16px",
                      fontSize: "14px",
                      "input": {
                        width: "100%",
                        border: "none",
                        padding: "8px 16px",
                        fontSize: "14px",
                        "&:focus": {
                          outline: "none"
                        }
                      },
                      "label": {
                        padding: "8px 16px", 
                      },
                      ":first-of-type": {
                        width: "120px"
                      }
                    }
                  }
                }}
              >
                <Tr className="error">
                  <Td colSpan={3}>
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
                <Tr className="poll__question">
                  <Td>
                    <Text as="label">
                      {Translator.translate("QUESTION", this.context.language)}
                    </Text>
                  </Td>
                  <Td colSpan={2}>
                    <Input
                      type="text"
                      autoFocus
                      tabIndex={1}
                      placeholder={Translator.translate(
                        "ENTER_YOUR_QUESTION",
                        this.context.language
                      )}
                      ref={this.questionRef}
                      variant="unstyled"
                    />
                  </Td>
                </Tr>
                <Tr className="poll__options">
                  <Td>
                    <Text as="label">
                      {Translator.translate("OPTIONS", this.context.language)}
                    </Text>
                  </Td>
                  <Td colSpan={2}>
                    <Input
                      type="text"
                      tabIndex={2}
                      placeholder={Translator.translate(
                        "ENTER_YOUR_OPTION",
                        this.context.language
                      )}
                      ref={this.optionOneRef}
                      variant="unstyled"
                    />
                  </Td>
                </Tr>
                <Tr ref={this.optionRef} className="poll__options">
                  <Td>&nbsp;</Td>
                  <Td colSpan={2}>
                    <Input
                      type="text"
                      tabIndex={3}
                      placeholder={Translator.translate(
                        "ENTER_YOUR_OPTION",
                        this.context.language
                      )}
                      ref={this.optionTwoRef}
                      variant="unstyled"
                    />
                  </Td>
                </Tr>
                {pollOptionView}
                <Tr>
                  <Td>&nbsp;</Td>
                  <Td>
                    <Text as="label">
                      {Translator.translate(
                        "ADD_NEW_OPTION",
                        this.context.language
                      )}
                    </Text>
                  </Td>
                  <Td width="50px">
                    <Box
                      tabIndex={100}
                      className="option__add"
                      backgroundSize="28px 28px"
                      cursor="pointer"
                      display="block"
                      height="24px"
                      width="24px"
                      onClick={this.addPollOption}
                      sx={{
                        mask: `url(${addIcon}) center center no-repeat`,
                        backgroundColor: this.context.theme.secondaryTextColor,
                      }}
                    />
                  </Td>
                </Tr>
              </Tbody>
              <Tfoot
                display="inline-block"
                sx={{
                  tr: {
                    border: "none",
                    td: {
                      textAlign: "center",
                      button: {
                        cursor: "pointer",
                        padding: "8px 16px",
                        backgroundColor: this.context.theme.primaryColor,
                        borderRadius: "5px",
                        color: this.context.theme.color.white,
                        fontSize: "14px",
                        outline: "0",
                        border: "0",
                        ...(this.state.creatingPoll ? {
                          disabled: "true",
                          pointerEvents: "none",
                          background: `url(${creatingIcon}) no-repeat right 10px center ${this.context.theme.primaryColor}`,
                        } : {}),
                        span: {
                          ...(this.state.creatingPoll ? {
                            marginRight: "24px",
                          } : {}),
                        },
                      },
                    },
                  },
                }}
              >
                <Tr className="createpoll">
                  <Td colSpan={2}>
                    <Button 
                      type="button" 
                      onClick={this.createPoll}
                      variant="unstyled"
                      sx={{
                        cursor: "pointer",
                        padding: "8px 16px",
                        backgroundColor: this.context.theme.primaryColor,
                        borderRadius: "5px",
                        color: this.context.theme.color.white,
                        fontSize: "14px",
                        outline: "0",
                        border: "0",
                        ...(this.state.creatingPoll ? {
                          disabled: "true",
                          pointerEvents: "none",
                          background: `url(${creatingIcon}) no-repeat right 10px center ${this.context.theme.primaryColor}`,
                        } : {}),
                      }}
                    >
                      <Text
                        sx={{
                          ...(this.state.creatingPoll ? {
                            marginRight: "24px",
                          } : {}),
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

// Specifies the default values for props:
CometChatCreatePoll.defaultProps = {
  theme: theme,
};

CometChatCreatePoll.propTypes = {
  theme: PropTypes.object,
};

export { CometChatCreatePoll };
