"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.USER_ONLINE = exports.USER_OFFLINE = exports.TYPING_STARTED = exports.TYPING_ENDED = exports.TRANSIENT_MESSAGE_RECEIVED = exports.TEXT_MESSAGE_RECEIVED = exports.OUTGOING_CALL_REJECTED = exports.OUTGOING_CALL_ACCEPTED = exports.MESSAGE_READ = exports.MESSAGE_EDITED = exports.MESSAGE_DELIVERED = exports.MESSAGE_DELETED = exports.MEDIA_MESSAGE_RECEIVED = exports.KEYS = exports.INCOMING_CALL_RECEIVED = exports.INCOMING_CALL_CANCELLED = exports.GROUP_MEMBER_UNBANNED = exports.GROUP_MEMBER_SCOPE_CHANGED = exports.GROUP_MEMBER_LEFT = exports.GROUP_MEMBER_KICKED = exports.GROUP_MEMBER_JOINED = exports.GROUP_MEMBER_BANNED = exports.GROUP_MEMBER_ADDED = exports.EVENTS = exports.CUSTOM_TYPE_WHITEBOARD = exports.CUSTOM_TYPE_STICKER = exports.CUSTOM_TYPE_POLL = exports.CUSTOM_TYPE_MEETING = exports.CUSTOM_TYPE_DOCUMENT = exports.CUSTOM_MESSAGE_RECEIVED = exports.CONSTANTS = exports.ACTIONS = void 0;
const TEXT_MESSAGE_RECEIVED = exports.TEXT_MESSAGE_RECEIVED = "onTextMessageReceived";
const MEDIA_MESSAGE_RECEIVED = exports.MEDIA_MESSAGE_RECEIVED = "onMediaMessageReceived";
const CUSTOM_MESSAGE_RECEIVED = exports.CUSTOM_MESSAGE_RECEIVED = "onCustomMessageReceived";
const MESSAGE_DELIVERED = exports.MESSAGE_DELIVERED = "onMessagesDelivered";
const MESSAGE_READ = exports.MESSAGE_READ = "onMessagesRead";
const MESSAGE_DELETED = exports.MESSAGE_DELETED = "onMessageDeleted";
const MESSAGE_EDITED = exports.MESSAGE_EDITED = "onMessageEdited";
const TRANSIENT_MESSAGE_RECEIVED = exports.TRANSIENT_MESSAGE_RECEIVED = "onTransientMessageReceived";
const INCOMING_CALL_RECEIVED = exports.INCOMING_CALL_RECEIVED = "onIncomingCallReceived";
const OUTGOING_CALL_ACCEPTED = exports.OUTGOING_CALL_ACCEPTED = "onOutgoingCallAccepted";
const OUTGOING_CALL_REJECTED = exports.OUTGOING_CALL_REJECTED = "onOutgoingCallRejected";
const INCOMING_CALL_CANCELLED = exports.INCOMING_CALL_CANCELLED = "onIncomingCallCancelled";
const GROUP_MEMBER_SCOPE_CHANGED = exports.GROUP_MEMBER_SCOPE_CHANGED = "onGroupMemberScopeChanged";
const GROUP_MEMBER_KICKED = exports.GROUP_MEMBER_KICKED = "onGroupMemberKicked";
const GROUP_MEMBER_BANNED = exports.GROUP_MEMBER_BANNED = "onGroupMemberBanned";
const GROUP_MEMBER_UNBANNED = exports.GROUP_MEMBER_UNBANNED = "onGroupMemberUnbanned";
const GROUP_MEMBER_ADDED = exports.GROUP_MEMBER_ADDED = "onMemberAddedToGroup";
const GROUP_MEMBER_LEFT = exports.GROUP_MEMBER_LEFT = "onGroupMemberLeft";
const GROUP_MEMBER_JOINED = exports.GROUP_MEMBER_JOINED = "onGroupMemberJoined";
const USER_ONLINE = exports.USER_ONLINE = "onUserOnline";
const USER_OFFLINE = exports.USER_OFFLINE = "onUserOffline";
const TYPING_STARTED = exports.TYPING_STARTED = "onTypingStarted";
const TYPING_ENDED = exports.TYPING_ENDED = "onTypingEnded";
const CUSTOM_TYPE_POLL = exports.CUSTOM_TYPE_POLL = "extension_poll";
const CUSTOM_TYPE_STICKER = exports.CUSTOM_TYPE_STICKER = "extension_sticker";
const CUSTOM_TYPE_DOCUMENT = exports.CUSTOM_TYPE_DOCUMENT = "extension_document";
const CUSTOM_TYPE_WHITEBOARD = exports.CUSTOM_TYPE_WHITEBOARD = "extension_whiteboard";
const CUSTOM_TYPE_MEETING = exports.CUSTOM_TYPE_MEETING = "meeting";
const CONSTANTS = exports.CONSTANTS = {
  LOCALE: "cometchat:locale",
  ACTIVECALL: "cometchat:activecall",
  MAX_MESSAGE_COUNT: 1000,
  METADATA_TYPE_LIVEREACTION: "live_reaction",
  LIVE_REACTIONS: {
    heart: "./resources/heart.png",
    thumbsup: "👍",
    clap: "👏",
    wink: "😉"
  },
  MESSAGES_COMPONENT: "messages",
  EMBEDDED_COMPONENT: "embedded",
  OUTGOING_DEFAULT_CALLING: "outgoing_default",
  INCOMING_DEFAULT_CALLING: "incoming_default",
  INCOMING_DIRECT_CALLING: "incoming_direct",
  OUTGOING_DIRECT_CALLING: "outgoing_direct",
  AUDIO: {
    INCOMING_MESSAGE: "incomingMessage",
    INCOMING_OTHER_MESSAGE: "incomingOtherMessage",
    OUTGOING_MESSAGE: "outgoingMessage",
    INCOMING_CALL: "incomingCall",
    OUTGOING_CALL: "outgoingCall"
  },
  ERROR_CODES: {
    ERR_CHAT_API_FAILURE: "ERR_CHAT_API_FAILURE"
  },
  CALLS: {
    ONGOING_CALL: "noOngoingCall",
    ONGOING_CALL_SAME_GROUP: "ongoingDirectCallInSameGroup",
    ONGOING_CALL_DIFF_GROUP: "ongoingDirectCallInDifferentGroup"
  },
  GROUPS: {
    OWNER: "owner"
  },
  LIVE_REACTION_INTERVAL: 1500,
  FILE_METADATA: "file"
};
const ACTIONS = exports.ACTIONS = {
  MESSAGE_SENT: "messageSent",
  MESSAGE_COMPOSED: "messageComposed",
  ERROR_IN_SENDING_MESSAGE: "errorInSendingMessage",
  ACCEPT_DIRECT_CALL: "acceptDirectCall",
  JOIN_DIRECT_CALL: "joinDirectCall",
  START_DIRECT_CALL: "startDirectCall",
  DIRECT_CALL_ENDED: "directCallEnded",
  POLL_CREATED: "pollCreated",
  GROUP_DELETED: "groupDeleted",
  GROUP_LEFT: "leftGroup",
  GROUP_CREATED: "groupCreated",
  VIEW_DETAIL: "viewDetail",
  VIEW_THREADED_MESSAGE: "viewThreadedMessage",
  CLOSE_THREADED_MESSAGE: "closeThreadedMessage",
  TOGGLE_SIDEBAR: "toggleSidebar",
  ON_MESSAGE_EDITED: "onMessageEdited",
  ON_MESSAGE_DELETED: "onMessageDeleted",
  ON_MESSAGE_READ_DELIVERED: "onMessageReadAndDelivered",
  DELETE_MESSAGE: "deleteMessage",
  MESSAGE_DELETED: "messageDeleted",
  EDIT_MESSAGE: "editMessage",
  MESSAGE_EDITED: "messageEdited",
  CLOSE_GROUP_DETAIL: "closeGroupDetail",
  CLOSE_USER_DETAIL: "closeUserDetail",
  VIEW_ORIGINAL_IMAGE: "viewOriginalImage",
  FETCH_GROUP_MEMBERS: "fetchGroupMembers",
  SCOPECHANGE_GROUPMEMBER_SUCCESS: "updateGroupMember",
  BAN_GROUP_MEMBER: "ban",
  KICK_GROUP_MEMBER: "kick",
  BAN_GROUPMEMBER_SUCCESS: "banGroupMember",
  KICK_GROUPMEMBER_SUCCESS: "kickGroupMember",
  CHANGE_SCOPE_GROUP_MEMBER: "changescope",
  UNBAN_GROUP_MEMBER: "unban",
  ADD_GROUP_MEMBER_SUCCESS: "addGroupMembers",
  FETCH_BANNED_GROUP_MEMBERS: "fetchBannedGroupMembers",
  UNBAN_GROUP_MEMBER_SUCCESS: "unbanGroupMembers",
  REACT_TO_MESSAGE: "reactToMessage",
  INITIATE_VIDEO_CALL: "initiateVideoCall",
  INITIATE_AUDIO_CALL: "initiateAudioCall",
  CHANGE_TAB: "changeTab",
  ITEM_CLICKED: "itemClicked",
  THREAD_MESSAGE_COMPOSED: "threadMessageComposed",
  SEND_LIVE_REACTION: "sendReaction",
  STOP_LIVE_REACTION: "stopReaction",
  SHOW_LIVE_REACTION: "showReaction",
  CLEAR_EDIT_PREVIEW: "clearEditPreview",
  MESSAGE_RECEIVED: "messageReceived",
  CUSTOM_MESSAGE_RECEIVED: "customMessageReceived",
  MESSAGE_READ: "messageRead",
  MESSAGES_INITIAL_FETCH: "messageInitialFetch",
  MESSAGES_FETCHED: "messageFetched",
  REFRESHING_MESSAGES: "refreshingMessages",
  MESSAGES_REFRESHED: "messageRefreshed",
  NEW_MESSAGES: "newMessagesArrived",
  CLEAR_UNREAD_MESSAGES: "clearUnreadMessages",
  START_AUDIO_CALL: "startAudioCall",
  START_VIDEO_CALL: "startVideoCall",
  OUTGOING_CALL_ACCEPTED: "outgoingCallAccepted",
  OUTGOING_CALL_REJECTED: "outgoingCallRejected",
  OUTGOING_CALL_CANCELLED: "outgoingCallCancelled",
  INCOMING_CALL_ACCEPTED: "incomingCallAccepted",
  INCOMING_CALL_REJECTED: "incomingCallRejected",
  CALL_ENDED: "callEnded",
  USER_JOINED_CALL: "userJoinedCall",
  USER_LEFT_CALL: "userLeftCall",
  DELETE_CONVERSATION: "deleteConversation",
  CONVERSATION_DELETED: "conversationDeleted",
  SEND_STICKER: "sendSticker",
  CLOSE_STICKER_KEYBOARD: "closeStickerKeyboard",
  ERROR: "errorOccurred",
  INFO: "infoMessage",
  TRANSLATE_MESSAGE: "translateMessage"
};
const EVENTS = exports.EVENTS = {
  NEW_MESSAGES: "newMessagesArrived",
  CLEAR_UNREAD_MESSAGES: "clearUnreadMessages"
};
const KEYS = exports.KEYS = {
  METADATA: "metadata",
  INCREMENT_UNREAD_COUNT: "incrementUnreadCount"
};