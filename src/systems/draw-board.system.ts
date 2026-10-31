import GameWorld from "../components/game-world";
import { CreateGraphics as UpdateGraphics } from "./hitboxes/create-hitboxes.system";
import { RenderPlayerScore } from "./render/score-render.system";
import { Container, Graphics } from "pixi.js";
import { PLAYER_BOARD_TOP } from "../consts/sizes";
import { addControls } from "./render/controls-render.system";
import { refreshGameState } from "./round/state-management.system";

export function RedrawBoard(world: GameWorld) {
  clearAllHitboxes(world);
  DrawBoard(world);
  refreshGameState(world);
}

export function DrawBoard(world: GameWorld) {
  renderLayout(world);
  UpdateBoard(world);
  addControls(world);
}

export function UpdateBoard(world: GameWorld) {
  UpdateGraphics(world);
  UpdateScore(world);
}

export function UpdateScore(world: GameWorld) {
  clearContainer(world.scoreContainer);
  RenderPlayerScore(world.scoreContainer, world);
}

function renderLayout(world: GameWorld) {
  const g = new Graphics();
  g.rect(0, PLAYER_BOARD_TOP, world.windowSize.width, 1).stroke(0);
  world.tileContainer.addChild(g);
}

function clearAllHitboxes(world: GameWorld) {
  world.hitboxes.forEach((x) => x.graphics.destroy());
  world.hitboxes.clear();
  world.player.tiles.getAll().forEach((x) => delete x.hitboxId);
  world.player.edges.getAll().forEach((x) => delete x.hitboxId);
  world.player.edges.clear();
  world.center.animalStock.forEach((x) => delete x.hitboxId);
  world.center.tileStock.forEach((x) => delete x.hitboxId);
  clearContainer(world.scoreContainer);
  clearContainer(world.tileContainer);
  clearContainer(world.animalContainer);
  clearContainer(world.controlsContiner);
}

function clearContainer(container: Container) {
  container.removeChildren().forEach((child) => child.destroy());
}
