import map from "./map.js";
import player from "./player.js";
import monster from "./monster.js";
import { canva, canvas } from "./canvas.js";

function control_player_motion(e) {
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
}

window.addEventListener("keyup", control_player_motion);

function stop_game(result, message) {
   clearInterval(monster_motion);
   window.removeEventListener("keyup", control_player_motion);

   let modal_bg_color = "";
   let modal_border_color = "";
   if (result === "WON") {
      modal_bg_color = "greenyellow";
      modal_border_color = "green";
   } else {
      modal_bg_color = "lightcoral";
      modal_border_color = "crimson";
   }

   const css_root = document.querySelector(":root");
   css_root.style.setProperty("--modal-bg-color", modal_bg_color);
   css_root.style.setProperty("--modal-border-color", modal_border_color);

   const modal_body = document.querySelector(".modal-body");
   modal_body.innerHTML = message;

   const modal_wrapper = document.querySelector(".modal-wrapper");
   modal_wrapper.style.visibility = "visible";
   modal_wrapper.style.opacity = 1;
   canvas.style.filter = "blur(8px)";

   window.cancelAnimationFrame(start_game);
}

function start_game() {
   // termination condition
   // monster catches player
   if (
      player.x_coord === monster.x_coord &&
      player.y_coord === monster.y_coord
   ) {
      // game needs to stop before monster makes it next move (asap before next 500ms)
      setTimeout(() => stop_game("LOST", "Caught you punk. You lose !"), 50);
   }

   // player gets mudded
   if (player.x_coord >= 16 && player.y_coord <= 15) {
      // game needs to stop before monster makes it next move (asap before next 500ms)
      setTimeout(
         () => stop_game("LOST", "Haha you got mudded. You lose !"),
         50
      );
   }

   // player escapes
   if (player.y_coord >= 16 && player.x_coord <= 15) {
      // game needs to stop before monster makes it next move (asap before next 500ms)
      setTimeout(
         () => stop_game("WON", "Congrats you sneaky bastard. You Win !"),
         50
      );
   }

   canva.clearRect(0, 0, canvas.width, canvas.height);
   map.draw();
   player.draw();
   monster.draw();
   console.log(
      player.x_coord,
      player.y_coord,
      monster.x_coord,
      monster.y_coord
   );
   window.requestAnimationFrame(start_game);
}
start_game();
const monster_motion = setInterval(monster.move, 240);
