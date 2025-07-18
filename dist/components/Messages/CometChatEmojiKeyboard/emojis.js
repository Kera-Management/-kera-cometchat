"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Emojis = void 0;
var _activity = _interopRequireDefault(require("./resources/activity.svg"));
var _animals = _interopRequireDefault(require("./resources/animals.svg"));
var _smileys = _interopRequireDefault(require("./resources/smileys.svg"));
var _symbols = _interopRequireDefault(require("./resources/symbols.svg"));
var _objects = _interopRequireDefault(require("./resources/objects.svg"));
var _travel = _interopRequireDefault(require("./resources/travel.svg"));
var _flags = _interopRequireDefault(require("./resources/flags.svg"));
var _food = _interopRequireDefault(require("./resources/food.svg"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Emojis = exports.Emojis = [{
  "people": {
    "id": "people",
    "name": "Smileys",
    "symbol": _smileys.default,
    "emojis": {
      "grinning": {
        "keywords": ["face", "smile", "happy", "joy", ":D", "grin"],
        "char": "😀",
        "emojiName": "grinning"
      },
      "grimacing": {
        "keywords": ["face", "grimace", "teeth"],
        "char": "😬",
        "emojiName": "grimacing"
      },
      "grin": {
        "keywords": ["face", "happy", "smile", "joy", "kawaii"],
        "char": "😁",
        "emojiName": "grin"
      },
      "joy": {
        "keywords": ["face", "cry", "tears", "weep", "happy", "happytears", "haha"],
        "char": "😂",
        "emojiName": "joy"
      },
      "rofl": {
        "keywords": ["face", "rolling", "floor", "laughing", "lol", "haha"],
        "char": "🤣",
        "emojiName": "rofl"
      },
      "partying": {
        "keywords": ["face", "celebration", "woohoo"],
        "char": "🥳",
        "emojiName": "partying"
      },
      "smiley": {
        "keywords": ["face", "happy", "joy", "haha", ":D", ":)", "smile", "funny"],
        "char": "😃",
        "emojiName": "smiley"
      },
      "smile": {
        "keywords": ["face", "happy", "joy", "funny", "haha", "laugh", "like", ":D", ":)"],
        "char": "😄",
        "emojiName": "smile"
      },
      "sweat_smile": {
        "keywords": ["face", "hot", "happy", "laugh", "sweat", "smile", "relief"],
        "char": "😅",
        "emojiName": "sweat_smile"
      },
      "laughing": {
        "keywords": ["happy", "joy", "lol", "satisfied", "haha", "face", "glad", "XD", "laugh"],
        "char": "😆",
        "emojiName": "laughing"
      },
      "innocent": {
        "keywords": ["face", "angel", "heaven", "halo"],
        "char": "😇",
        "emojiName": "innocent"
      },
      "wink": {
        "keywords": ["face", "happy", "mischievous", "secret", ";)", "smile", "eye"],
        "char": "😉",
        "emojiName": "wink"
      },
      "blush": {
        "keywords": ["face", "smile", "happy", "flushed", "crush", "embarrassed", "shy", "joy"],
        "char": "😊",
        "emojiName": "blush"
      },
      "slightly_smiling_face": {
        "keywords": ["face", "smile"],
        "char": "🙂",
        "emojiName": "slightly_smiling_face"
      },
      "upside_down_face": {
        "keywords": ["face", "flipped", "silly", "smile"],
        "char": "🙃",
        "emojiName": "upside_down_face"
      },
      "relaxed": {
        "keywords": ["face", "blush", "massage", "happiness"],
        "char": "☺️",
        "emojiName": "relaxed"
      },
      "yum": {
        "keywords": ["happy", "joy", "tongue", "smile", "face", "silly", "yummy", "nom", "delicious", "savouring"],
        "char": "😋",
        "emojiName": "yum"
      },
      "relieved": {
        "keywords": ["face", "relaxed", "phew", "massage", "happiness"],
        "char": "😌",
        "emojiName": "relieved"
      },
      "heart_eyes": {
        "keywords": ["face", "love", "like", "affection", "valentines", "infatuation", "crush", "heart"],
        "char": "😍",
        "emojiName": "heart_eyes"
      },
      "smiling_face_with_three_hearts": {
        "keywords": ["face", "love", "like", "affection", "valentines", "infatuation", "crush", "hearts", "adore"],
        "char": "🥰",
        "emojiName": "smiling_face_with_three_hearts"
      },
      "kissing_heart": {
        "keywords": ["face", "love", "like", "affection", "valentines", "infatuation", "kiss"],
        "char": "😘",
        "emojiName": "kissing_heart"
      },
      "kissing": {
        "keywords": ["love", "like", "face", "3", "valentines", "infatuation", "kiss"],
        "char": "😗",
        "emojiName": "kissing"
      },
      "kissing_smiling_eyes": {
        "keywords": ["face", "affection", "valentines", "infatuation", "kiss"],
        "char": "😙",
        "emojiName": "kissing_smiling_eyes"
      },
      "kissing_closed_eyes": {
        "keywords": ["face", "love", "like", "affection", "valentines", "infatuation", "kiss"],
        "char": "😚",
        "emojiName": "kissing_closed_eyes"
      },
      "stuck_out_tongue_winking_eye": {
        "keywords": ["face", "prank", "childish", "playful", "mischievous", "smile", "wink", "tongue"],
        "char": "😜",
        "emojiName": "stuck_out_tongue_winking_eye"
      },
      "zany": {
        "keywords": ["face", "goofy", "crazy"],
        "char": "🤪",
        "emojiName": "zany"
      },
      "raised_eyebrow": {
        "keywords": ["face", "distrust", "scepticism", "disapproval", "disbelief", "surprise"],
        "char": "🤨",
        "emojiName": "raised_eyebrow"
      },
      "monocle": {
        "keywords": ["face", "stuffy", "wealthy"],
        "char": "🧐",
        "emojiName": "monocle"
      },
      "stuck_out_tongue_closed_eyes": {
        "keywords": ["face", "prank", "playful", "mischievous", "smile", "tongue"],
        "char": "😝",
        "emojiName": "stuck_out_tongue_closed_eyes"
      },
      "stuck_out_tongue": {
        "keywords": ["face", "prank", "childish", "playful", "mischievous", "smile", "tongue"],
        "char": "😛",
        "emojiName": "stuck_out_tongue"
      },
      "money_mouth_face": {
        "keywords": ["face", "rich", "dollar", "money"],
        "char": "🤑",
        "emojiName": "money_mouth_face"
      },
      "nerd_face": {
        "keywords": ["face", "nerdy", "geek", "dork"],
        "char": "🤓",
        "emojiName": "nerd_face"
      },
      "sunglasses": {
        "keywords": ["face", "cool", "smile", "summer", "beach", "sunglass"],
        "char": "😎",
        "emojiName": "sunglasses"
      },
      "star_struck": {
        "keywords": ["face", "smile", "starry", "eyes", "grinning"],
        "char": "🤩",
        "emojiName": "star_struck"
      },
      "clown_face": {
        "keywords": ["face"],
        "char": "🤡",
        "emojiName": "clown_face"
      },
      "cowboy_hat_face": {
        "keywords": ["face", "cowgirl", "hat"],
        "char": "🤠",
        "emojiName": "cowboy_hat_face"
      },
      "hugs": {
        "keywords": ["face", "smile", "hug"],
        "char": "🤗",
        "emojiName": "hugs"
      },
      "smirk": {
        "keywords": ["face", "smile", "mean", "prank", "smug", "sarcasm"],
        "char": "😏",
        "emojiName": "smirk"
      },
      "no_mouth": {
        "keywords": ["face", "hellokitty"],
        "char": "😶",
        "emojiName": "no_mouth"
      },
      "neutral_face": {
        "keywords": ["indifference", "meh", ":|", "neutral"],
        "char": "😐",
        "emojiName": "neutral_face"
      },
      "expressionless": {
        "keywords": ["face", "indifferent", "-_-", "meh", "deadpan"],
        "char": "😑",
        "emojiName": "expressionless"
      },
      "unamused": {
        "keywords": ["indifference", "bored", "straight face", "serious", "sarcasm", "unimpressed", "skeptical", "dubious", "side_eye"],
        "char": "😒",
        "emojiName": "unamused"
      },
      "roll_eyes": {
        "keywords": ["face", "eyeroll", "frustrated"],
        "char": "🙄",
        "emojiName": "roll_eyes"
      },
      "thinking": {
        "keywords": ["face", "hmmm", "think", "consider"],
        "char": "🤔",
        "emojiName": "thinking"
      },
      "lying_face": {
        "keywords": ["face", "lie", "pinocchio"],
        "char": "🤥",
        "emojiName": "lying_face"
      },
      "hand_over_mouth": {
        "keywords": ["face", "whoops", "shock", "surprise"],
        "char": "🤭",
        "emojiName": "hand_over_mouth"
      },
      "shushing": {
        "keywords": ["face", "quiet", "shhh"],
        "char": "🤫",
        "emojiName": "shushing"
      },
      "symbols_over_mouth": {
        "keywords": ["face", "swearing", "cursing", "cussing", "profanity", "expletive"],
        "char": "🤬",
        "emojiName": "symbols_over_mouth"
      },
      "exploding_head": {
        "keywords": ["face", "shocked", "mind", "blown"],
        "char": "🤯",
        "emojiName": "exploding_head"
      },
      "flushed": {
        "keywords": ["face", "blush", "shy", "flattered"],
        "char": "😳",
        "emojiName": "flushed"
      },
      "disappointed": {
        "keywords": ["face", "sad", "upset", "depressed", ":("],
        "char": "😞",
        "emojiName": "disappointed"
      },
      "worried": {
        "keywords": ["face", "concern", "nervous", ":("],
        "char": "😟",
        "emojiName": "worried"
      },
      "angry": {
        "keywords": ["mad", "face", "annoyed", "frustrated"],
        "char": "😠",
        "emojiName": "angry"
      },
      "rage": {
        "keywords": ["angry", "mad", "hate", "despise"],
        "char": "😡",
        "emojiName": "rage"
      },
      "pensive": {
        "keywords": ["face", "sad", "depressed", "upset"],
        "char": "😔",
        "emojiName": "pensive"
      },
      "confused": {
        "keywords": ["face", "indifference", "huh", "weird", "hmmm", ":/"],
        "char": "😕",
        "emojiName": "confused"
      },
      "slightly_frowning_face": {
        "keywords": ["face", "frowning", "disappointed", "sad", "upset"],
        "char": "🙁",
        "emojiName": "slightly_frowning_face"
      },
      "frowning_face": {
        "keywords": ["face", "sad", "upset", "frown"],
        "char": "☹",
        "emojiName": "frowning_face"
      },
      "persevere": {
        "keywords": ["face", "sick", "no", "upset", "oops"],
        "char": "😣",
        "emojiName": "persevere"
      },
      "confounded": {
        "keywords": ["face", "confused", "sick", "unwell", "oops", ":S"],
        "char": "😖",
        "emojiName": "confounded"
      },
      "tired_face": {
        "keywords": ["sick", "whine", "upset", "frustrated"],
        "char": "😫",
        "emojiName": "tired_face"
      },
      "weary": {
        "keywords": ["face", "tired", "sleepy", "sad", "frustrated", "upset"],
        "char": "😩",
        "emojiName": "weary"
      },
      "pleading": {
        "keywords": ["face", "begging", "mercy"],
        "char": "🥺",
        "emojiName": "pleading"
      },
      "triumph": {
        "keywords": ["face", "gas", "phew", "proud", "pride"],
        "char": "😤",
        "emojiName": "triumph"
      },
      "open_mouth": {
        "keywords": ["face", "surprise", "impressed", "wow", "whoa", ":O"],
        "char": "😮",
        "emojiName": "open_mouth"
      },
      "scream": {
        "keywords": ["face", "munch", "scared", "omg"],
        "char": "😱",
        "emojiName": "scream"
      },
      "fearful": {
        "keywords": ["face", "scared", "terrified", "nervous", "oops", "huh"],
        "char": "😨",
        "emojiName": "fearful"
      },
      "cold_sweat": {
        "keywords": ["face", "nervous", "sweat"],
        "char": "😰",
        "emojiName": "cold_sweat"
      },
      "hushed": {
        "keywords": ["face", "woo", "shh"],
        "char": "😯",
        "emojiName": "hushed"
      },
      "frowning": {
        "keywords": ["face", "aw", "what"],
        "char": "😦",
        "emojiName": "frowning"
      },
      "anguished": {
        "keywords": ["face", "stunned", "nervous"],
        "char": "😧",
        "emojiName": "anguished"
      },
      "cry": {
        "keywords": ["face", "tears", "sad", "depressed", "upset", ":'("],
        "char": "😢",
        "emojiName": "cry"
      },
      "disappointed_relieved": {
        "keywords": ["face", "phew", "sweat", "nervous"],
        "char": "😥",
        "emojiName": "disappointed_relieved"
      },
      "drooling_face": {
        "keywords": ["face"],
        "char": "🤤",
        "emojiName": "drooling_face"
      },
      "sleepy": {
        "keywords": ["face", "tired", "rest", "nap"],
        "char": "😪",
        "emojiName": "sleepy"
      },
      "sweat": {
        "keywords": ["face", "hot", "sad", "tired", "exercise"],
        "char": "😓",
        "emojiName": "sweat"
      },
      "hot": {
        "keywords": ["face", "feverish", "heat", "red", "sweating"],
        "char": "🥵",
        "emojiName": "hot"
      },
      "cold": {
        "keywords": ["face", "blue", "freezing", "frozen", "frostbite", "icicles"],
        "char": "🥶",
        "emojiName": "cold"
      },
      "sob": {
        "keywords": ["face", "cry", "tears", "sad", "upset", "depressed"],
        "char": "😭",
        "emojiName": "sob"
      },
      "dizzy_face": {
        "keywords": ["spent", "unconscious", "xox", "dizzy"],
        "char": "😵",
        "emojiName": "dizzy_face"
      },
      "astonished": {
        "keywords": ["face", "xox", "surprised", "poisoned"],
        "char": "😲",
        "emojiName": "astonished"
      },
      "zipper_mouth_face": {
        "keywords": ["face", "sealed", "zipper", "secret"],
        "char": "🤐",
        "emojiName": "zipper_mouth_face"
      },
      "nauseated_face": {
        "keywords": ["face", "vomit", "gross", "green", "sick", "throw up", "ill"],
        "char": "🤢",
        "emojiName": "nauseated_face"
      },
      "sneezing_face": {
        "keywords": ["face", "gesundheit", "sneeze", "sick", "allergy"],
        "char": "🤧",
        "emojiName": "sneezing_face"
      },
      "vomiting": {
        "keywords": ["face", "sick"],
        "char": "🤮",
        "emojiName": "vomiting"
      },
      "mask": {
        "keywords": ["face", "sick", "ill", "disease"],
        "char": "😷",
        "emojiName": "mask"
      },
      "face_with_thermometer": {
        "keywords": ["sick", "temperature", "thermometer", "cold", "fever"],
        "char": "🤒",
        "emojiName": "face_with_thermometer"
      },
      "face_with_head_bandage": {
        "keywords": ["injured", "clumsy", "bandage", "hurt"],
        "char": "🤕",
        "emojiName": "face_with_head_bandage"
      },
      "woozy": {
        "keywords": ["face", "dizzy", "intoxicated", "tipsy", "wavy"],
        "char": "🥴",
        "emojiName": "woozy"
      },
      "sleeping": {
        "keywords": ["face", "tired", "sleepy", "night", "zzz"],
        "char": "😴",
        "emojiName": "sleeping"
      },
      "zzz": {
        "keywords": ["sleepy", "tired", "dream"],
        "char": "💤",
        "emojiName": "zzz"
      },
      "poop": {
        "keywords": ["hankey", "shitface", "fail", "turd", "shit"],
        "char": "💩",
        "emojiName": "poop"
      },
      "smiling_imp": {
        "keywords": ["devil", "horns"],
        "char": "😈",
        "emojiName": "smiling_imp"
      },
      "imp": {
        "keywords": ["devil", "angry", "horns"],
        "char": "👿",
        "emojiName": "imp"
      },
      "japanese_ogre": {
        "keywords": ["monster", "red", "mask", "halloween", "scary", "creepy", "devil", "demon", "japanese", "ogre"],
        "char": "👹",
        "emojiName": "japanese_ogre"
      },
      "japanese_goblin": {
        "keywords": ["red", "evil", "mask", "monster", "scary", "creepy", "japanese", "goblin"],
        "char": "👺",
        "emojiName": "japanese_goblin"
      },
      "skull": {
        "keywords": ["dead", "skeleton", "creepy", "death"],
        "char": "💀",
        "emojiName": "skull"
      },
      "ghost": {
        "keywords": ["halloween", "spooky", "scary"],
        "char": "👻",
        "emojiName": "ghost"
      },
      "alien": {
        "keywords": ["UFO", "paul", "weird", "outer_space"],
        "char": "👽",
        "emojiName": "alien"
      },
      "robot": {
        "keywords": ["computer", "machine", "bot"],
        "char": "🤖",
        "emojiName": "robot"
      },
      "smiley_cat": {
        "keywords": ["animal", "cats", "happy", "smile"],
        "char": "😺",
        "emojiName": "smiley_cat"
      },
      "smile_cat": {
        "keywords": ["animal", "cats", "smile"],
        "char": "😸",
        "emojiName": "smile_cat"
      },
      "joy_cat": {
        "keywords": ["animal", "cats", "haha", "happy", "tears"],
        "char": "😹",
        "emojiName": "joy_cat"
      },
      "heart_eyes_cat": {
        "keywords": ["animal", "love", "like", "affection", "cats", "valentines", "heart"],
        "char": "😻",
        "emojiName": "heart_eyes_cat"
      },
      "smirk_cat": {
        "keywords": ["animal", "cats", "smirk"],
        "char": "😼",
        "emojiName": "smirk_cat"
      },
      "kissing_cat": {
        "keywords": ["animal", "cats", "kiss"],
        "char": "😽",
        "emojiName": "kissing_cat"
      },
      "scream_cat": {
        "keywords": ["animal", "cats", "munch", "scared", "scream"],
        "char": "🙀",
        "emojiName": "scream_cat"
      },
      "crying_cat_face": {
        "keywords": ["animal", "tears", "weep", "sad", "cats", "upset", "cry"],
        "char": "😿",
        "emojiName": "crying_cat_face"
      },
      "pouting_cat": {
        "keywords": ["animal", "cats"],
        "char": "😾",
        "emojiName": "pouting_cat"
      },
      "palms_up": {
        "keywords": ["hands", "gesture", "cupped", "prayer"],
        "char": "🤲",
        "fitzpatrick_scale": true,
        "emojiName": "palms_up"
      },
      "raised_hands": {
        "keywords": ["gesture", "hooray", "yea", "celebration", "hands"],
        "char": "🙌",
        "fitzpatrick_scale": true,
        "emojiName": "raised_hands"
      },
      "clap": {
        "keywords": ["hands", "praise", "applause", "congrats", "yay"],
        "char": "👏",
        "fitzpatrick_scale": true,
        "emojiName": "clap"
      },
      "wave": {
        "keywords": ["hands", "gesture", "goodbye", "solong", "farewell", "hello", "hi", "palm"],
        "char": "👋",
        "fitzpatrick_scale": true,
        "emojiName": "wave"
      },
      "call_me_hand": {
        "keywords": ["hands", "gesture"],
        "char": "🤙",
        "fitzpatrick_scale": true,
        "emojiName": "call_me_hand"
      },
      "+1": {
        "keywords": ["thumbsup", "yes", "awesome", "good", "agree", "accept", "cool", "hand", "like"],
        "char": "👍",
        "fitzpatrick_scale": true,
        "emojiName": "+1"
      },
      "-1": {
        "keywords": ["thumbsdown", "no", "dislike", "hand"],
        "char": "👎",
        "fitzpatrick_scale": true,
        "emojiName": "-1"
      },
      "facepunch": {
        "keywords": ["angry", "violence", "fist", "hit", "attack", "hand"],
        "char": "👊",
        "fitzpatrick_scale": true,
        "emojiName": "facepunch"
      },
      "fist": {
        "keywords": ["fingers", "hand", "grasp"],
        "char": "✊",
        "fitzpatrick_scale": true,
        "emojiName": "fist"
      },
      "fist_left": {
        "keywords": ["hand", "fistbump"],
        "char": "🤛",
        "fitzpatrick_scale": true,
        "emojiName": "fist_left"
      },
      "fist_right": {
        "keywords": ["hand", "fistbump"],
        "char": "🤜",
        "fitzpatrick_scale": true,
        "emojiName": "fist_right"
      },
      "v": {
        "keywords": ["fingers", "ohyeah", "hand", "peace", "victory", "two"],
        "char": "✌",
        "fitzpatrick_scale": true,
        "emojiName": "v"
      },
      "ok_hand": {
        "keywords": ["fingers", "limbs", "perfect", "ok", "okay"],
        "char": "👌",
        "fitzpatrick_scale": true,
        "emojiName": "ok_hand"
      },
      "raised_hand": {
        "keywords": ["fingers", "stop", "highfive", "palm", "ban"],
        "char": "✋",
        "fitzpatrick_scale": true,
        "emojiName": "raised_hand"
      },
      "raised_back_of_hand": {
        "keywords": ["fingers", "raised", "backhand"],
        "char": "🤚",
        "fitzpatrick_scale": true,
        "emojiName": "raised_back_of_hand"
      },
      "open_hands": {
        "keywords": ["fingers", "butterfly", "hands", "open"],
        "char": "👐",
        "fitzpatrick_scale": true,
        "emojiName": "open_hands"
      },
      "muscle": {
        "keywords": ["arm", "flex", "hand", "summer", "strong", "biceps"],
        "char": "💪",
        "fitzpatrick_scale": true,
        "emojiName": "muscle"
      },
      "pray": {
        "keywords": ["please", "hope", "wish", "namaste", "highfive"],
        "char": "🙏",
        "fitzpatrick_scale": true,
        "emojiName": "pray"
      },
      "foot": {
        "keywords": ["kick", "stomp"],
        "char": "🦶",
        "fitzpatrick_scale": true,
        "emojiName": "foot"
      },
      "leg": {
        "keywords": ["kick", "limb"],
        "char": "🦵",
        "fitzpatrick_scale": true,
        "emojiName": "leg"
      },
      "handshake": {
        "keywords": ["agreement", "shake"],
        "char": "🤝",
        "emojiName": "handshake"
      },
      "point_up": {
        "keywords": ["hand", "fingers", "direction", "up"],
        "char": "☝",
        "fitzpatrick_scale": true,
        "emojiName": "point_up"
      },
      "point_up_2": {
        "keywords": ["fingers", "hand", "direction", "up"],
        "char": "👆",
        "fitzpatrick_scale": true,
        "emojiName": "point_up_2"
      },
      "point_down": {
        "keywords": ["fingers", "hand", "direction", "down"],
        "char": "👇",
        "fitzpatrick_scale": true,
        "emojiName": "point_down"
      },
      "point_left": {
        "keywords": ["direction", "fingers", "hand", "left"],
        "char": "👈",
        "fitzpatrick_scale": true,
        "emojiName": "point_left"
      },
      "point_right": {
        "keywords": ["fingers", "hand", "direction", "right"],
        "char": "👉",
        "fitzpatrick_scale": true,
        "emojiName": "point_right"
      },
      "fu": {
        "keywords": ["hand", "fingers", "rude", "middle", "flipping"],
        "char": "🖕",
        "fitzpatrick_scale": true,
        "emojiName": "fu"
      },
      "raised_hand_with_fingers_splayed": {
        "keywords": ["hand", "fingers", "palm"],
        "char": "🖐",
        "fitzpatrick_scale": true,
        "emojiName": "raised_hand_with_fingers_splayed"
      },
      "love_you": {
        "keywords": ["hand", "fingers", "gesture"],
        "char": "🤟",
        "fitzpatrick_scale": true,
        "emojiName": "love_you"
      },
      "metal": {
        "keywords": ["hand", "fingers", "evil_eye", "sign_of_horns", "rock_on"],
        "char": "🤘",
        "fitzpatrick_scale": true,
        "emojiName": "metal"
      },
      "crossed_fingers": {
        "keywords": ["good", "lucky"],
        "char": "🤞",
        "fitzpatrick_scale": true,
        "emojiName": "crossed_fingers"
      },
      "vulcan_salute": {
        "keywords": ["hand", "fingers", "spock", "star trek"],
        "char": "🖖",
        "fitzpatrick_scale": true,
        "emojiName": "vulcan_salute"
      },
      "writing_hand": {
        "keywords": ["lower_left_ballpoint_pen", "stationery", "write", "compose"],
        "char": "✍",
        "fitzpatrick_scale": true,
        "emojiName": "writing_hand"
      },
      "selfie": {
        "keywords": ["camera", "phone"],
        "char": "🤳",
        "fitzpatrick_scale": true,
        "emojiName": "selfie"
      },
      "nail_care": {
        "keywords": ["beauty", "manicure", "finger", "fashion", "nail"],
        "char": "💅",
        "fitzpatrick_scale": true,
        "emojiName": "nail_care"
      },
      "lips": {
        "keywords": ["mouth", "kiss"],
        "char": "👄",
        "emojiName": "lips"
      },
      "tooth": {
        "keywords": ["teeth", "dentist"],
        "char": "🦷",
        "emojiName": "tooth"
      },
      "tongue": {
        "keywords": ["mouth", "playful"],
        "char": "👅",
        "emojiName": "tongue"
      },
      "ear": {
        "keywords": ["face", "hear", "sound", "listen"],
        "char": "👂",
        "fitzpatrick_scale": true,
        "emojiName": "ear"
      },
      "nose": {
        "keywords": ["smell", "sniff"],
        "char": "👃",
        "fitzpatrick_scale": true,
        "emojiName": "nose"
      },
      "eye": {
        "keywords": ["face", "look", "see", "watch", "stare"],
        "char": "👁",
        "emojiName": "eye"
      },
      "eyes": {
        "keywords": ["look", "watch", "stalk", "peek", "see"],
        "char": "👀",
        "emojiName": "eyes"
      },
      "brain": {
        "keywords": ["smart", "intelligent"],
        "char": "🧠",
        "emojiName": "brain"
      },
      "bust_in_silhouette": {
        "keywords": ["user", "person", "human"],
        "char": "👤",
        "emojiName": "bust_in_silhouette"
      },
      "busts_in_silhouette": {
        "keywords": ["user", "person", "human", "group", "team"],
        "char": "👥",
        "emojiName": "busts_in_silhouette"
      },
      "speaking_head": {
        "keywords": ["user", "person", "human", "sing", "say", "talk"],
        "char": "🗣",
        "emojiName": "speaking_head"
      },
      "baby": {
        "keywords": ["child", "boy", "girl", "toddler"],
        "char": "👶",
        "fitzpatrick_scale": true,
        "emojiName": "baby"
      },
      "child": {
        "keywords": ["gender-neutral", "young"],
        "char": "🧒",
        "fitzpatrick_scale": true,
        "emojiName": "child"
      },
      "boy": {
        "keywords": ["man", "male", "guy", "teenager"],
        "char": "👦",
        "fitzpatrick_scale": true,
        "emojiName": "boy"
      },
      "girl": {
        "keywords": ["female", "woman", "teenager"],
        "char": "👧",
        "fitzpatrick_scale": true,
        "emojiName": "girl"
      },
      "adult": {
        "keywords": ["gender-neutral", "person"],
        "char": "🧑",
        "fitzpatrick_scale": true,
        "emojiName": "adult"
      },
      "man": {
        "keywords": ["mustache", "father", "dad", "guy", "classy", "sir", "moustache"],
        "char": "👨",
        "fitzpatrick_scale": true,
        "emojiName": "man"
      },
      "woman": {
        "keywords": ["female", "girls", "lady"],
        "char": "👩",
        "fitzpatrick_scale": true,
        "emojiName": "woman"
      },
      "blonde_woman": {
        "keywords": ["woman", "female", "girl", "blonde", "person"],
        "char": "👱‍♀️",
        "fitzpatrick_scale": true,
        "emojiName": "blonde_woman"
      },
      "blonde_man": {
        "keywords": ["man", "male", "boy", "blonde", "guy", "person"],
        "char": "👱",
        "fitzpatrick_scale": true,
        "emojiName": "blonde_man"
      },
      "bearded_person": {
        "keywords": ["person", "bewhiskered"],
        "char": "🧔",
        "fitzpatrick_scale": true,
        "emojiName": "bearded_person"
      },
      "older_adult": {
        "keywords": ["human", "elder", "senior", "gender-neutral"],
        "char": "🧓",
        "fitzpatrick_scale": true,
        "emojiName": "older_adult"
      },
      "older_man": {
        "keywords": ["human", "male", "men", "old", "elder", "senior"],
        "char": "👴",
        "fitzpatrick_scale": true,
        "emojiName": "older_man"
      },
      "older_woman": {
        "keywords": ["human", "female", "women", "lady", "old", "elder", "senior"],
        "char": "👵",
        "fitzpatrick_scale": true,
        "emojiName": "older_woman"
      },
      "man_with_gua_pi_mao": {
        "keywords": ["male", "boy", "chinese"],
        "char": "👲",
        "fitzpatrick_scale": true,
        "emojiName": "man_with_gua_pi_mao"
      },
      "woman_with_headscarf": {
        "keywords": ["female", "hijab", "mantilla", "tichel"],
        "char": "🧕",
        "fitzpatrick_scale": true,
        "emojiName": "woman_with_headscarf"
      },
      "woman_with_turban": {
        "keywords": ["female", "indian", "hinduism", "arabs", "woman"],
        "char": "👳‍♀️",
        "fitzpatrick_scale": true,
        "emojiName": "woman_with_turban"
      },
      "man_with_turban": {
        "keywords": ["male", "indian", "hinduism", "arabs"],
        "char": "👳",
        "fitzpatrick_scale": true,
        "emojiName": "man_with_turban"
      },
      "policewoman": {
        "keywords": ["woman", "police", "law", "legal", "enforcement", "arrest", "911", "female"],
        "char": "👮‍♀️",
        "fitzpatrick_scale": true,
        "emojiName": "policewoman"
      },
      "policeman": {
        "keywords": ["man", "police", "law", "legal", "enforcement", "arrest", "911"],
        "char": "👮",
        "fitzpatrick_scale": true,
        "emojiName": "policeman"
      },
      "construction_worker_woman": {
        "keywords": ["female", "human", "wip", "build", "construction", "worker", "labor", "woman"],
        "char": "👷‍♀️",
        "fitzpatrick_scale": true,
        "emojiName": "construction_worker_woman"
      },
      "construction_worker_man": {
        "keywords": ["male", "human", "wip", "guy", "build", "construction", "worker", "labor"],
        "char": "👷",
        "fitzpatrick_scale": true,
        "emojiName": "construction_worker_man"
      },
      "guardswoman": {
        "keywords": ["uk", "gb", "british", "female", "royal", "woman"],
        "char": "💂‍♀️",
        "fitzpatrick_scale": true,
        "emojiName": "guardswoman"
      },
      "guardsman": {
        "keywords": ["uk", "gb", "british", "male", "guy", "royal"],
        "char": "💂",
        "fitzpatrick_scale": true,
        "emojiName": "guardsman"
      },
      "female_detective": {
        "keywords": ["human", "spy", "detective", "female", "woman"],
        "char": "🕵️‍♀️",
        "fitzpatrick_scale": true,
        "emojiName": "female_detective"
      },
      "male_detective": {
        "keywords": ["human", "spy", "detective"],
        "char": "🕵",
        "fitzpatrick_scale": true,
        "emojiName": "male_detective"
      },
      "woman_health_worker": {
        "keywords": ["doctor", "nurse", "therapist", "healthcare", "woman", "human"],
        "char": "👩‍⚕️",
        "fitzpatrick_scale": true,
        "emojiName": "woman_health_worker"
      },
      "man_health_worker": {
        "keywords": ["doctor", "nurse", "therapist", "healthcare", "man", "human"],
        "char": "👨‍⚕️",
        "fitzpatrick_scale": true,
        "emojiName": "man_health_worker"
      },
      "woman_farmer": {
        "keywords": ["rancher", "gardener", "woman", "human"],
        "char": "👩‍🌾",
        "fitzpatrick_scale": true,
        "emojiName": "woman_farmer"
      },
      "man_farmer": {
        "keywords": ["rancher", "gardener", "man", "human"],
        "char": "👨‍🌾",
        "fitzpatrick_scale": true,
        "emojiName": "man_farmer"
      },
      "woman_cook": {
        "keywords": ["chef", "woman", "human"],
        "char": "👩‍🍳",
        "fitzpatrick_scale": true,
        "emojiName": "woman_cook"
      },
      "man_cook": {
        "keywords": ["chef", "man", "human"],
        "char": "👨‍🍳",
        "fitzpatrick_scale": true,
        "emojiName": "man_cook"
      },
      "woman_student": {
        "keywords": ["graduate", "woman", "human"],
        "char": "👩‍🎓",
        "fitzpatrick_scale": true,
        "emojiName": "woman_student"
      },
      "man_student": {
        "keywords": ["graduate", "man", "human"],
        "char": "👨‍🎓",
        "fitzpatrick_scale": true,
        "emojiName": "man_student"
      },
      "woman_singer": {
        "keywords": ["rockstar", "entertainer", "woman", "human"],
        "char": "👩‍🎤",
        "fitzpatrick_scale": true,
        "emojiName": "woman_singer"
      },
      "man_singer": {
        "keywords": ["rockstar", "entertainer", "man", "human"],
        "char": "👨‍🎤",
        "fitzpatrick_scale": true,
        "emojiName": "man_singer"
      },
      "woman_teacher": {
        "keywords": ["instructor", "professor", "woman", "human"],
        "char": "👩‍🏫",
        "fitzpatrick_scale": true,
        "emojiName": "woman_teacher"
      },
      "man_teacher": {
        "keywords": ["instructor", "professor", "man", "human"],
        "char": "👨‍🏫",
        "fitzpatrick_scale": true,
        "emojiName": "man_teacher"
      },
      "woman_factory_worker": {
        "keywords": ["assembly", "industrial", "woman", "human"],
        "char": "👩‍🏭",
        "fitzpatrick_scale": true,
        "emojiName": "woman_factory_worker"
      },
      "man_factory_worker": {
        "keywords": ["assembly", "industrial", "man", "human"],
        "char": "👨‍🏭",
        "fitzpatrick_scale": true,
        "emojiName": "man_factory_worker"
      },
      "woman_technologist": {
        "keywords": ["coder", "developer", "engineer", "programmer", "software", "woman", "human", "laptop", "computer"],
        "char": "👩‍💻",
        "fitzpatrick_scale": true,
        "emojiName": "woman_technologist"
      },
      "man_technologist": {
        "keywords": ["coder", "developer", "engineer", "programmer", "software", "man", "human", "laptop", "computer"],
        "char": "👨‍💻",
        "fitzpatrick_scale": true,
        "emojiName": "man_technologist"
      },
      "woman_office_worker": {
        "keywords": ["business", "manager", "woman", "human"],
        "char": "👩‍💼",
        "fitzpatrick_scale": true,
        "emojiName": "woman_office_worker"
      },
      "man_office_worker": {
        "keywords": ["business", "manager", "man", "human"],
        "char": "👨‍💼",
        "fitzpatrick_scale": true,
        "emojiName": "man_office_worker"
      },
      "woman_mechanic": {
        "keywords": ["plumber", "woman", "human", "wrench"],
        "char": "👩‍🔧",
        "fitzpatrick_scale": true,
        "emojiName": "woman_mechanic"
      },
      "man_mechanic": {
        "keywords": ["plumber", "man", "human", "wrench"],
        "char": "👨‍🔧",
        "fitzpatrick_scale": true,
        "emojiName": "man_mechanic"
      },
      "woman_scientist": {
        "keywords": ["biologist", "chemist", "engineer", "physicist", "woman", "human"],
        "char": "👩‍🔬",
        "fitzpatrick_scale": true,
        "emojiName": "woman_scientist"
      },
      "man_scientist": {
        "keywords": ["biologist", "chemist", "engineer", "physicist", "man", "human"],
        "char": "👨‍🔬",
        "fitzpatrick_scale": true,
        "emojiName": "man_scientist"
      },
      "woman_artist": {
        "keywords": ["painter", "woman", "human"],
        "char": "👩‍🎨",
        "fitzpatrick_scale": true,
        "emojiName": "woman_artist"
      },
      "man_artist": {
        "keywords": ["painter", "man", "human"],
        "char": "👨‍🎨",
        "fitzpatrick_scale": true,
        "emojiName": "man_artist"
      },
      "woman_firefighter": {
        "keywords": ["fireman", "woman", "human"],
        "char": "👩‍🚒",
        "fitzpatrick_scale": true,
        "emojiName": "woman_firefighter"
      },
      "man_firefighter": {
        "keywords": ["fireman", "man", "human"],
        "char": "👨‍🚒",
        "fitzpatrick_scale": true,
        "emojiName": "man_firefighter"
      },
      "woman_pilot": {
        "keywords": ["aviator", "plane", "woman", "human"],
        "char": "👩‍✈️",
        "fitzpatrick_scale": true,
        "emojiName": "woman_pilot"
      },
      "man_pilot": {
        "keywords": ["aviator", "plane", "man", "human"],
        "char": "👨‍✈️",
        "fitzpatrick_scale": true,
        "emojiName": "man_pilot"
      },
      "woman_astronaut": {
        "keywords": ["space", "rocket", "woman", "human"],
        "char": "👩‍🚀",
        "fitzpatrick_scale": true,
        "emojiName": "woman_astronaut"
      },
      "man_astronaut": {
        "keywords": ["space", "rocket", "man", "human"],
        "char": "👨‍🚀",
        "fitzpatrick_scale": true,
        "emojiName": "man_astronaut"
      },
      "woman_judge": {
        "keywords": ["justice", "court", "woman", "human"],
        "char": "👩‍⚖️",
        "fitzpatrick_scale": true,
        "emojiName": "woman_judge"
      },
      "man_judge": {
        "keywords": ["justice", "court", "man", "human"],
        "char": "👨‍⚖️",
        "fitzpatrick_scale": true,
        "emojiName": "man_judge"
      },
      "woman_superhero": {
        "keywords": ["woman", "female", "good", "heroine", "superpowers"],
        "char": "🦸‍♀️",
        "fitzpatrick_scale": true,
        "emojiName": "woman_superhero"
      },
      "man_superhero": {
        "keywords": ["man", "male", "good", "hero", "superpowers"],
        "char": "🦸‍♂️",
        "fitzpatrick_scale": true,
        "emojiName": "man_superhero"
      },
      "woman_supervillain": {
        "keywords": ["woman", "female", "evil", "bad", "criminal", "heroine", "superpowers"],
        "char": "🦹‍♀️",
        "fitzpatrick_scale": true,
        "emojiName": "woman_supervillain"
      },
      "man_supervillain": {
        "keywords": ["man", "male", "evil", "bad", "criminal", "hero", "superpowers"],
        "char": "🦹‍♂️",
        "fitzpatrick_scale": true,
        "emojiName": "man_supervillain"
      },
      "mrs_claus": {
        "keywords": ["woman", "female", "xmas", "mother christmas"],
        "char": "🤶",
        "fitzpatrick_scale": true,
        "emojiName": "mrs_claus"
      },
      "santa": {
        "keywords": ["festival", "man", "male", "xmas", "father christmas"],
        "char": "🎅",
        "fitzpatrick_scale": true,
        "emojiName": "santa"
      },
      "sorceress": {
        "keywords": ["woman", "female", "mage", "witch"],
        "char": "🧙‍♀️",
        "fitzpatrick_scale": true,
        "emojiName": "sorceress"
      },
      "wizard": {
        "keywords": ["man", "male", "mage", "sorcerer"],
        "char": "🧙‍♂️",
        "fitzpatrick_scale": true,
        "emojiName": "wizard"
      },
      "woman_elf": {
        "keywords": ["woman", "female"],
        "char": "🧝‍♀️",
        "fitzpatrick_scale": true,
        "emojiName": "woman_elf"
      },
      "man_elf": {
        "keywords": ["man", "male"],
        "char": "🧝‍♂️",
        "fitzpatrick_scale": true,
        "emojiName": "man_elf"
      },
      "woman_vampire": {
        "keywords": ["woman", "female"],
        "char": "🧛‍♀️",
        "fitzpatrick_scale": true,
        "emojiName": "woman_vampire"
      },
      "man_vampire": {
        "keywords": ["man", "male", "dracula"],
        "char": "🧛‍♂️",
        "fitzpatrick_scale": true,
        "emojiName": "man_vampire"
      },
      "woman_zombie": {
        "keywords": ["woman", "female", "undead", "walking dead"],
        "char": "🧟‍♀️",
        "emojiName": "woman_zombie"
      },
      "man_zombie": {
        "keywords": ["man", "male", "dracula", "undead", "walking dead"],
        "char": "🧟‍♂️",
        "emojiName": "man_zombie"
      },
      "woman_genie": {
        "keywords": ["woman", "female"],
        "char": "🧞‍♀️",
        "emojiName": "woman_genie"
      },
      "man_genie": {
        "keywords": ["man", "male"],
        "char": "🧞‍♂️",
        "emojiName": "man_genie"
      },
      "mermaid": {
        "keywords": ["woman", "female", "merwoman", "ariel"],
        "char": "🧜‍♀️",
        "fitzpatrick_scale": true,
        "emojiName": "mermaid"
      },
      "merman": {
        "keywords": ["man", "male", "triton"],
        "char": "🧜‍♂️",
        "fitzpatrick_scale": true,
        "emojiName": "merman"
      },
      "woman_fairy": {
        "keywords": ["woman", "female"],
        "char": "🧚‍♀️",
        "fitzpatrick_scale": true,
        "emojiName": "woman_fairy"
      },
      "man_fairy": {
        "keywords": ["man", "male"],
        "char": "🧚‍♂️",
        "fitzpatrick_scale": true,
        "emojiName": "man_fairy"
      },
      "angel": {
        "keywords": ["heaven", "wings", "halo"],
        "char": "👼",
        "fitzpatrick_scale": true,
        "emojiName": "angel"
      },
      "pregnant_woman": {
        "keywords": ["baby"],
        "char": "🤰",
        "fitzpatrick_scale": true,
        "emojiName": "pregnant_woman"
      },
      "breastfeeding": {
        "keywords": ["nursing", "baby"],
        "char": "🤱",
        "fitzpatrick_scale": true,
        "emojiName": "breastfeeding"
      },
      "princess": {
        "keywords": ["girl", "woman", "female", "blond", "crown", "royal", "queen"],
        "char": "👸",
        "fitzpatrick_scale": true,
        "emojiName": "princess"
      },
      "prince": {
        "keywords": ["boy", "man", "male", "crown", "royal", "king"],
        "char": "🤴",
        "fitzpatrick_scale": true,
        "emojiName": "prince"
      },
      "bride_with_veil": {
        "keywords": ["couple", "marriage", "wedding", "woman", "bride"],
        "char": "👰",
        "fitzpatrick_scale": true,
        "emojiName": "bride_with_veil"
      },
      "man_in_tuxedo": {
        "keywords": ["couple", "marriage", "wedding", "groom"],
        "char": "🤵",
        "fitzpatrick_scale": true,
        "emojiName": "man_in_tuxedo"
      },
      "running_woman": {
        "keywords": ["woman", "walking", "exercise", "race", "running", "female"],
        "char": "🏃‍♀️",
        "fitzpatrick_scale": true,
        "emojiName": "running_woman"
      },
      "running_man": {
        "keywords": ["man", "walking", "exercise", "race", "running"],
        "char": "🏃",
        "fitzpatrick_scale": true,
        "emojiName": "running_man"
      },
      "walking_woman": {
        "keywords": ["human", "feet", "steps", "woman", "female"],
        "char": "🚶‍♀️",
        "fitzpatrick_scale": true,
        "emojiName": "walking_woman"
      },
      "walking_man": {
        "keywords": ["human", "feet", "steps"],
        "char": "🚶",
        "fitzpatrick_scale": true,
        "emojiName": "walking_man"
      },
      "dancer": {
        "keywords": ["female", "girl", "woman", "fun"],
        "char": "💃",
        "fitzpatrick_scale": true,
        "emojiName": "dancer"
      },
      "man_dancing": {
        "keywords": ["male", "boy", "fun", "dancer"],
        "char": "🕺",
        "fitzpatrick_scale": true,
        "emojiName": "man_dancing"
      },
      "dancing_women": {
        "keywords": ["female", "bunny", "women", "girls"],
        "char": "👯",
        "emojiName": "dancing_women"
      },
      "dancing_men": {
        "keywords": ["male", "bunny", "men", "boys"],
        "char": "👯‍♂️",
        "emojiName": "dancing_men"
      },
      "couple": {
        "keywords": ["pair", "people", "human", "love", "date", "dating", "like", "affection", "valentines", "marriage"],
        "char": "👫",
        "emojiName": "couple"
      },
      "two_men_holding_hands": {
        "keywords": ["pair", "couple", "love", "like", "bromance", "friendship", "people", "human"],
        "char": "👬",
        "emojiName": "two_men_holding_hands"
      },
      "two_women_holding_hands": {
        "keywords": ["pair", "friendship", "couple", "love", "like", "female", "people", "human"],
        "char": "👭",
        "emojiName": "two_women_holding_hands"
      },
      "bowing_woman": {
        "keywords": ["woman", "female", "girl"],
        "char": "🙇‍♀️",
        "fitzpatrick_scale": true,
        "emojiName": "bowing_woman"
      },
      "bowing_man": {
        "keywords": ["man", "male", "boy"],
        "char": "🙇",
        "fitzpatrick_scale": true,
        "emojiName": "bowing_man"
      },
      "man_facepalming": {
        "keywords": ["man", "male", "boy", "disbelief"],
        "char": "🤦‍♂️",
        "fitzpatrick_scale": true,
        "emojiName": "man_facepalming"
      },
      "woman_facepalming": {
        "keywords": ["woman", "female", "girl", "disbelief"],
        "char": "🤦‍♀️",
        "fitzpatrick_scale": true,
        "emojiName": "woman_facepalming"
      },
      "woman_shrugging": {
        "keywords": ["woman", "female", "girl", "confused", "indifferent", "doubt"],
        "char": "🤷",
        "fitzpatrick_scale": true,
        "emojiName": "woman_shrugging"
      },
      "man_shrugging": {
        "keywords": ["man", "male", "boy", "confused", "indifferent", "doubt"],
        "char": "🤷‍♂️",
        "fitzpatrick_scale": true,
        "emojiName": "man_shrugging"
      },
      "tipping_hand_woman": {
        "keywords": ["female", "girl", "woman", "human", "information"],
        "char": "💁",
        "fitzpatrick_scale": true,
        "emojiName": "tipping_hand_woman"
      },
      "tipping_hand_man": {
        "keywords": ["male", "boy", "man", "human", "information"],
        "char": "💁‍♂️",
        "fitzpatrick_scale": true,
        "emojiName": "tipping_hand_man"
      },
      "no_good_woman": {
        "keywords": ["female", "girl", "woman", "nope"],
        "char": "🙅",
        "fitzpatrick_scale": true,
        "emojiName": "no_good_woman"
      },
      "no_good_man": {
        "keywords": ["male", "boy", "man", "nope"],
        "char": "🙅‍♂️",
        "fitzpatrick_scale": true,
        "emojiName": "no_good_man"
      },
      "ok_woman": {
        "keywords": ["women", "girl", "female", "pink", "human", "woman"],
        "char": "🙆",
        "fitzpatrick_scale": true,
        "emojiName": "ok_woman"
      },
      "ok_man": {
        "keywords": ["men", "boy", "male", "blue", "human", "man"],
        "char": "🙆‍♂️",
        "fitzpatrick_scale": true,
        "emojiName": "ok_man"
      },
      "raising_hand_woman": {
        "keywords": ["female", "girl", "woman"],
        "char": "🙋",
        "fitzpatrick_scale": true,
        "emojiName": "raising_hand_woman"
      },
      "raising_hand_man": {
        "keywords": ["male", "boy", "man"],
        "char": "🙋‍♂️",
        "fitzpatrick_scale": true,
        "emojiName": "raising_hand_man"
      },
      "pouting_woman": {
        "keywords": ["female", "girl", "woman"],
        "char": "🙎",
        "fitzpatrick_scale": true,
        "emojiName": "pouting_woman"
      },
      "pouting_man": {
        "keywords": ["male", "boy", "man"],
        "char": "🙎‍♂️",
        "fitzpatrick_scale": true,
        "emojiName": "pouting_man"
      },
      "frowning_woman": {
        "keywords": ["female", "girl", "woman", "sad", "depressed", "discouraged", "unhappy"],
        "char": "🙍",
        "fitzpatrick_scale": true,
        "emojiName": "frowning_woman"
      },
      "frowning_man": {
        "keywords": ["male", "boy", "man", "sad", "depressed", "discouraged", "unhappy"],
        "char": "🙍‍♂️",
        "fitzpatrick_scale": true,
        "emojiName": "frowning_man"
      },
      "haircut_woman": {
        "keywords": ["female", "girl", "woman"],
        "char": "💇",
        "fitzpatrick_scale": true,
        "emojiName": "haircut_woman"
      },
      "haircut_man": {
        "keywords": ["male", "boy", "man"],
        "char": "💇‍♂️",
        "fitzpatrick_scale": true,
        "emojiName": "haircut_man"
      },
      "massage_woman": {
        "keywords": ["female", "girl", "woman", "head"],
        "char": "💆",
        "fitzpatrick_scale": true,
        "emojiName": "massage_woman"
      },
      "massage_man": {
        "keywords": ["male", "boy", "man", "head"],
        "char": "💆‍♂️",
        "fitzpatrick_scale": true,
        "emojiName": "massage_man"
      },
      "woman_in_steamy_room": {
        "keywords": ["female", "woman", "spa", "steamroom", "sauna"],
        "char": "🧖‍♀️",
        "fitzpatrick_scale": true,
        "emojiName": "woman_in_steamy_room"
      },
      "man_in_steamy_room": {
        "keywords": ["male", "man", "spa", "steamroom", "sauna"],
        "char": "🧖‍♂️",
        "fitzpatrick_scale": true,
        "emojiName": "man_in_steamy_room"
      },
      "couple_with_heart_woman_man": {
        "keywords": ["pair", "love", "like", "affection", "human", "dating", "valentines", "marriage"],
        "char": "💑",
        "emojiName": "couple_with_heart_woman_man"
      },
      "couple_with_heart_woman_woman": {
        "keywords": ["pair", "love", "like", "affection", "human", "dating", "valentines", "marriage"],
        "char": "👩‍❤️‍👩",
        "emojiName": "couple_with_heart_woman_woman"
      },
      "couple_with_heart_man_man": {
        "keywords": ["pair", "love", "like", "affection", "human", "dating", "valentines", "marriage"],
        "char": "👨‍❤️‍👨",
        "emojiName": "couple_with_heart_man_man"
      },
      "couplekiss_man_woman": {
        "keywords": ["pair", "valentines", "love", "like", "dating", "marriage"],
        "char": "💏",
        "emojiName": "couplekiss_man_woman"
      },
      "couplekiss_woman_woman": {
        "keywords": ["pair", "valentines", "love", "like", "dating", "marriage"],
        "char": "👩‍❤️‍💋‍👩",
        "emojiName": "couplekiss_woman_woman"
      },
      "couplekiss_man_man": {
        "keywords": ["pair", "valentines", "love", "like", "dating", "marriage"],
        "char": "👨‍❤️‍💋‍👨",
        "emojiName": "couplekiss_man_man"
      },
      "family_man_woman_boy": {
        "keywords": ["home", "parents", "child", "mom", "dad", "father", "mother", "people", "human"],
        "char": "👪",
        "emojiName": "family_man_woman_boy"
      },
      "family_man_woman_girl": {
        "keywords": ["home", "parents", "people", "human", "child"],
        "char": "👨‍👩‍👧",
        "emojiName": "family_man_woman_girl"
      },
      "family_man_woman_girl_boy": {
        "keywords": ["home", "parents", "people", "human", "children"],
        "char": "👨‍👩‍👧‍👦",
        "emojiName": "family_man_woman_girl_boy"
      },
      "family_man_woman_boy_boy": {
        "keywords": ["home", "parents", "people", "human", "children"],
        "char": "👨‍👩‍👦‍👦",
        "emojiName": "family_man_woman_boy_boy"
      },
      "family_man_woman_girl_girl": {
        "keywords": ["home", "parents", "people", "human", "children"],
        "char": "👨‍👩‍👧‍👧",
        "emojiName": "family_man_woman_girl_girl"
      },
      "family_woman_woman_boy": {
        "keywords": ["home", "parents", "people", "human", "children"],
        "char": "👩‍👩‍👦",
        "emojiName": "family_woman_woman_boy"
      },
      "family_woman_woman_girl": {
        "keywords": ["home", "parents", "people", "human", "children"],
        "char": "👩‍👩‍👧",
        "emojiName": "family_woman_woman_girl"
      },
      "family_woman_woman_girl_boy": {
        "keywords": ["home", "parents", "people", "human", "children"],
        "char": "👩‍👩‍👧‍👦",
        "emojiName": "family_woman_woman_girl_boy"
      },
      "family_woman_woman_boy_boy": {
        "keywords": ["home", "parents", "people", "human", "children"],
        "char": "👩‍👩‍👦‍👦",
        "emojiName": "family_woman_woman_boy_boy"
      },
      "family_woman_woman_girl_girl": {
        "keywords": ["home", "parents", "people", "human", "children"],
        "char": "👩‍👩‍👧‍👧",
        "emojiName": "family_woman_woman_girl_girl"
      },
      "family_man_man_boy": {
        "keywords": ["home", "parents", "people", "human", "children"],
        "char": "👨‍👨‍👦",
        "emojiName": "family_man_man_boy"
      },
      "family_man_man_girl": {
        "keywords": ["home", "parents", "people", "human", "children"],
        "char": "👨‍👨‍👧",
        "emojiName": "family_man_man_girl"
      },
      "family_man_man_girl_boy": {
        "keywords": ["home", "parents", "people", "human", "children"],
        "char": "👨‍👨‍👧‍👦",
        "emojiName": "family_man_man_girl_boy"
      },
      "family_man_man_boy_boy": {
        "keywords": ["home", "parents", "people", "human", "children"],
        "char": "👨‍👨‍👦‍👦",
        "emojiName": "family_man_man_boy_boy"
      },
      "family_man_man_girl_girl": {
        "keywords": ["home", "parents", "people", "human", "children"],
        "char": "👨‍👨‍👧‍👧",
        "emojiName": "family_man_man_girl_girl"
      },
      "family_woman_boy": {
        "keywords": ["home", "parent", "people", "human", "child"],
        "char": "👩‍👦",
        "emojiName": "family_woman_boy"
      },
      "family_woman_girl": {
        "keywords": ["home", "parent", "people", "human", "child"],
        "char": "👩‍👧",
        "emojiName": "family_woman_girl"
      },
      "family_woman_girl_boy": {
        "keywords": ["home", "parent", "people", "human", "children"],
        "char": "👩‍👧‍👦",
        "emojiName": "family_woman_girl_boy"
      },
      "family_woman_boy_boy": {
        "keywords": ["home", "parent", "people", "human", "children"],
        "char": "👩‍👦‍👦",
        "emojiName": "family_woman_boy_boy"
      },
      "family_woman_girl_girl": {
        "keywords": ["home", "parent", "people", "human", "children"],
        "char": "👩‍👧‍👧",
        "emojiName": "family_woman_girl_girl"
      },
      "family_man_boy": {
        "keywords": ["home", "parent", "people", "human", "child"],
        "char": "👨‍👦",
        "emojiName": "family_man_boy"
      },
      "family_man_girl": {
        "keywords": ["home", "parent", "people", "human", "child"],
        "char": "👨‍👧",
        "emojiName": "family_man_girl"
      },
      "family_man_girl_boy": {
        "keywords": ["home", "parent", "people", "human", "children"],
        "char": "👨‍👧‍👦",
        "emojiName": "family_man_girl_boy"
      },
      "family_man_boy_boy": {
        "keywords": ["home", "parent", "people", "human", "children"],
        "char": "👨‍👦‍👦",
        "emojiName": "family_man_boy_boy"
      },
      "family_man_girl_girl": {
        "keywords": ["home", "parent", "people", "human", "children"],
        "char": "👨‍👧‍👧",
        "emojiName": "family_man_girl_girl"
      },
      "yarn": {
        "keywords": ["ball", "crochet", "knit"],
        "char": "🧶",
        "emojiName": "yarn"
      },
      "thread": {
        "keywords": ["needle", "sewing", "spool", "string"],
        "char": "🧵",
        "emojiName": "thread"
      },
      "coat": {
        "keywords": ["jacket"],
        "char": "🧥",
        "emojiName": "coat"
      },
      "labcoat": {
        "keywords": ["doctor", "experiment", "scientist", "chemist"],
        "char": "🥼",
        "emojiName": "labcoat"
      },
      "womans_clothes": {
        "keywords": ["fashion", "shopping_bags", "female"],
        "char": "👚",
        "emojiName": "womans_clothes"
      },
      "tshirt": {
        "keywords": ["fashion", "cloth", "casual", "shirt", "tee"],
        "char": "👕",
        "emojiName": "tshirt"
      },
      "jeans": {
        "keywords": ["fashion", "shopping"],
        "char": "👖",
        "emojiName": "jeans"
      },
      "necktie": {
        "keywords": ["shirt", "suitup", "formal", "fashion", "cloth", "business"],
        "char": "👔",
        "emojiName": "necktie"
      },
      "dress": {
        "keywords": ["clothes", "fashion", "shopping"],
        "char": "👗",
        "emojiName": "dress"
      },
      "bikini": {
        "keywords": ["swimming", "female", "woman", "girl", "fashion", "beach", "summer"],
        "char": "👙",
        "emojiName": "bikini"
      },
      "kimono": {
        "keywords": ["dress", "fashion", "women", "female", "japanese"],
        "char": "👘",
        "emojiName": "kimono"
      },
      "lipstick": {
        "keywords": ["female", "girl", "fashion", "woman"],
        "char": "💄",
        "emojiName": "lipstick"
      },
      "kiss": {
        "keywords": ["face", "lips", "love", "like", "affection", "valentines"],
        "char": "💋",
        "emojiName": "kiss"
      },
      "footprints": {
        "keywords": ["feet", "tracking", "walking", "beach"],
        "char": "👣",
        "emojiName": "footprints"
      },
      "flat_shoe": {
        "keywords": ["ballet", "slip-on", "slipper"],
        "char": "🥿",
        "emojiName": "flat_shoe"
      },
      "high_heel": {
        "keywords": ["fashion", "shoes", "female", "pumps", "stiletto"],
        "char": "👠",
        "emojiName": "high_heel"
      },
      "sandal": {
        "keywords": ["shoes", "fashion", "flip flops"],
        "char": "👡",
        "emojiName": "sandal"
      },
      "boot": {
        "keywords": ["shoes", "fashion"],
        "char": "👢",
        "emojiName": "boot"
      },
      "mans_shoe": {
        "keywords": ["fashion", "male"],
        "char": "👞",
        "emojiName": "mans_shoe"
      },
      "athletic_shoe": {
        "keywords": ["shoes", "sports", "sneakers"],
        "char": "👟",
        "emojiName": "athletic_shoe"
      },
      "hiking_boot": {
        "keywords": ["backpacking", "camping", "hiking"],
        "char": "🥾",
        "emojiName": "hiking_boot"
      },
      "socks": {
        "keywords": ["stockings", "clothes"],
        "char": "🧦",
        "emojiName": "socks"
      },
      "gloves": {
        "keywords": ["hands", "winter", "clothes"],
        "char": "🧤",
        "emojiName": "gloves"
      },
      "scarf": {
        "keywords": ["neck", "winter", "clothes"],
        "char": "🧣",
        "emojiName": "scarf"
      },
      "womans_hat": {
        "keywords": ["fashion", "accessories", "female", "lady", "spring"],
        "char": "👒",
        "emojiName": "womans_hat"
      },
      "tophat": {
        "keywords": ["magic", "gentleman", "classy", "circus"],
        "char": "🎩",
        "emojiName": "tophat"
      },
      "billed_hat": {
        "keywords": ["cap", "baseball"],
        "char": "🧢",
        "emojiName": "billed_hat"
      },
      "rescue_worker_helmet": {
        "keywords": ["construction", "build"],
        "char": "⛑",
        "emojiName": "rescue_worker_helmet"
      },
      "mortar_board": {
        "keywords": ["school", "college", "degree", "university", "graduation", "cap", "hat", "legal", "learn", "education"],
        "char": "🎓",
        "emojiName": "mortar_board"
      },
      "crown": {
        "keywords": ["king", "kod", "leader", "royalty", "lord"],
        "char": "👑",
        "emojiName": "crown"
      },
      "school_satchel": {
        "keywords": ["student", "education", "bag", "backpack"],
        "char": "🎒",
        "emojiName": "school_satchel"
      },
      "luggage": {
        "keywords": ["packing", "travel"],
        "char": "🧳",
        "emojiName": "luggage"
      },
      "pouch": {
        "keywords": ["bag", "accessories", "shopping"],
        "char": "👝",
        "emojiName": "pouch"
      },
      "purse": {
        "keywords": ["fashion", "accessories", "money", "sales", "shopping"],
        "char": "👛",
        "emojiName": "purse"
      },
      "handbag": {
        "keywords": ["fashion", "accessory", "accessories", "shopping"],
        "char": "👜",
        "emojiName": "handbag"
      },
      "briefcase": {
        "keywords": ["business", "documents", "work", "law", "legal", "job", "career"],
        "char": "💼",
        "emojiName": "briefcase"
      },
      "eyeglasses": {
        "keywords": ["fashion", "accessories", "eyesight", "nerdy", "dork", "geek"],
        "char": "👓",
        "emojiName": "eyeglasses"
      },
      "dark_sunglasses": {
        "keywords": ["face", "cool", "accessories"],
        "char": "🕶",
        "emojiName": "dark_sunglasses"
      },
      "goggles": {
        "keywords": ["eyes", "protection", "safety"],
        "char": "🥽",
        "emojiName": "goggles"
      },
      "ring": {
        "keywords": ["wedding", "propose", "marriage", "valentines", "diamond", "fashion", "jewelry", "gem", "engagement"],
        "char": "💍",
        "emojiName": "ring"
      },
      "closed_umbrella": {
        "keywords": ["weather", "rain", "drizzle"],
        "char": "🌂",
        "emojiName": "closed_umbrella"
      }
    }
  }
}, {
  "animals": {
    "id": "animals_and_nature",
    "name": "Animals & Nature",
    "symbol": _animals.default,
    "emojis": {
      "dog": {
        "keywords": ["animal", "friend", "nature", "woof", "puppy", "pet", "faithful"],
        "char": "🐶",
        "emojiName": "dog"
      },
      "cat": {
        "keywords": ["animal", "meow", "nature", "pet", "kitten"],
        "char": "🐱",
        "emojiName": "cat"
      },
      "mouse": {
        "keywords": ["animal", "nature", "cheese_wedge", "rodent"],
        "char": "🐭",
        "emojiName": "mouse"
      },
      "hamster": {
        "keywords": ["animal", "nature"],
        "char": "🐹",
        "emojiName": "hamster"
      },
      "rabbit": {
        "keywords": ["animal", "nature", "pet", "spring", "magic", "bunny"],
        "char": "🐰",
        "emojiName": "rabbit"
      },
      "fox_face": {
        "keywords": ["animal", "nature", "face"],
        "char": "🦊",
        "emojiName": "fox_face"
      },
      "bear": {
        "keywords": ["animal", "nature", "wild"],
        "char": "🐻",
        "emojiName": "bear"
      },
      "panda_face": {
        "keywords": ["animal", "nature", "panda"],
        "char": "🐼",
        "emojiName": "panda_face"
      },
      "koala": {
        "keywords": ["animal", "nature"],
        "char": "🐨",
        "emojiName": "koala"
      },
      "tiger": {
        "keywords": ["animal", "cat", "danger", "wild", "nature", "roar"],
        "char": "🐯",
        "emojiName": "tiger"
      },
      "lion": {
        "keywords": ["animal", "nature"],
        "char": "🦁",
        "emojiName": "lion"
      },
      "cow": {
        "keywords": ["beef", "ox", "animal", "nature", "moo", "milk"],
        "char": "🐮",
        "emojiName": "cow"
      },
      "pig": {
        "keywords": ["animal", "oink", "nature"],
        "char": "🐷",
        "emojiName": "pig"
      },
      "pig_nose": {
        "keywords": ["animal", "oink"],
        "char": "🐽",
        "emojiName": "pig_nose"
      },
      "frog": {
        "keywords": ["animal", "nature", "croak", "toad"],
        "char": "🐸",
        "emojiName": "frog"
      },
      "squid": {
        "keywords": ["animal", "nature", "ocean", "sea"],
        "char": "🦑",
        "emojiName": "squid"
      },
      "octopus": {
        "keywords": ["animal", "creature", "ocean", "sea", "nature", "beach"],
        "char": "🐙",
        "emojiName": "octopus"
      },
      "shrimp": {
        "keywords": ["animal", "ocean", "nature", "seafood"],
        "char": "🦐",
        "emojiName": "shrimp"
      },
      "monkey_face": {
        "keywords": ["animal", "nature", "circus"],
        "char": "🐵",
        "emojiName": "monkey_face"
      },
      "gorilla": {
        "keywords": ["animal", "nature", "circus"],
        "char": "🦍",
        "emojiName": "gorilla"
      },
      "see_no_evil": {
        "keywords": ["monkey", "animal", "nature", "haha"],
        "char": "🙈",
        "emojiName": "see_no_evil"
      },
      "hear_no_evil": {
        "keywords": ["animal", "monkey", "nature"],
        "char": "🙉",
        "emojiName": "hear_no_evil"
      },
      "speak_no_evil": {
        "keywords": ["monkey", "animal", "nature", "omg"],
        "char": "🙊",
        "emojiName": "speak_no_evil"
      },
      "monkey": {
        "keywords": ["animal", "nature", "banana", "circus"],
        "char": "🐒",
        "emojiName": "monkey"
      },
      "chicken": {
        "keywords": ["animal", "cluck", "nature", "bird"],
        "char": "🐔",
        "emojiName": "chicken"
      },
      "penguin": {
        "keywords": ["animal", "nature"],
        "char": "🐧",
        "emojiName": "penguin"
      },
      "bird": {
        "keywords": ["animal", "nature", "fly", "tweet", "spring"],
        "char": "🐦",
        "emojiName": "bird"
      },
      "baby_chick": {
        "keywords": ["animal", "chicken", "bird"],
        "char": "🐤",
        "emojiName": "baby_chick"
      },
      "hatching_chick": {
        "keywords": ["animal", "chicken", "egg", "born", "baby", "bird"],
        "char": "🐣",
        "emojiName": "hatching_chick"
      },
      "hatched_chick": {
        "keywords": ["animal", "chicken", "baby", "bird"],
        "char": "🐥",
        "emojiName": "hatched_chick"
      },
      "duck": {
        "keywords": ["animal", "nature", "bird", "mallard"],
        "char": "🦆",
        "emojiName": "duck"
      },
      "eagle": {
        "keywords": ["animal", "nature", "bird"],
        "char": "🦅",
        "emojiName": "eagle"
      },
      "owl": {
        "keywords": ["animal", "nature", "bird", "hoot"],
        "char": "🦉",
        "emojiName": "owl"
      },
      "bat": {
        "keywords": ["animal", "nature", "blind", "vampire"],
        "char": "🦇",
        "emojiName": "bat"
      },
      "wolf": {
        "keywords": ["animal", "nature", "wild"],
        "char": "🐺",
        "emojiName": "wolf"
      },
      "boar": {
        "keywords": ["animal", "nature"],
        "char": "🐗",
        "emojiName": "boar"
      },
      "horse": {
        "keywords": ["animal", "brown", "nature"],
        "char": "🐴",
        "emojiName": "horse"
      },
      "unicorn": {
        "keywords": ["animal", "nature", "mystical"],
        "char": "🦄",
        "emojiName": "unicorn"
      },
      "honeybee": {
        "keywords": ["animal", "insect", "nature", "bug", "spring", "honey"],
        "char": "🐝",
        "emojiName": "honeybee"
      },
      "bug": {
        "keywords": ["animal", "insect", "nature", "worm"],
        "char": "🐛",
        "emojiName": "bug"
      },
      "butterfly": {
        "keywords": ["animal", "insect", "nature", "caterpillar"],
        "char": "🦋",
        "emojiName": "butterfly"
      },
      "snail": {
        "keywords": ["slow", "animal", "shell"],
        "char": "🐌",
        "emojiName": "snail"
      },
      "beetle": {
        "keywords": ["animal", "insect", "nature", "ladybug"],
        "char": "🐞",
        "emojiName": "beetle"
      },
      "ant": {
        "keywords": ["animal", "insect", "nature", "bug"],
        "char": "🐜",
        "emojiName": "ant"
      },
      "grasshopper": {
        "keywords": ["animal", "cricket", "chirp"],
        "char": "🦗",
        "emojiName": "grasshopper"
      },
      "spider": {
        "keywords": ["animal", "arachnid"],
        "char": "🕷",
        "emojiName": "spider"
      },
      "scorpion": {
        "keywords": ["animal", "arachnid"],
        "char": "🦂",
        "emojiName": "scorpion"
      },
      "crab": {
        "keywords": ["animal", "crustacean"],
        "char": "🦀",
        "emojiName": "crab"
      },
      "snake": {
        "keywords": ["animal", "evil", "nature", "hiss", "python"],
        "char": "🐍",
        "emojiName": "snake"
      },
      "lizard": {
        "keywords": ["animal", "nature", "reptile"],
        "char": "🦎",
        "emojiName": "lizard"
      },
      "t-rex": {
        "keywords": ["animal", "nature", "dinosaur", "tyrannosaurus", "extinct"],
        "char": "🦖",
        "emojiName": "t-rex"
      },
      "sauropod": {
        "keywords": ["animal", "nature", "dinosaur", "brachiosaurus", "brontosaurus", "diplodocus", "extinct"],
        "char": "🦕",
        "emojiName": "sauropod"
      },
      "turtle": {
        "keywords": ["animal", "slow", "nature", "tortoise"],
        "char": "🐢",
        "emojiName": "turtle"
      },
      "tropical_fish": {
        "keywords": ["animal", "swim", "ocean", "beach", "nemo"],
        "char": "🐠",
        "emojiName": "tropical_fish"
      },
      "fish": {
        "keywords": ["animal", "food", "nature"],
        "char": "🐟",
        "emojiName": "fish"
      },
      "blowfish": {
        "keywords": ["animal", "nature", "food", "sea", "ocean"],
        "char": "🐡",
        "emojiName": "blowfish"
      },
      "dolphin": {
        "keywords": ["animal", "nature", "fish", "sea", "ocean", "flipper", "fins", "beach"],
        "char": "🐬",
        "emojiName": "dolphin"
      },
      "shark": {
        "keywords": ["animal", "nature", "fish", "sea", "ocean", "jaws", "fins", "beach"],
        "char": "🦈",
        "emojiName": "shark"
      },
      "whale": {
        "keywords": ["animal", "nature", "sea", "ocean"],
        "char": "🐳",
        "emojiName": "whale"
      },
      "whale2": {
        "keywords": ["animal", "nature", "sea", "ocean"],
        "char": "🐋",
        "emojiName": "whale2"
      },
      "crocodile": {
        "keywords": ["animal", "nature", "reptile", "lizard", "alligator"],
        "char": "🐊",
        "emojiName": "crocodile"
      },
      "leopard": {
        "keywords": ["animal", "nature"],
        "char": "🐆",
        "emojiName": "leopard"
      },
      "zebra": {
        "keywords": ["animal", "nature", "stripes", "safari"],
        "char": "🦓",
        "emojiName": "zebra"
      },
      "tiger2": {
        "keywords": ["animal", "nature", "roar"],
        "char": "🐅",
        "emojiName": "tiger2"
      },
      "water_buffalo": {
        "keywords": ["animal", "nature", "ox", "cow"],
        "char": "🐃",
        "emojiName": "water_buffalo"
      },
      "ox": {
        "keywords": ["animal", "cow", "beef"],
        "char": "🐂",
        "emojiName": "ox"
      },
      "cow2": {
        "keywords": ["beef", "ox", "animal", "nature", "moo", "milk"],
        "char": "🐄",
        "emojiName": "cow2"
      },
      "deer": {
        "keywords": ["animal", "nature", "horns", "venison"],
        "char": "🦌",
        "emojiName": "deer"
      },
      "dromedary_camel": {
        "keywords": ["animal", "hot", "desert", "hump"],
        "char": "🐪",
        "emojiName": "dromedary_camel"
      },
      "camel": {
        "keywords": ["animal", "nature", "hot", "desert", "hump"],
        "char": "🐫",
        "emojiName": "camel"
      },
      "giraffe": {
        "keywords": ["animal", "nature", "spots", "safari"],
        "char": "🦒",
        "emojiName": "giraffe"
      },
      "elephant": {
        "keywords": ["animal", "nature", "nose", "th", "circus"],
        "char": "🐘",
        "emojiName": "elephant"
      },
      "rhinoceros": {
        "keywords": ["animal", "nature", "horn"],
        "char": "🦏",
        "emojiName": "rhinoceros"
      },
      "goat": {
        "keywords": ["animal", "nature"],
        "char": "🐐",
        "emojiName": "goat"
      },
      "ram": {
        "keywords": ["animal", "sheep", "nature"],
        "char": "🐏",
        "emojiName": "ram"
      },
      "sheep": {
        "keywords": ["animal", "nature", "wool", "shipit"],
        "char": "🐑",
        "emojiName": "sheep"
      },
      "racehorse": {
        "keywords": ["animal", "gamble", "luck"],
        "char": "🐎",
        "emojiName": "racehorse"
      },
      "pig2": {
        "keywords": ["animal", "nature"],
        "char": "🐖",
        "emojiName": "pig2"
      },
      "rat": {
        "keywords": ["animal", "mouse", "rodent"],
        "char": "🐀",
        "emojiName": "rat"
      },
      "mouse2": {
        "keywords": ["animal", "nature", "rodent"],
        "char": "🐁",
        "emojiName": "mouse2"
      },
      "rooster": {
        "keywords": ["animal", "nature", "chicken"],
        "char": "🐓",
        "emojiName": "rooster"
      },
      "turkey": {
        "keywords": ["animal", "bird"],
        "char": "🦃",
        "emojiName": "turkey"
      },
      "dove": {
        "keywords": ["animal", "bird"],
        "char": "🕊",
        "emojiName": "dove"
      },
      "dog2": {
        "keywords": ["animal", "nature", "friend", "doge", "pet", "faithful"],
        "char": "🐕",
        "emojiName": "dog2"
      },
      "poodle": {
        "keywords": ["dog", "animal", "101", "nature", "pet"],
        "char": "🐩",
        "emojiName": "poodle"
      },
      "cat2": {
        "keywords": ["animal", "meow", "pet", "cats"],
        "char": "🐈",
        "emojiName": "cat2"
      },
      "rabbit2": {
        "keywords": ["animal", "nature", "pet", "magic", "spring"],
        "char": "🐇",
        "emojiName": "rabbit2"
      },
      "chipmunk": {
        "keywords": ["animal", "nature", "rodent", "squirrel"],
        "char": "🐿",
        "emojiName": "chipmunk"
      },
      "hedgehog": {
        "keywords": ["animal", "nature", "spiny"],
        "char": "🦔",
        "emojiName": "hedgehog"
      },
      "raccoon": {
        "keywords": ["animal", "nature"],
        "char": "🦝",
        "emojiName": "raccoon"
      },
      "llama": {
        "keywords": ["animal", "nature", "alpaca"],
        "char": "🦙",
        "emojiName": "llama"
      },
      "hippopotamus": {
        "keywords": ["animal", "nature"],
        "char": "🦛",
        "emojiName": "hippopotamus"
      },
      "kangaroo": {
        "keywords": ["animal", "nature", "australia", "joey", "hop", "marsupial"],
        "char": "🦘",
        "emojiName": "kangaroo"
      },
      "badger": {
        "keywords": ["animal", "nature", "honey"],
        "char": "🦡",
        "emojiName": "badger"
      },
      "swan": {
        "keywords": ["animal", "nature", "bird"],
        "char": "🦢",
        "emojiName": "swan"
      },
      "peacock": {
        "keywords": ["animal", "nature", "peahen", "bird"],
        "char": "🦚",
        "emojiName": "peacock"
      },
      "parrot": {
        "keywords": ["animal", "nature", "bird", "pirate", "talk"],
        "char": "🦜",
        "emojiName": "parrot"
      },
      "lobster": {
        "keywords": ["animal", "nature", "bisque", "claws", "seafood"],
        "char": "🦞",
        "emojiName": "lobster"
      },
      "mosquito": {
        "keywords": ["animal", "nature", "insect", "malaria"],
        "char": "🦟",
        "emojiName": "mosquito"
      },
      "paw_prints": {
        "keywords": ["animal", "tracking", "footprints", "dog", "cat", "pet", "feet"],
        "char": "🐾",
        "emojiName": "paw_prints"
      },
      "dragon": {
        "keywords": ["animal", "myth", "nature", "chinese", "green"],
        "char": "🐉",
        "emojiName": "dragon"
      },
      "dragon_face": {
        "keywords": ["animal", "myth", "nature", "chinese", "green"],
        "char": "🐲",
        "emojiName": "dragon_face"
      },
      "cactus": {
        "keywords": ["vegetable", "plant", "nature"],
        "char": "🌵",
        "emojiName": "cactus"
      },
      "christmas_tree": {
        "keywords": ["festival", "vacation", "december", "xmas", "celebration"],
        "char": "🎄",
        "emojiName": "christmas_tree"
      },
      "evergreen_tree": {
        "keywords": ["plant", "nature"],
        "char": "🌲",
        "emojiName": "evergreen_tree"
      },
      "deciduous_tree": {
        "keywords": ["plant", "nature"],
        "char": "🌳",
        "emojiName": "deciduous_tree"
      },
      "palm_tree": {
        "keywords": ["plant", "vegetable", "nature", "summer", "beach", "mojito", "tropical"],
        "char": "🌴",
        "emojiName": "palm_tree"
      },
      "seedling": {
        "keywords": ["plant", "nature", "grass", "lawn", "spring"],
        "char": "🌱",
        "emojiName": "seedling"
      },
      "herb": {
        "keywords": ["vegetable", "plant", "medicine", "weed", "grass", "lawn"],
        "char": "🌿",
        "emojiName": "herb"
      },
      "shamrock": {
        "keywords": ["vegetable", "plant", "nature", "irish", "clover"],
        "char": "☘",
        "emojiName": "shamrock"
      },
      "four_leaf_clover": {
        "keywords": ["vegetable", "plant", "nature", "lucky", "irish"],
        "char": "🍀",
        "emojiName": "four_leaf_clover"
      },
      "bamboo": {
        "keywords": ["plant", "nature", "vegetable", "panda", "pine_decoration"],
        "char": "🎍",
        "emojiName": "bamboo"
      },
      "tanabata_tree": {
        "keywords": ["plant", "nature", "branch", "summer"],
        "char": "🎋",
        "emojiName": "tanabata_tree"
      },
      "leaves": {
        "keywords": ["nature", "plant", "tree", "vegetable", "grass", "lawn", "spring"],
        "char": "🍃",
        "emojiName": "leaves"
      },
      "fallen_leaf": {
        "keywords": ["nature", "plant", "vegetable", "leaves"],
        "char": "🍂",
        "emojiName": "fallen_leaf"
      },
      "maple_leaf": {
        "keywords": ["nature", "plant", "vegetable", "ca", "fall"],
        "char": "🍁",
        "emojiName": "maple_leaf"
      },
      "ear_of_rice": {
        "keywords": ["nature", "plant"],
        "char": "🌾",
        "emojiName": "ear_of_rice"
      },
      "hibiscus": {
        "keywords": ["plant", "vegetable", "flowers", "beach"],
        "char": "🌺",
        "emojiName": "hibiscus"
      },
      "sunflower": {
        "keywords": ["nature", "plant", "fall"],
        "char": "🌻",
        "emojiName": "sunflower"
      },
      "rose": {
        "keywords": ["flowers", "valentines", "love", "spring"],
        "char": "🌹",
        "emojiName": "rose"
      },
      "wilted_flower": {
        "keywords": ["plant", "nature", "flower"],
        "char": "🥀",
        "emojiName": "wilted_flower"
      },
      "tulip": {
        "keywords": ["flowers", "plant", "nature", "summer", "spring"],
        "char": "🌷",
        "emojiName": "tulip"
      },
      "blossom": {
        "keywords": ["nature", "flowers", "yellow"],
        "char": "🌼",
        "emojiName": "blossom"
      },
      "cherry_blossom": {
        "keywords": ["nature", "plant", "spring", "flower"],
        "char": "🌸",
        "emojiName": "cherry_blossom"
      },
      "bouquet": {
        "keywords": ["flowers", "nature", "spring"],
        "char": "💐",
        "emojiName": "bouquet"
      },
      "mushroom": {
        "keywords": ["plant", "vegetable"],
        "char": "🍄",
        "emojiName": "mushroom"
      },
      "chestnut": {
        "keywords": ["food", "squirrel"],
        "char": "🌰",
        "emojiName": "chestnut"
      },
      "jack_o_lantern": {
        "keywords": ["halloween", "light", "pumpkin", "creepy", "fall"],
        "char": "🎃",
        "emojiName": "jack_o_lantern"
      },
      "shell": {
        "keywords": ["nature", "sea", "beach"],
        "char": "🐚",
        "emojiName": "shell"
      },
      "spider_web": {
        "keywords": ["animal", "insect", "arachnid", "silk"],
        "char": "🕸",
        "emojiName": "spider_web"
      },
      "earth_americas": {
        "keywords": ["globe", "world", "USA", "international"],
        "char": "🌎",
        "emojiName": "earth_americas"
      },
      "earth_africa": {
        "keywords": ["globe", "world", "international"],
        "char": "🌍",
        "emojiName": "earth_africa"
      },
      "earth_asia": {
        "keywords": ["globe", "world", "east", "international"],
        "char": "🌏",
        "emojiName": "earth_asia"
      },
      "full_moon": {
        "keywords": ["nature", "yellow", "twilight", "planet", "space", "night", "evening", "sleep"],
        "char": "🌕",
        "emojiName": "full_moon"
      },
      "waning_gibbous_moon": {
        "keywords": ["nature", "twilight", "planet", "space", "night", "evening", "sleep", "waxing_gibbous_moon"],
        "char": "🌖",
        "emojiName": "waning_gibbous_moon"
      },
      "last_quarter_moon": {
        "keywords": ["nature", "twilight", "planet", "space", "night", "evening", "sleep"],
        "char": "🌗",
        "emojiName": "last_quarter_moon"
      },
      "waning_crescent_moon": {
        "keywords": ["nature", "twilight", "planet", "space", "night", "evening", "sleep"],
        "char": "🌘",
        "emojiName": "waning_crescent_moon"
      },
      "new_moon": {
        "keywords": ["nature", "twilight", "planet", "space", "night", "evening", "sleep"],
        "char": "🌑",
        "emojiName": "new_moon"
      },
      "waxing_crescent_moon": {
        "keywords": ["nature", "twilight", "planet", "space", "night", "evening", "sleep"],
        "char": "🌒",
        "emojiName": "waxing_crescent_moon"
      },
      "first_quarter_moon": {
        "keywords": ["nature", "twilight", "planet", "space", "night", "evening", "sleep"],
        "char": "🌓",
        "emojiName": "first_quarter_moon"
      },
      "waxing_gibbous_moon": {
        "keywords": ["nature", "night", "sky", "gray", "twilight", "planet", "space", "evening", "sleep"],
        "char": "🌔",
        "emojiName": "waxing_gibbous_moon"
      },
      "new_moon_with_face": {
        "keywords": ["nature", "twilight", "planet", "space", "night", "evening", "sleep"],
        "char": "🌚",
        "emojiName": "new_moon_with_face"
      },
      "full_moon_with_face": {
        "keywords": ["nature", "twilight", "planet", "space", "night", "evening", "sleep"],
        "char": "🌝",
        "emojiName": "full_moon_with_face"
      },
      "first_quarter_moon_with_face": {
        "keywords": ["nature", "twilight", "planet", "space", "night", "evening", "sleep"],
        "char": "🌛",
        "emojiName": "first_quarter_moon_with_face"
      },
      "last_quarter_moon_with_face": {
        "keywords": ["nature", "twilight", "planet", "space", "night", "evening", "sleep"],
        "char": "🌜",
        "emojiName": "last_quarter_moon_with_face"
      },
      "sun_with_face": {
        "keywords": ["nature", "morning", "sky"],
        "char": "🌞",
        "emojiName": "sun_with_face"
      },
      "crescent_moon": {
        "keywords": ["night", "sleep", "sky", "evening", "magic"],
        "char": "🌙",
        "emojiName": "crescent_moon"
      },
      "star": {
        "keywords": ["night", "yellow"],
        "char": "⭐",
        "emojiName": "star"
      },
      "star2": {
        "keywords": ["night", "sparkle", "awesome", "good", "magic"],
        "char": "🌟",
        "emojiName": "star2"
      },
      "dizzy": {
        "keywords": ["star", "sparkle", "shoot", "magic"],
        "char": "💫",
        "emojiName": "dizzy"
      },
      "sparkles": {
        "keywords": ["stars", "shine", "shiny", "cool", "awesome", "good", "magic"],
        "char": "✨",
        "emojiName": "sparkles"
      },
      "comet": {
        "keywords": ["space"],
        "char": "☄",
        "emojiName": "comet"
      },
      "sunny": {
        "keywords": ["weather", "nature", "brightness", "summer", "beach", "spring"],
        "char": "☀️",
        "emojiName": "sunny"
      },
      "sun_behind_small_cloud": {
        "keywords": ["weather"],
        "char": "🌤",
        "emojiName": "sun_behind_small_cloud"
      },
      "partly_sunny": {
        "keywords": ["weather", "nature", "cloudy", "morning", "fall", "spring"],
        "char": "⛅",
        "emojiName": "partly_sunny"
      },
      "sun_behind_large_cloud": {
        "keywords": ["weather"],
        "char": "🌥",
        "emojiName": "sun_behind_large_cloud"
      },
      "sun_behind_rain_cloud": {
        "keywords": ["weather"],
        "char": "🌦",
        "emojiName": "sun_behind_rain_cloud"
      },
      "cloud": {
        "keywords": ["weather", "sky"],
        "char": "☁️",
        "emojiName": "cloud"
      },
      "cloud_with_rain": {
        "keywords": ["weather"],
        "char": "🌧",
        "emojiName": "cloud_with_rain"
      },
      "cloud_with_lightning_and_rain": {
        "keywords": ["weather", "lightning"],
        "char": "⛈",
        "emojiName": "cloud_with_lightning_and_rain"
      },
      "cloud_with_lightning": {
        "keywords": ["weather", "thunder"],
        "char": "🌩",
        "emojiName": "cloud_with_lightning"
      },
      "zap": {
        "keywords": ["thunder", "weather", "lightning bolt", "fast"],
        "char": "⚡",
        "emojiName": "zap"
      },
      "fire": {
        "keywords": ["hot", "cook", "flame"],
        "char": "🔥",
        "emojiName": "fire"
      },
      "boom": {
        "keywords": ["bomb", "explode", "explosion", "collision", "blown"],
        "char": "💥",
        "emojiName": "boom"
      },
      "snowflake": {
        "keywords": ["winter", "season", "cold", "weather", "christmas", "xmas"],
        "char": "❄️",
        "emojiName": "snowflake"
      },
      "cloud_with_snow": {
        "keywords": ["weather"],
        "char": "🌨",
        "emojiName": "cloud_with_snow"
      },
      "snowman": {
        "keywords": ["winter", "season", "cold", "weather", "christmas", "xmas", "frozen", "without_snow"],
        "char": "⛄",
        "emojiName": "snowman"
      },
      "snowman_with_snow": {
        "keywords": ["winter", "season", "cold", "weather", "christmas", "xmas", "frozen"],
        "char": "☃",
        "emojiName": "snowman_with_snow"
      },
      "wind_face": {
        "keywords": ["gust", "air"],
        "char": "🌬",
        "emojiName": "wind_face"
      },
      "dash": {
        "keywords": ["wind", "air", "fast", "shoo", "fart", "smoke", "puff"],
        "char": "💨",
        "emojiName": "dash"
      },
      "tornado": {
        "keywords": ["weather", "cyclone", "twister"],
        "char": "🌪",
        "emojiName": "tornado"
      },
      "fog": {
        "keywords": ["weather"],
        "char": "🌫",
        "emojiName": "fog"
      },
      "open_umbrella": {
        "keywords": ["weather", "spring"],
        "char": "☂",
        "emojiName": "open_umbrella"
      },
      "umbrella": {
        "keywords": ["rainy", "weather", "spring"],
        "char": "☔",
        "emojiName": "umbrella"
      },
      "droplet": {
        "keywords": ["water", "drip", "faucet", "spring"],
        "char": "💧",
        "emojiName": "droplet"
      },
      "sweat_drops": {
        "keywords": ["water", "drip", "oops"],
        "char": "💦",
        "emojiName": "sweat_drops"
      },
      "ocean": {
        "keywords": ["sea", "water", "wave", "nature", "tsunami", "disaster"],
        "char": "🌊",
        "emojiName": "ocean"
      }
    }
  }
}, {
  "food": {
    "id": "food_and_drink",
    "name": "Food & Drink",
    "symbol": _food.default,
    "emojis": {
      "green_apple": {
        "keywords": ["fruit", "nature"],
        "char": "🍏",
        "emojiName": "green_apple"
      },
      "apple": {
        "keywords": ["fruit", "mac", "school"],
        "char": "🍎",
        "emojiName": "apple"
      },
      "pear": {
        "keywords": ["fruit", "nature", "food"],
        "char": "🍐",
        "emojiName": "pear"
      },
      "tangerine": {
        "keywords": ["food", "fruit", "nature", "orange"],
        "char": "🍊",
        "emojiName": "tangerine"
      },
      "lemon": {
        "keywords": ["fruit", "nature"],
        "char": "🍋",
        "emojiName": "lemon"
      },
      "banana": {
        "keywords": ["fruit", "food", "monkey"],
        "char": "🍌",
        "emojiName": "banana"
      },
      "watermelon": {
        "keywords": ["fruit", "food", "picnic", "summer"],
        "char": "🍉",
        "emojiName": "watermelon"
      },
      "grapes": {
        "keywords": ["fruit", "food", "wine"],
        "char": "🍇",
        "emojiName": "grapes"
      },
      "strawberry": {
        "keywords": ["fruit", "food", "nature"],
        "char": "🍓",
        "emojiName": "strawberry"
      },
      "melon": {
        "keywords": ["fruit", "nature", "food"],
        "char": "🍈",
        "emojiName": "melon"
      },
      "cherries": {
        "keywords": ["food", "fruit"],
        "char": "🍒",
        "emojiName": "cherries"
      },
      "peach": {
        "keywords": ["fruit", "nature", "food"],
        "char": "🍑",
        "emojiName": "peach"
      },
      "pineapple": {
        "keywords": ["fruit", "nature", "food"],
        "char": "🍍",
        "emojiName": "pineapple"
      },
      "coconut": {
        "keywords": ["fruit", "nature", "food", "palm"],
        "char": "🥥",
        "emojiName": "coconut"
      },
      "kiwi_fruit": {
        "keywords": ["fruit", "food"],
        "char": "🥝",
        "emojiName": "kiwi_fruit"
      },
      "mango": {
        "keywords": ["fruit", "food", "tropical"],
        "char": "🥭",
        "emojiName": "mango"
      },
      "avocado": {
        "keywords": ["fruit", "food"],
        "char": "🥑",
        "emojiName": "avocado"
      },
      "broccoli": {
        "keywords": ["fruit", "food", "vegetable"],
        "char": "🥦",
        "emojiName": "broccoli"
      },
      "tomato": {
        "keywords": ["fruit", "vegetable", "nature", "food"],
        "char": "🍅",
        "emojiName": "tomato"
      },
      "eggplant": {
        "keywords": ["vegetable", "nature", "food", "aubergine"],
        "char": "🍆",
        "emojiName": "eggplant"
      },
      "cucumber": {
        "keywords": ["fruit", "food", "pickle"],
        "char": "🥒",
        "emojiName": "cucumber"
      },
      "carrot": {
        "keywords": ["vegetable", "food", "orange"],
        "char": "🥕",
        "emojiName": "carrot"
      },
      "hot_pepper": {
        "keywords": ["food", "spicy", "chilli", "chili"],
        "char": "🌶",
        "emojiName": "hot_pepper"
      },
      "potato": {
        "keywords": ["food", "tuber", "vegatable", "starch"],
        "char": "🥔",
        "emojiName": "potato"
      },
      "corn": {
        "keywords": ["food", "vegetable", "plant"],
        "char": "🌽",
        "emojiName": "corn"
      },
      "leafy_greens": {
        "keywords": ["food", "vegetable", "plant", "bok choy", "cabbage", "kale", "lettuce"],
        "char": "🥬",
        "emojiName": "leafy_greens"
      },
      "sweet_potato": {
        "keywords": ["food", "nature"],
        "char": "🍠",
        "emojiName": "sweet_potato"
      },
      "peanuts": {
        "keywords": ["food", "nut"],
        "char": "🥜",
        "emojiName": "peanuts"
      },
      "honey_pot": {
        "keywords": ["bees", "sweet", "kitchen"],
        "char": "🍯",
        "emojiName": "honey_pot"
      },
      "croissant": {
        "keywords": ["food", "bread", "french"],
        "char": "🥐",
        "emojiName": "croissant"
      },
      "bread": {
        "keywords": ["food", "wheat", "breakfast", "toast"],
        "char": "🍞",
        "emojiName": "bread"
      },
      "baguette_bread": {
        "keywords": ["food", "bread", "french"],
        "char": "🥖",
        "emojiName": "baguette_bread"
      },
      "bagel": {
        "keywords": ["food", "bread", "bakery", "schmear"],
        "char": "🥯",
        "emojiName": "bagel"
      },
      "pretzel": {
        "keywords": ["food", "bread", "twisted"],
        "char": "🥨",
        "emojiName": "pretzel"
      },
      "cheese": {
        "keywords": ["food", "chadder"],
        "char": "🧀",
        "emojiName": "cheese"
      },
      "egg": {
        "keywords": ["food", "chicken", "breakfast"],
        "char": "🥚",
        "emojiName": "egg"
      },
      "bacon": {
        "keywords": ["food", "breakfast", "pork", "pig", "meat"],
        "char": "🥓",
        "emojiName": "bacon"
      },
      "steak": {
        "keywords": ["food", "cow", "meat", "cut", "chop", "lambchop", "porkchop"],
        "char": "🥩",
        "emojiName": "steak"
      },
      "pancakes": {
        "keywords": ["food", "breakfast", "flapjacks", "hotcakes"],
        "char": "🥞",
        "emojiName": "pancakes"
      },
      "poultry_leg": {
        "keywords": ["food", "meat", "drumstick", "bird", "chicken", "turkey"],
        "char": "🍗",
        "emojiName": "poultry_leg"
      },
      "meat_on_bone": {
        "keywords": ["good", "food", "drumstick"],
        "char": "🍖",
        "emojiName": "meat_on_bone"
      },
      "bone": {
        "keywords": ["skeleton"],
        "char": "🦴",
        "emojiName": "bone"
      },
      "fried_shrimp": {
        "keywords": ["food", "animal", "appetizer", "summer"],
        "char": "🍤",
        "emojiName": "fried_shrimp"
      },
      "fried_egg": {
        "keywords": ["food", "breakfast", "kitchen", "egg"],
        "char": "🍳",
        "emojiName": "fried_egg"
      },
      "hamburger": {
        "keywords": ["meat", "fast food", "beef", "cheeseburger", "mcdonalds", "burger king"],
        "char": "🍔",
        "emojiName": "hamburger"
      },
      "fries": {
        "keywords": ["chips", "snack", "fast food"],
        "char": "🍟",
        "emojiName": "fries"
      },
      "stuffed_flatbread": {
        "keywords": ["food", "flatbread", "stuffed", "gyro"],
        "char": "🥙",
        "emojiName": "stuffed_flatbread"
      },
      "hotdog": {
        "keywords": ["food", "frankfurter"],
        "char": "🌭",
        "emojiName": "hotdog"
      },
      "pizza": {
        "keywords": ["food", "party"],
        "char": "🍕",
        "emojiName": "pizza"
      },
      "sandwich": {
        "keywords": ["food", "lunch", "bread"],
        "char": "🥪",
        "emojiName": "sandwich"
      },
      "canned_food": {
        "keywords": ["food", "soup"],
        "char": "🥫",
        "emojiName": "canned_food"
      },
      "spaghetti": {
        "keywords": ["food", "italian", "noodle"],
        "char": "🍝",
        "emojiName": "spaghetti"
      },
      "taco": {
        "keywords": ["food", "mexican"],
        "char": "🌮",
        "emojiName": "taco"
      },
      "burrito": {
        "keywords": ["food", "mexican"],
        "char": "🌯",
        "emojiName": "burrito"
      },
      "green_salad": {
        "keywords": ["food", "healthy", "lettuce"],
        "char": "🥗",
        "emojiName": "green_salad"
      },
      "shallow_pan_of_food": {
        "keywords": ["food", "cooking", "casserole", "paella"],
        "char": "🥘",
        "emojiName": "shallow_pan_of_food"
      },
      "ramen": {
        "keywords": ["food", "japanese", "noodle", "chopsticks"],
        "char": "🍜",
        "emojiName": "ramen"
      },
      "stew": {
        "keywords": ["food", "meat", "soup"],
        "char": "🍲",
        "emojiName": "stew"
      },
      "fish_cake": {
        "keywords": ["food", "japan", "sea", "beach", "narutomaki", "pink", "swirl", "kamaboko", "surimi", "ramen"],
        "char": "🍥",
        "emojiName": "fish_cake"
      },
      "fortune_cookie": {
        "keywords": ["food", "prophecy"],
        "char": "🥠",
        "emojiName": "fortune_cookie"
      },
      "sushi": {
        "keywords": ["food", "fish", "japanese", "rice"],
        "char": "🍣",
        "emojiName": "sushi"
      },
      "bento": {
        "keywords": ["food", "japanese", "box"],
        "char": "🍱",
        "emojiName": "bento"
      },
      "curry": {
        "keywords": ["food", "spicy", "hot", "indian"],
        "char": "🍛",
        "emojiName": "curry"
      },
      "rice_ball": {
        "keywords": ["food", "japanese"],
        "char": "🍙",
        "emojiName": "rice_ball"
      },
      "rice": {
        "keywords": ["food", "china", "asian"],
        "char": "🍚",
        "emojiName": "rice"
      },
      "rice_cracker": {
        "keywords": ["food", "japanese"],
        "char": "🍘",
        "emojiName": "rice_cracker"
      },
      "oden": {
        "keywords": ["food", "japanese"],
        "char": "🍢",
        "emojiName": "oden"
      },
      "dango": {
        "keywords": ["food", "dessert", "sweet", "japanese", "barbecue", "meat"],
        "char": "🍡",
        "emojiName": "dango"
      },
      "shaved_ice": {
        "keywords": ["hot", "dessert", "summer"],
        "char": "🍧",
        "emojiName": "shaved_ice"
      },
      "ice_cream": {
        "keywords": ["food", "hot", "dessert"],
        "char": "🍨",
        "emojiName": "ice_cream"
      },
      "icecream": {
        "keywords": ["food", "hot", "dessert", "summer"],
        "char": "🍦",
        "emojiName": "icecream"
      },
      "pie": {
        "keywords": ["food", "dessert", "pastry"],
        "char": "🥧",
        "emojiName": "pie"
      },
      "cake": {
        "keywords": ["food", "dessert"],
        "char": "🍰",
        "emojiName": "cake"
      },
      "cupcake": {
        "keywords": ["food", "dessert", "bakery", "sweet"],
        "char": "🧁",
        "emojiName": "cupcake"
      },
      "moon_cake": {
        "keywords": ["food", "autumn"],
        "char": "🥮",
        "emojiName": "moon_cake"
      },
      "birthday": {
        "keywords": ["food", "dessert", "cake"],
        "char": "🎂",
        "emojiName": "birthday"
      },
      "custard": {
        "keywords": ["dessert", "food"],
        "char": "🍮",
        "emojiName": "custard"
      },
      "candy": {
        "keywords": ["snack", "dessert", "sweet", "lolly"],
        "char": "🍬",
        "emojiName": "candy"
      },
      "lollipop": {
        "keywords": ["food", "snack", "candy", "sweet"],
        "char": "🍭",
        "emojiName": "lollipop"
      },
      "chocolate_bar": {
        "keywords": ["food", "snack", "dessert", "sweet"],
        "char": "🍫",
        "emojiName": "chocolate_bar"
      },
      "popcorn": {
        "keywords": ["food", "movie theater", "films", "snack"],
        "char": "🍿",
        "emojiName": "popcorn"
      },
      "dumpling": {
        "keywords": ["food", "empanada", "pierogi", "potsticker"],
        "char": "🥟",
        "emojiName": "dumpling"
      },
      "doughnut": {
        "keywords": ["food", "dessert", "snack", "sweet", "donut"],
        "char": "🍩",
        "emojiName": "doughnut"
      },
      "cookie": {
        "keywords": ["food", "snack", "oreo", "chocolate", "sweet", "dessert"],
        "char": "🍪",
        "emojiName": "cookie"
      },
      "milk_glass": {
        "keywords": ["beverage", "drink", "cow"],
        "char": "🥛",
        "emojiName": "milk_glass"
      },
      "beer": {
        "keywords": ["relax", "beverage", "drink", "drunk", "party", "pub", "summer", "alcohol", "booze"],
        "char": "🍺",
        "emojiName": "beer"
      },
      "beers": {
        "keywords": ["relax", "beverage", "drink", "drunk", "party", "pub", "summer", "alcohol", "booze"],
        "char": "🍻",
        "emojiName": "beers"
      },
      "clinking_glasses": {
        "keywords": ["beverage", "drink", "party", "alcohol", "celebrate", "cheers", "wine", "champagne", "toast"],
        "char": "🥂",
        "emojiName": "clinking_glasses"
      },
      "wine_glass": {
        "keywords": ["drink", "beverage", "drunk", "alcohol", "booze"],
        "char": "🍷",
        "emojiName": "wine_glass"
      },
      "tumbler_glass": {
        "keywords": ["drink", "beverage", "drunk", "alcohol", "liquor", "booze", "bourbon", "scotch", "whisky", "glass", "shot"],
        "char": "🥃",
        "emojiName": "tumbler_glass"
      },
      "cocktail": {
        "keywords": ["drink", "drunk", "alcohol", "beverage", "booze", "mojito"],
        "char": "🍸",
        "emojiName": "cocktail"
      },
      "tropical_drink": {
        "keywords": ["beverage", "cocktail", "summer", "beach", "alcohol", "booze", "mojito"],
        "char": "🍹",
        "emojiName": "tropical_drink"
      },
      "champagne": {
        "keywords": ["drink", "wine", "bottle", "celebration"],
        "char": "🍾",
        "emojiName": "champagne"
      },
      "sake": {
        "keywords": ["wine", "drink", "drunk", "beverage", "japanese", "alcohol", "booze"],
        "char": "🍶",
        "emojiName": "sake"
      },
      "tea": {
        "keywords": ["drink", "bowl", "breakfast", "green", "british"],
        "char": "🍵",
        "emojiName": "tea"
      },
      "cup_with_straw": {
        "keywords": ["drink", "soda"],
        "char": "🥤",
        "emojiName": "cup_with_straw"
      },
      "coffee": {
        "keywords": ["beverage", "caffeine", "latte", "espresso"],
        "char": "☕",
        "emojiName": "coffee"
      },
      "baby_bottle": {
        "keywords": ["food", "container", "milk"],
        "char": "🍼",
        "emojiName": "baby_bottle"
      },
      "salt": {
        "keywords": ["condiment", "shaker"],
        "char": "🧂",
        "emojiName": "salt"
      },
      "spoon": {
        "keywords": ["cutlery", "kitchen", "tableware"],
        "char": "🥄",
        "emojiName": "spoon"
      },
      "fork_and_knife": {
        "keywords": ["cutlery", "kitchen"],
        "char": "🍴",
        "emojiName": "fork_and_knife"
      },
      "plate_with_cutlery": {
        "keywords": ["food", "eat", "meal", "lunch", "dinner", "restaurant"],
        "char": "🍽",
        "emojiName": "plate_with_cutlery"
      },
      "bowl_with_spoon": {
        "keywords": ["food", "breakfast", "cereal", "oatmeal", "porridge"],
        "char": "🥣",
        "emojiName": "bowl_with_spoon"
      },
      "takeout_box": {
        "keywords": ["food", "leftovers"],
        "char": "🥡",
        "emojiName": "takeout_box"
      },
      "chopsticks": {
        "keywords": ["food"],
        "char": "🥢",
        "emojiName": "chopsticks"
      }
    }
  }
}, {
  "activity": {
    "id": "activity",
    "name": "Activity",
    "symbol": _activity.default,
    "emojis": {
      "soccer": {
        "keywords": ["sports", "football"],
        "char": "⚽",
        "emojiName": "soccer"
      },
      "basketball": {
        "keywords": ["sports", "balls", "NBA"],
        "char": "🏀",
        "emojiName": "basketball"
      },
      "football": {
        "keywords": ["sports", "balls", "NFL"],
        "char": "🏈",
        "emojiName": "football"
      },
      "baseball": {
        "keywords": ["sports", "balls"],
        "char": "⚾",
        "emojiName": "baseball"
      },
      "softball": {
        "keywords": ["sports", "balls"],
        "char": "🥎",
        "emojiName": "softball"
      },
      "tennis": {
        "keywords": ["sports", "balls", "green"],
        "char": "🎾",
        "emojiName": "tennis"
      },
      "volleyball": {
        "keywords": ["sports", "balls"],
        "char": "🏐",
        "emojiName": "volleyball"
      },
      "rugby_football": {
        "keywords": ["sports", "team"],
        "char": "🏉",
        "emojiName": "rugby_football"
      },
      "flying_disc": {
        "keywords": ["sports", "frisbee", "ultimate"],
        "char": "🥏",
        "emojiName": "flying_disc"
      },
      "8ball": {
        "keywords": ["pool", "hobby", "game", "luck", "magic"],
        "char": "🎱",
        "emojiName": "8ball"
      },
      "golf": {
        "keywords": ["sports", "business", "flag", "hole", "summer"],
        "char": "⛳",
        "emojiName": "golf"
      },
      "golfing_woman": {
        "keywords": ["sports", "business", "woman", "female"],
        "char": "🏌️‍♀️",
        "emojiName": "golfing_woman"
      },
      "golfing_man": {
        "keywords": ["sports", "business"],
        "char": "🏌",
        "fitzpatrick_scale": true,
        "emojiName": "golfing_man"
      },
      "ping_pong": {
        "keywords": ["sports", "pingpong"],
        "char": "🏓",
        "emojiName": "ping_pong"
      },
      "badminton": {
        "keywords": ["sports"],
        "char": "🏸",
        "emojiName": "badminton"
      },
      "goal_net": {
        "keywords": ["sports"],
        "char": "🥅",
        "emojiName": "goal_net"
      },
      "ice_hockey": {
        "keywords": ["sports"],
        "char": "🏒",
        "emojiName": "ice_hockey"
      },
      "field_hockey": {
        "keywords": ["sports"],
        "char": "🏑",
        "emojiName": "field_hockey"
      },
      "lacrosse": {
        "keywords": ["sports", "ball", "stick"],
        "char": "🥍",
        "emojiName": "lacrosse"
      },
      "cricket": {
        "keywords": ["sports"],
        "char": "🏏",
        "emojiName": "cricket"
      },
      "ski": {
        "keywords": ["sports", "winter", "cold", "snow"],
        "char": "🎿",
        "emojiName": "ski"
      },
      "skier": {
        "keywords": ["sports", "winter", "snow"],
        "char": "⛷",
        "emojiName": "skier"
      },
      "snowboarder": {
        "keywords": ["sports", "winter"],
        "char": "🏂",
        "fitzpatrick_scale": true,
        "emojiName": "snowboarder"
      },
      "person_fencing": {
        "keywords": ["sports", "fencing", "sword"],
        "char": "🤺",
        "emojiName": "person_fencing"
      },
      "women_wrestling": {
        "keywords": ["sports", "wrestlers"],
        "char": "🤼‍♀️",
        "emojiName": "women_wrestling"
      },
      "men_wrestling": {
        "keywords": ["sports", "wrestlers"],
        "char": "🤼‍♂️",
        "emojiName": "men_wrestling"
      },
      "woman_cartwheeling": {
        "keywords": ["gymnastics"],
        "char": "🤸‍♀️",
        "fitzpatrick_scale": true,
        "emojiName": "woman_cartwheeling"
      },
      "man_cartwheeling": {
        "keywords": ["gymnastics"],
        "char": "🤸‍♂️",
        "fitzpatrick_scale": true,
        "emojiName": "man_cartwheeling"
      },
      "woman_playing_handball": {
        "keywords": ["sports"],
        "char": "🤾‍♀️",
        "fitzpatrick_scale": true,
        "emojiName": "woman_playing_handball"
      },
      "man_playing_handball": {
        "keywords": ["sports"],
        "char": "🤾‍♂️",
        "fitzpatrick_scale": true,
        "emojiName": "man_playing_handball"
      },
      "ice_skate": {
        "keywords": ["sports"],
        "char": "⛸",
        "emojiName": "ice_skate"
      },
      "curling_stone": {
        "keywords": ["sports"],
        "char": "🥌",
        "emojiName": "curling_stone"
      },
      "skateboard": {
        "keywords": ["board"],
        "char": "🛹",
        "emojiName": "skateboard"
      },
      "sled": {
        "keywords": ["sleigh", "luge", "toboggan"],
        "char": "🛷",
        "emojiName": "sled"
      },
      "bow_and_arrow": {
        "keywords": ["sports"],
        "char": "🏹",
        "emojiName": "bow_and_arrow"
      },
      "fishing_pole_and_fish": {
        "keywords": ["food", "hobby", "summer"],
        "char": "🎣",
        "emojiName": "fishing_pole_and_fish"
      },
      "boxing_glove": {
        "keywords": ["sports", "fighting"],
        "char": "🥊",
        "emojiName": "boxing_glove"
      },
      "martial_arts_uniform": {
        "keywords": ["judo", "karate", "taekwondo"],
        "char": "🥋",
        "emojiName": "martial_arts_uniform"
      },
      "rowing_woman": {
        "keywords": ["sports", "hobby", "water", "ship", "woman", "female"],
        "char": "🚣‍♀️",
        "fitzpatrick_scale": true,
        "emojiName": "rowing_woman"
      },
      "rowing_man": {
        "keywords": ["sports", "hobby", "water", "ship"],
        "char": "🚣",
        "fitzpatrick_scale": true,
        "emojiName": "rowing_man"
      },
      "climbing_woman": {
        "keywords": ["sports", "hobby", "woman", "female", "rock"],
        "char": "🧗‍♀️",
        "fitzpatrick_scale": true,
        "emojiName": "climbing_woman"
      },
      "climbing_man": {
        "keywords": ["sports", "hobby", "man", "male", "rock"],
        "char": "🧗‍♂️",
        "fitzpatrick_scale": true,
        "emojiName": "climbing_man"
      },
      "swimming_woman": {
        "keywords": ["sports", "exercise", "human", "athlete", "water", "summer", "woman", "female"],
        "char": "🏊‍♀️",
        "fitzpatrick_scale": true,
        "emojiName": "swimming_woman"
      },
      "swimming_man": {
        "keywords": ["sports", "exercise", "human", "athlete", "water", "summer"],
        "char": "🏊",
        "fitzpatrick_scale": true,
        "emojiName": "swimming_man"
      },
      "woman_playing_water_polo": {
        "keywords": ["sports", "pool"],
        "char": "🤽‍♀️",
        "fitzpatrick_scale": true,
        "emojiName": "woman_playing_water_polo"
      },
      "man_playing_water_polo": {
        "keywords": ["sports", "pool"],
        "char": "🤽‍♂️",
        "fitzpatrick_scale": true,
        "emojiName": "man_playing_water_polo"
      },
      "woman_in_lotus_position": {
        "keywords": ["woman", "female", "meditation", "yoga", "serenity", "zen", "mindfulness"],
        "char": "🧘‍♀️",
        "fitzpatrick_scale": true,
        "emojiName": "woman_in_lotus_position"
      },
      "man_in_lotus_position": {
        "keywords": ["man", "male", "meditation", "yoga", "serenity", "zen", "mindfulness"],
        "char": "🧘‍♂️",
        "fitzpatrick_scale": true,
        "emojiName": "man_in_lotus_position"
      },
      "surfing_woman": {
        "keywords": ["sports", "ocean", "sea", "summer", "beach", "woman", "female"],
        "char": "🏄‍♀️",
        "fitzpatrick_scale": true,
        "emojiName": "surfing_woman"
      },
      "surfing_man": {
        "keywords": ["sports", "ocean", "sea", "summer", "beach"],
        "char": "🏄",
        "fitzpatrick_scale": true,
        "emojiName": "surfing_man"
      },
      "bath": {
        "keywords": ["clean", "shower", "bathroom"],
        "char": "🛀",
        "fitzpatrick_scale": true,
        "emojiName": "bath"
      },
      "basketball_woman": {
        "keywords": ["sports", "human", "woman", "female"],
        "char": "⛹️‍♀️",
        "fitzpatrick_scale": true,
        "emojiName": "basketball_woman"
      },
      "basketball_man": {
        "keywords": ["sports", "human"],
        "char": "⛹",
        "fitzpatrick_scale": true,
        "emojiName": "basketball_man"
      },
      "weight_lifting_woman": {
        "keywords": ["sports", "training", "exercise", "woman", "female"],
        "char": "🏋️‍♀️",
        "fitzpatrick_scale": true,
        "emojiName": "weight_lifting_woman"
      },
      "weight_lifting_man": {
        "keywords": ["sports", "training", "exercise"],
        "char": "🏋",
        "fitzpatrick_scale": true,
        "emojiName": "weight_lifting_man"
      },
      "biking_woman": {
        "keywords": ["sports", "bike", "exercise", "hipster", "woman", "female"],
        "char": "🚴‍♀️",
        "fitzpatrick_scale": true,
        "emojiName": "biking_woman"
      },
      "biking_man": {
        "keywords": ["sports", "bike", "exercise", "hipster"],
        "char": "🚴",
        "fitzpatrick_scale": true,
        "emojiName": "biking_man"
      },
      "mountain_biking_woman": {
        "keywords": ["transportation", "sports", "human", "race", "bike", "woman", "female"],
        "char": "🚵‍♀️",
        "fitzpatrick_scale": true,
        "emojiName": "mountain_biking_woman"
      },
      "mountain_biking_man": {
        "keywords": ["transportation", "sports", "human", "race", "bike"],
        "char": "🚵",
        "fitzpatrick_scale": true,
        "emojiName": "mountain_biking_man"
      },
      "horse_racing": {
        "keywords": ["animal", "betting", "competition", "gambling", "luck"],
        "char": "🏇",
        "fitzpatrick_scale": true,
        "emojiName": "horse_racing"
      },
      "business_suit_levitating": {
        "keywords": ["suit", "business", "levitate", "hover", "jump"],
        "char": "🕴",
        "fitzpatrick_scale": true,
        "emojiName": "business_suit_levitating"
      },
      "trophy": {
        "keywords": ["win", "award", "contest", "place", "ftw", "ceremony"],
        "char": "🏆",
        "emojiName": "trophy"
      },
      "running_shirt_with_sash": {
        "keywords": ["play", "pageant"],
        "char": "🎽",
        "emojiName": "running_shirt_with_sash"
      },
      "medal_sports": {
        "keywords": ["award", "winning"],
        "char": "🏅",
        "emojiName": "medal_sports"
      },
      "medal_military": {
        "keywords": ["award", "winning", "army"],
        "char": "🎖",
        "emojiName": "medal_military"
      },
      "1st_place_medal": {
        "keywords": ["award", "winning", "first"],
        "char": "🥇",
        "emojiName": "1st_place_medal"
      },
      "2nd_place_medal": {
        "keywords": ["award", "second"],
        "char": "🥈",
        "emojiName": "2nd_place_medal"
      },
      "3rd_place_medal": {
        "keywords": ["award", "third"],
        "char": "🥉",
        "emojiName": "3rd_place_medal"
      },
      "reminder_ribbon": {
        "keywords": ["sports", "cause", "support", "awareness"],
        "char": "🎗",
        "emojiName": "reminder_ribbon"
      },
      "rosette": {
        "keywords": ["flower", "decoration", "military"],
        "char": "🏵",
        "emojiName": "rosette"
      },
      "ticket": {
        "keywords": ["event", "concert", "pass"],
        "char": "🎫",
        "emojiName": "ticket"
      },
      "tickets": {
        "keywords": ["sports", "concert", "entrance"],
        "char": "🎟",
        "emojiName": "tickets"
      },
      "performing_arts": {
        "keywords": ["acting", "theater", "drama"],
        "char": "🎭",
        "emojiName": "performing_arts"
      },
      "art": {
        "keywords": ["design", "paint", "draw", "colors"],
        "char": "🎨",
        "emojiName": "art"
      },
      "circus_tent": {
        "keywords": ["festival", "carnival", "party"],
        "char": "🎪",
        "emojiName": "circus_tent"
      },
      "woman_juggling": {
        "keywords": ["juggle", "balance", "skill", "multitask"],
        "char": "🤹‍♀️",
        "fitzpatrick_scale": true,
        "emojiName": "woman_juggling"
      },
      "man_juggling": {
        "keywords": ["juggle", "balance", "skill", "multitask"],
        "char": "🤹‍♂️",
        "fitzpatrick_scale": true,
        "emojiName": "man_juggling"
      },
      "microphone": {
        "keywords": ["sound", "music", "PA", "sing", "talkshow"],
        "char": "🎤",
        "emojiName": "microphone"
      },
      "headphones": {
        "keywords": ["music", "score", "gadgets"],
        "char": "🎧",
        "emojiName": "headphones"
      },
      "musical_score": {
        "keywords": ["treble", "clef", "compose"],
        "char": "🎼",
        "emojiName": "musical_score"
      },
      "musical_keyboard": {
        "keywords": ["piano", "instrument", "compose"],
        "char": "🎹",
        "emojiName": "musical_keyboard"
      },
      "drum": {
        "keywords": ["music", "instrument", "drumsticks", "snare"],
        "char": "🥁",
        "emojiName": "drum"
      },
      "saxophone": {
        "keywords": ["music", "instrument", "jazz", "blues"],
        "char": "🎷",
        "emojiName": "saxophone"
      },
      "trumpet": {
        "keywords": ["music", "brass"],
        "char": "🎺",
        "emojiName": "trumpet"
      },
      "guitar": {
        "keywords": ["music", "instrument"],
        "char": "🎸",
        "emojiName": "guitar"
      },
      "violin": {
        "keywords": ["music", "instrument", "orchestra", "symphony"],
        "char": "🎻",
        "emojiName": "violin"
      },
      "clapper": {
        "keywords": ["movie", "film", "record"],
        "char": "🎬",
        "emojiName": "clapper"
      },
      "video_game": {
        "keywords": ["play", "console", "PS4", "controller"],
        "char": "🎮",
        "emojiName": "video_game"
      },
      "space_invader": {
        "keywords": ["game", "arcade", "play"],
        "char": "👾",
        "emojiName": "space_invader"
      },
      "dart": {
        "keywords": ["game", "play", "bar", "target", "bullseye"],
        "char": "🎯",
        "emojiName": "dart"
      },
      "game_die": {
        "keywords": ["dice", "random", "tabletop", "play", "luck"],
        "char": "🎲",
        "emojiName": "game_die"
      },
      "chess_pawn": {
        "keywords": ["expendable"],
        "char": "♟",
        "emojiName": "chess_pawn"
      },
      "slot_machine": {
        "keywords": ["bet", "gamble", "vegas", "fruit machine", "luck", "casino"],
        "char": "🎰",
        "emojiName": "slot_machine"
      },
      "jigsaw": {
        "keywords": ["interlocking", "puzzle", "piece"],
        "char": "🧩",
        "emojiName": "jigsaw"
      },
      "bowling": {
        "keywords": ["sports", "fun", "play"],
        "char": "🎳",
        "emojiName": "bowling"
      }
    }
  }
}, {
  "travel": {
    "id": "travel_and_places",
    "name": "Travel & Places",
    "symbol": _travel.default,
    "emojis": {
      "red_car": {
        "keywords": ["red", "transportation", "vehicle"],
        "char": "🚗",
        "emojiName": "red_car"
      },
      "taxi": {
        "keywords": ["uber", "vehicle", "cars", "transportation"],
        "char": "🚕",
        "emojiName": "taxi"
      },
      "blue_car": {
        "keywords": ["transportation", "vehicle"],
        "char": "🚙",
        "emojiName": "blue_car"
      },
      "bus": {
        "keywords": ["car", "vehicle", "transportation"],
        "char": "🚌",
        "emojiName": "bus"
      },
      "trolleybus": {
        "keywords": ["bart", "transportation", "vehicle"],
        "char": "🚎",
        "emojiName": "trolleybus"
      },
      "racing_car": {
        "keywords": ["sports", "race", "fast", "formula", "f1"],
        "char": "🏎",
        "emojiName": "racing_car"
      },
      "police_car": {
        "keywords": ["vehicle", "cars", "transportation", "law", "legal", "enforcement"],
        "char": "🚓",
        "emojiName": "police_car"
      },
      "ambulance": {
        "keywords": ["health", "911", "hospital"],
        "char": "🚑",
        "emojiName": "ambulance"
      },
      "fire_engine": {
        "keywords": ["transportation", "cars", "vehicle"],
        "char": "🚒",
        "emojiName": "fire_engine"
      },
      "minibus": {
        "keywords": ["vehicle", "car", "transportation"],
        "char": "🚐",
        "emojiName": "minibus"
      },
      "truck": {
        "keywords": ["cars", "transportation"],
        "char": "🚚",
        "emojiName": "truck"
      },
      "articulated_lorry": {
        "keywords": ["vehicle", "cars", "transportation", "express"],
        "char": "🚛",
        "emojiName": "articulated_lorry"
      },
      "tractor": {
        "keywords": ["vehicle", "car", "farming", "agriculture"],
        "char": "🚜",
        "emojiName": "tractor"
      },
      "kick_scooter": {
        "keywords": ["vehicle", "kick", "razor"],
        "char": "🛴",
        "emojiName": "kick_scooter"
      },
      "motorcycle": {
        "keywords": ["race", "sports", "fast"],
        "char": "🏍",
        "emojiName": "motorcycle"
      },
      "bike": {
        "keywords": ["sports", "bicycle", "exercise", "hipster"],
        "char": "🚲",
        "emojiName": "bike"
      },
      "motor_scooter": {
        "keywords": ["vehicle", "vespa", "sasha"],
        "char": "🛵",
        "emojiName": "motor_scooter"
      },
      "rotating_light": {
        "keywords": ["police", "ambulance", "911", "emergency", "alert", "error", "pinged", "law", "legal"],
        "char": "🚨",
        "emojiName": "rotating_light"
      },
      "oncoming_police_car": {
        "keywords": ["vehicle", "law", "legal", "enforcement", "911"],
        "char": "🚔",
        "emojiName": "oncoming_police_car"
      },
      "oncoming_bus": {
        "keywords": ["vehicle", "transportation"],
        "char": "🚍",
        "emojiName": "oncoming_bus"
      },
      "oncoming_automobile": {
        "keywords": ["car", "vehicle", "transportation"],
        "char": "🚘",
        "emojiName": "oncoming_automobile"
      },
      "oncoming_taxi": {
        "keywords": ["vehicle", "cars", "uber"],
        "char": "🚖",
        "emojiName": "oncoming_taxi"
      },
      "aerial_tramway": {
        "keywords": ["transportation", "vehicle", "ski"],
        "char": "🚡",
        "emojiName": "aerial_tramway"
      },
      "mountain_cableway": {
        "keywords": ["transportation", "vehicle", "ski"],
        "char": "🚠",
        "emojiName": "mountain_cableway"
      },
      "suspension_railway": {
        "keywords": ["vehicle", "transportation"],
        "char": "🚟",
        "emojiName": "suspension_railway"
      },
      "railway_car": {
        "keywords": ["transportation", "vehicle"],
        "char": "🚃",
        "emojiName": "railway_car"
      },
      "train": {
        "keywords": ["transportation", "vehicle", "carriage", "public", "travel"],
        "char": "🚋",
        "emojiName": "train"
      },
      "monorail": {
        "keywords": ["transportation", "vehicle"],
        "char": "🚝",
        "emojiName": "monorail"
      },
      "bullettrain_side": {
        "keywords": ["transportation", "vehicle"],
        "char": "🚄",
        "emojiName": "bullettrain_side"
      },
      "bullettrain_front": {
        "keywords": ["transportation", "vehicle", "speed", "fast", "public", "travel"],
        "char": "🚅",
        "emojiName": "bullettrain_front"
      },
      "light_rail": {
        "keywords": ["transportation", "vehicle"],
        "char": "🚈",
        "emojiName": "light_rail"
      },
      "mountain_railway": {
        "keywords": ["transportation", "vehicle"],
        "char": "🚞",
        "emojiName": "mountain_railway"
      },
      "steam_locomotive": {
        "keywords": ["transportation", "vehicle", "train"],
        "char": "🚂",
        "emojiName": "steam_locomotive"
      },
      "train2": {
        "keywords": ["transportation", "vehicle"],
        "char": "🚆",
        "emojiName": "train2"
      },
      "metro": {
        "keywords": ["transportation", "blue-square", "mrt", "underground", "tube"],
        "char": "🚇",
        "emojiName": "metro"
      },
      "tram": {
        "keywords": ["transportation", "vehicle"],
        "char": "🚊",
        "emojiName": "tram"
      },
      "station": {
        "keywords": ["transportation", "vehicle", "public"],
        "char": "🚉",
        "emojiName": "station"
      },
      "flying_saucer": {
        "keywords": ["transportation", "vehicle", "ufo"],
        "char": "🛸",
        "emojiName": "flying_saucer"
      },
      "helicopter": {
        "keywords": ["transportation", "vehicle", "fly"],
        "char": "🚁",
        "emojiName": "helicopter"
      },
      "small_airplane": {
        "keywords": ["flight", "transportation", "fly", "vehicle"],
        "char": "🛩",
        "emojiName": "small_airplane"
      },
      "airplane": {
        "keywords": ["vehicle", "transportation", "flight", "fly"],
        "char": "✈️",
        "emojiName": "airplane"
      },
      "flight_departure": {
        "keywords": ["airport", "flight", "landing"],
        "char": "🛫",
        "emojiName": "flight_departure"
      },
      "flight_arrival": {
        "keywords": ["airport", "flight", "boarding"],
        "char": "🛬",
        "emojiName": "flight_arrival"
      },
      "sailboat": {
        "keywords": ["ship", "summer", "transportation", "water", "sailing"],
        "char": "⛵",
        "emojiName": "sailboat"
      },
      "motor_boat": {
        "keywords": ["ship"],
        "char": "🛥",
        "emojiName": "motor_boat"
      },
      "speedboat": {
        "keywords": ["ship", "transportation", "vehicle", "summer"],
        "char": "🚤",
        "emojiName": "speedboat"
      },
      "ferry": {
        "keywords": ["boat", "ship", "yacht"],
        "char": "⛴",
        "emojiName": "ferry"
      },
      "passenger_ship": {
        "keywords": ["yacht", "cruise", "ferry"],
        "char": "🛳",
        "emojiName": "passenger_ship"
      },
      "rocket": {
        "keywords": ["launch", "ship", "staffmode", "NASA", "outer space", "outer_space", "fly"],
        "char": "🚀",
        "emojiName": "rocket"
      },
      "artificial_satellite": {
        "keywords": ["communication", "gps", "orbit", "spaceflight", "NASA", "ISS"],
        "char": "🛰",
        "emojiName": "artificial_satellite"
      },
      "seat": {
        "keywords": ["sit", "airplane", "transport", "bus", "flight", "fly"],
        "char": "💺",
        "emojiName": "seat"
      },
      "canoe": {
        "keywords": ["boat", "paddle", "water", "ship"],
        "char": "🛶",
        "emojiName": "canoe"
      },
      "anchor": {
        "keywords": ["ship", "ferry", "sea", "boat"],
        "char": "⚓",
        "emojiName": "anchor"
      },
      "construction": {
        "keywords": ["wip", "progress", "caution", "warning"],
        "char": "🚧",
        "emojiName": "construction"
      },
      "fuelpump": {
        "keywords": ["gas station", "petroleum"],
        "char": "⛽",
        "emojiName": "fuelpump"
      },
      "busstop": {
        "keywords": ["transportation", "wait"],
        "char": "🚏",
        "emojiName": "busstop"
      },
      "vertical_traffic_light": {
        "keywords": ["transportation", "driving"],
        "char": "🚦",
        "emojiName": "vertical_traffic_light"
      },
      "traffic_light": {
        "keywords": ["transportation", "signal"],
        "char": "🚥",
        "emojiName": "traffic_light"
      },
      "checkered_flag": {
        "keywords": ["contest", "finishline", "race", "gokart"],
        "char": "🏁",
        "emojiName": "checkered_flag"
      },
      "ship": {
        "keywords": ["transportation", "titanic", "deploy"],
        "char": "🚢",
        "emojiName": "ship"
      },
      "ferris_wheel": {
        "keywords": ["photo", "carnival", "londoneye"],
        "char": "🎡",
        "emojiName": "ferris_wheel"
      },
      "roller_coaster": {
        "keywords": ["carnival", "playground", "photo", "fun"],
        "char": "🎢",
        "emojiName": "roller_coaster"
      },
      "carousel_horse": {
        "keywords": ["photo", "carnival"],
        "char": "🎠",
        "emojiName": "carousel_horse"
      },
      "building_construction": {
        "keywords": ["wip", "working", "progress"],
        "char": "🏗",
        "emojiName": "building_construction"
      },
      "foggy": {
        "keywords": ["photo", "mountain"],
        "char": "🌁",
        "emojiName": "foggy"
      },
      "tokyo_tower": {
        "keywords": ["photo", "japanese"],
        "char": "🗼",
        "emojiName": "tokyo_tower"
      },
      "factory": {
        "keywords": ["building", "industry", "pollution", "smoke"],
        "char": "🏭",
        "emojiName": "factory"
      },
      "fountain": {
        "keywords": ["photo", "summer", "water", "fresh"],
        "char": "⛲",
        "emojiName": "fountain"
      },
      "rice_scene": {
        "keywords": ["photo", "japan", "asia", "tsukimi"],
        "char": "🎑",
        "emojiName": "rice_scene"
      },
      "mountain": {
        "keywords": ["photo", "nature", "environment"],
        "char": "⛰",
        "emojiName": "mountain"
      },
      "mountain_snow": {
        "keywords": ["photo", "nature", "environment", "winter", "cold"],
        "char": "🏔",
        "emojiName": "mountain_snow"
      },
      "mount_fuji": {
        "keywords": ["photo", "mountain", "nature", "japanese"],
        "char": "🗻",
        "emojiName": "mount_fuji"
      },
      "volcano": {
        "keywords": ["photo", "nature", "disaster"],
        "char": "🌋",
        "emojiName": "volcano"
      },
      "japan": {
        "keywords": ["nation", "country", "japanese", "asia"],
        "char": "🗾",
        "emojiName": "japan"
      },
      "camping": {
        "keywords": ["photo", "outdoors", "tent"],
        "char": "🏕",
        "emojiName": "camping"
      },
      "tent": {
        "keywords": ["photo", "camping", "outdoors"],
        "char": "⛺",
        "emojiName": "tent"
      },
      "national_park": {
        "keywords": ["photo", "environment", "nature"],
        "char": "🏞",
        "emojiName": "national_park"
      },
      "motorway": {
        "keywords": ["road", "cupertino", "interstate", "highway"],
        "char": "🛣",
        "emojiName": "motorway"
      },
      "railway_track": {
        "keywords": ["train", "transportation"],
        "char": "🛤",
        "emojiName": "railway_track"
      },
      "sunrise": {
        "keywords": ["morning", "view", "vacation", "photo"],
        "char": "🌅",
        "emojiName": "sunrise"
      },
      "sunrise_over_mountains": {
        "keywords": ["view", "vacation", "photo"],
        "char": "🌄",
        "emojiName": "sunrise_over_mountains"
      },
      "desert": {
        "keywords": ["photo", "warm", "saharah"],
        "char": "🏜",
        "emojiName": "desert"
      },
      "beach_umbrella": {
        "keywords": ["weather", "summer", "sunny", "sand", "mojito"],
        "char": "🏖",
        "emojiName": "beach_umbrella"
      },
      "desert_island": {
        "keywords": ["photo", "tropical", "mojito"],
        "char": "🏝",
        "emojiName": "desert_island"
      },
      "city_sunrise": {
        "keywords": ["photo", "good morning", "dawn"],
        "char": "🌇",
        "emojiName": "city_sunrise"
      },
      "city_sunset": {
        "keywords": ["photo", "evening", "sky", "buildings"],
        "char": "🌆",
        "emojiName": "city_sunset"
      },
      "cityscape": {
        "keywords": ["photo", "night life", "urban"],
        "char": "🏙",
        "emojiName": "cityscape"
      },
      "night_with_stars": {
        "keywords": ["evening", "city", "downtown"],
        "char": "🌃",
        "emojiName": "night_with_stars"
      },
      "bridge_at_night": {
        "keywords": ["photo", "sanfrancisco"],
        "char": "🌉",
        "emojiName": "bridge_at_night"
      },
      "milky_way": {
        "keywords": ["photo", "space", "stars"],
        "char": "🌌",
        "emojiName": "milky_way"
      },
      "stars": {
        "keywords": ["night", "photo"],
        "char": "🌠",
        "emojiName": "stars"
      },
      "sparkler": {
        "keywords": ["stars", "night", "shine"],
        "char": "🎇",
        "emojiName": "sparkler"
      },
      "fireworks": {
        "keywords": ["photo", "festival", "carnival", "congratulations"],
        "char": "🎆",
        "emojiName": "fireworks"
      },
      "rainbow": {
        "keywords": ["nature", "happy", "unicorn_face", "photo", "sky", "spring"],
        "char": "🌈",
        "emojiName": "rainbow"
      },
      "houses": {
        "keywords": ["buildings", "photo"],
        "char": "🏘",
        "emojiName": "houses"
      },
      "european_castle": {
        "keywords": ["building", "royalty", "history"],
        "char": "🏰",
        "emojiName": "european_castle"
      },
      "japanese_castle": {
        "keywords": ["photo", "building"],
        "char": "🏯",
        "emojiName": "japanese_castle"
      },
      "stadium": {
        "keywords": ["photo", "place", "sports", "concert", "venue"],
        "char": "🏟",
        "emojiName": "stadium"
      },
      "statue_of_liberty": {
        "keywords": ["american", "newyork"],
        "char": "🗽",
        "emojiName": "statue_of_liberty"
      },
      "house": {
        "keywords": ["building", "home"],
        "char": "🏠",
        "emojiName": "house"
      },
      "house_with_garden": {
        "keywords": ["home", "plant", "nature"],
        "char": "🏡",
        "emojiName": "house_with_garden"
      },
      "derelict_house": {
        "keywords": ["abandon", "evict", "broken", "building"],
        "char": "🏚",
        "emojiName": "derelict_house"
      },
      "office": {
        "keywords": ["building", "bureau", "work"],
        "char": "🏢",
        "emojiName": "office"
      },
      "department_store": {
        "keywords": ["building", "shopping", "mall"],
        "char": "🏬",
        "emojiName": "department_store"
      },
      "post_office": {
        "keywords": ["building", "envelope", "communication"],
        "char": "🏣",
        "emojiName": "post_office"
      },
      "european_post_office": {
        "keywords": ["building", "email"],
        "char": "🏤",
        "emojiName": "european_post_office"
      },
      "hospital": {
        "keywords": ["building", "health", "surgery", "doctor"],
        "char": "🏥",
        "emojiName": "hospital"
      },
      "bank": {
        "keywords": ["building", "money", "sales", "cash", "business", "enterprise"],
        "char": "🏦",
        "emojiName": "bank"
      },
      "hotel": {
        "keywords": ["building", "accomodation", "checkin"],
        "char": "🏨",
        "emojiName": "hotel"
      },
      "convenience_store": {
        "keywords": ["building", "shopping", "groceries"],
        "char": "🏪",
        "emojiName": "convenience_store"
      },
      "school": {
        "keywords": ["building", "student", "education", "learn", "teach"],
        "char": "🏫",
        "emojiName": "school"
      },
      "love_hotel": {
        "keywords": ["like", "affection", "dating"],
        "char": "🏩",
        "emojiName": "love_hotel"
      },
      "wedding": {
        "keywords": ["love", "like", "affection", "couple", "marriage", "bride", "groom"],
        "char": "💒",
        "emojiName": "wedding"
      },
      "classical_building": {
        "keywords": ["art", "culture", "history"],
        "char": "🏛",
        "emojiName": "classical_building"
      },
      "church": {
        "keywords": ["building", "religion", "christ"],
        "char": "⛪",
        "emojiName": "church"
      },
      "mosque": {
        "keywords": ["islam", "worship", "minaret"],
        "char": "🕌",
        "emojiName": "mosque"
      },
      "synagogue": {
        "keywords": ["judaism", "worship", "temple", "jewish"],
        "char": "🕍",
        "emojiName": "synagogue"
      },
      "kaaba": {
        "keywords": ["mecca", "mosque", "islam"],
        "char": "🕋",
        "emojiName": "kaaba"
      },
      "shinto_shrine": {
        "keywords": ["temple", "japan", "kyoto"],
        "char": "⛩",
        "emojiName": "shinto_shrine"
      }
    }
  }
}, {
  "objects": {
    "id": "objects",
    "name": "Objects",
    "symbol": _objects.default,
    "emojis": {
      "watch": {
        "keywords": ["time", "accessories"],
        "char": "⌚",
        "emojiName": "watch"
      },
      "iphone": {
        "keywords": ["technology", "apple", "gadgets", "dial"],
        "char": "📱",
        "emojiName": "iphone"
      },
      "calling": {
        "keywords": ["iphone", "incoming"],
        "char": "📲",
        "emojiName": "calling"
      },
      "computer": {
        "keywords": ["technology", "laptop", "screen", "display", "monitor"],
        "char": "💻",
        "emojiName": "computer"
      },
      "keyboard": {
        "keywords": ["technology", "computer", "type", "input", "text"],
        "char": "⌨",
        "emojiName": "keyboard"
      },
      "desktop_computer": {
        "keywords": ["technology", "computing", "screen"],
        "char": "🖥",
        "emojiName": "desktop_computer"
      },
      "printer": {
        "keywords": ["paper", "ink"],
        "char": "🖨",
        "emojiName": "printer"
      },
      "computer_mouse": {
        "keywords": ["click"],
        "char": "🖱",
        "emojiName": "computer_mouse"
      },
      "trackball": {
        "keywords": ["technology", "trackpad"],
        "char": "🖲",
        "emojiName": "trackball"
      },
      "joystick": {
        "keywords": ["game", "play"],
        "char": "🕹",
        "emojiName": "joystick"
      },
      "clamp": {
        "keywords": ["tool"],
        "char": "🗜",
        "emojiName": "clamp"
      },
      "minidisc": {
        "keywords": ["technology", "record", "emojies", "disk", "90s"],
        "char": "💽",
        "emojiName": "minidisc"
      },
      "floppy_disk": {
        "keywords": ["oldschool", "technology", "save", "90s", "80s"],
        "char": "💾",
        "emojiName": "floppy_disk"
      },
      "cd": {
        "keywords": ["technology", "dvd", "disk", "disc", "90s"],
        "char": "💿",
        "emojiName": "cd"
      },
      "dvd": {
        "keywords": ["cd", "disk", "disc"],
        "char": "📀",
        "emojiName": "dvd"
      },
      "vhs": {
        "keywords": ["record", "video", "oldschool", "90s", "80s"],
        "char": "📼",
        "emojiName": "vhs"
      },
      "camera": {
        "keywords": ["gadgets", "photography"],
        "char": "📷",
        "emojiName": "camera"
      },
      "camera_flash": {
        "keywords": ["photography", "gadgets"],
        "char": "📸",
        "emojiName": "camera_flash"
      },
      "video_camera": {
        "keywords": ["film", "record"],
        "char": "📹",
        "emojiName": "video_camera"
      },
      "movie_camera": {
        "keywords": ["film", "record"],
        "char": "🎥",
        "emojiName": "movie_camera"
      },
      "film_projector": {
        "keywords": ["video", "tape", "record", "movie"],
        "char": "📽",
        "emojiName": "film_projector"
      },
      "film_strip": {
        "keywords": ["movie"],
        "char": "🎞",
        "emojiName": "film_strip"
      },
      "telephone_receiver": {
        "keywords": ["technology", "communication", "dial"],
        "char": "📞",
        "emojiName": "telephone_receiver"
      },
      "phone": {
        "keywords": ["technology", "communication", "dial", "telephone"],
        "char": "☎️",
        "emojiName": "phone"
      },
      "pager": {
        "keywords": ["bbcall", "oldschool", "90s"],
        "char": "📟",
        "emojiName": "pager"
      },
      "fax": {
        "keywords": ["communication", "technology"],
        "char": "📠",
        "emojiName": "fax"
      },
      "tv": {
        "keywords": ["technology", "program", "oldschool", "show", "television"],
        "char": "📺",
        "emojiName": "tv"
      },
      "radio": {
        "keywords": ["communication", "music", "podcast", "program"],
        "char": "📻",
        "emojiName": "radio"
      },
      "studio_microphone": {
        "keywords": ["sing", "recording", "artist", "talkshow"],
        "char": "🎙",
        "emojiName": "studio_microphone"
      },
      "level_slider": {
        "keywords": ["scale"],
        "char": "🎚",
        "emojiName": "level_slider"
      },
      "control_knobs": {
        "keywords": ["dial"],
        "char": "🎛",
        "emojiName": "control_knobs"
      },
      "compass": {
        "keywords": ["magnetic", "navigation", "orienteering"],
        "char": "🧭",
        "emojiName": "compass"
      },
      "stopwatch": {
        "keywords": ["time", "deadline"],
        "char": "⏱",
        "emojiName": "stopwatch"
      },
      "timer_clock": {
        "keywords": ["alarm"],
        "char": "⏲",
        "emojiName": "timer_clock"
      },
      "alarm_clock": {
        "keywords": ["time", "wake"],
        "char": "⏰",
        "emojiName": "alarm_clock"
      },
      "mantelpiece_clock": {
        "keywords": ["time"],
        "char": "🕰",
        "emojiName": "mantelpiece_clock"
      },
      "hourglass_flowing_sand": {
        "keywords": ["oldschool", "time", "countdown"],
        "char": "⏳",
        "emojiName": "hourglass_flowing_sand"
      },
      "hourglass": {
        "keywords": ["time", "clock", "oldschool", "limit", "exam", "quiz", "test"],
        "char": "⌛",
        "emojiName": "hourglass"
      },
      "satellite": {
        "keywords": ["communication", "future", "radio", "space"],
        "char": "📡",
        "emojiName": "satellite"
      },
      "battery": {
        "keywords": ["power", "energy", "sustain"],
        "char": "🔋",
        "emojiName": "battery"
      },
      "electric_plug": {
        "keywords": ["charger", "power"],
        "char": "🔌",
        "emojiName": "electric_plug"
      },
      "bulb": {
        "keywords": ["light", "electricity", "idea"],
        "char": "💡",
        "emojiName": "bulb"
      },
      "flashlight": {
        "keywords": ["dark", "camping", "sight", "night"],
        "char": "🔦",
        "emojiName": "flashlight"
      },
      "candle": {
        "keywords": ["fire", "wax"],
        "char": "🕯",
        "emojiName": "candle"
      },
      "fire_extinguisher": {
        "keywords": ["quench"],
        "char": "🧯",
        "emojiName": "fire_extinguisher"
      },
      "wastebasket": {
        "keywords": ["bin", "trash", "rubbish", "garbage", "toss"],
        "char": "🗑",
        "emojiName": "wastebasket"
      },
      "oil_drum": {
        "keywords": ["barrell"],
        "char": "🛢",
        "emojiName": "oil_drum"
      },
      "money_with_wings": {
        "keywords": ["dollar", "bills", "payment", "sale"],
        "char": "💸",
        "emojiName": "money_with_wings"
      },
      "dollar": {
        "keywords": ["money", "sales", "bill", "currency"],
        "char": "💵",
        "emojiName": "dollar"
      },
      "yen": {
        "keywords": ["money", "sales", "japanese", "dollar", "currency"],
        "char": "💴",
        "emojiName": "yen"
      },
      "euro": {
        "keywords": ["money", "sales", "dollar", "currency"],
        "char": "💶",
        "emojiName": "euro"
      },
      "pound": {
        "keywords": ["british", "sterling", "money", "sales", "bills", "uk", "england", "currency"],
        "char": "💷",
        "emojiName": "pound"
      },
      "moneybag": {
        "keywords": ["dollar", "payment", "coins", "sale"],
        "char": "💰",
        "emojiName": "moneybag"
      },
      "credit_card": {
        "keywords": ["money", "sales", "dollar", "bill", "payment", "shopping"],
        "char": "💳",
        "emojiName": "credit_card"
      },
      "gem": {
        "keywords": ["blue", "ruby", "diamond", "jewelry"],
        "char": "💎",
        "emojiName": "gem"
      },
      "balance_scale": {
        "keywords": ["law", "fairness", "weight"],
        "char": "⚖",
        "emojiName": "balance_scale"
      },
      "toolbox": {
        "keywords": ["tools", "diy", "fix", "maintainer", "mechanic"],
        "char": "🧰",
        "emojiName": "toolbox"
      },
      "wrench": {
        "keywords": ["tools", "diy", "ikea", "fix", "maintainer"],
        "char": "🔧",
        "emojiName": "wrench"
      },
      "hammer": {
        "keywords": ["tools", "build", "create"],
        "char": "🔨",
        "emojiName": "hammer"
      },
      "hammer_and_pick": {
        "keywords": ["tools", "build", "create"],
        "char": "⚒",
        "emojiName": "hammer_and_pick"
      },
      "hammer_and_wrench": {
        "keywords": ["tools", "build", "create"],
        "char": "🛠",
        "emojiName": "hammer_and_wrench"
      },
      "pick": {
        "keywords": ["tools", "dig"],
        "char": "⛏",
        "emojiName": "pick"
      },
      "nut_and_bolt": {
        "keywords": ["handy", "tools", "fix"],
        "char": "🔩",
        "emojiName": "nut_and_bolt"
      },
      "gear": {
        "keywords": ["cog"],
        "char": "⚙",
        "emojiName": "gear"
      },
      "brick": {
        "keywords": ["bricks"],
        "char": "🧱",
        "emojiName": "brick"
      },
      "chains": {
        "keywords": ["lock", "arrest"],
        "char": "⛓",
        "emojiName": "chains"
      },
      "magnet": {
        "keywords": ["attraction", "magnetic"],
        "char": "🧲",
        "emojiName": "magnet"
      },
      "gun": {
        "keywords": ["violence", "weapon", "pistol", "revolver"],
        "char": "🔫",
        "emojiName": "gun"
      },
      "bomb": {
        "keywords": ["boom", "explode", "explosion", "terrorism"],
        "char": "💣",
        "emojiName": "bomb"
      },
      "firecracker": {
        "keywords": ["dynamite", "boom", "explode", "explosion", "explosive"],
        "char": "🧨",
        "emojiName": "firecracker"
      },
      "hocho": {
        "keywords": ["knife", "blade", "cutlery", "kitchen", "weapon"],
        "char": "🔪",
        "emojiName": "hocho"
      },
      "dagger": {
        "keywords": ["weapon"],
        "char": "🗡",
        "emojiName": "dagger"
      },
      "crossed_swords": {
        "keywords": ["weapon"],
        "char": "⚔",
        "emojiName": "crossed_swords"
      },
      "shield": {
        "keywords": ["protection", "security"],
        "char": "🛡",
        "emojiName": "shield"
      },
      "smoking": {
        "keywords": ["kills", "tobacco", "cigarette", "joint", "smoke"],
        "char": "🚬",
        "emojiName": "smoking"
      },
      "skull_and_crossbones": {
        "keywords": ["poison", "danger", "deadly", "scary", "death", "pirate", "evil"],
        "char": "☠",
        "emojiName": "skull_and_crossbones"
      },
      "coffin": {
        "keywords": ["vampire", "dead", "die", "death", "rip", "graveyard", "cemetery", "casket", "funeral", "box"],
        "char": "⚰",
        "emojiName": "coffin"
      },
      "funeral_urn": {
        "keywords": ["dead", "die", "death", "rip", "ashes"],
        "char": "⚱",
        "emojiName": "funeral_urn"
      },
      "amphora": {
        "keywords": ["vase", "jar"],
        "char": "🏺",
        "emojiName": "amphora"
      },
      "crystal_ball": {
        "keywords": ["disco", "party", "magic", "circus", "fortune_teller"],
        "char": "🔮",
        "emojiName": "crystal_ball"
      },
      "prayer_beads": {
        "keywords": ["dhikr", "religious"],
        "char": "📿",
        "emojiName": "prayer_beads"
      },
      "nazar_amulet": {
        "keywords": ["bead", "charm"],
        "char": "🧿",
        "emojiName": "nazar_amulet"
      },
      "barber": {
        "keywords": ["hair", "salon", "style"],
        "char": "💈",
        "emojiName": "barber"
      },
      "alembic": {
        "keywords": ["distilling", "science", "experiment", "chemistry"],
        "char": "⚗",
        "emojiName": "alembic"
      },
      "telescope": {
        "keywords": ["stars", "space", "zoom", "science", "astronomy"],
        "char": "🔭",
        "emojiName": "telescope"
      },
      "microscope": {
        "keywords": ["laboratory", "experiment", "zoomin", "science", "study"],
        "char": "🔬",
        "emojiName": "microscope"
      },
      "hole": {
        "keywords": ["embarrassing"],
        "char": "🕳",
        "emojiName": "hole"
      },
      "pill": {
        "keywords": ["health", "medicine", "doctor", "pharmacy", "drug"],
        "char": "💊",
        "emojiName": "pill"
      },
      "syringe": {
        "keywords": ["health", "hospital", "drugs", "blood", "medicine", "needle", "doctor", "nurse"],
        "char": "💉",
        "emojiName": "syringe"
      },
      "dna": {
        "keywords": ["biologist", "genetics", "life"],
        "char": "🧬",
        "emojiName": "dna"
      },
      "microbe": {
        "keywords": ["amoeba", "bacteria", "germs"],
        "char": "🦠",
        "emojiName": "microbe"
      },
      "petri_dish": {
        "keywords": ["bacteria", "biology", "culture", "lab"],
        "char": "🧫",
        "emojiName": "petri_dish"
      },
      "test_tube": {
        "keywords": ["chemistry", "experiment", "lab", "science"],
        "char": "🧪",
        "emojiName": "test_tube"
      },
      "thermometer": {
        "keywords": ["weather", "temperature", "hot", "cold"],
        "char": "🌡",
        "emojiName": "thermometer"
      },
      "broom": {
        "keywords": ["cleaning", "sweeping", "witch"],
        "char": "🧹",
        "emojiName": "broom"
      },
      "basket": {
        "keywords": ["laundry"],
        "char": "🧺",
        "emojiName": "basket"
      },
      "toilet_paper": {
        "keywords": ["roll"],
        "char": "🧻",
        "emojiName": "toilet_paper"
      },
      "label": {
        "keywords": ["sale", "tag"],
        "char": "🏷",
        "emojiName": "label"
      },
      "bookmark": {
        "keywords": ["favorite", "label", "save"],
        "char": "🔖",
        "emojiName": "bookmark"
      },
      "toilet": {
        "keywords": ["restroom", "wc", "washroom", "bathroom", "potty"],
        "char": "🚽",
        "emojiName": "toilet"
      },
      "shower": {
        "keywords": ["clean", "water", "bathroom"],
        "char": "🚿",
        "emojiName": "shower"
      },
      "bathtub": {
        "keywords": ["clean", "shower", "bathroom"],
        "char": "🛁",
        "emojiName": "bathtub"
      },
      "soap": {
        "keywords": ["bar", "bathing", "cleaning", "lather"],
        "char": "🧼",
        "emojiName": "soap"
      },
      "sponge": {
        "keywords": ["absorbing", "cleaning", "porous"],
        "char": "🧽",
        "emojiName": "sponge"
      },
      "lotion_bottle": {
        "keywords": ["moisturizer", "sunscreen"],
        "char": "🧴",
        "emojiName": "lotion_bottle"
      },
      "key": {
        "keywords": ["lock", "door", "password"],
        "char": "🔑",
        "emojiName": "key"
      },
      "old_key": {
        "keywords": ["lock", "door", "password"],
        "char": "🗝",
        "emojiName": "old_key"
      },
      "couch_and_lamp": {
        "keywords": ["read", "chill"],
        "char": "🛋",
        "emojiName": "couch_and_lamp"
      },
      "sleeping_bed": {
        "keywords": ["bed", "rest"],
        "char": "🛌",
        "fitzpatrick_scale": true,
        "emojiName": "sleeping_bed"
      },
      "bed": {
        "keywords": ["sleep", "rest"],
        "char": "🛏",
        "emojiName": "bed"
      },
      "door": {
        "keywords": ["house", "entry", "exit"],
        "char": "🚪",
        "emojiName": "door"
      },
      "bellhop_bell": {
        "keywords": ["service"],
        "char": "🛎",
        "emojiName": "bellhop_bell"
      },
      "teddy_bear": {
        "keywords": ["plush", "stuffed"],
        "char": "🧸",
        "emojiName": "teddy_bear"
      },
      "framed_picture": {
        "keywords": ["photography"],
        "char": "🖼",
        "emojiName": "framed_picture"
      },
      "world_map": {
        "keywords": ["location", "direction"],
        "char": "🗺",
        "emojiName": "world_map"
      },
      "parasol_on_ground": {
        "keywords": ["weather", "summer"],
        "char": "⛱",
        "emojiName": "parasol_on_ground"
      },
      "moyai": {
        "keywords": ["rock", "easter island", "moai"],
        "char": "🗿",
        "emojiName": "moyai"
      },
      "shopping": {
        "keywords": ["mall", "buy", "purchase"],
        "char": "🛍",
        "emojiName": "shopping"
      },
      "shopping_cart": {
        "keywords": ["trolley"],
        "char": "🛒",
        "emojiName": "shopping_cart"
      },
      "balloon": {
        "keywords": ["party", "celebration", "birthday", "circus"],
        "char": "🎈",
        "emojiName": "balloon"
      },
      "flags": {
        "keywords": ["fish", "japanese", "koinobori", "carp", "banner"],
        "char": "🎏",
        "emojiName": "flags"
      },
      "ribbon": {
        "keywords": ["decoration", "pink", "girl", "bowtie"],
        "char": "🎀",
        "emojiName": "ribbon"
      },
      "gift": {
        "keywords": ["present", "birthday", "christmas", "xmas"],
        "char": "🎁",
        "emojiName": "gift"
      },
      "confetti_ball": {
        "keywords": ["festival", "party", "birthday", "circus"],
        "char": "🎊",
        "emojiName": "confetti_ball"
      },
      "tada": {
        "keywords": ["party", "congratulations", "birthday", "magic", "circus", "celebration"],
        "char": "🎉",
        "emojiName": "tada"
      },
      "dolls": {
        "keywords": ["japanese", "toy", "kimono"],
        "char": "🎎",
        "emojiName": "dolls"
      },
      "wind_chime": {
        "keywords": ["nature", "ding", "spring", "bell"],
        "char": "🎐",
        "emojiName": "wind_chime"
      },
      "crossed_flags": {
        "keywords": ["japanese", "nation", "country", "border"],
        "char": "🎌",
        "emojiName": "crossed_flags"
      },
      "izakaya_lantern": {
        "keywords": ["light", "paper", "halloween", "spooky"],
        "char": "🏮",
        "emojiName": "izakaya_lantern"
      },
      "red_envelope": {
        "keywords": ["gift"],
        "char": "🧧",
        "emojiName": "red_envelope"
      },
      "email": {
        "keywords": ["letter", "postal", "inbox", "communication"],
        "char": "✉️",
        "emojiName": "email"
      },
      "envelope_with_arrow": {
        "keywords": ["email", "communication"],
        "char": "📩",
        "emojiName": "envelope_with_arrow"
      },
      "incoming_envelope": {
        "keywords": ["email", "inbox"],
        "char": "📨",
        "emojiName": "incoming_envelope"
      },
      "e-mail": {
        "keywords": ["communication", "inbox"],
        "char": "📧",
        "emojiName": "e-mail"
      },
      "love_letter": {
        "keywords": ["email", "like", "affection", "envelope", "valentines"],
        "char": "💌",
        "emojiName": "love_letter"
      },
      "postbox": {
        "keywords": ["email", "letter", "envelope"],
        "char": "📮",
        "emojiName": "postbox"
      },
      "mailbox_closed": {
        "keywords": ["email", "communication", "inbox"],
        "char": "📪",
        "emojiName": "mailbox_closed"
      },
      "mailbox": {
        "keywords": ["email", "inbox", "communication"],
        "char": "📫",
        "emojiName": "mailbox"
      },
      "mailbox_with_mail": {
        "keywords": ["email", "inbox", "communication"],
        "char": "📬",
        "emojiName": "mailbox_with_mail"
      },
      "mailbox_with_no_mail": {
        "keywords": ["email", "inbox"],
        "char": "📭",
        "emojiName": "mailbox_with_no_mail"
      },
      "package": {
        "keywords": ["mail", "gift", "cardboard", "box", "moving"],
        "char": "📦",
        "emojiName": "package"
      },
      "postal_horn": {
        "keywords": ["instrument", "music"],
        "char": "📯",
        "emojiName": "postal_horn"
      },
      "inbox_tray": {
        "keywords": ["email", "documents"],
        "char": "📥",
        "emojiName": "inbox_tray"
      },
      "outbox_tray": {
        "keywords": ["inbox", "email"],
        "char": "📤",
        "emojiName": "outbox_tray"
      },
      "scroll": {
        "keywords": ["documents", "ancient", "history", "paper"],
        "char": "📜",
        "emojiName": "scroll"
      },
      "page_with_curl": {
        "keywords": ["documents", "office", "paper"],
        "char": "📃",
        "emojiName": "page_with_curl"
      },
      "bookmark_tabs": {
        "keywords": ["favorite", "save", "order", "tidy"],
        "char": "📑",
        "emojiName": "bookmark_tabs"
      },
      "receipt": {
        "keywords": ["accounting", "expenses"],
        "char": "🧾",
        "emojiName": "receipt"
      },
      "bar_chart": {
        "keywords": ["graph", "presentation", "stats"],
        "char": "📊",
        "emojiName": "bar_chart"
      },
      "chart_with_upwards_trend": {
        "keywords": ["graph", "presentation", "stats", "recovery", "business", "economics", "money", "sales", "good", "success"],
        "char": "📈",
        "emojiName": "chart_with_upwards_trend"
      },
      "chart_with_downwards_trend": {
        "keywords": ["graph", "presentation", "stats", "recession", "business", "economics", "money", "sales", "bad", "failure"],
        "char": "📉",
        "emojiName": "chart_with_downwards_trend"
      },
      "page_facing_up": {
        "keywords": ["documents", "office", "paper", "information"],
        "char": "📄",
        "emojiName": "page_facing_up"
      },
      "date": {
        "keywords": ["calendar", "schedule"],
        "char": "📅",
        "emojiName": "date"
      },
      "calendar": {
        "keywords": ["schedule", "date", "planning"],
        "char": "📆",
        "emojiName": "calendar"
      },
      "spiral_calendar": {
        "keywords": ["date", "schedule", "planning"],
        "char": "🗓",
        "emojiName": "spiral_calendar"
      },
      "card_index": {
        "keywords": ["business", "stationery"],
        "char": "📇",
        "emojiName": "card_index"
      },
      "card_file_box": {
        "keywords": ["business", "stationery"],
        "char": "🗃",
        "emojiName": "card_file_box"
      },
      "ballot_box": {
        "keywords": ["election", "vote"],
        "char": "🗳",
        "emojiName": "ballot_box"
      },
      "file_cabinet": {
        "keywords": ["filing", "organizing"],
        "char": "🗄",
        "emojiName": "file_cabinet"
      },
      "clipboard": {
        "keywords": ["stationery", "documents"],
        "char": "📋",
        "emojiName": "clipboard"
      },
      "spiral_notepad": {
        "keywords": ["memo", "stationery"],
        "char": "🗒",
        "emojiName": "spiral_notepad"
      },
      "file_folder": {
        "keywords": ["documents", "business", "office"],
        "char": "📁",
        "emojiName": "file_folder"
      },
      "open_file_folder": {
        "keywords": ["documents", "load"],
        "char": "📂",
        "emojiName": "open_file_folder"
      },
      "card_index_dividers": {
        "keywords": ["organizing", "business", "stationery"],
        "char": "🗂",
        "emojiName": "card_index_dividers"
      },
      "newspaper_roll": {
        "keywords": ["press", "headline"],
        "char": "🗞",
        "emojiName": "newspaper_roll"
      },
      "newspaper": {
        "keywords": ["press", "headline"],
        "char": "📰",
        "emojiName": "newspaper"
      },
      "notebook": {
        "keywords": ["stationery", "record", "notes", "paper", "study"],
        "char": "📓",
        "emojiName": "notebook"
      },
      "closed_book": {
        "keywords": ["read", "library", "knowledge", "textbook", "learn"],
        "char": "📕",
        "emojiName": "closed_book"
      },
      "green_book": {
        "keywords": ["read", "library", "knowledge", "study"],
        "char": "📗",
        "emojiName": "green_book"
      },
      "blue_book": {
        "keywords": ["read", "library", "knowledge", "learn", "study"],
        "char": "📘",
        "emojiName": "blue_book"
      },
      "orange_book": {
        "keywords": ["read", "library", "knowledge", "textbook", "study"],
        "char": "📙",
        "emojiName": "orange_book"
      },
      "notebook_with_decorative_cover": {
        "keywords": ["classroom", "notes", "record", "paper", "study"],
        "char": "📔",
        "emojiName": "notebook_with_decorative_cover"
      },
      "ledger": {
        "keywords": ["notes", "paper"],
        "char": "📒",
        "emojiName": "ledger"
      },
      "books": {
        "keywords": ["literature", "library", "study"],
        "char": "📚",
        "emojiName": "books"
      },
      "open_book": {
        "keywords": ["book", "read", "library", "knowledge", "literature", "learn", "study"],
        "char": "📖",
        "emojiName": "open_book"
      },
      "safety_pin": {
        "keywords": ["diaper"],
        "char": "🧷",
        "emojiName": "safety_pin"
      },
      "link": {
        "keywords": ["rings", "url"],
        "char": "🔗",
        "emojiName": "link"
      },
      "paperclip": {
        "keywords": ["documents", "stationery"],
        "char": "📎",
        "emojiName": "paperclip"
      },
      "paperclips": {
        "keywords": ["documents", "stationery"],
        "char": "🖇",
        "emojiName": "paperclips"
      },
      "scissors": {
        "keywords": ["stationery", "cut"],
        "char": "✂️",
        "emojiName": "scissors"
      },
      "triangular_ruler": {
        "keywords": ["stationery", "math", "architect", "sketch"],
        "char": "📐",
        "emojiName": "triangular_ruler"
      },
      "straight_ruler": {
        "keywords": ["stationery", "calculate", "length", "math", "school", "drawing", "architect", "sketch"],
        "char": "📏",
        "emojiName": "straight_ruler"
      },
      "abacus": {
        "keywords": ["calculation"],
        "char": "🧮",
        "emojiName": "abacus"
      },
      "pushpin": {
        "keywords": ["stationery", "mark", "here"],
        "char": "📌",
        "emojiName": "pushpin"
      },
      "round_pushpin": {
        "keywords": ["stationery", "location", "map", "here"],
        "char": "📍",
        "emojiName": "round_pushpin"
      },
      "triangular_flag_on_post": {
        "keywords": ["mark", "milestone", "place"],
        "char": "🚩",
        "emojiName": "triangular_flag_on_post"
      },
      "white_flag": {
        "keywords": ["losing", "loser", "lost", "surrender", "give up", "fail"],
        "char": "🏳",
        "emojiName": "white_flag"
      },
      "black_flag": {
        "keywords": ["pirate"],
        "char": "🏴",
        "emojiName": "black_flag"
      },
      "rainbow_flag": {
        "keywords": ["flag", "rainbow", "pride", "gay", "lgbt", "glbt", "queer", "homosexual", "lesbian", "bisexual", "transgender"],
        "char": "🏳️‍🌈",
        "emojiName": "rainbow_flag"
      },
      "closed_lock_with_key": {
        "keywords": ["security", "privacy"],
        "char": "🔐",
        "emojiName": "closed_lock_with_key"
      },
      "lock": {
        "keywords": ["security", "password", "padlock"],
        "char": "🔒",
        "emojiName": "lock"
      },
      "unlock": {
        "keywords": ["privacy", "security"],
        "char": "🔓",
        "emojiName": "unlock"
      },
      "lock_with_ink_pen": {
        "keywords": ["security", "secret"],
        "char": "🔏",
        "emojiName": "lock_with_ink_pen"
      },
      "pen": {
        "keywords": ["stationery", "writing", "write"],
        "char": "🖊",
        "emojiName": "pen"
      },
      "fountain_pen": {
        "keywords": ["stationery", "writing", "write"],
        "char": "🖋",
        "emojiName": "fountain_pen"
      },
      "black_nib": {
        "keywords": ["pen", "stationery", "writing", "write"],
        "char": "✒️",
        "emojiName": "black_nib"
      },
      "memo": {
        "keywords": ["write", "documents", "stationery", "pencil", "paper", "writing", "legal", "exam", "quiz", "test", "study", "compose"],
        "char": "📝",
        "emojiName": "memo"
      },
      "pencil2": {
        "keywords": ["stationery", "write", "paper", "writing", "school", "study"],
        "char": "✏️",
        "emojiName": "pencil2"
      },
      "crayon": {
        "keywords": ["drawing", "creativity"],
        "char": "🖍",
        "emojiName": "crayon"
      },
      "paintbrush": {
        "keywords": ["drawing", "creativity", "art"],
        "char": "🖌",
        "emojiName": "paintbrush"
      },
      "mag": {
        "keywords": ["search", "zoom", "find", "detective"],
        "char": "🔍",
        "emojiName": "mag"
      },
      "mag_right": {
        "keywords": ["search", "zoom", "find", "detective"],
        "char": "🔎",
        "emojiName": "mag_right"
      }
    }
  }
}, {
  "symbols": {
    "id": "symbols",
    "name": "Symbols",
    "symbol": _symbols.default,
    "emojis": {
      "100": {
        "keywords": ["score", "perfect", "numbers", "century", "exam", "quiz", "test", "pass", "hundred"],
        "char": "💯",
        "emojiName": "100"
      },
      "1234": {
        "keywords": ["numbers", "blue-square"],
        "char": "🔢",
        "emojiName": "1234"
      },
      "heart": {
        "keywords": ["love", "like", "valentines"],
        "char": "❤️",
        "emojiName": "heart"
      },
      "orange_heart": {
        "keywords": ["love", "like", "affection", "valentines"],
        "char": "🧡",
        "emojiName": "orange_heart"
      },
      "yellow_heart": {
        "keywords": ["love", "like", "affection", "valentines"],
        "char": "💛",
        "emojiName": "yellow_heart"
      },
      "green_heart": {
        "keywords": ["love", "like", "affection", "valentines"],
        "char": "💚",
        "emojiName": "green_heart"
      },
      "blue_heart": {
        "keywords": ["love", "like", "affection", "valentines"],
        "char": "💙",
        "emojiName": "blue_heart"
      },
      "purple_heart": {
        "keywords": ["love", "like", "affection", "valentines"],
        "char": "💜",
        "emojiName": "purple_heart"
      },
      "black_heart": {
        "keywords": ["evil"],
        "char": "🖤",
        "emojiName": "black_heart"
      },
      "broken_heart": {
        "keywords": ["sad", "sorry", "break", "heart", "heartbreak"],
        "char": "💔",
        "emojiName": "broken_heart"
      },
      "heavy_heart_exclamation": {
        "keywords": ["decoration", "love"],
        "char": "❣",
        "emojiName": "heavy_heart_exclamation"
      },
      "two_hearts": {
        "keywords": ["love", "like", "affection", "valentines", "heart"],
        "char": "💕",
        "emojiName": "two_hearts"
      },
      "revolving_hearts": {
        "keywords": ["love", "like", "affection", "valentines"],
        "char": "💞",
        "emojiName": "revolving_hearts"
      },
      "heartbeat": {
        "keywords": ["love", "like", "affection", "valentines", "pink", "heart"],
        "char": "💓",
        "emojiName": "heartbeat"
      },
      "heartpulse": {
        "keywords": ["like", "love", "affection", "valentines", "pink"],
        "char": "💗",
        "emojiName": "heartpulse"
      },
      "sparkling_heart": {
        "keywords": ["love", "like", "affection", "valentines"],
        "char": "💖",
        "emojiName": "sparkling_heart"
      },
      "cupid": {
        "keywords": ["love", "like", "heart", "affection", "valentines"],
        "char": "💘",
        "emojiName": "cupid"
      },
      "gift_heart": {
        "keywords": ["love", "valentines"],
        "char": "💝",
        "emojiName": "gift_heart"
      },
      "heart_decoration": {
        "keywords": ["purple-square", "love", "like"],
        "char": "💟",
        "emojiName": "heart_decoration"
      },
      "peace_symbol": {
        "keywords": ["hippie"],
        "char": "☮",
        "emojiName": "peace_symbol"
      },
      "latin_cross": {
        "keywords": ["christianity"],
        "char": "✝",
        "emojiName": "latin_cross"
      },
      "star_and_crescent": {
        "keywords": ["islam"],
        "char": "☪",
        "emojiName": "star_and_crescent"
      },
      "om": {
        "keywords": ["hinduism", "buddhism", "sikhism", "jainism"],
        "char": "🕉",
        "emojiName": "om"
      },
      "wheel_of_dharma": {
        "keywords": ["hinduism", "buddhism", "sikhism", "jainism"],
        "char": "☸",
        "emojiName": "wheel_of_dharma"
      },
      "star_of_david": {
        "keywords": ["judaism"],
        "char": "✡",
        "emojiName": "star_of_david"
      },
      "six_pointed_star": {
        "keywords": ["purple-square", "religion", "jewish", "hexagram"],
        "char": "🔯",
        "emojiName": "six_pointed_star"
      },
      "menorah": {
        "keywords": ["hanukkah", "candles", "jewish"],
        "char": "🕎",
        "emojiName": "menorah"
      },
      "yin_yang": {
        "keywords": ["balance"],
        "char": "☯",
        "emojiName": "yin_yang"
      },
      "orthodox_cross": {
        "keywords": ["suppedaneum", "religion"],
        "char": "☦",
        "emojiName": "orthodox_cross"
      },
      "place_of_worship": {
        "keywords": ["religion", "church", "temple", "prayer"],
        "char": "🛐",
        "emojiName": "place_of_worship"
      },
      "ophiuchus": {
        "keywords": ["sign", "purple-square", "constellation", "astrology"],
        "char": "⛎",
        "emojiName": "ophiuchus"
      },
      "aries": {
        "keywords": ["sign", "purple-square", "zodiac", "astrology"],
        "char": "♈",
        "emojiName": "aries"
      },
      "taurus": {
        "keywords": ["purple-square", "sign", "zodiac", "astrology"],
        "char": "♉",
        "emojiName": "taurus"
      },
      "gemini": {
        "keywords": ["sign", "zodiac", "purple-square", "astrology"],
        "char": "♊",
        "emojiName": "gemini"
      },
      "cancer": {
        "keywords": ["sign", "zodiac", "purple-square", "astrology"],
        "char": "♋",
        "emojiName": "cancer"
      },
      "leo": {
        "keywords": ["sign", "purple-square", "zodiac", "astrology"],
        "char": "♌",
        "emojiName": "leo"
      },
      "virgo": {
        "keywords": ["sign", "zodiac", "purple-square", "astrology"],
        "char": "♍",
        "emojiName": "virgo"
      },
      "libra": {
        "keywords": ["sign", "purple-square", "zodiac", "astrology"],
        "char": "♎",
        "emojiName": "libra"
      },
      "scorpius": {
        "keywords": ["sign", "zodiac", "purple-square", "astrology", "scorpio"],
        "char": "♏",
        "emojiName": "scorpius"
      },
      "sagittarius": {
        "keywords": ["sign", "zodiac", "purple-square", "astrology"],
        "char": "♐",
        "emojiName": "sagittarius"
      },
      "capricorn": {
        "keywords": ["sign", "zodiac", "purple-square", "astrology"],
        "char": "♑",
        "emojiName": "capricorn"
      },
      "aquarius": {
        "keywords": ["sign", "purple-square", "zodiac", "astrology"],
        "char": "♒",
        "emojiName": "aquarius"
      },
      "pisces": {
        "keywords": ["purple-square", "sign", "zodiac", "astrology"],
        "char": "♓",
        "emojiName": "pisces"
      },
      "id": {
        "keywords": ["purple-square", "words"],
        "char": "🆔",
        "emojiName": "id"
      },
      "atom_symbol": {
        "keywords": ["science", "physics", "chemistry"],
        "char": "⚛",
        "emojiName": "atom_symbol"
      },
      "u7a7a": {
        "keywords": ["kanji", "japanese", "chinese", "empty", "sky", "blue-square"],
        "char": "🈳",
        "emojiName": "u7a7a"
      },
      "u5272": {
        "keywords": ["cut", "divide", "chinese", "kanji", "pink-square"],
        "char": "🈹",
        "emojiName": "u5272"
      },
      "radioactive": {
        "keywords": ["nuclear", "danger"],
        "char": "☢",
        "emojiName": "radioactive"
      },
      "biohazard": {
        "keywords": ["danger"],
        "char": "☣",
        "emojiName": "biohazard"
      },
      "mobile_phone_off": {
        "keywords": ["mute", "orange-square", "silence", "quiet"],
        "char": "📴",
        "emojiName": "mobile_phone_off"
      },
      "vibration_mode": {
        "keywords": ["orange-square", "phone"],
        "char": "📳",
        "emojiName": "vibration_mode"
      },
      "u6709": {
        "keywords": ["orange-square", "chinese", "have", "kanji"],
        "char": "🈶",
        "emojiName": "u6709"
      },
      "u7121": {
        "keywords": ["nothing", "chinese", "kanji", "japanese", "orange-square"],
        "char": "🈚",
        "emojiName": "u7121"
      },
      "u7533": {
        "keywords": ["chinese", "japanese", "kanji", "orange-square"],
        "char": "🈸",
        "emojiName": "u7533"
      },
      "u55b6": {
        "keywords": ["japanese", "opening hours", "orange-square"],
        "char": "🈺",
        "emojiName": "u55b6"
      },
      "u6708": {
        "keywords": ["chinese", "month", "moon", "japanese", "orange-square", "kanji"],
        "char": "🈷️",
        "emojiName": "u6708"
      },
      "eight_pointed_black_star": {
        "keywords": ["orange-square", "shape", "polygon"],
        "char": "✴️",
        "emojiName": "eight_pointed_black_star"
      },
      "vs": {
        "keywords": ["words", "orange-square"],
        "char": "🆚",
        "emojiName": "vs"
      },
      "accept": {
        "keywords": ["ok", "good", "chinese", "kanji", "agree", "yes", "orange-circle"],
        "char": "🉑",
        "emojiName": "accept"
      },
      "white_flower": {
        "keywords": ["japanese", "spring"],
        "char": "💮",
        "emojiName": "white_flower"
      },
      "ideograph_advantage": {
        "keywords": ["chinese", "kanji", "obtain", "get", "circle"],
        "char": "🉐",
        "emojiName": "ideograph_advantage"
      },
      "secret": {
        "keywords": ["privacy", "chinese", "sshh", "kanji", "red-circle"],
        "char": "㊙️",
        "emojiName": "secret"
      },
      "congratulations": {
        "keywords": ["chinese", "kanji", "japanese", "red-circle"],
        "char": "㊗️",
        "emojiName": "congratulations"
      },
      "u5408": {
        "keywords": ["japanese", "chinese", "join", "kanji", "red-square"],
        "char": "🈴",
        "emojiName": "u5408"
      },
      "u6e80": {
        "keywords": ["full", "chinese", "japanese", "red-square", "kanji"],
        "char": "🈵",
        "emojiName": "u6e80"
      },
      "u7981": {
        "keywords": ["kanji", "japanese", "chinese", "forbidden", "limit", "restricted", "red-square"],
        "char": "🈲",
        "emojiName": "u7981"
      },
      "a": {
        "keywords": ["red-square", "alphabet", "letter"],
        "char": "🅰️",
        "emojiName": "a"
      },
      "b": {
        "keywords": ["red-square", "alphabet", "letter"],
        "char": "🅱️",
        "emojiName": "b"
      },
      "ab": {
        "keywords": ["red-square", "alphabet"],
        "char": "🆎",
        "emojiName": "ab"
      },
      "cl": {
        "keywords": ["alphabet", "words", "red-square"],
        "char": "🆑",
        "emojiName": "cl"
      },
      "o2": {
        "keywords": ["alphabet", "red-square", "letter"],
        "char": "🅾️",
        "emojiName": "o2"
      },
      "sos": {
        "keywords": ["help", "red-square", "words", "emergency", "911"],
        "char": "🆘",
        "emojiName": "sos"
      },
      "no_entry": {
        "keywords": ["limit", "security", "privacy", "bad", "denied", "stop", "circle"],
        "char": "⛔",
        "emojiName": "no_entry"
      },
      "name_badge": {
        "keywords": ["fire", "forbid"],
        "char": "📛",
        "emojiName": "name_badge"
      },
      "no_entry_sign": {
        "keywords": ["forbid", "stop", "limit", "denied", "disallow", "circle"],
        "char": "🚫",
        "emojiName": "no_entry_sign"
      },
      "x": {
        "keywords": ["no", "delete", "remove", "cancel", "red"],
        "char": "❌",
        "emojiName": "x"
      },
      "o": {
        "keywords": ["circle", "round"],
        "char": "⭕",
        "emojiName": "o"
      },
      "stop_sign": {
        "keywords": ["stop"],
        "char": "🛑",
        "emojiName": "stop_sign"
      },
      "anger": {
        "keywords": ["angry", "mad"],
        "char": "💢",
        "emojiName": "anger"
      },
      "hotsprings": {
        "keywords": ["bath", "warm", "relax"],
        "char": "♨️",
        "emojiName": "hotsprings"
      },
      "no_pedestrians": {
        "keywords": ["rules", "crossing", "walking", "circle"],
        "char": "🚷",
        "emojiName": "no_pedestrians"
      },
      "do_not_litter": {
        "keywords": ["trash", "bin", "garbage", "circle"],
        "char": "🚯",
        "emojiName": "do_not_litter"
      },
      "no_bicycles": {
        "keywords": ["cyclist", "prohibited", "circle"],
        "char": "🚳",
        "emojiName": "no_bicycles"
      },
      "non-potable_water": {
        "keywords": ["drink", "faucet", "tap", "circle"],
        "char": "🚱",
        "emojiName": "non-potable_water"
      },
      "underage": {
        "keywords": ["18", "drink", "pub", "night", "minor", "circle"],
        "char": "🔞",
        "emojiName": "underage"
      },
      "no_mobile_phones": {
        "keywords": ["iphone", "mute", "circle"],
        "char": "📵",
        "emojiName": "no_mobile_phones"
      },
      "exclamation": {
        "keywords": ["heavy_exclamation_mark", "danger", "surprise", "punctuation", "wow", "warning"],
        "char": "❗",
        "emojiName": "exclamation"
      },
      "grey_exclamation": {
        "keywords": ["surprise", "punctuation", "gray", "wow", "warning"],
        "char": "❕",
        "emojiName": "grey_exclamation"
      },
      "question": {
        "keywords": ["doubt", "confused"],
        "char": "❓",
        "emojiName": "question"
      },
      "grey_question": {
        "keywords": ["doubts", "gray", "huh", "confused"],
        "char": "❔",
        "emojiName": "grey_question"
      },
      "bangbang": {
        "keywords": ["exclamation", "surprise"],
        "char": "‼️",
        "emojiName": "bangbang"
      },
      "interrobang": {
        "keywords": ["wat", "punctuation", "surprise"],
        "char": "⁉️",
        "emojiName": "interrobang"
      },
      "low_brightness": {
        "keywords": ["sun", "afternoon", "warm", "summer"],
        "char": "🔅",
        "emojiName": "low_brightness"
      },
      "high_brightness": {
        "keywords": ["sun", "light"],
        "char": "🔆",
        "emojiName": "high_brightness"
      },
      "trident": {
        "keywords": ["weapon", "spear"],
        "char": "🔱",
        "emojiName": "trident"
      },
      "fleur_de_lis": {
        "keywords": ["decorative", "scout"],
        "char": "⚜",
        "emojiName": "fleur_de_lis"
      },
      "part_alternation_mark": {
        "keywords": ["graph", "presentation", "stats", "business", "economics", "bad"],
        "char": "〽️",
        "emojiName": "part_alternation_mark"
      },
      "warning": {
        "keywords": ["exclamation", "wip", "alert", "error", "problem", "issue"],
        "char": "⚠️",
        "emojiName": "warning"
      },
      "children_crossing": {
        "keywords": ["school", "warning", "danger", "sign", "driving", "yellow-diamond"],
        "char": "🚸",
        "emojiName": "children_crossing"
      },
      "beginner": {
        "keywords": ["badge", "shield"],
        "char": "🔰",
        "emojiName": "beginner"
      },
      "recycle": {
        "keywords": ["arrow", "environment", "garbage", "trash"],
        "char": "♻️",
        "emojiName": "recycle"
      },
      "u6307": {
        "keywords": ["chinese", "point", "green-square", "kanji"],
        "char": "🈯",
        "emojiName": "u6307"
      },
      "chart": {
        "keywords": ["green-square", "graph", "presentation", "stats"],
        "char": "💹",
        "emojiName": "chart"
      },
      "sparkle": {
        "keywords": ["stars", "green-square", "awesome", "good", "fireworks"],
        "char": "❇️",
        "emojiName": "sparkle"
      },
      "eight_spoked_asterisk": {
        "keywords": ["star", "sparkle", "green-square"],
        "char": "✳️",
        "emojiName": "eight_spoked_asterisk"
      },
      "negative_squared_cross_mark": {
        "keywords": ["x", "green-square", "no", "deny"],
        "char": "❎",
        "emojiName": "negative_squared_cross_mark"
      },
      "white_check_mark": {
        "keywords": ["green-square", "ok", "agree", "vote", "election", "answer", "tick"],
        "char": "✅",
        "emojiName": "white_check_mark"
      },
      "diamond_shape_with_a_dot_inside": {
        "keywords": ["jewel", "blue", "gem", "crystal", "fancy"],
        "char": "💠",
        "emojiName": "diamond_shape_with_a_dot_inside"
      },
      "cyclone": {
        "keywords": ["weather", "swirl", "blue", "cloud", "vortex", "spiral", "whirlpool", "spin", "tornado", "hurricane", "typhoon"],
        "char": "🌀",
        "emojiName": "cyclone"
      },
      "loop": {
        "keywords": ["tape", "cassette"],
        "char": "➿",
        "emojiName": "loop"
      },
      "globe_with_meridians": {
        "keywords": ["earth", "international", "world", "internet", "interweb", "i18n"],
        "char": "🌐",
        "emojiName": "globe_with_meridians"
      },
      "m": {
        "keywords": ["alphabet", "blue-circle", "letter"],
        "char": "Ⓜ️",
        "emojiName": "m"
      },
      "atm": {
        "keywords": ["money", "sales", "cash", "blue-square", "payment", "bank"],
        "char": "🏧",
        "emojiName": "atm"
      },
      "sa": {
        "keywords": ["japanese", "blue-square", "katakana"],
        "char": "🈂️",
        "emojiName": "sa"
      },
      "passport_control": {
        "keywords": ["custom", "blue-square"],
        "char": "🛂",
        "emojiName": "passport_control"
      },
      "customs": {
        "keywords": ["passport", "border", "blue-square"],
        "char": "🛃",
        "emojiName": "customs"
      },
      "baggage_claim": {
        "keywords": ["blue-square", "airport", "transport"],
        "char": "🛄",
        "emojiName": "baggage_claim"
      },
      "left_luggage": {
        "keywords": ["blue-square", "travel"],
        "char": "🛅",
        "emojiName": "left_luggage"
      },
      "wheelchair": {
        "keywords": ["blue-square", "disabled", "a11y", "accessibility"],
        "char": "♿",
        "emojiName": "wheelchair"
      },
      "no_smoking": {
        "keywords": ["cigarette", "blue-square", "smell", "smoke"],
        "char": "🚭",
        "emojiName": "no_smoking"
      },
      "wc": {
        "keywords": ["toilet", "restroom", "blue-square"],
        "char": "🚾",
        "emojiName": "wc"
      },
      "parking": {
        "keywords": ["cars", "blue-square", "alphabet", "letter"],
        "char": "🅿️",
        "emojiName": "parking"
      },
      "potable_water": {
        "keywords": ["blue-square", "liquid", "restroom", "cleaning", "faucet"],
        "char": "🚰",
        "emojiName": "potable_water"
      },
      "mens": {
        "keywords": ["toilet", "restroom", "wc", "blue-square", "gender", "male"],
        "char": "🚹",
        "emojiName": "mens"
      },
      "womens": {
        "keywords": ["purple-square", "woman", "female", "toilet", "loo", "restroom", "gender"],
        "char": "🚺",
        "emojiName": "womens"
      },
      "baby_symbol": {
        "keywords": ["orange-square", "child"],
        "char": "🚼",
        "emojiName": "baby_symbol"
      },
      "restroom": {
        "keywords": ["blue-square", "toilet", "refresh", "wc", "gender"],
        "char": "🚻",
        "emojiName": "restroom"
      },
      "put_litter_in_its_place": {
        "keywords": ["blue-square", "sign", "human", "info"],
        "char": "🚮",
        "emojiName": "put_litter_in_its_place"
      },
      "cinema": {
        "keywords": ["blue-square", "record", "film", "movie", "curtain", "stage", "theater"],
        "char": "🎦",
        "emojiName": "cinema"
      },
      "signal_strength": {
        "keywords": ["blue-square", "reception", "phone", "internet", "connection", "wifi", "bluetooth", "bars"],
        "char": "📶",
        "emojiName": "signal_strength"
      },
      "koko": {
        "keywords": ["blue-square", "here", "katakana", "japanese", "destination"],
        "char": "🈁",
        "emojiName": "koko"
      },
      "ng": {
        "keywords": ["blue-square", "words", "shape", "icon"],
        "char": "🆖",
        "emojiName": "ng"
      },
      "ok": {
        "keywords": ["good", "agree", "yes", "blue-square"],
        "char": "🆗",
        "emojiName": "ok"
      },
      "up": {
        "keywords": ["blue-square", "above", "high"],
        "char": "🆙",
        "emojiName": "up"
      },
      "cool": {
        "keywords": ["words", "blue-square"],
        "char": "🆒",
        "emojiName": "cool"
      },
      "new": {
        "keywords": ["blue-square", "words", "start"],
        "char": "🆕",
        "emojiName": "new"
      },
      "free": {
        "keywords": ["blue-square", "words"],
        "char": "🆓",
        "emojiName": "free"
      },
      "zero": {
        "keywords": ["0", "numbers", "blue-square", "null"],
        "char": "0️⃣",
        "emojiName": "zero"
      },
      "one": {
        "keywords": ["blue-square", "numbers", "1"],
        "char": "1️⃣",
        "emojiName": "one"
      },
      "two": {
        "keywords": ["numbers", "2", "prime", "blue-square"],
        "char": "2️⃣",
        "emojiName": "two"
      },
      "three": {
        "keywords": ["3", "numbers", "prime", "blue-square"],
        "char": "3️⃣",
        "emojiName": "three"
      },
      "four": {
        "keywords": ["4", "numbers", "blue-square"],
        "char": "4️⃣",
        "emojiName": "four"
      },
      "five": {
        "keywords": ["5", "numbers", "blue-square", "prime"],
        "char": "5️⃣",
        "emojiName": "five"
      },
      "six": {
        "keywords": ["6", "numbers", "blue-square"],
        "char": "6️⃣",
        "emojiName": "six"
      },
      "seven": {
        "keywords": ["7", "numbers", "blue-square", "prime"],
        "char": "7️⃣",
        "emojiName": "seven"
      },
      "eight": {
        "keywords": ["8", "blue-square", "numbers"],
        "char": "8️⃣",
        "emojiName": "eight"
      },
      "nine": {
        "keywords": ["blue-square", "numbers", "9"],
        "char": "9️⃣",
        "emojiName": "nine"
      },
      "keycap_ten": {
        "keywords": ["numbers", "10", "blue-square"],
        "char": "🔟",
        "emojiName": "keycap_ten"
      },
      "asterisk": {
        "keywords": ["star", "keycap"],
        "char": "*⃣",
        "emojiName": "asterisk"
      },
      "eject_button": {
        "keywords": ["blue-square"],
        "char": "⏏️",
        "emojiName": "eject_button"
      },
      "arrow_forward": {
        "keywords": ["blue-square", "right", "direction", "play"],
        "char": "▶️",
        "emojiName": "arrow_forward"
      },
      "pause_button": {
        "keywords": ["pause", "blue-square"],
        "char": "⏸",
        "emojiName": "pause_button"
      },
      "next_track_button": {
        "keywords": ["forward", "next", "blue-square"],
        "char": "⏭",
        "emojiName": "next_track_button"
      },
      "stop_button": {
        "keywords": ["blue-square"],
        "char": "⏹",
        "emojiName": "stop_button"
      },
      "record_button": {
        "keywords": ["blue-square"],
        "char": "⏺",
        "emojiName": "record_button"
      },
      "play_or_pause_button": {
        "keywords": ["blue-square", "play", "pause"],
        "char": "⏯",
        "emojiName": "play_or_pause_button"
      },
      "previous_track_button": {
        "keywords": ["backward"],
        "char": "⏮",
        "emojiName": "previous_track_button"
      },
      "fast_forward": {
        "keywords": ["blue-square", "play", "speed", "continue"],
        "char": "⏩",
        "emojiName": "fast_forward"
      },
      "rewind": {
        "keywords": ["play", "blue-square"],
        "char": "⏪",
        "emojiName": "rewind"
      },
      "twisted_rightwards_arrows": {
        "keywords": ["blue-square", "shuffle", "music", "random"],
        "char": "🔀",
        "emojiName": "twisted_rightwards_arrows"
      },
      "repeat": {
        "keywords": ["loop", "record"],
        "char": "🔁",
        "emojiName": "repeat"
      },
      "repeat_one": {
        "keywords": ["blue-square", "loop"],
        "char": "🔂",
        "emojiName": "repeat_one"
      },
      "arrow_backward": {
        "keywords": ["blue-square", "left", "direction"],
        "char": "◀️",
        "emojiName": "arrow_backward"
      },
      "arrow_up_small": {
        "keywords": ["blue-square", "triangle", "direction", "point", "forward", "top"],
        "char": "🔼",
        "emojiName": "arrow_up_small"
      },
      "arrow_down_small": {
        "keywords": ["blue-square", "direction", "bottom"],
        "char": "🔽",
        "emojiName": "arrow_down_small"
      },
      "arrow_double_up": {
        "keywords": ["blue-square", "direction", "top"],
        "char": "⏫",
        "emojiName": "arrow_double_up"
      },
      "arrow_double_down": {
        "keywords": ["blue-square", "direction", "bottom"],
        "char": "⏬",
        "emojiName": "arrow_double_down"
      },
      "arrow_right": {
        "keywords": ["blue-square", "next"],
        "char": "➡️",
        "emojiName": "arrow_right"
      },
      "arrow_left": {
        "keywords": ["blue-square", "previous", "back"],
        "char": "⬅️",
        "emojiName": "arrow_left"
      },
      "arrow_up": {
        "keywords": ["blue-square", "continue", "top", "direction"],
        "char": "⬆️",
        "emojiName": "arrow_up"
      },
      "arrow_down": {
        "keywords": ["blue-square", "direction", "bottom"],
        "char": "⬇️",
        "emojiName": "arrow_down"
      },
      "arrow_upper_right": {
        "keywords": ["blue-square", "point", "direction", "diagonal", "northeast"],
        "char": "↗️",
        "emojiName": "arrow_upper_right"
      },
      "arrow_lower_right": {
        "keywords": ["blue-square", "direction", "diagonal", "southeast"],
        "char": "↘️",
        "emojiName": "arrow_lower_right"
      },
      "arrow_lower_left": {
        "keywords": ["blue-square", "direction", "diagonal", "southwest"],
        "char": "↙️",
        "emojiName": "arrow_lower_left"
      },
      "arrow_upper_left": {
        "keywords": ["blue-square", "point", "direction", "diagonal", "northwest"],
        "char": "↖️",
        "emojiName": "arrow_upper_left"
      },
      "arrow_up_down": {
        "keywords": ["blue-square", "direction", "way", "vertical"],
        "char": "↕️",
        "emojiName": "arrow_up_down"
      },
      "left_right_arrow": {
        "keywords": ["shape", "direction", "horizontal", "sideways"],
        "char": "↔️",
        "emojiName": "left_right_arrow"
      },
      "arrows_counterclockwise": {
        "keywords": ["blue-square", "sync", "cycle"],
        "char": "🔄",
        "emojiName": "arrows_counterclockwise"
      },
      "arrow_right_hook": {
        "keywords": ["blue-square", "return", "rotate", "direction"],
        "char": "↪️",
        "emojiName": "arrow_right_hook"
      },
      "leftwards_arrow_with_hook": {
        "keywords": ["back", "return", "blue-square", "undo", "enter"],
        "char": "↩️",
        "emojiName": "leftwards_arrow_with_hook"
      },
      "arrow_heading_up": {
        "keywords": ["blue-square", "direction", "top"],
        "char": "⤴️",
        "emojiName": "arrow_heading_up"
      },
      "arrow_heading_down": {
        "keywords": ["blue-square", "direction", "bottom"],
        "char": "⤵️",
        "emojiName": "arrow_heading_down"
      },
      "hash": {
        "keywords": ["symbol", "blue-square", "twitter"],
        "char": "#️⃣",
        "emojiName": "hash"
      },
      "information_source": {
        "keywords": ["blue-square", "alphabet", "letter"],
        "char": "ℹ️",
        "emojiName": "information_source"
      },
      "abc": {
        "keywords": ["blue-square", "alphabet"],
        "char": "🔤",
        "emojiName": "abc"
      },
      "abcd": {
        "keywords": ["blue-square", "alphabet"],
        "char": "🔡",
        "emojiName": "abcd"
      },
      "capital_abcd": {
        "keywords": ["alphabet", "words", "blue-square"],
        "char": "🔠",
        "emojiName": "capital_abcd"
      },
      "symbols": {
        "keywords": ["blue-square", "music", "note", "ampersand", "percent", "glyphs", "characters"],
        "char": "🔣",
        "emojiName": "symbols"
      },
      "musical_note": {
        "keywords": ["score", "tone", "sound"],
        "char": "🎵",
        "emojiName": "musical_note"
      },
      "notes": {
        "keywords": ["music", "score"],
        "char": "🎶",
        "emojiName": "notes"
      },
      "wavy_dash": {
        "keywords": ["draw", "line", "moustache", "mustache", "squiggle", "scribble"],
        "char": "〰️",
        "emojiName": "wavy_dash"
      },
      "curly_loop": {
        "keywords": ["scribble", "draw", "shape", "squiggle"],
        "char": "➰",
        "emojiName": "curly_loop"
      },
      "heavy_check_mark": {
        "keywords": ["ok", "nike", "answer", "yes", "tick"],
        "char": "✔️",
        "emojiName": "heavy_check_mark"
      },
      "arrows_clockwise": {
        "keywords": ["sync", "cycle", "round", "repeat"],
        "char": "🔃",
        "emojiName": "arrows_clockwise"
      },
      "heavy_plus_sign": {
        "keywords": ["math", "calculation", "addition", "more", "increase"],
        "char": "➕",
        "emojiName": "heavy_plus_sign"
      },
      "heavy_minus_sign": {
        "keywords": ["math", "calculation", "subtract", "less"],
        "char": "➖",
        "emojiName": "heavy_minus_sign"
      },
      "heavy_division_sign": {
        "keywords": ["divide", "math", "calculation"],
        "char": "➗",
        "emojiName": "heavy_division_sign"
      },
      "heavy_multiplication_x": {
        "keywords": ["math", "calculation"],
        "char": "✖️",
        "emojiName": "heavy_multiplication_x"
      },
      "infinity": {
        "keywords": ["forever"],
        "char": "♾",
        "emojiName": "infinity"
      },
      "heavy_dollar_sign": {
        "keywords": ["money", "sales", "payment", "currency", "buck"],
        "char": "💲",
        "emojiName": "heavy_dollar_sign"
      },
      "currency_exchange": {
        "keywords": ["money", "sales", "dollar", "travel"],
        "char": "💱",
        "emojiName": "currency_exchange"
      },
      "copyright": {
        "keywords": ["ip", "license", "circle", "law", "legal"],
        "char": "©️",
        "emojiName": "copyright"
      },
      "registered": {
        "keywords": ["alphabet", "circle"],
        "char": "®️",
        "emojiName": "registered"
      },
      "tm": {
        "keywords": ["trademark", "brand", "law", "legal"],
        "char": "™️",
        "emojiName": "tm"
      },
      "end": {
        "keywords": ["words", "arrow"],
        "char": "🔚",
        "emojiName": "end"
      },
      "back": {
        "keywords": ["arrow", "words", "return"],
        "char": "🔙",
        "emojiName": "back"
      },
      "on": {
        "keywords": ["arrow", "words"],
        "char": "🔛",
        "emojiName": "on"
      },
      "top": {
        "keywords": ["words", "blue-square"],
        "char": "🔝",
        "emojiName": "top"
      },
      "soon": {
        "keywords": ["arrow", "words"],
        "char": "🔜",
        "emojiName": "soon"
      },
      "ballot_box_with_check": {
        "keywords": ["ok", "agree", "confirm", "black-square", "vote", "election", "yes", "tick"],
        "char": "☑️",
        "emojiName": "ballot_box_with_check"
      },
      "radio_button": {
        "keywords": ["input", "old", "music", "circle"],
        "char": "🔘",
        "emojiName": "radio_button"
      },
      "white_circle": {
        "keywords": ["shape", "round"],
        "char": "⚪",
        "emojiName": "white_circle"
      },
      "black_circle": {
        "keywords": ["shape", "button", "round"],
        "char": "⚫",
        "emojiName": "black_circle"
      },
      "red_circle": {
        "keywords": ["shape", "error", "danger"],
        "char": "🔴",
        "emojiName": "red_circle"
      },
      "large_blue_circle": {
        "keywords": ["shape", "icon", "button"],
        "char": "🔵",
        "emojiName": "large_blue_circle"
      },
      "small_orange_diamond": {
        "keywords": ["shape", "jewel", "gem"],
        "char": "🔸",
        "emojiName": "small_orange_diamond"
      },
      "small_blue_diamond": {
        "keywords": ["shape", "jewel", "gem"],
        "char": "🔹",
        "emojiName": "small_blue_diamond"
      },
      "large_orange_diamond": {
        "keywords": ["shape", "jewel", "gem"],
        "char": "🔶",
        "emojiName": "large_orange_diamond"
      },
      "large_blue_diamond": {
        "keywords": ["shape", "jewel", "gem"],
        "char": "🔷",
        "emojiName": "large_blue_diamond"
      },
      "small_red_triangle": {
        "keywords": ["shape", "direction", "up", "top"],
        "char": "🔺",
        "emojiName": "small_red_triangle"
      },
      "black_small_square": {
        "keywords": ["shape", "icon"],
        "char": "▪️",
        "emojiName": "black_small_square"
      },
      "white_small_square": {
        "keywords": ["shape", "icon"],
        "char": "▫️",
        "emojiName": "white_small_square"
      },
      "black_large_square": {
        "keywords": ["shape", "icon", "button"],
        "char": "⬛",
        "emojiName": "black_large_square"
      },
      "white_large_square": {
        "keywords": ["shape", "icon", "stone", "button"],
        "char": "⬜",
        "emojiName": "white_large_square"
      },
      "small_red_triangle_down": {
        "keywords": ["shape", "direction", "bottom"],
        "char": "🔻",
        "emojiName": "small_red_triangle_down"
      },
      "black_medium_square": {
        "keywords": ["shape", "button", "icon"],
        "char": "◼️",
        "emojiName": "black_medium_square"
      },
      "white_medium_square": {
        "keywords": ["shape", "stone", "icon"],
        "char": "◻️",
        "emojiName": "white_medium_square"
      },
      "black_medium_small_square": {
        "keywords": ["icon", "shape", "button"],
        "char": "◾",
        "emojiName": "black_medium_small_square"
      },
      "white_medium_small_square": {
        "keywords": ["shape", "stone", "icon", "button"],
        "char": "◽",
        "emojiName": "white_medium_small_square"
      },
      "black_square_button": {
        "keywords": ["shape", "input", "frame"],
        "char": "🔲",
        "emojiName": "black_square_button"
      },
      "white_square_button": {
        "keywords": ["shape", "input"],
        "char": "🔳",
        "emojiName": "white_square_button"
      },
      "speaker": {
        "keywords": ["sound", "volume", "silence", "broadcast"],
        "char": "🔈",
        "emojiName": "speaker"
      },
      "sound": {
        "keywords": ["volume", "speaker", "broadcast"],
        "char": "🔉",
        "emojiName": "sound"
      },
      "loud_sound": {
        "keywords": ["volume", "noise", "noisy", "speaker", "broadcast"],
        "char": "🔊",
        "emojiName": "loud_sound"
      },
      "mute": {
        "keywords": ["sound", "volume", "silence", "quiet"],
        "char": "🔇",
        "emojiName": "mute"
      },
      "mega": {
        "keywords": ["sound", "speaker", "volume"],
        "char": "📣",
        "emojiName": "mega"
      },
      "loudspeaker": {
        "keywords": ["volume", "sound"],
        "char": "📢",
        "emojiName": "loudspeaker"
      },
      "bell": {
        "keywords": ["sound", "notification", "christmas", "xmas", "chime"],
        "char": "🔔",
        "emojiName": "bell"
      },
      "no_bell": {
        "keywords": ["sound", "volume", "mute", "quiet", "silent"],
        "char": "🔕",
        "emojiName": "no_bell"
      },
      "black_joker": {
        "keywords": ["poker", "cards", "game", "play", "magic"],
        "char": "🃏",
        "emojiName": "black_joker"
      },
      "mahjong": {
        "keywords": ["game", "play", "chinese", "kanji"],
        "char": "🀄",
        "emojiName": "mahjong"
      },
      "spades": {
        "keywords": ["poker", "cards", "suits", "magic"],
        "char": "♠️",
        "emojiName": "spades"
      },
      "clubs": {
        "keywords": ["poker", "cards", "magic", "suits"],
        "char": "♣️",
        "emojiName": "clubs"
      },
      "hearts": {
        "keywords": ["poker", "cards", "magic", "suits"],
        "char": "♥️",
        "emojiName": "hearts"
      },
      "diamonds": {
        "keywords": ["poker", "cards", "magic", "suits"],
        "char": "♦️",
        "emojiName": "diamonds"
      },
      "flower_playing_cards": {
        "keywords": ["game", "sunset", "red"],
        "char": "🎴",
        "emojiName": "flower_playing_cards"
      },
      "thought_balloon": {
        "keywords": ["bubble", "cloud", "speech", "thinking", "dream"],
        "char": "💭",
        "emojiName": "thought_balloon"
      },
      "right_anger_bubble": {
        "keywords": ["caption", "speech", "thinking", "mad"],
        "char": "🗯",
        "emojiName": "right_anger_bubble"
      },
      "speech_balloon": {
        "keywords": ["bubble", "words", "message", "talk", "chatting"],
        "char": "💬",
        "emojiName": "speech_balloon"
      },
      "left_speech_bubble": {
        "keywords": ["words", "message", "talk", "chatting"],
        "char": "🗨",
        "emojiName": "left_speech_bubble"
      },
      "clock1": {
        "keywords": ["time", "late", "early", "schedule"],
        "char": "🕐",
        "emojiName": "clock1"
      },
      "clock2": {
        "keywords": ["time", "late", "early", "schedule"],
        "char": "🕑",
        "emojiName": "clock2"
      },
      "clock3": {
        "keywords": ["time", "late", "early", "schedule"],
        "char": "🕒",
        "emojiName": "clock3"
      },
      "clock4": {
        "keywords": ["time", "late", "early", "schedule"],
        "char": "🕓",
        "emojiName": "clock4"
      },
      "clock5": {
        "keywords": ["time", "late", "early", "schedule"],
        "char": "🕔",
        "emojiName": "clock5"
      },
      "clock6": {
        "keywords": ["time", "late", "early", "schedule", "dawn", "dusk"],
        "char": "🕕",
        "emojiName": "clock6"
      },
      "clock7": {
        "keywords": ["time", "late", "early", "schedule"],
        "char": "🕖",
        "emojiName": "clock7"
      },
      "clock8": {
        "keywords": ["time", "late", "early", "schedule"],
        "char": "🕗",
        "emojiName": "clock8"
      },
      "clock9": {
        "keywords": ["time", "late", "early", "schedule"],
        "char": "🕘",
        "emojiName": "clock9"
      },
      "clock10": {
        "keywords": ["time", "late", "early", "schedule"],
        "char": "🕙",
        "emojiName": "clock10"
      },
      "clock11": {
        "keywords": ["time", "late", "early", "schedule"],
        "char": "🕚",
        "emojiName": "clock11"
      },
      "clock12": {
        "keywords": ["time", "noon", "midnight", "midday", "late", "early", "schedule"],
        "char": "🕛",
        "emojiName": "clock12"
      },
      "clock130": {
        "keywords": ["time", "late", "early", "schedule"],
        "char": "🕜",
        "emojiName": "clock130"
      },
      "clock230": {
        "keywords": ["time", "late", "early", "schedule"],
        "char": "🕝",
        "emojiName": "clock230"
      },
      "clock330": {
        "keywords": ["time", "late", "early", "schedule"],
        "char": "🕞",
        "emojiName": "clock330"
      },
      "clock430": {
        "keywords": ["time", "late", "early", "schedule"],
        "char": "🕟",
        "emojiName": "clock430"
      },
      "clock530": {
        "keywords": ["time", "late", "early", "schedule"],
        "char": "🕠",
        "emojiName": "clock530"
      },
      "clock630": {
        "keywords": ["time", "late", "early", "schedule"],
        "char": "🕡",
        "emojiName": "clock630"
      },
      "clock730": {
        "keywords": ["time", "late", "early", "schedule"],
        "char": "🕢",
        "emojiName": "clock730"
      },
      "clock830": {
        "keywords": ["time", "late", "early", "schedule"],
        "char": "🕣",
        "emojiName": "clock830"
      },
      "clock930": {
        "keywords": ["time", "late", "early", "schedule"],
        "char": "🕤",
        "emojiName": "clock930"
      },
      "clock1030": {
        "keywords": ["time", "late", "early", "schedule"],
        "char": "🕥",
        "emojiName": "clock1030"
      },
      "clock1130": {
        "keywords": ["time", "late", "early", "schedule"],
        "char": "🕦",
        "emojiName": "clock1130"
      },
      "clock1230": {
        "keywords": ["time", "late", "early", "schedule"],
        "char": "🕧",
        "emojiName": "clock1230"
      }
    }
  }
}, {
  "flags": {
    "id": "flags",
    "name": "Flags",
    "symbol": _flags.default,
    "emojis": {
      "afghanistan": {
        "keywords": ["af", "flag", "nation", "country", "banner"],
        "char": "🇦🇫",
        "emojiName": "afghanistan"
      },
      "aland_islands": {
        "keywords": ["Åland", "islands", "flag", "nation", "country", "banner"],
        "char": "🇦🇽",
        "emojiName": "aland_islands"
      },
      "albania": {
        "keywords": ["al", "flag", "nation", "country", "banner"],
        "char": "🇦🇱",
        "emojiName": "albania"
      },
      "algeria": {
        "keywords": ["dz", "flag", "nation", "country", "banner"],
        "char": "🇩🇿",
        "emojiName": "algeria"
      },
      "american_samoa": {
        "keywords": ["american", "ws", "flag", "nation", "country", "banner"],
        "char": "🇦🇸",
        "emojiName": "american_samoa"
      },
      "andorra": {
        "keywords": ["ad", "flag", "nation", "country", "banner"],
        "char": "🇦🇩",
        "emojiName": "andorra"
      },
      "angola": {
        "keywords": ["ao", "flag", "nation", "country", "banner"],
        "char": "🇦🇴",
        "emojiName": "angola"
      },
      "anguilla": {
        "keywords": ["ai", "flag", "nation", "country", "banner"],
        "char": "🇦🇮",
        "emojiName": "anguilla"
      },
      "antarctica": {
        "keywords": ["aq", "flag", "nation", "country", "banner"],
        "char": "🇦🇶",
        "emojiName": "antarctica"
      },
      "antigua_barbuda": {
        "keywords": ["antigua", "barbuda", "flag", "nation", "country", "banner"],
        "char": "🇦🇬",
        "emojiName": "antigua_barbuda"
      },
      "argentina": {
        "keywords": ["ar", "flag", "nation", "country", "banner"],
        "char": "🇦🇷",
        "emojiName": "argentina"
      },
      "armenia": {
        "keywords": ["am", "flag", "nation", "country", "banner"],
        "char": "🇦🇲",
        "emojiName": "armenia"
      },
      "aruba": {
        "keywords": ["aw", "flag", "nation", "country", "banner"],
        "char": "🇦🇼",
        "emojiName": "aruba"
      },
      "australia": {
        "keywords": ["au", "flag", "nation", "country", "banner"],
        "char": "🇦🇺",
        "emojiName": "australia"
      },
      "austria": {
        "keywords": ["at", "flag", "nation", "country", "banner"],
        "char": "🇦🇹",
        "emojiName": "austria"
      },
      "azerbaijan": {
        "keywords": ["az", "flag", "nation", "country", "banner"],
        "char": "🇦🇿",
        "emojiName": "azerbaijan"
      },
      "bahamas": {
        "keywords": ["bs", "flag", "nation", "country", "banner"],
        "char": "🇧🇸",
        "emojiName": "bahamas"
      },
      "bahrain": {
        "keywords": ["bh", "flag", "nation", "country", "banner"],
        "char": "🇧🇭",
        "emojiName": "bahrain"
      },
      "bangladesh": {
        "keywords": ["bd", "flag", "nation", "country", "banner"],
        "char": "🇧🇩",
        "emojiName": "bangladesh"
      },
      "barbados": {
        "keywords": ["bb", "flag", "nation", "country", "banner"],
        "char": "🇧🇧",
        "emojiName": "barbados"
      },
      "belarus": {
        "keywords": ["by", "flag", "nation", "country", "banner"],
        "char": "🇧🇾",
        "emojiName": "belarus"
      },
      "belgium": {
        "keywords": ["be", "flag", "nation", "country", "banner"],
        "char": "🇧🇪",
        "emojiName": "belgium"
      },
      "belize": {
        "keywords": ["bz", "flag", "nation", "country", "banner"],
        "char": "🇧🇿",
        "emojiName": "belize"
      },
      "benin": {
        "keywords": ["bj", "flag", "nation", "country", "banner"],
        "char": "🇧🇯",
        "emojiName": "benin"
      },
      "bermuda": {
        "keywords": ["bm", "flag", "nation", "country", "banner"],
        "char": "🇧🇲",
        "emojiName": "bermuda"
      },
      "bhutan": {
        "keywords": ["bt", "flag", "nation", "country", "banner"],
        "char": "🇧🇹",
        "emojiName": "bhutan"
      },
      "bolivia": {
        "keywords": ["bo", "flag", "nation", "country", "banner"],
        "char": "🇧🇴",
        "emojiName": "bolivia"
      },
      "caribbean_netherlands": {
        "keywords": ["bonaire", "flag", "nation", "country", "banner"],
        "char": "🇧🇶",
        "emojiName": "caribbean_netherlands"
      },
      "bosnia_herzegovina": {
        "keywords": ["bosnia", "herzegovina", "flag", "nation", "country", "banner"],
        "char": "🇧🇦",
        "emojiName": "bosnia_herzegovina"
      },
      "botswana": {
        "keywords": ["bw", "flag", "nation", "country", "banner"],
        "char": "🇧🇼",
        "emojiName": "botswana"
      },
      "brazil": {
        "keywords": ["br", "flag", "nation", "country", "banner"],
        "char": "🇧🇷",
        "emojiName": "brazil"
      },
      "british_indian_ocean_territory": {
        "keywords": ["british", "indian", "ocean", "territory", "flag", "nation", "country", "banner"],
        "char": "🇮🇴",
        "emojiName": "british_indian_ocean_territory"
      },
      "british_virgin_islands": {
        "keywords": ["british", "virgin", "islands", "bvi", "flag", "nation", "country", "banner"],
        "char": "🇻🇬",
        "emojiName": "british_virgin_islands"
      },
      "brunei": {
        "keywords": ["bn", "darussalam", "flag", "nation", "country", "banner"],
        "char": "🇧🇳",
        "emojiName": "brunei"
      },
      "bulgaria": {
        "keywords": ["bg", "flag", "nation", "country", "banner"],
        "char": "🇧🇬",
        "emojiName": "bulgaria"
      },
      "burkina_faso": {
        "keywords": ["burkina", "faso", "flag", "nation", "country", "banner"],
        "char": "🇧🇫",
        "emojiName": "burkina_faso"
      },
      "burundi": {
        "keywords": ["bi", "flag", "nation", "country", "banner"],
        "char": "🇧🇮",
        "emojiName": "burundi"
      },
      "cape_verde": {
        "keywords": ["cabo", "verde", "flag", "nation", "country", "banner"],
        "char": "🇨🇻",
        "emojiName": "cape_verde"
      },
      "cambodia": {
        "keywords": ["kh", "flag", "nation", "country", "banner"],
        "char": "🇰🇭",
        "emojiName": "cambodia"
      },
      "cameroon": {
        "keywords": ["cm", "flag", "nation", "country", "banner"],
        "char": "🇨🇲",
        "emojiName": "cameroon"
      },
      "canada": {
        "keywords": ["ca", "flag", "nation", "country", "banner"],
        "char": "🇨🇦",
        "emojiName": "canada"
      },
      "canary_islands": {
        "keywords": ["canary", "islands", "flag", "nation", "country", "banner"],
        "char": "🇮🇨",
        "emojiName": "canary_islands"
      },
      "cayman_islands": {
        "keywords": ["cayman", "islands", "flag", "nation", "country", "banner"],
        "char": "🇰🇾",
        "emojiName": "cayman_islands"
      },
      "central_african_republic": {
        "keywords": ["central", "african", "republic", "flag", "nation", "country", "banner"],
        "char": "🇨🇫",
        "emojiName": "central_african_republic"
      },
      "chad": {
        "keywords": ["td", "flag", "nation", "country", "banner"],
        "char": "🇹🇩",
        "emojiName": "chad"
      },
      "chile": {
        "keywords": ["flag", "nation", "country", "banner"],
        "char": "🇨🇱",
        "emojiName": "chile"
      },
      "cn": {
        "keywords": ["china", "chinese", "prc", "flag", "country", "nation", "banner"],
        "char": "🇨🇳",
        "emojiName": "cn"
      },
      "christmas_island": {
        "keywords": ["christmas", "island", "flag", "nation", "country", "banner"],
        "char": "🇨🇽",
        "emojiName": "christmas_island"
      },
      "cocos_islands": {
        "keywords": ["cocos", "keeling", "islands", "flag", "nation", "country", "banner"],
        "char": "🇨🇨",
        "emojiName": "cocos_islands"
      },
      "colombia": {
        "keywords": ["co", "flag", "nation", "country", "banner"],
        "char": "🇨🇴",
        "emojiName": "colombia"
      },
      "comoros": {
        "keywords": ["km", "flag", "nation", "country", "banner"],
        "char": "🇰🇲",
        "emojiName": "comoros"
      },
      "congo_brazzaville": {
        "keywords": ["congo", "flag", "nation", "country", "banner"],
        "char": "🇨🇬",
        "emojiName": "congo_brazzaville"
      },
      "congo_kinshasa": {
        "keywords": ["congo", "democratic", "republic", "flag", "nation", "country", "banner"],
        "char": "🇨🇩",
        "emojiName": "congo_kinshasa"
      },
      "cook_islands": {
        "keywords": ["cook", "islands", "flag", "nation", "country", "banner"],
        "char": "🇨🇰",
        "emojiName": "cook_islands"
      },
      "costa_rica": {
        "keywords": ["costa", "rica", "flag", "nation", "country", "banner"],
        "char": "🇨🇷",
        "emojiName": "costa_rica"
      },
      "croatia": {
        "keywords": ["hr", "flag", "nation", "country", "banner"],
        "char": "🇭🇷",
        "emojiName": "croatia"
      },
      "cuba": {
        "keywords": ["cu", "flag", "nation", "country", "banner"],
        "char": "🇨🇺",
        "emojiName": "cuba"
      },
      "curacao": {
        "keywords": ["curaçao", "flag", "nation", "country", "banner"],
        "char": "🇨🇼",
        "emojiName": "curacao"
      },
      "cyprus": {
        "keywords": ["cy", "flag", "nation", "country", "banner"],
        "char": "🇨🇾",
        "emojiName": "cyprus"
      },
      "czech_republic": {
        "keywords": ["cz", "flag", "nation", "country", "banner"],
        "char": "🇨🇿",
        "emojiName": "czech_republic"
      },
      "denmark": {
        "keywords": ["dk", "flag", "nation", "country", "banner"],
        "char": "🇩🇰",
        "emojiName": "denmark"
      },
      "djibouti": {
        "keywords": ["dj", "flag", "nation", "country", "banner"],
        "char": "🇩🇯",
        "emojiName": "djibouti"
      },
      "dominica": {
        "keywords": ["dm", "flag", "nation", "country", "banner"],
        "char": "🇩🇲",
        "emojiName": "dominica"
      },
      "dominican_republic": {
        "keywords": ["dominican", "republic", "flag", "nation", "country", "banner"],
        "char": "🇩🇴",
        "emojiName": "dominican_republic"
      },
      "ecuador": {
        "keywords": ["ec", "flag", "nation", "country", "banner"],
        "char": "🇪🇨",
        "emojiName": "ecuador"
      },
      "egypt": {
        "keywords": ["eg", "flag", "nation", "country", "banner"],
        "char": "🇪🇬",
        "emojiName": "egypt"
      },
      "el_salvador": {
        "keywords": ["el", "salvador", "flag", "nation", "country", "banner"],
        "char": "🇸🇻",
        "emojiName": "el_salvador"
      },
      "equatorial_guinea": {
        "keywords": ["equatorial", "gn", "flag", "nation", "country", "banner"],
        "char": "🇬🇶",
        "emojiName": "equatorial_guinea"
      },
      "eritrea": {
        "keywords": ["er", "flag", "nation", "country", "banner"],
        "char": "🇪🇷",
        "emojiName": "eritrea"
      },
      "estonia": {
        "keywords": ["ee", "flag", "nation", "country", "banner"],
        "char": "🇪🇪",
        "emojiName": "estonia"
      },
      "ethiopia": {
        "keywords": ["et", "flag", "nation", "country", "banner"],
        "char": "🇪🇹",
        "emojiName": "ethiopia"
      },
      "eu": {
        "keywords": ["european", "union", "flag", "banner"],
        "char": "🇪🇺",
        "emojiName": "eu"
      },
      "falkland_islands": {
        "keywords": ["falkland", "islands", "malvinas", "flag", "nation", "country", "banner"],
        "char": "🇫🇰",
        "emojiName": "falkland_islands"
      },
      "faroe_islands": {
        "keywords": ["faroe", "islands", "flag", "nation", "country", "banner"],
        "char": "🇫🇴",
        "emojiName": "faroe_islands"
      },
      "fiji": {
        "keywords": ["fj", "flag", "nation", "country", "banner"],
        "char": "🇫🇯",
        "emojiName": "fiji"
      },
      "finland": {
        "keywords": ["fi", "flag", "nation", "country", "banner"],
        "char": "🇫🇮",
        "emojiName": "finland"
      },
      "fr": {
        "keywords": ["banner", "flag", "nation", "france", "french", "country"],
        "char": "🇫🇷",
        "emojiName": "fr"
      },
      "french_guiana": {
        "keywords": ["french", "guiana", "flag", "nation", "country", "banner"],
        "char": "🇬🇫",
        "emojiName": "french_guiana"
      },
      "french_polynesia": {
        "keywords": ["french", "polynesia", "flag", "nation", "country", "banner"],
        "char": "🇵🇫",
        "emojiName": "french_polynesia"
      },
      "french_southern_territories": {
        "keywords": ["french", "southern", "territories", "flag", "nation", "country", "banner"],
        "char": "🇹🇫",
        "emojiName": "french_southern_territories"
      },
      "gabon": {
        "keywords": ["ga", "flag", "nation", "country", "banner"],
        "char": "🇬🇦",
        "emojiName": "gabon"
      },
      "gambia": {
        "keywords": ["gm", "flag", "nation", "country", "banner"],
        "char": "🇬🇲",
        "emojiName": "gambia"
      },
      "georgia": {
        "keywords": ["ge", "flag", "nation", "country", "banner"],
        "char": "🇬🇪",
        "emojiName": "georgia"
      },
      "de": {
        "keywords": ["german", "nation", "flag", "country", "banner"],
        "char": "🇩🇪",
        "emojiName": "de"
      },
      "ghana": {
        "keywords": ["gh", "flag", "nation", "country", "banner"],
        "char": "🇬🇭",
        "emojiName": "ghana"
      },
      "gibraltar": {
        "keywords": ["gi", "flag", "nation", "country", "banner"],
        "char": "🇬🇮",
        "emojiName": "gibraltar"
      },
      "greece": {
        "keywords": ["gr", "flag", "nation", "country", "banner"],
        "char": "🇬🇷",
        "emojiName": "greece"
      },
      "greenland": {
        "keywords": ["gl", "flag", "nation", "country", "banner"],
        "char": "🇬🇱",
        "emojiName": "greenland"
      },
      "grenada": {
        "keywords": ["gd", "flag", "nation", "country", "banner"],
        "char": "🇬🇩",
        "emojiName": "grenada"
      },
      "guadeloupe": {
        "keywords": ["gp", "flag", "nation", "country", "banner"],
        "char": "🇬🇵",
        "emojiName": "guadeloupe"
      },
      "guam": {
        "keywords": ["gu", "flag", "nation", "country", "banner"],
        "char": "🇬🇺",
        "emojiName": "guam"
      },
      "guatemala": {
        "keywords": ["gt", "flag", "nation", "country", "banner"],
        "char": "🇬🇹",
        "emojiName": "guatemala"
      },
      "guernsey": {
        "keywords": ["gg", "flag", "nation", "country", "banner"],
        "char": "🇬🇬",
        "emojiName": "guernsey"
      },
      "guinea": {
        "keywords": ["gn", "flag", "nation", "country", "banner"],
        "char": "🇬🇳",
        "emojiName": "guinea"
      },
      "guinea_bissau": {
        "keywords": ["gw", "bissau", "flag", "nation", "country", "banner"],
        "char": "🇬🇼",
        "emojiName": "guinea_bissau"
      },
      "guyana": {
        "keywords": ["gy", "flag", "nation", "country", "banner"],
        "char": "🇬🇾",
        "emojiName": "guyana"
      },
      "haiti": {
        "keywords": ["ht", "flag", "nation", "country", "banner"],
        "char": "🇭🇹",
        "emojiName": "haiti"
      },
      "honduras": {
        "keywords": ["hn", "flag", "nation", "country", "banner"],
        "char": "🇭🇳",
        "emojiName": "honduras"
      },
      "hong_kong": {
        "keywords": ["hong", "kong", "flag", "nation", "country", "banner"],
        "char": "🇭🇰",
        "emojiName": "hong_kong"
      },
      "hungary": {
        "keywords": ["hu", "flag", "nation", "country", "banner"],
        "char": "🇭🇺",
        "emojiName": "hungary"
      },
      "iceland": {
        "keywords": ["is", "flag", "nation", "country", "banner"],
        "char": "🇮🇸",
        "emojiName": "iceland"
      },
      "india": {
        "keywords": ["in", "flag", "nation", "country", "banner"],
        "char": "🇮🇳",
        "emojiName": "india"
      },
      "indonesia": {
        "keywords": ["flag", "nation", "country", "banner"],
        "char": "🇮🇩",
        "emojiName": "indonesia"
      },
      "iran": {
        "keywords": ["iran,", "islamic", "republic", "flag", "nation", "country", "banner"],
        "char": "🇮🇷",
        "emojiName": "iran"
      },
      "iraq": {
        "keywords": ["iq", "flag", "nation", "country", "banner"],
        "char": "🇮🇶",
        "emojiName": "iraq"
      },
      "ireland": {
        "keywords": ["ie", "flag", "nation", "country", "banner"],
        "char": "🇮🇪",
        "emojiName": "ireland"
      },
      "isle_of_man": {
        "keywords": ["isle", "man", "flag", "nation", "country", "banner"],
        "char": "🇮🇲",
        "emojiName": "isle_of_man"
      },
      "israel": {
        "keywords": ["il", "flag", "nation", "country", "banner"],
        "char": "🇮🇱",
        "emojiName": "israel"
      },
      "it": {
        "keywords": ["italy", "flag", "nation", "country", "banner"],
        "char": "🇮🇹",
        "emojiName": "it"
      },
      "cote_divoire": {
        "keywords": ["ivory", "coast", "flag", "nation", "country", "banner"],
        "char": "🇨🇮",
        "emojiName": "cote_divoire"
      },
      "jamaica": {
        "keywords": ["jm", "flag", "nation", "country", "banner"],
        "char": "🇯🇲",
        "emojiName": "jamaica"
      },
      "jp": {
        "keywords": ["japanese", "nation", "flag", "country", "banner"],
        "char": "🇯🇵",
        "emojiName": "jp"
      },
      "jersey": {
        "keywords": ["je", "flag", "nation", "country", "banner"],
        "char": "🇯🇪",
        "emojiName": "jersey"
      },
      "jordan": {
        "keywords": ["jo", "flag", "nation", "country", "banner"],
        "char": "🇯🇴",
        "emojiName": "jordan"
      },
      "kazakhstan": {
        "keywords": ["kz", "flag", "nation", "country", "banner"],
        "char": "🇰🇿",
        "emojiName": "kazakhstan"
      },
      "kenya": {
        "keywords": ["ke", "flag", "nation", "country", "banner"],
        "char": "🇰🇪",
        "emojiName": "kenya"
      },
      "kiribati": {
        "keywords": ["ki", "flag", "nation", "country", "banner"],
        "char": "🇰🇮",
        "emojiName": "kiribati"
      },
      "kosovo": {
        "keywords": ["xk", "flag", "nation", "country", "banner"],
        "char": "🇽🇰",
        "emojiName": "kosovo"
      },
      "kuwait": {
        "keywords": ["kw", "flag", "nation", "country", "banner"],
        "char": "🇰🇼",
        "emojiName": "kuwait"
      },
      "kyrgyzstan": {
        "keywords": ["kg", "flag", "nation", "country", "banner"],
        "char": "🇰🇬",
        "emojiName": "kyrgyzstan"
      },
      "laos": {
        "keywords": ["lao", "democratic", "republic", "flag", "nation", "country", "banner"],
        "char": "🇱🇦",
        "emojiName": "laos"
      },
      "latvia": {
        "keywords": ["lv", "flag", "nation", "country", "banner"],
        "char": "🇱🇻",
        "emojiName": "latvia"
      },
      "lebanon": {
        "keywords": ["lb", "flag", "nation", "country", "banner"],
        "char": "🇱🇧",
        "emojiName": "lebanon"
      },
      "lesotho": {
        "keywords": ["ls", "flag", "nation", "country", "banner"],
        "char": "🇱🇸",
        "emojiName": "lesotho"
      },
      "liberia": {
        "keywords": ["lr", "flag", "nation", "country", "banner"],
        "char": "🇱🇷",
        "emojiName": "liberia"
      },
      "libya": {
        "keywords": ["ly", "flag", "nation", "country", "banner"],
        "char": "🇱🇾",
        "emojiName": "libya"
      },
      "liechtenstein": {
        "keywords": ["li", "flag", "nation", "country", "banner"],
        "char": "🇱🇮",
        "emojiName": "liechtenstein"
      },
      "lithuania": {
        "keywords": ["lt", "flag", "nation", "country", "banner"],
        "char": "🇱🇹",
        "emojiName": "lithuania"
      },
      "luxembourg": {
        "keywords": ["lu", "flag", "nation", "country", "banner"],
        "char": "🇱🇺",
        "emojiName": "luxembourg"
      },
      "macau": {
        "keywords": ["macao", "flag", "nation", "country", "banner"],
        "char": "🇲🇴",
        "emojiName": "macau"
      },
      "macedonia": {
        "keywords": ["macedonia,", "flag", "nation", "country", "banner"],
        "char": "🇲🇰",
        "emojiName": "macedonia"
      },
      "madagascar": {
        "keywords": ["mg", "flag", "nation", "country", "banner"],
        "char": "🇲🇬",
        "emojiName": "madagascar"
      },
      "malawi": {
        "keywords": ["mw", "flag", "nation", "country", "banner"],
        "char": "🇲🇼",
        "emojiName": "malawi"
      },
      "malaysia": {
        "keywords": ["my", "flag", "nation", "country", "banner"],
        "char": "🇲🇾",
        "emojiName": "malaysia"
      },
      "maldives": {
        "keywords": ["mv", "flag", "nation", "country", "banner"],
        "char": "🇲🇻",
        "emojiName": "maldives"
      },
      "mali": {
        "keywords": ["ml", "flag", "nation", "country", "banner"],
        "char": "🇲🇱",
        "emojiName": "mali"
      },
      "malta": {
        "keywords": ["mt", "flag", "nation", "country", "banner"],
        "char": "🇲🇹",
        "emojiName": "malta"
      },
      "marshall_islands": {
        "keywords": ["marshall", "islands", "flag", "nation", "country", "banner"],
        "char": "🇲🇭",
        "emojiName": "marshall_islands"
      },
      "martinique": {
        "keywords": ["mq", "flag", "nation", "country", "banner"],
        "char": "🇲🇶",
        "emojiName": "martinique"
      },
      "mauritania": {
        "keywords": ["mr", "flag", "nation", "country", "banner"],
        "char": "🇲🇷",
        "emojiName": "mauritania"
      },
      "mauritius": {
        "keywords": ["mu", "flag", "nation", "country", "banner"],
        "char": "🇲🇺",
        "emojiName": "mauritius"
      },
      "mayotte": {
        "keywords": ["yt", "flag", "nation", "country", "banner"],
        "char": "🇾🇹",
        "emojiName": "mayotte"
      },
      "mexico": {
        "keywords": ["mx", "flag", "nation", "country", "banner"],
        "char": "🇲🇽",
        "emojiName": "mexico"
      },
      "micronesia": {
        "keywords": ["micronesia,", "federated", "states", "flag", "nation", "country", "banner"],
        "char": "🇫🇲",
        "emojiName": "micronesia"
      },
      "moldova": {
        "keywords": ["moldova,", "republic", "flag", "nation", "country", "banner"],
        "char": "🇲🇩",
        "emojiName": "moldova"
      },
      "monaco": {
        "keywords": ["mc", "flag", "nation", "country", "banner"],
        "char": "🇲🇨",
        "emojiName": "monaco"
      },
      "mongolia": {
        "keywords": ["mn", "flag", "nation", "country", "banner"],
        "char": "🇲🇳",
        "emojiName": "mongolia"
      },
      "montenegro": {
        "keywords": ["me", "flag", "nation", "country", "banner"],
        "char": "🇲🇪",
        "emojiName": "montenegro"
      },
      "montserrat": {
        "keywords": ["ms", "flag", "nation", "country", "banner"],
        "char": "🇲🇸",
        "emojiName": "montserrat"
      },
      "morocco": {
        "keywords": ["ma", "flag", "nation", "country", "banner"],
        "char": "🇲🇦",
        "emojiName": "morocco"
      },
      "mozambique": {
        "keywords": ["mz", "flag", "nation", "country", "banner"],
        "char": "🇲🇿",
        "emojiName": "mozambique"
      },
      "myanmar": {
        "keywords": ["mm", "flag", "nation", "country", "banner"],
        "char": "🇲🇲",
        "emojiName": "myanmar"
      },
      "namibia": {
        "keywords": ["na", "flag", "nation", "country", "banner"],
        "char": "🇳🇦",
        "emojiName": "namibia"
      },
      "nauru": {
        "keywords": ["nr", "flag", "nation", "country", "banner"],
        "char": "🇳🇷",
        "emojiName": "nauru"
      },
      "nepal": {
        "keywords": ["np", "flag", "nation", "country", "banner"],
        "char": "🇳🇵",
        "emojiName": "nepal"
      },
      "netherlands": {
        "keywords": ["nl", "flag", "nation", "country", "banner"],
        "char": "🇳🇱",
        "emojiName": "netherlands"
      },
      "new_caledonia": {
        "keywords": ["new", "caledonia", "flag", "nation", "country", "banner"],
        "char": "🇳🇨",
        "emojiName": "new_caledonia"
      },
      "new_zealand": {
        "keywords": ["new", "zealand", "flag", "nation", "country", "banner"],
        "char": "🇳🇿",
        "emojiName": "new_zealand"
      },
      "nicaragua": {
        "keywords": ["ni", "flag", "nation", "country", "banner"],
        "char": "🇳🇮",
        "emojiName": "nicaragua"
      },
      "niger": {
        "keywords": ["ne", "flag", "nation", "country", "banner"],
        "char": "🇳🇪",
        "emojiName": "niger"
      },
      "nigeria": {
        "keywords": ["flag", "nation", "country", "banner"],
        "char": "🇳🇬",
        "emojiName": "nigeria"
      },
      "niue": {
        "keywords": ["nu", "flag", "nation", "country", "banner"],
        "char": "🇳🇺",
        "emojiName": "niue"
      },
      "norfolk_island": {
        "keywords": ["norfolk", "island", "flag", "nation", "country", "banner"],
        "char": "🇳🇫",
        "emojiName": "norfolk_island"
      },
      "northern_mariana_islands": {
        "keywords": ["northern", "mariana", "islands", "flag", "nation", "country", "banner"],
        "char": "🇲🇵",
        "emojiName": "northern_mariana_islands"
      },
      "north_korea": {
        "keywords": ["north", "korea", "nation", "flag", "country", "banner"],
        "char": "🇰🇵",
        "emojiName": "north_korea"
      },
      "norway": {
        "keywords": ["no", "flag", "nation", "country", "banner"],
        "char": "🇳🇴",
        "emojiName": "norway"
      },
      "oman": {
        "keywords": ["om_symbol", "flag", "nation", "country", "banner"],
        "char": "🇴🇲",
        "emojiName": "oman"
      },
      "pakistan": {
        "keywords": ["pk", "flag", "nation", "country", "banner"],
        "char": "🇵🇰",
        "emojiName": "pakistan"
      },
      "palau": {
        "keywords": ["pw", "flag", "nation", "country", "banner"],
        "char": "🇵🇼",
        "emojiName": "palau"
      },
      "palestinian_territories": {
        "keywords": ["palestine", "palestinian", "territories", "flag", "nation", "country", "banner"],
        "char": "🇵🇸",
        "emojiName": "palestinian_territories"
      },
      "panama": {
        "keywords": ["pa", "flag", "nation", "country", "banner"],
        "char": "🇵🇦",
        "emojiName": "panama"
      },
      "papua_new_guinea": {
        "keywords": ["papua", "new", "guinea", "flag", "nation", "country", "banner"],
        "char": "🇵🇬",
        "emojiName": "papua_new_guinea"
      },
      "paraguay": {
        "keywords": ["py", "flag", "nation", "country", "banner"],
        "char": "🇵🇾",
        "emojiName": "paraguay"
      },
      "peru": {
        "keywords": ["pe", "flag", "nation", "country", "banner"],
        "char": "🇵🇪",
        "emojiName": "peru"
      },
      "philippines": {
        "keywords": ["ph", "flag", "nation", "country", "banner"],
        "char": "🇵🇭",
        "emojiName": "philippines"
      },
      "pitcairn_islands": {
        "keywords": ["pitcairn", "flag", "nation", "country", "banner"],
        "char": "🇵🇳",
        "emojiName": "pitcairn_islands"
      },
      "poland": {
        "keywords": ["pl", "flag", "nation", "country", "banner"],
        "char": "🇵🇱",
        "emojiName": "poland"
      },
      "portugal": {
        "keywords": ["pt", "flag", "nation", "country", "banner"],
        "char": "🇵🇹",
        "emojiName": "portugal"
      },
      "puerto_rico": {
        "keywords": ["puerto", "rico", "flag", "nation", "country", "banner"],
        "char": "🇵🇷",
        "emojiName": "puerto_rico"
      },
      "qatar": {
        "keywords": ["qa", "flag", "nation", "country", "banner"],
        "char": "🇶🇦",
        "emojiName": "qatar"
      },
      "reunion": {
        "keywords": ["réunion", "flag", "nation", "country", "banner"],
        "char": "🇷🇪",
        "emojiName": "reunion"
      },
      "romania": {
        "keywords": ["ro", "flag", "nation", "country", "banner"],
        "char": "🇷🇴",
        "emojiName": "romania"
      },
      "ru": {
        "keywords": ["russian", "federation", "flag", "nation", "country", "banner"],
        "char": "🇷🇺",
        "emojiName": "ru"
      },
      "rwanda": {
        "keywords": ["rw", "flag", "nation", "country", "banner"],
        "char": "🇷🇼",
        "emojiName": "rwanda"
      },
      "st_barthelemy": {
        "keywords": ["saint", "barthélemy", "flag", "nation", "country", "banner"],
        "char": "🇧🇱",
        "emojiName": "st_barthelemy"
      },
      "st_helena": {
        "keywords": ["saint", "helena", "ascension", "tristan", "cunha", "flag", "nation", "country", "banner"],
        "char": "🇸🇭",
        "emojiName": "st_helena"
      },
      "st_kitts_nevis": {
        "keywords": ["saint", "kitts", "nevis", "flag", "nation", "country", "banner"],
        "char": "🇰🇳",
        "emojiName": "st_kitts_nevis"
      },
      "st_lucia": {
        "keywords": ["saint", "lucia", "flag", "nation", "country", "banner"],
        "char": "🇱🇨",
        "emojiName": "st_lucia"
      },
      "st_pierre_miquelon": {
        "keywords": ["saint", "pierre", "miquelon", "flag", "nation", "country", "banner"],
        "char": "🇵🇲",
        "emojiName": "st_pierre_miquelon"
      },
      "st_vincent_grenadines": {
        "keywords": ["saint", "vincent", "grenadines", "flag", "nation", "country", "banner"],
        "char": "🇻🇨",
        "emojiName": "st_vincent_grenadines"
      },
      "samoa": {
        "keywords": ["ws", "flag", "nation", "country", "banner"],
        "char": "🇼🇸",
        "emojiName": "samoa"
      },
      "san_marino": {
        "keywords": ["san", "marino", "flag", "nation", "country", "banner"],
        "char": "🇸🇲",
        "emojiName": "san_marino"
      },
      "sao_tome_principe": {
        "keywords": ["sao", "tome", "principe", "flag", "nation", "country", "banner"],
        "char": "🇸🇹",
        "emojiName": "sao_tome_principe"
      },
      "saudi_arabia": {
        "keywords": ["flag", "nation", "country", "banner"],
        "char": "🇸🇦",
        "emojiName": "saudi_arabia"
      },
      "senegal": {
        "keywords": ["sn", "flag", "nation", "country", "banner"],
        "char": "🇸🇳",
        "emojiName": "senegal"
      },
      "serbia": {
        "keywords": ["rs", "flag", "nation", "country", "banner"],
        "char": "🇷🇸",
        "emojiName": "serbia"
      },
      "seychelles": {
        "keywords": ["sc", "flag", "nation", "country", "banner"],
        "char": "🇸🇨",
        "emojiName": "seychelles"
      },
      "sierra_leone": {
        "keywords": ["sierra", "leone", "flag", "nation", "country", "banner"],
        "char": "🇸🇱",
        "emojiName": "sierra_leone"
      },
      "singapore": {
        "keywords": ["sg", "flag", "nation", "country", "banner"],
        "char": "🇸🇬",
        "emojiName": "singapore"
      },
      "sint_maarten": {
        "keywords": ["sint", "maarten", "dutch", "flag", "nation", "country", "banner"],
        "char": "🇸🇽",
        "emojiName": "sint_maarten"
      },
      "slovakia": {
        "keywords": ["sk", "flag", "nation", "country", "banner"],
        "char": "🇸🇰",
        "emojiName": "slovakia"
      },
      "slovenia": {
        "keywords": ["si", "flag", "nation", "country", "banner"],
        "char": "🇸🇮",
        "emojiName": "slovenia"
      },
      "solomon_islands": {
        "keywords": ["solomon", "islands", "flag", "nation", "country", "banner"],
        "char": "🇸🇧",
        "emojiName": "solomon_islands"
      },
      "somalia": {
        "keywords": ["so", "flag", "nation", "country", "banner"],
        "char": "🇸🇴",
        "emojiName": "somalia"
      },
      "south_africa": {
        "keywords": ["south", "africa", "flag", "nation", "country", "banner"],
        "char": "🇿🇦",
        "emojiName": "south_africa"
      },
      "south_georgia_south_sandwich_islands": {
        "keywords": ["south", "georgia", "sandwich", "islands", "flag", "nation", "country", "banner"],
        "char": "🇬🇸",
        "emojiName": "south_georgia_south_sandwich_islands"
      },
      "kr": {
        "keywords": ["south", "korea", "nation", "flag", "country", "banner"],
        "char": "🇰🇷",
        "emojiName": "kr"
      },
      "south_sudan": {
        "keywords": ["south", "sd", "flag", "nation", "country", "banner"],
        "char": "🇸🇸",
        "emojiName": "south_sudan"
      },
      "es": {
        "keywords": ["spain", "flag", "nation", "country", "banner"],
        "char": "🇪🇸",
        "emojiName": "es"
      },
      "sri_lanka": {
        "keywords": ["sri", "lanka", "flag", "nation", "country", "banner"],
        "char": "🇱🇰",
        "emojiName": "sri_lanka"
      },
      "sudan": {
        "keywords": ["sd", "flag", "nation", "country", "banner"],
        "char": "🇸🇩",
        "emojiName": "sudan"
      },
      "suriname": {
        "keywords": ["sr", "flag", "nation", "country", "banner"],
        "char": "🇸🇷",
        "emojiName": "suriname"
      },
      "swaziland": {
        "keywords": ["sz", "flag", "nation", "country", "banner"],
        "char": "🇸🇿",
        "emojiName": "swaziland"
      },
      "sweden": {
        "keywords": ["se", "flag", "nation", "country", "banner"],
        "char": "🇸🇪",
        "emojiName": "sweden"
      },
      "switzerland": {
        "keywords": ["ch", "flag", "nation", "country", "banner"],
        "char": "🇨🇭",
        "emojiName": "switzerland"
      },
      "syria": {
        "keywords": ["syrian", "arab", "republic", "flag", "nation", "country", "banner"],
        "char": "🇸🇾",
        "emojiName": "syria"
      },
      "taiwan": {
        "keywords": ["tw", "flag", "nation", "country", "banner"],
        "char": "🇹🇼",
        "emojiName": "taiwan"
      },
      "tajikistan": {
        "keywords": ["tj", "flag", "nation", "country", "banner"],
        "char": "🇹🇯",
        "emojiName": "tajikistan"
      },
      "tanzania": {
        "keywords": ["tanzania,", "united", "republic", "flag", "nation", "country", "banner"],
        "char": "🇹🇿",
        "emojiName": "tanzania"
      },
      "thailand": {
        "keywords": ["th", "flag", "nation", "country", "banner"],
        "char": "🇹🇭",
        "emojiName": "thailand"
      },
      "timor_leste": {
        "keywords": ["timor", "leste", "flag", "nation", "country", "banner"],
        "char": "🇹🇱",
        "emojiName": "timor_leste"
      },
      "togo": {
        "keywords": ["tg", "flag", "nation", "country", "banner"],
        "char": "🇹🇬",
        "emojiName": "togo"
      },
      "tokelau": {
        "keywords": ["tk", "flag", "nation", "country", "banner"],
        "char": "🇹🇰",
        "emojiName": "tokelau"
      },
      "tonga": {
        "keywords": ["to", "flag", "nation", "country", "banner"],
        "char": "🇹🇴",
        "emojiName": "tonga"
      },
      "trinidad_tobago": {
        "keywords": ["trinidad", "tobago", "flag", "nation", "country", "banner"],
        "char": "🇹🇹",
        "emojiName": "trinidad_tobago"
      },
      "tunisia": {
        "keywords": ["tn", "flag", "nation", "country", "banner"],
        "char": "🇹🇳",
        "emojiName": "tunisia"
      },
      "tr": {
        "keywords": ["turkey", "flag", "nation", "country", "banner"],
        "char": "🇹🇷",
        "emojiName": "tr"
      },
      "turkmenistan": {
        "keywords": ["flag", "nation", "country", "banner"],
        "char": "🇹🇲",
        "emojiName": "turkmenistan"
      },
      "turks_caicos_islands": {
        "keywords": ["turks", "caicos", "islands", "flag", "nation", "country", "banner"],
        "char": "🇹🇨",
        "emojiName": "turks_caicos_islands"
      },
      "tuvalu": {
        "keywords": ["flag", "nation", "country", "banner"],
        "char": "🇹🇻",
        "emojiName": "tuvalu"
      },
      "uganda": {
        "keywords": ["ug", "flag", "nation", "country", "banner"],
        "char": "🇺🇬",
        "emojiName": "uganda"
      },
      "ukraine": {
        "keywords": ["ua", "flag", "nation", "country", "banner"],
        "char": "🇺🇦",
        "emojiName": "ukraine"
      },
      "united_arab_emirates": {
        "keywords": ["united", "arab", "emirates", "flag", "nation", "country", "banner"],
        "char": "🇦🇪",
        "emojiName": "united_arab_emirates"
      },
      "uk": {
        "keywords": ["united", "kingdom", "great", "britain", "northern", "ireland", "flag", "nation", "country", "banner", "british", "UK", "english", "england", "union jack"],
        "char": "🇬🇧",
        "emojiName": "uk"
      },
      "england": {
        "keywords": ["flag", "english"],
        "char": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        "emojiName": "england"
      },
      "scotland": {
        "keywords": ["flag", "scottish"],
        "char": "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
        "emojiName": "scotland"
      },
      "wales": {
        "keywords": ["flag", "welsh"],
        "char": "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
        "emojiName": "wales"
      },
      "us": {
        "keywords": ["united", "states", "america", "flag", "nation", "country", "banner"],
        "char": "🇺🇸",
        "emojiName": "us"
      },
      "us_virgin_islands": {
        "keywords": ["virgin", "islands", "us", "flag", "nation", "country", "banner"],
        "char": "🇻🇮",
        "emojiName": "us_virgin_islands"
      },
      "uruguay": {
        "keywords": ["uy", "flag", "nation", "country", "banner"],
        "char": "🇺🇾",
        "emojiName": "uruguay"
      },
      "uzbekistan": {
        "keywords": ["uz", "flag", "nation", "country", "banner"],
        "char": "🇺🇿",
        "emojiName": "uzbekistan"
      },
      "vanuatu": {
        "keywords": ["vu", "flag", "nation", "country", "banner"],
        "char": "🇻🇺",
        "emojiName": "vanuatu"
      },
      "vatican_city": {
        "keywords": ["vatican", "city", "flag", "nation", "country", "banner"],
        "char": "🇻🇦",
        "emojiName": "vatican_city"
      },
      "venezuela": {
        "keywords": ["ve", "bolivarian", "republic", "flag", "nation", "country", "banner"],
        "char": "🇻🇪",
        "emojiName": "venezuela"
      },
      "vietnam": {
        "keywords": ["viet", "nam", "flag", "nation", "country", "banner"],
        "char": "🇻🇳",
        "emojiName": "vietnam"
      },
      "wallis_futuna": {
        "keywords": ["wallis", "futuna", "flag", "nation", "country", "banner"],
        "char": "🇼🇫",
        "emojiName": "wallis_futuna"
      },
      "western_sahara": {
        "keywords": ["western", "sahara", "flag", "nation", "country", "banner"],
        "char": "🇪🇭",
        "emojiName": "western_sahara"
      },
      "yemen": {
        "keywords": ["ye", "flag", "nation", "country", "banner"],
        "char": "🇾🇪",
        "emojiName": "yemen"
      },
      "zambia": {
        "keywords": ["zm", "flag", "nation", "country", "banner"],
        "char": "🇿🇲",
        "emojiName": "zambia"
      },
      "zimbabwe": {
        "keywords": ["zw", "flag", "nation", "country", "banner"],
        "char": "🇿🇼",
        "emojiName": "zimbabwe"
      },
      "united_nations": {
        "keywords": ["un", "flag", "banner"],
        "char": "🇺🇳",
        "emojiName": "united_nations"
      },
      "pirate_flag": {
        "keywords": ["skull", "crossbones", "flag", "banner"],
        "char": "🏴‍☠️",
        "emojiName": "pirate_flag"
      }
    }
  }
}];