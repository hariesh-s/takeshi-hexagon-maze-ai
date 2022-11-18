import { canva, canvas } from "./canvas.js";
import map from "./map.js";
import {
   HEXCELL_WIDTH,
   HEXCELL_HEIGHT,
   HORIZONTAL_STEP,
   SEMI_HORIZONTAL_STEP,
   VERTICAL_STEP,
   INITIAL_PLAYER_X_COORDINATE,
   INITIAL_PLAYER_Y_COORDINATE,
   PLAYER_X_BOUNDARY,
   PLAYER_Y_BOUNDARY,
   SPEED_X,
   SPEED_Y,
} from "./constants.js";

class Player {
   constructor(player_spritesheets) {
      this.x_coord = INITIAL_PLAYER_X_COORDINATE;
      this.y_coord = INITIAL_PLAYER_Y_COORDINATE;
      this.x_spritesheet = 0;
      this.y_spritesheet = 0;
      this.spritesheets = player_spritesheets;
      this.width = this.spritesheets[0].width / 4;
      this.height = this.spritesheets[0].height;
      this.x =
         HEXCELL_WIDTH / 2 -
         this.width / 2 +
         INITIAL_PLAYER_X_COORDINATE * HORIZONTAL_STEP +
         (this.y_coord % 2 === 0 ? 0 : SEMI_HORIZONTAL_STEP);
      this.y =
         HEXCELL_HEIGHT / 2 -
         this.height / 2 +
         INITIAL_PLAYER_Y_COORDINATE * VERTICAL_STEP;
      this.movement_status = "DEFAULT";
      this.img = this.spritesheets[1];
   }

   draw() {
      switch (this.movement_status) {
         case "DEFAULT":
            this.img = this.spritesheets[1];
            break;
         case "UP":
            this.img = this.spritesheets[0];
            break;
         case "DOWN":
            this.img = this.spritesheets[1];
            break;
         case "LEFT":
            this.img = this.spritesheets[2];
            break;
         case "RIGHT":
            this.img = this.spritesheets[3];
            break;
      }

      canva.drawImage(
         this.img,
         // changes cyclically from 0 to 90 back to 0, with 30 as step increment
         this.x_spritesheet,
         // always 0, never changes
         this.y_spritesheet,
         this.width,
         this.height,
         this.x,
         this.y,
         this.width,
         this.height
      );
   }

   moveUp(can_move = false) {
      if (
         can_move ||
         (this.y_coord - 1 >= 0 &&
            !map.isObstaclePresent(this.x_coord, this.y_coord - 1))
      ) {
         this.y_coord += -1;
         this.movement_status = "UP";

         if (this.y >= 0.5 * canvas.height) map.moveDown();
         else {
            let ydiff = 0;
            const animatePlayerMoveUp = () => {
               if (ydiff === VERTICAL_STEP) {
                  window.cancelAnimationFrame(animatePlayerMoveUp);
                  this.movement_status = "DEFAULT";
                  this.x_spritesheet = 0;
                  return;
               }

               this.y += -SPEED_Y;
               ydiff += SPEED_Y;
               player.x_spritesheet = (player.x_spritesheet + 30) % 120;
               window.requestAnimationFrame(animatePlayerMoveUp);
            };
            animatePlayerMoveUp();
         }
      }
   }

   moveDown(can_move = false) {
      if (
         can_move ||
         (this.y_coord + 1 <= PLAYER_Y_BOUNDARY &&
            !map.isObstaclePresent(this.x_coord, this.y_coord + 1))
      ) {
         this.y_coord += 1;
         this.movement_status = "DOWN";

         if (this.y >= 0.5 * canvas.height) map.moveUp();
         else {
            let ydiff = 0;
            const animatePlayerMoveDown = () => {
               if (ydiff === VERTICAL_STEP) {
                  window.cancelAnimationFrame(animatePlayerMoveDown);
                  this.movement_status = "DEFAULT";
                  this.x_spritesheet = 0;
                  return;
               }

               this.y += SPEED_Y;
               ydiff += SPEED_Y;
               player.x_spritesheet = (player.x_spritesheet + 30) % 120;
               window.requestAnimationFrame(animatePlayerMoveDown);
            };
            animatePlayerMoveDown();
         }
      }
   }

   moveLeft(dx = HORIZONTAL_STEP, dx_coord = -1, can_move = false) {
      if (
         can_move ||
         (this.x_coord + dx_coord >= 0 &&
            !map.isObstaclePresent(this.x_coord + dx_coord, this.y_coord))
      ) {
         this.x_coord += dx_coord;
         this.movement_status = "LEFT";

         if (this.x >= 0.5 * canvas.width) map.moveRight(dx);
         else {
            let xdiff = 0;
            const animatePlayerMoveLeft = () => {
               if (xdiff === dx) {
                  window.cancelAnimationFrame(animatePlayerMoveLeft);
                  this.movement_status = "DEFAULT";
                  this.x_spritesheet = 0;
                  return;
               }

               this.x += -SPEED_X;
               xdiff += SPEED_X;
               player.x_spritesheet = (player.x_spritesheet + 30) % 120;
               window.requestAnimationFrame(animatePlayerMoveLeft);
            };
            animatePlayerMoveLeft();
         }
      }
   }

   moveRight(dx = HORIZONTAL_STEP, dx_coord = 1, can_move = false) {
      if (
         can_move ||
         (this.x_coord + dx_coord <= PLAYER_X_BOUNDARY &&
            !map.isObstaclePresent(this.x_coord + dx_coord, this.y_coord))
      ) {
         this.x_coord += dx_coord;
         this.movement_status = "RIGHT";

         if (this.x >= 0.5 * canvas.width) map.moveLeft(dx);
         else {
            let xdiff = 0;
            const animatePlayerMoveLeft = () => {
               if (xdiff === dx) {
                  window.cancelAnimationFrame(animatePlayerMoveLeft);
                  this.movement_status = "DEFAULT";
                  this.x_spritesheet = 0;
                  return;
               }

               this.x += SPEED_X;
               xdiff += SPEED_X;
               player.x_spritesheet = (player.x_spritesheet + 30) % 120;
               window.requestAnimationFrame(animatePlayerMoveLeft);
            };
            animatePlayerMoveLeft();
         }
      }
   }

   moveUpLeft() {
      // x decreases when y is even
      let dx_coord = this.y_coord % 2 === 0 ? -1 : 0;
      // movement depends on destination coords
      const can_move =
         this.y_coord - 1 >= 0 &&
         this.x_coord + dx_coord >= 0 &&
         !map.isObstaclePresent(this.x_coord + dx_coord, this.y_coord - 1);
      if (can_move) {
         this.moveUp(true);
         this.moveLeft(SEMI_HORIZONTAL_STEP, dx_coord, true);
      }
   }

   moveUpRight() {
      // x increases when y is odd
      let dx_coord = this.y_coord % 2 === 0 ? 0 : 1;
      // movement depends on destination coords
      const can_move =
         this.y_coord - 1 >= 0 &&
         this.x_coord + dx_coord <= PLAYER_X_BOUNDARY &&
         !map.isObstaclePresent(this.x_coord + dx_coord, this.y_coord - 1);
      if (can_move) {
         this.moveUp(true);
         this.moveRight(SEMI_HORIZONTAL_STEP, dx_coord, true);
      }
   }

   moveDownLeft() {
      // x decreases when y is even
      let dx_coord = this.y_coord % 2 === 0 ? -1 : 0;
      // movement depends on destination coords
      const can_move =
         this.y_coord + 1 <= PLAYER_Y_BOUNDARY &&
         this.x_coord + dx_coord >= 0 &&
         !map.isObstaclePresent(this.x_coord + dx_coord, this.y_coord + 1);
      if (can_move) {
         this.moveDown(true);
         this.moveLeft(SEMI_HORIZONTAL_STEP, dx_coord, true);
      }
   }

   moveDownRight() {
      // x increases when y is odd
      let dx_coord = this.y_coord % 2 === 0 ? 0 : 1;
      // movement depends on destination coords
      const can_move =
         this.y_coord + 1 <= PLAYER_Y_BOUNDARY &&
         this.x_coord + dx_coord <= PLAYER_X_BOUNDARY &&
         !map.isObstaclePresent(this.x_coord + dx_coord, this.y_coord + 1);
      if (can_move) {
         this.moveDown(true);
         this.moveRight(SEMI_HORIZONTAL_STEP, dx_coord, true);
      }
   }
}

let movement_images = [
   "move-up.png",
   "move-down.png",
   "move-left.png",
   "move-right.png",
];
let player_spritesheets = [];
for (let i = 0; i < 4; i++) {
   let spritesheet = new Image();
   spritesheet.src = "./game assests/character/" + movement_images[i];
   player_spritesheets.push(spritesheet);
}

const player = new Player(player_spritesheets);

export default player;
