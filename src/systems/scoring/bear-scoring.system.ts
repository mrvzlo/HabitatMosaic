import { PlacedTile } from "../../components/placed-tile";
import { ScoringRule } from "../../components/scoring-rule";
import { TilePairType } from "../../consts/enums/animal-tile-pair.type";
import Map2D from "../../helpers/map2d";
import { getFromProgression, getSameGroupSizes } from "./base-scoring.system";

export const getBearSubType = (): ScoringRule[] => [scoreFamiliesOf2, scoreFamiliesOf3, scoreFamilies1to3, scoreFamilies2to4];

function scoreFamiliesOf2(board: Map2D<PlacedTile>) {
  const sizes = getSameGroupSizes(board, TilePairType.BearForest);
  return getFromProgression([0, 4, 11, 19, 27], sizes[2]);
}

function scoreFamilies1to3(board: Map2D<PlacedTile>) {
  const sizes = getSameGroupSizes(board, TilePairType.BearForest);
  const all3 = sizes[1] > 0 && sizes[2] > 0 && sizes[3] > 0;
  return sizes[1] * 2 + sizes[2] * 5 + sizes[3] * 8 + (all3 ? 3 : 0);
}

function scoreFamiliesOf3(board: Map2D<PlacedTile>) {
  const sizes = getSameGroupSizes(board, TilePairType.BearForest);
  return sizes[3] * 10;
}

function scoreFamilies2to4(board: Map2D<PlacedTile>) {
  const sizes = getSameGroupSizes(board, TilePairType.BearForest);
  return sizes[4] * 13 + sizes[2] * 5 + sizes[3] * 8;
}
