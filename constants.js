const HEXCELL_WIDTH = 66;
const HEXCELL_HEIGHT = 76;

const VERTICAL_STEP = 57;
const HORIZONTAL_STEP = HEXCELL_WIDTH;
const SEMI_HORIZONTAL_STEP = HORIZONTAL_STEP / 2;

const SPEED_X = 3;
const SPEED_Y = SPEED_X;

const INITIAL_PLAYER_X_COORDINATE = 0;
const INITIAL_PLAYER_Y_COORDINATE = 0;

const PLAYER_X_BOUNDARY = 16;
const PLAYER_Y_BOUNDARY = 16;

const MONSTER_X_BOUNDARY = 15;
const MONSTER_Y_BOUNDARY = 15;

let OBSTACLE_MATRIX = [];
let OBSTACLE_POINTS = [
   0, 0, 0, 0, 0, 19, 0, 0, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
   0, 0, 0, 19, 0, 0, 19, 0, 0, 0, 0, 0, 0, 19, 0, 0, 19, 0, 0, 0, 0, 0, 0, 0,
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19, 0, 0, 0, 19, 0, 0, 0, 0, 0, 0, 19, 0,
   0, 19, 0, 0, 0, 19, 0, 0, 0, 0, 19, 19, 0, 0, 0, 0, 0, 0, 19, 0, 0, 0, 0, 0,
   0, 0, 19, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19, 19, 19, 0, 0, 0, 0, 0, 0, 0, 0,
   19, 0, 0, 0, 0, 19, 0, 0, 0, 0, 0, 19, 0, 0, 0, 0, 19, 0, 0, 0, 0, 0, 0, 0,
   0, 0, 0, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19, 0, 0, 0, 0, 0, 0, 0, 19,
   0, 0, 19, 0, 0, 0, 0, 0, 0, 0, 0, 19, 0, 0, 0, 19, 19, 19, 19, 0, 0, 0, 0, 0,
   0, 0, 0, 0, 0, 0, 0, 0, 19, 0, 0, 0, 0, 0, 0, 0, 19, 0, 0, 0, 0, 0, 0, 0, 0,
   0, 0, 0, 0, 0, 0, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19, 0, 0, 0, 0, 0, 0, 0, 0,
   0, 0, 19, 0, 0, 0, 0, 0, 19, 19, 0, 0, 19, 0, 0, 19, 0, 0, 0, 0, 19, 19, 0,
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
   0, 0, 0, 0,
];
let num_of_tiles = OBSTACLE_POINTS.length;
for (let i = 0; i < num_of_tiles; i += 18) {
   OBSTACLE_MATRIX.push(OBSTACLE_POINTS.slice(i, i + 18));
}

console.log(OBSTACLE_MATRIX);

export {
   HEXCELL_WIDTH,
   HEXCELL_HEIGHT,
   VERTICAL_STEP,
   HORIZONTAL_STEP,
   SEMI_HORIZONTAL_STEP,
   SPEED_X,
   SPEED_Y,
   INITIAL_PLAYER_X_COORDINATE,
   INITIAL_PLAYER_Y_COORDINATE,
   PLAYER_X_BOUNDARY,
   PLAYER_Y_BOUNDARY,
   MONSTER_X_BOUNDARY,
   MONSTER_Y_BOUNDARY,
   OBSTACLE_MATRIX,
};
