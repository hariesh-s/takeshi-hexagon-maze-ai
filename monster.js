import { canva } from "./canvas.js";
import {
   HEXCELL_WIDTH,
   HEXCELL_HEIGHT,
   VERTICAL_STEP,
   HORIZONTAL_STEP,
   SEMI_HORIZONTAL_STEP,
   SPEED_X,
   SPEED_Y,
} from "./constants.js";

class Monster {
   constructor(monster_img) {
      this.img = monster_img;
      this.width = this.img.width;
      this.height = this.img.height;

      // randomizing initial spawn position of monster
      const rand_y = Math.floor(Math.random() * 11 + 4);
      this.y_coord = rand_y;
      this.y = HEXCELL_HEIGHT / 2 - this.height / 2 + rand_y * VERTICAL_STEP;

      const rand_x = Math.floor(Math.random() * 11 + 4);
      this.x_coord = rand_x;
      this.x =
         HEXCELL_WIDTH / 2 -
         this.width / 2 +
         rand_x * HORIZONTAL_STEP +
         (this.y_coord % 2 === 0 ? 0 : SEMI_HORIZONTAL_STEP);
   }

   draw() {
      canva.drawImage(this.img, this.x, this.y);
   }

   // an arrow function else 'this' will be interpreted
   // as window object instead of monster
   move = () => {
      // AI to be inserted here instead of the random
      // function The AI will decide the value of
      // decision and accordingly the monster will move
      const decision = Math.floor(Math.random() * 6);
      switch (decision) {
         case 0:
            this.moveUpLeft();
            break;
         case 1:
            this.moveUpRight();
            break;
         case 2:
            this.moveRight();
            break;
         case 3:
            this.moveDownRight();
            break;
         case 4:
            this.moveDownLeft();
            break;
         case 5:
            this.moveLeft();
            break;
      }
   };

   moveUp() {
      this.y_coord -= 1;
      let ydiff = 0;
      const animateMonsterMoveUp = () => {
         if (ydiff === VERTICAL_STEP) {
            window.cancelAnimationFrame(animateMonsterMoveUp);
            return;
         }

         ydiff += SPEED_Y;
         this.y -= SPEED_Y;

         window.requestAnimationFrame(animateMonsterMoveUp);
      };
      animateMonsterMoveUp();
   }

   moveDown() {
      this.y_coord += 1;
      let ydiff = 0;
      const animateMonsterMoveDown = () => {
         if (ydiff === VERTICAL_STEP) {
            window.cancelAnimationFrame(animateMonsterMoveDown);
            return;
         }

         ydiff += SPEED_Y;
         this.y += SPEED_Y;

         window.requestAnimationFrame(animateMonsterMoveDown);
      };
      animateMonsterMoveDown();
   }

   moveLeft(dx = -HORIZONTAL_STEP, dx_coord = -1) {
      if (this.x_coord + dx_coord >= 0) {
         this.x_coord += dx_coord;

         let xdiff = 0;
         const animateMonsterMoveLeft = () => {
            if (xdiff === Math.abs(dx)) {
               window.cancelAnimationFrame(animateMonsterMoveLeft);
               return;
            }

            xdiff += SPEED_X;
            this.x -= SPEED_X;

            window.requestAnimationFrame(animateMonsterMoveLeft);
         };
         animateMonsterMoveLeft();
      }
   }

   moveRight(dx = HORIZONTAL_STEP, dx_coord = 1) {
      if (this.x_coord + dx_coord <= 15) {
         this.x_coord += dx_coord;

         let xdiff = 0;
         const animateMonsterMoveRight = () => {
            if (xdiff === Math.abs(dx)) {
               window.cancelAnimationFrame(animateMonsterMoveRight);
               return;
            }

            xdiff += SPEED_X;
            this.x += SPEED_X;

            window.requestAnimationFrame(animateMonsterMoveRight);
         };
         animateMonsterMoveRight();
      }
   }

   moveUpLeft() {
      // x decreases when y is even
      let dx_coord = this.y_coord % 2 === 0 ? -1 : 0;
      // movement depends on the destination coords
      const can_move = this.y_coord - 1 >= 0 && this.x_coord + dx_coord >= 0;
      if (can_move) {
         this.moveUp();
         // the change in it's x canvas coord is const tho
         this.moveLeft(-SEMI_HORIZONTAL_STEP, dx_coord);
      }
   }

   moveUpRight() {
      // x increases when y is odd
      let dx_coord = this.y_coord % 2 === 0 ? 0 : 1;
      // movement depends on the destination coords
      const can_move = this.y_coord - 1 >= 0 && this.x_coord + dx_coord <= 15;
      if (can_move) {
         this.moveUp();
         // the change in it's x canvas coord is const tho
         this.moveRight(SEMI_HORIZONTAL_STEP, dx_coord);
      }
   }

   moveDownLeft() {
      // x decreases when y is even
      let dx_coord = this.y_coord % 2 === 0 ? -1 : 0;
      // movement depends on the destination coords
      const can_move = this.y_coord + 1 <= 15 && this.x_coord + dx_coord >= 0;
      if (can_move) {
         this.moveDown();
         // the change in it's x canvas coord is const tho
         this.moveLeft(-SEMI_HORIZONTAL_STEP, dx_coord);
      }
   }

   moveDownRight() {
      // x increases when y is odd
      let dx_coord = this.y_coord % 2 === 0 ? 0 : 1;
      // movement depends on the destination coords
      const can_move = this.y_coord + 1 <= 15 && this.x_coord + dx_coord <= 15;
      if (can_move) {
         this.moveDown();
         // the change in it's x canvas coord is const tho
         this.moveRight(SEMI_HORIZONTAL_STEP, dx_coord);
      }
   }
}

const monster_img = new Image();
monster_img.src = "./game assests/monster/monster.png";
const monster = new Monster(monster_img);

export default monster;
