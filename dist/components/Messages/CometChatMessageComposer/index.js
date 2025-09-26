"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatMessageComposer = void 0;
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.string.trim.js");
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _phosphorReact = require("phosphor-react");
var _react2 = require("@chakra-ui/react");
var _Extensions = require("../Extensions");
var _ = require("..");
var _CometChatContext = require("../../../util/CometChatContext");
var _common = require("../../../util/common");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _SoundManager = require("../../../util/SoundManager");
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _addCircleFilled = _interopRequireDefault(require("./resources/add-circle-filled.svg"));
var _video = _interopRequireDefault(require("./resources/video.svg"));
var _audioFile = _interopRequireDefault(require("./resources/audio-file.svg"));
var _fileUpload = _interopRequireDefault(require("./resources/file-upload.svg"));
var _image = _interopRequireDefault(require("./resources/image.svg"));
var _emoji = _interopRequireDefault(require("./resources/emoji.svg"));
var _sendMessage = _interopRequireDefault(require("./resources/send-message.svg"));
var _polls = _interopRequireDefault(require("./resources/polls.svg"));
var _stickers = _interopRequireDefault(require("./resources/stickers.svg"));
var _close = _interopRequireDefault(require("./resources/close.svg"));
var _collaborativeDocument = _interopRequireDefault(require("./resources/collaborative-document.svg"));
var _collaborativeWhiteboard = _interopRequireDefault(require("./resources/collaborative-whiteboard.svg"));
var _heart = _interopRequireDefault(require("./resources/heart.png"));
var _templateObject;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class CometChatMessageComposer extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    /**
     * if live reactions feature is disabled
     */
    _defineProperty(this, "enableLiveReaction", () => {
      this.context.FeatureRestriction.isLiveReactionsEnabled().then(response => {
        if (response !== this.state.enableLiveReaction) {
          this.setState({
            enableLiveReaction: response
          });
        }
      }).catch(error => {
        if (this.state.enableLiveReaction !== false) {
          this.setState({
            enableLiveReaction: false
          });
        }
      });
    });
    /**
     * if polls feature is disabled
     */
    _defineProperty(this, "enablePolls", () => {
      this.context.FeatureRestriction.isPollsEnabled().then(response => {
        if (response !== this.state.enablePolls) {
          this.setState({
            enablePolls: response
          });
        }
      }).catch(error => {
        if (this.state.enablePolls !== false) {
          this.setState({
            enablePolls: false
          });
        }
      });
    });
    /**
     * if typing indicator feature is disabled
     */
    _defineProperty(this, "enableTypingIndicator", () => {
      this.context.FeatureRestriction.isTypingIndicatorsEnabled().then(response => {
        if (response !== this.state.enableTypingIndicator) {
          this.setState({
            enableTypingIndicator: response
          });
        }
      }).catch(error => {
        if (this.state.enableTypingIndicator !== false) {
          this.setState({
            enableTypingIndicator: false
          });
        }
      });
    });
    /**
     * if stickers feature is disabled
     */
    _defineProperty(this, "enableStickers", () => {
      this.context.FeatureRestriction.isStickersEnabled().then(response => {
        if (response !== this.state.enableStickers) {
          this.setState({
            enableStickers: response
          });
        }
      }).catch(error => {
        if (this.state.enableStickers !== false) {
          this.setState({
            enableStickers: false
          });
        }
      });
    });
    /**
     * if uploding photos, videos feature is disabled
     */
    _defineProperty(this, "enablePhotosVideos", () => {
      this.context.FeatureRestriction.isPhotosVideosEnabled().then(response => {
        if (response !== this.state.enablePhotosVideos) {
          this.setState({
            enablePhotosVideos: response
          });
        }
      }).catch(error => {
        if (this.state.enablePhotosVideos !== false) {
          this.setState({
            enablePhotosVideos: false
          });
        }
      });
    });
    /**
     * if uploding files feature is disabled
     */
    _defineProperty(this, "enableFiles", () => {
      this.context.FeatureRestriction.isFilesEnabled().then(response => {
        if (response !== this.state.enableFiles) {
          this.setState({
            enableFiles: response
          });
        }
      }).catch(error => {
        if (this.state.enableFiles !== false) {
          this.setState({
            enableFiles: false
          });
        }
      });
    });
    /**
     * if sending emojis feature is disabled
     */
    _defineProperty(this, "enableEmojis", () => {
      this.context.FeatureRestriction.isEmojisEnabled().then(response => {
        if (response !== this.state.enableEmojis) {
          this.setState({
            enableEmojis: response
          });
        }
      }).catch(error => {
        if (this.state.enableEmojis !== false) {
          this.setState({
            enableEmojis: false
          });
        }
      });
    });
    /**
     * if sharing collborative document feature is disabled
     */
    _defineProperty(this, "enableCollaborativeDocument", () => {
      this.context.FeatureRestriction.isCollaborativeDocumentEnabled().then(response => {
        if (response !== this.state.enableCollaborativeDocument) {
          this.setState({
            enableCollaborativeDocument: response
          });
        }
      }).catch(error => {
        if (this.state.enableCollaborativeDocument !== false) {
          this.setState({
            enableCollaborativeDocument: false
          });
        }
      });
    });
    /**
     * if sharing collborative whiteboard feature is disabled
     */
    _defineProperty(this, "enableCollaborativeWhiteboard", () => {
      this.context.FeatureRestriction.isCollaborativeWhiteBoardEnabled().then(response => {
        if (response !== this.state.enableCollaborativeWhiteboard) {
          this.setState({
            enableCollaborativeWhiteboard: response
          });
        }
      }).catch(error => {
        if (this.state.enableCollaborativeWhiteboard !== false) {
          this.setState({
            enableCollaborativeWhiteboard: false
          });
        }
      });
    });
    _defineProperty(this, "focusOnMessageComposer", () => {
      if (this.messageInputRef && this.messageInputRef.current) {
        this.messageInputRef.current.focus();
      }
    });
    _defineProperty(this, "emojiClicked", emoji => {
      if (this.state.messageToReact) {
        this.reactToMessages(emoji);
        return;
      }
      const element = this.messageInputRef.current;
      element.focus();
      this.pasteHtmlAtCaret(emoji.char, false);
      this.setState({
        messageInput: element.innerText,
        messageType: "text"
      });
    });
    _defineProperty(this, "changeHandler", event => {
      this.startTyping();
      const elem = event.currentTarget;
      let messageInput = elem.textContent.trim();
      if (!messageInput.length) {
        event.currentTarget.textContent = messageInput;
        //return false;
      }
      this.setState({
        messageInput: elem.innerText,
        messageType: "text"
      });
    });
    _defineProperty(this, "toggleFilePicker", () => {
      const currentState = !this.state.showFilePicker;
      this.setState({
        showFilePicker: currentState
      });
    });
    _defineProperty(this, "openFileDialogue", fileType => {
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
    });
    _defineProperty(this, "onImageChange", e => {
      if (!this.imageUploaderRef.current.files["0"]) {
        return false;
      }
      const uploadedFile = this.imageUploaderRef.current.files["0"];
      var reader = new FileReader(); // Creating reader instance from FileReader() API
      reader.addEventListener("load", event => {
        // Setting up base64 URL on image

        const newFile = new File([reader.result], uploadedFile.name, uploadedFile);
        this.sendMediaMessage(newFile, _chat.CometChat.MESSAGE_TYPE.IMAGE);
      }, false);
      reader.readAsArrayBuffer(uploadedFile);
    });
    _defineProperty(this, "onFileChange", e => {
      if (!this.fileUploaderRef.current.files["0"]) {
        return false;
      }
      const uploadedFile = this.fileUploaderRef.current.files["0"];
      var reader = new FileReader(); // Creating reader instance from FileReader() API
      reader.addEventListener("load", event => {
        // Setting up base64 URL on image

        const newFile = new File([reader.result], uploadedFile.name, uploadedFile);
        this.sendMediaMessage(newFile, _chat.CometChat.MESSAGE_TYPE.FILE);
      }, false);
      reader.readAsArrayBuffer(uploadedFile);
    });
    _defineProperty(this, "onAudioChange", e => {
      if (!this.audioUploaderRef.current.files["0"]) {
        return false;
      }
      const uploadedFile = this.audioUploaderRef.current.files["0"];
      var reader = new FileReader(); // Creating reader instance from FileReader() API
      reader.addEventListener("load", () => {
        // Setting up base64 URL on image

        const newFile = new File([reader.result], uploadedFile.name, uploadedFile);
        this.sendMediaMessage(newFile, _chat.CometChat.MESSAGE_TYPE.AUDIO);
      }, false);
      reader.readAsArrayBuffer(uploadedFile);
    });
    _defineProperty(this, "onVideoChange", e => {
      if (!this.videoUploaderRef.current.files["0"]) {
        return false;
      }
      const uploadedFile = this.videoUploaderRef.current.files["0"];
      var reader = new FileReader(); // Creating reader instance from FileReader() API
      reader.addEventListener("load", () => {
        // Setting up base64 URL on image

        const newFile = new File([reader.result], uploadedFile.name, uploadedFile);
        this.sendMediaMessage(newFile, _chat.CometChat.MESSAGE_TYPE.VIDEO);
      }, false);
      reader.readAsArrayBuffer(uploadedFile);
    });
    _defineProperty(this, "getReceiverDetails", () => {
      let receiverId;
      let receiverType;
      if (this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_USER) {
        receiverId = this.context.item.uid;
        receiverType = _chat.CometChat.RECEIVER_TYPE.USER;
      } else if (this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP) {
        receiverId = this.context.item.guid;
        receiverType = _chat.CometChat.RECEIVER_TYPE.GROUP;
      }
      return {
        receiverId: receiverId,
        receiverType: receiverType
      };
    });
    _defineProperty(this, "sendMediaMessage", (messageInput, messageType) => {
      this.toggleFilePicker();
      this.endTyping(null, null);
      const {
        receiverId,
        receiverType
      } = this.getReceiverDetails();
      let mediaMessage = new _chat.CometChat.MediaMessage(receiverId, messageInput, messageType, receiverType);
      if (this.props.parentMessageId) {
        mediaMessage.setParentMessageId(this.props.parentMessageId);
      }
      mediaMessage.setSender(this.loggedInUser);
      mediaMessage.setReceiver(this.context.type);
      mediaMessage.setType(messageType);
      mediaMessage.setMetadata({
        [enums.CONSTANTS["FILE_METADATA"]]: messageInput
      });
      mediaMessage._composedAt = (0, _common.getUnixTimestamp)();
      mediaMessage._id = (0, _common.ID)();
      _SoundManager.SoundManager.play(enums.CONSTANTS.AUDIO["OUTGOING_MESSAGE"], this.context);
      this.props.actionGenerated(enums.ACTIONS["MESSAGE_COMPOSED"], [mediaMessage]);
      _chat.CometChat.sendMessage(mediaMessage).then(message => {
        const newMessageObj = _objectSpread(_objectSpread({}, message), {}, {
          _id: mediaMessage._id
        });
        this.props.actionGenerated(enums.ACTIONS["MESSAGE_SENT"], [newMessageObj]);
      }).catch(error => {
        const newMessageObj = _objectSpread(_objectSpread({}, mediaMessage), {}, {
          error: error
        });
        this.props.actionGenerated(enums.ACTIONS["ERROR_IN_SENDING_MESSAGE"], [newMessageObj]);
      });
    });
    _defineProperty(this, "sendMessageOnEnter", event => {
      if (event.keyCode === 13 && !event.shiftKey) {
        event.preventDefault();
        this.sendTextMessage();
        return true;
      }
    });
    _defineProperty(this, "sendTextMessage", () => {
      if (this.state.emojiViewer) {
        this.setState({
          emojiViewer: false
        });
      }
      if (!this.state.messageInput.trim().length) {
        return false;
      }
      if (this.state.messageToBeEdited) {
        this.editMessage();
        return false;
      }
      this.endTyping(null, null);
      let {
        receiverId,
        receiverType
      } = this.getReceiverDetails();
      let messageInput = this.state.messageInput.trim();
      let textMessage = new _chat.CometChat.TextMessage(receiverId, messageInput, receiverType);
      if (this.props.parentMessageId) {
        textMessage.setParentMessageId(this.props.parentMessageId);
      }
      textMessage.setSender(this.loggedInUser);
      textMessage.setReceiver(this.context.type);
      textMessage.setText(messageInput);
      textMessage._composedAt = (0, _common.getUnixTimestamp)();
      textMessage._id = (0, _common.ID)();
      this.props.actionGenerated(enums.ACTIONS["MESSAGE_COMPOSED"], [textMessage]);
      this.setState({
        messageInput: "",
        replyPreview: false
      });
      this.messageInputRef.current.textContent = "";
      _SoundManager.SoundManager.play(enums.CONSTANTS.AUDIO["OUTGOING_MESSAGE"], this.context);
      _chat.CometChat.sendMessage(textMessage).then(message => {
        const newMessageObj = _objectSpread(_objectSpread({}, message), {}, {
          _id: textMessage._id
        });
        this.props.actionGenerated(enums.ACTIONS["MESSAGE_SENT"], [newMessageObj]);
        if (typeof this.props.onMessageSend === "function") {
          this.props.onMessageSend(message);
        }
      }).catch(error => {
        const newMessageObj = _objectSpread(_objectSpread({}, textMessage), {}, {
          error: error
        });
        this.props.actionGenerated(enums.ACTIONS["ERROR_IN_SENDING_MESSAGE"], [newMessageObj]);
        if (error && error.hasOwnProperty("code") && error.code === "ERR_GUID_NOT_FOUND") {
          //this.context.setDeletedGroupId(this.context.item.guid);
        }
      });
    });
    _defineProperty(this, "editMessage", () => {
      this.endTyping(null, null);
      const messageToBeEdited = this.props.messageToBeEdited;
      let {
        receiverId,
        receiverType
      } = this.getReceiverDetails();
      let messageText = this.state.messageInput.trim();
      let textMessage = new _chat.CometChat.TextMessage(receiverId, messageText, receiverType);
      textMessage.setId(messageToBeEdited.id);
      const newMessage = Object.assign({}, textMessage, {
        messageFrom: messageToBeEdited.messageFrom
      });
      this.props.actionGenerated(enums.ACTIONS["MESSAGE_EDITED"], newMessage);
      this.setState({
        messageInput: ""
      });
      this.messageInputRef.current.textContent = "";
      _SoundManager.SoundManager.play(enums.CONSTANTS.AUDIO["OUTGOING_MESSAGE"], this.context);
      this.closeEditPreview();
      _chat.CometChat.editMessage(textMessage).then(message => {
        this.props.actionGenerated(enums.ACTIONS["MESSAGE_EDITED"], _objectSpread({}, message));
      }).catch(error => this.props.actionGenerated(enums.ACTIONS["ERROR"], [], "SOMETHING_WRONG"));
    });
    _defineProperty(this, "closeEditPreview", () => {
      this.props.actionGenerated(enums.ACTIONS["CLEAR_EDIT_PREVIEW"]);
    });
    _defineProperty(this, "startTyping", (timer, metadata) => {
      let typingInterval = timer || 5000;

      //if typing indicator feature is disabled
      if (this.state.enableTypingIndicator === false) {
        return false;
      }
      if (this.isTyping) {
        return false;
      }
      let {
        receiverId,
        receiverType
      } = this.getReceiverDetails();
      let typingMetadata = metadata || undefined;
      let typingNotification = new _chat.CometChat.TypingIndicator(receiverId, receiverType, typingMetadata);
      _chat.CometChat.startTyping(typingNotification);
      this.isTyping = setTimeout(() => {
        this.endTyping(null, typingMetadata);
      }, typingInterval);
    });
    _defineProperty(this, "endTyping", (event, metadata) => {
      //fixing synthetic issue
      if (event) {
        event.persist();
      }

      //if typing indicator is disabled for chat wigdet in dashboard
      if (this.state.enableTypingIndicator === false) {
        return false;
      }
      let {
        receiverId,
        receiverType
      } = this.getReceiverDetails();
      let typingMetadata = metadata || undefined;
      let typingNotification = new _chat.CometChat.TypingIndicator(receiverId, receiverType, typingMetadata);
      _chat.CometChat.endTyping(typingNotification);
      clearTimeout(this.isTyping);
      this.isTyping = null;
    });
    _defineProperty(this, "toggleStickerPicker", () => {
      const stickerViewer = this.state.stickerViewer;
      this.setState({
        stickerViewer: !stickerViewer,
        emojiViewer: false
      });
    });
    _defineProperty(this, "toggleEmojiPicker", () => {
      const emojiViewer = this.state.emojiViewer;
      this.setState({
        emojiViewer: !emojiViewer,
        stickerViewer: false
      });
    });
    _defineProperty(this, "toggleCreatePoll", () => {
      const createPoll = this.state.createPoll;
      this.setState({
        createPoll: !createPoll
      });
    });
    _defineProperty(this, "toggleCollaborativeDocument", () => {
      const {
        receiverId,
        receiverType
      } = this.getReceiverDetails();
      _chat.CometChat.callExtension("document", "POST", "v1/create", {
        receiver: receiverId,
        receiverType: receiverType
      }).then(response => {
        // Response with document url
        if (response && response.hasOwnProperty("document_url")) {
          this.context.setToastMessage("success", "DOCUMENT_SUCCESS");
        } else {
          this.context.setToastMessage("error", "DOCUMENT_FAIL");
        }
      }).catch(error => this.props.actionGenerated(enums.ACTIONS["ERROR"], [], "SOMETHING_WRONG"));
    });
    _defineProperty(this, "toggleCollaborativeBoard", () => {
      const {
        receiverId,
        receiverType
      } = this.getReceiverDetails();
      _chat.CometChat.callExtension("whiteboard", "POST", "v1/create", {
        receiver: receiverId,
        receiverType: receiverType
      }).then(response => {
        // Response with board_url
        if (response && response.hasOwnProperty("board_url")) {
          this.context.setToastMessage("success", "WHITEBOARD_SUCCESS");
        } else {
          this.context.setToastMessage("error", "WHITEBOARD_FAIL");
        }
      }).catch(error => this.props.actionGenerated(enums.ACTIONS["ERROR"], [], "SOMETHING_WRONG"));
    });
    _defineProperty(this, "closeCreatePoll", () => {
      this.toggleCreatePoll();
      this.toggleFilePicker();
    });
    _defineProperty(this, "actionHandler", (action, message) => {
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
    });
    _defineProperty(this, "sendSticker", stickerMessage => {
      const {
        receiverId,
        receiverType
      } = this.getReceiverDetails();
      const customData = {
        sticker_url: stickerMessage.stickerUrl,
        sticker_name: stickerMessage.stickerName
      };
      const customType = enums.CUSTOM_TYPE_STICKER;
      const customMessage = new _chat.CometChat.CustomMessage(receiverId, receiverType, customType, customData);
      if (this.props.parentMessageId) {
        customMessage.setParentMessageId(this.props.parentMessageId);
      }
      customMessage.setSender(this.loggedInUser);
      customMessage.setReceiver(this.context.type);
      customMessage.setMetadata({
        incrementUnreadCount: true
      });
      customMessage._composedAt = (0, _common.getUnixTimestamp)();
      customMessage._id = (0, _common.ID)();
      this.props.actionGenerated(enums.ACTIONS["MESSAGE_COMPOSED"], [customMessage]);
      _SoundManager.SoundManager.play(enums.CONSTANTS.AUDIO["OUTGOING_MESSAGE"], this.context);
      _chat.CometChat.sendCustomMessage(customMessage).then(message => {
        const newMessageObj = _objectSpread(_objectSpread({}, message), {}, {
          _id: customMessage._id
        });
        this.props.actionGenerated(enums.ACTIONS["MESSAGE_SENT"], [newMessageObj]);
      }).catch(error => {
        const newMessageObj = _objectSpread(_objectSpread({}, customMessage), {}, {
          error: error
        });
        this.props.actionGenerated(enums.ACTIONS["ERROR_IN_SENDING_MESSAGE"], [newMessageObj]);
      });
    });
    _defineProperty(this, "sendReplyMessage", messageInput => {
      let {
        receiverId,
        receiverType
      } = this.getReceiverDetails();
      let textMessage = new _chat.CometChat.TextMessage(receiverId, messageInput, receiverType);
      if (this.props.parentMessageId) {
        textMessage.setParentMessageId(this.props.parentMessageId);
      }
      textMessage.setSender(this.loggedInUser);
      textMessage.setReceiver(this.context.type);
      textMessage._composedAt = (0, _common.getUnixTimestamp)();
      textMessage._id = (0, _common.ID)();
      this.props.actionGenerated(enums.ACTIONS["MESSAGE_COMPOSED"], [textMessage]);
      _SoundManager.SoundManager.play(enums.CONSTANTS.AUDIO["OUTGOING_MESSAGE"], this.context);
      this.setState({
        replyPreview: null
      });
      _chat.CometChat.sendMessage(textMessage).then(message => {
        const newMessageObj = _objectSpread(_objectSpread({}, message), {}, {
          _id: textMessage._id
        });
        this.props.actionGenerated(enums.ACTIONS["MESSAGE_SENT"], [newMessageObj]);
      }).catch(error => {
        const newMessageObj = _objectSpread(_objectSpread({}, textMessage), {}, {
          error: error
        });
        this.props.actionGenerated(enums.ACTIONS["ERROR_IN_SENDING_MESSAGE"], [newMessageObj]);
      });
    });
    _defineProperty(this, "clearReplyPreview", () => {
      this.setState({
        replyPreview: null
      });
    });
    _defineProperty(this, "startLiveReaction", event => {
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
    });
    _defineProperty(this, "stopLiveReaction", () => {
      //unmount the live reaction component
      this.props.actionGenerated(enums.ACTIONS["STOP_LIVE_REACTION"]);

      //set the animation flag to false
      this.animationInProgress = false;
    });
    _defineProperty(this, "sendTransientMessage", () => {
      var _this$context, _this$context2, _this$context3, _this$context4;
      //fetching the metadata type from constants
      const metadata = {
        type: enums.CONSTANTS["METADATA_TYPE_LIVEREACTION"],
        reaction: this.props.reaction
      };
      const receiverType = (this === null || this === void 0 || (_this$context = this.context) === null || _this$context === void 0 ? void 0 : _this$context.type) === _chat.CometChat.ACTION_TYPE.TYPE_USER ? _chat.CometChat.ACTION_TYPE.TYPE_USER : _chat.CometChat.ACTION_TYPE.TYPE_GROUP;
      const receiverId = (this === null || this === void 0 || (_this$context2 = this.context) === null || _this$context2 === void 0 ? void 0 : _this$context2.type) === _chat.CometChat.ACTION_TYPE.TYPE_USER ? this === null || this === void 0 || (_this$context3 = this.context) === null || _this$context3 === void 0 || (_this$context3 = _this$context3.item) === null || _this$context3 === void 0 ? void 0 : _this$context3.uid : this === null || this === void 0 || (_this$context4 = this.context) === null || _this$context4 === void 0 || (_this$context4 = _this$context4.item) === null || _this$context4 === void 0 ? void 0 : _this$context4.guid;
      let transientMessage = new _chat.CometChat.TransientMessage(receiverId, receiverType, metadata);
      _chat.CometChat.sendTransientMessage(transientMessage);
    });
    _defineProperty(this, "reactToMessages", emoji => {
      //close the emoji keyboard
      this.toggleEmojiPicker();

      //message object data structure
      let messageObject = _objectSpread({}, this.state.messageToReact);
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
        [emoji.char]: {
          [this.loggedInUser.uid]: userObject
        }
      };
      const reactionExtensionsData = (0, _common.checkMessageForExtensionsData)(messageObject, "reactions");
      //if the message object has reactions extension data in metadata
      if (reactionExtensionsData) {
        //if the reactions metadata has the selected emoji/reaction
        if (reactionExtensionsData[emoji.char]) {
          //if the reactions metadata has the selected emoji/reaction for the loggedin user
          if (reactionExtensionsData[emoji.char][this.loggedInUser.uid]) {
            reactionObject = _objectSpread({}, messageObject["metadata"]["@injected"]["extensions"]["reactions"]);
            delete reactionObject[emoji.char][this.loggedInUser.uid];
          } else {
            reactionObject = _objectSpread(_objectSpread({}, messageObject["metadata"]["@injected"]["extensions"]["reactions"]), {}, {
              [emoji.char]: _objectSpread(_objectSpread({}, messageObject["metadata"]["@injected"]["extensions"]["reactions"][emoji.char]), {}, {
                [this.loggedInUser.uid]: userObject
              })
            });
          }
        } else {
          reactionObject = _objectSpread(_objectSpread({}, messageObject["metadata"]["@injected"]["extensions"]["reactions"]), emojiObject);
        }
      } else {
        if (messageObject.hasOwnProperty("metadata") === false) {
          messageObject["metadata"] = {};
        }
        if (messageObject["metadata"].hasOwnProperty("@injected") === false) {
          messageObject["metadata"]["@injected"] = {};
        }
        if (messageObject["metadata"]["@injected"].hasOwnProperty("extensions") === false) {
          messageObject["metadata"]["@injected"]["extensions"] = {};
        }
        if (messageObject["metadata"]["@injected"]["extensions"].hasOwnProperty("reactions") === false) {
          messageObject["metadata"]["@injected"]["extensions"]["reactions"] = {};
        }
        reactionObject = _objectSpread({}, emojiObject);
      }
      const metadatObject = {
        metadata: _objectSpread(_objectSpread({}, messageObject["metadata"]), {}, {
          "@injected": _objectSpread(_objectSpread({}, messageObject["metadata"]["@injected"]), {}, {
            extensions: _objectSpread(_objectSpread({}, messageObject["metadata"]["@injected"]["extensions"]), {}, {
              reactions: _objectSpread({}, reactionObject)
            })
          })
        })
      };
      newMessageObject = _objectSpread(_objectSpread({}, messageObject), {}, {
        data: _objectSpread(_objectSpread({}, messageObject), metadatObject)
      }, metadatObject);
      this.props.actionGenerated(enums.ACTIONS["MESSAGE_EDITED"], newMessageObject);
      _chat.CometChat.callExtension("reactions", "POST", "v1/react", {
        msgId: this.state.messageToReact.id,
        emoji: emoji.char
      }).then(response => {
        // Reaction failed
        if (!response || !response.success || response.success !== true) {
          this.props.actionGenerated(enums.ACTIONS["ERROR"], [], "SOMETHING_WRONG");
        }
      }).catch(error => this.props.actionGenerated(enums.ACTIONS["ERROR"], [], "SOMETHING_WRONG"));
    });
    this.imageUploaderRef = /*#__PURE__*/_react.default.createRef();
    this.fileUploaderRef = /*#__PURE__*/_react.default.createRef();
    this.audioUploaderRef = /*#__PURE__*/_react.default.createRef();
    this.videoUploaderRef = /*#__PURE__*/_react.default.createRef();
    this.messageInputRef = /*#__PURE__*/_react.default.createRef();
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
      enableCollaborativeWhiteboard: false
    };
  }
  componentDidMount() {
    _chat.CometChat.getLoggedinUser().then(user => this.loggedInUser = user).catch(error => this.props.actionGenerated(enums.ACTIONS["ERROR"], [], "SOMETHING_WRONG"));
    this.item = this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_USER || this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP ? this.context.item : null;
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
        messageToBeEdited: messageToBeEdited
      });
      const element = this.messageInputRef.current;
      if (messageToBeEdited) {
        let messageText = messageToBeEdited.text;

        //xss extensions data
        const xssData = (0, _common.checkMessageForExtensionsData)(messageToBeEdited, "xss-filter");
        if (xssData && xssData.hasOwnProperty("sanitized_text") && xssData.hasOwnProperty("hasXSS") && xssData.hasXSS === "yes") {
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
      this.setState({
        replyPreview: this.props.replyPreview
      });
    }
    const previousMessageStr = JSON.stringify(prevProps.messageToReact);
    const currentMessageStr = JSON.stringify(this.props.messageToReact);
    if (previousMessageStr !== currentMessageStr) {
      this.setState({
        messageToReact: this.props.messageToReact
      });
    }
    if (this.context.item !== this.item) {
      this.messageInputRef.current.textContent = "";
      this.setState({
        stickerViewer: false,
        emojiViewer: false,
        replyPreview: null,
        messageToBeEdited: "",
        messageInput: ""
      });
      this.focusOnMessageComposer();
    }
    if (prevState.messageInput !== this.state.messageInput) {
      this.focusOnMessageComposer();
    }
    this.item = this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_USER || this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP ? this.context.item : null;
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
        while (node = el.firstChild) {
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
  render() {
    let liveReactionBtn = null;
    const liveReactionText = _translator.default.translate("LIVE_REACTION", this.context.language);
    if (enums.CONSTANTS["LIVE_REACTIONS"].hasOwnProperty(this.props.reaction)) {
      const reactionName = this.props.reaction;
      liveReactionBtn = /*#__PURE__*/_react.default.createElement(_react2.Box, {
        title: liveReactionText,
        className: "button__reactions",
        w: "40px",
        h: "40px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        onClick: this.startLiveReaction
      }, /*#__PURE__*/_react.default.createElement(_phosphorReact.Heart, {
        color: "red",
        size: 24,
        weight: "duotone"
      }));
    }
    let disabledState = false;
    if (this.context.item.blockedByMe) {
      disabledState = true;
    }
    const docText = _translator.default.translate("ATTACH_FILE", this.context.language);
    let docs = /*#__PURE__*/_react.default.createElement(_react2.Box, {
      title: docText,
      className: "filelist__item item__file",
      w: "40px",
      h: "40px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: this.context.theme.primaryColor,
      onClick: () => {
        this.openFileDialogue("file");
      }
    }, /*#__PURE__*/_react.default.createElement(_phosphorReact.FilePlus, {
      size: 24,
      weight: "duotone"
    }), /*#__PURE__*/_react.default.createElement("input", {
      onChange: this.onFileChange,
      type: "file",
      id: "file",
      ref: this.fileUploaderRef,
      style: {
        display: "none"
      }
    }));
    const videoText = _translator.default.translate("ATTACH_VIDEO", this.context.language);
    const audioText = _translator.default.translate("ATTACH_AUDIO", this.context.language);
    const imageText = _translator.default.translate("ATTACH_IMAGE", this.context.language);
    let avp = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      title: videoText,
      className: "filelist__item item__video",
      w: "40px",
      h: "40px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: this.context.theme.primaryColor,
      onClick: () => {
        this.openFileDialogue("video");
      }
    }, /*#__PURE__*/_react.default.createElement(_phosphorReact.FileVideo, {
      size: 24,
      weight: "duotone"
    }), /*#__PURE__*/_react.default.createElement("input", {
      onChange: this.onVideoChange,
      accept: "video/*",
      type: "file",
      ref: this.videoUploaderRef,
      style: {
        display: "none"
      }
    })), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      title: audioText,
      className: "filelist__item item__audio",
      w: "40px",
      h: "40px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: this.context.theme.primaryColor,
      onClick: () => {
        this.openFileDialogue("audio");
      }
    }, /*#__PURE__*/_react.default.createElement(_phosphorReact.FileAudio, {
      size: 24,
      weight: "duotone"
    }), /*#__PURE__*/_react.default.createElement("input", {
      onChange: this.onAudioChange,
      accept: "audio/*",
      type: "file",
      ref: this.audioUploaderRef,
      style: {
        display: "none"
      }
    })), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      title: imageText,
      className: "filelist__item item__image",
      w: "40px",
      h: "40px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: this.context.theme.primaryColor,
      onClick: () => {
        this.openFileDialogue("image");
      }
    }, /*#__PURE__*/_react.default.createElement(_phosphorReact.FileImage, {
      size: 24,
      weight: "duotone"
    }), /*#__PURE__*/_react.default.createElement("input", {
      onChange: this.onImageChange,
      accept: "image/*",
      type: "file",
      ref: this.imageUploaderRef,
      style: {
        display: "none"
      }
    })));
    const pollText = _translator.default.translate("CREATE_POLL", this.context.language);
    let createPollBtn = /*#__PURE__*/_react.default.createElement(_react2.Box, {
      title: pollText,
      className: "filelist__item item__poll",
      w: "40px",
      h: "40px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: this.context.theme.primaryColor,
      onClick: this.toggleCreatePoll,
      sx: {
        mask: "url(".concat(_polls.default, ") center center no-repeat"),
        backgroundColor: this.context.theme.primaryColor
      }
    });
    const collaborativeDocText = _translator.default.translate("COLLABORATE_USING_DOCUMENT", this.context.language);
    let collaborativeDocBtn = /*#__PURE__*/_react.default.createElement(_react2.Box, {
      title: collaborativeDocText,
      className: "filelist__item item__document",
      w: "40px",
      h: "40px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: this.context.theme.primaryColor,
      onClick: this.toggleCollaborativeDocument,
      sx: {
        mask: "url(".concat(_collaborativeDocument.default, ") center center no-repeat"),
        backgroundColor: this.context.theme.primaryColor
      }
    });
    const collaborativeBoardText = _translator.default.translate("COLLABORATE_USING_WHITEBOARD", this.context.language);
    let collaborativeBoardBtn = /*#__PURE__*/_react.default.createElement(_react2.Box, {
      title: collaborativeBoardText,
      className: "filelist__item item__whiteboard",
      w: "40px",
      h: "40px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: this.context.theme.primaryColor,
      onClick: this.toggleCollaborativeBoard,
      sx: {
        mask: "url(".concat(_collaborativeWhiteboard.default, ") center center no-repeat"),
        backgroundColor: this.context.theme.primaryColor
      }
    });
    const emojiText = _translator.default.translate("EMOJI", this.context.language);
    let emojiBtn = /*#__PURE__*/_react.default.createElement(_react2.Box, {
      title: emojiText,
      className: "button__emoji",
      w: "40px",
      h: "40px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      onClick: () => {
        this.toggleEmojiPicker();
        this.setState({
          messageToReact: ""
        });
      }
    }, /*#__PURE__*/_react.default.createElement(_phosphorReact.SmileySticker, {
      color: "#fcba03",
      size: 24,
      weight: "duotone"
    }));
    const StickerText = _translator.default.translate("STICKER", this.context.language);
    let stickerBtn = /*#__PURE__*/_react.default.createElement(_react2.Box, {
      title: StickerText,
      className: "button__sticker",
      w: "40px",
      h: "40px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      onClick: this.toggleStickerPicker,
      sx: {
        mask: "url(".concat(_stickers.default, ") center center no-repeat"),
        backgroundColor: this.context.theme.primaryColor
      }
    });
    const sendMessageText = _translator.default.translate("SEND_MESSAGE", this.context.language);
    let sendBtn = /*#__PURE__*/_react.default.createElement(_react2.Box, {
      title: sendMessageText,
      className: "button__send",
      w: "40px",
      h: "40px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      onClick: this.sendTextMessage
    }, /*#__PURE__*/_react.default.createElement(_phosphorReact.PaperPlaneRight, {
      color: "#3182CE",
      size: 24,
      weight: "duotone"
    }));

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
    if (this.state.enableCollaborativeDocument === false || this.props.parentMessageId) {
      collaborativeDocBtn = null;
    }

    //if collaborative_document are disabled for chat widget in dashboard
    if (this.state.enableCollaborativeWhiteboard === false || this.props.parentMessageId) {
      collaborativeBoardBtn = null;
    }

    //if emojis are disabled for chat widget in dashboard
    if (this.state.enableEmojis === false) {
      emojiBtn = null;
    }

    //if live reactions is disabled for chat widget in dashboard
    if (this.state.enableLiveReaction === false || this.state.messageInput.length || this.props.parentMessageId) {
      liveReactionBtn = null;
    }

    //if stickers is disabled for chat widget in dashboard
    if (this.state.enableStickers === false) {
      stickerBtn = null;
    }
    if (!this.state.messageInput.length) {
      sendBtn = null;
    }
    const attachText = _translator.default.translate("ATTACH", this.context.language);
    let attach = /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "input__sticky__attachment",
      position: "relative"
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "attachment__icon",
      w: "40px",
      h: "40px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      onClick: this.toggleFilePicker,
      title: attachText
    }, /*#__PURE__*/_react.default.createElement(_phosphorReact.Plus, {
      size: 24,
      weight: "duotone"
    })), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "attachment__filepicker",
      display: this.state.showFilePicker ? "block" : "none",
      position: "absolute",
      bottom: "50px",
      left: "0",
      bg: this.context.theme.backgroundColor.white,
      border: "1px solid ".concat(this.context.theme.borderColor.primary),
      borderRadius: "8px",
      p: "8px",
      zIndex: "100",
      dir: _translator.default.getDirection(this.context.language)
    }, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "filepicker__filelist",
      gap: "8px"
    }, avp, docs, createPollBtn, collaborativeDocBtn, collaborativeBoardBtn)));
    if (avp === null && docs === null && createPollBtn === null && collaborativeDocBtn === null && collaborativeBoardBtn === null) {
      attach = null;
    }
    let createPoll = null;
    if (this.state.createPoll) {
      createPoll = /*#__PURE__*/_react.default.createElement(_Extensions.CometChatCreatePoll, {
        close: this.closeCreatePoll,
        actionGenerated: this.actionHandler
      });
    }
    let editPreview = null;
    if (this.state.messageToBeEdited) {
      let messageText = this.state.messageToBeEdited.text;

      //xss extensions data
      const xssData = (0, _common.checkMessageForExtensionsData)(this.state.messageToBeEdited, "xss-filter");
      if (xssData && xssData.hasOwnProperty("sanitized_text") && xssData.hasOwnProperty("hasXSS") && xssData.hasXSS === "yes") {
        messageText = xssData.sanitized_text;
      }

      //datamasking extensions data
      const maskedData = (0, _common.checkMessageForExtensionsData)(this.state.messageToBeEdited, "data-masking");
      if (maskedData && maskedData.hasOwnProperty("data") && maskedData.data.hasOwnProperty("sensitive_data") && maskedData.data.hasOwnProperty("message_masked") && maskedData.data.sensitive_data === "yes") {
        messageText = maskedData.data.message_masked;
      }

      //profanity extensions data
      const profaneData = (0, _common.checkMessageForExtensionsData)(this.state.messageToBeEdited, "profanity-filter");
      if (profaneData && profaneData.hasOwnProperty("profanity") && profaneData.hasOwnProperty("message_clean") && profaneData.profanity === "yes") {
        messageText = profaneData.message_clean;
      }
      const slideAnimation = (0, _react2.keyframes)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n        from { bottom: -60px }\n        to { bottom: 0px }\n      "])));
      editPreview = /*#__PURE__*/_react.default.createElement(_react2.Box, {
        p: "7px",
        bg: this.context.theme.backgroundColor.white,
        borderColor: this.context.theme.borderColor.primary,
        borderWidth: "1px 1px 1px 5px",
        borderStyle: "solid",
        color: this.context.theme.color.helpText,
        fontSize: "13px",
        position: "relative",
        sx: {
          animation: "".concat(slideAnimation, " 0.5s ease-out")
        }
      }, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
        alignItems: "center",
        justifyContent: "space-between"
      }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
        py: "5px"
      }, _translator.default.translate("EDIT_MESSAGE", this.context.language)), /*#__PURE__*/_react.default.createElement(_react2.Box, {
        cursor: "pointer",
        w: "20px",
        h: "20px",
        onClick: this.closeEditPreview,
        sx: {
          mask: "url(".concat(_close.default, ") center center no-repeat"),
          backgroundColor: this.context.theme.primaryColor
        }
      })), /*#__PURE__*/_react.default.createElement(_react2.Box, null, messageText));
    }
    let smartReplyPreview = null;
    if (this.state.replyPreview) {
      const message = this.state.replyPreview;
      const smartReplyData = (0, _common.checkMessageForExtensionsData)(message, "smart-reply");
      if (smartReplyData && smartReplyData.hasOwnProperty("error") === false) {
        const options = [smartReplyData["reply_positive"], smartReplyData["reply_neutral"], smartReplyData["reply_negative"]];
        smartReplyPreview = /*#__PURE__*/_react.default.createElement(_Extensions.CometChatSmartReplyPreview, {
          options: options,
          clicked: this.sendReplyMessage,
          close: this.clearReplyPreview
        });
      }
    }
    let stickerViewer = null;
    if (this.state.stickerViewer) {
      stickerViewer = /*#__PURE__*/_react.default.createElement(_Extensions.CometChatStickerKeyboard, {
        actionGenerated: this.actionHandler
      });
    }
    let emojiViewer = null;
    if (this.state.emojiViewer) {
      emojiViewer = /*#__PURE__*/_react.default.createElement(_.CometChatEmojiKeyboard, {
        onClick: this.emojiClicked
      });
    }
    return /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "chat__composer",
      p: "16px",
      bg: this.context.theme.backgroundColor.white,
      zIndex: "1",
      order: "3",
      position: "relative",
      flex: "none",
      minH: "105px"
    }, editPreview, smartReplyPreview, stickerViewer, emojiViewer, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "composer__input",
      position: "relative"
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "input__inner",
      tabIndex: "-1",
      border: "1px solid ".concat(this.context.theme.borderColor.primary),
      borderRadius: "8px",
      bg: this.context.theme.backgroundColor.white,
      position: "relative",
      overflow: "hidden"
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "input__message-input",
      contentEditable: "true",
      placeholder: _translator.default.translate("ENTER_YOUR_MESSAGE_HERE", this.context.language),
      dir: _translator.default.getDirection(this.context.language),
      onInput: this.changeHandler,
      onBlur: event => this.endTyping(event),
      onKeyDown: this.sendMessageOnEnter,
      ref: this.messageInputRef,
      minH: "40px",
      maxH: "120px",
      overflow: "auto",
      p: "8px 60px 8px 16px",
      outline: "none",
      color: this.context.theme.color.primary,
      opacity: disabledState ? 0.5 : 1,
      pointerEvents: disabledState ? "none" : "auto",
      sx: {
        "&::before": {
          content: "\"".concat(_translator.default.translate("ENTER_YOUR_MESSAGE_HERE", this.context.language), "\""),
          position: "absolute",
          color: this.context.theme.color.helpText,
          pointerEvents: "none",
          display: this.state.messageInput ? "none" : "block"
        }
      }
    }), /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "input__sticky",
      position: "absolute",
      right: "8px",
      top: "50%",
      transform: "translateY(-50%)",
      alignItems: "center",
      gap: "4px"
    }, attach, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "input__sticky__buttons",
      alignItems: "center",
      gap: "4px"
    }, stickerBtn, emojiBtn, sendBtn, liveReactionBtn)))), createPoll);
  }
}

// Specifies the default values for props:
exports.CometChatMessageComposer = CometChatMessageComposer;
_defineProperty(CometChatMessageComposer, "contextType", _CometChatContext.CometChatContext);
CometChatMessageComposer.defaultProps = {
  theme: _theme.theme,
  reaction: "heart",
  onMessageSend: undefined
};
CometChatMessageComposer.propTypes = {
  theme: _propTypes.default.object,
  reaction: _propTypes.default.string,
  onMessageSend: _propTypes.default.func
};