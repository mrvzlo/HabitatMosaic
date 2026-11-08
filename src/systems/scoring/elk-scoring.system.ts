import { PlacedTile } from "../../components/placed-tile";
import { ScoringRule } from "../../components/scoring-rule";
import { TilePairType } from "../../consts/enums/animal-tile-pair.type";
import Map2D from "../../helpers/map2d";
import { getFromProgression, getSameGroupSizes } from "./base-scoring.system";

export const getElkSubType = (): ScoringRule[] => [scoreGroup];

function scoreGroup(board: Map2D<PlacedTile>) {
  const sizes = getSameGroupSizes(board, TilePairType.ElkStepe);
  const progression = [0, 2, 4, 7, 10, 14, 18, 23, 28];
  return sizes.map((x, i) => x * getFromProgression(progression, i)).reduce((a, b) => a + b, 0);
}
