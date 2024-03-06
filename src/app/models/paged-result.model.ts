import { Item } from "src/typescript-angular-client-generated";

export interface PagedItemResult {
  page: number;
  size: number;
  hasMore: boolean;
  entities: Item[]
}
