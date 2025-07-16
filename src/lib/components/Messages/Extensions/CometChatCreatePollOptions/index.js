import { useContext } from "react";
import { Box } from "@chakra-ui/react";

import { CometChatContext } from "../../../../util/CometChatContext";

import Translator from "../../../../resources/localization/translator";

import removeIcon from "./resources/remove.svg";

const CometChatCreatePollOptions = (props) => {
  const context = useContext(CometChatContext);

  return (
    <tr className="poll__options">
      <td>&nbsp;</td>
      <td>
        <input
          autoFocus
          tabIndex={props.tabIndex}
          type="text"
          autoComplete="off"
          placeholder={Translator.translate(
            "ENTER_YOUR_OPTION",
            context.language
          )}
          value={props.value}
          onChange={(event) => props.optionChangeHandler(event, props.option)}
        />
      </td>
      <Box as="td" width="50px" className="option__remove">
        <Box
          as="span"
          cursor="pointer"
          display="block"
          height="24px"
          width="24px"
          sx={{
            mask: `url(${removeIcon}) center center no-repeat`,
            backgroundColor: context.theme.color.red,
          }}
          onClick={() => props.removePollOption(props.option)}
        ></Box>
      </Box>
    </tr>
  );
};

export { CometChatCreatePollOptions };
