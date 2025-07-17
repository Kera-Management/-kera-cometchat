"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeatureRestriction = void 0;
require("core-js/modules/es.promise.js");
var _chat = require("@cometchat-pro/chat");
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class FeatureRestriction {
  constructor(UIKitSettings) {
    _defineProperty(this, "UIKitSettings", void 0);
    _defineProperty(this, "isRecentChatListEnabled", () => new Promise(resolve => resolve(this.UIKitSettings.chats)));
    _defineProperty(this, "isGroupListEnabled", () => new Promise(resolve => resolve(this.UIKitSettings.groups)));
    _defineProperty(this, "isUserSettingsEnabled", () => new Promise(resolve => resolve(this.UIKitSettings.userSettings)));
    _defineProperty(this, "isEditMessageEnabled", () => new Promise(resolve => resolve(this.UIKitSettings.editMessage)));
    _defineProperty(this, "isQNAModeEnabled", () => new Promise(resolve => resolve(this.UIKitSettings.setGroupInQnaModeByModerators)));
    _defineProperty(this, "isHighlightMessagesEnabled", () => new Promise(resolve => resolve(this.UIKitSettings.highlightMessageFromModerators)));
    _defineProperty(this, "isJoinLeaveGroupsEnabled", () => new Promise(resolve => resolve(this.UIKitSettings.joinOrLeaveGroup)));
    _defineProperty(this, "isLargerSizeEmojisEnabled", () => new Promise(resolve => resolve(this.UIKitSettings.sendEmojisInLargerSize)));
    _defineProperty(this, "isGifsEnabled", () => new Promise(resolve => resolve(this.UIKitSettings.sendGifs)));
    _defineProperty(this, "isShareCopyForwardMessageEnabled", () => new Promise(resolve => resolve(this.UIKitSettings.shareCopyForwardMessage)));
    _defineProperty(this, "isSharedMediaEnabled", () => new Promise(resolve => resolve(this.UIKitSettings.viewShareMedia)));
    _defineProperty(this, "isMessagesSoundEnabled", () => new Promise(resolve => resolve(this.UIKitSettings.enableSoundForMessages)));
    _defineProperty(this, "isCallsSoundEnabled", () => new Promise(resolve => resolve(this.UIKitSettings.enableSoundForCalls)));
    _defineProperty(this, "isViewingGroupMembersEnabled", () => new Promise(resolve => resolve(this.UIKitSettings.viewGroupMembers)));
    _defineProperty(this, "isCallActionMessagesEnabled", () => new Promise(resolve => resolve(this.UIKitSettings.callNotifications)));
    _defineProperty(this, "isGroupDeletionEnabled", () => new Promise(resolve => resolve(this.UIKitSettings.allowDeleteGroup)));
    _defineProperty(this, "isChangingGroupMemberScopeEnabled", () => new Promise(resolve => resolve(this.UIKitSettings.allowPromoteDemoteMembers)));
    _defineProperty(this, "isAddingGroupMembersEnabled", () => new Promise(resolve => resolve(this.UIKitSettings.allowAddMembers)));
    _defineProperty(this, "isLocationSharingEnabled", () => new Promise(resolve => resolve(this.UIKitSettings.shareLocation)));
    _defineProperty(this, "isGroupActionMessagesEnabled", () => new Promise(resolve => resolve(this.UIKitSettings.joinLeaveNotifications)));
    _defineProperty(this, "isGroupCreationEnabled", () => new Promise(resolve => resolve(this.UIKitSettings.groupCreation)));
    _defineProperty(this, "isDeleteMessageEnabled", () => new Promise(resolve => resolve(this.UIKitSettings.deleteMessage)));
    _defineProperty(this, "isHideDeletedMessagesEnabled", () => new Promise(resolve => resolve(this.UIKitSettings.hideDeletedMessages)));
    _defineProperty(this, "isViewProfileEnabled", () => new Promise(resolve => resolve(this.UIKitSettings.viewProfile)));
    _defineProperty(this, "isMessageInPrivateEnabled", () => new Promise(resolve => resolve(this.UIKitSettings.messageInPrivate)));
    _defineProperty(this, "isCallListEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.calls_enabled).then(response => resolve(response && this.UIKitSettings.calls)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isUserListEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.chat_users_list_enabled).then(response => resolve(response && this.UIKitSettings.users)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isOneOnOneVideoCallEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.call_one_on_one_video_enabled).then(response => resolve(response && this.UIKitSettings.userVideoCall)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isGroupVideoCallEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.call_groups_video_enabled).then(response => resolve(response && this.UIKitSettings.groupVideoCall)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isOneOnOneAudioCallEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.call_one_on_one_audio_enabled).then(response => resolve(response && this.UIKitSettings.userAudioCall)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isGroupAudioCallEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.call_groups_audio_enabled).then(response => resolve(response && this.UIKitSettings.groupAudioCall)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isOneOnOneChatEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.chat_one_on_one_enabled).then(response => resolve(response && this.UIKitSettings.sendMessageInOneOnOne)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isGroupChatEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.chat_groups_enabled).then(response => resolve(response && this.UIKitSettings.sendMessageInGroup)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isDeleteMemberMessageEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.moderation_groups_moderators_enabled).then(response => resolve(response && this.UIKitSettings.allowModeratorToDeleteMemberMessages)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isBlockUserEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.moderation_users_block_enabled).then(response => resolve(response && this.UIKitSettings.blockUser)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isEmojisEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.emojis_enabled).then(response => resolve(response && this.UIKitSettings.sendEmojis)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isFilesEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.chat_messages_media_enabled).then(response => resolve(response && this.UIKitSettings.sendFiles)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isPhotosVideosEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.chat_messages_media_enabled).then(response => resolve(response && this.UIKitSettings.sendPhotoVideos)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isKickingGroupMembersEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.moderation_groups_kick_enabled).then(response => resolve(response && this.UIKitSettings.kickMember)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isBanningGroupMembersEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.moderation_groups_ban_enabled).then(response => resolve(response && this.UIKitSettings.banMember)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isVoiceNotesEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.chat_voice_notes_enabled).then(response => resolve(response && this.UIKitSettings.sendVoiceNotes)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isTypingIndicatorsEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.chat_typing_indicator_enabled).then(response => resolve(response && this.UIKitSettings.sendTypingIndicator)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isUserPresenceEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.chat_users_presence_enabled).then(response => resolve(response && this.UIKitSettings.showUserPresence)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isThreadedMessagesEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.chat_messages_threads_enabled).then(response => resolve(response && this.UIKitSettings.threadedChats)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isMessageRepliesEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.chat_messages_replies_enabled).then(response => resolve(response && this.UIKitSettings.replyingToMessage)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isDeliveryReceiptsEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.chat_messages_receipts_enabled).then(response => resolve(response && this.UIKitSettings.showReadDeliveryReceipts)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isLiveReactionsEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.live_reactions_enabled).then(response => resolve(response && this.UIKitSettings.sendLiveReaction)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isPublicGroupEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.chat_groups_public_enabled).then(response => resolve(response && this.UIKitSettings.publicGroup)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isPrivateGroupEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.chat_groups_private_enabled).then(response => resolve(response && this.UIKitSettings.privateGroup)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isPasswordGroupEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.chat_groups_password_enabled).then(response => resolve(response && this.UIKitSettings.passwordGroup)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isUnreadCountEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.chat_messages_unread_count_enabled).then(response => resolve(response && this.UIKitSettings.unreadCount)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isUserSearchEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.chat_users_search_enabled).then(response => resolve(response && this.UIKitSettings.searchUsers)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isGroupSearchEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.chat_groups_search_enabled).then(response => resolve(response && this.UIKitSettings.searchGroups)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isMessageSearchEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.chat_messages_search_enabled).then(response => resolve(response && this.UIKitSettings.searchMessages)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isCallRecordingEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.call_recording_enabled).then(response => resolve(response && this.UIKitSettings.callRecording)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isCallLiveStreamingEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.call_live_streaming_enabled).then(response => resolve(response && this.UIKitSettings.callLiveStreaming)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isCallTranscriptEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.call_transcript_enabled).then(response => resolve(response && this.UIKitSettings.callTranscription)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isMessageHistoryEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.chat_messages_history_enabled).then(response => resolve(response && this.UIKitSettings.messageHistory)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isMessageTranslationEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.message_translation_enabled).then(response => response && FeatureRestriction.isExtensionEnabled(FeatureRestriction.messageTranslation)).then(response => resolve(response && this.UIKitSettings.messageTranslation)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isReactionsEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.reactions_enabled).then(response => response && FeatureRestriction.isExtensionEnabled(FeatureRestriction.reactions)).then(response => resolve(response && this.UIKitSettings.sendMessageReaction)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isCollaborativeWhiteBoardEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.collaboration_whiteboard_enabled).then(response => response && FeatureRestriction.isExtensionEnabled(FeatureRestriction.collaborationWhiteboard)).then(response => resolve(response && this.UIKitSettings.collaborativeWhiteboard)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isCollaborativeDocumentEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.collaboration_document_enabled).then(response => response && FeatureRestriction.isExtensionEnabled(FeatureRestriction.collaborationDocument)).then(response => resolve(response && this.UIKitSettings.collaborativeDocument)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isStickersEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.stickers_enabled).then(response => response && FeatureRestriction.isExtensionEnabled(FeatureRestriction.sticker)).then(response => resolve(response && this.UIKitSettings.sendStickers)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isEmailRepliesEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.email_replies_enabled).then(response => response && FeatureRestriction.isExtensionEnabled(FeatureRestriction.emailReplies)).then(response => resolve(response && this.UIKitSettings.emailReplies)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isPollsEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.polls_enabled).then(response => response && FeatureRestriction.isExtensionEnabled(FeatureRestriction.polls)).then(response => resolve(response && this.UIKitSettings.polls)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isSmartRepliesEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.smart_replies_enabled).then(response => response && FeatureRestriction.isExtensionEnabled(FeatureRestriction.smartReplies)).then(response => resolve(response && this.UIKitSettings.smartReplies)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isThumbnailGenerationEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.thumbnail_generation_enabled).then(response => response && FeatureRestriction.isExtensionEnabled(FeatureRestriction.thumbnailGeneration)).then(response => resolve(response && this.UIKitSettings.thumbnailGeneration)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isLinkPreviewEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.link_preview_enabled).then(response => response && FeatureRestriction.isExtensionEnabled(FeatureRestriction.linkPreview)).then(response => resolve(response && this.UIKitSettings.linkPreview)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isSaveMessagesEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.messages_saved_enabled).then(response => response && FeatureRestriction.isExtensionEnabled(FeatureRestriction.saveMessages)).then(response => resolve(response && this.UIKitSettings.saveMessages)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isPinMessagesEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.messages_pinned_enabled).then(response => response && FeatureRestriction.isExtensionEnabled(FeatureRestriction.pinMessages)).then(response => resolve(response && this.UIKitSettings.pinMessages)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isRichMediaPreviewEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.rich_media_preview_enabled).then(response => response && FeatureRestriction.isExtensionEnabled(FeatureRestriction.richMediaPreview)).then(response => resolve(response && this.UIKitSettings.richMediaPreview)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isVoiceTranscriptionEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.voice_transcription_enabled).then(response => response && FeatureRestriction.isExtensionEnabled(FeatureRestriction.voiceTranscription)).then(response => resolve(response && this.UIKitSettings.voiceTranscription)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isMentionsEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.mentions_enabled).then(response => response && FeatureRestriction.isExtensionEnabled(FeatureRestriction.mentions)).then(response => resolve(response && this.UIKitSettings.mentions)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isXssFilterEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.moderation_xss_filter_enabled).then(response => response && FeatureRestriction.isExtensionEnabled(FeatureRestriction.xssFilter)).then(response => resolve(response && this.UIKitSettings.xssFilter)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isProfanityFilterEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.moderation_profanity_filter_enabled).then(response => response && FeatureRestriction.isExtensionEnabled(FeatureRestriction.profanityFilter)).then(response => resolve(response && this.UIKitSettings.profanityFilter)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isImageModerationEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.moderation_image_moderation_enabled).then(response => response && FeatureRestriction.isExtensionEnabled(FeatureRestriction.imageModeration)).then(response => resolve(response && this.UIKitSettings.imageModeration)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isDataMaskingEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.moderation_data_masking_enabled).then(response => response && FeatureRestriction.isExtensionEnabled(FeatureRestriction.dataMasking)).then(response => resolve(response && this.UIKitSettings.dataMasking)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isMalwareScannerEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.moderation_malware_scanner_enabled).then(response => response && FeatureRestriction.isExtensionEnabled(FeatureRestriction.malwareScanner)).then(response => resolve(response && this.UIKitSettings.malwareScanner)).catch(error => resolve(false));
      });
    });
    _defineProperty(this, "isSentimentAnalysisEnabled", () => {
      return new Promise(resolve => {
        _chat.CometChat.isFeatureEnabled(FeatureRestriction.moderation_sentiment_analysis_enabled).then(response => response && FeatureRestriction.isExtensionEnabled(FeatureRestriction.sentimentAnalysis)).then(response => resolve(response && this.UIKitSettings.sentimentAnalysis)).catch(error => resolve(false));
      });
    });
    this.UIKitSettings = UIKitSettings;
  }

  // isInFlightMessageModerationEnabled = () => {

  //     return new Promise(resolve => {

  //         CometChat.isFeatureEnabled(FeatureRestriction.moderation_inflight_message_moderation_enabled)
  //             .then(response => {

  //                 return response
  //                     && FeatureRestriction.isExtensionEnabled(FeatureRestriction.sentimentAnalysis)
  //                     && this.UIKitSettings.inflightMessageModeration;
  //             })
  //             .catch(error => resolve(false));
  //     });
  // }
}
exports.FeatureRestriction = FeatureRestriction;
/**
 * Core Chat
 */
_defineProperty(FeatureRestriction, "chat_users_list_enabled", "core.chat.users.list.enabled");
_defineProperty(FeatureRestriction, "chat_users_presence_enabled", "core.chat.users.presence.enabled");
_defineProperty(FeatureRestriction, "chat_users_search_enabled", "core.chat.users.search.enabled");
_defineProperty(FeatureRestriction, "chat_groups_enabled", "core.chat.groups.enabled");
_defineProperty(FeatureRestriction, "chat_groups_public_enabled", "core.chat.groups.public.enabled");
_defineProperty(FeatureRestriction, "chat_groups_private_enabled", "core.chat.groups.private.enabled");
_defineProperty(FeatureRestriction, "chat_groups_password_enabled", "core.chat.groups.password.enabled");
_defineProperty(FeatureRestriction, "chat_groups_search_enabled", "core.chat.groups.search.enabled");
_defineProperty(FeatureRestriction, "chat_messages_media_enabled", "core.chat.messages.media.enabled");
_defineProperty(FeatureRestriction, "chat_messages_threads_enabled", "core.chat.messages.threads.enabled");
_defineProperty(FeatureRestriction, "chat_messages_replies_enabled", "core.chat.messages.replies.enabled");
_defineProperty(FeatureRestriction, "chat_messages_receipts_enabled", "core.chat.messages.receipts.enabled");
_defineProperty(FeatureRestriction, "chat_messages_unread_count_enabled", "core.chat.messages.unread-count.enabled");
_defineProperty(FeatureRestriction, "chat_messages_search_enabled", "core.chat.messages.search.enabled");
_defineProperty(FeatureRestriction, "chat_messages_history_enabled", "core.chat.messages.history.enabled");
_defineProperty(FeatureRestriction, "chat_messages_custom_enabled", "core.chat.messages.custom.enabled");
_defineProperty(FeatureRestriction, "chat_one_on_one_enabled", "core.chat.one-on-one.enabled");
_defineProperty(FeatureRestriction, "chat_voice_notes_enabled", "core.chat.voice-notes.enabled");
_defineProperty(FeatureRestriction, "chat_typing_indicator_enabled", "core.chat.typing-indicator.enabled");
/**
 * Voice & Video Calling/Conferencing
 */
_defineProperty(FeatureRestriction, "calls_enabled", "core.call.enabled");
_defineProperty(FeatureRestriction, "call_one_on_one_video_enabled", "core.call.one-on-one.video.enabled");
_defineProperty(FeatureRestriction, "call_groups_video_enabled", "core.call.groups.video.enabled");
_defineProperty(FeatureRestriction, "call_one_on_one_audio_enabled", "core.call.one-on-one.audio.enabled");
_defineProperty(FeatureRestriction, "call_groups_audio_enabled", "core.call.groups.audio.enabled");
_defineProperty(FeatureRestriction, "call_recording_enabled", "core.call.recording.enabled");
_defineProperty(FeatureRestriction, "call_live_streaming_enabled", "core.call.live-streaming.enabled");
_defineProperty(FeatureRestriction, "call_transcript_enabled", "core.call.transcript.enabled");
/**
 * Collaboration
 */
_defineProperty(FeatureRestriction, "collaboration_whiteboard_enabled", "features.collaboration.whiteboard.enabled");
_defineProperty(FeatureRestriction, "collaboration_document_enabled", "features.collaboration.document.enabled");
/**
 * Moderation
 */
_defineProperty(FeatureRestriction, "moderation_groups_moderators_enabled", "features.moderation.groups.moderators.enabled");
_defineProperty(FeatureRestriction, "moderation_users_block_enabled", "features.moderation.users.block.enabled");
_defineProperty(FeatureRestriction, "moderation_groups_kick_enabled", "features.moderation.groups.kick.enabled");
_defineProperty(FeatureRestriction, "moderation_groups_ban_enabled", "features.moderation.groups.ban.enabled");
_defineProperty(FeatureRestriction, "moderation_xss_filter_enabled", "features.moderation.xss-filter.enabled");
_defineProperty(FeatureRestriction, "moderation_profanity_filter_enabled", "features.moderation.profanity-filter.enabled");
_defineProperty(FeatureRestriction, "moderation_image_moderation_enabled", "features.moderation.image-moderation.enabled");
_defineProperty(FeatureRestriction, "moderation_data_masking_enabled", "features.moderation.data-masking.enabled");
_defineProperty(FeatureRestriction, "moderation_malware_scanner_enabled", "features.moderation.malware-scanner.enabled");
_defineProperty(FeatureRestriction, "moderation_sentiment_analysis_enabled", "features.moderation.sentiment-analysis.enabled");
_defineProperty(FeatureRestriction, "moderation_inflight_message_moderation_enabled", "features.moderation.inflight-message-moderation.enabled");
/**
 * User Engagement
 */
_defineProperty(FeatureRestriction, "reactions_enabled", "features.ue.reactions.enabled");
_defineProperty(FeatureRestriction, "emojis_enabled", "features.ue.emojis.enabled");
_defineProperty(FeatureRestriction, "stickers_enabled", "features.ue.stickers.enabled");
_defineProperty(FeatureRestriction, "message_translation_enabled", "features.ue.message-translation.enabled");
_defineProperty(FeatureRestriction, "email_replies_enabled", "features.ue.email-replies.enabled");
_defineProperty(FeatureRestriction, "polls_enabled", "features.ue.polls.enabled");
_defineProperty(FeatureRestriction, "live_reactions_enabled", "features.ue.live-reactions.enabled");
_defineProperty(FeatureRestriction, "smart_replies_enabled", "features.ue.smart-replies.enabled");
_defineProperty(FeatureRestriction, "mentions_enabled", "features.ue.mentions.enabled");
/**
 * User Experience
 */
_defineProperty(FeatureRestriction, "thumbnail_generation_enabled", "features.ux.thumbnail-generation.enabled");
_defineProperty(FeatureRestriction, "link_preview_enabled", "features.ux.link-preview.enabled");
_defineProperty(FeatureRestriction, "messages_saved_enabled", "features.ux.messages.saved.enabled");
_defineProperty(FeatureRestriction, "messages_pinned_enabled", "features.ux.messages.pinned.enabled");
_defineProperty(FeatureRestriction, "rich_media_preview_enabled", "features.ux.rich-media-preview.enabled");
_defineProperty(FeatureRestriction, "voice_transcription_enabled", "features.ux.voice-transcription.enabled");
/**
 * Extensions slug
 */
_defineProperty(FeatureRestriction, "dataMasking", "data-masking");
_defineProperty(FeatureRestriction, "profanityFilter", "profanity-filter");
_defineProperty(FeatureRestriction, "thumbnailGeneration", "thumbnail-generator");
_defineProperty(FeatureRestriction, "linkPreview", "link-preview");
_defineProperty(FeatureRestriction, "richMediaPreview", "rich-media");
_defineProperty(FeatureRestriction, "sticker", "stickers");
_defineProperty(FeatureRestriction, "reactions", "reactions");
_defineProperty(FeatureRestriction, "messageTranslation", "message-translation");
_defineProperty(FeatureRestriction, "smartReplies", "smart-reply");
_defineProperty(FeatureRestriction, "collaborationWhiteboard", "whiteboard");
_defineProperty(FeatureRestriction, "collaborationDocument", "document");
_defineProperty(FeatureRestriction, "pinMessages", "pin-message");
_defineProperty(FeatureRestriction, "saveMessages", "save-message");
_defineProperty(FeatureRestriction, "voiceTranscription", "voice-transcription");
_defineProperty(FeatureRestriction, "polls", "polls");
_defineProperty(FeatureRestriction, "xssFilter", "xss-filter");
_defineProperty(FeatureRestriction, "imageModeration", "image-moderation");
_defineProperty(FeatureRestriction, "malwareScanner", "virus-malware-scanner");
_defineProperty(FeatureRestriction, "sentimentAnalysis", "sentiment-analysis");
_defineProperty(FeatureRestriction, "emailReplies", "email-replies");
_defineProperty(FeatureRestriction, "emojis", "emojis");
_defineProperty(FeatureRestriction, "mentions", "mentions");
_defineProperty(FeatureRestriction, "isExtensionEnabled", extensionKey => {
  return new Promise(resolve => _chat.CometChat.isExtensionEnabled(extensionKey).then(response => resolve(response)).catch(error => resolve(false)));
});