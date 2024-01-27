import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import "jest-canvas-mock";

import { CometChatContextProvider } from "../../../util/CometChatContext";
import { CometChatConversationListItem } from "./";

describe("CometChatConversationListItem", () => {
  jest.mock("@cometchat-pro/chat", () => {
    return {
      CometChat: {
        init: jest.fn().mockResolvedValue(true),
        // Add other methods as needed
      },
    };
  });
  let container = null;

  it("renders without crashing", () => {
    container = document.createElement("div");
    ReactDOM.render(
      <CometChatContextProvider user="">
        <CometChatConversationListItem />
      </CometChatContextProvider>,
      container
    );
  });
});
