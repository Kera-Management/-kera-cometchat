"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UIKitSettings = void 0;
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.string.trim.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _tabs = _interopRequireDefault(require("../resources/tabs.json"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class UIKitSettings {
  constructor() {
    _defineProperty(this, "widgetSettings", void 0);
    _defineProperty(this, "setCustomJS", customJS => {
      this.customJS = customJS;
    });
    _defineProperty(this, "setCustomCSS", customCSS => {
      this.customCSS = customCSS;
    });
    _defineProperty(this, "setTabs", tabList => {
      this.tabs = tabList;
    });
    _defineProperty(this, "setUserSettings", userSettings => {
      this.userSettings = userSettings;
    });
    _defineProperty(this, "setCalls", calls => {
      this.calls = calls;
    });
    _defineProperty(this, "setUsers", users => {
      this.users = users;
    });
    _defineProperty(this, "setChats", chats => {
      this.chats = chats;
    });
    _defineProperty(this, "setGroups", groups => {
      this.groups = groups;
    });
    _defineProperty(this, "setChatListMode", option => {
      if (!option.trim().length) {
        return false;
      }
      const chatListFilterKey = this.returnMatchedKey(UIKitSettings.chatListFilterOptions, option);
      if (chatListFilterKey) {
        this.chatListMode = UIKitSettings.chatListFilterOptions[chatListFilterKey];
      }
    });
    _defineProperty(this, "setUserListMode", option => {
      if (!option.trim().length) {
        return false;
      }
      const userListFilterKey = this.returnMatchedKey(UIKitSettings.userListFilterOptions, option);
      if (userListFilterKey) {
        this.userListMode = UIKitSettings.userListFilterOptions[userListFilterKey];
      }
    });
    _defineProperty(this, "setGroupListMode", () => {});
    _defineProperty(this, "setUserVideoCall", userVideoCall => {
      this.userVideoCall = userVideoCall;
    });
    _defineProperty(this, "setGroupVideoCall", groupVideoCall => {
      this.groupVideoCall = groupVideoCall;
    });
    _defineProperty(this, "setUserAudioCall", userAudioCall => {
      this.userAudioCall = userAudioCall;
    });
    _defineProperty(this, "setGroupAudioCall", groupAudioCall => {
      this.groupAudioCall = groupAudioCall;
    });
    _defineProperty(this, "setEditMessage", editMessage => {
      this.editMessage = editMessage;
    });
    _defineProperty(this, "setSendMessageInOneOnOne", sendMessageInOneOnOne => {
      this.sendMessageInOneOnOne = sendMessageInOneOnOne;
    });
    _defineProperty(this, "setSendMessageInGroup", sendMessageInGroup => {
      this.sendMessageInGroup = sendMessageInGroup;
    });
    _defineProperty(this, "setJoinOrLeaveGroup", joinOrLeaveGroup => {
      this.joinOrLeaveGroup = joinOrLeaveGroup;
    });
    _defineProperty(this, "setBlockUser", blockUser => {
      this.blockUser = blockUser;
    });
    _defineProperty(this, "setSendEmojis", sendEmojis => {
      this.sendEmojis = sendEmojis;
    });
    _defineProperty(this, "setSendEmojisInLargerSize", sendEmojisInLargerSize => {
      this.sendEmojisInLargerSize = sendEmojisInLargerSize;
    });
    _defineProperty(this, "setSendGifs", sendGifs => {
      this.sendGifs = sendGifs;
    });
    _defineProperty(this, "setShareCopyForwardMessage", shareCopyForwardMessage => {
      this.shareCopyForwardMessage = shareCopyForwardMessage;
    });
    _defineProperty(this, "setSendFiles", sendFiles => {
      this.sendFiles = sendFiles;
    });
    _defineProperty(this, "setSendPhotoVideos", sendPhotoVideos => {
      this.sendPhotoVideos = sendPhotoVideos;
    });
    _defineProperty(this, "setViewShareMedia", viewShareMedia => {
      this.viewShareMedia = viewShareMedia;
    });
    _defineProperty(this, "setEnableSoundForMessages", enableSoundForMessages => {
      this.enableSoundForMessages = enableSoundForMessages;
    });
    _defineProperty(this, "setEnableSoundForCalls", enableSoundForCalls => {
      this.enableSoundForCalls = enableSoundForCalls;
    });
    _defineProperty(this, "setSendStickers", sendStickers => {
      this.sendStickers = sendStickers;
    });
    _defineProperty(this, "setViewGroupMembers", viewGroupMembers => {
      this.viewGroupMembers = viewGroupMembers;
    });
    _defineProperty(this, "setCallNotifications", callNotifications => {
      this.callNotifications = callNotifications;
    });
    _defineProperty(this, "setAllowDeleteGroup", allowDeleteGroup => {
      this.allowDeleteGroup = allowDeleteGroup;
    });
    _defineProperty(this, "setKickMember", kickMember => {
      this.kickMember = kickMember;
    });
    _defineProperty(this, "setBanMember", banMember => {
      this.banMember = banMember;
    });
    _defineProperty(this, "setAllowPromoteDemoteMembers", allowPromoteDemoteMembers => {
      this.allowPromoteDemoteMembers = allowPromoteDemoteMembers;
    });
    _defineProperty(this, "setAllowAddMembers", allowAddMembers => {
      this.allowAddMembers = allowAddMembers;
    });
    _defineProperty(this, "setShareLocation", shareLocation => {
      this.shareLocation = shareLocation;
    });
    _defineProperty(this, "setJoinLeaveNotifications", joinLeaveNotifications => {
      this.joinLeaveNotifications = joinLeaveNotifications;
    });
    _defineProperty(this, "setSendVoiceNotes", sendVoiceNotes => {
      this.sendVoiceNotes = sendVoiceNotes;
    });
    _defineProperty(this, "setMessageTranslation", messageTranslation => {
      this.messageTranslation = messageTranslation;
    });
    _defineProperty(this, "setGroupCreation", groupCreation => {
      this.groupCreation = groupCreation;
    });
    _defineProperty(this, "setSendTypingIndicator", sendTypingIndicator => {
      this.sendTypingIndicator = sendTypingIndicator;
    });
    _defineProperty(this, "setShowUserPresence", showUserPresence => {
      this.showUserPresence = showUserPresence;
    });
    _defineProperty(this, "setDeleteMessage", deleteMessage => {
      this.deleteMessage = deleteMessage;
    });
    _defineProperty(this, "setThreadedChats", threadedChats => {
      this.threadedChats = threadedChats;
    });
    _defineProperty(this, "setReplyingToMessage", replyingToMessage => {
      this.replyingToMessage = replyingToMessage;
    });
    _defineProperty(this, "setShowReadDeliveryReceipts", showReadDeliveryReceipts => {
      this.showReadDeliveryReceipts = showReadDeliveryReceipts;
    });
    _defineProperty(this, "setHideDeletedMessages", hideDeletedMessages => {
      this.hideDeletedMessages = hideDeletedMessages;
    });
    _defineProperty(this, "setEmailReplies", emailReplies => {
      this.emailReplies = emailReplies;
    });
    _defineProperty(this, "setSendMessageReaction", sendMessageReaction => {
      this.sendMessageReaction = sendMessageReaction;
    });
    _defineProperty(this, "setCollaborativeWhiteboard", collaborativeWhiteboard => {
      this.collaborativeWhiteboard = collaborativeWhiteboard;
    });
    _defineProperty(this, "setCollaborativeDocument", collaborativeDocument => {
      this.collaborativeDocument = collaborativeDocument;
    });
    _defineProperty(this, "setPolls", polls => {
      this.polls = polls;
    });
    _defineProperty(this, "setSendLiveReaction", sendLiveReaction => {
      this.sendLiveReaction = sendLiveReaction;
    });
    _defineProperty(this, "setPublicGroup", publicGroup => {
      this.publicGroup = publicGroup;
    });
    _defineProperty(this, "setPrivateGroup", privateGroup => {
      this.privateGroup = privateGroup;
    });
    _defineProperty(this, "setPasswordGroup", passwordGroup => {
      this.passwordGroup = passwordGroup;
    });
    _defineProperty(this, "setAllowModeratorToDeleteMemberMessages", allowModeratorToDeleteMemberMessages => {
      this.allowModeratorToDeleteMemberMessages = allowModeratorToDeleteMemberMessages;
    });
    _defineProperty(this, "setUnreadCount", unreadCount => {
      this.unreadCount = unreadCount;
    });
    _defineProperty(this, "setSmartReplies", smartReplies => {
      this.smartReplies = smartReplies;
    });
    _defineProperty(this, "setSearchUsers", searchUsers => {
      this.searchUsers = searchUsers;
    });
    _defineProperty(this, "setSearchGroups", searchGroups => {
      this.searchGroups = searchGroups;
    });
    _defineProperty(this, "setSearchMessages", searchMessages => {
      this.searchMessages = searchMessages;
    });
    _defineProperty(this, "setCallRecording", callRecording => {
      this.callRecording = callRecording;
    });
    _defineProperty(this, "setCallLiveStreaming", callLiveStreaming => {
      this.callLiveStreaming = callLiveStreaming;
    });
    _defineProperty(this, "setCallTranscription", callTranscription => {
      this.callTranscription = callTranscription;
    });
    _defineProperty(this, "setThumbnailGeneration", thumbnailGeneration => {
      this.thumbnailGeneration = thumbnailGeneration;
    });
    _defineProperty(this, "setLinkPreview", linkPreview => {
      this.linkPreview = linkPreview;
    });
    _defineProperty(this, "setSaveMessages", saveMessages => {
      this.saveMessages = saveMessages;
    });
    _defineProperty(this, "setPinMessages", pinMessages => {
      this.pinMessages = pinMessages;
    });
    _defineProperty(this, "setRichMediaPreview", richMediaPreview => {
      this.richMediaPreview = richMediaPreview;
    });
    _defineProperty(this, "setVoiceTranscription", voiceTranscription => {
      this.voiceTranscription = voiceTranscription;
    });
    _defineProperty(this, "setMentions", mentions => {
      this.mentions = mentions;
    });
    _defineProperty(this, "setXssFilter", xssFilter => {
      this.xssFilter = xssFilter;
    });
    _defineProperty(this, "setProfanityFilter", profanityFilter => {
      this.profanityFilter = profanityFilter;
    });
    _defineProperty(this, "setImageModeration", imageModeration => {
      this.imageModeration = imageModeration;
    });
    _defineProperty(this, "setDataMasking", dataMasking => {
      this.dataMasking = dataMasking;
    });
    _defineProperty(this, "setMalwareScanner", malwareScanner => {
      this.malwareScanner = malwareScanner;
    });
    _defineProperty(this, "setSentimentAnalysis", sentimentAnalysis => {
      this.sentimentAnalysis = sentimentAnalysis;
    });
    _defineProperty(this, "setInflightMessageModeration", inflightMessageModeration => {
      this.inflightMessageModeration = inflightMessageModeration;
    });
    _defineProperty(this, "setMessageHistory", messageHistory => {
      this.messageHistory = messageHistory;
    });
    _defineProperty(this, "setViewProfile", viewProfile => {
      this.viewProfile = viewProfile;
    });
    _defineProperty(this, "setMessageInPrivate", messageInPrivate => {
      this.messageInPrivate = messageInPrivate;
    });
    _defineProperty(this, "setShowCallRecordingOption", showCallRecordingOption => {
      this.showCallRecordingOption = showCallRecordingOption;
    });
    _defineProperty(this, "setChatWindow", chatWindow => {
      this.chatWindow = chatWindow;
    });
    _defineProperty(this, "returnMatchedKey", (matchWith, optionToMatch) => {
      for (const [key, value] of Object.entries(matchWith)) {
        if (value === optionToMatch) {
          return key;
        }
      }
      return false;
    });
    this.customJS = "";
    this.customCSS = "";
    this.backgroundColor = "";
    this.primaryColor = "";
    this.foregroundColor = "";
    this.overrideSystemBackgroundColor = "";
    this.chatWindow = window;
    this.userListMode = UIKitSettings.userListFilterOptions["ALL"];
    this.groupInMode = UIKitSettings.groupListFilterOptions["PUBLIC_AND_PASSWORD"];
    this.chatListMode = UIKitSettings.chatListFilterOptions["USERS_AND_GROUPS"];
    this.chats = true;
    this.calls = false;
    this.users = true;
    this.groups = true;
    this.userSettings = true;
    this.tabs = Object.values(_tabs.default);
    this.searchUsers = true;
    this.searchGroups = true;
    this.searchMessages = true;
    this.searchChats = true;
    this.unreadCount = true;
    this.publicGroup = true;
    this.privateGroup = true;
    this.passwordGroup = true;
    this.blockUser = true;
    this.viewShareMedia = true;
    this.groupCreation = true;
    this.allowDeleteGroup = true;
    this.joinOrLeaveGroup = true;
    this.viewGroupMembers = true;
    this.kickMember = true;
    this.banMember = true;
    this.allowPromoteDemoteMembers = true;
    this.allowAddMembers = true;
    this.callNotifications = true;
    this.joinLeaveNotifications = true;
    this.enableSoundForMessages = true;
    this.enableSoundForCalls = true;
    this.userVideoCall = true;
    this.groupVideoCall = true;
    this.userAudioCall = true;
    this.groupAudioCall = true;
    this.sendTypingIndicator = true;
    this.showUserPresence = true;
    this.showReadDeliveryReceipts = true;
    this.threadedChats = true;
    this.hideDeletedMessages = false;
    this.sendMessageInOneOnOne = true;
    this.sendMessageInGroup = true;
    this.editMessage = true;
    this.deleteMessage = true;
    this.replyingToMessage = true;
    this.sendEmojis = true;
    this.sendEmojisInLargerSize = true;
    this.sendGifs = false;
    this.shareCopyForwardMessage = false;
    this.sendFiles = true;
    this.sendPhotoVideos = true;
    this.sendVoiceNotes = true;
    this.sendLiveReaction = true;
    this.sendMessageReaction = true;
    this.collaborativeWhiteboard = true;
    this.collaborativeDocument = true;
    this.sendStickers = true;
    this.shareLocation = false;
    this.polls = true;
    this.messageTranslation = true;
    this.allowModeratorToDeleteMemberMessages = true;
    this.setGroupInQnaModeByModerators = false;
    this.highlightMessageFromModerators = false;
    this.emailReplies = true;
    this.smartReplies = true;
    this.callRecording = true;
    this.callLiveStreaming = true;
    this.callTranscription = true;
    this.thumbnailGeneration = true;
    this.linkPreview = true;
    this.saveMessages = true;
    this.pinMessages = true;
    this.richMediaPreview = true;
    this.voiceTranscription = true;
    this.mentions = true;
    this.xssFilter = true;
    this.profanityFilter = true;
    this.imageModeration = true;
    this.dataMasking = true;
    this.malwareScanner = true;
    this.sentimentAnalysis = true;
    this.inflightMessageModeration = true;
    this.messageHistory = true;
    this.viewProfile = true;
    this.messageInPrivate = true;
    this.showCallRecordingOption = true;
  }
}
exports.UIKitSettings = UIKitSettings;
_defineProperty(UIKitSettings, "userListFilterOptions", {
  ALL: "all_users",
  NONE: "none",
  FRIENDS: "friends"
});
_defineProperty(UIKitSettings, "groupListFilterOptions", {
  PUBLIC: "public_groups",
  PASSWORD: "password_protected_groups",
  PUBLIC_AND_PASSWORD: "public_and_password_protected_groups"
});
_defineProperty(UIKitSettings, "chatListFilterOptions", {
  USERS: "users",
  GROUPS: "groups",
  USERS_AND_GROUPS: "all_chats"
});