import { PlacedTile } from "../../components/placed-tile";
import PlayerBoard from "../../components/player-board";
import { ScoringRule } from "../../components/scoring-rule";
import { TilePairType } from "../../consts/enums/animal-tile-pair.type";
import Map2D from "../../helpers/map2d";
import { getNear } from "../hitboxes/available-move.system";
import { getFromProgression } from "./base-scoring.system";

export const getWolfSubTypes = (): ScoringRule[] => [scoreLonelyOnEdge, scoreEdgeCount];

function scoreLonelyOnEdge(board: Map2D<PlacedTile>) {
  const bears = board.getAll().filter((x) => x.occupied === TilePairType.SandSnake);
  let count = 0;
  bears.forEach((x) => {
    const near = getNear(x.coords).map((p) => board.get(p));
    const isNotLonely = near.some((x) => x && x.occupied === TilePairType.SandSnake);
    if (isNotLonely) return;
    const hasEmptySpace = near.some((x) => !x || x.occupied === TilePairType.Empty);
    if (hasEmptySpace) count++;
  });
  return count * 3;
}

function scoreEdgeCount(board: Map2D<PlacedTile>) {
  const progression = [0, 0, 0, 2, 2, 2, 4, 4, 4, 7, 7, 7, 10, 10, 10, 10, 14, 14, 14, 14, 18, 18, 18, 18, 18, 22, 22, 22, 22, 22, 27];
  const hawks = board.getAll().filter((x) => x.occupied === TilePairType.SandSnake);
  let spaces = new Set<string>();
  hawks.forEach((x) =>
    getNear(x.coords)
      .filter((x) => !board.get(x) || board.get(x)!.occupied === TilePairType.Empty)
      .forEach((p) => spaces.add(p.intX + "|" + p.intY)),
  );
  return getFromProgression(progression, spaces.size);
}
