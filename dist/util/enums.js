"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.USER_ONLINE = exports.USER_OFFLINE = exports.TYPING_STARTED = exports.TYPING_ENDED = exports.TRANSIENT_MESSAGE_RECEIVED = exports.TEXT_MESSAGE_RECEIVED = exports.OUTGOING_CALL_REJECTED = exports.OUTGOING_CALL_ACCEPTED = exports.MESSAGE_READ = exports.MESSAGE_EDITED = exports.MESSAGE_DELIVERED = exports.MESSAGE_DELETED = exports.MEDIA_MESSAGE_RECEIVED = exports.KEYS = exports.INCOMING_CALL_RECEIVED = exports.INCOMING_CALL_CANCELLED = exports.GROUP_MEMBER_UNBANNED = exports.GROUP_MEMBER_SCOPE_CHANGED = exports.GROUP_MEMBER_LEFT = exports.GROUP_MEMBER_KICKED = exports.GROUP_MEMBER_JOINED = exports.GROUP_MEMBER_BANNED = exports.GROUP_MEMBER_ADDED = exports.EVENTS = exports.CUSTOM_TYPE_WHITEBOARD = exports.CUSTOM_TYPE_STICKER = exports.CUSTOM_TYPE_POLL = exports.CUSTOM_TYPE_MEETING = exports.CUSTOM_TYPE_DOCUMENT = exports.CUSTOM_MESSAGE_RECEIVED = exports.CONSTANTS = exports.ACTIONS = void 0;
const TEXT_MESSAGE_RECEIVED = 'onTextMessageReceived';
exports.TEXT_MESSAGE_RECEIVED = TEXT_MESSAGE_RECEIVED;
const MEDIA_MESSAGE_RECEIVED = 'onMediaMessageReceived';
exports.MEDIA_MESSAGE_RECEIVED = MEDIA_MESSAGE_RECEIVED;
const CUSTOM_MESSAGE_RECEIVED = 'onCustomMessageReceived';
exports.CUSTOM_MESSAGE_RECEIVED = CUSTOM_MESSAGE_RECEIVED;
const MESSAGE_DELIVERED = 'onMessagesDelivered';
exports.MESSAGE_DELIVERED = MESSAGE_DELIVERED;
const MESSAGE_READ = 'onMessagesRead';
exports.MESSAGE_READ = MESSAGE_READ;
const MESSAGE_DELETED = 'onMessageDeleted';
exports.MESSAGE_DELETED = MESSAGE_DELETED;
const MESSAGE_EDITED = 'onMessageEdited';
exports.MESSAGE_EDITED = MESSAGE_EDITED;
const TRANSIENT_MESSAGE_RECEIVED = "onTransientMessageReceived";
exports.TRANSIENT_MESSAGE_RECEIVED = TRANSIENT_MESSAGE_RECEIVED;
const INCOMING_CALL_RECEIVED = 'onIncomingCallReceived';
exports.INCOMING_CALL_RECEIVED = INCOMING_CALL_RECEIVED;
const OUTGOING_CALL_ACCEPTED = 'onOutgoingCallAccepted';
exports.OUTGOING_CALL_ACCEPTED = OUTGOING_CALL_ACCEPTED;
const OUTGOING_CALL_REJECTED = 'onOutgoingCallRejected';
exports.OUTGOING_CALL_REJECTED = OUTGOING_CALL_REJECTED;
const INCOMING_CALL_CANCELLED = 'onIncomingCallCancelled';
exports.INCOMING_CALL_CANCELLED = INCOMING_CALL_CANCELLED;
const GROUP_MEMBER_SCOPE_CHANGED = "onGroupMemberScopeChanged";
exports.GROUP_MEMBER_SCOPE_CHANGED = GROUP_MEMBER_SCOPE_CHANGED;
const GROUP_MEMBER_KICKED = "onGroupMemberKicked";
exports.GROUP_MEMBER_KICKED = GROUP_MEMBER_KICKED;
const GROUP_MEMBER_BANNED = "onGroupMemberBanned";
exports.GROUP_MEMBER_BANNED = GROUP_MEMBER_BANNED;
const GROUP_MEMBER_UNBANNED = "onGroupMemberUnbanned";
exports.GROUP_MEMBER_UNBANNED = GROUP_MEMBER_UNBANNED;
const GROUP_MEMBER_ADDED = "onMemberAddedToGroup";
exports.GROUP_MEMBER_ADDED = GROUP_MEMBER_ADDED;
const GROUP_MEMBER_LEFT = "onGroupMemberLeft";
exports.GROUP_MEMBER_LEFT = GROUP_MEMBER_LEFT;
const GROUP_MEMBER_JOINED = "onGroupMemberJoined";
exports.GROUP_MEMBER_JOINED = GROUP_MEMBER_JOINED;
const USER_ONLINE = "onUserOnline";
exports.USER_ONLINE = USER_ONLINE;
const USER_OFFLINE = "onUserOffline";
exports.USER_OFFLINE = USER_OFFLINE;
const TYPING_STARTED = "onTypingStarted";
exports.TYPING_STARTED = TYPING_STARTED;
const TYPING_ENDED = "onTypingEnded";
exports.TYPING_ENDED = TYPING_ENDED;
const CUSTOM_TYPE_POLL = "extension_poll";
exports.CUSTOM_TYPE_POLL = CUSTOM_TYPE_POLL;
const CUSTOM_TYPE_STICKER = "extension_sticker";
exports.CUSTOM_TYPE_STICKER = CUSTOM_TYPE_STICKER;
const CUSTOM_TYPE_DOCUMENT = "extension_document";
exports.CUSTOM_TYPE_DOCUMENT = CUSTOM_TYPE_DOCUMENT;
const CUSTOM_TYPE_WHITEBOARD = "extension_whiteboard";
exports.CUSTOM_TYPE_WHITEBOARD = CUSTOM_TYPE_WHITEBOARD;
const CUSTOM_TYPE_MEETING = "meeting";
exports.CUSTOM_TYPE_MEETING = CUSTOM_TYPE_MEETING;
const CONSTANTS = {
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
exports.CONSTANTS = CONSTANTS;
const ACTIONS = {
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
exports.ACTIONS = ACTIONS;
const EVENTS = {
  NEW_MESSAGES: "newMessagesArrived",
  CLEAR_UNREAD_MESSAGES: "clearUnreadMessages"
};
exports.EVENTS = EVENTS;
const KEYS = {
  METADATA: "metadata",
  INCREMENT_UNREAD_COUNT: "incrementUnreadCount"
};
exports.KEYS = KEYS;