// Define the possible commute modes
export type CommuteMode =
  | "walk"
  | "bike"
  | "bus"
  | "car"
  | "train"
  | "motorbike";

// Define the structure for the Scenario
export interface Scenario {
  one_way_distance: number;
  commute_days_per_year: number;
  primary_mode: CommuteMode;
  secondary_mode?: CommuteMode;
  primary_mode_proportion: number;
  secondary_mode_proportion: number;
}

// Define the structure for the TotalByMode
export interface TotalByMode {
  mode: CommuteMode;
  total_kg_co2e: number;
}

// Define the structure for the SimulationResult
export interface SimulationResult {
  scenario: Scenario;
  total_kg_co2e: number;
  total_kg_co2e_per_mode: TotalByMode[];
}
