import GameWorld from "../../components/game-world";
import { GameElementType } from "../../consts/enums/game-element.type";
import { GameStateType } from "../../consts/enums/game-state.type";
import { CancelKey, EKey, QKey } from "../../consts/keys";

const semiTrans = 0.4;

export function checkElementActiveState(state: GameStateType, element: GameElementType) {
  switch (state) {
    case GameStateType.PickTile:
      return element === GameElementType.StockTile;
    case GameStateType.PlaceTile:
      return element === GameElementType.EdgeTile || element === GameElementType.TileControl;
    case GameStateType.PickAnimal:
      return element === GameElementType.StockAnimal;
    case GameStateType.PlaceAnimal:
      return element === GameElementType.BoardTile || element === GameElementType.AnimalControl;
  }
}

export function refreshGameState(world: GameWorld) {
  setGameState(world, world.gameState);
}

export function setGameState(world: GameWorld, state: GameStateType) {
  world.gameState = state;
  updateTileStockVisibility(world, getTileStockVisibility(world));
  updateAnimalStockVisibility(world, getAnimalStockVisibility(world));
  updateEdgeVisibility(world);
  updateControlsVisibility(world);
}

function getTileStockVisibility(world: GameWorld) {
  switch (world.gameState) {
    case GameStateType.PickTile:
      return () => true;
    case GameStateType.PlaceTile:
      return (i: number) => i === world.lastPickup?.tileIndex;
    case GameStateType.PickAnimal:
    case GameStateType.PlaceAnimal:
    case GameStateType.GameOver:
      return () => false;
  }
}

function getAnimalStockVisibility(world: GameWorld) {
  switch (world.gameState) {
    case GameStateType.PickTile:
    case GameStateType.PickAnimal:
      return () => true;
    case GameStateType.PlaceAnimal:
      return (i: number) => i === world.lastPickup?.animalIndex;
    case GameStateType.PlaceTile:
    case GameStateType.GameOver:
      return () => false;
  }
}

function updateTileStockVisibility(world: GameWorld, show: (i: number) => boolean) {
  world.center.tileStock.forEach((x, i) => (world.hitboxes.get(x.hitboxId!)!.graphics.alpha = show(i) ? 1 : semiTrans));
}

function updateAnimalStockVisibility(world: GameWorld, show: (i: number) => boolean) {
  world.center.animalStock.forEach((x, i) => (world.hitboxes.get(x.hitboxId!)!.graphics.alpha = show(i) ? 1 : semiTrans));
}

function updateEdgeVisibility(world: GameWorld) {
  const visible = world.gameState === GameStateType.PlaceTile;
  world.player.edges.getAll().forEach((x) => (world.hitboxes.get(x.hitboxId!)!.graphics.alpha = visible ? 0.4 : 0.1));
}

function updateControlsVisibility(world: GameWorld) {
  world.hitboxes.get(QKey)!.graphics.alpha = world.gameState === GameStateType.PlaceTile ? 1 : 0;
  world.hitboxes.get(EKey)!.graphics.alpha = world.gameState === GameStateType.PlaceTile ? 1 : 0;
  world.hitboxes.get(CancelKey)!.graphics.alpha = world.gameState === GameStateType.PlaceAnimal ? 1 : 0;
}
