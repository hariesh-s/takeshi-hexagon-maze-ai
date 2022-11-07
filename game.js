import map from "./map.js";
import player from "./player.js";
import monster from "./monster.js";
import { canva, canvas } from "./canvas.js";

window.addEventListener("keyup", (e) => {
   switch (e.key) {
      case "w":
         player.moveUpLeft();
         break;
      case "e":
         player.moveUpRight();
         break;
      case "d":
         player.moveRight();
         break;
      case "x":
         player.moveDownRight();
         break;
      case "z":
         player.moveDownLeft();
         break;
      case "a":
         player.moveLeft();
         break;
   }
});

function start_game() {
   canva.clearRect(0, 0, canvas.width, canvas.height);
   map.draw();
   player.draw();
   monster.draw();
   window.requestAnimationFrame(start_game);
}
start_game();
setInterval(monster.move, 500);
