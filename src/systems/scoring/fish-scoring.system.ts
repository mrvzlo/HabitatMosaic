import { PlacedTile } from "../../components/placed-tile";
import PlayerBoard from "../../components/player-board";
import { ScoringRule } from "../../components/scoring-rule";
import { TilePairType } from "../../consts/enums/animal-tile-pair.type";
import Map2D from "../../helpers/map2d";
import { getNear } from "../hitboxes/available-move.system";
import { getFromProgression } from "./base-scoring.system";

export const getFishSubType = (subType: number): ScoringRule => {
  const scoring = [scoreAllSizes, scoreSmallSizes, scoreBigSizes];
  return (board: PlayerBoard) => scoring[subType](board.tiles);
};

function scoreAllSizes(tiles: Map2D<PlacedTile>) {
  const progression = [0, 2, 5, 8, 12, 16, 20, 25];
  const sizes = scoreSchoolSizes(tiles);
  return sizes.map((x, i) => x * getFromProgression(progression, i)).reduce((a, b) => a + b, 0);
}

function scoreSmallSizes(tiles: Map2D<PlacedTile>) {
  const progression = [0, 2, 4, 9, 11, 17];
  const sizes = scoreSchoolSizes(tiles);
  return sizes.map((x, i) => x * getFromProgression(progression, i)).reduce((a, b) => a + b, 0);
}

function scoreBigSizes(tiles: Map2D<PlacedTile>) {
  const progression = [0, 0, 0, 10, 12, 15];
  const sizes = scoreSchoolSizes(tiles);
  return sizes.map((x, i) => x * getFromProgression(progression, i)).reduce((a, b) => a + b, 0);
}

function scoreSchoolSizes(board: Map2D<PlacedTile>): number[] {
  const sameAnimals = board.getAll().filter((x) => x.occupied === TilePairType.FishSea);
  const visited = new Set<string>();
  const sizes: number[] = [];

  for (const a of sameAnimals) {
    if (visited.has(a.id)) continue;

    let valid = true;
    const group = [a];
    visited.add(a.id);

    for (let index = 0; index < group.length; index++) {
      const near = getNear(group[index].coords)
        .map((x) => board.get(x))
        .filter((x) => x && x.occupied === TilePairType.FishSea);
      if (near.length > 2) valid = false;
      for (const neighbor of near) {
        if (visited.has(neighbor!.id)) continue;

        visited.add(neighbor!.id);
        group.push(neighbor!);
      }
    }

    if (valid) sizes[group.length] = (sizes[group.length] ?? 0) + 1;
  }

  return sizes;
}
