import React from "react";
import PropTypes from "prop-types";
import { CometChat } from "@cometchat-pro/chat";
import {
  Plus,
  FilePlus,
  FileVideo,
  FileAudio,
  FileImage,
  Heart,
  SmileySticker,
  PaperPlaneRight,
} from "phosphor-react";
import { Box, Flex, Input, Button, keyframes } from "@chakra-ui/react";

import {
  CometChatSmartReplyPreview,
  CometChatCreatePoll,
  CometChatStickerKeyboard,
} from "../Extensions";
import { CometChatEmojiKeyboard } from "..";

import { CometChatContext } from "../../../util/CometChatContext";
import {
  checkMessageForExtensionsData,
  ID,
  getUnixTimestamp,
} from "../../../util/common";
import * as enums from "../../../util/enums.js";
import { SoundManager } from "../../../util/SoundManager";

import { theme } from "../../../resources/theme";
import Translator from "../../../resources/localization/translator";

import roundedPlus from "./resources/add-circle-filled.svg";
import videoIcon from "./resources/video.svg";
import audioIcon from "./resources/audio-file.svg";
import docIcon from "./resources/file-upload.svg";
import imageIcon from "./resources/image.svg";
import insertEmoticon from "./resources/emoji.svg";
import sendBlue from "./resources/send-message.svg";
import pollIcon from "./resources/polls.svg";
import stickerIcon from "./resources/stickers.svg";
import closeIcon from "./resources/close.svg";
import documentIcon from "./resources/collaborative-document.svg";
import whiteboardIcon from "./resources/collaborative-whiteboard.svg";
import heartIcon from "./resources/heart.png";

class CometChatMessageComposer extends React.PureComponent {
  static contextType = CometChatContext;

  constructor(props) {
    super(props);

    this.imageUploaderRef = React.createRef();
    this.fileUploaderRef = React.createRef();
    this.audioUploaderRef = React.createRef();
    this.videoUploaderRef = React.createRef();
    this.messageInputRef = React.createRef();
    this.liveReactionInProgress = false;
    this.isTyping = false;

    this.state = {
      showFilePicker: false,
      messageInput: "",
      messageType: "",
      emojiViewer: false,
      createPoll: false,
      messageToBeEdited: "",
      replyPreview: null,
      stickerViewer: false,
      messageToReact: "",
      shareDocument: false,
      shareWhiteboard: false,
      enableLiveReaction: false,
      enablePolls: false,
      enableTypingIndicator: false,
      enableStickers: false,
      enablePhotosVideos: false,
      enableFiles: false,
      enableEmojis: false,
      enableCollaborativeDocument: false,
      enableCollaborativeWhiteboard: false,
    };
  }

  componentDidMount() {
    CometChat.getLoggedinUser()
      .then((user) => (this.loggedInUser = user))
      .catch((error) =>
        this.props.actionGenerated(
          enums.ACTIONS["ERROR"],
          [],
          "SOMETHING_WRONG"
        )
      );

    this.item =
      this.context.type === CometChat.ACTION_TYPE.TYPE_USER ||
      this.context.type === CometChat.ACTION_TYPE.TYPE_GROUP
        ? this.context.item
        : null;
    this.enableLiveReaction();
    this.enablePolls();
    this.enableTypingIndicator();
    this.enableStickers();
    this.enablePhotosVideos();
    this.enableFiles();
    this.enableEmojis();
    this.enableCollaborativeDocument();
    this.enableCollaborativeWhiteboard();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.messageToBeEdited !== this.props.messageToBeEdited) {
      const messageToBeEdited = this.props.messageToBeEdited;

      this.setState({
        messageInput: messageToBeEdited,
        messageToBeEdited: messageToBeEdited,
      });

      const element = this.messageInputRef.current;
      if (messageToBeEdited) {
        let messageText = messageToBeEdited.text;

        //xss extensions data
        const xssData = checkMessageForExtensionsData(
          messageToBeEdited,
          "xss-filter"
        );
        if (
          xssData &&
          xssData.hasOwnProperty("sanitized_text") &&
          xssData.hasOwnProperty("hasXSS") &&
          xssData.hasXSS === "yes"
        ) {
          messageText = xssData.sanitized_text;
        }

        element.focus();
        element.textContent = "";
        this.pasteHtmlAtCaret(messageText, false);
      } else {
        element.textContent = "";
      }
    }

    if (prevProps.replyPreview !== this.props.replyPreview) {
      this.setState({ replyPreview: this.props.replyPreview });
    }

    const previousMessageStr = JSON.stringify(prevProps.messageToReact);
    const currentMessageStr = JSON.stringify(this.props.messageToReact);

    if (previousMessageStr !== currentMessageStr) {
      this.setState({ messageToReact: this.props.messageToReact });
    }

    if (this.context.item !== this.item) {
      this.messageInputRef.current.textContent = "";
      this.setState({
        stickerViewer: false,
        emojiViewer: false,
        replyPreview: null,
        messageToBeEdited: "",
        messageInput: "",
      });

      this.focusOnMessageComposer();
    }

    if (prevState.messageInput !== this.state.messageInput) {
      this.focusOnMessageComposer();
    }

    this.item =
      this.context.type === CometChat.ACTION_TYPE.TYPE_USER ||
      this.context.type === CometChat.ACTION_TYPE.TYPE_GROUP
        ? this.context.item
        : null;
    this.enableLiveReaction();
    this.enablePolls();
    this.enableTypingIndicator();
    this.enableStickers();
    this.enablePhotosVideos();
    this.enableFiles();
    this.enableEmojis();
    this.enableCollaborativeDocument();
    this.enableCollaborativeWhiteboard();
  }

  /**
   * if live reactions feature is disabled
   */
  enableLiveReaction = () => {
    this.context.FeatureRestriction.isLiveReactionsEnabled()
      .then((response) => {
        if (response !== this.state.enableLiveReaction) {
          this.setState({ enableLiveReaction: response });
        }
      })
      .catch((error) => {
        if (this.state.enableLiveReaction !== false) {
          this.setState({ enableLiveReaction: false });
        }
      });
  };

  /**
   * if polls feature is disabled
   */
  enablePolls = () => {
    this.context.FeatureRestriction.isPollsEnabled()
      .then((response) => {
        if (response !== this.state.enablePolls) {
          this.setState({ enablePolls: response });
        }
      })
      .catch((error) => {
        if (this.state.enablePolls !== false) {
          this.setState({ enablePolls: false });
        }
      });
  };

  /**
   * if typing indicator feature is disabled
   */
  enableTypingIndicator = () => {
    this.context.FeatureRestriction.isTypingIndicatorsEnabled()
      .then((response) => {
        if (response !== this.state.enableTypingIndicator) {
          this.setState({ enableTypingIndicator: response });
        }
      })
      .catch((error) => {
        if (this.state.enableTypingIndicator !== false) {
          this.setState({ enableTypingIndicator: false });
        }
      });
  };

  /**
   * if stickers feature is disabled
   */
  enableStickers = () => {
    this.context.FeatureRestriction.isStickersEnabled()
      .then((response) => {
        if (response !== this.state.enableStickers) {
          this.setState({ enableStickers: response });
        }
      })
      .catch((error) => {
        if (this.state.enableStickers !== false) {
          this.setState({ enableStickers: false });
        }
      });
  };

  /**
   * if uploding photos, videos feature is disabled
   */
  enablePhotosVideos = () => {
    this.context.FeatureRestriction.isPhotosVideosEnabled()
      .then((response) => {
        if (response !== this.state.enablePhotosVideos) {
          this.setState({ enablePhotosVideos: response });
        }
      })
      .catch((error) => {
        if (this.state.enablePhotosVideos !== false) {
          this.setState({ enablePhotosVideos: false });
        }
      });
  };

  /**
   * if uploding files feature is disabled
   */
  enableFiles = () => {
    this.context.FeatureRestriction.isFilesEnabled()
      .then((response) => {
        if (response !== this.state.enableFiles) {
          this.setState({ enableFiles: response });
        }
      })
      .catch((error) => {
        if (this.state.enableFiles !== false) {
          this.setState({ enableFiles: false });
        }
      });
  };

  /**
   * if sending emojis feature is disabled
   */
  enableEmojis = () => {
    this.context.FeatureRestriction.isEmojisEnabled()
      .then((response) => {
        if (response !== this.state.enableEmojis) {
          this.setState({ enableEmojis: response });
        }
      })
      .catch((error) => {
        if (this.state.enableEmojis !== false) {
          this.setState({ enableEmojis: false });
        }
      });
  };

  /**
   * if sharing collborative document feature is disabled
   */
  enableCollaborativeDocument = () => {
    this.context.FeatureRestriction.isCollaborativeDocumentEnabled()
      .then((response) => {
        if (response !== this.state.enableCollaborativeDocument) {
          this.setState({ enableCollaborativeDocument: response });
        }
      })
      .catch((error) => {
        if (this.state.enableCollaborativeDocument !== false) {
          this.setState({ enableCollaborativeDocument: false });
        }
      });
  };

  /**
   * if sharing collborative whiteboard feature is disabled
   */
  enableCollaborativeWhiteboard = () => {
    this.context.FeatureRestriction.isCollaborativeWhiteBoardEnabled()
      .then((response) => {
        if (response !== this.state.enableCollaborativeWhiteboard) {
          this.setState({ enableCollaborativeWhiteboard: response });
        }
      })
      .catch((error) => {
        if (this.state.enableCollaborativeWhiteboard !== false) {
          this.setState({ enableCollaborativeWhiteboard: false });
        }
      });
  };

  focusOnMessageComposer = () => {
    if (this.messageInputRef && this.messageInputRef.current) {
      this.messageInputRef.current.focus();
    }
  };

  pasteHtmlAtCaret(html, selectPastedContent) {
    var sel, range;
    const chatWindow = this.context.UIKitSettings.chatWindow;
    if (chatWindow.getSelection) {
      // IE9 and non-IE
      sel = chatWindow.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();

        // Range.createContextualFragment() would be useful here but is
        // only relatively recently standardized and is not supported in
        // some browsers (IE9, for one)
        var el = document.createElement("div");
        el.innerText = html;
        var frag = document.createDocumentFragment(),
          node,
          lastNode;
        while ((node = el.firstChild)) {
          lastNode = frag.appendChild(node);
        }
        var firstNode = frag.firstChild;
        range.insertNode(frag);

        // Preserve the selection
        if (lastNode) {
          range = range.cloneRange();
          range.setStartAfter(lastNode);
          if (selectPastedContent) {
            range.setStartBefore(firstNode);
          } else {
            range.collapse(true);
          }
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    } else if ((sel = document.selection) && sel.type !== "Control") {
      // IE < 9
      var originalRange = sel.createRange();
      originalRange.collapse(true);
      sel.createRange().pasteHTML(html);
      if (selectPastedContent) {
        range = sel.createRange();
        range.setEndPoint("StartToStart", originalRange);
        range.select();
      }
    }
  }

  emojiClicked = (emoji) => {
    if (this.state.messageToReact) {
      this.reactToMessages(emoji);
      return;
    }

    const element = this.messageInputRef.current;
    element.focus();
    this.pasteHtmlAtCaret(emoji.char, false);
    this.setState({ messageInput: element.innerText, messageType: "text" });
  };

  changeHandler = (event) => {
    this.startTyping();

    const elem = event.currentTarget;
    let messageInput = elem.textContent.trim();

    if (!messageInput.length) {
      event.currentTarget.textContent = messageInput;
      //return false;
    }

    this.setState({ messageInput: elem.innerText, messageType: "text" });
  };

  toggleFilePicker = () => {
    const currentState = !this.state.showFilePicker;
    this.setState({ showFilePicker: currentState });
  };

  openFileDialogue = (fileType) => {
    switch (fileType) {
      case "image":
        this.imageUploaderRef.current.click();
        break;
      case "file":
        this.fileUploaderRef.current.click();
        break;
      case "audio":
        this.audioUploaderRef.current.click();
        break;
      case "video":
        this.videoUploaderRef.current.click();
        break;
      default:
        break;
    }
  };

  onImageChange = (e) => {
    if (!this.imageUploaderRef.current.files["0"]) {
      return false;
    }

    const uploadedFile = this.imageUploaderRef.current.files["0"];

    var reader = new FileReader(); // Creating reader instance from FileReader() API
    reader.addEventListener(
      "load",
      (event) => {
        // Setting up base64 URL on image

        const newFile = new File(
          [reader.result],
          uploadedFile.name,
          uploadedFile
        );
        this.sendMediaMessage(newFile, CometChat.MESSAGE_TYPE.IMAGE);
      },
      false
    );

    reader.readAsArrayBuffer(uploadedFile);
  };

  onFileChange = (e) => {
    if (!this.fileUploaderRef.current.files["0"]) {
      return false;
    }

    const uploadedFile = this.fileUploaderRef.current.files["0"];

    var reader = new FileReader(); // Creating reader instance from FileReader() API
    reader.addEventListener(
      "load",
      (event) => {
        // Setting up base64 URL on image

        const newFile = new File(
          [reader.result],
          uploadedFile.name,
          uploadedFile
        );
        this.sendMediaMessage(newFile, CometChat.MESSAGE_TYPE.FILE);
      },
      false
    );

    reader.readAsArrayBuffer(uploadedFile);
  };

  onAudioChange = (e) => {
    if (!this.audioUploaderRef.current.files["0"]) {
      return false;
    }

    const uploadedFile = this.audioUploaderRef.current.files["0"];

    var reader = new FileReader(); // Creating reader instance from FileReader() API
    reader.addEventListener(
      "load",
      () => {
        // Setting up base64 URL on image

        const newFile = new File(
          [reader.result],
          uploadedFile.name,
          uploadedFile
        );
        this.sendMediaMessage(newFile, CometChat.MESSAGE_TYPE.AUDIO);
      },
      false
    );

    reader.readAsArrayBuffer(uploadedFile);
  };

  onVideoChange = (e) => {
    if (!this.videoUploaderRef.current.files["0"]) {
      return false;
    }

    const uploadedFile = this.videoUploaderRef.current.files["0"];

    var reader = new FileReader(); // Creating reader instance from FileReader() API
    reader.addEventListener(
      "load",
      () => {
        // Setting up base64 URL on image

        const newFile = new File(
          [reader.result],
          uploadedFile.name,
          uploadedFile
        );
        this.sendMediaMessage(newFile, CometChat.MESSAGE_TYPE.VIDEO);
      },
      false
    );

    reader.readAsArrayBuffer(uploadedFile);
  };

  getReceiverDetails = () => {
    let receiverId;
    let receiverType;

    if (this.context.type === CometChat.ACTION_TYPE.TYPE_USER) {
      receiverId = this.context.item.uid;
      receiverType = CometChat.RECEIVER_TYPE.USER;
    } else if (this.context.type === CometChat.ACTION_TYPE.TYPE_GROUP) {
      receiverId = this.context.item.guid;
      receiverType = CometChat.RECEIVER_TYPE.GROUP;
    }

    return { receiverId: receiverId, receiverType: receiverType };
  };

  sendMediaMessage = (messageInput, messageType) => {
    this.toggleFilePicker();
    this.endTyping(null, null);

    const { receiverId, receiverType } = this.getReceiverDetails();

    let mediaMessage = new CometChat.MediaMessage(
      receiverId,
      messageInput,
      messageType,
      receiverType
    );
    if (this.props.parentMessageId) {
      mediaMessage.setParentMessageId(this.props.parentMessageId);
    }

    mediaMessage.setSender(this.loggedInUser);
    mediaMessage.setReceiver(this.context.type);
    mediaMessage.setType(messageType);
    mediaMessage.setMetadata({
      [enums.CONSTANTS["FILE_METADATA"]]: messageInput,
    });
    mediaMessage._composedAt = getUnixTimestamp();
    mediaMessage._id = ID();

    SoundManager.play(enums.CONSTANTS.AUDIO["OUTGOING_MESSAGE"], this.context);
    this.props.actionGenerated(enums.ACTIONS["MESSAGE_COMPOSED"], [
      mediaMessage,
    ]);

    CometChat.sendMessage(mediaMessage)
      .then((message) => {
        const newMessageObj = { ...message, _id: mediaMessage._id };
        this.props.actionGenerated(enums.ACTIONS["MESSAGE_SENT"], [
          newMessageObj,
        ]);
      })
      .catch((error) => {
        const newMessageObj = { ...mediaMessage, error: error };
        this.props.actionGenerated(enums.ACTIONS["ERROR_IN_SENDING_MESSAGE"], [
          newMessageObj,
        ]);
      });
  };

  sendMessageOnEnter = (event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      this.sendTextMessage();
      return true;
    }
  };

  sendTextMessage = () => {
    if (this.state.emojiViewer) {
      this.setState({ emojiViewer: false });
    }

    if (!this.state.messageInput.trim().length) {
      return false;
    }

    if (this.state.messageToBeEdited) {
      this.editMessage();
      return false;
    }

    this.endTyping(null, null);

    let { receiverId, receiverType } = this.getReceiverDetails();
    let messageInput = this.state.messageInput.trim();

    let textMessage = new CometChat.TextMessage(
      receiverId,
      messageInput,
      receiverType
    );
    if (this.props.parentMessageId) {
      textMessage.setParentMessageId(this.props.parentMessageId);
    }
    textMessage.setSender(this.loggedInUser);
    textMessage.setReceiver(this.context.type);
    textMessage.setText(messageInput);
    textMessage._composedAt = getUnixTimestamp();
    textMessage._id = ID();

    this.props.actionGenerated(enums.ACTIONS["MESSAGE_COMPOSED"], [
      textMessage,
    ]);
    this.setState({ messageInput: "", replyPreview: false });

    this.messageInputRef.current.textContent = "";
    SoundManager.play(enums.CONSTANTS.AUDIO["OUTGOING_MESSAGE"], this.context);

    CometChat.sendMessage(textMessage)
      .then((message) => {
        const newMessageObj = { ...message, _id: textMessage._id };
        this.props.actionGenerated(enums.ACTIONS["MESSAGE_SENT"], [
          newMessageObj,
        ]);
      })
      .catch((error) => {
        const newMessageObj = { ...textMessage, error: error };
        this.props.actionGenerated(enums.ACTIONS["ERROR_IN_SENDING_MESSAGE"], [
          newMessageObj,
        ]);

        if (
          error &&
          error.hasOwnProperty("code") &&
          error.code === "ERR_GUID_NOT_FOUND"
        ) {
          //this.context.setDeletedGroupId(this.context.item.guid);
        }
      });
  };

  editMessage = () => {
    this.endTyping(null, null);

    const messageToBeEdited = this.props.messageToBeEdited;

    let { receiverId, receiverType } = this.getReceiverDetails();
    let messageText = this.state.messageInput.trim();
    let textMessage = new CometChat.TextMessage(
      receiverId,
      messageText,
      receiverType
    );
    textMessage.setId(messageToBeEdited.id);

    const newMessage = Object.assign({}, textMessage, {
      messageFrom: messageToBeEdited.messageFrom,
    });
    this.props.actionGenerated(enums.ACTIONS["MESSAGE_EDITED"], newMessage);

    this.setState({ messageInput: "" });
    this.messageInputRef.current.textContent = "";
    SoundManager.play(enums.CONSTANTS.AUDIO["OUTGOING_MESSAGE"], this.context);

    this.closeEditPreview();

    CometChat.editMessage(textMessage)
      .then((message) => {
        this.props.actionGenerated(enums.ACTIONS["MESSAGE_EDITED"], {
          ...message,
        });
      })
      .catch((error) =>
        this.props.actionGenerated(
          enums.ACTIONS["ERROR"],
          [],
          "SOMETHING_WRONG"
        )
      );
  };

  closeEditPreview = () => {
    this.props.actionGenerated(enums.ACTIONS["CLEAR_EDIT_PREVIEW"]);
  };

  startTyping = (timer, metadata) => {
    let typingInterval = timer || 5000;

    //if typing indicator feature is disabled
    if (this.state.enableTypingIndicator === false) {
      return false;
    }

    if (this.isTyping) {
      return false;
    }

    let { receiverId, receiverType } = this.getReceiverDetails();
    let typingMetadata = metadata || undefined;

    let typingNotification = new CometChat.TypingIndicator(
      receiverId,
      receiverType,
      typingMetadata
    );
    CometChat.startTyping(typingNotification);

    this.isTyping = setTimeout(() => {
      this.endTyping(null, typingMetadata);
    }, typingInterval);
  };

  endTyping = (event, metadata) => {
    //fixing synthetic issue
    if (event) {
      event.persist();
    }

    //if typing indicator is disabled for chat wigdet in dashboard
    if (this.state.enableTypingIndicator === false) {
      return false;
    }

    let { receiverId, receiverType } = this.getReceiverDetails();

    let typingMetadata = metadata || undefined;

    let typingNotification = new CometChat.TypingIndicator(
      receiverId,
      receiverType,
      typingMetadata
    );
    CometChat.endTyping(typingNotification);

    clearTimeout(this.isTyping);
    this.isTyping = null;
  };

  toggleStickerPicker = () => {
    const stickerViewer = this.state.stickerViewer;
    this.setState({ stickerViewer: !stickerViewer, emojiViewer: false });
  };

  toggleEmojiPicker = () => {
    const emojiViewer = this.state.emojiViewer;
    this.setState({ emojiViewer: !emojiViewer, stickerViewer: false });
  };

  toggleCreatePoll = () => {
    const createPoll = this.state.createPoll;
    this.setState({ createPoll: !createPoll });
  };

  toggleCollaborativeDocument = () => {
    const { receiverId, receiverType } = this.getReceiverDetails();
    CometChat.callExtension("document", "POST", "v1/create", {
      receiver: receiverId,
      receiverType: receiverType,
    })
      .then((response) => {
        // Response with document url
        if (response && response.hasOwnProperty("document_url")) {
          this.context.setToastMessage("success", "DOCUMENT_SUCCESS");
        } else {
          this.context.setToastMessage("error", "DOCUMENT_FAIL");
        }
      })
      .catch((error) =>
        this.props.actionGenerated(
          enums.ACTIONS["ERROR"],
          [],
          "SOMETHING_WRONG"
        )
      );
  };

  toggleCollaborativeBoard = () => {
    const { receiverId, receiverType } = this.getReceiverDetails();
    CometChat.callExtension("whiteboard", "POST", "v1/create", {
      receiver: receiverId,
      receiverType: receiverType,
    })
      .then((response) => {
        // Response with board_url
        if (response && response.hasOwnProperty("board_url")) {
          this.context.setToastMessage("success", "WHITEBOARD_SUCCESS");
        } else {
          this.context.setToastMessage("error", "WHITEBOARD_FAIL");
        }
      })
      .catch((error) =>
        this.props.actionGenerated(
          enums.ACTIONS["ERROR"],
          [],
          "SOMETHING_WRONG"
        )
      );
  };

  closeCreatePoll = () => {
    this.toggleCreatePoll();
    this.toggleFilePicker();
  };

  actionHandler = (action, message) => {
    switch (action) {
      case enums.ACTIONS["POLL_CREATED"]:
        this.toggleCreatePoll();
        this.toggleFilePicker();
        break;
      case enums.ACTIONS["SEND_STICKER"]:
        this.sendSticker(message);
        break;
      case enums.ACTIONS["CLOSE_STICKER_KEYBOARD"]:
        this.toggleStickerPicker();
        break;
      default:
        break;
    }
  };

  sendSticker = (stickerMessage) => {
    const { receiverId, receiverType } = this.getReceiverDetails();

    const customData = {
      sticker_url: stickerMessage.stickerUrl,
      sticker_name: stickerMessage.stickerName,
    };
    const customType = enums.CUSTOM_TYPE_STICKER;

    const customMessage = new CometChat.CustomMessage(
      receiverId,
      receiverType,
      customType,
      customData
    );
    if (this.props.parentMessageId) {
      customMessage.setParentMessageId(this.props.parentMessageId);
    }
    customMessage.setSender(this.loggedInUser);
    customMessage.setReceiver(this.context.type);
    customMessage.setMetadata({ incrementUnreadCount: true });
    customMessage._composedAt = getUnixTimestamp();
    customMessage._id = ID();

    this.props.actionGenerated(enums.ACTIONS["MESSAGE_COMPOSED"], [
      customMessage,
    ]);
    SoundManager.play(enums.CONSTANTS.AUDIO["OUTGOING_MESSAGE"], this.context);

    CometChat.sendCustomMessage(customMessage)
      .then((message) => {
        const newMessageObj = { ...message, _id: customMessage._id };
        this.props.actionGenerated(enums.ACTIONS["MESSAGE_SENT"], [
          newMessageObj,
        ]);
      })
      .catch((error) => {
        const newMessageObj = { ...customMessage, error: error };
        this.props.actionGenerated(enums.ACTIONS["ERROR_IN_SENDING_MESSAGE"], [
          newMessageObj,
        ]);
      });
  };

  sendReplyMessage = (messageInput) => {
    let { receiverId, receiverType } = this.getReceiverDetails();

    let textMessage = new CometChat.TextMessage(
      receiverId,
      messageInput,
      receiverType
    );
    if (this.props.parentMessageId) {
      textMessage.setParentMessageId(this.props.parentMessageId);
    }
    textMessage.setSender(this.loggedInUser);
    textMessage.setReceiver(this.context.type);
    textMessage._composedAt = getUnixTimestamp();
    textMessage._id = ID();

    this.props.actionGenerated(enums.ACTIONS["MESSAGE_COMPOSED"], [
      textMessage,
    ]);

    SoundManager.play(enums.CONSTANTS.AUDIO["OUTGOING_MESSAGE"], this.context);
    this.setState({ replyPreview: null });

    CometChat.sendMessage(textMessage)
      .then((message) => {
        const newMessageObj = { ...message, _id: textMessage._id };
        this.props.actionGenerated(enums.ACTIONS["MESSAGE_SENT"], [
          newMessageObj,
        ]);
      })
      .catch((error) => {
        const newMessageObj = { ...textMessage, error: error };
        this.props.actionGenerated(enums.ACTIONS["ERROR_IN_SENDING_MESSAGE"], [
          newMessageObj,
        ]);
      });
  };

  clearReplyPreview = () => {
    this.setState({ replyPreview: null });
  };

  startLiveReaction = (event) => {
    //if a live reaction is already in progress, return
    if (this.animationInProgress === true) {
      return false;
    }

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    //fetch the interval from the constants
    const liveReactionInterval = enums.CONSTANTS["LIVE_REACTION_INTERVAL"];

    //mount the live reaction component
    this.props.actionGenerated(enums.ACTIONS["SEND_LIVE_REACTION"]);
    this.sendTransientMessage();

    //set the timer to stop the live reaction
    this.timeout = setTimeout(this.stopLiveReaction, liveReactionInterval);
  };

  stopLiveReaction = () => {
    //unmount the live reaction component
    this.props.actionGenerated(enums.ACTIONS["STOP_LIVE_REACTION"]);

    //set the animation flag to false
    this.animationInProgress = false;
  };

  sendTransientMessage = () => {
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

  reactToMessages = (emoji) => {
    //close the emoji keyboard
    this.toggleEmojiPicker();

    //message object data structure
    let messageObject = { ...this.state.messageToReact };
    let newMessageObject = {};
    let reactionObject = {};

    const userObject = {};
    if (this.loggedInUser.avatar && this.loggedInUser.avatar.length) {
      userObject["name"] = this.loggedInUser.name;
      userObject["avatar"] = this.loggedInUser.avatar;
    } else {
      userObject["name"] = this.loggedInUser.name;
    }

    const emojiObject = {
      [emoji.char]: { [this.loggedInUser.uid]: userObject },
    };

    const reactionExtensionsData = checkMessageForExtensionsData(
      messageObject,
      "reactions"
    );
    //if the message object has reactions extension data in metadata
    if (reactionExtensionsData) {
      //if the reactions metadata has the selected emoji/reaction
      if (reactionExtensionsData[emoji.char]) {
        //if the reactions metadata has the selected emoji/reaction for the loggedin user
        if (reactionExtensionsData[emoji.char][this.loggedInUser.uid]) {
          reactionObject = {
            ...messageObject["metadata"]["@injected"]["extensions"][
              "reactions"
            ],
          };
          delete reactionObject[emoji.char][this.loggedInUser.uid];
        } else {
          reactionObject = {
            ...messageObject["metadata"]["@injected"]["extensions"][
              "reactions"
            ],
            [emoji.char]: {
              ...messageObject["metadata"]["@injected"]["extensions"][
                "reactions"
              ][emoji.char],
              [this.loggedInUser.uid]: userObject,
            },
          };
        }
      } else {
        reactionObject = {
          ...messageObject["metadata"]["@injected"]["extensions"]["reactions"],
          ...emojiObject,
        };
      }
    } else {
      if (messageObject.hasOwnProperty("metadata") === false) {
        messageObject["metadata"] = {};
      }

      if (messageObject["metadata"].hasOwnProperty("@injected") === false) {
        messageObject["metadata"]["@injected"] = {};
      }

      if (
        messageObject["metadata"]["@injected"].hasOwnProperty("extensions") ===
        false
      ) {
        messageObject["metadata"]["@injected"]["extensions"] = {};
      }

      if (
        messageObject["metadata"]["@injected"]["extensions"].hasOwnProperty(
          "reactions"
        ) === false
      ) {
        messageObject["metadata"]["@injected"]["extensions"]["reactions"] = {};
      }

      reactionObject = {
        ...emojiObject,
      };
    }

    const metadatObject = {
      metadata: {
        ...messageObject["metadata"],
        "@injected": {
          ...messageObject["metadata"]["@injected"],
          extensions: {
            ...messageObject["metadata"]["@injected"]["extensions"],
            reactions: {
              ...reactionObject,
            },
          },
        },
      },
    };

    newMessageObject = {
      ...messageObject,
      data: {
        ...messageObject,
        ...metadatObject,
      },
      ...metadatObject,
    };

    this.props.actionGenerated(
      enums.ACTIONS["MESSAGE_EDITED"],
      newMessageObject
    );

    CometChat.callExtension("reactions", "POST", "v1/react", {
      msgId: this.state.messageToReact.id,
      emoji: emoji.char,
    })
      .then((response) => {
        // Reaction failed
        if (!response || !response.success || response.success !== true) {
          this.props.actionGenerated(
            enums.ACTIONS["ERROR"],
            [],
            "SOMETHING_WRONG"
          );
        }
      })
      .catch((error) =>
        this.props.actionGenerated(
          enums.ACTIONS["ERROR"],
          [],
          "SOMETHING_WRONG"
        )
      );
  };

  render() {
    let liveReactionBtn = null;
    const liveReactionText = Translator.translate(
      "LIVE_REACTION",
      this.context.language
    );
    if (enums.CONSTANTS["LIVE_REACTIONS"].hasOwnProperty(this.props.reaction)) {
      const reactionName = this.props.reaction;
      liveReactionBtn = (
        <Box
          title={liveReactionText}
          className="button__reactions"
          w="40px"
          h="40px"
          cursor="pointer"
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={this.startLiveReaction}
        >
          <Heart color="red" size={24} weight="duotone" />
        </Box>
      );
    }

    let disabledState = false;
    if (this.context.item.blockedByMe) {
      disabledState = true;
    }

    const docText = Translator.translate("ATTACH_FILE", this.context.language);
    let docs = (
      <Box
        title={docText}
        className="filelist__item item__file"
        w="40px"
        h="40px"
        cursor="pointer"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color={this.context.theme.primaryColor}
        onClick={() => {
          this.openFileDialogue("file");
        }}
      >
        <FilePlus size={24} weight="duotone" />
        <input
          onChange={this.onFileChange}
          type="file"
          id="file"
          ref={this.fileUploaderRef}
          style={{ display: "none" }}
        />
      </Box>
    );

    const videoText = Translator.translate(
      "ATTACH_VIDEO",
      this.context.language
    );
    const audioText = Translator.translate(
      "ATTACH_AUDIO",
      this.context.language
    );
    const imageText = Translator.translate(
      "ATTACH_IMAGE",
      this.context.language
    );
    let avp = (
      <React.Fragment>
        <Box
          title={videoText}
          className="filelist__item item__video"
          w="40px"
          h="40px"
          cursor="pointer"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color={this.context.theme.primaryColor}
          onClick={() => {
            this.openFileDialogue("video");
          }}
        >
          <FileVideo size={24} weight="duotone" />
          <input
            onChange={this.onVideoChange}
            accept="video/*"
            type="file"
            ref={this.videoUploaderRef}
            style={{ display: "none" }}
          />
        </Box>
        <Box
          title={audioText}
          className="filelist__item item__audio"
          w="40px"
          h="40px"
          cursor="pointer"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color={this.context.theme.primaryColor}
          onClick={() => {
            this.openFileDialogue("audio");
          }}
        >
          <FileAudio size={24} weight="duotone" />
          <input
            onChange={this.onAudioChange}
            accept="audio/*"
            type="file"
            ref={this.audioUploaderRef}
            style={{ display: "none" }}
          />
        </Box>
        <Box
          title={imageText}
          className="filelist__item item__image"
          w="40px"
          h="40px"
          cursor="pointer"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color={this.context.theme.primaryColor}
          onClick={() => {
            this.openFileDialogue("image");
          }}
        >
          <FileImage size={24} weight="duotone" />
          <input
            onChange={this.onImageChange}
            accept="image/*"
            type="file"
            ref={this.imageUploaderRef}
            style={{ display: "none" }}
          />
        </Box>
      </React.Fragment>
    );

    const pollText = Translator.translate("CREATE_POLL", this.context.language);
    let createPollBtn = (
      <Box
        title={pollText}
        className="filelist__item item__poll"
        w="40px"
        h="40px"
        cursor="pointer"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color={this.context.theme.primaryColor}
        onClick={this.toggleCreatePoll}
        sx={{
          mask: `url(${pollIcon}) center center no-repeat`,
          backgroundColor: this.context.theme.primaryColor,
        }}
      />
    );

    const collaborativeDocText = Translator.translate(
      "COLLABORATE_USING_DOCUMENT",
      this.context.language
    );
    let collaborativeDocBtn = (
      <Box
        title={collaborativeDocText}
        className="filelist__item item__document"
        w="40px"
        h="40px"
        cursor="pointer"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color={this.context.theme.primaryColor}
        onClick={this.toggleCollaborativeDocument}
        sx={{
          mask: `url(${documentIcon}) center center no-repeat`,
          backgroundColor: this.context.theme.primaryColor,
        }}
      />
    );

    const collaborativeBoardText = Translator.translate(
      "COLLABORATE_USING_WHITEBOARD",
      this.context.language
    );
    let collaborativeBoardBtn = (
      <Box
        title={collaborativeBoardText}
        className="filelist__item item__whiteboard"
        w="40px"
        h="40px"
        cursor="pointer"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color={this.context.theme.primaryColor}
        onClick={this.toggleCollaborativeBoard}
        sx={{
          mask: `url(${whiteboardIcon}) center center no-repeat`,
          backgroundColor: this.context.theme.primaryColor,
        }}
      />
    );

    const emojiText = Translator.translate("EMOJI", this.context.language);
    let emojiBtn = (
      <Box
        title={emojiText}
        className="button__emoji"
        w="40px"
        h="40px"
        cursor="pointer"
        display="flex"
        alignItems="center"
        justifyContent="center"
        onClick={() => {
          this.toggleEmojiPicker();
          this.setState({ messageToReact: "" });
        }}
      >
        <SmileySticker color="#fcba03" size={24} weight="duotone" />
      </Box>
    );

    const StickerText = Translator.translate("STICKER", this.context.language);
    let stickerBtn = (
      <Box
        title={StickerText}
        className="button__sticker"
        w="40px"
        h="40px"
        cursor="pointer"
        display="flex"
        alignItems="center"
        justifyContent="center"
        onClick={this.toggleStickerPicker}
        sx={{
          mask: `url(${stickerIcon}) center center no-repeat`,
          backgroundColor: this.context.theme.primaryColor,
        }}
      />
    );

    const sendMessageText = Translator.translate(
      "SEND_MESSAGE",
      this.context.language
    );
    let sendBtn = (
      <Box
        title={sendMessageText}
        className="button__send"
        w="40px"
        h="40px"
        cursor="pointer"
        display="flex"
        alignItems="center"
        justifyContent="center"
        onClick={this.sendTextMessage}
      >
        <PaperPlaneRight color="#3182CE" size={24} weight="duotone" />
      </Box>
    );

    //if uploading photos, videos feature is disabled
    if (this.state.enablePhotosVideos === false) {
      avp = null;
    }

    //if files upload are disabled for chat widget in dashboard
    if (this.state.enableFiles === false) {
      docs = null;
    }

    //if polls feature is disabled
    if (this.state.enablePolls === false || this.props.parentMessageId) {
      createPollBtn = null;
    }

    //if collaborative_document are disabled for chat widget in dashboard
    if (
      this.state.enableCollaborativeDocument === false ||
      this.props.parentMessageId
    ) {
      collaborativeDocBtn = null;
    }

    //if collaborative_document are disabled for chat widget in dashboard
    if (
      this.state.enableCollaborativeWhiteboard === false ||
      this.props.parentMessageId
    ) {
      collaborativeBoardBtn = null;
    }

    //if emojis are disabled for chat widget in dashboard
    if (this.state.enableEmojis === false) {
      emojiBtn = null;
    }

    //if live reactions is disabled for chat widget in dashboard
    if (
      this.state.enableLiveReaction === false ||
      this.state.messageInput.length ||
      this.props.parentMessageId
    ) {
      liveReactionBtn = null;
    }

    //if stickers is disabled for chat widget in dashboard
    if (this.state.enableStickers === false) {
      stickerBtn = null;
    }

    if (!this.state.messageInput.length) {
      sendBtn = null;
    }

    const attachText = Translator.translate("ATTACH", this.context.language);
    let attach = (
      <Box className="input__sticky__attachment" position="relative">
        <Box
          className="attachment__icon"
          w="40px"
          h="40px"
          cursor="pointer"
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={this.toggleFilePicker}
          title={attachText}
        >
          <Plus size={24} weight="duotone" />
        </Box>
        <Box
          className="attachment__filepicker"
          display={this.state.showFilePicker ? "block" : "none"}
          position="absolute"
          bottom="50px"
          left="0"
          bg={this.context.theme.backgroundColor.white}
          border={`1px solid ${this.context.theme.borderColor.primary}`}
          borderRadius="8px"
          p="8px"
          zIndex="100"
          dir={Translator.getDirection(this.context.language)}
        >
          <Flex className="filepicker__filelist" gap="8px">
            {avp}
            {docs}
            {createPollBtn}
            {collaborativeDocBtn}
            {collaborativeBoardBtn}
          </Flex>
        </Box>
      </Box>
    );

    if (
      avp === null &&
      docs === null &&
      createPollBtn === null &&
      collaborativeDocBtn === null &&
      collaborativeBoardBtn === null
    ) {
      attach = null;
    }

    let createPoll = null;
    if (this.state.createPoll) {
      createPoll = (
        <CometChatCreatePoll
          close={this.closeCreatePoll}
          actionGenerated={this.actionHandler}
        />
      );
    }

    let editPreview = null;
    if (this.state.messageToBeEdited) {
      let messageText = this.state.messageToBeEdited.text;

      //xss extensions data
      const xssData = checkMessageForExtensionsData(
        this.state.messageToBeEdited,
        "xss-filter"
      );
      if (
        xssData &&
        xssData.hasOwnProperty("sanitized_text") &&
        xssData.hasOwnProperty("hasXSS") &&
        xssData.hasXSS === "yes"
      ) {
        messageText = xssData.sanitized_text;
      }

      //datamasking extensions data
      const maskedData = checkMessageForExtensionsData(
        this.state.messageToBeEdited,
        "data-masking"
      );
      if (
        maskedData &&
        maskedData.hasOwnProperty("data") &&
        maskedData.data.hasOwnProperty("sensitive_data") &&
        maskedData.data.hasOwnProperty("message_masked") &&
        maskedData.data.sensitive_data === "yes"
      ) {
        messageText = maskedData.data.message_masked;
      }

      //profanity extensions data
      const profaneData = checkMessageForExtensionsData(
        this.state.messageToBeEdited,
        "profanity-filter"
      );
      if (
        profaneData &&
        profaneData.hasOwnProperty("profanity") &&
        profaneData.hasOwnProperty("message_clean") &&
        profaneData.profanity === "yes"
      ) {
        messageText = profaneData.message_clean;
      }

      const slideAnimation = keyframes`
        from { bottom: -60px }
        to { bottom: 0px }
      `;
      
      editPreview = (
        <Box
          p="7px"
          bg={this.context.theme.backgroundColor.white}
          borderColor={this.context.theme.borderColor.primary}
          borderWidth="1px 1px 1px 5px"
          borderStyle="solid"
          color={this.context.theme.color.helpText}
          fontSize="13px"
          position="relative"
          sx={{
            animation: `${slideAnimation} 0.5s ease-out`,
          }}
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Box py="5px">
              {Translator.translate("EDIT_MESSAGE", this.context.language)}
            </Box>
            <Box
              cursor="pointer"
              w="20px"
              h="20px"
              onClick={this.closeEditPreview}
              sx={{
                mask: `url(${closeIcon}) center center no-repeat`,
                backgroundColor: this.context.theme.primaryColor,
              }}
            />
          </Flex>
          <Box>{messageText}</Box>
        </Box>
      );
    }

    let smartReplyPreview = null;
    if (this.state.replyPreview) {
      const message = this.state.replyPreview;

      const smartReplyData = checkMessageForExtensionsData(
        message,
        "smart-reply"
      );
      if (smartReplyData && smartReplyData.hasOwnProperty("error") === false) {
        const options = [
          smartReplyData["reply_positive"],
          smartReplyData["reply_neutral"],
          smartReplyData["reply_negative"],
        ];
        smartReplyPreview = (
          <CometChatSmartReplyPreview
            options={options}
            clicked={this.sendReplyMessage}
            close={this.clearReplyPreview}
          />
        );
      }
    }

    let stickerViewer = null;
    if (this.state.stickerViewer) {
      stickerViewer = (
        <CometChatStickerKeyboard actionGenerated={this.actionHandler} />
      );
    }

    let emojiViewer = null;
    if (this.state.emojiViewer) {
      emojiViewer = <CometChatEmojiKeyboard onClick={this.emojiClicked} />;
    }

    return (
      <Box
        className="chat__composer"
        p="16px"
        bg={this.context.theme.backgroundColor.white}
        zIndex="1"
        order="3"
        position="relative"
        flex="none"
        minH="105px"
      >
        {editPreview}
        {smartReplyPreview}
        {stickerViewer}
        {emojiViewer}
        <Box className="composer__input" position="relative">
          <Box
            className="input__inner"
            tabIndex="-1"
            border={`1px solid ${this.context.theme.borderColor.primary}`}
            borderRadius="8px"
            bg={this.context.theme.backgroundColor.white}
            position="relative"
            overflow="hidden"
          >
            <Box
              className="input__message-input"
              contentEditable="true"
              placeholder={Translator.translate(
                "ENTER_YOUR_MESSAGE_HERE",
                this.context.language
              )}
              dir={Translator.getDirection(this.context.language)}
              onInput={this.changeHandler}
              onBlur={(event) => this.endTyping(event)}
              onKeyDown={this.sendMessageOnEnter}
              ref={this.messageInputRef}
              minH="40px"
              maxH="120px"
              overflow="auto"
              p="8px 60px 8px 16px"
              outline="none"
              color={this.context.theme.color.primary}
              opacity={disabledState ? 0.5 : 1}
              pointerEvents={disabledState ? "none" : "auto"}
              sx={{
                "&::before": {
                  content: `"${Translator.translate(
                    "ENTER_YOUR_MESSAGE_HERE",
                    this.context.language
                  )}"`,
                  position: "absolute",
                  color: this.context.theme.color.helpText,
                  pointerEvents: "none",
                  display: this.state.messageInput ? "none" : "block",
                }
              }}
            />
            <Flex
              className="input__sticky"
              position="absolute"
              right="8px"
              top="50%"
              transform="translateY(-50%)"
              alignItems="center"
              gap="4px"
            >
              {attach}
              <Flex
                className="input__sticky__buttons"
                alignItems="center"
                gap="4px"
              >
                {stickerBtn}
                {emojiBtn}
                {sendBtn}
                {liveReactionBtn}
              </Flex>
            </Flex>
          </Box>
        </Box>
        {createPoll}
      </Box>
    );
  }
}

// Specifies the default values for props:
CometChatMessageComposer.defaultProps = {
  theme: theme,
  reaction: "heart",
};

CometChatMessageComposer.propTypes = {
  theme: PropTypes.object,
  reaction: PropTypes.string,
};

export { CometChatMessageComposer };
