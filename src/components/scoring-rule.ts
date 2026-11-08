import Map2D from "../helpers/map2d";
import { PlacedTile } from "./placed-tile";

export type ScoringRule = (board: Map2D<PlacedTile>) => number;
