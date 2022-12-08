export default interface QueryParams {
  client_id: string;
  categories?: string;
  gt_min_players?: number;
  lt_max_playtime?: number;
  lt_msrp?: number;
}
