"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalizedString = void 0;
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const LocalizedString = language => {
  return {
    SELECT_VIDEO_SOURCE: _translator.default.translate("SELECT_VIDEO_SOURCE", language),
    SELECT_INPUT_AUDIO_SOURCE: _translator.default.translate("SELECT_INPUT_AUDIO_SOURCE", language),
    SELECT_OUTPUT_AUDIO_SOURCE: _translator.default.translate("SELECT_OUTPUT_AUDIO_SOURCE", language),
    SELECT_MODE: _translator.default.translate("SELECT_MODE", language),
    CALL_RECORDING_STARTED_MSG: _translator.default.translate("CALL_RECORDING_STARTED_MSG", language),
    USER_JOINED_CALL_MSG: _translator.default.translate("USER_JOINED_CALL_MSG", language),
    CALL_RECORDING_ENDED_MSG: _translator.default.translate("CALL_RECORDING_ENDED_MSG", language),
    USER_LEFT_CALL_MSG: _translator.default.translate("USER_LEFT_CALL_MSG", language),
    CAMERA_ERROR_MSG: _translator.default.translate("CAMERA_ERROR_MSG", language),
    MIC_ERROR_MSG: _translator.default.translate("MIC_ERROR_MSG", language),
    CAMERA_MIC_ERROR_MSG: _translator.default.translate("CAMERA_MIC_ERROR_MSG", language),
    RECORDING_TEXT: _translator.default.translate("RECORDING_TEXT", language),
    TRYING_TO_START_RECORDING_TEXT: _translator.default.translate("TRYING_TO_START_RECORDING_TEXT", language),
    JOINING_TEXT: _translator.default.translate("JOINING_TEXT", language),
    UN_MUTE_AUDIO_TEXT: _translator.default.translate("UN_MUTE_AUDIO_TEXT", language),
    MUTE_AUDIO_TEXT: _translator.default.translate("MUTE_AUDIO_TEXT", language),
    END_CALL_TEXT: _translator.default.translate("END_CALL_TEXT", language),
    START_RECORDING_TEXT: _translator.default.translate("START_RECORDING_TEXT", language),
    STOP_RECORDING_TEXT: _translator.default.translate("STOP_RECORDING_TEXT", language),
    START_SCREEN_SHARE_TEXT: _translator.default.translate("START_SCREEN_SHARE_TEXT", language),
    STOP_SCREEN_SHARE_TEXT: _translator.default.translate("STOP_SCREEN_SHARE_TEXT", language),
    MUTE_VIDEO_TEXT: _translator.default.translate("MUTE_VIDEO_TEXT", language),
    UN_MUTE_VIDEO_TEXT: _translator.default.translate("UN_MUTE_VIDEO_TEXT", language),
    SELECT_LAYOUT_HEADER: _translator.default.translate("SELECT_LAYOUT_HEADER", language),
    NO_OF_USER_IN_TILE_TEXT: _translator.default.translate("NO_OF_USER_IN_TILE_TEXT", language),
    CHANGE_AUDIO_SOURCE: _translator.default.translate("CHANGE_AUDIO_SOURCE", language),
    CHANGE_AUDIO_SOURCE_DESC: _translator.default.translate("CHANGE_AUDIO_SOURCE_DESC", language),
    AUDIO_INPUT_DEVICE_LABEL: _translator.default.translate("AUDIO_INPUT_DEVICE_LABEL", language),
    NO_AUDIO_DEVICE_AVAILABLE: _translator.default.translate("NO_AUDIO_DEVICE_AVAILABLE", language),
    AUDIO_OUTPUT_DEVICE_LABEL: _translator.default.translate("AUDIO_OUTPUT_DEVICE_LABEL", language),
    CHANGE_VIDEO_SOURCE: _translator.default.translate("CHANGE_VIDEO_SOURCE", language),
    CHANGE_VIDEO_SOURCE_DESC: _translator.default.translate("CHANGE_VIDEO_SOURCE_DESC", language),
    VIDEO_DEVICES_LABEL: _translator.default.translate("VIDEO_DEVICES_LABEL", language),
    FULL_SCREEN: _translator.default.translate("FULL_SCREEN", language),
    EXIT_FULL_SCREEN: _translator.default.translate("EXIT_FULL_SCREEN", language),
    CHANGE_LAYOUT: _translator.default.translate("CHANGE_LAYOUT", language),
    AUDIO_SETTING: _translator.default.translate("AUDIO_SETTING", language),
    VIDEO_SETTING: _translator.default.translate("VIDEO_SETTING", language),
    USER_LIST: _translator.default.translate("USER_LIST", language),
    MORE: _translator.default.translate("MORE", language),
    MUTE_USER: _translator.default.translate("MUTE_USER", language),
    PIN_USER: _translator.default.translate("PIN_USER", language),
    UNPIN_USER: _translator.default.translate("UNPIN_USER", language),
    UN_MUTE_USER: _translator.default.translate("UN_MUTE_USER", language),
    MUTED: _translator.default.translate("MUTED", language),
    YOU_HAVE_BLOCKED: _translator.default.translate("YOU_HAVE_BLOCKED", language),
    NOT_POSSIBLE_TO_SEND_MESSAGES: _translator.default.translate("NOT_POSSIBLE_TO_SEND_MESSAGES", language),
    IOS_BROWSER_WARNING: _translator.default.translate("IOS_BROWSER_WARNING", language),
    PEOPLE_TEXT: _translator.default.translate("PEOPLE_TEXT", language),
    SPOTLIGHT_DETAIL_TEXT1: _translator.default.translate("SPOTLIGHT_DETAIL_TEXT1", language),
    SPOTLIGHT_DETAIL_TEXT2: _translator.default.translate("SPOTLIGHT_DETAIL_TEXT2", language),
    SPOTLIGHT_DETAIL_TEXT3: _translator.default.translate("SPOTLIGHT_DETAIL_TEXT3", language),
    SPOTLIGHT_DETAIL_TEXT4: _translator.default.translate("SPOTLIGHT_DETAIL_TEXT4", language)
  };
};
exports.LocalizedString = LocalizedString;