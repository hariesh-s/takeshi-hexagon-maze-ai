import { canva } from "./canvas.js";
import { SPEED_X, SPEED_Y, VERTICAL_STEP } from "./constants.js";
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

   // closure
   moveUp() {
      let ydiff = 0;
      let toggle = true;
      function animateMoveUp() {
         if (ydiff === VERTICAL_STEP) {
            window.cancelAnimationFrame(animateMoveUp);
            player.movement_status = "DEFAULT";
            player.x_spritesheet = 0; // reset to 0 at end of movement
            return;
         }

         // cannot use this keyword
         map.y -= SPEED_Y;
         // monster is stationary wrt map hence
         // monsters canvas x & y changes with
         // map's but it's coords don't change
         monster.y -= SPEED_Y;
         ydiff += SPEED_Y;

         // cycling through spritesheet to create real life like movements
         // and doing it every alternate cycle
         if (toggle) player.x_spritesheet = (player.x_spritesheet + 30) % 120;
         toggle = !toggle;
         window.requestAnimationFrame(animateMoveUp);
      }
      animateMoveUp();
   }

   // closure
   moveDown() {
      let ydiff = 0;
      let toggle = true;
      function animateMoveDown() {
         if (ydiff === VERTICAL_STEP) {
            window.cancelAnimationFrame(animateMoveDown);
            player.movement_status = "DEFAULT";
            player.x_spritesheet = 0; // reset to 0 at end of movement
            return;
         }

         // cannot use this keyword
         map.y += SPEED_Y;
         // monster is stationary wrt map hence
         // monsters canvas x & y changes with
         // map's but it's coords don't change
         monster.y += SPEED_Y;
         ydiff += SPEED_Y;

         // cycling through spritesheet to create real life like movements
         // and doing it every alternate cycle
         if (toggle) player.x_spritesheet = (player.x_spritesheet + 30) % 120;
         toggle = !toggle;
         window.requestAnimationFrame(animateMoveDown);
      }
      animateMoveDown();
   }

   // closure
   moveLeft(dx) {
      let xdiff = 0;
      let toggle = true;
      function animateMoveLeft() {
         if (xdiff === dx) {
            window.cancelAnimationFrame(animateMoveLeft);
            player.movement_status = "DEFAULT";
            player.x_spritesheet = 0; // reset to 0 at end of movement
            return;
         }

         // cannot use this keyword
         map.x -= SPEED_X;
         // monster is stationary wrt map hence
         // monsters canvas x & y changes with
         // map's but it's coords don't change
         monster.x -= SPEED_X;
         xdiff += SPEED_X;

         // cycling through spritesheet to create real life like movements
         // and doing it every alternate cycle
         if (toggle) player.x_spritesheet = (player.x_spritesheet + 30) % 120;
         toggle = !toggle;
         window.requestAnimationFrame(animateMoveLeft);
      }
      animateMoveLeft();
   }

   // closure
   moveRight(dx) {
      let xdiff = 0;
      let toggle = true;
      function animateMoveRight() {
         if (xdiff === dx) {
            window.cancelAnimationFrame(animateMoveRight);
            player.movement_status = "DEFAULT";
            player.x_spritesheet = 0; // reset to 0 at end of movement
            return;
         }

         // cannot use this keyword
         map.x += SPEED_X;
         // monster is stationary wrt map hence
         // monsters canvas x & y changes with
         // map's but it's coords don't change
         monster.x += SPEED_X;
         xdiff += SPEED_X;

         // cycling through spritesheet to create real life like movements
         // and doing it every alternate cycle
         if (toggle) player.x_spritesheet = (player.x_spritesheet + 30) % 120;
         toggle = !toggle;
         window.requestAnimationFrame(animateMoveRight);
      }
      animateMoveRight();
   }
}

const map_img = new Image();
map_img.src = "./game assests/game-map.png";
const map = new Map(map_img);

export default map;
