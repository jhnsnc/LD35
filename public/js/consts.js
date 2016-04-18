var MUSIC_FADE_TIME = 2000;
var VOLUME = 1.0;
var MIN_VOLUME = 0.001; //to prevent losing sound sync

var HALF_PI = Math.PI / 2;
var DEG_TO_RAD = Math.PI / 180;

var GRID_WIDTH = 900;
var GRID_HEIGHT = 500;
var GRID_POS_X = 520;
var GRID_POS_Y = 355;

var GRID_ENABLED_COLOR = 0xdddddd;
var GRID_ENABLED_ALPHA = 1.0;
var GRID_DISABLED_COLOR = 0x222222;
var GRID_DISABLED_ALPHA = 0.05;

var SHAPES_SCALE = 0.3;
var SHAPES_ACTIVE_SCALE = 0.3;

var SHAPES_PULSE_SCALE = 6.0;
var SHAPES_DESTINATION_PULSE_SCALE = 4.0;
var SHAPES_PULSE_ALPHA = 0.6;
var SHAPES_PULSE_DURATION = 2069;
var SHAPES_PULSE_FREQUENCY = 1379;
var SHAPES_PULSE_SEPARATION = 345;

var MIN_DESTINATION_CROW_DISTANCE = 15;
var NUM_HIGHWAY_PATHS = 2;
var MIN_HIGHWAY_CROW_DISTANCE = 3;
var MIN_HIGHWAY_CROW_LENGTH = 12;
var MAX_HIGHWAY_ATTEMPTS = 100;

var NUM_PLAYSETS = 10;

var SFX_VOLUME = 1.0;
var SFX_PATTERN_REFRESH_DELAY = 1500;
var SFX_PATTERNS = [
//   [ 7, 8, 7, 6, 5, 5, 5, 5 ],
//   [ 7, 8, 9, 10, 10, 10, 7, 7, 7, 7 ],
//   [ 1, 3, 5, 4, 6, 5, 4, 5, 5, 5 ],
//   [ 0, 0, 0, 2, 2, 2, 4, 4, 4, 5, 4, 3, 4, 4, 4 ],
//   [ 8, 8, 8, 7, 7, 7, 6, 6, 6, 6, 7, 7, 7, 6, 6, 6, 5, 5, 5, 5 ],
//   [ 10, 9, 8, 8, 8, 9, 7, 7, 7, 7 ],
//   [ 4, 5, 7, 6, 8, 9, 8, 7, 7, 7, 7 ],
//   [ 5, 5, 5, 5, 2, 2, 2, 2, 3, 3, 3, 3 ],
//   [ 5, 6, 7, 7, 7, 7, 5, 6, 7, 7, 7, 7, 8, 6, 6, 6, 6, 4, 4, 6, 6, 6, 6, 7, 5, 5, 5, 5 ],
//   [ 7, 7, 7, 8, 8, 8, 7, 7, 7, 6, 7, 6, 6, 4, 5, 6, 7, 7, 7, 7, 7 ],
    [ 5, 5, 6, 6, 7, 7, 8, 8, 5, 5, 5, 5 ],
    [ 7, 6, 5, 5, 5, 4, 4, 5, 5, 5, 5 ],
    [ 4, 4, 5, 5, 4, 4, 3, 3, 4, 4, 5, 5, 5 ],
    [ 3, 4, 5, 5, 4, 5, 6, 6, 5, 6, 7, 7, 7, 7 ],
    [ 5, 4, 3, 3, 7, 8, 7, 7, 7, 9, 9, 9, 8, 7, 7 ],
];
