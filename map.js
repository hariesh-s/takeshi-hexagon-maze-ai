import { canva } from "./canvas.js";
import {
   SPEED_X,
   SPEED_Y,
   VERTICAL_STEP,
   OBSTACLE_MATRIX,
} from "./constants.js";
import player from "./player.js";
import monster from "./monster.js";

class Map {
   constructor(map_img) {
      this.x = 0;
      this.y = 0;
      this.img = map_img;
   }

   draw() {
      canva.drawImage(this.img, this.x, this.y);
   }

   isObstaclePresent(x, y) {
      console.log("obstacle ", x, y);
      if (OBSTACLE_MATRIX[y][x] != 0) return true;
      else return false;
   }

   // closure
   moveUp() {
      let ydiff = 0;
      let toggle = true;
      const animateMapMoveUp = () => {
         if (ydiff === VERTICAL_STEP) {
            window.cancelAnimationFrame(animateMapMoveUp);
            player.movement_status = "DEFAULT";
            player.x_spritesheet = 0; // reset to 0 at end of movement
            return;
         }

         this.y -= SPEED_Y;
         // monster is stationary wrt map hence
         // monsters canvas x & y changes with
         // map's but it's coords don't change
         monster.y -= SPEED_Y;
         ydiff += SPEED_Y;

         // cycling through spritesheet to create real life like movements
         // and doing it every alternate cycle
         if (toggle) player.x_spritesheet = (player.x_spritesheet + 30) % 120;
         toggle = !toggle;
         window.requestAnimationFrame(animateMapMoveUp);
      };
      animateMapMoveUp();
   }

   // closure
   moveDown() {
      let ydiff = 0;
      let toggle = true;
      const animateMapMoveDown = () => {
         if (ydiff === VERTICAL_STEP) {
            window.cancelAnimationFrame(animateMapMoveDown);
            player.movement_status = "DEFAULT";
            player.x_spritesheet = 0; // reset to 0 at end of movement
            return;
         }

         this.y += SPEED_Y;
         // monster is stationary wrt map hence
         // monsters canvas x & y changes with
         // map's but it's coords don't change
         monster.y += SPEED_Y;
         ydiff += SPEED_Y;

         // cycling through spritesheet to create real life like movements
         // and doing it every alternate cycle
         if (toggle) player.x_spritesheet = (player.x_spritesheet + 30) % 120;
         toggle = !toggle;
         window.requestAnimationFrame(animateMapMoveDown);
      };
      animateMapMoveDown();
   }

   // closure
   moveLeft(dx) {
      let xdiff = 0;
      let toggle = true;
      const animateMapMoveLeft = () => {
         if (xdiff === dx) {
            window.cancelAnimationFrame(animateMapMoveLeft);
            player.movement_status = "DEFAULT";
            player.x_spritesheet = 0; // reset to 0 at end of movement
            return;
         }

         this.x -= SPEED_X;
         // monster is stationary wrt map hence
         // monsters canvas x & y changes with
         // map's but it's coords don't change
         monster.x -= SPEED_X;
         xdiff += SPEED_X;

         // cycling through spritesheet to create real life like movements
         // and doing it every alternate cycle
         if (toggle) player.x_spritesheet = (player.x_spritesheet + 30) % 120;
         toggle = !toggle;
         window.requestAnimationFrame(animateMapMoveLeft);
      };
      animateMapMoveLeft();
   }

   // closure
   moveRight(dx) {
      let xdiff = 0;
      let toggle = true;
      const animateMapMoveRight = () => {
         if (xdiff === dx) {
            window.cancelAnimationFrame(animateMapMoveRight);
            player.movement_status = "DEFAULT";
            player.x_spritesheet = 0; // reset to 0 at end of movement
            return;
         }

         this.x += SPEED_X;
         // monster is stationary wrt map hence
         // monsters canvas x & y changes with
         // map's but it's coords don't change
         monster.x += SPEED_X;
         xdiff += SPEED_X;

         // cycling through spritesheet to create real life like movements
         // and doing it every alternate cycle
         if (toggle) player.x_spritesheet = (player.x_spritesheet + 30) % 120;
         toggle = !toggle;
         window.requestAnimationFrame(animateMapMoveRight);
      };
      animateMapMoveRight();
   }
}

const map_img = new Image();
map_img.src = "./game assests/game-map.png";
const map = new Map(map_img);

export default map;
