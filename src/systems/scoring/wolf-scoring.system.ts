import { PlacedTile } from "../../components/placed-tile";
import { ScoringRule } from "../../components/scoring-rule";
import { TilePairType } from "../../consts/enums/animal-tile-pair.type";
import Map2D from "../../helpers/map2d";
import { getNear } from "../hitboxes/available-move.system";

export const getWolfSubType = (): ScoringRule[] => [scoreEachNear];

function scoreEachNear(board: Map2D<PlacedTile>) {
  const wolfs = board.getAll().filter((x) => x.occupied === TilePairType.WolfTundra);
  let sum = 0;

  wolfs.forEach((x) => {
    const near = getNear(x.coords)
      .map((y) => board.get(y))
      .filter((y) => y?.occupied === TilePairType.WolfTundra);
    sum += near.length + 1;
  });
  return sum;
}
