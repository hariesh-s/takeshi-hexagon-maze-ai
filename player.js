import { canva } from "./canvas.js";
import map from "./map.js";
import {
   HEXCELL_WIDTH,
   HEXCELL_HEIGHT,
   HORIZONTAL_STEP,
   SEMI_HORIZONTAL_STEP,
} from "./constants.js";

class Player {
   constructor(player_spritesheets) {
      this.x_coord = 0;
      this.y_coord = 0;
      this.x_spritesheet = 0;
      this.y_spritesheet = 0;
      this.spritesheets = player_spritesheets;
      this.width = this.spritesheets[0].width / 4;
      this.height = this.spritesheets[0].height;
      this.x = HEXCELL_WIDTH / 2 - this.width / 2;
      this.y = HEXCELL_HEIGHT / 2 - this.height / 2;
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

   moveLeft() {
      if (this.x_coord - 1 >= 0) {
         this.x_coord -= 1;
         this.movement_status = "LEFT";
         map.moveRight(HORIZONTAL_STEP);
      }
   }

   moveRight() {
      if (this.x_coord + 1 <= 16) {
         this.x_coord += 1;
         this.movement_status = "RIGHT";
         map.moveLeft(HORIZONTAL_STEP);
      }
   }

   moveUpLeft() {
      // x decreases when y is even
      let dx_coord = this.y_coord % 2 === 0 ? -1 : 0;
      // movement depends on destination coords
      const can_move = this.y_coord - 1 >= 0 && this.x_coord + dx_coord >= 0;
      if (can_move) {
         this.y_coord -= 1;
         this.x_coord += dx_coord;
         this.movement_status = "UP";
         map.moveDown();
         map.moveRight(SEMI_HORIZONTAL_STEP);
      }
   }

   moveUpRight() {
      // x increases when y is odd
      let dx_coord = this.y_coord % 2 === 0 ? 0 : 1;
      // movement depends on destination coords
      const can_move = this.y_coord - 1 >= 0 && this.x_coord + dx_coord <= 16;
      if (can_move) {
         this.y_coord -= 1;
         this.x_coord += dx_coord;
         this.movement_status = "UP";
         map.moveDown();
         map.moveLeft(SEMI_HORIZONTAL_STEP);
      }
   }

   moveDownLeft() {
      // x decreases when y is even
      let dx_coord = this.y_coord % 2 === 0 ? -1 : 0;
      // movement depends on destination coords
      const can_move = this.y_coord + 1 <= 16 && this.x_coord + dx_coord >= 0;
      if (can_move) {
         this.y_coord += 1;
         this.x_coord += dx_coord;
         this.movement_status = "DOWN";
         map.moveUp();
         map.moveRight(SEMI_HORIZONTAL_STEP);
      }
   }

   moveDownRight() {
      // x increases when y is odd
      let dx_coord = this.y_coord % 2 === 0 ? 0 : 1;
      // movement depends on destination coords
      const can_move = this.y_coord + 1 <= 16 && this.x_coord + dx_coord <= 16;
      if (can_move) {
         this.y_coord += 1;
         this.x_coord += dx_coord;
         this.movement_status = "DOWN";
         map.moveUp();
         map.moveLeft(SEMI_HORIZONTAL_STEP);
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
