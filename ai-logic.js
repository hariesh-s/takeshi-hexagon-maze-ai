import player from "./player.js";
import { MONSTER_X_BOUNDARY, MONSTER_Y_BOUNDARY } from "./constants.js";

function straightLineDist(x_player, y_player, x, y) {
   return Math.sqrt((x_player - x) ** 2 + (y_player - y) ** 2);
}

function isValid(x, y) {
   if (x >= 0 && x <= MONSTER_X_BOUNDARY)
      if (y >= 0 && y <= MONSTER_Y_BOUNDARY) return true;
   return false;
}

function findBestNeighbour(x_monster, y_monster) {
   let best_choice = -1;
   let best_heuristic = Infinity;

   const dx_left = y_monster % 2 === 0 ? -1 : 0;
   const dx_right = y_monster % 2 === 0 ? 0 : 1;
   console.log(best_heuristic);
   const up_left_pt = [x_monster + dx_left, y_monster - 1];
   if (isValid(...up_left_pt)) {
      const up_left_pt_dist = straightLineDist(
         player.x_coord,
         player.y_coord,
         ...up_left_pt
      );
      if (best_heuristic > up_left_pt_dist) {
         best_heuristic = up_left_pt_dist;
         best_choice = 0;
      }
   }

   const up_right_pt = [x_monster + dx_right, y_monster - 1];
   if (isValid(...up_right_pt)) {
      const up_right_pt_dist = straightLineDist(
         player.x_coord,
         player.y_coord,
         ...up_right_pt
      );
      if (best_heuristic > up_right_pt_dist) {
         best_heuristic = up_right_pt_dist;
         best_choice = 1;
      }
   }

   const right_pt = [x_monster + 1, y_monster];
   if (isValid(...right_pt)) {
      const right_pt_dist = straightLineDist(
         player.x_coord,
         player.y_coord,
         ...right_pt
      );
      if (best_heuristic > right_pt_dist) {
         best_heuristic = right_pt_dist;
         best_choice = 2;
      }
   }

   const down_right_pt = [x_monster + dx_right, y_monster + 1];
   if (isValid(...down_right_pt)) {
      const down_right_pt_dist = straightLineDist(
         player.x_coord,
         player.y_coord,
         ...down_right_pt
      );
      if (best_heuristic > down_right_pt_dist) {
         best_heuristic = down_right_pt_dist;
         best_choice = 3;
      }
   }

   const down_left_pt = [x_monster + dx_left, y_monster + 1];
   if (isValid(...down_left_pt)) {
      const down_left_pt_dist = straightLineDist(
         player.x_coord,
         player.y_coord,
         ...down_left_pt
      );
      if (best_heuristic > down_left_pt_dist) {
         best_heuristic = down_left_pt_dist;
         best_choice = 4;
      }
   }

   const left_pt = [x_monster - 1, y_monster];
   if (isValid(...left_pt)) {
      const left_pt_dist = straightLineDist(
         player.x_coord,
         player.y_coord,
         ...left_pt
      );
      console.log(left_pt_dist);
      if (best_heuristic > left_pt_dist) {
         best_heuristic = left_pt_dist;
         best_choice = 5;
      }
   }

   return best_choice;
}

export default findBestNeighbour;
